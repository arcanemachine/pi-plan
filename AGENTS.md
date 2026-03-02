# Agent Instructions

## Workflow

Commit when a task is completed.

## Pre-commit

```bash
npx tsc --noEmit
npx prettier --write src/index.ts package.json
```

## Commit Style

Match existing commits:
- `Add plan command with on/off toggle`
- `Block edit/write tools when plan mode enabled`
- `Add visual status indicator for plan mode`

## Project Structure

```
pi-plan/
├── src/
│   └── index.ts          # Extension entry point
├── package.json          # Package manifest with pi config
└── AGENTS.md            # This file
```

## Implementation Notes

- Extension loads from `~/.pi/agent/extensions/` or `.pi/extensions/`
- Use `ctx.ui.setStatus()` for footer plan mode indicator
- Use `pi.on("tool_call", ...)` to block tools when plan mode enabled
- Use `pi.on("before_agent_start", ...)` to inject plan mode prompt
- Plan mode is off by default
