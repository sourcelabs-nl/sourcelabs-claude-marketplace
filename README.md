# Sourcelabs Claude Marketplace

A marketplace for Claude Code plugins developed by Sourcelabs B.V.

## Overview

This repository serves as a local marketplace containing multiple Claude Code plugins to enhance your development workflow. Each plugin is maintained in its own directory with independent versioning and documentation.

## Available Plugins

### conventional-commits

A plugin that automatically creates git commits following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

**Command:**
- **`/cc`** - Analyzes staged/modified files and creates a properly formatted conventional commit

[View plugin documentation →](./conventional-commits/README.md)

### html-presentation

A comprehensive plugin for designing and managing HTML-based technical presentations with professional brand guidelines, modular structure, and PDF export capabilities.

**Key Features:**
- **Expert Presentation Design** - AI-powered content architecture, narrative flow, and visual hierarchy
- **Modular HTML System** - Topics organized in folders with individual slide files
- **Brand Guidelines** - Built-in Raleway typography and Battery Charged Blue color scheme
- **PDF Export** - Generate print-ready PDFs with full branding via Puppeteer
- **Syntax Highlighting** - Prism.js integration for Kotlin, Java, Bash, and other languages
- **Dependency Management** - Automatic npm package installation for PDF generation
- **Cross-Platform Support** - Automatic Chrome detection on macOS, Windows, and Linux

**Available Skills:**
- **`html-presentation`** - Expert presentation design skill for creating and managing slides
- **`html-presentation-pdf-export`** - PDF export skill that handles prerequisites, dependency installation, validation, and PDF generation

**Available Commands:**
- **`/html-presentation:new-slide`** - Add a new slide to an existing topic
- **`/html-presentation:add-topic`** - Create a new topic with a title page
- **`/html-presentation:list-slides`** - View all slides organized by topic
- **`/html-presentation:preview`** - Start local server and preview presentation in browser
- **`/html-presentation:validate-presentation`** - Check for structural issues and missing files
- **`/html-presentation:reorder-slides`** - Reorder slides within or across topics

[View plugin documentation →](./html-presentation/README.md)

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
   /plugin install conventional-commits@sourcelabs
   /plugin install html-presentation@sourcelabs
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
   /plugin install conventional-commits@sourcelabs
   /plugin install html-presentation@sourcelabs
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
    "conventional-commits@sourcelabs",
    "html-presentation@sourcelabs"
  ]
}
```

This ensures all team members automatically have access to the same plugins when working on the project.

## Plugin Management

All plugins can be toggled on and off as needed to manage system prompt context.

### Enable/Disable
```bash
# Disable plugins temporarily
/plugin disable conventional-commits@sourcelabs
/plugin disable html-presentation@sourcelabs

# Re-enable plugins
/plugin enable conventional-commits@sourcelabs
/plugin enable html-presentation@sourcelabs
```

### Uninstall
```bash
/plugin uninstall conventional-commits@sourcelabs
/plugin uninstall html-presentation@sourcelabs
```

### Interactive Management

Use the `/plugin` menu to browse, enable, disable, or uninstall plugins interactively.

## Marketplace Structure

```
.
├── README.md                      # This file
├── .claude-plugin/
│   └── marketplace.json           # Marketplace metadata
├── conventional-commits/          # conventional-commits plugin
│   ├── README.md                  # Plugin documentation
│   ├── .claude-plugin/
│   │   └── plugin.json            # Plugin metadata
│   └── commands/
│       └── cc.md                  # Conventional Commit command
└── html-presentation/             # html-presentation plugin
    ├── README.md                  # Plugin documentation
    ├── .claude-plugin/
    │   └── plugin.json            # Plugin metadata
    ├── skills/
    │   ├── html-presentation/     # Presentation Manager skill
    │   │   ├── SKILL.md
    │   │   ├── package.json
    │   │   └── templates/
    │   │       └── shared-styles.css
    │   └── html-presentation-pdf-export/  # PDF Export skill
    │       ├── SKILL.md
    │       ├── scripts/
    │       │   └── generate-pdf.js
    │       └── templates/
    │           ├── package.json
    │           └── pdf-config.json
    └── commands/                  # Command definitions
        ├── new-slide.md
        ├── add-topic.md
        ├── list-slides.md
        ├── preview.md
        ├── validate-presentation.md
        └── reorder-slides.md
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

### 0.0.5 (Current)
- Renamed `claude-commands` plugin to `conventional-commits` for clarity
- Updated documentation to focus on the plugin's purpose

### 0.0.4
- Merged `presentation-manager` and `presentation-pdf-export` into unified `html-presentation` plugin
- Two skills: `html-presentation` for design and `html-presentation-pdf-export` for PDF generation
- Simplified plugin structure with all presentation functionality in one place
- Updated command prefixes from `/presentation-manager:` to `/html-presentation:`

### 0.0.3
- Added `presentation-pdf-export` plugin for generating professional PDFs from HTML presentations
- Includes `presentation-pdf-export` skill for automated PDF generation with Puppeteer
- Automatic dependency management and setup
- Dry-run mode for testing PDF generation
- Cross-platform support with automatic Chrome detection
- Configurable slide dimensions and brand colors

### 0.0.2
- Added `presentation-manager` plugin with comprehensive HTML presentation design and management
- Includes 6 commands for presentation management
- Added `presentation-manager:skills` skill for expert presentation design

### 0.0.1 (Initial Release)
- Added `/cc` command for conventional commits
- Initial plugin structure
- Marketplace configuration
