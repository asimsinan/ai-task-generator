#!/usr/bin/env node

/**
 * use-openai.js
 * A utility script to set OpenAI as the default model
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

// Get the project root directory
const projectRoot = process.cwd();

// Path to the .env file
const envPath = path.join(projectRoot, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.log(chalk.yellow('No .env file found. Creating a new one...'));
  
  // Check if .env.example exists
  const examplePath = path.join(projectRoot, '.env.example');
  if (fs.existsSync(examplePath)) {
    // Copy .env.example to .env
    fs.copyFileSync(examplePath, envPath);
    console.log(chalk.green('Created .env file from .env.example'));
  } else {
    // Create a new .env file
    fs.writeFileSync(envPath, '# API Keys (Required)\n', 'utf8');
    console.log(chalk.green('Created new .env file'));
  }
}

// Read the current .env file
let envContent = fs.readFileSync(envPath, 'utf8');

// Check if OpenAI API key is set
const hasOpenAIKey = /OPENAI_API_KEY=(?!.*your_openai_api_key_here).*/.test(envContent);

// Check if PREFER_OPENAI is already set to true
const hasPreferOpenAI = /PREFER_OPENAI=true/.test(envContent);

// Update the env file
async function updateEnvFile() {
  let envUpdated = false;
  
  // If PREFER_OPENAI doesn't exist or is not set to true, update it
  if (!hasPreferOpenAI) {
    // Check if PREFER_OPENAI exists with any value
    if (/PREFER_OPENAI=.*/.test(envContent)) {
      // Replace the existing PREFER_OPENAI line
      envContent = envContent.replace(/PREFER_OPENAI=.*/, 'PREFER_OPENAI=true');
    } else {
      // Add PREFER_OPENAI=true
      envContent += '\nPREFER_OPENAI=true                                  # Prefer OpenAI over other models (true/false)';
    }
    envUpdated = true;
  }
  
  // If PREFER_CLAUDE exists and is set to true, set it to false
  if (/PREFER_CLAUDE=true/.test(envContent)) {
    envContent = envContent.replace(/PREFER_CLAUDE=true/, 'PREFER_CLAUDE=false');
    envUpdated = true;
  }
  
  // Ask for OpenAI API key if it's not set
  if (!hasOpenAIKey) {
    const { shouldSetKey } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldSetKey',
        message: 'No OpenAI API key found. Do you want to set it now?',
        default: true
      }
    ]);
    
    if (shouldSetKey) {
      const { apiKey } = await inquirer.prompt([
        {
          type: 'input',
          name: 'apiKey',
          message: 'Enter your OpenAI API key:',
          validate: (input) => input.trim() !== '' ? true : 'API key cannot be empty'
        }
      ]);
      
      // Update the API key
      if (/OPENAI_API_KEY=.*/.test(envContent)) {
        envContent = envContent.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${apiKey}`);
      } else {
        envContent += `\nOPENAI_API_KEY=${apiKey}             # Format: sk-...`;
      }
      envUpdated = true;
    }
  }
  
  // Write the updated content if changes were made
  if (envUpdated) {
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log(chalk.green('Updated .env file to use OpenAI as default model'));
  } else {
    console.log(chalk.blue('OpenAI is already set as the default model in .env'));
  }
  
  console.log(chalk.green('\nConfiguration complete! OpenAI will now be used by default.'));
}

// Run the update
updateEnvFile().catch(error => {
  console.error(chalk.red(`Error updating .env file: ${error.message}`));
  process.exit(1);
}); 