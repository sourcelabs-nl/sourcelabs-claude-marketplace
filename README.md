# Sourcelabs Claude Marketplace

A marketplace for Claude Code plugins developed by Sourcelabs B.V.

## Overview

This repository serves as a local marketplace containing multiple Claude Code plugins to enhance your development workflow. Each plugin is maintained in its own directory with independent versioning and documentation.

## Available Plugins

### claude-commands

A collection of commonly used commands for Claude Code that streamline development tasks.

**Current Commands:**
- **`/cc`** - Conventional Commit command that creates git commits following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification

[View plugin documentation →](./commands/README.md)

### presentation-manager

A comprehensive plugin for designing and managing HTML-based technical presentations with professional brand guidelines, modular structure, and PDF export capabilities.

**Key Features:**
- **Expert Presentation Design** - AI-powered content architecture, narrative flow, and visual hierarchy through the `presentation-manager:skills` skill
- **Modular HTML System** - Topics organized in folders with individual slide files
- **Brand Guidelines** - Built-in Raleway typography and Battery Charged Blue color scheme
- **PDF Export** - Generate print-ready PDFs with full branding via Puppeteer
- **Syntax Highlighting** - Prism.js integration for Kotlin, Java, Bash, and other languages

**Available Commands:**
- **`/presentation-manager:new-slide`** - Add a new slide to an existing topic
- **`/presentation-manager:add-topic`** - Create a new topic with a title page
- **`/presentation-manager:list-slides`** - View all slides organized by topic
- **`/presentation-manager:preview`** - Start local server and preview presentation in browser
- **`/presentation-manager:validate-presentation`** - Check for structural issues and missing files
- **`/presentation-manager:reorder-slides`** - Reorder slides within or across topics

[View plugin documentation →](./presentation-manager/README.md)

## Installation

### Prerequisites

- Claude Code must be installed (plugin support is in public beta)
- Git repository (for using the `/cc` command)

### Method 1: Install from GitHub (Recommended)

1. Add the marketplace to Claude Code:
   ```bash
   /plugin marketplace add sourcelabs-nl/sourcelabs-claude-marketplace
   ```

2. Browse and install plugins using the interactive menu:
   ```bash
   /plugin
   ```

   Or install directly:
   ```bash
   /plugin install claude-commands@sourcelabs
   /plugin install presentation-manager@sourcelabs
   ```

3. Restart Claude Code to activate the plugin

4. Verify installation by running `/help` to see the new commands

### Method 2: Install from Local Path

Useful for development or when working with a local clone:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sourcelabs-nl/sourcelabs-claude-marketplace
   ```

2. Add the local marketplace to Claude Code:
   ```bash
   /plugin marketplace add /path/to/sourcelabs-claude-marketplace
   ```

3. Install the plugins:
   ```bash
   /plugin install claude-commands@sourcelabs
   /plugin install presentation-manager@sourcelabs
   ```

4. Restart Claude Code to activate the plugin

### Method 3: Team Configuration (Automatic)

For automatic plugin installation across your team, add this configuration to your repository's `.claude/settings.json`:

```json
{
  "marketplaces": [
    {
      "source": "sourcelabs-nl/sourcelabs-claude-marketplace"
    }
  ],
  "plugins": [
    "claude-commands@sourcelabs",
    "presentation-manager@sourcelabs"
  ]
}
```

This ensures all team members automatically have access to the same plugins when working on the project.

## Plugin Management

All plugins can be toggled on and off as needed to manage system prompt context.

### Enable/Disable
```bash
# Disable plugins temporarily
/plugin disable claude-commands@sourcelabs
/plugin disable presentation-manager@sourcelabs

# Re-enable plugins
/plugin enable claude-commands@sourcelabs
/plugin enable presentation-manager@sourcelabs
```

### Uninstall
```bash
/plugin uninstall claude-commands@sourcelabs
/plugin uninstall presentation-manager@sourcelabs
```

### Interactive Management

Use the `/plugin` menu to browse, enable, disable, or uninstall plugins interactively.

## Marketplace Structure

```
.
├── README.md                      # This file
├── .claude-plugin/
│   └── marketplace.json           # Marketplace metadata
├── commands/                      # claude-commands plugin
│   ├── README.md                  # Plugin documentation
│   ├── .claude-plugin/
│   │   └── plugin.json            # Plugin metadata
│   └── commands/
│       └── cc.md                  # Conventional Commit command
└── presentation-manager/          # presentation-manager plugin
    ├── README.md                  # Plugin documentation
    ├── .claude-plugin/
    │   └── plugin.json            # Plugin metadata
    ├── skills/
    │   └── SKILL.md               # Presentation Manager skill
    ├── commands/                  # Command definitions
    │   ├── new-slide.md
    │   ├── add-topic.md
    │   ├── list-slides.md
    │   ├── preview.md
    │   ├── validate-presentation.md
    │   ├── generate-pdf.md
    │   └── reorder-slides.md
    └── assets/
        └── shared-styles.css      # Shared brand styles
```

## Development

### Adding New Plugins to the Marketplace

1. Create a new directory for your plugin in the root
2. Add a `.claude-plugin/plugin.json` file with metadata
3. Create plugin content (commands, skills, agents, or hooks)
4. Add the plugin to `.claude-plugin/marketplace.json`
5. Create a README.md documenting the plugin

### Adding Commands to Existing Plugins

See the individual plugin documentation for details on adding new commands, skills, or other features.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

Copyright © 2025 Sourcelabs B.V.

## Author

**Stephan Oudmaijer**
Sourcelabs B.V.

## Support

For issues, questions, or feature requests, please open an issue in this repository.

## Version History

### 0.0.2 (Current)
- Added `presentation-manager` plugin with comprehensive HTML presentation design and management
- Includes 7 commands for presentation management
- Added `presentation-manager:skills` skill for expert presentation design
- PDF export capability with Puppeteer integration

### 0.0.1 (Initial Release)
- Added `/cc` command for conventional commits
- Initial plugin structure
- Marketplace configuration
