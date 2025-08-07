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

  test('should execute SOP without error', async () => {
    const result = await aiSop.executeSOP('test-sop', { test: true });
    expect(result).toBeUndefined(); // Currently returns undefined
  });

  test('should get SOP metadata', () => {
    const metadata = aiSop.getSOPMetadata('test-sop');
    expect(metadata).toBeUndefined(); // Currently returns undefined
  });
});
