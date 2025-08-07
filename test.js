#!/usr/bin/env node

/**
 * Simple test script for AI-SOP package
 */

const { AISop } = require('./dist/index.js');

console.log('🎭 Testing AI-SOP Package...\n');

// Test basic functionality
try {
  const aiSop = new AISop();
  console.log('✅ AISop class instantiated successfully');
  
  const sops = aiSop.listSOPs();
  console.log(`✅ listSOPs() returned: ${sops.length} SOPs`);
  
  console.log('\n🎉 All tests passed! Package is working correctly.');
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
