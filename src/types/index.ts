/**
 * AI-SOP Types
 *
 * TypeScript type definitions for AI-SOP
 */

export interface SOP {
  id: string;
  title: string;
  version: string;
  type: 'knowledge_block' | 'sequence' | 'filter';
  status: 'active' | 'inactive' | 'draft';
  description?: string;
  purpose?: string;
  scope?: string;
  metadata?: any;
}

export interface SOPConfig {
  name: string;
  version: string;
  description: string;
  registry: {
    knowledge_blocks: Record<string, SOP>;
    sequences: Record<string, SOP>;
    filters: Record<string, SOP>;
  };
}

export interface SOPExecutionContext {
  sopId: string;
  context?: any;
  parameters?: Record<string, any>;
  metadata?: any;
}

export interface SOPExecutionResult {
  sopId: string;
  status: 'success' | 'error' | 'partial';
  result: any;
  error?: string;
  metadata?: any;
}
