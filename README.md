# pi-plan

A simple pi extension that adds plan mode for read-only analysis and planning.

## Features

- **Plan Mode** - Read-only analysis and planning phase
- Simple on/off toggle (`/plan on` and `/plan off`)
- Visual status indicator when plan mode is enabled
- Tool blocking enforcement (can't accidentally edit when plan mode is on)
- Prompt injection for better context

## Installation

### From GitHub (Recommended)

```bash
pi install git:github.com/arcanemachine/pi-plan
```

To update to the latest version:

```bash
pi update git:github.com/arcanemachine/pi-plan
```

### From Local Clone

```bash
git clone https://github.com/arcanemachine/pi-plan.git
cd pi-plan
pi install /path/to/pi-plan
```

Or use a symlink for development:

```bash
ln -s /workspace/projects/pi-plan/src ~/.pi/agent/extensions/pi-plan
```

## Usage

### Commands

- `/plan` - Show current plan mode status (on/off)
- `/plan on` - Enable plan mode (read-only)
- `/plan off` - Disable plan mode

### Plan Mode

When plan mode is enabled (`/plan on`):

- Blocks `write` and `edit` tools
- Allows `read`, `bash`, `search` for analysis
- Injects planning-focused system prompt
- Status shows: `Plan mode enabled`

When plan mode is disabled (`/plan off`):

- All tools available (default behavior)
- No status shown

### Visual Indicator

When plan mode is enabled, the status appears in the pi footer:

```
Plan mode enabled
```

When disabled, the status is hidden.

## Development

```
cd /workspace/projects/pi-plan
pi -e ./src/index.ts
```

See AGENTS.md for agent-specific information.
