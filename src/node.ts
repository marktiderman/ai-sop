/**
 * AI-SOP Node.js-specific exports
 * 
 * This module exports Node.js-only functionality like the DashboardServer
 * that should not be included in browser bundles.
 */

export * from './services/dashboard-server';
export * from './services/phase-tracker';
export * from './types/phase-tracking';