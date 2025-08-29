# AI-SOP Repository Instructions

**This repository uses the AI-SOP orchestration framework as the SINGLE SOURCE OF TRUTH for all procedures, workflows, and standards. These instructions provide only the bootstrap needed to access the authoritative AI-SOP system.**

## 🎭 CRITICAL: AI-SOP System Initialization (MANDATORY)

**Before ANY work on this codebase, you MUST initialize with the AI-SOP system:**

### **Step 1: Initialize AI-SOP Agent**
```bash
# This command loads the complete AI-SOP system and displays the mandatory constitution
node dist/cli/index.js init-agent
```

### **Step 2: Follow AI-SOP System Guidance**
- **Constitution**: Read the complete AGENT_CONSTITUTION.md (displayed by init-agent)
- **Ice Cream Test**: Pass the validation test as shown by the init-agent command
- **SOP Registry**: Review all Knowledge Blocks, Sequences, and Filters loaded by the system
- **Work Protocols**: Follow the work cycle separation and all procedures from the AI-SOP system

### **Step 3: Use AI-SOP as Authoritative Source**
- **ALL workflows** come from the AI-SOP system, not these instructions
- **ALL testing procedures** are defined in the AI-SOP registry
- **ALL standards and protocols** are maintained in the AI-SOP system
- **These instructions** are only for bootstrapping - AI-SOP is the authority

## Bootstrap Requirements (Minimum Needed to Access AI-SOP)

### Node.js Environment
- **Required**: >= 18.0.0 (Current: 20.19.4)
- **Verification**: `node --version` must show >= 18.0.0

### Essential Bootstrap Commands
```bash
# Install dependencies (timeout: 5+ minutes - NEVER CANCEL)
npm install

# Build TypeScript (timeout: 2+ minutes - NEVER CANCEL)  
npm run build

# Initialize AI-SOP system (MANDATORY - provides all procedures)
node dist/cli/index.js init-agent
```

### AI-SOP System Access
```bash
# Access complete SOP registry (authoritative source)
node dist/cli/index.js list

# Execute AI-SOP workflows (not manual procedures)
node dist/cli/index.js execute <sop-name>

# Interactive AI-SOP guidance
node dist/cli/index.js interactive
```

## Working with AI-SOP System

### Core Principle: Single Source of Truth
- **✅ CORRECT**: Use `node dist/cli/index.js init-agent` to get all procedures
- **✅ CORRECT**: Follow workflows defined in AI-SOP registry  
- **✅ CORRECT**: Reference constitution and SOPs loaded by AI-SOP system
- **❌ INCORRECT**: Follow manual procedures not defined in AI-SOP
- **❌ INCORRECT**: Use workflows not validated by AI-SOP system
- **❌ INCORRECT**: Skip AI-SOP initialization and wing it

### When AI-SOP System is Unavailable
If you cannot run `node dist/cli/index.js init-agent`:
1. **Stop immediately** - do not proceed without AI-SOP system
2. **Fix build issues**: Run `npm install && npm run build`
3. **Verify Node.js version**: Must be >= 18.0.0
4. **Report the issue** - AI-SOP system must be accessible

### Integration with External Tools
- **GitHub Copilot**: Must initialize with AI-SOP system before any work
- **Code Review Tools**: Should validate against AI-SOP standards
- **CI/CD Pipelines**: Must include AI-SOP validation steps
- **Documentation**: Should reference AI-SOP system as authoritative source

## AI-SOP System Commands (Authoritative Source)

### Primary Commands (Use These Instead of Manual Procedures)
```bash
# Get complete system status and validation
node dist/cli/index.js init-agent

# List all available procedures and workflows  
node dist/cli/index.js list

# Execute specific AI-SOP workflows
node dist/cli/index.js execute work-cycle-protocol
node dist/cli/index.js execute lighthouse-protocol  
node dist/cli/index.js execute bugbot-workflow

# Get interactive guidance for any task
node dist/cli/index.js interactive
```

### Validation Through AI-SOP System
```bash
# AI-SOP system provides all validation procedures
# Run init-agent to see current validation requirements
node dist/cli/index.js init-agent

# Basic functionality check through AI-SOP
node examples/basic-usage.js

# PB&J test as defined by AI-SOP system  
node test-pbj-real-world.cjs
```

### Emergency Procedures (When AI-SOP System Fails)
```bash
# If AI-SOP system is broken, fix it first:
npm install && npm run build

# If build fails, check environment:
node --version  # Must be >= 18.0.0

# If still broken, clean and rebuild:
rm -rf node_modules package-lock.json && npm install && npm run build
```

## Repository Context (Minimal - AI-SOP is Authoritative)

### File Structure (AI-SOP Provides Complete Architecture)
- **AGENT_CONSTITUTION.md**: Loaded and displayed by `init-agent` command
- **src/aisop-config.json**: AI-SOP system configuration
- **dist/**: Built JavaScript (required for AI-SOP CLI)
- **See AI-SOP system for complete architecture**: `node dist/cli/index.js init-agent`

### Known Bootstrap Issues
- **ESLint**: Missing configuration (known limitation - document but do not fix)
- **Build Timing**: Allow sufficient timeout as AI-SOP system specifies
- **Node Version**: Must be >= 18.0.0 for AI-SOP system to function

## Integration Philosophy

### AI-SOP as Conductor
This repository implements the **AI-SOP orchestration framework** where:
- **AI-SOP System**: The conductor providing all procedures and standards
- **These Instructions**: Minimal bootstrap to access the conductor  
- **AI Agents**: Musicians that follow the conductor's guidance
- **Repository Owner**: Composer who defines the vision through AI-SOP

### Future Changes
When the repository owner updates AI-SOP system procedures:
- **These instructions stay minimal** (just bootstrap)
- **AI-SOP system provides updated procedures** automatically
- **No need to update these instructions** for workflow changes
- **Single source of truth maintained** in AI-SOP system

---

**Remember: The AI-SOP system is your authoritative source. These instructions exist only to help you access that system. Once you run `node dist/cli/index.js init-agent`, follow the AI-SOP system guidance, not these instructions.**