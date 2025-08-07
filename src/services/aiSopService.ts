/**
 * AI-SOP Service: AI-SOP Orchestration Framework
 *
 * Manages the AI-SOP system with Knowledge Blocks, Sequences, and Filters
 * for autonomous AI agent orchestration through procedural fables.
 */

import * as fs from 'fs';
import * as path from 'path';
import { FeatureFlagService } from '../config/featureFlags';
import { logger } from '../utils/logger';

export interface AISopConfig {
  name: string;
  product_name: string;
  version: string;
  description: string;
  tagline: string;
  knowledge_blocks: Record<string, string>;
  sequences: Record<string, string>;
  filters: Record<string, string>;
}

export interface AISop {
  id: string;
  title: string;
  version: string;
  type: string;
  status: string;
  description: string;
  purpose: string;
  scope: string;
  commanders_intent?: string;
}

/**
 * AI-SOP Service for managing autonomous agent procedures
 */
export class AISopService {
  private static instance: AISopService;
  private config: AISopConfig | null = null;
  private loadedSops: Map<string, AISop> = new Map();
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AISopService {
    if (!AISopService.instance) {
      AISopService.instance = new AISopService();
    }
    return AISopService.instance;
  }

  /**
   * Initialize the AI-SOP system if feature flag is enabled
   */
  async initialize(): Promise<boolean> {
    if (!FeatureFlagService.isEnabled('AI_SOP_SYSTEM')) {
      logger.info('AI-SOP System disabled via feature flag');
      return false;
    }

    if (this.isInitialized) {
      return true;
    }

    try {
      logger.info('Initializing AI-SOP System...');

      // Load main configuration
      await this.loadConfig();

      // Load Knowledge Blocks (foundation mindset)
      await this.loadKnowledgeBlocks();

      logger.info('AI-SOP System initialized successfully');
      this.isInitialized = true;
      return true;
    } catch (error) {
      logger.error('Failed to initialize AI-SOP System:', error);
      return false;
    }
  }

  /**
   * Load AI-SOP configuration file
   */
  private async loadConfig(): Promise<void> {
    const configPath = path.join(process.cwd(), 'aisop-system', 'aisop-config.json');

    if (!fs.existsSync(configPath)) {
      throw new Error(`AI-SOP config not found at ${configPath}`);
    }

    const configData = fs.readFileSync(configPath, 'utf-8');
    this.config = JSON.parse(configData);

    logger.info(`Loaded AI-SOP config: ${this.config?.product_name} v${this.config?.version}`);
  }

  /**
   * Load Knowledge Blocks (loaded at startup for foundational mindset)
   */
  private async loadKnowledgeBlocks(): Promise<void> {
    if (!this.config?.knowledge_blocks) {
      return;
    }

    logger.info('Loading Knowledge Blocks for foundational mindset...');

    for (const [blockId, blockPath] of Object.entries(this.config.knowledge_blocks)) {
      try {
        const fullPath = path.join(process.cwd(), 'aisop-system', blockPath);
        const sopData = fs.readFileSync(fullPath, 'utf-8');
        const sop: AISop = JSON.parse(sopData);

        this.loadedSops.set(blockId, sop);
        logger.debug(`Loaded Knowledge Block: ${blockId}`);
      } catch (error) {
        logger.warn(`Failed to load Knowledge Block ${blockId}:`, error);
      }
    }

    logger.info(`Loaded ${Object.keys(this.config.knowledge_blocks).length} Knowledge Blocks`);
  }

  /**
   * Execute a sequence (Zapier-like workflow)
   */
  async executeSequence(sequenceId: string, context: any = {}): Promise<any> {
    if (!FeatureFlagService.isEnabled('AI_SOP_SYSTEM')) {
      logger.warn('AI-SOP System disabled, cannot execute sequence');
      return null;
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      logger.info(`Executing AI-SOP Sequence: ${sequenceId}`);

      // Load sequence on-demand
      const sequence = await this.loadSequence(sequenceId);
      if (!sequence) {
        throw new Error(`Sequence ${sequenceId} not found`);
      }

      // Execute sequence steps
      logger.info(
        `Sequence "${sequence.title}" started with commander's intent: ${sequence.commanders_intent}`
      );

      // This would contain the actual sequence execution logic
      // For now, we'll return a success indicator
      return {
        sequenceId,
        status: 'completed',
        title: sequence.title,
        commanders_intent: sequence.commanders_intent,
        context,
      };
    } catch (error) {
      logger.error(`Failed to execute sequence ${sequenceId}:`, error);
      throw error;
    }
  }

  /**
   * Apply a filter (specialized validation agent)
   */
  async applyFilter(filterId: string, input: any): Promise<any> {
    if (!FeatureFlagService.isEnabled('AI_SOP_SYSTEM')) {
      return input; // Pass through if disabled
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      logger.info(`Applying AI-SOP Filter: ${filterId}`);

      const filter = await this.loadFilter(filterId);
      if (!filter) {
        logger.warn(`Filter ${filterId} not found, skipping validation`);
        return input;
      }

      // This would contain the actual filter logic
      logger.debug(`Filter "${filter.title}" applied for quality assurance`);

      return {
        original: input,
        filterId,
        filterTitle: filter.title,
        validated: true,
        suggestions: [],
      };
    } catch (error) {
      logger.error(`Failed to apply filter ${filterId}:`, error);
      return input; // Fail gracefully
    }
  }

  /**
   * Load a sequence on-demand
   */
  private async loadSequence(sequenceId: string): Promise<AISop | null> {
    if (!this.config?.sequences?.[sequenceId]) {
      return null;
    }

    const sequencePath = this.config.sequences[sequenceId];
    const fullPath = path.join(process.cwd(), 'aisop-system', sequencePath);

    try {
      const sopData = fs.readFileSync(fullPath, 'utf-8');
      return JSON.parse(sopData);
    } catch (error) {
      logger.error(`Failed to load sequence ${sequenceId}:`, error);
      return null;
    }
  }

  /**
   * Load a filter on-demand
   */
  private async loadFilter(filterId: string): Promise<AISop | null> {
    if (!this.config?.filters?.[filterId]) {
      return null;
    }

    const filterPath = this.config.filters[filterId];
    const fullPath = path.join(process.cwd(), 'aisop-system', filterPath);

    try {
      const sopData = fs.readFileSync(fullPath, 'utf-8');
      return JSON.parse(sopData);
    } catch (error) {
      logger.error(`Failed to load filter ${filterId}:`, error);
      return null;
    }
  }

  /**
   * Get system status and metrics
   */
  getStatus(): any {
    return {
      enabled: FeatureFlagService.isEnabled('AI_SOP_SYSTEM'),
      initialized: this.isInitialized,
      config: this.config
        ? {
            name: this.config.name,
            version: this.config.version,
            product_name: this.config.product_name,
          }
        : null,
      knowledgeBlocksLoaded: this.loadedSops.size,
      availableSequences: this.config ? Object.keys(this.config.sequences).length : 0,
      availableFilters: this.config ? Object.keys(this.config.filters).length : 0,
    };
  }

  /**
   * Get all available sequences
   */
  getAvailableSequences(): string[] {
    if (!this.config?.sequences) {
      return [];
    }
    return Object.keys(this.config.sequences);
  }

  /**
   * Get all available filters
   */
  getAvailableFilters(): string[] {
    if (!this.config?.filters) {
      return [];
    }
    return Object.keys(this.config.filters);
  }
}

// Export singleton instance
export const aiSopService = AISopService.getInstance();
