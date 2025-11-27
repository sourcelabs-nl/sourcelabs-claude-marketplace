---
description: List all slides in a presentation organized by topic
---

# List Slides in Presentation

Display all slides in a presentation, organized by topic, showing the complete structure and slide order.

## Arguments Expected

The user will provide:
1. **presentation** - The presentation name (e.g., "coroutines", "interop-testing-framework-integration")
2. **format** (optional) - Output format: "tree", "flat", "json"

## Instructions

Follow these steps to list slides:

1. **Parse user input**:
   - Extract presentation name
   - If not provided, ask which presentation to list
   - If presentation doesn't exist, show available presentations

2. **Read the main presentation HTML file**:
   - Path: `slides/{presentation}.html`
   - Extract the `categorySlides` object
   - Parse the JavaScript object to get slide structure

3. **Verify file existence**:
   - For each slide in categorySlides, check if the file exists
   - Mark missing files with ⚠️ warning

4. **Format and display the output**:

   **Default (Tree) Format**:
   ```
   📊 Presentation: Kotlin Coroutines
   📍 Location: slides/coroutines/
   📁 Total Topics: 7
   📄 Total Slides: 60

   1. Agenda
      ✓ title-page.html
      ✓ agenda.html

   2. Jobs, Scopes & Contexts
      ✓ title-page.html
      ✓ job-concept.html
      ✓ job-usage-examples.html
      ✓ launch-vs-async.html
      ✓ job-states-table.html
      ⚠️ missing-slide.html [FILE NOT FOUND]
      ...

   3. Structured Concurrency
      ✓ title-page.html
      ...
   ```

   **Flat Format** (if requested):
   ```
   1. agenda/title-page.html
   2. agenda/agenda.html
   3. jobs-scopes-contexts/title-page.html
   4. jobs-scopes-contexts/job-concept.html
   ...
   ```

   **JSON Format** (if requested):
   ```json
   {
     "presentation": "coroutines",
     "path": "slides/coroutines/",
     "topics": 7,
     "totalSlides": 60,
     "categories": {
       "agenda": [
         {"file": "title-page.html", "exists": true, "path": "slides/coroutines/agenda/title-page.html"},
         {"file": "agenda.html", "exists": true, "path": "slides/coroutines/agenda/agenda.html"}
       ],
       ...
     }
   }
   ```

5. **Provide additional information**:
   - Count of slides per topic
   - Total slide count
   - List any missing files
   - Show presentation file path

6. **Detect common issues**:
   - Missing slide files
   - Duplicate slide names within a topic
   - Topics with no slides (besides title-page)
   - Title pages missing from topics

## Example Usage

```
User: /list-slides coroutines
```

Expected output: Tree format showing all slides

```
User: /list-slides coroutines flat
```

Expected output: Flat list of all slide paths

```
User: /list-slides
```

Expected behavior: Ask which presentation to list

## Additional Features

### Summary Statistics
Show helpful statistics at the end:
```
📊 Summary:
   • Total Topics: 7
   • Total Slides: 60
   • Average Slides per Topic: 8.6
   • Missing Files: 0
   • Exercise Slides: 5
```

### Quick Actions
Suggest relevant next actions:
```
💡 Quick Actions:
   • Add a new slide: /new-slide coroutines {topic} {name}
   • Add a new topic: /add-topic coroutines {name}
   • Generate PDF: npm run pdf:coroutines
   • View presentation: npx http-server -p 8000
```

### Validation Warnings
Alert user to potential issues:
```
⚠️ Warnings:
   • Topic 'jobs-scopes-contexts' has no exercise slide
   • File 'slides/coroutines/flow/missing.html' referenced but not found
```

## List All Presentations

If user runs without arguments:
```
User: /list-slides
```

Show available presentations first:
```
📚 Available Presentations:
   1. coroutines (60 slides, 7 topics)
   2. interop-testing-framework-integration (48 slides, 4 topics)

Which presentation would you like to view?
```

## Important Notes

- Always read from the categorySlides object as the source of truth
- Check actual file existence, don't assume from object
- Show clear visual indicators (✓, ⚠️, 📁, 📄)
- Use consistent formatting and indentation
- Include full file paths for context
- Highlight any discrepancies between categorySlides and file system
- Make it easy to copy-paste slide names for other commands

## Error Handling

If presentation HTML file is missing:
```
❌ Error: Presentation file not found
   Expected: slides/{presentation}.html

📚 Available presentations:
   • coroutines
   • interop-testing-framework-integration
```

If categorySlides object cannot be parsed:
```
❌ Error: Cannot parse categorySlides object
   File: slides/{presentation}.html

Please check the JavaScript syntax in the file.
```