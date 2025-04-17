#!/usr/bin/env node --no-deprecation

/**
 * AI Task Generator Init
 * This is an entry point for initializing new projects
 */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeProject } from '../scripts/init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

// Parse options (simple version)
args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    options[key] = value === undefined ? true : value;
  }
});

// Set the project root to current directory by default
if (!options.projectRoot) {
  options.projectRoot = process.cwd();
}

// Run the initialization
try {
  initializeProject(options)
    .then(() => {
      // Successful initialization
      process.exit(0);
    })
    .catch(err => {
      console.error('Error during initialization:', err);
      process.exit(1);
    });
} catch (error) {
  console.error('Failed to initialize project:', error);
  process.exit(1);
} 