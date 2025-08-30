/**
 * Dashboard Server for AI-SOP Phase Tracking
 * 
 * Simple HTTP server that provides a web interface for monitoring
 * agent phases, decisions, and PB&J checkpoints.
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { PhaseTracker } from './phase-tracker';

export class DashboardServer {
  private server: http.Server;
  private phaseTracker: PhaseTracker;
  private port: number;

  constructor(phaseTracker: PhaseTracker, port: number = 3000) {
    this.phaseTracker = phaseTracker;
    this.port = port;
    this.server = this.createServer();
  }

  private createServer(): http.Server {
    return http.createServer((req, res) => {
      // Enable CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      const url = new URL(req.url!, `http://localhost:${this.port}`);
      
      try {
        if (url.pathname === '/' || url.pathname === '/dashboard') {
          this.serveDashboard(res);
        } else if (url.pathname === '/api/stats') {
          this.serveStats(res);
        } else if (url.pathname === '/api/sessions') {
          this.serveSessions(res);
        } else if (url.pathname === '/api/phases') {
          this.servePhases(res);
        } else {
          this.serve404(res);
        }
      } catch (error) {
        this.serveError(res, error);
      }
    });
  }

  private serveDashboard(res: http.ServerResponse): void {
    const html = this.generateDashboardHTML();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }

  private serveStats(res: http.ServerResponse): void {
    const stats = this.phaseTracker.getDashboardStats();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats, null, 2));
  }

  private serveSessions(res: http.ServerResponse): void {
    const sessions = this.phaseTracker.getActiveSessions();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sessions, null, 2));
  }

  private servePhases(res: http.ServerResponse): void {
    const phases = this.phaseTracker.getPhases();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(phases, null, 2));
  }

  private serve404(res: http.ServerResponse): void {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }

  private serveError(res: http.ServerResponse, error: any): void {
    console.error('Dashboard server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }

  private generateDashboardHTML(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-SOP Leadership Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
        
        .card h3 {
            color: #4a5568;
            font-size: 1.2rem;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
        }
        
        .card h3 .emoji {
            margin-right: 8px;
            font-size: 1.4rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #2d3748;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #718096;
            margin-top: 4px;
        }
        
        .phase-distribution {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .phase-bar {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .phase-name {
            min-width: 80px;
            font-weight: 500;
        }
        
        .phase-progress {
            flex: 1;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .phase-fill {
            height: 100%;
            background: linear-gradient(90deg, #4299e1, #667eea);
            transition: width 0.3s ease;
        }
        
        .phase-count {
            font-weight: bold;
            color: #4a5568;
        }
        
        .activity-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .activity-item {
            padding: 12px;
            border-left: 3px solid #4299e1;
            margin-bottom: 12px;
            background: #f7fafc;
            border-radius: 0 6px 6px 0;
        }
        
        .activity-time {
            font-size: 0.8rem;
            color: #718096;
            margin-bottom: 4px;
        }
        
        .activity-text {
            font-size: 0.9rem;
            color: #2d3748;
        }
        
        .sessions-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }
        
        .sessions-table th,
        .sessions-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .sessions-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }
        
        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .status-active {
            background: #c6f6d5;
            color: #22543d;
        }
        
        .status-completed {
            background: #bee3f8;
            color: #2a4365;
        }
        
        .status-paused {
            background: #feebc8;
            color: #c05621;
        }
        
        .refresh-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4299e1;
            color: white;
            border: none;
            border-radius: 50%;
            width: 56px;
            height: 56px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(66, 153, 225, 0.4);
            transition: transform 0.2s ease;
        }
        
        .refresh-btn:hover {
            transform: scale(1.1);
        }
        
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎭 AI-SOP Leadership Dashboard</h1>
            <p>Monitor agent phases, decisions, and PB&J checkpoints in real-time</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="card">
                <h3><span class="emoji">📊</span>System Overview</h3>
                <div class="stats-grid">
                    <div class="stat">
                        <div class="stat-value" id="total-sessions">-</div>
                        <div class="stat-label">Total Sessions</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="active-sessions">-</div>
                        <div class="stat-label">Active Sessions</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="pbj-success">-</div>
                        <div class="stat-label">PB&J Success Rate</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="avg-duration">-</div>
                        <div class="stat-label">Avg Duration (min)</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3><span class="emoji">🎯</span>Phase Distribution</h3>
                <div class="phase-distribution" id="phase-distribution">
                    <p>Loading...</p>
                </div>
            </div>
            
            <div class="card">
                <h3><span class="emoji">📋</span>Recent Decisions</h3>
                <div class="activity-list" id="recent-decisions">
                    <p>Loading...</p>
                </div>
            </div>
            
            <div class="card">
                <h3><span class="emoji">🔄</span>Recent Transitions</h3>
                <div class="activity-list" id="recent-transitions">
                    <p>Loading...</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3><span class="emoji">🎭</span>Active Sessions</h3>
            <table class="sessions-table" id="sessions-table">
                <thead>
                    <tr>
                        <th>Agent ID</th>
                        <th>Phase</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Decisions</th>
                        <th>Transitions</th>
                        <th>PB&J Checks</th>
                    </tr>
                </thead>
                <tbody id="sessions-tbody">
                    <tr>
                        <td colspan="7">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <button class="refresh-btn" onclick="refreshData()" title="Refresh Data">🔄</button>
    
    <script>
        let isLoading = false;
        
        async function fetchData() {
            if (isLoading) return;
            isLoading = true;
            document.body.classList.add('loading');
            
            try {
                const [statsResponse, sessionsResponse] = await Promise.all([
                    fetch('/api/stats'),
                    fetch('/api/sessions')
                ]);
                
                const stats = await statsResponse.json();
                const sessions = await sessionsResponse.json();
                
                updateStats(stats);
                updatePhaseDistribution(stats.phaseDistribution);
                updateRecentDecisions(stats.recentDecisions);
                updateRecentTransitions(stats.recentTransitions);
                updateSessionsTable(sessions);
                
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                isLoading = false;
                document.body.classList.remove('loading');
            }
        }
        
        function updateStats(stats) {
            document.getElementById('total-sessions').textContent = stats.totalSessions;
            document.getElementById('active-sessions').textContent = stats.activeSessions;
            document.getElementById('pbj-success').textContent = stats.pbjSuccessRate.toFixed(1) + '%';
            document.getElementById('avg-duration').textContent = stats.avgSessionDuration.toFixed(1);
        }
        
        function updatePhaseDistribution(distribution) {
            const container = document.getElementById('phase-distribution');
            const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
            
            if (total === 0) {
                container.innerHTML = '<p>No active sessions</p>';
                return;
            }
            
            container.innerHTML = Object.entries(distribution)
                .map(([phase, count]) => {
                    const percentage = (count / total) * 100;
                    return \`
                        <div class="phase-bar">
                            <div class="phase-name">\${phase}</div>
                            <div class="phase-progress">
                                <div class="phase-fill" style="width: \${percentage}%"></div>
                            </div>
                            <div class="phase-count">\${count}</div>
                        </div>
                    \`;
                })
                .join('');
        }
        
        function updateRecentDecisions(decisions) {
            const container = document.getElementById('recent-decisions');
            
            if (decisions.length === 0) {
                container.innerHTML = '<p>No recent decisions</p>';
                return;
            }
            
            container.innerHTML = decisions.slice(0, 5)
                .map(decision => {
                    const timeAgo = Math.floor((Date.now() - new Date(decision.timestamp).getTime()) / (1000 * 60));
                    return \`
                        <div class="activity-item">
                            <div class="activity-time">\${timeAgo} minutes ago</div>
                            <div class="activity-text"><strong>\${decision.agentId}:</strong> \${decision.decision}</div>
                        </div>
                    \`;
                })
                .join('');
        }
        
        function updateRecentTransitions(transitions) {
            const container = document.getElementById('recent-transitions');
            
            if (transitions.length === 0) {
                container.innerHTML = '<p>No recent transitions</p>';
                return;
            }
            
            container.innerHTML = transitions.slice(0, 5)
                .map(transition => {
                    const timeAgo = Math.floor((Date.now() - new Date(transition.timestamp).getTime()) / (1000 * 60));
                    return \`
                        <div class="activity-item">
                            <div class="activity-time">\${timeAgo} minutes ago</div>
                            <div class="activity-text"><strong>\${transition.agentId}:</strong> \${transition.fromPhase} → \${transition.toPhase}</div>
                        </div>
                    \`;
                })
                .join('');
        }
        
        function updateSessionsTable(sessions) {
            const tbody = document.getElementById('sessions-tbody');
            
            if (sessions.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">No active sessions</td></tr>';
                return;
            }
            
            tbody.innerHTML = sessions
                .map(session => {
                    const duration = Math.floor((Date.now() - new Date(session.startTime).getTime()) / (1000 * 60));
                    const statusClass = \`status-\${session.status}\`;
                    
                    return \`
                        <tr>
                            <td>\${session.agentId}</td>
                            <td>\${session.currentPhase}</td>
                            <td><span class="status-badge \${statusClass}">\${session.status}</span></td>
                            <td>\${duration}m</td>
                            <td>\${session.decisions.length}</td>
                            <td>\${session.transitions.length}</td>
                            <td>\${session.pbjCheckpoints.length}</td>
                        </tr>
                    \`;
                })
                .join('');
        }
        
        function refreshData() {
            fetchData();
        }
        
        // Initial load and auto-refresh every 30 seconds
        fetchData();
        setInterval(fetchData, 30000);
    </script>
</body>
</html>
    `;
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`🎭 AI-SOP Dashboard running at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => {
        console.log('🛑 Dashboard server stopped');
        resolve();
      });
    });
  }
}