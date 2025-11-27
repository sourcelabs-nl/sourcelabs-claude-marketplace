---
description: Create a new slide in an existing presentation topic
---

# Create New Slide

Create a new slide HTML file in an existing presentation topic and add it to the categorySlides object.

## Arguments Expected

The user will provide in natural language or as arguments:
1. **presentation** - The presentation name (e.g., "coroutines", "interop-testing-framework-integration")
2. **topic** - The topic/category name (e.g., "jobs-scopes-contexts", "cancellation")
3. **slide-name** - The name for the new slide file (e.g., "job-hierarchy-concept")
4. **slide-type** (optional) - The type of slide: "concept", "example", "comparison", "exercise", "title"

## Instructions

Follow these steps to create a new slide:

1. **Parse user input** to extract presentation, topic, and slide name
   - If any are missing, ask the user for the missing information
   - Validate that the presentation and topic exist

2. **Determine slide type**:
   - Ask user what type of slide they want if not specified
   - Options: concept, code-example, comparison, exercise, custom

3. **Read the main presentation HTML** file to understand:
   - Existing slides in the topic
   - The categorySlides object structure
   - Where to insert the new slide

4. **Create the slide HTML file** at:
   `slides/{presentation}/{topic}/{slide-name}.html`

   Use appropriate template based on slide type:

   **Concept slide template**:
   ```html
   <h2>Slide Title</h2>
   <p style="font-size: 1.3em; margin-bottom: 30px;">Brief description of the concept</p>
   <ul>
       <li>Key point one</li>
       <li>Key point two</li>
       <li>Key point three</li>
   </ul>
   <div class="note">
       <strong>Key Concept:</strong> Important takeaway message
   </div>
   ```

   **Code example template**:
   ```html
   <h2>Example Title</h2>
   <p style="font-size: 1.2em; margin-bottom: 20px;">Explanation of what this code demonstrates</p>
   <pre><code class="language-kotlin">
   fun example() {
       // Code here
       println("Example")
   }
   </code></pre>
   <div class="note">
       <strong>Tip:</strong> Best practice or important note
   </div>
   ```

   **Comparison template**:
   ```html
   <h2>Comparison Title</h2>
   <p style="font-size: 1.2em; margin-bottom: 20px;">Context for the comparison</p>
   <div class="comparison">
       <div class="box">
           <h4>❌ Bad Approach</h4>
           <pre><code class="language-kotlin">// Bad code example</code></pre>
       </div>
       <div class="box">
           <h4>✓ Good Approach</h4>
           <pre><code class="language-kotlin">// Good code example</code></pre>
       </div>
   </div>
   <div class="note">
       <strong>Best Practice:</strong> Explanation of why the good approach is better
   </div>
   ```

5. **Update the categorySlides object** in the main presentation HTML:
   - Add the new slide entry: `{type: 'named', category: '{topic}', name: '{slide-name}.html'}`
   - Ask user where to insert it (at the end, after specific slide, etc.)
   - If not specified, add it at the end of the topic's slide array

6. **Validate the changes**:
   - Ensure the file was created successfully
   - Verify categorySlides object syntax is valid
   - Confirm the category and name match

7. **Report to user**:
   - Confirm slide created at path
   - Show where it was added in categorySlides
   - Mention they can view it by opening the presentation HTML in a browser with `npx http-server -p 8000`

## Example Usage

```
User: /new-slide coroutines jobs-scopes-contexts supervisor-job-concept
```

Expected behavior:
1. Create file: `slides/coroutines/jobs-scopes-contexts/supervisor-job-concept.html`
2. Ask user for slide type (concept, example, comparison, etc.)
3. Create slide with appropriate template
4. Add to categorySlides in `slides/coroutines.html`
5. Confirm completion

## Important Notes

- Always validate that presentation and topic folders exist
- Never overwrite existing slide files without confirmation
- Ensure slide names use kebab-case (lowercase with hyphens)
- Maintain proper indentation in categorySlides object
- Remember to add `.html` extension to the name in categorySlides
- For code examples, always use `class="language-kotlin"` or appropriate language
- Follow brand guidelines (colors, Raleway font)