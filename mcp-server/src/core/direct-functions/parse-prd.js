/**
 * parse-prd.js
 * Direct function implementation for parsing PRD documents
 */

import path from 'path';
import fs from 'fs';
import os from 'os'; // Import os module for home directory check
import { parsePRD } from '../../../../scripts/modules/task-manager.js';
import { findTasksJsonPath } from '../utils/path-utils.js';
import {
	enableSilentMode,
	disableSilentMode
} from '../../../../scripts/modules/utils.js';
import {
	getAnthropicClientForMCP,
	getOpenAIClientForMCP,
	getModelConfig,
	getOpenAIModelConfig
} from '../utils/ai-client-utils.js';

/**
 * Direct function wrapper for parsing PRD documents and generating tasks.
 *
 * @param {Object} args - Command arguments containing input, numTasks or tasks, and output options.
 * @param {Object} log - Logger object.
 * @param {Object} context - Context object containing session data.
 * @returns {Promise<Object>} - Result object with success status and data/error information.
 */
export async function parsePRDDirect(args, log, context = {}) {
	const { session } = context;
	enableSilentMode(); // Disable console output for MCP server

	try {
		// Validate project root exists
		if (!args.projectRoot) {
			throw new Error('Project root is required');
		}

		// Resolve PRD path
		const prdPath = path.resolve(args.projectRoot, args.input);

		// If not exists, throw an error
		if (!fs.existsSync(prdPath)) {
			throw new Error(`PRD file not found: ${prdPath}`);
		}

		// Resolve tasks.json path
		const tasksPath = args.output
			? path.resolve(args.projectRoot, args.output)
			: findTasksJsonPath(args.projectRoot);

		// Check if tasks.json already exists (only if tasksPath is valid)
		if (tasksPath && fs.existsSync(tasksPath) && !args.force) {
			throw new Error(
				`Tasks file already exists at ${tasksPath}. Use the 'force' option to overwrite.`
			);
		}

		// Determine which AI model to use based on configuration
		const preferClaude = session?.env?.PREFER_CLAUDE === 'true' || process.env.PREFER_CLAUDE === 'true';
		
		// Get appropriate client based on preference
		let aiClient = null;
		let modelConfig = null;
		
		if (preferClaude) {
			try {
				aiClient = getAnthropicClientForMCP(session, log);
				modelConfig = getModelConfig(session);
				log.info('Using Claude for PRD parsing');
			} catch (error) {
				log.warn(`Failed to initialize Claude client: ${error.message}. Falling back to OpenAI.`);
				preferClaude = false;
			}
		}
		
		// Fall back to OpenAI if Claude setup failed or wasn't preferred
		if (!preferClaude) {
			try {
				aiClient = await getOpenAIClientForMCP(session, log);
				modelConfig = getOpenAIModelConfig(session);
				log.info('Using OpenAI for PRD parsing');
			} catch (error) {
				log.error(`Failed to initialize OpenAI client: ${error.message}`);
				throw new Error(`No AI models available. Check your API keys.`);
			}
		}

		// Parse the number of tasks
		const numTasks = args.numTasks ? parseInt(args.numTasks, 10) : 10;

		// Call parsePRD with AI client and model config
		const tasksData = await parsePRD(
			prdPath,
			tasksPath,
			numTasks,
			{
				mcpLog: log,
				session,
				preferClaude
			},
			aiClient,
			modelConfig
		);

		disableSilentMode(); // Re-enable console output after task is complete

		return {
			success: true,
			data: {
				message: `Generated ${tasksData.tasks.length} tasks from PRD`,
				tasksPath,
				prdPath,
				taskCount: tasksData.tasks.length
			}
		};
	} catch (error) {
		disableSilentMode(); // Re-enable console output even on error
		log.error(`Error in parsePRDDirect: ${error.message}`);

		return {
			success: false,
			error: {
				message: error.message,
				code: 'PRD_PARSE_ERROR'
			}
		};
	}
}
