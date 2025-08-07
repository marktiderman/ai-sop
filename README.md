# AI-SOP 🎭

**AI-SOP orchestration framework for knowledge-based and prompt-based Standard Operating Procedures**

[![npm version](https://badge.fury.io/js/ai-sop.svg)](https://badge.fury.io/js/ai-sop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What is AI-SOP?

AI-SOP is a framework for creating, managing, and executing Standard Operating Procedures (SOPs) that are optimized for AI agents. It provides a structured approach to knowledge management and workflow orchestration.

### Key Features

- **🎭 SOP Orchestration**: Manage complex workflows with structured procedures
- **📚 Knowledge Blocks**: Organize foundational knowledge and principles
- **🔄 Sequences**: Define step-by-step processes and workflows
- **🎯 Filters**: Apply decision-making frameworks and validation rules
- **🛠️ CLI Tools**: Command-line interface for SOP operations
- **📊 Registry Management**: Centralized SOP registry with metadata
- **🔧 Extensible**: Plugin architecture for custom SOPs and integrations

## 🚀 Quick Start

### Installation

```bash
npm install ai-sop
```

### Basic Usage

```javascript
import { AISop } from 'ai-sop';

// Initialize AI-SOP
const aiSop = new AISop();

// Load SOPs
await aiSop.loadSOPs();

// Execute a specific SOP
const result = await aiSop.executeSOP('work-cycle-protocol', {
  context: 'feature-development'
});

// List available SOPs
const sops = aiSop.listSOPs();
```

### CLI Usage

```bash
# List all available SOPs
ai-sop list

# Execute a specific SOP
ai-sop execute work-cycle-protocol

# Start interactive mode
ai-sop interactive
```

## 📖 Documentation

### Core Concepts

#### Knowledge Blocks
Foundational principles and knowledge that guide decision-making:
- **Vehicles < Values**: Adaptive methods, unchanging goals
- **PB&J Principle**: Zero knowledge accessibility
- **AI-First Company Mindset**: Organizational principles

#### Sequences
Step-by-step processes and workflows:
- **Lighthouse Protocol**: Feature decision framework
- **Work Cycle Protocol**: Structured development blocks
- **BugBot Workflow**: Automated issue management

#### Filters
Decision-making frameworks and validation rules:
- **Elon's 5 Rules**: Innovation and efficiency filters
- **Commander Intent**: Goal alignment validation
- **Industry Best Practices**: Quality assurance filters

### Creating Custom SOPs

```javascript
// Define a custom SOP
const customSop = {
  id: 'my-custom-sop',
  title: 'My Custom SOP',
  type: 'sequence',
  version: '1.0.0',
  status: 'active',
  steps: [
    {
      step: 1,
      action: 'Initialize',
      description: 'Set up the environment'
    },
    {
      step: 2,
      action: 'Execute',
      description: 'Perform the main action'
    }
  ]
};

// Register the SOP
aiSop.registerSOP(customSop);
```

## 🏗️ Architecture

```
ai-sop/
├── src/
│   ├── core/          # Core engine and registry
│   ├── registry/      # SOP registry management
│   ├── tester/        # Registry testing tools
│   ├── cli/           # Command-line interface
│   └── types/         # TypeScript type definitions
├── dist/              # Compiled JavaScript
├── examples/          # Usage examples
└── docs/              # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/marktiderman/ai-sop.git
cd ai-sop

# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Start development mode
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the AI development community
- Inspired by the need for structured AI agent workflows
- Designed to make AI development more reliable and consistent

## 🔗 Links

- [GitHub Repository](https://github.com/marktiderman/ai-sop)
- [NPM Package](https://www.npmjs.com/package/ai-sop)
- [Documentation](https://github.com/marktiderman/ai-sop#readme)
- [Issues](https://github.com/marktiderman/ai-sop/issues)

---

**Made with 🎭 by the AI-SOP community**
