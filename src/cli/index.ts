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
import { PhaseTracker } from '../services/phase-tracker';
import { DashboardServer } from '../services/dashboard-server';
import { CONSTITUTION_PHASES, DEVELOPMENT_CYCLE_PHASES } from '../types/phase-tracking';

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
      'AGENT_CONSTITUTION.md'
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
    console.log(chalk.white('1. Read the AGENT_CONSTITUTION.md completely'));
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

// Phase Tracking Commands
const phaseTracker = new PhaseTracker();

// Create phase command group
const phaseCommand = program
  .command('phase')
  .description('Phase tracking commands for AI-SOP agents');

// Start agent session command
phaseCommand
  .command('start <agentId>')
  .description('Start a new agent session with phase tracking')
  .option('-p, --phase <phase>', 'Initial phase (discovery, build, delivery, feedback)', 'discovery')
  .option('-w, --work-cycle <id>', 'Work cycle ID')
  .option('-b, --branch <branch>', 'Git branch name')
  .option('-i, --issue <number>', 'GitHub issue number')
  .option('--dev-cycle', 'Use development cycle phases instead of constitution phases')
  .action(async (agentId, options) => {
    try {
      if (options.devCycle) {
        phaseTracker.useDevelopmentCyclePhases();
      } else {
        phaseTracker.useConstitutionPhases();
      }

      const context: any = {};
      if (options.workCycle) context.workCycleId = options.workCycle;
      if (options.branch) context.gitBranch = options.branch;
      if (options.issue) context.issueNumber = options.issue;

      const session = phaseTracker.startSession(agentId, options.phase, context);
      
      console.log(chalk.green(`🎭 Agent session started!`));
      console.log(chalk.blue(`Session ID: ${session.sessionId}`));
      console.log(chalk.blue(`Agent ID: ${session.agentId}`));
      console.log(chalk.blue(`Initial Phase: ${session.currentPhase}`));
      
      if (context.gitBranch) console.log(chalk.blue(`Git Branch: ${context.gitBranch}`));
      if (context.issueNumber) console.log(chalk.blue(`Issue: #${context.issueNumber}`));
      
      console.log(chalk.yellow('\n📋 Constitution Requirements:'));
      console.log(chalk.white('✅ Agent must read AGENT_CONSTITUTION.md'));
      console.log(chalk.white('✅ Agent must identify current phase'));
      console.log(chalk.white('✅ Agent must get approval for phase transitions'));
      console.log(chalk.white('✅ Agent must document decisions and transitions'));
      
    } catch (error) {
      console.error(chalk.red('Error starting session:'), error);
    }
  });

// Phase transition command
phaseCommand
  .command('transition <sessionId> <toPhase>')
  .description('Transition agent to a new phase')
  .option('-t, --trigger <trigger>', 'Reason for transition', 'Manual transition')
  .option('-a, --approved-by <approver>', 'Approver name (required if approval is enabled)')
  .option('-n, --notes <notes>', 'Additional notes about the transition')
  .action(async (sessionId, toPhase, options) => {
    try {
      const success = phaseTracker.transitionPhase(
        sessionId,
        toPhase,
        options.trigger,
        options.approvedBy,
        options.notes
      );
      
      if (success) {
        console.log(chalk.green(`✅ Phase transition successful!`));
        console.log(chalk.blue(`Session: ${sessionId}`));
        console.log(chalk.blue(`New Phase: ${toPhase}`));
        console.log(chalk.blue(`Trigger: ${options.trigger}`));
        if (options.approvedBy) console.log(chalk.blue(`Approved by: ${options.approvedBy}`));
      }
    } catch (error) {
      console.error(chalk.red('Error transitioning phase:'), error);
    }
  });

// Log decision command
phaseCommand
  .command('decision <sessionId> <decision>')
  .description('Log a decision made by the agent')
  .option('-r, --reasoning <reasoning>', 'Reasoning behind the decision', '')
  .option('-c, --context <context>', 'Context as JSON string', '{}')
  .option('-o, --outcome <outcome>', 'Decision outcome (if known)')
  .option('-t, --tags <tags>', 'Comma-separated tags', '')
  .action(async (sessionId, decision, options) => {
    try {
      let context = {};
      try {
        context = JSON.parse(options.context);
      } catch (e) {
        console.warn(chalk.yellow('Invalid JSON context, using empty object'));
      }
      
      const tags = options.tags ? options.tags.split(',').map((t: string) => t.trim()) : [];
      
      phaseTracker.logDecision(
        sessionId,
        decision,
        options.reasoning,
        context,
        options.outcome,
        tags
      );
      
      console.log(chalk.green(`✅ Decision logged!`));
      console.log(chalk.blue(`Session: ${sessionId}`));
      console.log(chalk.blue(`Decision: ${decision}`));
      if (options.reasoning) console.log(chalk.blue(`Reasoning: ${options.reasoning}`));
      if (tags.length > 0) console.log(chalk.blue(`Tags: ${tags.join(', ')}`));
    } catch (error) {
      console.error(chalk.red('Error logging decision:'), error);
    }
  });

// PB&J checkpoint command
phaseCommand
  .command('pbj <sessionId> <checkpoint>')
  .description('Record a PB&J (Peanut Butter & Jelly) checkpoint')
  .option('-s, --status <status>', 'Checkpoint status (pass, fail, pending)', 'pending')
  .option('-d, --details <details>', 'Checkpoint details', '')
  .option('-a, --actions <actions>', 'Improvement actions (comma-separated)')
  .action(async (sessionId, checkpoint, options) => {
    try {
      if (!['pass', 'fail', 'pending'].includes(options.status)) {
        throw new Error('Status must be pass, fail, or pending');
      }
      
      const improvementActions = options.actions ? 
        options.actions.split(',').map((a: string) => a.trim()) : undefined;
      
      phaseTracker.recordPBJCheckpoint(
        sessionId,
        checkpoint,
        options.status as 'pass' | 'fail' | 'pending',
        options.details,
        improvementActions
      );
      
      const statusColor = options.status === 'pass' ? 'green' : 
                         options.status === 'fail' ? 'red' : 'yellow';
      
      console.log(chalk.green(`🥪 PB&J checkpoint recorded!`));
      console.log(chalk.blue(`Session: ${sessionId}`));
      console.log(chalk.blue(`Checkpoint: ${checkpoint}`));
      console.log(chalk[statusColor](`Status: ${options.status.toUpperCase()}`));
      if (options.details) console.log(chalk.blue(`Details: ${options.details}`));
      if (improvementActions) console.log(chalk.blue(`Actions: ${improvementActions.join(', ')}`));
    } catch (error) {
      console.error(chalk.red('Error recording PB&J checkpoint:'), error);
    }
  });

// Dashboard stats command
phaseCommand
  .command('stats')
  .description('Show dashboard statistics')
  .option('-j, --json', 'Output as JSON')
  .action(async (options) => {
    try {
      const stats = phaseTracker.getDashboardStats();
      
      if (options.json) {
        console.log(JSON.stringify(stats, null, 2));
        return;
      }
      
      console.log(chalk.blue.bold('📊 AI-SOP Phase Tracking Dashboard'));
      console.log(chalk.blue('═'.repeat(50)));
      console.log(chalk.green(`📈 Total Sessions: ${stats.totalSessions}`));
      console.log(chalk.green(`🔄 Active Sessions: ${stats.activeSessions}`));
      console.log(chalk.green(`🥪 PB&J Success Rate: ${stats.pbjSuccessRate.toFixed(1)}%`));
      console.log(chalk.green(`⏱️  Avg Session Duration: ${stats.avgSessionDuration.toFixed(1)} minutes`));
      
      console.log(chalk.blue('\n🎯 Phase Distribution:'));
      for (const [phase, count] of Object.entries(stats.phaseDistribution)) {
        console.log(chalk.white(`  ${phase}: ${count} sessions`));
      }
      
      console.log(chalk.blue('\n📋 Recent Decisions (last 24h):'));
      stats.recentDecisions.slice(0, 5).forEach(decision => {
        const timeAgo = Math.floor((Date.now() - decision.timestamp.getTime()) / (1000 * 60));
        console.log(chalk.white(`  [${timeAgo}m ago] ${decision.agentId}: ${decision.decision}`));
      });
      
      console.log(chalk.blue('\n🔄 Recent Transitions (last 24h):'));
      stats.recentTransitions.slice(0, 5).forEach(transition => {
        const timeAgo = Math.floor((Date.now() - transition.timestamp.getTime()) / (1000 * 60));
        console.log(chalk.white(`  [${timeAgo}m ago] ${transition.agentId}: ${transition.fromPhase} → ${transition.toPhase}`));
      });
      
    } catch (error) {
      console.error(chalk.red('Error getting stats:'), error);
    }
  });

// List active sessions command
phaseCommand
  .command('sessions')
  .description('List all active agent sessions')
  .option('-a, --all', 'Show all sessions (including completed)')
  .option('-j, --json', 'Output as JSON')
  .action(async (options) => {
    try {
      const sessions = options.all
        ? phaseTracker.getAllSessions()
        : phaseTracker.getActiveSessions();
      
      if (options.json) {
        console.log(JSON.stringify(sessions, null, 2));
        return;
      }
      
      console.log(chalk.blue.bold('🎭 Agent Sessions'));
      console.log(chalk.blue('═'.repeat(50)));
      
      if (sessions.length === 0) {
        console.log(chalk.yellow('No sessions found'));
        return;
      }
      
      sessions.forEach(session => {
        const duration = session.endTime ? 
          Math.floor((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)) :
          Math.floor((Date.now() - session.startTime.getTime()) / (1000 * 60));
        
        const statusColor = session.status === 'active' ? 'green' : 
                           session.status === 'completed' ? 'blue' : 'yellow';
        
        console.log(chalk.white(`\n📝 ${session.sessionId}`));
        console.log(chalk.white(`   Agent: ${session.agentId}`));
        console.log(chalk.white(`   Phase: ${session.currentPhase}`));
        console.log(chalk[statusColor](`   Status: ${session.status}`));
        console.log(chalk.white(`   Duration: ${duration} minutes`));
        const md = (session as any).metadata || {};
        if (md.gitBranch) console.log(chalk.white(`   Branch: ${md.gitBranch}`));
        if (md.issueNumber) console.log(chalk.white(`   Issue: #${md.issueNumber}`));
        console.log(chalk.white(`   Decisions: ${session.decisions.length}`));
        console.log(chalk.white(`   Transitions: ${session.transitions.length}`));
        console.log(chalk.white(`   PB&J Checkpoints: ${session.pbjCheckpoints.length}`));
      });
    } catch (error) {
      console.error(chalk.red('Error listing sessions:'), error);
    }
  });

// End session command
phaseCommand
  .command('end <sessionId>')
  .description('End an agent session')
  .option('-o, --outcome <outcome>', 'Session outcome description')
  .action(async (sessionId, options) => {
    try {
      phaseTracker.endSession(sessionId, options.outcome);
      
      console.log(chalk.green(`✅ Session ended!`));
      console.log(chalk.blue(`Session ID: ${sessionId}`));
      if (options.outcome) console.log(chalk.blue(`Outcome: ${options.outcome}`));
    } catch (error) {
      console.error(chalk.red('Error ending session:'), error);
    }
  });

// Phase info command
phaseCommand
  .command('info')
  .description('Show information about available phases')
  .option('--dev-cycle', 'Show development cycle phases instead of constitution phases')
  .action(async (options) => {
    try {
      const phases = options.devCycle ? DEVELOPMENT_CYCLE_PHASES : CONSTITUTION_PHASES;
      const phaseType = options.devCycle ? 'Development Cycle' : 'Constitution';
      
      console.log(chalk.blue.bold(`🎯 ${phaseType} Phases`));
      console.log(chalk.blue('═'.repeat(50)));
      
      phases.forEach(phase => {
        console.log(chalk.green(`\n📍 ${phase.name} (${phase.id})`));
        console.log(chalk.white(`   ${phase.description}`));
        console.log(chalk.white(`   Objectives:`));
        phase.objectives.forEach(obj => {
          console.log(chalk.white(`     • ${obj}`));
        });
        console.log(chalk.white(`   Next phases: ${phase.nextPhases.join(', ')}`));
      });
    } catch (error) {
      console.error(chalk.red('Error showing phase info:'), error);
    }
  });

// Dashboard server command
phaseCommand
  .command('dashboard')
  .description('Start the web dashboard for phase tracking')
  .option('-p, --port <port>', 'Port to run the dashboard on', '3000')
  .option('--dev-cycle', 'Use development cycle phases instead of constitution phases')
  .action(async (options) => {
    try {
      if (options.devCycle) {
        phaseTracker.useDevelopmentCyclePhases();
      } else {
        phaseTracker.useConstitutionPhases();
      }

      const port = parseInt(options.port);
      const dashboard = new DashboardServer(phaseTracker, port);
      
      console.log(chalk.blue.bold('🎭 Starting AI-SOP Leadership Dashboard...'));
      console.log(chalk.blue('═'.repeat(50)));
      
      await dashboard.start();
      
      console.log(chalk.green(`✅ Dashboard is running!`));
      console.log(chalk.blue(`🌐 Open your browser and go to: http://localhost:${port}`));
      console.log(chalk.yellow('\n📋 Dashboard Features:'));
      console.log(chalk.white('  • Real-time phase tracking'));
      console.log(chalk.white('  • Decision logs visualization'));
      console.log(chalk.white('  • PB&J checkpoint monitoring'));
      console.log(chalk.white('  • Active sessions overview'));
      console.log(chalk.white('  • Auto-refresh every 30 seconds'));
      console.log(chalk.blue('\n⌨️  Press Ctrl+C to stop the server'));
      
      // Keep the process running
      process.on('SIGINT', async () => {
        console.log(chalk.yellow('\n🛑 Stopping dashboard server...'));
        await dashboard.stop();
        process.exit(0);
      });
      
    } catch (error) {
      console.error(chalk.red('Error starting dashboard:'), error);
    }
  });

// Parse command line arguments
program.parse();
