/**
 * AI-SOP Service
 * 
 * Service for loading and managing local AI-SOP Standard Operating Procedures
 * This enables the AI-SOP repository to use its own system (self-dogfooding)
 */

import * as fs from 'fs';
import * as path from 'path';
import { AISopRegistry } from '../core/registry';
import { AISopEngine } from '../core/engine';

export interface SopLoadResult {
  success: boolean;
  loaded: number;
  errors: string[];
  sops: { [key: string]: any };
}

export interface SopExecutionResult {
  sopId: string;
  status: 'success' | 'error';
  result?: any;
  error?: string;
  timestamp: Date;
}

export class AiSopService {
  private registry: AISopRegistry;
  private engine: AISopEngine;
  private sopDirectory: string;
  private configPath: string;
  private loadedConfig: any;

  constructor(sopDirectory?: string, configPath?: string) {
    // Default to local sops directory relative to this file
    this.sopDirectory = sopDirectory || path.join(__dirname, '../../src/sops');
    this.configPath = configPath || path.join(__dirname, '../../src/aisop-config.json');
    
    this.registry = new AISopRegistry();
    this.engine = new AISopEngine(this.registry);
    this.loadedConfig = null;
  }

  /**
   * Load AI-SOP configuration from aisop-config.json
   */
  private loadConfig(): any {
    if (this.loadedConfig) {
      return this.loadedConfig;
    }

    try {
      if (!fs.existsSync(this.configPath)) {
        throw new Error(`AI-SOP config not found at: ${this.configPath}`);
      }

      const configContent = fs.readFileSync(this.configPath, 'utf-8');
      this.loadedConfig = JSON.parse(configContent);
      return this.loadedConfig;
    } catch (error) {
      throw new Error(`Failed to load AI-SOP config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Load a single SOP file
   */
  private loadSopFile(filePath: string): any {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`SOP file not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const sopData = JSON.parse(content);

      // Validate required SOP fields
      if (!sopData.id) {
        throw new Error(`SOP missing required 'id' field: ${filePath}`);
      }

      return sopData;
    } catch (error) {
      throw new Error(`Failed to load SOP from ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Load all SOPs from the configured directories
   */
  async loadSOPs(): Promise<SopLoadResult> {
    const result: SopLoadResult = {
      success: false,
      loaded: 0,
      errors: [],
      sops: {}
    };

    try {
      // Load configuration
      const config = this.loadConfig();
      
      // Collect all SOP file paths from config
      const sopPaths: { [key: string]: string } = {};
      
      // Add knowledge blocks
      if (config.knowledge_blocks) {
        Object.entries(config.knowledge_blocks).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('./sops/')) {
            sopPaths[key] = path.resolve(path.dirname(this.configPath), value);
          }
        });
      }

      // Add sequences
      if (config.sequences) {
        Object.entries(config.sequences).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('./sops/')) {
            sopPaths[key] = path.resolve(path.dirname(this.configPath), value);
          }
        });
      }

      // Add filters
      if (config.filters) {
        Object.entries(config.filters).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('./sops/')) {
            sopPaths[key] = path.resolve(path.dirname(this.configPath), value);
          }
        });
      }

      // Load each SOP file
      for (const [sopKey, sopPath] of Object.entries(sopPaths)) {
        try {
          const sopData = this.loadSopFile(sopPath);
          
          // Add metadata about the SOP category
          sopData.category = this.getSopCategory(sopKey, config);
          sopData.configKey = sopKey;
          
          // Register with registry and engine
          this.registry.addSOP(sopData.id, sopData);
          this.engine.loadSOP(sopData.id, sopData);
          
          result.sops[sopData.id] = sopData;
          result.loaded++;
        } catch (error) {
          const errorMsg = `Failed to load ${sopKey} (${sopPath}): ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMsg);
        }
      }

      result.success = result.loaded > 0;
      return result;

    } catch (error) {
      result.errors.push(`Configuration load failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return result;
    }
  }

  /**
   * Determine SOP category from config structure
   */
  private getSopCategory(sopKey: string, config: any): string {
    if (config.knowledge_blocks && config.knowledge_blocks[sopKey]) {
      return 'knowledge_block';
    }
    if (config.sequences && config.sequences[sopKey]) {
      return 'sequence';
    }
    if (config.filters && config.filters[sopKey]) {
      return 'filter';
    }
    return 'unknown';
  }

  /**
   * Execute a specific SOP
   */
  async executeSOP(sopId: string, context?: any): Promise<SopExecutionResult> {
    const result: SopExecutionResult = {
      sopId,
      status: 'error',
      timestamp: new Date()
    };

    try {
      // Ensure SOPs are loaded
      if (this.registry.listSOPs().length === 0) {
        await this.loadSOPs();
      }

      // Validate SOP exists
      if (!this.engine.validate(sopId)) {
        result.error = `SOP not found: ${sopId}`;
        return result;
      }

      // Execute through engine
      const executionResult = await this.engine.execute(sopId, context);
      
      result.status = 'success';
      result.result = executionResult;
      return result;

    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown execution error';
      return result;
    }
  }

  /**
   * Get SOP metadata
   */
  getSOPMetadata(sopId: string): any {
    return this.engine.getMetadata(sopId);
  }

  /**
   * List all loaded SOPs
   */
  listSOPs(): string[] {
    return this.registry.listSOPs();
  }

  /**
   * Get all SOPs with details
   */
  getAllSOPs(): { [key: string]: any } {
    return this.registry.getAllSOPs();
  }

  /**
   * Get SOPs by category
   */
  getSOPsByCategory(category: string): { [key: string]: any } {
    const allSops = this.getAllSOPs();
    const filtered: { [key: string]: any } = {};
    
    Object.entries(allSops).forEach(([id, sop]) => {
      if (sop.category === category) {
        filtered[id] = sop;
      }
    });
    
    return filtered;
  }

  /**
   * Get configuration
   */
  getConfig(): any {
    return this.loadedConfig || this.loadConfig();
  }

  /**
   * Check if service is properly initialized
   */
  isInitialized(): boolean {
    return this.registry.listSOPs().length > 0;
  }

  /**
   * Get service status
   */
  getStatus(): {
    initialized: boolean;
    sopCount: number;
    categories: { [key: string]: number };
    config: any;
  } {
    const sops = this.getAllSOPs();
    const categories: { [key: string]: number } = {};
    
    Object.values(sops).forEach((sop: any) => {
      const category = sop.category || 'unknown';
      categories[category] = (categories[category] || 0) + 1;
    });

    return {
      initialized: this.isInitialized(),
      sopCount: this.listSOPs().length,
      categories,
      config: this.getConfig()
    };
  }
}
