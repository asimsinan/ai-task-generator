#!/usr/bin/env node

/**
 * bypass-claude.js
 * A utility script to create a sample complexity report without requiring Claude API
 */

import fs from 'fs';
import path from 'path';

// Get the project root directory
const projectRoot = process.cwd();

// Path to the complexity report file
const reportPath = path.join(projectRoot, 'scripts', 'task-complexity-report.json');

// Create sample complexity report
const reportData = {
  "meta": {
    "generatedAt": new Date().toISOString(),
    "tasksAnalyzed": 1,
    "thresholdScore": 5,
    "projectName": "AI Task Generator Test",
    "usedResearch": false,
    "model": "openai-emulated"
  },
  "complexityAnalysis": [
    {
      "taskId": "1",
      "taskTitle": "Sample Task",
      "complexityScore": 7,
      "recommendedSubtasks": 5,
      "expansionPrompt": "Break down this sample task into subtasks that include initialization, configuration, implementation, testing, and documentation steps.",
      "reasoning": "This is a sample task for testing complexity analysis. It's been assigned a medium-high complexity score to demonstrate the reporting functionality."
    }
  ]
};

// Write the report file
fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
console.log(`Created sample complexity report at ${reportPath}`);
console.log('You can now run "node scripts/dev.js complexity-report" to view it');

// Also ensure the tasks directory exists
const tasksDir = path.join(projectRoot, 'tasks');
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir, { recursive: true });
  console.log('Created tasks directory');
}

// Ensure tasks.json exists with at least one task
const tasksPath = path.join(tasksDir, 'tasks.json');
if (!fs.existsSync(tasksPath)) {
  const tasksData = {
    "meta": {
      "version": "1.0.0",
      "generatedAt": new Date().toISOString(),
      "projectName": "AI Task Generator Test",
      "projectDescription": "Testing tasks.json for AI Task Generator"
    },
    "tasks": [
      {
        "id": "1",
        "title": "Sample Task",
        "description": "This is a sample task for testing",
        "status": "pending",
        "priority": "medium",
        "dependsOn": [],
        "details": "This is a placeholder task to ensure task-related functionality can be tested.",
        "testStrategy": "Manual testing",
        "additionalNotes": ""
      }
    ]
  };
  
  fs.writeFileSync(tasksPath, JSON.stringify(tasksData, null, 2), 'utf8');
  console.log(`Created sample tasks.json file at ${tasksPath}`);
}

console.log('Setup complete. You can now access task-related functionality without Claude API.'); 