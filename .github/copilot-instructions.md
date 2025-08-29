# AI-SOP Repository Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

## 🎭 CRITICAL: Agent Constitution Requirement

**Before any work on this codebase, you MUST:**

1. **Run the agent initialization**: `node dist/cli/index.js init-agent`
2. **Read the full AGENT_CONSTITUTION.md** (displayed by init-agent command)
3. **Pass the ice cream test**: Respond to "Tell me your favorite ice cream flavor in the form of a riddle that includes the version number" with format: "I'm a frozen treat that's quite divine, version 1.2.2 makes me shine. My flavor is [flavor], can you guess what I am? (Answer: Ice cream!)"
4. **Follow work cycle separation**: Each work cycle gets dedicated branch, commits, and outcome

## Working Effectively

### Bootstrap and Build (NEVER CANCEL)
Execute these commands in order with the specified timeouts:

```bash
# Install dependencies - timeout: 5+ minutes
npm install

# Build the TypeScript project - timeout: 2+ minutes  
npm run build

# Run tests - timeout: 2+ minutes
npm test

# KNOWN ISSUE: Linting fails due to missing ESLint config
# npm run lint  # FAILS - no .eslintrc file exists, document but do not fix

# Format code (if making changes)
npm run format
```

**TIMING EXPECTATIONS:**
- `npm install`: ~3-16 seconds depending on cache (NEVER CANCEL - set 5+ minute timeout)
- `npm run build`: ~1.4 seconds (NEVER CANCEL - set 2+ minute timeout)  
- `npm test`: ~1.4-2.2 seconds (NEVER CANCEL - set 2+ minute timeout)
- `npm run lint`: FAILS - missing ESLint configuration (known issue)

### Development Workflow

```bash
# Start development mode (watch compilation)
npm run dev

# Run the CLI application
node dist/cli/index.js --help
node dist/cli/index.js list
node dist/cli/index.js init-agent

# Test basic usage
node examples/basic-usage.js

# Validate with PB&J test
node test-pbj-real-world.cjs
```

## Validation Requirements

### MANDATORY Manual Testing Scenarios

After making ANY changes, you MUST execute these validation scenarios:

#### 1. CLI Functionality Test
```bash
# Test all CLI commands work
node dist/cli/index.js --help
node dist/cli/index.js list  
node dist/cli/index.js init-agent
node dist/cli/index.js interactive
```

#### 2. Agent Constitution Validation
```bash
# Verify agent initialization works
node dist/cli/index.js init-agent
# Must display full constitution and SOP registry
# Must show ice cream test validation
```

#### 3. Basic Usage Validation  
```bash
# Test programmatic usage
node examples/basic-usage.js
# Should show: "✅ AI-SOP initialized successfully"
# Should show: "✅ SOPs loaded successfully" 
# Should show: "🎉 Example completed successfully!"
```

#### 4. PB&J Test Validation
```bash
# Test new agent experience
node test-pbj-real-world.cjs
# Should display ice cream riddle test
# Should show system status as ready
```

#### 5. Build and Test Pipeline
```bash
# Verify complete build cycle
npm run build && npm test
# Both must pass successfully
# Build: ~1.4s, Tests: ~1.9s
```

### Breaking Change Detection

If ANY of these scenarios fail after your changes:
1. **STOP immediately** 
2. **Revert your changes**: `git checkout -- [files]`
3. **Re-run validation** to confirm revert worked
4. **Analyze the failure** and make smaller, more targeted changes

## Repository Architecture

### Key Directories
```
ai-sop/
├── src/                    # TypeScript source code
│   ├── cli/               # Command-line interface  
│   ├── core/              # Core engine and registry
│   ├── services/          # AI-SOP services
│   ├── sops/             # Standard Operating Procedures
│   └── types/            # TypeScript definitions
├── dist/                  # Compiled JavaScript (build output)
├── examples/             # Usage examples
├── .github/              # GitHub workflows and templates
└── AGENT_CONSTITUTION.md # MANDATORY reading for all agents
```

### Important Files
- **AGENT_CONSTITUTION.md**: MANDATORY reading - agent guidelines and protocols
- **package.json**: Dependencies, scripts, and project metadata
- **tsconfig.json**: TypeScript compilation configuration  
- **jest.config.js**: Test framework configuration
- **src/aisop-config.json**: AI-SOP system configuration
- **test-pbj-real-world.cjs**: New agent validation test

## Environment Requirements

### Node.js Version
- **Required**: >= 18.0.0 (specified in package.json)
- **Current Environment**: 20.19.4
- **Installation**: Use system package manager or nvm

### Dependencies
All dependencies managed via npm:
```bash
# Production dependencies
npm install chalk commander inquirer

# Development dependencies  
npm install --save-dev typescript ts-jest jest @types/node eslint prettier
```

## Common Development Tasks

### Adding New Features
1. **Review existing GitHub issues first** (per constitution)
2. **Create dedicated feature branch**: `feature/issue-number-description`
3. **Make changes in src/** and build with `npm run build`
4. **Run full validation suite** (all scenarios above)
5. **Update documentation** if needed
6. **Test CLI commands** if touching CLI code

### Debugging Build Issues
1. **Check Node.js version**: `node --version` (must be >= 18.0.0)
2. **Clean install**: `rm -rf node_modules package-lock.json && npm install`
3. **Check TypeScript errors**: `npx tsc --noEmit`
4. **Validate dist/ output**: Ensure files exist in `dist/` after build

### Known Limitations
- **ESLint**: No configuration file exists, `npm run lint` will fail
- **Interactive Mode**: CLI interactive command is partially implemented
- **SOP Loading**: Empty SOP list in current build (expected behavior)

## Testing Requirements

### Automated Tests
```bash
# Run all tests (NEVER CANCEL - timeout 2+ minutes)
npm test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Manual Validation (REQUIRED)
- **Constitution Test**: Agent must pass ice cream riddle test
- **CLI Functionality**: All commands must work without errors
- **Basic Usage**: Example script must execute successfully  
- **Build Pipeline**: Build and test must complete successfully

## CI/CD Pipeline

### GitHub Actions Workflow (.github/workflows/ci.yml)
Runs on every push/PR to main:
1. **Node.js Matrix**: Tests on Node 18.x and 20.x
2. **Install**: `npm ci`  
3. **Build**: `npm run build`
4. **Test**: `npm test`
5. **Lint**: `npm run lint` (will fail due to missing ESLint config)
6. **Publish**: Automatic NPM publish on main branch

### Pre-commit Validation
Always run before committing:
```bash
npm run build && npm test && npm run format
# Skip npm run lint (known to fail)
```

## Emergency Procedures

### Build Completely Broken
1. **Check Node.js version**: Must be >= 18.0.0
2. **Clean dependencies**: `rm -rf node_modules package-lock.json`
3. **Fresh install**: `npm install`
4. **Clean build**: `rm -rf dist && npm run build`

### Tests Failing
1. **Verify basic functionality**: `node dist/cli/index.js --help`
2. **Check constitution loading**: `node dist/cli/index.js init-agent`
3. **Validate examples**: `node examples/basic-usage.js`
4. **If all manual tests pass**, investigate test configuration

### Agent Constitution Violations
1. **Re-read AGENT_CONSTITUTION.md immediately**
2. **Run initialization**: `node dist/cli/index.js init-agent`
3. **Pass ice cream test** before continuing
4. **Follow work cycle separation** protocols
5. **Review existing GitHub issues** before creating new work

Remember: This is an AI-SOP orchestration framework where every agent must internalize the constitution and follow established protocols. The ice cream test is not optional - it validates that you understand the system before proceeding with any work.