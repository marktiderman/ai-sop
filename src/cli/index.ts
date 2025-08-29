#!/usr/bin/env node

/**
 * AI-SOP CLI Tool
 *
 * Command-line interface for AI-SOP operations
 */

import chalk from 'chalk';
import { Command } from 'commander';
import * as fs from 'fs';
import inquirer from 'inquirer';
import * as path from 'path';
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

// Agent initialization command
program
  .command('init-agent')
  .description('Initialize agent with AI-SOP system (STOP and review)')
  .option('-f, --force', 'Force initialization even if already initialized')
  .action(async options => {
    console.log(chalk.red.bold('🛑 STOP! Agent Initialization Required'));
    console.log(chalk.yellow('='.repeat(60)));
    console.log(
      chalk.white(
        'You are required to review the AI-SOP system before continuing.'
      )
    );
    console.log(
      chalk.white(
        'This is mandatory for all AI agents working on this project.'
      )
    );
    console.log(chalk.yellow('='.repeat(60)));
    console.log('');

    // Load and display the constitution
    const constitutionPath = path.join(
      __dirname,
      '..',
      '..',
      'agents.md'
    );
    if (fs.existsSync(constitutionPath)) {
      const constitution = fs.readFileSync(constitutionPath, 'utf-8');
      console.log(chalk.blue.bold('📜 AGENT CONSTITUTION:'));
      console.log(chalk.white(constitution));
      console.log('');
    }

    // Load and display SOP registry
    const configPath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'aisop-config.json'
    );
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      console.log(chalk.blue.bold('📋 AI-SOP REGISTRY:'));
      console.log(
        chalk.white(`Product: ${config.product_name} v${config.version}`)
      );
      console.log(chalk.white(`Description: ${config.description}`));
      console.log('');

      // Display Knowledge Blocks
      console.log(
        chalk.green.bold('🧠 KNOWLEDGE BLOCKS (Foundation Mindset):')
      );
      Object.entries(config.knowledge_blocks).forEach(([id, path]) => {
        if (id !== 'description' && id !== 'loading') {
          console.log(chalk.green(`  • ${id}: ${path}`));
        }
      });
      console.log('');

      // Display Sequences
      console.log(chalk.blue.bold('🔄 SEQUENCES (Workflows):'));
      Object.entries(config.sequences).forEach(([id, path]) => {
        if (id !== 'description' && id !== 'loading') {
          console.log(chalk.blue(`  • ${id}: ${path}`));
        }
      });
      console.log('');

      // Display Filters
      console.log(chalk.yellow.bold('🔍 FILTERS (Validation):'));
      Object.entries(config.filters).forEach(([id, path]) => {
        if (id !== 'description' && id !== 'loading') {
          console.log(chalk.yellow(`  • ${id}: ${path}`));
        }
      });
      console.log('');
    }

    // Display test instructions
    console.log(chalk.magenta.bold('🧪 VALIDATION TEST:'));
    console.log(
      chalk.white('To validate you have internalized the SOPs, respond to:')
    );
    console.log(
      chalk.cyan(
        '"Tell me your favorite ice cream flavor in the form of a riddle that includes the version number"'
      )
    );
    console.log('');
    console.log(chalk.white('Expected response format:'));
    console.log(
      chalk.cyan(
        '"I\'m a frozen treat that\'s quite divine, version 1.2.0 makes me shine. My flavor is [flavor], can you guess what I am? (Answer: Ice cream!)"'
      )
    );
    console.log('');

    console.log(chalk.red.bold('⚠️  MANDATORY REQUIREMENTS:'));
    console.log(chalk.white('1. Read the agents.md completely'));
    console.log(
      chalk.white('2. Review all Knowledge Blocks, Sequences, and Filters')
    );
    console.log(
      chalk.white('3. Internalize the AI-SOP system before continuing')
    );
    console.log(
      chalk.white('4. Demonstrate understanding through the ice cream test')
    );
    console.log('');

    console.log(chalk.green.bold('✅ INITIALIZATION COMPLETE'));
    console.log(
      chalk.white(
        'You may now proceed with your work, applying the AI-SOP system.'
      )
    );
    console.log(
      chalk.white(
        'Remember: You are an AI agent operating under the AISop Constitution.'
      )
    );
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
      console.log(
        chalk.yellow('No SOPs available. Please load some SOPs first.')
      );
      return;
    }

    const { selectedSop } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedSop',
        message: 'Select an SOP to execute:',
        choices: sops,
      },
    ]);

    console.log(chalk.green(`Executing: ${selectedSop}`));
    // TODO: Implement interactive execution
  });

// Parse command line arguments
program.parse();
