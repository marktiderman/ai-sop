/**
 * AI-SOP Routes: Endpoints for AI-SOP Orchestration Framework
 *
 * Provides REST API access to AI-SOP system functionality
 * when FEATURE_AI_SOP_SYSTEM is enabled.
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { requireFeature } from '../config/featureFlags';
import { aiSopService } from '../services/aiSopService';
import { logger } from '../utils/logger';

/**
 * Get AI-SOP system status and configuration
 */
export async function getAISopStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const status = aiSopService.getStatus();

    reply.status(200).send({
      success: true,
      data: status,
      message: status.enabled ? 'AI-SOP System is active' : 'AI-SOP System is disabled',
    });
  } catch (error) {
    logger.error('Failed to get AI-SOP status:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to retrieve AI-SOP system status',
    });
  }
}

/**
 * Execute an AI-SOP sequence
 */
export async function executeSequence(
  request: FastifyRequest<{
    Params: { sequenceId: string };
    Body: { context?: any };
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { sequenceId } = request.params;
    const { context = {} } = request.body || {};

    if (!sequenceId) {
      reply.status(400).send({
        success: false,
        error: 'Sequence ID is required',
      });
      return;
    }

    logger.info(`API request to execute sequence: ${sequenceId}`);

    const result = await aiSopService.executeSequence(sequenceId, context);

    if (!result) {
      reply.status(404).send({
        success: false,
        error: `Sequence ${sequenceId} not found or system disabled`,
      });
      return;
    }

    reply.status(200).send({
      success: true,
      data: result,
      message: `Sequence ${sequenceId} executed successfully`,
    });
  } catch (error) {
    logger.error('Failed to execute sequence:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to execute AI-SOP sequence',
    });
  }
}

/**
 * Apply an AI-SOP filter for validation
 */
export async function applyFilter(
  request: FastifyRequest<{
    Params: { filterId: string };
    Body: { input: any };
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { filterId } = request.params;
    const { input } = request.body || {};

    if (!filterId) {
      reply.status(400).send({
        success: false,
        error: 'Filter ID is required',
      });
      return;
    }

    if (input === undefined) {
      reply.status(400).send({
        success: false,
        error: 'Input data is required',
      });
      return;
    }

    logger.info(`API request to apply filter: ${filterId}`);

    const result = await aiSopService.applyFilter(filterId, input);

    reply.status(200).send({
      success: true,
      data: result,
      message: `Filter ${filterId} applied successfully`,
    });
  } catch (error) {
    logger.error('Failed to apply filter:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to apply AI-SOP filter',
    });
  }
}

/**
 * Get available sequences
 */
export async function getAvailableSequences(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const sequences = aiSopService.getAvailableSequences();

    reply.status(200).send({
      success: true,
      data: {
        sequences,
        count: sequences.length,
      },
      message: 'Available sequences retrieved successfully',
    });
  } catch (error) {
    logger.error('Failed to get available sequences:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to retrieve available sequences',
    });
  }
}

/**
 * Get available filters
 */
export async function getAvailableFilters(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const filters = aiSopService.getAvailableFilters();

    reply.status(200).send({
      success: true,
      data: {
        filters,
        count: filters.length,
      },
      message: 'Available filters retrieved successfully',
    });
  } catch (error) {
    logger.error('Failed to get available filters:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to retrieve available filters',
    });
  }
}

/**
 * Initialize AI-SOP system (useful for testing or manual initialization)
 */
export async function initializeAISop(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    logger.info('Manual AI-SOP system initialization requested');

    const success = await aiSopService.initialize();

    if (success) {
      reply.status(200).send({
        success: true,
        data: aiSopService.getStatus(),
        message: 'AI-SOP system initialized successfully',
      });
    } else {
      reply.status(503).send({
        success: false,
        error: 'AI-SOP system initialization failed or is disabled',
      });
    }
  } catch (error) {
    logger.error('Failed to initialize AI-SOP system:', error);
    reply.status(500).send({
      success: false,
      error: 'Failed to initialize AI-SOP system',
    });
  }
}

// Middleware wrapper that requires the AI_SOP_SYSTEM feature flag
export const requireAISopFeature = requireFeature('AI_SOP_SYSTEM');
