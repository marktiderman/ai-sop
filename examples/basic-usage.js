#!/usr/bin/env node

/**
 * Basic Usage Example for AI-SOP Package
 * 
 * This example shows how to use the AI-SOP package in a Node.js application
 */

const { AISop } = require('../dist/index.js');

async function main() {
  console.log('🎭 AI-SOP Basic Usage Example\n');

  try {
    // Initialize AI-SOP
    const aiSop = new AISop();
    console.log('✅ AI-SOP initialized successfully');

    // Load SOPs (this would load from the registry)
    await aiSop.loadSOPs();
    console.log('✅ SOPs loaded successfully');

    // List available SOPs
    const sops = aiSop.listSOPs();
    console.log(`📚 Found ${sops.length} SOPs:`);
    sops.forEach(sop => {
      console.log(`  • ${sop}`);
    });

    // Example: Execute a work cycle protocol
    if (sops.length > 0) {
      console.log('\n🔄 Executing work cycle protocol...');
      const result = await aiSop.executeSOP('work-cycle-protocol', {
        context: 'feature-development',
        duration: '30-minutes'
      });
      console.log('✅ SOP execution result:', result);
    }

    console.log('\n🎉 Example completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the example
main();
