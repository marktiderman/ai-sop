#!/usr/bin/env node

/**
 * AI-SOP CLI Tool
 *
 * Command-line interface for AI-SOP operations
 */

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { AISop } from '../index';

const program = new Command();

// Set up CLI
program
  .name('ai-sop')
  .description('AI-SOP orchestration framework CLI')
  .version('1.0.0');

// List SOPs command
program
  .command('list')
  .description('List all available SOPs')
  .action(async () => {
    try {
      const aiSop = new AISop();
      const sops = aiSop.listSOPs();

      console.log(chalk.blue('📚 Available SOPs:'));
      sops.forEach(sop => {
        console.log(chalk.green(`  • ${sop}`));
      });
    } catch (error) {
      console.error(chalk.red('Error listing SOPs:'), error);
    }
  });

// Execute SOP command
program
  .command('execute <sopId>')
  .description('Execute a specific SOP')
  .option('-c, --context <context>', 'Context data for SOP execution')
  .action(async (sopId, options) => {
    try {
      const aiSop = new AISop();
      const result = await aiSop.executeSOP(sopId, options.context);

      console.log(chalk.green('✅ SOP executed successfully:'));
      console.log(result);
    } catch (error) {
      console.error(chalk.red('Error executing SOP:'), error);
    }
  });

// Interactive mode
program
  .command('interactive')
  .description('Start interactive AI-SOP session')
  .action(async () => {
    console.log(chalk.blue('🎭 Welcome to AI-SOP Interactive Mode!'));

    const aiSop = new AISop();
    const sops = aiSop.listSOPs();

    if (sops.length === 0) {
      console.log(chalk.yellow('No SOPs available. Please load some SOPs first.'));
      return;
    }

    const { selectedSop } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSop',
        message: 'Select an SOP to execute:',
        choices: sops
      }
    ]);

    console.log(chalk.green(`Executing: ${selectedSop}`));
    // TODO: Implement interactive execution
  });

// Parse command line arguments
program.parse();
