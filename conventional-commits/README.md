# Conventional Commits Plugin

A Claude Code plugin that automatically creates git commits following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Usage

```bash
/cc
```

Or with an optional scope:

```bash
/cc auth
/cc api
```

The command analyzes your staged and modified files, determines the appropriate commit type, and creates a properly formatted commit message.

**Example:**

```bash
git add src/auth/login.js
/cc auth
# Creates: feat(auth): add JWT token validation
```

## Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style/formatting |
| `refactor` | Code refactoring |
| `test` | Test additions/updates |
| `chore` | Maintenance tasks |
| `build` | Build system changes |
| `ci` | CI/CD configuration |
| `perf` | Performance improvements |

## Features

- Analyzes both staged and unstaged changes
- Follows Conventional Commits 1.0.0 specification
- Supports optional scope via command arguments
- Handles breaking changes with `!` notation
- Uses imperative mood and proper formatting

## Installation

```bash
# Add the marketplace
/plugin marketplace add sourcelabs-nl/sourcelabs-claude-marketplace

# Install this plugin
/plugin install conventional-commits@sourcelabs
```

## Requirements

- Claude Code
- Git

## Author

**Stephan Oudmaijer** - Sourcelabs B.V.

## License

Copyright © 2025 Sourcelabs B.V.
