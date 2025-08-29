#!/usr/bin/env node

/**
 * AI-SOP Phase Tracking Demo
 * 
 * Demonstrates the phase tracking system with simulated agent activity.
 * This creates sample data to showcase dashboard and CLI functionality.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🎭 AI-SOP Phase Tracking Demo');
console.log('═'.repeat(50));

// Ensure we're using the built CLI
const cliPath = path.join(__dirname, 'dist', 'cli', 'index.js');
if (!require('fs').existsSync(cliPath)) {
  console.error('Built CLI not found at dist/cli/index.js. Run: npm run build');
  process.exit(1);
}
function runCommand(command, silent = false) {
  try {
    const result = execSync(`node ${cliPath} ${command}`, { 
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit'
    });
    return result;
  } catch (error) {
    if (!silent) {
      console.error(`Error running command: ${command}`);
      console.error(error.message);
    }
    return null;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runDemo() {
  console.log('\n📋 Step 1: Starting multiple agent sessions...');
  
  // Start several agent sessions to simulate real activity
  const agents = [
    { 
      id: 'cursor-agent', 
      phase: 'discovery', 
      branch: 'feature/user-auth',
      issue: '42',
      workCycle: 'authentication-system'
    },
    { 
      id: 'copilot-agent', 
      phase: 'build', 
      branch: 'feature/payment-integration',
      issue: '43',
      workCycle: 'payment-processing'
    },
    { 
      id: 'coderabbit-agent', 
      phase: 'delivery', 
      branch: 'feature/notification-system',
      issue: '44',
      workCycle: 'push-notifications'
    }
  ];

  const sessionIds = [];

  for (const agent of agents) {
    console.log(`\n🎭 Starting session for ${agent.id}...`);
    const output = runCommand(
      `phase start ${agent.id} --phase ${agent.phase} --branch ${agent.branch} --issue ${agent.issue} --work-cycle ${agent.workCycle}`,
      true
    );
    
    if (output) {
      const sessionMatch = output.match(/Session ID: ([^\n]+)/);
      if (sessionMatch) {
        sessionIds.push({ sessionId: sessionMatch[1], agent });
        console.log(`✅ Session started: ${sessionMatch[1]}`);
      }
    }
    
    await sleep(1000); // Small delay for realistic timing
  }

  console.log('\n📋 Step 2: Logging decisions and activities...');

  // Simulate decision-making and activities
  const activities = [
    {
      agentIndex: 0,
      type: 'decision',
      content: 'Implementing JWT-based authentication',
      reasoning: 'More secure and scalable than session-based auth',
      context: JSON.stringify({ technology: 'JWT', security_level: 'high' }),
      tags: 'architecture,security'
    },
    {
      agentIndex: 1,
      type: 'decision',
      content: 'Using Stripe for payment processing',
      reasoning: 'Industry standard with excellent documentation and support',
      context: JSON.stringify({ provider: 'Stripe', alternatives: ['PayPal', 'Square'] }),
      tags: 'payments,integration'
    },
    {
      agentIndex: 0,
      type: 'pbj',
      checkpoint: 'Can new developer follow auth setup guide?',
      status: 'fail',
      details: 'Missing environment variable setup instructions',
      actions: 'Add .env.example,Update README with setup steps'
    },
    {
      agentIndex: 2,
      type: 'decision',
      content: 'Using Firebase Cloud Messaging for push notifications',
      reasoning: 'Cross-platform support and reliable delivery',
      context: JSON.stringify({ service: 'FCM', platforms: ['iOS', 'Android', 'Web'] }),
      tags: 'notifications,mobile'
    },
    {
      agentIndex: 1,
      type: 'pbj',
      checkpoint: 'Payment flow clearly documented?',
      status: 'pass',
      details: 'Complete flowchart and error handling documented'
    }
  ];

  for (const activity of activities) {
    if (activity.agentIndex >= sessionIds.length) continue;
    
    const { sessionId } = sessionIds[activity.agentIndex];
    
    if (activity.type === 'decision') {
      console.log(`\n📝 Logging decision for ${sessionIds[activity.agentIndex].agent.id}...`);
      runCommand(
        `phase decision ${sessionId} "${activity.content}" --reasoning "${activity.reasoning}" --context '${activity.context}' --tags "${activity.tags}"`,
        true
      );
    } else if (activity.type === 'pbj') {
      console.log(`\n🥪 Recording PB&J checkpoint for ${sessionIds[activity.agentIndex].agent.id}...`);
      const actionsFlag = activity.actions ? `--actions "${activity.actions}"` : '';
      runCommand(
        `phase pbj ${sessionId} "${activity.checkpoint}" --status ${activity.status} --details "${activity.details}" ${actionsFlag}`,
        true
      );
    }
    
    await sleep(800);
  }

  console.log('\n📋 Step 3: Simulating phase transitions...');

  // Simulate some phase transitions
  const transitions = [
    {
      agentIndex: 0,
      toPhase: 'build',
      trigger: 'Requirements analysis complete',
      approver: 'tech-lead',
      notes: 'All security requirements documented'
    },
    {
      agentIndex: 2,
      toPhase: 'feedback',
      trigger: 'Notification system deployed to staging',
      approver: 'product-manager',
      notes: 'Ready for user testing'
    }
  ];

  for (const transition of transitions) {
    if (transition.agentIndex >= sessionIds.length) continue;
    
    const { sessionId } = sessionIds[transition.agentIndex];
    console.log(`\n🔄 Transitioning ${sessionIds[transition.agentIndex].agent.id} to ${transition.toPhase}...`);
    
    runCommand(
      `phase transition ${sessionId} ${transition.toPhase} --trigger "${transition.trigger}" --approved-by "${transition.approver}" --notes "${transition.notes}"`,
      true
    );
    
    await sleep(1000);
  }

  console.log('\n📋 Step 4: Showing current system status...');

  // Show statistics
  console.log('\n📊 Current Statistics:');
  runCommand('phase stats');

  console.log('\n📋 Step 5: Demo complete!');
  console.log('═'.repeat(50));
  console.log('🎯 What you can do now:');
  console.log('');
  console.log('1. 🌐 Start the web dashboard:');
  console.log('   ai-sop phase dashboard');
  console.log('   Then open http://localhost:3000');
  console.log('');
  console.log('2. 📱 View active sessions:');
  console.log('   ai-sop phase sessions');
  console.log('');
  console.log('3. 📊 Check updated statistics:');
  console.log('   ai-sop phase stats');
  console.log('');
  console.log('4. 🔍 Get session details (JSON):');
  console.log('   ai-sop phase sessions --json');
  console.log('');
  console.log('5. 📖 Learn about phases:');
  console.log('   ai-sop phase info');
  console.log('');
  console.log('6. 🛑 End a session when done:');
  if (sessionIds.length > 0) {
    console.log(`   ai-sop phase end ${sessionIds[0].sessionId} --outcome "Feature completed"`);
  }
  console.log('');
  console.log('🎭 The AI-SOP Phase Tracking system is now active!');
  console.log('📚 Read PHASE_TRACKING_GUIDE.md for complete documentation.');
}

// Check if we're being run directly
if (require.main === module) {
  runDemo().catch(error => {
    console.error('Demo failed:', error);
    process.exit(1);
  });
}

module.exports = { runDemo };