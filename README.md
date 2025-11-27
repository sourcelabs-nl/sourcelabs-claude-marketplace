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

### presentation-pdf-export

A specialized plugin for generating professional PDF documents from HTML-based presentations created with the presentation-manager plugin. Uses Puppeteer and Chrome headless to create print-ready PDFs with full brand preservation.

**Key Features:**
- **Automated PDF Generation** - Convert HTML presentations to PDF with a single command
- **Full Brand Preservation** - Maintains Raleway typography, Battery Charged Blue colors, and logo placement
- **Syntax Highlighting** - Prism.js code highlighting preserved in PDF output
- **Print Optimization** - Configurable slide dimensions (default 1200x800px)
- **Dependency Management** - Automatic npm package installation and setup
- **Error Recovery** - Comprehensive validation and troubleshooting guidance
- **Dry-Run Mode** - Test PDF generation without creating files

**Available Skill:**
- **`presentation-pdf-export`** - AI-powered PDF export skill that handles prerequisites, dependency installation, validation, and PDF generation

[View plugin documentation →](./presentation-pdf-export/README.md)

### java-architecture-analyst

An expert-level Java architecture analysis agent that produces structured, evidence-based architecture reports for Java/Spring Boot applications. Supports analysis across 18 specialized architectural layers.

**Key Features:**
- **18 Architectural Layers** - Comprehensive analysis from project overview to deployment operations
- **Evidence-Based Reports** - Detailed documentation with code references and findings
- **Multi-Layer Analysis** - Analyze multiple layers in a single command
- **Specialized Templates** - Each layer focuses on specific architectural concerns

**Available Agent:**
- **`java-architecture-analyst`** - AI-powered architecture analysis agent with configurable layer selection

[View plugin documentation →](./java-architecture-analyst/README.md)

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
   /plugin install presentation-pdf-export@sourcelabs
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
   /plugin install presentation-pdf-export@sourcelabs
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
    "presentation-manager@sourcelabs",
    "presentation-pdf-export@sourcelabs"
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
/plugin disable presentation-pdf-export@sourcelabs

# Re-enable plugins
/plugin enable claude-commands@sourcelabs
/plugin enable presentation-manager@sourcelabs
/plugin enable presentation-pdf-export@sourcelabs
```

### Uninstall
```bash
/plugin uninstall claude-commands@sourcelabs
/plugin uninstall presentation-manager@sourcelabs
/plugin uninstall presentation-pdf-export@sourcelabs
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
├── java-architecture-analyst/     # java-architecture-analyst plugin
│   ├── README.md                  # Plugin documentation
│   ├── .claude-plugin/
│   │   └── plugin.json            # Plugin metadata
│   └── agents/
│       ├── java-architecture-analyst.md  # Architecture analysis agent
│       ├── layers/                # 18 analysis layer templates
│       │   ├── project-overview.md
│       │   ├── technology-stack.md
│       │   ├── application-architecture.md
│       │   ├── architectural-patterns.md
│       │   ├── business-logic-architecture.md
│       │   ├── data-architecture.md
│       │   ├── requests-flow.md
│       │   ├── security-architecture.md
│       │   ├── configuration-management.md
│       │   ├── cross-cutting-concerns.md
│       │   ├── performance-scalability.md
│       │   ├── testing.md
│       │   ├── deployment-operations.md
│       │   ├── cost-resource-optimization.md
│       │   ├── key-design-decisions.md
│       │   ├── recommendations.md
│       │   ├── conclusions.md
│       │   └── appendices.md
│       ├── output-formats/
│       │   └── layer-medium-report.md
│       └── patterns/
│           └── active-developer.md
├── presentation-manager/          # presentation-manager plugin
│   ├── README.md                  # Plugin documentation
│   ├── .claude-plugin/
│   │   └── plugin.json            # Plugin metadata
│   ├── skills/
│   │   ├── SKILL.md               # Presentation Manager skill
│   │   ├── package.json           # npm dependencies
│   │   └── templates/
│   │       └── shared-styles.css  # Shared brand styles
│   └── commands/                  # Command definitions
│       ├── new-slide.md
│       ├── add-topic.md
│       ├── list-slides.md
│       ├── preview.md
│       ├── validate-presentation.md
│       └── reorder-slides.md
└── presentation-pdf-export/       # presentation-pdf-export plugin
    ├── README.md                  # Plugin documentation
    ├── .claude-plugin/
    │   └── plugin.json            # Plugin metadata
    └── skills/
        ├── SKILL.md               # PDF Export skill
        ├── scripts/
        │   └── generate-pdf.js    # PDF generation script
        └── templates/
            ├── package.json       # npm dependencies template
            └── pdf-config.json    # Configuration template
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

### 0.0.4 (Current)
- Added `java-architecture-analyst` plugin for expert-level Java/Spring Boot architecture analysis
- Includes `java-architecture-analyst` agent with 18 specialized architectural layers
- Evidence-based reporting with code references and multi-layer analysis support
- Specialized templates for each architectural layer from project overview to deployment operations

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
- Removed PDF generation command from presentation-manager (moved to separate plugin)

### 0.0.1 (Initial Release)
- Added `/cc` command for conventional commits
- Initial plugin structure
- Marketplace configuration
