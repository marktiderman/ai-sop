/**
 * Phase Tracking Types for AI-SOP Leadership Dashboard
 * 
 * Defines the data structures for tracking agent phases, decisions,
 * and PB&J checkpoints as required by the constitution.
 */

export interface PhaseDefinition {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  entryConditions: string[];
  exitConditions: string[];
  nextPhases: string[];
}

export interface DecisionLog {
  id: string;
  timestamp: Date;
  agentId: string;
  phase: string;
  decision: string;
  reasoning: string;
  context: Record<string, any>;
  outcome?: string;
  tags: string[];
}

export interface PhaseTransition {
  id: string;
  timestamp: Date;
  agentId: string;
  fromPhase: string;
  toPhase: string;
  trigger: string;
  approvedBy?: string;
  notes?: string;
  context: Record<string, any>;
}

export interface PBJCheckpoint {
  id: string;
  timestamp: Date;
  agentId: string;
  phase: string;
  checkpoint: string;
  status: 'pass' | 'fail' | 'pending';
  details: string;
  improvementActions?: string[];
}

export interface AgentSession {
  agentId: string;
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  currentPhase: string;
  workCycleId?: string;
  gitBranch?: string;
  issueNumber?: string;
  decisions: DecisionLog[];
  transitions: PhaseTransition[];
  pbjCheckpoints: PBJCheckpoint[];
  status: 'active' | 'completed' | 'paused' | 'error';
}

export interface DashboardStats {
  totalSessions: number;
  activeSessions: number;
  phaseDistribution: Record<string, number>;
  recentDecisions: DecisionLog[];
  recentTransitions: PhaseTransition[];
  pbjSuccessRate: number;
  avgSessionDuration: number;
}

export interface PhaseTrackingConfig {
  phases: PhaseDefinition[];
  requireApprovalForTransitions: boolean;
  autoLogDecisions: boolean;
  pbjCheckpointFrequency: number; // minutes
  sessionTimeout: number; // minutes
  storageBackend: 'filesystem' | 'memory' | 'database';
  dashboardPort: number;
}

// Standard AI-SOP Phases from Constitution and Development Cycle
export const CONSTITUTION_PHASES: PhaseDefinition[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    description: 'Understanding requirements and exploring options',
    objectives: [
      'Analyze user requirements and context',
      'Research existing solutions and patterns',
      'Identify constraints and dependencies',
      'Define problem scope and boundaries'
    ],
    entryConditions: [
      'New work cycle initiated',
      'Requirements gathering needed',
      'Problem definition required'
    ],
    exitConditions: [
      'Problem clearly defined',
      'Requirements documented',
      'Solution approach identified'
    ],
    nextPhases: ['build']
  },
  {
    id: 'build',
    name: 'Build',
    description: 'Creating the solution and implementation',
    objectives: [
      'Design system architecture',
      'Implement core functionality',
      'Write tests and documentation',
      'Ensure code quality standards'
    ],
    entryConditions: [
      'Requirements clearly defined',
      'Solution approach approved',
      'Resources allocated'
    ],
    exitConditions: [
      'Core functionality implemented',
      'Tests passing',
      'Code review completed'
    ],
    nextPhases: ['delivery']
  },
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'Testing, validation, and deployment',
    objectives: [
      'Validate solution meets requirements',
      'Perform integration testing',
      'Deploy to target environment',
      'Monitor initial performance'
    ],
    entryConditions: [
      'Implementation completed',
      'Quality checks passed',
      'Deployment environment ready'
    ],
    exitConditions: [
      'Solution deployed successfully',
      'Performance metrics acceptable',
      'User acceptance achieved'
    ],
    nextPhases: ['feedback']
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Review, iteration, and improvement',
    objectives: [
      'Collect user feedback',
      'Analyze performance metrics',
      'Identify improvement opportunities',
      'Plan next iteration if needed'
    ],
    entryConditions: [
      'Solution deployed',
      'Initial usage data available',
      'Feedback collection mechanisms active'
    ],
    exitConditions: [
      'Feedback analyzed',
      'Improvements prioritized',
      'Next steps planned'
    ],
    nextPhases: ['discovery', 'build']
  }
];

export const DEVELOPMENT_CYCLE_PHASES: PhaseDefinition[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    description: 'Research and problem analysis',
    objectives: [
      'Research existing solutions',
      'Analyze problem domain',
      'Define requirements'
    ],
    entryConditions: ['New development work needed'],
    exitConditions: ['Problem clearly defined'],
    nextPhases: ['planning']
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Feature analysis and task planning',
    objectives: [
      'Apply Lighthouse Protocol',
      'Create GitHub issues',
      'Plan work breakdown'
    ],
    entryConditions: ['Requirements defined'],
    exitConditions: ['Work plan approved'],
    nextPhases: ['development']
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Implementation and coding',
    objectives: [
      'Follow Git workflow',
      'Implement features',
      'Make structured commits'
    ],
    entryConditions: ['Work plan ready'],
    exitConditions: ['Implementation complete'],
    nextPhases: ['quality']
  },
  {
    id: 'quality',
    name: 'Quality',
    description: 'Testing and documentation',
    objectives: [
      'Run automated tests',
      'Update documentation',
      'Perform code review'
    ],
    entryConditions: ['Implementation complete'],
    exitConditions: ['Quality gates passed'],
    nextPhases: ['discovery', 'planning']
  }
];