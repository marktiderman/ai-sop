#!/usr/bin/env node

/**
 * AI-SOP Knowledge Management Workflow
 * 
 * Uses AI-SOP knowledge blocks and sequences for learning and documentation
 */

const { AISop } = require('../dist/index.js');

async function runKnowledgeWorkflow() {
  console.log('🧠 AI-SOP Knowledge Management Workflow');
  console.log('========================================');
  
  const aiSop = new AISop();
  await aiSop.loadSOPs();
  
  // Load foundational knowledge blocks
  const knowledgeBlocks = aiSop.getSOPsByCategory('knowledge_block');
  console.log('📚 Available Knowledge Blocks:', Object.keys(knowledgeBlocks).length);
  console.log('');

  // Execute Vehicles vs Values knowledge block
  console.log('🚗 Loading Vehicles vs Values Knowledge');
  const vehiclesValues = await aiSop.executeSOP('vehicles-vs-values', {
    context: 'self-dogfooding-implementation',
    vehicle: 'specific AI-SOP service implementation',
    value: 'repository uses its own system for credibility'
  });
  console.log('✅ Vehicles vs Values loaded:', vehiclesValues.status);
  console.log('');

  // Execute AI-First Company Mindset
  console.log('🤖 Loading AI-First Company Mindset');
  const aiFirstMindset = await aiSop.executeSOP('ai-first-company-mindset', {
    application: 'repository-development',
    principles: [
      'AI agents can use the system independently',
      'Self-validation through dogfooding',
      'AI-human collaboration optimization'
    ]
  });
  console.log('✅ AI-First Mindset loaded:', aiFirstMindset.status);
  console.log('');

  // Use Learning Documentation sequence
  console.log('📖 Executing Learning Documentation Sequence');
  const learningDoc = await aiSop.executeSOP('learning-documentation', {
    learning_context: 'self-dogfooding-implementation',
    key_insights: [
      'Empty aiSopService.ts was the root cause',
      'CLI needed loadSOPs() calls before operations',
      'Tests required real SOP data instead of placeholders',
      'npm scripts enable easy SOP operations'
    ],
    documentation_updates: [
      'README examples now reflect actual usage',
      'Package.json includes SOP operation scripts',
      'GitHub Actions demonstrate real workflows'
    ]
  });
  console.log('✅ Learning Documentation executed:', learningDoc.status);
  console.log('');

  // Use Update Documentation Model sequence
  console.log('📝 Executing Update Documentation Model');
  const updateDoc = await aiSop.executeSOP('update-documentation-model', {
    target: 'repository-README',
    updates: [
      'Add self-dogfooding examples',
      'Document npm scripts for SOP operations',
      'Show GitHub Actions integration',
      'Provide real-world usage scenarios'
    ],
    validation: 'PB&J test - new users can follow examples'
  });
  console.log('✅ Documentation Model updated:', updateDoc.status);
  console.log('');

  // Execute Workspace Cleanup sequence
  console.log('🧹 Executing Workspace Cleanup');
  const cleanup = await aiSop.executeSOP('workspace-cleanup', {
    scope: 'ai-sop-repository',
    cleanup_targets: [
      'Remove placeholder TODOs',
      'Update test expectations',
      'Validate all SOPs load correctly',
      'Ensure build artifacts are clean'
    ]
  });
  console.log('✅ Workspace Cleanup executed:', cleanup.status);
  console.log('');

  console.log('🎉 Knowledge Management Workflow Complete!');
  console.log('Successfully applied AI-SOP knowledge management:');
  console.log('  📚 Foundational knowledge blocks loaded');
  console.log('  🚗 Vehicles vs Values principle applied');
  console.log('  🤖 AI-First mindset internalized');
  console.log('  📖 Learning documentation captured');
  console.log('  📝 Documentation models updated');
  console.log('  🧹 Workspace cleanup completed');
  console.log('');
  console.log('🧠 Knowledge workflow validates systematic learning approach!');
}

module.exports = { runKnowledgeWorkflow };

if (require.main === module) {
  runKnowledgeWorkflow().catch(console.error);
}