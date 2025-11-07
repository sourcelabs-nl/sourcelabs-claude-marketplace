# Claude Commands Plugin

A collection of commonly used commands for Claude Code that enhance your development workflow.

## Overview

This plugin provides custom slash commands for Claude Code to streamline common development tasks.

## Commands

### `/cc` - Conventional Commit

Automatically analyzes your staged and modified files and creates a properly formatted conventional commit message following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

**Usage:**
```bash
/cc
```

Or with an optional scope:
```bash
/cc auth
/cc api
/cc ui
/cc database
```

**Examples:**

After staging your changes:
```bash
git add src/auth/login.js
/cc auth
```

This will analyze your changes and create a commit like:
```
feat(auth): add JWT token validation
```

**Commit Types Supported:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style/formatting
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD configuration
- `perf`: Performance improvements

**Key Features:**
- Analyzes both staged and unstaged changes
- Follows Conventional Commits specification strictly
- Supports optional scope via command arguments
- Handles breaking changes with `!` notation
- Uses imperative mood and proper formatting
- Generates concise, professional commit messages
- Never includes tool references in commit messages

## Installation

This plugin is part of the Sourcelabs Claude Marketplace. See the [marketplace README](../README.md) for detailed installation instructions.

### Quick Install from GitHub

```bash
# Add the marketplace
/plugin marketplace add sourcelabs-nl/sourcelabs-claude-marketplace

# Install this plugin
/plugin install claude-commands@sourcelabs
```

### Quick Install from Local Path

```bash
# Add the marketplace (if working locally)
/plugin marketplace add /path/to/sourcelabs-claude-marketplace

# Install this plugin
/plugin install claude-commands@sourcelabs
```

## Plugin Management

Plugins can be toggled on and off as needed to manage system prompt context.

### Enable/Disable
```bash
# Disable plugin temporarily
/plugin disable claude-commands@sourcelabs

# Re-enable plugin
/plugin enable claude-commands@sourcelabs
```

### Uninstall
```bash
/plugin uninstall claude-commands@sourcelabs
```

### Interactive Management

Use the `/plugin` menu to browse and manage plugins interactively.

## Development

### Adding New Commands

1. Create a new `.md` file in the `commands/` directory
2. Add frontmatter with metadata:
   ```yaml
   ---
   description: Brief command description
   argument-hint: "[optional arguments]"
   ---
   ```
3. Write the command prompt/instructions following Claude Code patterns
4. Update the plugin version in `.claude-plugin/plugin.json`

### Command File Format

Commands use Markdown format with optional frontmatter metadata. Special features:

- **`$ARGUMENTS`** - Capture all command arguments
- **`$1`, `$2`, etc.** - Individual positional parameters
- **`!command`** - Execute bash commands and include output as context
- **`@file`** - Include file contents as context

### Example Command Structure

```markdown
---
description: Example command
argument-hint: "[input]"
---

Your command instructions here.

Use $ARGUMENTS to access all arguments passed by the user.

!git status will execute and include the output.

@README.md will include the contents of README.md.
```

## Plugin Structure

```
commands/
├── README.md                      # This file
├── .claude-plugin/
│   └── plugin.json                # Plugin metadata
└── commands/
    └── cc.md                      # Conventional Commit command
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Add your command or improvements
4. Update documentation
5. Submit a pull request

## Requirements

- Claude Code installed (plugin support is in public beta)
- Git (for using the `/cc` command)

## Support

For issues, questions, or feature requests, please open an issue in the [main repository](https://github.com/sourcelabs-nl/sourcelabs-claude-marketplace).

## Version History

### 0.0.1 (Initial Release)
- Added `/cc` command for conventional commits
- Initial plugin structure
- Basic documentation

## Author

**Stephan Oudmaijer**
Sourcelabs B.V.

## License

Copyright © 2025 Sourcelabs B.V.
