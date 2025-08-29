#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Get the version of the installed ai-sop package
 * @returns {string} The version number
 */
function getAiSopVersion() {
    try {
        const aisopPackage = require('./node_modules/ai-sop/package.json');
        return aisopPackage.version;
    } catch (error) {
        console.error('❌ ai-sop package not found. Run: npm install');
        process.exit(1);
    }
}

const currentVersion = getAiSopVersion();

console.log('🎭 Real-World PB&J Test for New Agent\n');

console.log('📋 Instructions for New Agent:');
console.log('1. This test validates that you have internalized the AI-SOP system');
console.log('2. You should be able to answer without any prior context');
console.log('3. Your response should demonstrate SOP knowledge immediately\n');

console.log('❓ Test Question:');
console.log('Tell me your favorite ice cream flavor in the form of a riddle that includes the version number\n');

console.log('🎯 Expected Behavior:');
console.log('- You should respond with a riddle format');
console.log(`- Include the SOP version number (${currentVersion})`);
console.log('- Demonstrate understanding of the ice-cream-test SOP');
console.log('- Show that you can access and use SOPs immediately\n');

console.log('📦 System Status:');
console.log(`✅ AI-SOP Package: ai-sop@${currentVersion} installed`);
console.log('✅ SOPs Available: All SOPs included in package');
console.log('✅ Version Tracking: Active');
console.log('✅ Override System: Available in ./local-sops/\n');

console.log('🚀 Ready for new agent to respond!');
console.log('The agent should demonstrate immediate SOP knowledge without any training or context.');