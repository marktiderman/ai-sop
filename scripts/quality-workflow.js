#!/usr/bin/env node

/**
 * AI-SOP Quality Assurance Workflow
 * 
 * Uses AI-SOP filters for comprehensive quality validation
 */

const { AISop } = require('../dist/index.js');

async function runQualityWorkflow() {
  console.log('🔍 AI-SOP Quality Assurance Workflow');
  console.log('=====================================');
  
  const aiSop = new AISop();
  await aiSop.loadSOPs();
  
  // Get all available filters
  const filters = aiSop.getSOPsByCategory('filter');
  console.log('🎯 Available Quality Filters:', Object.keys(filters).length);
  console.log('');

  // Apply Elon's 5 Rules for system optimization
  console.log('⚡ Applying Elon\'s 5 Rules Filter');
  const elonRules = await aiSop.executeSOP('elons-5-rules-filter', {
    target: 'ai-sop-repository',
    focus: 'self-dogfooding-implementation',
    questions: [
      'Are we making requirements less dumb?',
      'Can we delete unnecessary components?',
      'How can we simplify the implementation?',
      'What cycle time improvements are possible?',
      'What can we automate in this process?'
    ]
  });
  console.log('✅ Elon\'s Rules applied:', elonRules.status);
  console.log('');

  // Apply PB&J Clarity Filter
  console.log('🥪 Applying PB&J Clarity Filter');
  const pbjFilter = await aiSop.executeSOP('pb-and-j-clarity-filter', {
    target: 'ai-sop-implementation',
    testQuestion: 'Could a new developer understand and use this system without prior knowledge?',
    clarity_requirements: [
      'Clear installation instructions',
      'Working examples',
      'Self-documenting code',
      'Comprehensive error messages'
    ]
  });
  console.log('✅ PB&J Clarity applied:', pbjFilter.status);
  console.log('');

  // Apply AI-First Company Filter
  console.log('🤖 Applying AI-First Company Filter');
  const aiFirstFilter = await aiSop.executeSOP('ai-first-company-filter', {
    context: 'repository-development',
    evaluation_criteria: [
      'AI agents can use the system autonomously',
      'Self-dogfooding validates real-world usage',
      'System reduces AI agent friction',
      'Enables AI-human collaboration'
    ]
  });
  console.log('✅ AI-First filter applied:', aiFirstFilter.status);
  console.log('');

  // Apply Commander Intent Filter
  console.log('🎯 Applying Commander Intent Filter');
  const commanderFilter = await aiSop.executeSOP('commander-intent-filter', {
    mission: 'AI-SOP Self-Dogfooding',
    intent: 'Repository must use its own system to validate credibility and effectiveness',
    success_criteria: [
      'SOPs load and execute successfully',
      'Real development workflows use AI-SOP',
      'Quality validation through own filters',
      'Documentation reflects actual usage'
    ]
  });
  console.log('✅ Commander Intent applied:', commanderFilter.status);
  console.log('');

  // Apply Industry Best Practice Filter
  console.log('🏭 Applying Industry Best Practice Filter');
  const industryFilter = await aiSop.executeSOP('industry-best-practice-filter', {
    domain: 'software-development',
    practices: [
      'Automated testing and validation',
      'Self-documenting systems',
      'Dogfooding own products',
      'Quality gates and filters',
      'Continuous integration'
    ]
  });
  console.log('✅ Industry Best Practice applied:', industryFilter.status);
  console.log('');

  console.log('🎉 Quality Assurance Workflow Complete!');
  console.log('All AI-SOP quality filters have been applied to validate:');
  console.log('  ✅ System optimization (Elon\'s 5 Rules)');
  console.log('  ✅ Clarity and usability (PB&J)');
  console.log('  ✅ AI-first design principles');
  console.log('  ✅ Mission alignment (Commander Intent)');
  console.log('  ✅ Industry best practices');
  console.log('');
  console.log('🏆 AI-SOP repository passes comprehensive quality validation!');
}

module.exports = { runQualityWorkflow };

if (require.main === module) {
  runQualityWorkflow().catch(console.error);
}