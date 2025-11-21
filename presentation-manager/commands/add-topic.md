---
description: Add a new topic to an existing presentation
---

# Add Topic to Presentation

Create a new topic (category) in an existing presentation with proper folder structure and update the presentation HTML.

## Arguments Expected

The user will provide:
1. **presentation** - The presentation name (e.g., "coroutines", "interop-testing-framework-integration")
2. **topic-name** - The topic name (e.g., "error-handling", "testing-patterns")
3. **display-name** - The display name for the topic dropdown (e.g., "Error Handling", "Testing Patterns")

## Instructions

Follow these steps to add a new topic:

1. **Parse user input** to extract presentation and topic information
   - If missing, ask for required information
   - Validate that the presentation exists
   - Ensure topic name is in kebab-case (lowercase with hyphens)

2. **Check for conflicts**:
   - Verify topic folder doesn't already exist
   - Check categorySlides object doesn't already have this topic
   - If conflict exists, ask user how to proceed

3. **Create topic folder structure**:
   ```
   slides/{presentation}/{topic-name}/
   ```

4. **Create title-page.html** in the new topic folder:
   ```html
   <div class="center">
       <h1>Topic Display Name</h1>
       <p class="subtitle">Brief description or context</p>
       <div style="margin-top: 60px; font-size: 1.2em; color: #666;">
           <p>Additional information about this topic</p>
       </div>
   </div>
   ```

5. **Read the main presentation HTML file**:
   - Locate the `<select id="categorySelect">` dropdown
   - Locate the `categorySlides` object
   - Determine the next topic number

6. **Update the topic dropdown**:
   Add new option in the appropriate position:
   ```html
   <option value="{topic-name}">N. {Display Name}</option>
   ```

7. **Update categorySlides object**:
   Add new topic entry:
   ```javascript
   '{topic-name}': [
       {type: 'named', category: '{topic-name}', name: 'title-page.html'}
   ]
   ```

8. **Validate changes**:
   - Confirm folder and file creation
   - Verify categorySlides object syntax is valid
   - Check dropdown option was added correctly
   - Ensure topic number sequence is correct

9. **Report to user**:
   - Summary of what was created
   - Path to the new topic folder
   - Next steps (e.g., "Add more slides with /new-slide")

## Example Usage

```
User: /add-topic coroutines error-handling "Error Handling"
```

Expected behavior:
1. Create folder: `slides/coroutines/error-handling/`
2. Create file: `slides/coroutines/error-handling/title-page.html`
3. Update `slides/coroutines.html`:
   - Add dropdown option: `<option value="error-handling">8. Error Handling</option>`
   - Add categorySlides entry: `'error-handling': [{type: 'named', category: 'error-handling', name: 'title-page.html'}]`
4. Confirm completion with details

## Alternative Usage

```
User: /add-topic
```

If no arguments provided:
1. Ask for presentation name
2. Ask for topic name
3. Ask for display name
4. Proceed with creation

## Important Notes

- Topic names MUST be in kebab-case (lowercase-with-hyphens)
- Every topic MUST start with a title-page.html
- Update both the dropdown AND categorySlides object
- Maintain numeric ordering in dropdown (1., 2., 3., etc.)
- Add topics in logical order within the presentation flow
- Follow brand guidelines for the title page
- Ensure categorySlides object remains valid JavaScript
- If this is the first topic after "agenda", it should be number 2

## Post-Creation

After creating a topic, suggest to the user:
1. Add content slides with `/new-slide`
2. Create an exercise slide if applicable
3. View the presentation with `npx http-server -p 8000`