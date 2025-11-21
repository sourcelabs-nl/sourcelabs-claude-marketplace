---
description: Generate PDF version of a presentation
---

# Generate PDF

Generate a PDF version of a presentation using Puppeteer and the existing generate-pdf script.

## Arguments Expected

The user will provide:
1. **presentation** - The presentation name (e.g., "coroutines", "interop-testing-framework-integration")

## Instructions

Follow these steps to generate a PDF:

1. **Parse user input**:
   - Extract presentation name
   - If not provided, show available presentations and ask which one

2. **Validate prerequisites**:
   - Check if `node_modules/` exists
   - Check if `scripts/generate-pdf.js` exists
   - Check if presentation HTML file exists

3. **Check for missing dependencies**:
   If `node_modules/` doesn't exist:
   ```
   📦 Installing dependencies first...
   ```
   Run: `npm install`

4. **Run the PDF generation script**:
   ```bash
   npm run pdf:{presentation}
   ```

   Or directly:
   ```bash
   node scripts/generate-pdf.js {presentation}
   ```

5. **Monitor the process**:
   - Show progress updates from the script
   - Watch for errors
   - Display completion status

6. **Report results**:
   ```
   ✅ PDF generated successfully!

   📍 Location: {presentation}.pdf
   📊 Total slides: {count}
   📦 File size: {size} KB

   💡 The PDF includes:
      • All slides with brand colors
      • Raleway font typography
      • Logo on each slide
      • Syntax-highlighted code blocks
      • Print-optimized layout (1200x800px)
   ```

## Example Usage

```
User: /generate-pdf coroutines
```

Expected behavior:
1. Validate prerequisites
2. Run: `npm run pdf:coroutines`
3. Monitor output
4. Report success with file location and details

```
User: /generate-pdf
```

Expected behavior:
1. List available presentations:
   ```
   📚 Available Presentations:
      • coroutines
      • interop-testing-framework-integration

   Which presentation would you like to generate a PDF for?
   ```

## Available Presentations

The command should recognize these npm scripts:
- `npm run pdf:coroutines` → generates `coroutines.pdf`
- `npm run pdf:interop` → generates `interop-testing-framework-integration.pdf`

## Troubleshooting

### If Puppeteer fails:
```
❌ Puppeteer error: Could not find Chrome

Try installing Chrome or updating the executablePath in scripts/generate-pdf.js

Current path: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

### If slides are missing:
```
⚠️ Warning: Some slides referenced in categorySlides were not found

Missing slides:
  • slides/coroutines/flow/missing-slide.html

PDF will be generated with available slides only.
```

### If script is missing:
```
❌ Error: PDF generation script not found

Expected: scripts/generate-pdf.js

Please ensure the script exists before running this command.
```

## Pre-Generation Validation

Before generating PDF, optionally validate:

1. **Check for missing slides**:
   ```
   🔍 Validating slide structure...
   ✓ All 60 slides found
   ✓ All code blocks have language classes
   ✓ All topics have title pages
   ```

2. **Warn about potential issues**:
   ```
   ⚠️ Potential Issues:
      • 3 code blocks missing language class (won't be highlighted)
      • 1 slide has very long code (may overflow)

   Continue with PDF generation? (y/n)
   ```

## Post-Generation Actions

After successful generation:

```
✅ PDF generated successfully!

📍 Location: coroutines.pdf

💡 Next steps:
   • Open PDF: open coroutines.pdf
   • View slides: ls -lh coroutines.pdf
   • Generate other presentation: /generate-pdf interop

📤 Ready to distribute:
   • PDF includes all branding
   • All slides are print-ready
   • Syntax highlighting applied
```

## Advanced Options

Support additional flags if provided:

```
User: /generate-pdf coroutines --open
```
Generate PDF and open it automatically

```
User: /generate-pdf coroutines --validate
```
Run validation before generating

```
User: /generate-pdf coroutines --force
```
Skip validation warnings and generate anyway

## Multiple Presentations

```
User: /generate-pdf all
```

Generate PDFs for all presentations:
```
📄 Generating all presentations...

1/2 Generating coroutines.pdf...
✅ coroutines.pdf (1.2 MB, 60 slides)

2/2 Generating interop-testing-framework-integration.pdf...
✅ interop-testing-framework-integration.pdf (980 KB, 48 slides)

✨ All PDFs generated successfully!
```

## Important Notes

- The script uses Puppeteer with Chrome headless
- Generated PDFs include Prism.js syntax highlighting
- Each slide is 1200x800px
- Brand colors and Raleway font are embedded
- Process may take 10-30 seconds depending on slide count
- Temporary HTML file is created and cleaned up automatically

## Error Recovery

If generation fails:
1. Show full error message from script
2. Check if temporary files need cleanup
3. Suggest potential fixes
4. Offer to retry

```
❌ PDF generation failed

Error: Timeout waiting for Prism.js

Possible fixes:
  • Check internet connection (Prism.js loaded from CDN)
  • Increase timeout in generate-pdf.js
  • Try again: /generate-pdf coroutines

Retry now? (y/n)
```