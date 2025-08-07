/**
 * AI-SOP Loader
 *
 * Handles loading SOPs from various sources
 */

import * as fs from 'fs';
import * as path from 'path';

export interface SOPLoader {
  loadFromFile(filePath: string): Promise<any>;
  loadFromDirectory(dirPath: string): Promise<any[]>;
  loadFromConfig(configPath: string): Promise<any>;
}

export class AISopLoader implements SOPLoader {
  async loadFromFile(filePath: string): Promise<any> {
    try {
      const content = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to load SOP from file ${filePath}: ${error}`);
    }
  }

  async loadFromDirectory(dirPath: string): Promise<any[]> {
    try {
      const files = await fs.promises.readdir(dirPath);
      const sopFiles = files.filter(file => file.endsWith('.json'));

      const sops = [];
      for (const file of sopFiles) {
        const filePath = path.join(dirPath, file);
        const sop = await this.loadFromFile(filePath);
        sops.push(sop);
      }

      return sops;
    } catch (error) {
      throw new Error(`Failed to load SOPs from directory ${dirPath}: ${error}`);
    }
  }

  async loadFromConfig(configPath: string): Promise<any> {
    try {
      const config = await this.loadFromFile(configPath);
      return config;
    } catch (error) {
      throw new Error(`Failed to load config from ${configPath}: ${error}`);
    }
  }
}
