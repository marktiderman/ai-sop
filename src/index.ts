/**
 * AI-SOP Core Package
 *
 * AI-SOP orchestration framework for knowledge-based and prompt-based
 * Standard Operating Procedures
 */

export * from './core/engine';
export * from './core/loader';
export * from './core/registry';
export * from './types';
export * from './services/aiSopService';

// Main AI-SOP class
export class AISop {
  private aiSopService: import('./services/aiSopService').AiSopService;

  constructor(config?: any) {
    // Initialize AI-SOP system with local SOPs
    this.aiSopService = this.initialize(config);
  }

  private initialize(config?: any): import('./services/aiSopService').AiSopService {
    // Import and initialize aiSopService
    const { AiSopService } = require('./services/aiSopService');
    return new AiSopService(
      config?.sopDirectory,
      config?.configPath
    );
  }

  /**
   * Load SOPs from local registry
   */
  async loadSOPs(): Promise<void> {
    const result = await this.aiSopService.loadSOPs();
    if (!result.success) {
      console.warn('SOP loading had errors:', result.errors);
    }
  }

  /**
   * Execute a specific SOP
   */
  async executeSOP(sopId: string, context?: any): Promise<any> {
    const result = await this.aiSopService.executeSOP(sopId, context);
    if (result.status === 'error') {
      throw new Error(result.error || 'SOP execution failed');
    }
    return result.result;
  }

  /**
   * Get SOP metadata
   */
  getSOPMetadata(sopId: string): any {
    return this.aiSopService.getSOPMetadata(sopId);
  }

  /**
   * List all available SOPs
   */
  listSOPs(): string[] {
    return this.aiSopService.listSOPs();
  }

  /**
   * Get all SOPs with details
   */
  getAllSOPs(): { [key: string]: any } {
    return this.aiSopService.getAllSOPs();
  }

  /**
   * Get SOPs by category
   */
  getSOPsByCategory(category: string): { [key: string]: any } {
    return this.aiSopService.getSOPsByCategory(category);
  }

  /**
   * Get AI-SOP service status
   */
  getStatus(): any {
    return this.aiSopService.getStatus();
  }

  /**
   * Check if AI-SOP is initialized
   */
  isInitialized(): boolean {
    return this.aiSopService.isInitialized();
  }
}

// Default export
export default AISop;

// Service and route exports
