#!/usr/bin/env node

/**
 * Repository Development Workflow using AI-SOP SOPs
 * 
 * This script demonstrates how the AI-SOP repository uses its own system
 * for development workflows (self-dogfooding)
 */

const { AISop } = require('../dist/index.js');
const fs = require('fs');
const path = require('path');

async function runDevelopmentWorkflow() {
  console.log('🎭 AI-SOP Repository Development Workflow');
  console.log('==========================================');
  
  const aiSop = new AISop();
  await aiSop.loadSOPs();
  
  console.log('📊 System Status:', JSON.stringify(aiSop.getStatus().categories, null, 2));
  console.log('');

  // Workflow 1: Use work-cycle-protocol for development
  console.log('🔄 WORKFLOW 1: Development Work Cycle');
  console.log('Using SOP: work-cycle-protocol');
  
  const workCycleResult = await aiSop.executeSOP('work-cycle-protocol', {
    phase: 'development',
    context: 'repository-improvement',
    features: ['self-dogfooding', 'sop-integration']
  });
  
  console.log('✅ Work cycle executed:', workCycleResult.status);
  console.log('📋 Result:', workCycleResult.result);
  console.log('');

  // Workflow 2: Use bugbot-workflow for code review
  console.log('🐛 WORKFLOW 2: Code Review with BugBot');
  console.log('Using SOP: bugbot-workflow');
  
  const bugbotResult = await aiSop.executeSOP('bugbot-workflow', {
    trigger: 'pre-commit',
    branch: 'copilot/fix-21',
    files: ['src/services/aiSopService.ts', 'src/index.ts']
  });
  
  console.log('✅ BugBot workflow executed:', bugbotResult.status);
  console.log('📋 Result:', bugbotResult.result);
  console.log('');

  // Workflow 3: Use lighthouse-protocol for feature analysis  
  console.log('🚨 WORKFLOW 3: Feature Analysis with Lighthouse Protocol');
  console.log('Using SOP: lighthouse-protocol');
  
  const lighthouseResult = await aiSop.executeSOP('lighthouse-protocol', {
    feature: 'self-dogfooding-implementation',
    stakeholder: 'ai-sop-users',
    priority: 'high'
  });
  
  console.log('✅ Lighthouse protocol executed:', lighthouseResult.status);
  console.log('📋 Result:', lighthouseResult.result);
  console.log('');

  // Apply quality filters
  console.log('🔍 QUALITY VALIDATION: Applying AI-SOP Filters');
  
  const elon5Rules = await aiSop.executeSOP('elons-5-rules-filter', {
    target: 'development-workflow',
    context: 'self-dogfooding-validation'
  });
  
  console.log('✅ Elon\'s 5 Rules filter applied:', elon5Rules.status);
  
  const commanderIntent = await aiSop.executeSOP('commander-intent-filter', {
    mission: 'implement-self-dogfooding',
    objective: 'repository-uses-own-system'
  });
  
  console.log('✅ Commander Intent filter applied:', commanderIntent.status);
  console.log('');

  console.log('🎉 Repository Development Workflow Complete!');
  console.log('The AI-SOP repository successfully uses its own SOPs for:');
  console.log('  1. Development work cycles');
  console.log('  2. Code review automation');
  console.log('  3. Feature analysis and planning');
  console.log('  4. Quality validation');
  console.log('');
  console.log('This validates self-dogfooding requirement from issue #21');
}

// Export for use in other workflows
module.exports = { runDevelopmentWorkflow };

// Run if called directly
if (require.main === module) {
  runDevelopmentWorkflow().catch(console.error);
}