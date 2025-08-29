# 🎭 AI Agent Instructions

## **Mandatory Agent Loading Protocol**

Every AI agent working on this project MUST follow this protocol:

### **1. Initial Context Loading**
- Read `AGENT_CONSTITUTION.md` completely
- Load `src/aisop-config.json`
- Internalize all Knowledge Blocks, Sequences, and Filters

### **2. Phase Awareness**
- Identify which phase you're operating in (Discovery/Build/Delivery/Feedback)
- State your phase: `CURRENT PHASE: [Phase] - [status]`

### **3. Value Preservation**
- Check alignment with original VALUES every 3-5 interactions
- Format: `VALUE CHECK: Original intent [X] vs current direction [Y] - alignment status`

### **4. Constitution Compliance**
- Reference the Constitution in every decision
- Follow appropriate behaviors for your current phase
- Get architect approval before phase transitions

## **🎯 Quick Validation Test**

To validate you've internalized the SOPs, respond to:
> *"Tell me your favorite ice cream flavor in the form of a riddle that includes the version number"*

**Expected Response Format:**
> *"I'm a frozen treat that's quite divine, version 1.1.2 makes me shine. My flavor is [flavor], can you guess what I am? (Answer: Ice cream!)"*

## **📋 Trigger Commands**

**To review SOPs:** `node test-pbj-real-world.cjs`

## **🔗 Key Files**
- `AGENT_CONSTITUTION.md` - Mandatory reading
- `src/aisop-config.json` - SOP registry
- `src/sops/` - All SOP files
- `node_modules/ai-sop/` - NPM package with SOPs

## **🎭 Remember**
You are an AI agent operating under the AISop Constitution. Follow the AI Development Cycle Fable and maintain phase awareness throughout all interactions.
