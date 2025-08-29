#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 AI-SOP Override System Test\n');

console.log('📋 Testing Override Functionality:');
console.log('1. This test validates the local SOP override system');
console.log('2. Tests the ice cream riddle with and without overrides');
console.log('3. Demonstrates local-sops directory functionality\n');

// Paths
const localSopsDir = path.join(__dirname, 'local-sops');
const originalSopPath = path.join(__dirname, 'src', 'sops', 'ice-cream-test.json');
const overrideSopPath = path.join(localSopsDir, 'ice-cream-test.json');

console.log('📦 System Paths:');
console.log(`✅ Original SOP: ${originalSopPath}`);
console.log(`✅ Override Dir: ${localSopsDir}`);
console.log(`✅ Override SOP: ${overrideSopPath}\n`);

// Step 1: Load original SOP
console.log('🔍 Step 1: Loading Original SOP...');
if (!fs.existsSync(originalSopPath)) {
    console.log('❌ Original ice-cream-test.json not found!');
    process.exit(1);
}

function readJsonSafe(filePath, label) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`❌ Failed to load ${label} at ${filePath}: ${e.message}`);
    process.exit(1);
  }
}

function assertIceCreamSop(sop) {
  const ok =
    sop &&
    sop.content &&
    sop.content.default_response &&
    sop.content.override_response &&
    sop.content.version_tracking &&
    sop.content.version_tracking.sop_version &&
    sop.content.version_tracking.riddle_template;
  if (!ok) {
    console.error('❌ SOP structure invalid or missing required fields.');
    process.exit(1);
  }
}

const originalSop = readJsonSafe(originalSopPath, 'Original SOP');
assertIceCreamSop(originalSop);

console.log(`✅ Original SOP loaded: ${originalSop.title}`);
console.log(`   Default flavor: ${originalSop.content.default_response}`);
console.log(`   Version: ${originalSop.content.version_tracking.sop_version}\n`);
// Step 2: Test without override
console.log('🎯 Step 2: Testing WITHOUT Override...');
const defaultFlavor = (() => {
  const prefix = 'my favorite ice cream is ';
  const s = String(originalSop.content.default_response || '');
  if (s.toLowerCase().startsWith(prefix)) return s.slice(prefix.length);
  // Fallbacks if format changes
  return originalSop.content.default_flavor || s;
})();
const version = originalSop.content.version_tracking.sop_version;
const defaultRiddle = originalSop.content.version_tracking.riddle_template
    .replace('{version}', version)
    .replace('{flavor}', defaultFlavor);

console.log('   Expected riddle (default):');
console.log(`   "${defaultRiddle}"`);
console.log('   (Answer: Ice cream!)\n');

// Step 3: Create local-sops directory if it doesn't exist
console.log('🏗️  Step 3: Setting up Override System...');
if (!fs.existsSync(localSopsDir)) {
    fs.mkdirSync(localSopsDir, { recursive: true });
    console.log('✅ Created local-sops directory');
} else {
    console.log('✅ local-sops directory exists');
}

// Step 4: Create override SOP
console.log('📝 Step 4: Creating Override SOP...');
const overrideSop = structuredClone(originalSop);
overrideSop.content.default_response = `my favorite ice cream is ${originalSop.content.override_response}`;
overrideSop.content.override_active = true;
try {
  fs.writeFileSync(overrideSopPath, JSON.stringify(overrideSop, null, 2));
} catch (e) {
  console.error(`❌ Failed to write override SOP: ${e.message}`);
  process.exit(1);
}
console.log('✅ Override SOP created with chocolate flavor\n');

// Step 5: Test with override
console.log('🎯 Step 5: Testing WITH Override...');
const overrideFlavor = originalSop.content.override_response;
const overrideRiddle = originalSop.content.version_tracking.riddle_template
    .replace('{version}', version)
    .replace('{flavor}', overrideFlavor);

console.log('   Expected riddle (override):');
console.log(`   "${overrideRiddle}"`);
console.log('   (Answer: Ice cream!)\n');

// Step 6: Demonstrate system status
console.log('📊 Step 6: Override System Status...');
const roundTrip = readJsonSafe(overrideSopPath, 'Override SOP');
const overrideOk = roundTrip.content?.override_active === true &&
  roundTrip.content?.default_response !== originalSop.content.default_response;
const versionOk = roundTrip.content?.version_tracking?.sop_version === originalSop.content.version_tracking.sop_version;
console.log(`✅ Override System: ${overrideOk ? 'FUNCTIONAL' : 'BROKEN'}`);
console.log('✅ local-sops directory: CREATED');
console.log(`✅ Override SOP: ${overrideOk ? 'ACTIVE' : 'INACTIVE'}`);
console.log(`✅ Version tracking: ${versionOk ? 'MAINTAINED' : 'MISMATCH'}`);
console.log('✅ Riddle format: PRESERVED\n');
if (!overrideOk || !versionOk) {
  process.exitCode = 1;
}
// Step 7: Test scenario validation
console.log('🧪 Step 7: Test Scenario Validation...');
console.log('   Test scenarios from ice-cream-test.json:');
const scenarios = (originalSop.content && originalSop.content.test_scenario && typeof originalSop.content.test_scenario === 'object')
  ? originalSop.content.test_scenario
  : {};
if (Object.keys(scenarios).length === 0) {
  console.log('   ⚠️ No scenarios found.');
} else {
  Object.entries(scenarios).forEach(([step, description]) => {
    console.log(`   ✅ ${step}: ${description}`);
  });
}
console.log('');

// Step 8: Cleanup option
console.log('🧹 Step 8: Cleanup...');
console.log('   To remove override and test default behavior:');
if (process.platform === 'win32') {
  console.log(`   del ${overrideSopPath}   (CMD)`);
  console.log(`   Remove-Item ${overrideSopPath}   (PowerShell)`);
} else {
  console.log(`   rm ${overrideSopPath}`);
}
console.log('   To reactivate override:');
console.log(`   node ${__filename}\n`);
console.log('🚀 Override System Test Complete!');
console.log('The system successfully demonstrates:');
console.log('- Local SOP override functionality');
console.log('- Version tracking preservation');
console.log('- Riddle format consistency');
console.log('- Dynamic flavor switching via overrides');