---
description: Validate presentation structure and identify issues
---

# Validate Presentation

Check the presentation structure for common issues, missing files, syntax errors, and best practice violations.

## Arguments Expected

The user will provide:
1. **presentation** - The presentation name (e.g., "coroutines")
2. **level** (optional) - Validation level: "quick", "full", "strict"

## Instructions

Perform comprehensive validation of the presentation structure:

### 1. File Structure Validation

Check that required files and folders exist:

```
🔍 Validating file structure...

✓ Main HTML file exists: slides/{presentation}.html
✓ Presentation folder exists: slides/{presentation}/
✓ Assets folder exists: slides/assets/
✓ Shared styles exist: slides/assets/shared-styles.css
```

### 2. CategorySlides Validation

Parse and validate the categorySlides object:

```
🔍 Validating categorySlides object...

✓ Valid JavaScript syntax
✓ All topics defined
✓ Total slides: 60 across 7 topics
```

Check for:
- Valid JavaScript syntax
- All topics have at least a title-page
- No duplicate slide names within topics
- Category names match folder names
- File names end with .html

### 3. File Existence Check

Verify all slides referenced in categorySlides exist:

```
🔍 Checking slide files...

✓ 60/60 slides found
⚠️ Missing files: 0
```

If files are missing:
```
⚠️ Missing slides:
  • slides/coroutines/flow/missing-slide.html
    Referenced in: categorySlides['flow'][3]
```

### 4. Reverse Check

Find HTML files not referenced in categorySlides:

```
🔍 Checking for orphaned slides...

⚠️ Found 2 slides not in categorySlides:
  • slides/coroutines/flow/old-example.html
  • slides/coroutines/drafts/work-in-progress.html

These slides won't appear in the presentation.
```

### 5. Content Validation

For each slide file, check:

**Quick level**:
- File is not empty
- Contains valid HTML

**Full level** (includes quick):
- Code blocks have language classes
- No `<html>`, `<head>`, or `<body>` tags (slides are fragments)
- Contains at least one heading (h1, h2, or h3)
- Proper use of brand colors

**Strict level** (includes full):
- All code blocks use Prism-supported languages
- No inline styles (should use classes)
- Proper semantic HTML structure
- Images have alt text
- Links have valid hrefs

Example output:
```
🔍 Validating slide content...

✓ 55/60 slides valid
⚠️ 5 slides have warnings:

slides/coroutines/flow/flow-concept.html:
  ⚠️ Code block missing language class (line 12)
  ⚠️ Using inline style instead of CSS class (line 8)

slides/coroutines/dispatchers/dispatcher-io.html:
  ⚠️ Very long code block (40 lines, may overflow in PDF)
```

### 6. Topic Structure Validation

Check each topic follows best practices:

```
🔍 Validating topic structure...

✓ agenda (2 slides)
  ✓ Has title-page.html
  ✓ No issues

✓ jobs-scopes-contexts (16 slides)
  ✓ Has title-page.html
  ✓ Has exercise slide
  ⚠️ 16 slides is long, consider splitting

⚠️ cancellation (6 slides)
  ✓ Has title-page.html
  ⚠️ No exercise slide
```

### 7. Syntax Highlighting Validation

Check Prism.js setup:

```
🔍 Validating syntax highlighting...

✓ Prism.js CSS linked in <head>
✓ Prism.js scripts loaded before </body>
✓ Re-highlighting script present

Code blocks by language:
  • Kotlin: 45 blocks
  • Java: 8 blocks
  • Bash: 3 blocks

⚠️ Missing language components:
  • prism-javascript.min.js (1 JavaScript block found)
```

### 8. Navigation Validation

Check navigation setup:

```
🔍 Validating navigation...

✓ Category dropdown exists
✓ All topics in categorySlides have dropdown options
✓ Navigation buttons present (⏮ ← → ⏭)
✓ Keyboard navigation setup
⚠️ Topic numbers in dropdown don't match order (7 should be 8)
```

### 9. Brand Compliance

Check brand guidelines:

```
🔍 Validating brand compliance...

✓ Raleway font preloaded
✓ Shared styles linked
✓ Using brand colors (#179EDA, #0C7BB8)
⚠️ 2 slides use non-brand colors
```

## Validation Levels

### Quick (default)
- File structure
- CategorySlides syntax
- File existence
- Basic content validation
- ~5 seconds

### Full
- Everything in Quick
- Detailed content validation
- Code block analysis
- Topic structure
- ~15 seconds

### Strict
- Everything in Full
- Semantic HTML validation
- Accessibility checks
- Best practices enforcement
- ~30 seconds

## Example Usage

```
User: /validate-presentation coroutines
```

Run quick validation (default)

```
User: /validate-presentation coroutines full
```

Run comprehensive validation

```
User: /validate-presentation coroutines strict
```

Run strict validation with all checks

## Output Format

### Success Case
```
✅ Validation Complete: coroutines

📊 Summary:
   • Structure: ✓ Valid
   • CategorySlides: ✓ Valid (60 slides, 7 topics)
   • Files: ✓ All present
   • Content: ✓ No critical issues
   • Syntax Highlighting: ✓ Configured
   • Navigation: ✓ Working
   • Brand: ✓ Compliant

🎉 No issues found! Presentation is ready.
```

### With Warnings
```
⚠️ Validation Complete: coroutines (with warnings)

📊 Summary:
   • Structure: ✓ Valid
   • CategorySlides: ✓ Valid (60 slides, 7 topics)
   • Files: ⚠️ 2 orphaned files
   • Content: ⚠️ 5 warnings
   • Syntax Highlighting: ✓ Configured
   • Navigation: ✓ Working
   • Brand: ⚠️ Minor issues

⚠️ 7 warnings found (see details above)

💡 Recommended actions:
   • Fix code blocks missing language classes
   • Remove or reference orphaned slides
   • Update topic numbers in dropdown
```

### With Errors
```
❌ Validation Failed: coroutines

📊 Summary:
   • Structure: ✓ Valid
   • CategorySlides: ❌ Syntax error
   • Files: ❌ 3 missing files
   • Content: Not checked (fix errors first)

❌ 4 critical errors found

🔧 Required fixes:
   1. Fix JavaScript syntax in categorySlides object
   2. Create missing slide files or remove from categorySlides
   3. Re-run validation after fixes
```

## Auto-Fix Option

For some issues, offer to auto-fix:

```
⚠️ Found 3 auto-fixable issues:
   1. Topic numbers in dropdown are misaligned
   2. Missing language class on 2 code blocks
   3. One orphaned file can be removed

Auto-fix these issues? (y/n)
```

## Integration with Other Commands

Suggest related commands based on findings:

```
💡 Related commands:
   • Add missing slides: /new-slide coroutines {topic} {name}
   • Reorder topics: /reorder-slides coroutines {topic}
   • View structure: /list-slides coroutines
   • Generate PDF: /generate-pdf coroutines
```

## Validation Report

Option to generate detailed report:

```
User: /validate-presentation coroutines --report
```

Creates `presentation-validation-report.md` with:
- All findings organized by category
- Specific line numbers for issues
- Recommendations for fixes
- Links to relevant documentation

## Important Notes

- Always validate before generating PDFs
- Run validation after making structural changes
- Use strict mode before committing changes
- Auto-fix should always ask for confirmation
- Provide actionable recommendations
- Link to specific files and line numbers where possible

## Exit Codes

Return meaningful status:
- ✅ 0 warnings, 0 errors = Perfect
- ⚠️ Warnings but no errors = Good (optional fixes)
- ❌ Errors present = Requires fixes