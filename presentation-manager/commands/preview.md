---
description: Start local server and preview presentation in browser
---

# Preview Presentation

Start a local HTTP server and open the presentation in your default browser.

## Arguments Expected

The user will provide:
1. **presentation** (optional) - The presentation name (e.g., "coroutines", "interop-testing-framework-integration")
   - If not provided, show available presentations and let user choose

## Instructions

Follow these steps to preview a presentation:

1. **Parse user input**:
   - Extract presentation name if provided
   - If not provided, list available presentations:
     - Look for `.html` files in `slides/` directory
     - Show numbered list of presentations
     - Ask user which one to preview

2. **Verify presentation exists**:
   - Check if `slides/{presentation}.html` exists
   - If not found, show available presentations and ask user to choose

3. **Check if server is already running**:
   - Try to detect if http-server is already running on port 8000
   - You can check this by looking for the process or attempting to connect

4. **Start the HTTP server**:
   - Run: `npx http-server -p 8000`
   - Use the `run_in_background: true` parameter so it doesn't block
   - Wait 2-3 seconds for server to start

5. **Show preview information**:
   - Display the URL to access the presentation
   - Format: `http://localhost:8000/slides/{presentation}.html`
   - Provide clear instructions

## Output Format

Show the user:

```
🚀 Starting local server...

✓ Server running at http://localhost:8000

📊 Available presentations:
   • Kotlin Coroutines:
     http://localhost:8000/slides/coroutines.html

   • Interop Testing Framework Integration:
     http://localhost:8000/slides/interop-testing-framework-integration.html

⌨️  Navigation:
   • Next slide: → or Space
   • Previous slide: ←
   • Jump to topic: Use dropdown menu
   • First/Last slide: ⏮ ⏭ buttons

💡 Tip: Keep this server running while you make changes.
    Refresh browser to see updates.

Press Ctrl+C in terminal to stop the server.
```

If a specific presentation was requested, highlight that one:

```
🚀 Starting local server...

✓ Server running at http://localhost:8000

📊 Kotlin Coroutines Presentation:

   👉 http://localhost:8000/slides/coroutines.html

   Click the link above or copy-paste into your browser.

⌨️  Navigation:
   • Next slide: → or Space
   • Previous slide: ←
   • Jump to topic: Use dropdown menu

💡 Tip: Keep this server running. Refresh browser to see updates.
```

## Example Usage

```
User: /preview coroutines
```

Expected behavior:
1. Start http-server on port 8000 (if not running)
2. Show the URL for coroutines presentation
3. Provide navigation tips

```
User: /preview
```

Expected behavior:
1. List available presentations
2. Ask which one to preview
3. Start server and show URLs

## Important Notes

- Use `run_in_background: true` for the Bash command to keep server running
- Server runs on port 8000 by default
- CORS restrictions require a local server (file:// URLs won't work)
- Server continues running until user manually stops it (Ctrl+C)
- If port 8000 is busy, the command will fail - inform user to stop existing server or use different port
- The server serves the entire project directory, so all assets load correctly

## Error Handling

If server fails to start:
```
❌ Error: Could not start server on port 8000

Port may already be in use. Try:
   • Stop any existing http-server: Ctrl+C in the terminal
   • Or check for processes: lsof -i :8000
   • Or use a different port: npx http-server -p 8001
```

If presentation file doesn't exist:
```
❌ Error: Presentation not found
   Expected: slides/{presentation}.html

📚 Available presentations:
   • coroutines
   • interop-testing-framework-integration
```

## Advanced Options

If user specifies a port:
```
User: /preview coroutines on port 3000
```

Use the specified port instead of 8000.

## Integration with Other Commands

Suggest related commands after preview:
```
📋 While previewing, you can:
   • Add slides: /new-slide {presentation} {topic} {slide-name}
   • List structure: /list-slides {presentation}
   • Validate: /validate-presentation {presentation}
   • Generate PDF: /generate-pdf {presentation}
```