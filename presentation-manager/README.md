# Presentation Manager Plugin

A Claude Code plugin for designing and managing HTML-based technical presentations with brand guidelines, modular structure, and PDF export capabilities.

## Overview

The Presentation Manager plugin combines expert presentation design with technical implementation to help you create compelling, professional technical presentations. It provides both a specialized skill for content design and a suite of commands for managing the HTML-based presentation system.

### Key Features

- **Expert Presentation Design**: AI-powered content architecture, narrative flow, and visual hierarchy
- **Modular HTML Structure**: Topics organized in folders with individual slide files
- **Brand Guidelines**: Built-in support for colors, typography (Raleway font), and visual consistency
- **Syntax Highlighting**: Prism.js integration for Kotlin, Java, Bash, and other languages
- **PDF Export**: Generate print-ready PDFs with full branding via Puppeteer
- **Interactive Navigation**: Keyboard controls, topic selection, and slide numbering
- **Validation Tools**: Check for missing files, broken references, and structural issues

## Installation

1. Place the `presentation-manager` folder in your Claude Code plugins directory
2. The plugin will be automatically available in Claude Code
3. Install dependencies for PDF generation:
   ```bash
   npm install
   ```

## Plugin Structure

```
presentation-manager/
├── .claude-plugin/
│   └── plugin.json              # Plugin metadata
├── skills/
│   └── SKILL.md                 # Presentation Manager skill
├── commands/
│   ├── new-slide.md             # Add slides to topics
│   ├── add-topic.md             # Create new topics
│   ├── list-slides.md           # View all slides
│   ├── preview.md               # Start server and view
│   ├── validate-presentation.md # Check for issues
│   ├── generate-pdf.md          # Export to PDF
│   └── reorder-slides.md        # Reorder slides
├── assets/
│   └── shared-styles.css        # Shared brand styles
└── README.md                    # This file
```

## The Presentation Manager Skill

The plugin's core capability is the **Presentation Manager skill**, which acts as an expert technical presentation designer. The skill is automatically invoked when you:

- Create or modify presentations
- Add topics or slides
- Design content structure and narrative flow
- Implement brand guidelines
- Perform complex refactoring
- Validate presentation structure

### When to Use the Skill

Simply ask Claude to help with presentation-related tasks:

```
"Create a new presentation about Kotlin Coroutines"
"Help me structure a technical talk about microservices"
"Add a slide explaining error handling patterns"
"Improve the flow of my existing presentation"
```

The skill combines presentation design expertise with technical implementation, ensuring your slides are both compelling and properly structured.

## Available Commands

### `/new-slide`
Add a new slide to an existing topic.

**Usage:**
```
/new-slide <presentation> <topic> <slide-name>
```

**Example:**
```
/new-slide coroutines jobs-scopes-contexts supervisor-job-concept
```

Creates a new HTML slide file and adds it to the categorySlides object.

---

### `/add-topic`
Create a new topic with a title page.

**Usage:**
```
/add-topic <presentation> <topic-name> "<display-name>"
```

**Example:**
```
/add-topic coroutines error-handling "Error Handling"
```

Creates topic folder, title page, and updates the presentation structure.

---

### `/list-slides`
View all slides organized by topic.

**Usage:**
```
/list-slides <presentation>
```

Shows the complete slide structure with file paths and order.

---

### `/preview`
Start a local web server and view the presentation in your browser.

**Usage:**
```
/preview <presentation>
```

Launches http-server and opens the presentation.

---

### `/validate-presentation`
Check for structural issues and missing files.

**Usage:**
```
/validate-presentation <presentation>
```

Validates:
- File existence
- categorySlides accuracy
- Syntax highlighting setup
- Brand guidelines compliance

---

### `/generate-pdf`
Export presentation to PDF with full branding.

**Usage:**
```
/generate-pdf <presentation>
```

**Example:**
```
/generate-pdf coroutines
```

Generates a print-ready PDF with:
- Brand colors and typography
- Syntax-highlighted code blocks
- Logo on each slide
- 1200x800px per slide

---

### `/reorder-slides`
Reorder slides within a topic or across topics.

**Usage:**
```
/reorder-slides <presentation>
```

Interactive command to reorganize slide order in the categorySlides object.

## Presentation System Architecture

### Directory Structure

```
slides/
├── assets/
│   └── shared-styles.css          # Shared styles
├── {presentation-name}/           # e.g., "coroutines"
│   ├── {topic-1}/                 # e.g., "agenda"
│   │   ├── title-page.html        # Topic intro
│   │   ├── concept-slide.html     # Content slides
│   │   └── exercise-topic.html    # Exercise (optional)
│   ├── {topic-2}/
│   │   └── ...
└── {presentation-name}.html       # Main wrapper file
```

### The categorySlides Object

The heart of each presentation is the `categorySlides` JavaScript object in the main HTML file:

```javascript
const categorySlides = {
    'topic-name': [
        {type: 'named', category: 'topic-name', name: 'title-page.html'},
        {type: 'named', category: 'topic-name', name: 'concept-slide.html'},
        {type: 'named', category: 'topic-name', name: 'example-slide.html'}
    ],
    'another-topic': [
        {type: 'named', category: 'another-topic', name: 'title-page.html'},
        // ... more slides
    ]
};
```

This object defines the exact order slides appear in the presentation.

### Slide Types

The plugin supports several slide templates:

1. **Title Slide** - Topic introduction
2. **Concept Slide** - Bullet points and explanations
3. **Code Example** - Syntax-highlighted code with annotations
4. **Comparison Slide** - Side-by-side good vs. bad examples
5. **Exercise Slide** - Learning objectives and instructions

## Brand Guidelines

### Colors
- **Primary Blue**: `#179EDA` (Battery Charged Blue)
- **Dark Blue**: `#0C7BB8`
- **Background gradient**: `linear-gradient(135deg, #179EDA 0%, #0C7BB8 100%)`

### Typography
- **Font Family**: Raleway (Google Fonts)
- Preloaded for performance

### Visual Elements
- Logo in bottom-right corner
- Consistent slide layout (defined in `shared-styles.css`)
- High contrast for readability
- Professional, clean design

## Example Workflow

### Creating a New Presentation

1. **Design the content**:
   ```
   "Create a 30-minute presentation about Kotlin Coroutines for senior engineers"
   ```

   The skill will:
   - Ask about audience and context
   - Propose an outline
   - Design slide content with proper narrative flow

2. **Implement the structure**:
   The skill automatically creates:
   - Main HTML wrapper
   - Topic folders
   - Individual slide files
   - categorySlides object

3. **Preview and iterate**:
   ```
   /preview coroutines
   ```

4. **Validate**:
   ```
   /validate-presentation coroutines
   ```

5. **Export to PDF**:
   ```
   /generate-pdf coroutines
   ```

### Adding Content to Existing Presentation

1. **Add a new topic**:
   ```
   /add-topic coroutines testing "Testing Coroutines"
   ```

2. **Add slides**:
   ```
   /new-slide coroutines testing unit-test-example
   ```

3. **Or use the skill**:
   ```
   "Add a slide explaining testing best practices for coroutines"
   ```

## Technical Details

### Syntax Highlighting

Prism.js is used for code syntax highlighting with support for:
- `language-kotlin` - Kotlin
- `language-java` - Java
- `language-bash` - Bash/shell
- `language-javascript` - JavaScript
- `language-xml` - XML/HTML

Example usage:
```html
<pre><code class="language-kotlin">
fun example() {
    println("Hello")
}
</code></pre>
```

### Navigation

The presentation system supports:
- **Arrow keys** - Previous/next slide
- **Space bar** - Next slide
- **Topic dropdown** - Jump to any topic
- **Navigation buttons** - First, previous, next, last
- **Slide counter** - Current/total display

### PDF Generation

The `/generate-pdf` command uses:
- **Puppeteer** - Headless Chrome automation
- **Print-optimized HTML** - Temporary file with all slides
- **Embedded fonts** - Raleway included in PDF
- **Syntax highlighting** - Prism.js styles preserved
- **Brand colors** - Full visual consistency

## Best Practices

### Content Design
1. **One idea per slide** - Minimize cognitive load
2. **Clear visual hierarchy** - Titles state key messages
3. **Balance text and visuals** - Prefer diagrams over walls of text
4. **Consistent styling** - Use brand guidelines throughout
5. **Concise bullet points** - 5-7 words maximum

### Technical Implementation
1. **Naming conventions** - Use kebab-case for files and folders
2. **File organization** - Each topic has its own folder
3. **Title pages** - Every topic starts with `title-page.html`
4. **Exercise naming** - Follow pattern: `exercise-{topic-name}.html`
5. **Code examples** - Keep to 10-15 lines maximum per slide

### Maintenance
1. **Validate regularly** - Use `/validate-presentation` before presenting
2. **Version control** - Commit presentation files to git
3. **PDF generation** - Test PDF output before distributing
4. **Browser testing** - Preview in different browsers if needed

## Troubleshooting

### Slides Not Loading
- Check `categorySlides` object syntax
- Verify file paths match exactly (case-sensitive)
- Check browser console for errors

### Syntax Highlighting Not Working
- Ensure Prism.js scripts are loaded
- Verify language components are included
- Check code blocks have proper `language-*` class

### PDF Generation Fails
- Ensure `node_modules/` exists (run `npm install`)
- Check Puppeteer Chrome path in `scripts/generate-pdf.js`
- Verify presentation HTML file exists

### Font Not Loading
- Check font preload links in HTML
- Verify `shared-styles.css` is linked correctly
- Check network tab for font download issues

## Contributing

When extending this plugin:
1. Follow existing command structure in `.md` files
2. Update skill documentation for new capabilities
3. Maintain brand guidelines in shared styles
4. Add validation rules for new features
5. Update this README with new functionality

## Support

For issues or questions:
- Check validation output with `/validate-presentation`
- Review the skill documentation in `skills/SKILL.md`
- Examine example presentations for patterns
- Test with `/preview` before generating PDFs

## License

Copyright (c) 2024 Stephan Oudmaijer

## Version

**0.0.1** - Initial release
