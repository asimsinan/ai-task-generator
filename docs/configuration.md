# Configuration

AI Task Generator can be configured through environment variables in a `.env` file at the root of your project.

## Required Configuration

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude (Example: `ANTHROPIC_API_KEY=sk-ant-api03-...`)

## Optional Configuration

- `MODEL` (Default: `"claude-3-7-sonnet-20250219"`): Claude model to use (Example: `MODEL=claude-3-opus-20240229`)
- `MAX_TOKENS` (Default: `"4000"`): Maximum tokens for responses (Example: `MAX_TOKENS=8000`)
- `TEMPERATURE` (Default: `"0.7"`): Temperature for model responses (Example: `TEMPERATURE=0.5`)
- `DEBUG` (Default: `"false"`): Enable debug logging (Example: `DEBUG=true`)
- `LOG_LEVEL` (Default: `"info"`): Console output level (Example: `LOG_LEVEL=debug`)
- `DEFAULT_SUBTASKS` (Default: `"3"`): Default subtask count (Example: `DEFAULT_SUBTASKS=5`)
- `DEFAULT_PRIORITY` (Default: `"medium"`): Default priority (Example: `DEFAULT_PRIORITY=high`)
- `PROJECT_NAME` (Default: `"MCP SaaS MVP"`): Project name in metadata (Example: `PROJECT_NAME=My Awesome Project`)
- `PROJECT_VERSION` (Default: `"1.0.0"`): Version in metadata (Example: `PROJECT_VERSION=2.1.0`)
- `PERPLEXITY_API_KEY`: For research-backed features (Example: `PERPLEXITY_API_KEY=pplx-...`)
- `PERPLEXITY_MODEL` (Default: `"sonar-medium-online"`): Perplexity model (Example: `PERPLEXITY_MODEL=sonar-large-online`)

### OpenAI Configuration

- `OPENAI_API_KEY`: Your OpenAI API key for using OpenAI models instead of Claude (Example: `OPENAI_API_KEY=sk-...`)
- `OPENAI_MODEL` (Default: `"gpt-4o"`): OpenAI model to use (Example: `OPENAI_MODEL=gpt-4-turbo`)
- `OPENAI_MAX_TOKENS` (Default: `"4096"`): Maximum tokens for OpenAI responses (Example: `OPENAI_MAX_TOKENS=8192`)
- `OPENAI_TEMPERATURE` (Default: `"0.2"`): Temperature for OpenAI model responses (Example: `OPENAI_TEMPERATURE=0.7`)
- `PREFER_OPENAI` (Default: `"false"`): Whether to prefer OpenAI over Claude for task generation (Example: `PREFER_OPENAI=true`)

## Example .env File

```
# Required
ANTHROPIC_API_KEY=sk-ant-api03-your-api-key

# Optional - Claude Configuration
MODEL=claude-3-7-sonnet-20250219
MAX_TOKENS=4000
TEMPERATURE=0.7

# Optional - OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=4096
OPENAI_TEMPERATURE=0.2
PREFER_OPENAI=false

# Optional - Perplexity API for Research
PERPLEXITY_API_KEY=pplx-your-api-key
PERPLEXITY_MODEL=sonar-medium-online

# Optional - Project Info
PROJECT_NAME=My Project
PROJECT_VERSION=1.0.0

# Optional - Application Configuration
DEFAULT_SUBTASKS=3
DEFAULT_PRIORITY=medium
DEBUG=false
LOG_LEVEL=info
```

## Using OpenAI Instead of Claude

AI Task Generator can now use either Claude (default) or OpenAI models for task generation and other AI operations. To use OpenAI:

1. Set `OPENAI_API_KEY` in your `.env` file with your OpenAI API key
2. Optionally set `PREFER_OPENAI=true` to always prefer OpenAI over Claude
3. Or use the `--prefer-openai` flag with commands like `ai-task-generator parse-prd --prefer-openai`

OpenAI models work as a drop-in replacement for Claude in most operations and can also serve as a fallback if Claude is unavailable or overloaded.

## Troubleshooting

### If `ai-task-generator init` doesn't respond:

Try running it with Node directly:

```bash
node node_modules/claude-ai-task-generator/scripts/init.js
```

Or clone the repository and run:

```bash
git clone https://github.com/eyaltoledano/claude-ai-task-generator.git
cd claude-ai-task-generator
node scripts/init.js
```
