/**
 * AI-SOP Registry
 * 
 * Manages SOP registry and metadata
 */

export interface SOPRegistry {
  getAllSOPs(): any;
  getSOP(sopId: string): any;
  addSOP(sopId: string, sopData: any): void;
  removeSOP(sopId: string): boolean;
  listSOPs(): string[];
}

export class AISopRegistry implements SOPRegistry {
  private sops: Map<string, any> = new Map();
  private config: any;

  constructor(config?: any) {
    this.config = config || {};
  }

  getAllSOPs(): any {
    return Object.fromEntries(this.sops);
  }

  getSOP(sopId: string): any {
    return this.sops.get(sopId);
  }

  addSOP(sopId: string, sopData: any): void {
    this.sops.set(sopId, sopData);
  }

  removeSOP(sopId: string): boolean {
    return this.sops.delete(sopId);
  }

  listSOPs(): string[] {
    return Array.from(this.sops.keys());
  }

  loadFromConfig(config: any): void {
    this.config = config;
    // TODO: Load SOPs from config
  }
}
