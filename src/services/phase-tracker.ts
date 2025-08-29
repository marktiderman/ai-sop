/**
 * Phase Tracking Service
 * 
 * Core service for managing agent phases, decision logs, and PB&J checkpoints.
 * Provides the backend functionality for the leadership dashboard.
 */

import * as fs from 'fs';
import * as path from 'path';
import { 
  AgentSession, 
  DecisionLog, 
  PhaseTransition, 
  PBJCheckpoint, 
  DashboardStats,
  PhaseTrackingConfig,
  PhaseDefinition,
  CONSTITUTION_PHASES,
  DEVELOPMENT_CYCLE_PHASES
} from '../types/phase-tracking';

export class PhaseTracker {
  private config: PhaseTrackingConfig;
  private sessions: Map<string, AgentSession> = new Map();
  private dataDir: string;
  private phases: PhaseDefinition[];

  constructor(config?: Partial<PhaseTrackingConfig>) {
    this.config = {
      phases: CONSTITUTION_PHASES,
      requireApprovalForTransitions: true,
      autoLogDecisions: true,
      pbjCheckpointFrequency: 30,
      sessionTimeout: 120,
      storageBackend: 'filesystem',
      dashboardPort: 3000,
      ...config
    };

    this.phases = this.config.phases;
    this.dataDir = path.join(process.cwd(), '.ai-sop', 'phase-tracking');
    this.ensureDataDirectory();
    this.loadSessions();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private getSessionFilePath(sessionId: string): string {
    return path.join(this.dataDir, `session-${sessionId}.json`);
  }

  private loadSessions(): void {
    try {
      if (fs.existsSync(this.dataDir)) {
        const files = fs.readdirSync(this.dataDir);
        for (const file of files) {
          if (file.startsWith('session-') && file.endsWith('.json')) {
            const sessionData = JSON.parse(
              fs.readFileSync(path.join(this.dataDir, file), 'utf-8')
            );
            
            // Convert date strings back to Date objects
            sessionData.startTime = new Date(sessionData.startTime);
            if (sessionData.endTime) {
              sessionData.endTime = new Date(sessionData.endTime);
            }
            
            sessionData.decisions = sessionData.decisions?.map((d: any) => ({
              ...d,
              timestamp: new Date(d.timestamp)
            })) || [];
            
            sessionData.transitions = sessionData.transitions?.map((t: any) => ({
              ...t,
              timestamp: new Date(t.timestamp)
            })) || [];
            
            sessionData.pbjCheckpoints = sessionData.pbjCheckpoints?.map((p: any) => ({
              ...p,
              timestamp: new Date(p.timestamp)
            })) || [];
            
            this.sessions.set(sessionData.sessionId, sessionData);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load existing sessions:', error);
    }
  }

  private saveSession(session: AgentSession): void {
    try {
      const filePath = this.getSessionFilePath(session.sessionId);
      fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  /**
   * Start a new agent session
   */
  startSession(agentId: string, initialPhase: string = 'discovery', context?: Record<string, any>): AgentSession {
    const sessionId = `${agentId}-${Date.now()}`;
    const session: AgentSession = {
      agentId,
      sessionId,
      startTime: new Date(),
      currentPhase: initialPhase,
      decisions: [],
      transitions: [],
      pbjCheckpoints: [],
      status: 'active',
      ...context
    };

    this.sessions.set(sessionId, session);
    this.saveSession(session);

    // Log initial phase entry
    this.logDecision(sessionId, 'Session started', `Agent ${agentId} initialized in ${initialPhase} phase`, context || {});

    return session;
  }

  /**
   * End an agent session
   */
  endSession(sessionId: string, outcome?: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.endTime = new Date();
      session.status = 'completed';
      
      if (outcome) {
        this.logDecision(sessionId, 'Session completed', outcome, {});
      }
      
      this.saveSession(session);
    }
  }

  /**
   * Get current phase for an agent session
   */
  getCurrentPhase(sessionId: string): string | null {
    const session = this.sessions.get(sessionId);
    return session?.currentPhase || null;
  }

  /**
   * Transition to a new phase
   */
  transitionPhase(
    sessionId: string, 
    toPhase: string, 
    trigger: string, 
    approvedBy?: string,
    notes?: string
  ): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const fromPhase = session.currentPhase;
    const fromPhaseDefinition = this.phases.find(p => p.id === fromPhase);
    
    // Validate transition is allowed
    if (fromPhaseDefinition && !fromPhaseDefinition.nextPhases.includes(toPhase)) {
      throw new Error(`Invalid phase transition from ${fromPhase} to ${toPhase}`);
    }

    // Check if approval is required
    if (this.config.requireApprovalForTransitions && !approvedBy) {
      throw new Error('Phase transition requires approval');
    }

    const transition: PhaseTransition = {
      id: `${sessionId}-transition-${Date.now()}`,
      timestamp: new Date(),
      agentId: session.agentId,
      fromPhase,
      toPhase,
      trigger,
      approvedBy,
      notes,
      context: {}
    };

    session.currentPhase = toPhase;
    session.transitions.push(transition);
    
    this.saveSession(session);
    
    this.logDecision(
      sessionId,
      'Phase transition',
      `Transitioned from ${fromPhase} to ${toPhase}: ${trigger}`,
      { fromPhase, toPhase, trigger, approvedBy }
    );

    return true;
  }

  /**
   * Log a decision made by an agent
   */
  logDecision(
    sessionId: string,
    decision: string,
    reasoning: string,
    context: Record<string, any>,
    outcome?: string,
    tags: string[] = []
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const decisionLog: DecisionLog = {
      id: `${sessionId}-decision-${Date.now()}`,
      timestamp: new Date(),
      agentId: session.agentId,
      phase: session.currentPhase,
      decision,
      reasoning,
      context,
      outcome,
      tags
    };

    session.decisions.push(decisionLog);
    this.saveSession(session);
  }

  /**
   * Record a PB&J checkpoint
   */
  recordPBJCheckpoint(
    sessionId: string,
    checkpoint: string,
    status: 'pass' | 'fail' | 'pending',
    details: string,
    improvementActions?: string[]
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const pbjCheckpoint: PBJCheckpoint = {
      id: `${sessionId}-pbj-${Date.now()}`,
      timestamp: new Date(),
      agentId: session.agentId,
      phase: session.currentPhase,
      checkpoint,
      status,
      details,
      improvementActions
    };

    session.pbjCheckpoints.push(pbjCheckpoint);
    this.saveSession(session);

    // Auto-log decision for failed checkpoints
    if (status === 'fail' && this.config.autoLogDecisions) {
      this.logDecision(
        sessionId,
        'PB&J checkpoint failed',
        `Failed checkpoint: ${checkpoint}. ${details}`,
        { checkpoint, status, details, improvementActions },
        undefined,
        ['pbj-failure', 'quality-issue']
      );
    }
  }

  /**
   * Get all active sessions
   */
  getActiveSessions(): AgentSession[] {
    return Array.from(this.sessions.values()).filter(s => s.status === 'active');
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): AgentSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all sessions for an agent
   */
  getAgentSessions(agentId: string): AgentSession[] {
    return Array.from(this.sessions.values()).filter(s => s.agentId === agentId);
  }

  /**
   * Get dashboard statistics
   */
  getDashboardStats(): DashboardStats {
    const allSessions = Array.from(this.sessions.values());
    const activeSessions = allSessions.filter(s => s.status === 'active');
    
    // Phase distribution
    const phaseDistribution: Record<string, number> = {};
    activeSessions.forEach(session => {
      phaseDistribution[session.currentPhase] = (phaseDistribution[session.currentPhase] || 0) + 1;
    });

    // Recent decisions (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentDecisions = allSessions
      .flatMap(s => s.decisions)
      .filter(d => d.timestamp > oneDayAgo)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 50);

    // Recent transitions (last 24 hours)
    const recentTransitions = allSessions
      .flatMap(s => s.transitions)
      .filter(t => t.timestamp > oneDayAgo)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20);

    // PB&J success rate
    const allCheckpoints = allSessions.flatMap(s => s.pbjCheckpoints);
    const passedCheckpoints = allCheckpoints.filter(c => c.status === 'pass').length;
    const pbjSuccessRate = allCheckpoints.length > 0 ? (passedCheckpoints / allCheckpoints.length) * 100 : 100;

    // Average session duration
    const completedSessions = allSessions.filter(s => s.status === 'completed' && s.endTime);
    const totalDuration = completedSessions.reduce((sum, s) => {
      return sum + (s.endTime!.getTime() - s.startTime.getTime());
    }, 0);
    const avgSessionDuration = completedSessions.length > 0 ? totalDuration / completedSessions.length / (1000 * 60) : 0;

    return {
      totalSessions: allSessions.length,
      activeSessions: activeSessions.length,
      phaseDistribution,
      recentDecisions,
      recentTransitions,
      pbjSuccessRate,
      avgSessionDuration
    };
  }

  /**
   * Get available phases
   */
  getPhases(): PhaseDefinition[] {
    return this.phases;
  }

  /**
   * Set phase definitions (for switching between constitution and development cycle phases)
   */
  setPhases(phases: PhaseDefinition[]): void {
    this.phases = phases;
    this.config.phases = phases;
  }

  /**
   * Use constitution phases
   */
  useConstitutionPhases(): void {
    this.setPhases(CONSTITUTION_PHASES);
  }

  /**
   * Use development cycle phases
   */
  useDevelopmentCyclePhases(): void {
    this.setPhases(DEVELOPMENT_CYCLE_PHASES);
  }

  /**
   * Clean up old sessions (older than specified days)
   */
  cleanupOldSessions(olderThanDays: number = 30): number {
    const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    let cleanedCount = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.startTime < cutoffDate && session.status === 'completed') {
        try {
          const filePath = this.getSessionFilePath(sessionId);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          this.sessions.delete(sessionId);
          cleanedCount++;
        } catch (error) {
          console.warn(`Failed to cleanup session ${sessionId}:`, error);
        }
      }
    }

    return cleanedCount;
  }
}