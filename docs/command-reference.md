# AI Task Generator Command Reference

Here's a comprehensive reference of all available commands:

## Parse PRD

```bash
# Parse a PRD file and generate tasks
ai-task-generator parse-prd <prd-file.txt>

# Limit the number of tasks generated
ai-task-generator parse-prd <prd-file.txt> --num-tasks=10

# Use Claude instead of OpenAI (default) for task generation
ai-task-generator parse-prd <prd-file.txt> --prefer-claude
```

By default, AI Task Generator uses OpenAI for parsing PRD files and generating tasks. Use the `--prefer-claude` flag if you want to use Claude instead.

## List Tasks

```bash
# List all tasks
ai-task-generator list

# List tasks with a specific status
ai-task-generator list --status=<status>

# List tasks with subtasks
ai-task-generator list --with-subtasks

# List tasks with a specific status and include subtasks
ai-task-generator list --status=<status> --with-subtasks
```

## Show Next Task

```bash
# Show the next task to work on based on dependencies and status
ai-task-generator next
```

## Show Specific Task

```bash
# Show details of a specific task
ai-task-generator show <id>
# or
ai-task-generator show --id=<id>

# View a specific subtask (e.g., subtask 2 of task 1)
ai-task-generator show 1.2
```

## Update Tasks

```bash
# Update tasks from a specific ID and provide context
ai-task-generator update --from=<id> --prompt="<prompt>"
```

## Update a Specific Task

```bash
# Update a single task by ID with new information
ai-task-generator update-task --id=<id> --prompt="<prompt>"

# Use research-backed updates with Perplexity AI
ai-task-generator update-task --id=<id> --prompt="<prompt>" --research
```

## Update a Subtask

```bash
# Append additional information to a specific subtask
ai-task-generator update-subtask --id=<parentId.subtaskId> --prompt="<prompt>"

# Example: Add details about API rate limiting to subtask 2 of task 5
ai-task-generator update-subtask --id=5.2 --prompt="Add rate limiting of 100 requests per minute"

# Use research-backed updates with Perplexity AI
ai-task-generator update-subtask --id=<parentId.subtaskId> --prompt="<prompt>" --research
```

Unlike the `update-task` command which replaces task information, the `update-subtask` command _appends_ new information to the existing subtask details, marking it with a timestamp. This is useful for iteratively enhancing subtasks while preserving the original content.

## Generate Task Files

```bash
# Generate individual task files from tasks.json
ai-task-generator generate
```

## Set Task Status

```bash
# Set status of a single task
ai-task-generator set-status --id=<id> --status=<status>

# Set status for multiple tasks
ai-task-generator set-status --id=1,2,3 --status=<status>

# Set status for subtasks
ai-task-generator set-status --id=1.1,1.2 --status=<status>
```

When marking a task as "done", all of its subtasks will automatically be marked as "done" as well.

## Expand Tasks

```bash
# Expand a specific task with subtasks
ai-task-generator expand --id=<id> --num=<number>

# Expand with additional context
ai-task-generator expand --id=<id> --prompt="<context>"

# Expand all pending tasks
ai-task-generator expand --all

# Force regeneration of subtasks for tasks that already have them
ai-task-generator expand --all --force

# Research-backed subtask generation for a specific task
ai-task-generator expand --id=<id> --research

# Research-backed generation for all tasks
ai-task-generator expand --all --research
```

## Clear Subtasks

```bash
# Clear subtasks from a specific task
ai-task-generator clear-subtasks --id=<id>

# Clear subtasks from multiple tasks
ai-task-generator clear-subtasks --id=1,2,3

# Clear subtasks from all tasks
ai-task-generator clear-subtasks --all
```

## Analyze Task Complexity

```bash
# Analyze complexity of all tasks
ai-task-generator analyze-complexity

# Save report to a custom location
ai-task-generator analyze-complexity --output=my-report.json

# Use a specific LLM model
ai-task-generator analyze-complexity --model=claude-3-opus-20240229

# Set a custom complexity threshold (1-10)
ai-task-generator analyze-complexity --threshold=6

# Use an alternative tasks file
ai-task-generator analyze-complexity --file=custom-tasks.json

# Use Perplexity AI for research-backed complexity analysis
ai-task-generator analyze-complexity --research
```

## View Complexity Report

```bash
# Display the task complexity analysis report
ai-task-generator complexity-report

# View a report at a custom location
ai-task-generator complexity-report --file=my-report.json
```

## Managing Task Dependencies

```bash
# Add a dependency to a task
ai-task-generator add-dependency --id=<id> --depends-on=<id>

# Remove a dependency from a task
ai-task-generator remove-dependency --id=<id> --depends-on=<id>

# Validate dependencies without fixing them
ai-task-generator validate-dependencies

# Find and fix invalid dependencies automatically
ai-task-generator fix-dependencies
```

## Add a New Task

```bash
# Add a new task using AI
ai-task-generator add-task --prompt="Description of the new task"

# Add a task with dependencies
ai-task-generator add-task --prompt="Description" --dependencies=1,2,3

# Add a task with priority
ai-task-generator add-task --prompt="Description" --priority=high
```

## Initialize a Project

```bash
# Initialize a new project with AI Task Generator structure
ai-task-generator init
```
