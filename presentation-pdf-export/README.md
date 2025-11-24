# Presentation PDF Export Plugin

A Claude Code plugin that generates professional PDF documents from HTML-based presentations created with the presentation-manager plugin.

## Overview

The Presentation PDF Export plugin provides a specialized skill for converting HTML presentation slides into print-ready PDF documents. It uses Puppeteer and Chrome headless to generate PDFs with full brand styling, syntax highlighting, and typography preserved.

### Key Features

- **Automated PDF Generation** - Convert HTML presentations to PDF with a single command
- **Full Brand Preservation** - Maintains colors, typography (Raleway), and logo placement
- **Syntax Highlighting** - Prism.js code highlighting preserved in PDF output
- **Print Optimization** - 1200x800px per slide for optimal print quality
- **Dependency Management** - Automatic installation of required npm packages
- **Error Recovery** - Comprehensive error handling and troubleshooting guidance

## Installation

1. Place the `presentation-pdf-export` folder in your Claude Code plugins directory
2. The plugin will be automatically available in Claude Code
3. Dependencies (Puppeteer) will be installed automatically when first used

## Plugin Structure

```
presentation-pdf-export/
├── .claude-plugin/
│   └── plugin.json              # Plugin metadata
├── skills/
│   ├── SKILL.md                 # PDF Export skill
│   ├── scripts/
│   │   └── generate-pdf.js      # PDF generation script
│   └── templates/
│       ├── package.json         # npm dependencies template
│       └── pdf-config.json      # Configuration template
└── README.md                    # This file
```

## The PDF Export Skill

The plugin's core capability is the **presentation-pdf-export skill**, which handles the entire PDF generation workflow including dependency management, validation, and error recovery.

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

1. **Validate presentation** - Use `/presentation-manager:validate-presentation` to check for issues
2. **Preview in browser** - Use `/presentation-manager:preview` to verify slides look correct
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

### With Presentation Manager

This plugin works seamlessly with the `presentation-manager` plugin:

1. **Design** - Use `presentation-manager:skills` to create slides
2. **Validate** - Use `/presentation-manager:validate-presentation`
3. **Preview** - Use `/presentation-manager:preview` to view in browser
4. **Export** - Use `presentation-pdf-export` skill to generate PDF

### Typical Workflow

```
# 1. Create presentation
"Create a presentation about Kotlin Coroutines"

# 2. Validate structure
/presentation-manager:validate-presentation coroutines

# 3. Preview in browser
/presentation-manager:preview coroutines

# 4. Test with dry-run
"Generate PDF for coroutines with dry-run"

# 5. Generate PDF
"Generate PDF for coroutines"

# 6. Distribute
open coroutines.pdf
```

## Troubleshooting

### Dependencies Not Installing

```bash
# Manually install dependencies
cd scripts
npm install
```

### Chrome Path Issues

The script now automatically detects Chrome on:
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

### Progress Tracking

The script now shows detailed progress:
```
Progress: 0/60 slides processed

[Category] Introduction:
  [OK] title-page.html [1/60 - 2%]
  [OK] agenda.html [2/60 - 3%]
  ...
```

## Performance Considerations

- **First Generation**: Slower due to dependency installation
- **Subsequent Generations**: Faster (10-30 seconds)
- **Large Presentations**: May take longer (60+ slides)
- **Network**: Requires internet for Prism.js and Google Fonts
- **Chrome Launch**: Initial browser launch adds 2-3 seconds

## Cross-Platform Support

The plugin now includes automatic platform detection:
- Automatically finds Chrome on macOS, Windows, and Linux
- Falls back to Puppeteer's bundled Chromium if Chrome not found
- Custom Chrome path configurable via `pdf-config.json`

## Contributing

When extending this plugin:
1. Follow existing script structure
2. Update error handling for new scenarios
3. Maintain compatibility with presentation-manager
4. Test PDF output across different presentations
5. Update this README with new functionality
6. Test on multiple platforms (macOS, Windows, Linux)

## Support

For issues or questions:
- Check validation output before generating PDF
- Review error messages for specific guidance
- Verify prerequisites (Chrome, scripts, presentation file)
- Test with a simple presentation first
- Use `--dry-run` mode to test configuration

## Requirements

- **Node.js** - Required for running scripts
- **npm** - Package management
- **Chrome/Chromium** - PDF rendering (auto-detected or configurable)
- **Internet connection** - For Prism.js and Google Fonts CDN
- **Presentation Manager** - For creating HTML presentations

## License

Copyright (c) 2024 Stephan Oudmaijer

## Version

**0.0.1** - Initial release

---

**Note**: This plugin is designed to work with presentations created by the `presentation-manager` plugin. It requires the HTML-based presentation structure with the categorySlides object and modular slide files.
