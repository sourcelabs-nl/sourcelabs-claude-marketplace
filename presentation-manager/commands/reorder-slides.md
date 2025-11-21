---
description: Reorder slides within a topic or move slides between topics
---

# Reorder Slides

Change the order of slides within a topic or move slides between topics by updating the categorySlides object.

## Arguments Expected

The user will provide:
1. **presentation** - The presentation name (e.g., "coroutines")
2. **topic** - The topic/category name (e.g., "jobs-scopes-contexts")
3. **action** - Either "reorder" or "move"
4. **details** - Specific reordering instructions

## Instructions

### For Reordering Slides Within a Topic

1. **Parse user input**:
   - Extract presentation, topic, and desired order
   - Validate presentation and topic exist

2. **Read current state**:
   - Read main presentation HTML file
   - Extract categorySlides object
   - Show current slide order in the specified topic

3. **Display current order**:
   ```
   Current order in '{topic}':
   1. title-page.html
   2. concept-slide.html
   3. example-slide.html
   4. exercise-slide.html
   ```

4. **Get reordering instructions**:
   - Accept natural language: "move concept-slide after example-slide"
   - Accept numeric: "move slide 2 to position 3"
   - Accept explicit list: "1, 3, 2, 4" (new order by current position)

5. **Update categorySlides object**:
   - Reorder the array within the topic
   - Maintain proper JavaScript syntax
   - Preserve all slide properties (type, category, name)

6. **Validate changes**:
   - Ensure all slides are still present
   - Verify no duplicates created
   - Check JavaScript syntax is valid

7. **Report changes**:
   ```
   ✅ Slides reordered in '{topic}'

   New order:
   1. title-page.html
   2. example-slide.html
   3. concept-slide.html
   4. exercise-slide.html

   Changes saved to: slides/{presentation}.html
   ```

### For Moving Slides Between Topics

1. **Parse user input**:
   - Source topic and slide
   - Destination topic and position

2. **Validate move**:
   - Ensure slide exists in source topic
   - Ensure destination topic exists
   - Check if slide file needs to be moved physically

3. **Ask for confirmation**:
   ```
   Move 'concept-slide.html' from '{source-topic}' to '{dest-topic}'?

   This will:
   ✓ Update categorySlides object
   ⚠️ Move the HTML file from one folder to another
   ⚠️ Update the 'category' property in categorySlides

   Proceed? (y/n)
   ```

4. **Perform the move**:
   - Move the HTML file if confirmed
   - Remove from source topic in categorySlides
   - Add to destination topic in categorySlides
   - Update category property

5. **Report results**:
   ```
   ✅ Slide moved successfully

   File: slides/{presentation}/{dest-topic}/concept-slide.html
   Updated categorySlides in: slides/{presentation}.html
   ```

## Example Usage

### Reorder within topic:
```
User: /reorder-slides coroutines jobs-scopes-contexts
```
Claude will show current order and ask how to reorder

```
User: /reorder-slides coroutines jobs-scopes-contexts "move job-usage-examples after job-lifecycle-example"
```
Direct reorder instruction

### Move between topics:
```
User: /reorder-slides coroutines move scope-concept from jobs-scopes-contexts to structured-concurrency
```

## Interactive Mode

If user provides minimal information:

```
User: /reorder-slides coroutines jobs-scopes-contexts
```

Response:
```
Current slides in 'jobs-scopes-contexts':
1. title-page.html
2. job-concept.html
3. job-usage-examples.html
4. launch-vs-async.html
5. job-states-table.html

How would you like to reorder?
• Type numbers in new order: "1 3 2 4 5"
• Use natural language: "move job-usage-examples after launch-vs-async"
• Or type 'cancel' to abort
```

## Safety Features

1. **Backup Warning**:
   ```
   ⚠️ This will modify: slides/{presentation}.html

   Recommended: Commit current changes or create a backup before proceeding.
   Continue? (y/n)
   ```

2. **Validation Before Save**:
   - Check all referenced files still exist
   - Verify JavaScript syntax
   - Ensure title-page.html remains first
   - Confirm no slides were lost

3. **Dry Run Option**:
   ```
   User: /reorder-slides coroutines jobs-scopes-contexts --dry-run
   ```
   Show what would change without actually modifying files

## Important Rules

- **Never remove title-page.html** from the first position in any topic
- **Preserve all slide properties** (type, category, name)
- **Maintain JavaScript syntax** in categorySlides object
- **Move files on disk** when moving slides between topics
- **Update category property** when moving slides
- **Confirm destructive operations** before executing

## Visual Diff

Show before/after for clarity:

```
📊 Changes Preview:

BEFORE:                          AFTER:
jobs-scopes-contexts:           jobs-scopes-contexts:
  1. title-page                   1. title-page
  2. job-concept           →      2. job-usage-examples
  3. job-usage-examples    →      3. job-concept
  4. launch-vs-async              4. launch-vs-async

Apply these changes? (y/n)
```

## Post-Reorder Actions

After successful reorder:
```
✅ Slides reordered successfully!

💡 Next steps:
   • Preview changes: npx http-server -p 8000
   • List all slides: /list-slides coroutines
   • Create PDF: npm run pdf:coroutines
```

## Error Handling

### Slide not found:
```
❌ Error: Slide 'nonexistent-slide.html' not found in topic 'jobs-scopes-contexts'

Available slides:
  • title-page.html
  • job-concept.html
  • job-usage-examples.html
```

### Invalid topic:
```
❌ Error: Topic 'invalid-topic' not found in presentation 'coroutines'

Available topics:
  • agenda
  • jobs-scopes-contexts
  • structured-concurrency
  • cancellation
  • dispatchers
  • flow
  • conclusion
```

### Syntax error after changes:
```
❌ Error: Generated invalid JavaScript syntax

Rolling back changes...
✓ Original file restored

Please report this issue.
```