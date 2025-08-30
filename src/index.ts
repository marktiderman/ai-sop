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

// Phase Tracking exports (browser-safe)
export * from './types/phase-tracking';
export * from './services/phase-tracker';

// Main AI-SOP class
export class AISop {
  private registry: any;
  private engine: any;

  constructor(config?: any) {
    // Initialize AI-SOP system
    this.initialize(config);
  }

  private initialize(config?: any) {
    // Load registry and initialize engine
    // TODO: Implement initialization logic
  }

  /**
   * Load SOPs from registry
   */
  async loadSOPs(): Promise<void> {
    // TODO: Implement SOP loading
  }

  /**
   * Execute a specific SOP
   */
  async executeSOP(sopId: string, context?: any): Promise<any> {
    // TODO: Implement SOP execution
  }

  /**
   * Get SOP metadata
   */
  getSOPMetadata(sopId: string): any {
    // TODO: Implement metadata retrieval
  }

  /**
   * List all available SOPs
   */
  listSOPs(): string[] {
    // TODO: Implement SOP listing
    return [];
  }
}

// Default export
export default AISop;

// Service and route exports
