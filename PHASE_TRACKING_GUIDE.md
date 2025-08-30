# 🎭 AI-SOP Phase Tracking System

## Overview

The AI-SOP Phase Tracking System provides leadership visibility into agent phases, decision logs, and PB&J checkpoints as required by the Agent Constitution. This system enables project leaders to monitor work cycle progress and maintain oversight of AI agent decision-making processes.

## Features

- ✅ **Phase Tracking**: Monitor agent progression through Discovery, Build, Delivery, and Feedback phases
- ✅ **Decision Logging**: Capture and analyze agent decision-making processes
- ✅ **PB&J Checkpoints**: Ensure "Peanut Butter & Jelly" principle compliance
- ✅ **Web Dashboard**: Real-time visualization of agent activity
- ✅ **CLI Interface**: Command-line tools for phase management
- ✅ **Work Cycle Integration**: Links with existing GitHub issues and Git workflows

## Phase Definitions

### Constitution Phases (Default)

Based on the Agent Constitution requirements:

1. **Discovery** - Understanding requirements and exploring options
2. **Build** - Creating the solution and implementation  
3. **Delivery** - Testing, validation, and deployment
4. **Feedback** - Review, iteration, and improvement

### Development Cycle Phases (Alternative)

Based on the AI development cycle:

1. **Discovery** - Research and problem analysis
2. **Planning** - Feature analysis using Lighthouse Protocol
3. **Development** - Implementation and coding
4. **Quality** - Testing and documentation

## Quick Start

### 1. Start an Agent Session

```bash
# Basic session start
ai-sop phase start my-agent-id

# With additional context
ai-sop phase start cursor-agent \
  --phase discovery \
  --work-cycle "user-auth-feature" \
  --branch "feature/user-authentication" \
  --issue 42
```

### 2. Log Decisions

```bash
ai-sop phase decision cursor-agent-123456789 "Implementing JWT-based authentication" \
  --reasoning "More secure than session-based auth for API access" \
  --context '{"technology":"JWT","alternative":"sessions"}' \
  --tags "security,architecture"
```

### 3. Record PB&J Checkpoints

```bash
ai-sop phase pbj cursor-agent-123456789 "Can new developer follow auth setup guide?" \
  --status fail \
  --details "Missing environment variable setup instructions" \
  --actions "Add .env.example,Update README with setup steps"
```

### 4. Transition Phases

```bash
ai-sop phase transition cursor-agent-123456789 build \
  --trigger "Requirements analysis complete" \
  --approved-by "project-lead" \
  --notes "All acceptance criteria defined"
```

### 5. Launch Dashboard

```bash
ai-sop phase dashboard --port 3000
# Open http://localhost:3000 in your browser
```

## CLI Command Reference

### Session Management

```bash
# Start new session
ai-sop phase start <agentId> [options]
  --phase <phase>           # Initial phase (default: discovery)
  --work-cycle <id>         # Work cycle identifier
  --branch <branch>         # Git branch name
  --issue <number>          # GitHub issue number
  --dev-cycle              # Use development cycle phases

# End session
ai-sop phase end <sessionId> [options]
  --outcome <description>   # Session outcome

# List sessions
ai-sop phase sessions [options]
  --all                    # Include completed sessions
  --json                   # Output as JSON
```

### Phase Management

```bash
# Transition phase
ai-sop phase transition <sessionId> <toPhase> [options]
  --trigger <reason>       # Transition reason
  --approved-by <name>     # Approver (required if approval enabled)
  --notes <notes>          # Additional notes

# Show phase information
ai-sop phase info [options]
  --dev-cycle             # Show development cycle phases
```

### Decision Logging

```bash
ai-sop phase decision <sessionId> <decision> [options]
  --reasoning <text>       # Decision reasoning
  --context <json>         # Context as JSON string
  --outcome <result>       # Decision outcome
  --tags <tags>           # Comma-separated tags
```

### PB&J Checkpoints

```bash
ai-sop phase pbj <sessionId> <checkpoint> [options]
  --status <status>        # pass, fail, or pending
  --details <text>         # Checkpoint details
  --actions <actions>      # Improvement actions (comma-separated)
```

### Dashboard & Analytics

```bash
# Show statistics
ai-sop phase stats [options]
  --json                   # Output as JSON

# Start web dashboard
ai-sop phase dashboard [options]
  --port <port>           # Port number (default: 3000)
  --dev-cycle             # Use development cycle phases
```

## Web Dashboard

### Features

- **Real-time Statistics**: Total/active sessions, PB&J success rate, average duration
- **Phase Distribution**: Visual breakdown of agents across phases
- **Recent Activity**: Latest decisions and phase transitions
- **Active Sessions Table**: Overview of all current agent sessions
- **Auto-refresh**: Updates every 30 seconds

### API Endpoints

```bash
GET /                    # Dashboard HTML interface
GET /api/stats          # Dashboard statistics
GET /api/sessions       # Active sessions
GET /api/phases         # Available phases
```

## Integration with Work Cycle Protocols

### GitHub Issues Integration

When starting a session with an issue number:

```bash
ai-sop phase start cursor-agent --issue 42 --branch "feature/issue-42-auth"
```

The system automatically:
- Links the session to GitHub issue #42
- Associates with the specified Git branch
- Tracks progress against the work cycle

### Constitution Compliance

The system enforces constitution requirements:

1. **Phase Awareness**: Agents must identify current phase
2. **Transition Approval**: Phase changes require explicit approval
3. **Decision Documentation**: All decisions logged with reasoning
4. **PB&J Principle**: Regular clarity checkpoints

### Work Cycle Separation

Each session represents a single work cycle:
- Dedicated branch tracking
- Issue number association
- Separate decision logs
- Independent phase progression

## Data Storage

### File Structure

```
.ai-sop/
└── phase-tracking/
    ├── session-cursor-agent-1703123456789.json
    ├── session-cursor-agent-1703123567890.json
    └── ...
```

### Session Data Format

```json
{
  "agentId": "cursor-agent",
  "sessionId": "cursor-agent-1703123456789",
  "startTime": "2023-12-21T10:30:45.123Z",
  "endTime": null,
  "currentPhase": "build",
  "workCycleId": "user-auth-feature",
  "gitBranch": "feature/user-authentication",
  "issueNumber": "42",
  "status": "active",
  "decisions": [...],
  "transitions": [...],
  "pbjCheckpoints": [...]
}
```

## Security & Privacy

- **Local Storage**: All data stored locally in `.ai-sop/` directory
- **No External Calls**: System operates entirely offline
- **Configurable Retention**: Automatic cleanup of old sessions
- **Access Control**: File-system level security

## Configuration

### Default Settings

```json
{
  "phases": "CONSTITUTION_PHASES",
  "requireApprovalForTransitions": true,
  "autoLogDecisions": true,
  "pbjCheckpointFrequency": 30,
  "sessionTimeout": 120,
  "storageBackend": "filesystem",
  "dashboardPort": 3000
}
```

### Customization

```javascript
import { PhaseTracker } from 'ai-sop';

const tracker = new PhaseTracker({
  requireApprovalForTransitions: false,
  pbjCheckpointFrequency: 15,
  dashboardPort: 8080
});
```

## Best Practices

### For Project Leaders

1. **Monitor Phase Distribution**: Ensure balanced workload across phases
2. **Review Decision Logs**: Understand agent reasoning patterns
3. **Track PB&J Success**: Identify areas needing process improvement
4. **Use Dashboard**: Keep browser tab open for real-time monitoring

### For AI Agents

1. **Start Sessions Early**: Begin tracking at work cycle start
2. **Log Key Decisions**: Document important choices with reasoning
3. **Regular PB&J Checks**: Test process clarity frequently
4. **Proper Transitions**: Get approval before phase changes
5. **End Sessions**: Close with outcome summary

### For Teams

1. **Standardize Phase Models**: Choose constitution vs development cycle
2. **Define Approval Process**: Establish who can approve transitions
3. **Regular Reviews**: Weekly dashboard review meetings
4. **Process Improvement**: Use PB&J failures to improve SOPs

## Troubleshooting

### Common Issues

**Session not found:**
```bash
# Check session ID is correct
ai-sop phase sessions --all | grep <session-id>
```

**Permission denied on data directory:**
```bash
# Ensure write permissions
chmod 755 .ai-sop/phase-tracking/
```

**Dashboard not accessible:**
```bash
# Check port availability
netstat -an | grep :3000
```

### Data Recovery

```bash
# Backup sessions
cp -r .ai-sop/phase-tracking/ backup-$(date +%Y%m%d)/

# Restore from backup
cp -r backup-20231221/ .ai-sop/phase-tracking/
```

## Examples

### Complete Work Cycle Example

```bash
# 1. Start discovery phase
SESSION=$(ai-sop phase start cursor-agent --phase discovery --issue 42 | grep "Session ID:" | cut -d' ' -f3)

# 2. Log requirement analysis decision
ai-sop phase decision $SESSION "Use OAuth 2.0 for authentication" \
  --reasoning "Industry standard, better security than custom auth" \
  --context '{"alternatives":["custom","basic-auth"],"security-rating":"high"}' \
  --tags "architecture,security"

# 3. PB&J checkpoint
ai-sop phase pbj $SESSION "Can junior dev understand OAuth flow?" \
  --status pass \
  --details "Clear sequence diagram in docs"

# 4. Transition to build
ai-sop phase transition $SESSION build \
  --trigger "Requirements approved by stakeholders" \
  --approved-by "tech-lead"

# 5. Implementation decisions
ai-sop phase decision $SESSION "Using passport.js for OAuth integration" \
  --reasoning "Well-maintained library with extensive OAuth provider support" \
  --tags "implementation,library-choice"

# 6. PB&J checkpoint during build
ai-sop phase pbj $SESSION "Can new team member set up OAuth locally?" \
  --status fail \
  --details "Missing OAuth app registration instructions" \
  --actions "Add OAuth setup guide,Include .env.example with OAuth vars"

# 7. Final transition to delivery
ai-sop phase transition $SESSION delivery \
  --trigger "All tests passing, ready for deployment" \
  --approved-by "tech-lead"

# 8. End session
ai-sop phase end $SESSION --outcome "OAuth authentication successfully implemented and tested"
```

### Dashboard Monitoring

```bash
# Start dashboard in background
ai-sop phase dashboard --port 3000 &

# Generate activity for monitoring
for i in {1..5}; do
  ai-sop phase start test-agent-$i --phase discovery
done

# View statistics
ai-sop phase stats
```

## Advanced Usage

### Programmatic Integration

```javascript
import { PhaseTracker } from 'ai-sop/services/phase-tracker';

const tracker = new PhaseTracker();

// Start session programmatically
const session = tracker.startSession('my-agent', 'discovery', {
  workCycleId: 'feature-x',
  gitBranch: 'feature/x'
});

// Log decision
tracker.logDecision(
  session.sessionId,
  'Using React for frontend',
  'Team expertise and ecosystem',
  { framework: 'React', alternatives: ['Vue', 'Angular'] }
);
```

### Custom Phase Definitions

```javascript
import { PhaseTracker } from 'ai-sop/services/phase-tracker';

const customPhases = [
  {
    id: 'research',
    name: 'Research',
    description: 'Market and technical research',
    objectives: ['Understand market needs', 'Evaluate technologies'],
    entryConditions: ['Project approved'],
    exitConditions: ['Research complete'],
    nextPhases: ['prototype']
  },
  // ... more phases
];

const tracker = new PhaseTracker();
tracker.setPhases(customPhases);
```

## Support

For issues or questions:

1. Check this documentation
2. Review existing GitHub issues
3. Create new issue with detailed description
4. Include session logs and error messages

---

**🎭 Remember: This system preserves the conductor metaphor - you're orchestrating AI agents like musicians in an orchestra, ensuring they play in harmony with your organization's vision.**