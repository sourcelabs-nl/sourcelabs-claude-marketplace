# HTML Presentation Plugin

A Claude Code plugin for designing and managing HTML-based technical presentations with brand guidelines, modular structure, and PDF export capabilities.

## Overview

The Presentation plugin combines expert presentation design with technical implementation to help you create compelling, professional technical presentations. It provides both a specialized skill for content design and a suite of commands for managing the HTML-based presentation system.

### Key Features

- **Expert Presentation Design**: AI-powered content architecture, narrative flow, and visual hierarchy
- **Modular HTML Structure**: Topics organized in folders with individual slide files
- **Brand Guidelines**: Built-in support for colors, typography (Raleway font), and visual consistency
- **Syntax Highlighting**: Prism.js integration for Kotlin, Java, Bash, and other languages
- **PDF Export**: Generate print-ready PDFs with full branding via Puppeteer
- **Interactive Navigation**: Keyboard controls, topic selection, and slide numbering
- **Validation Tools**: Check for missing files, broken references, and structural issues

## Installation

1. Place the `html-presentation` folder in your Claude Code plugins directory
2. The plugin will be automatically available in Claude Code
3. Dependencies for PDF generation will be installed automatically when first used

## Plugin Structure

```
html-presentation/
├── .claude-plugin/
│   └── plugin.json                          # Plugin metadata
├── skills/
│   ├── html-presentation/                   # Presentation Manager skill
│   │   ├── SKILL.md                         # Skill instructions
│   │   ├── package.json                     # Dependencies
│   │   └── templates/
│   │       └── shared-styles.css            # Shared brand styles
│   └── html-presentation-pdf-export/        # PDF Export skill
│       ├── SKILL.md                         # Skill instructions
│       ├── scripts/
│       │   └── generate-pdf.js              # PDF generation script
│       └── templates/
│           ├── package.json                 # npm dependencies template
│           └── pdf-config.json              # Configuration template
├── commands/
│   ├── new-slide.md                         # Add slides to topics
│   ├── add-topic.md                         # Create new topics
│   ├── list-slides.md                       # View all slides
│   ├── preview.md                           # Start server and view
│   ├── validate-presentation.md             # Check for issues
│   └── reorder-slides.md                    # Reorder slides
└── README.md                                # This file
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
   "Generate a PDF for the coroutines presentation"
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

The PDF export skill uses:
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
- Review the skill documentation in `skills/html-presentation/SKILL.md` or `skills/html-presentation-pdf-export/SKILL.md`
- Examine example presentations for patterns
- Test with `/preview` before generating PDFs

---

# PDF Export Skill

The **html-presentation-pdf-export** skill generates professional PDF documents from HTML presentations. It uses Puppeteer and Chrome headless to produce PDFs with full brand styling, syntax highlighting, and typography preserved.

### Key Features

- **Automated PDF Generation** - Convert HTML presentations to PDF with a single command
- **Full Brand Preservation** - Maintains colors, typography (Raleway), and logo placement
- **Syntax Highlighting** - Prism.js code highlighting preserved in PDF output
- **Print Optimization** - 1200x800px per slide for optimal print quality
- **Dependency Management** - Automatic installation of required npm packages
- **Error Recovery** - Comprehensive error handling and troubleshooting guidance

### When to Use the Skill

Simply ask Claude to generate a PDF from your presentation:

```
"Generate a PDF for the coroutines presentation"
"Export my presentation to PDF"
"Create a PDF version of the microservices talk"
```

The skill will automatically:
1. Validate prerequisites (scripts, presentation file)
2. Install dependencies if needed (npm packages)
3. Run the PDF generation script
4. Monitor progress and handle errors
5. Report results with file location and details

## How It Works

### PDF Generation Workflow

1. **Prerequisites Check**:
    - Verifies `scripts/generate-pdf.js` exists
    - Verifies `scripts/package.json` exists
    - Checks if presentation HTML file exists
    - Validates `scripts/node_modules/` directory

2. **Dependency Installation** (if needed, run in the folder the package.json is copied to):
   ```bash
   npm install
   ```

3. **PDF Generation**:
   ```bash
   node scripts/generate-pdf.js {presentation}
   ```

Or from inside the scripts folder:

   ```bash
   node generate-pdf.js {presentation}
   ```


4. **Output**:
    - Creates `{presentation}.pdf` in the current directory
    - Includes all slides with full branding
    - Preserves syntax highlighting
    - Applies print-optimized layout

### Setup Requirements

The skill will automatically copy the required files to your workspace:

**Critical Files**:
- `scripts/generate-pdf.js` - Puppeteer script that generates the PDF
- `scripts/package.json` - npm dependencies (Puppeteer)

These files MUST be in place before PDF generation can proceed.

## Usage Examples

### Basic PDF Generation

```
User: Generate a PDF for my coroutines presentation
```

Expected output:
```
[SUCCESS] PDF generated successfully!

Location: coroutines.pdf
Total slides: 60
File size: 2,847 KB

The PDF includes:
   - All slides with brand colors
   - Raleway font typography
   - Logo on each slide
   - Syntax-highlighted code blocks
   - Print-optimized layout (1200x800px)
```

### With Dependency Installation

```
User: Export presentation to PDF
```

If dependencies are missing:
```
[INSTALL] Installing dependencies first...
[npm install output]

[SUCCESS] Dependencies installed!

[GENERATE] Generating PDF...
[SUCCESS] PDF generated successfully!
```

### Dry Run Mode

Test PDF generation without creating the actual file:

```bash
node scripts/generate-pdf.js coroutines --dry-run
```

Output:
```
[DRY RUN] No PDF will be generated

Summary:
  Presentation:     coroutines
  Total Slides:     60
  Total Categories: 8
  Brand Primary:    #1089C8
  Brand Dark:       #0C7BB8
  Slide Size:       1200px × 800px
  Chrome Path:      Auto-detect

Output would be:  coroutines.pdf

[COMPLETE] Dry run complete! Use without --dry-run to generate PDF.
```

## Technical Details

### PDF Specifications

- **Dimensions**: 1200x800px per slide (configurable)
- **Format**: Standard PDF with embedded fonts
- **Colors**: Full brand color preservation (configurable)
- **Typography**: Raleway font family embedded
- **Code Blocks**: Prism.js syntax highlighting applied
- **Generation Time**: 10-30 seconds depending on slide count

### Technologies Used

- **Puppeteer** - Headless Chrome automation
- **Chrome/Chromium** - PDF rendering engine
- **Prism.js** - Syntax highlighting (loaded from CDN)
- **Node.js** - Script execution environment

### File Generation Process

1. Creates temporary single-page HTML file with all slides
2. Launches headless Chrome via Puppeteer
3. Loads presentation with Prism.js for syntax highlighting
4. Waits for all resources to load
5. Generates PDF with print CSS media query
6. Cleans up temporary files

## Configuration

### Custom Configuration File

Create `scripts/pdf-config.json` to customize PDF generation:

```json
{
  "brandPrimary": "#1089C8",
  "brandDark": "#0C7BB8",
  "slideWidth": "1200px",
  "slideHeight": "800px",
  "timeout": 5000,
  "chromePath": null
}
```

**Configuration Options**:

- `brandPrimary` - Primary brand color for headings and accents
- `brandDark` - Darker brand color for secondary elements
- `slideWidth` - Width of each slide in the PDF
- `slideHeight` - Height of each slide in the PDF
- `timeout` - Timeout in milliseconds for Prism.js loading
- `chromePath` - Custom path to Chrome/Chromium executable (null for auto-detect)

### Example: Custom Dimensions

For widescreen presentations (16:9):
```json
{
  "slideWidth": "1920px",
  "slideHeight": "1080px"
}
```

For standard aspect ratio (4:3):
```json
{
  "slideWidth": "1024px",
  "slideHeight": "768px"
}
```

## Validation and Error Handling

### Pre-Generation Validation

The skill performs validation before generating:

```
[VALIDATE] Validating slide structure...
[OK] All 60 slides found
[OK] All code blocks have language classes
[OK] All topics have title pages
```

### Common Issues and Solutions

#### Puppeteer Chrome Not Found

```
[ERROR] Puppeteer error: Could not find Chrome

Try installing Chrome or updating the executablePath in scripts/generate-pdf.js

Current path: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

**Solution**: Install Chrome or update the path in `generate-pdf.js` or use `chromePath` in `pdf-config.json`

#### Missing Slides

```
[WARNING] Some slides referenced in categorySlides were not found

Missing slides:
  - slides/coroutines/flow/missing-slide.html

PDF will be generated with available slides only.
```

**Solution**: Fix missing slide files or update categorySlides object

#### Generation Script Missing

```
[ERROR] PDF generation script not found

Expected: scripts/generate-pdf.js

Please ensure the script exists before running this command.
```

**Solution**: The skill will automatically copy the script to your workspace

#### Prism.js Timeout

```
[ERROR] PDF generation failed

Error: Timeout waiting for Prism.js

Possible fixes:
  - Check internet connection (Prism.js loaded from CDN)
  - Increase timeout in pdf-config.json
  - Try again
```

**Solution**: Check internet connection or increase `timeout` in configuration file

## Best Practices

### Before PDF Generation

1. **Validate presentation** - Use `/html-presentation:validate-presentation` to check for issues
2. **Preview in browser** - Use `/html-presentation:preview` to verify slides look correct
3. **Check code blocks** - Ensure all code blocks have proper language classes
4. **Test locally** - Generate PDF locally before distributing
5. **Use dry-run** - Test with `--dry-run` flag first to verify configuration

### After PDF Generation

1. **Review PDF** - Open and review the generated PDF
2. **Check file size** - Large PDFs may need optimization
3. **Verify fonts** - Ensure Raleway font is embedded correctly
4. **Test syntax highlighting** - Confirm code blocks are properly highlighted
5. **Check colors** - Verify brand colors match your expectations

### Distribution

The generated PDF is ready for distribution and includes:
- All brand styling and colors
- Embedded Raleway typography
- Logo on each slide
- Syntax-highlighted code blocks
- Print-optimized layout

## Workflow Integration

The two skills work together seamlessly:

1. **Design** - Use `html-presentation` skill to create slides
2. **Validate** - Use `/html-presentation:validate-presentation`
3. **Preview** - Use `/html-presentation:preview` to view in browser
4. **Export** - Use `html-presentation-pdf-export` skill to generate PDF

### Typical Workflow

```
# 1. Create presentation
"Create a presentation about Kotlin Coroutines"

# 2. Validate structure
/html-presentation:validate-presentation coroutines

# 3. Preview in browser
/html-presentation:preview coroutines

# 4. Test with dry-run
"Generate PDF for coroutines with dry-run"

# 5. Generate PDF
"Generate PDF for coroutines"

# 6. Distribute
open coroutines.pdf
```

## PDF Export Troubleshooting

### Dependencies Not Installing

```bash
# Manually install dependencies
cd scripts
npm install
```

### Chrome Path Issues

The script automatically detects Chrome on:
- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Linux**: `/usr/bin/google-chrome` or `/usr/bin/chromium-browser`
- **Windows**: `C:\Program Files\Google\Chrome\Application\chrome.exe`

To override, set `chromePath` in `scripts/pdf-config.json`:

```json
{
  "chromePath": "/custom/path/to/chrome"
}
```

### Large PDF Files

If PDFs are too large:
1. Optimize images in slides
2. Reduce number of code examples
3. Consider splitting into multiple presentations
4. Compress PDF with external tools

### Font Issues

If Raleway font is not rendering:
1. Check internet connection (font loaded from Google Fonts CDN)
2. Verify font preload links in HTML
3. Consider embedding font files locally

## Requirements

- **Node.js** - Required for running PDF generation scripts
- **npm** - Package management
- **Chrome/Chromium** - PDF rendering (auto-detected or configurable)
- **Internet connection** - For Prism.js and Google Fonts CDN

## License

Copyright (c) 2025 Stephan Oudmaijer

