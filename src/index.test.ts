import { AISop } from './index';

describe('AISop', () => {
  let aiSop: AISop;

  beforeEach(() => {
    aiSop = new AISop();
  });

  test('should instantiate successfully', () => {
    expect(aiSop).toBeInstanceOf(AISop);
  });

  test('should return empty SOPs list initially', () => {
    const sops = aiSop.listSOPs();
    expect(Array.isArray(sops)).toBe(true);
    expect(sops.length).toBe(0);
  });

  test('should load SOPs without error', async () => {
    await expect(aiSop.loadSOPs()).resolves.not.toThrow();
  });

  test('should have SOPs after loading', async () => {
    await aiSop.loadSOPs();
    const sops = aiSop.listSOPs();
    expect(sops.length).toBeGreaterThan(0);
    expect(sops).toContain('work-cycle-protocol');
    expect(sops).toContain('bugbot-workflow');
  });

  test('should execute SOP successfully with real SOP', async () => {
    await aiSop.loadSOPs();
    const result = await aiSop.executeSOP('work-cycle-protocol', { test: true });
    expect(result).toBeDefined();
    expect(result.sopId).toBe('work-cycle-protocol');
    expect(result.status).toBe('executed');
  });

  test('should throw error for non-existent SOP', async () => {
    await aiSop.loadSOPs();
    await expect(aiSop.executeSOP('non-existent-sop', { test: true }))
      .rejects.toThrow('SOP not found: non-existent-sop');
  });

  test('should get SOP metadata for real SOP', async () => {
    await aiSop.loadSOPs();
    const metadata = aiSop.getSOPMetadata('work-cycle-protocol');
    expect(metadata).toBeDefined();
    expect(metadata.id).toBe('work-cycle-protocol');
    expect(metadata.title).toBeDefined();
  });

  test('should return null for non-existent SOP metadata', async () => {
    await aiSop.loadSOPs();
    const metadata = aiSop.getSOPMetadata('non-existent-sop');
    expect(metadata).toBeNull();
  });

  test('should get SOPs by category', async () => {
    await aiSop.loadSOPs();
    const sequences = aiSop.getSOPsByCategory('sequence');
    expect(Object.keys(sequences).length).toBeGreaterThan(0);
    
    const knowledgeBlocks = aiSop.getSOPsByCategory('knowledge_block');
    expect(Object.keys(knowledgeBlocks).length).toBeGreaterThan(0);
  });

  test('should provide status information', async () => {
    await aiSop.loadSOPs();
    const status = aiSop.getStatus();
    expect(status.initialized).toBe(true);
    expect(status.sopCount).toBeGreaterThan(0);
    expect(status.categories).toBeDefined();
    expect(status.config).toBeDefined();
  });
});
