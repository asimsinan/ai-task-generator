#!/usr/bin/env node

// This is a wrapper script that suppresses deprecation warnings
// Specifically for the punycode module used by whatwg-url
process.noDeprecation = true;

// Import and run the main CLI script
import('../bin/ai-task-generator.js'); 