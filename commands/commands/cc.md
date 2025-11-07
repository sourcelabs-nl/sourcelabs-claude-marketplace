---
description: Create a conventional commit with staged and modified files
argument-hint: "[optional scope]"
---

You are tasked with creating a git commit following the Conventional Commits specification (https://www.conventionalcommits.org/en/v1.0.0/).

IMPORTANT RULES:
- NEVER mention any AI tools or code assistants in commit messages
- Keep descriptions concise and to the point
- Follow the Conventional Commits format strictly

## Step 1: Analyze Changes
First, run these commands to understand the current state:
!git status
!git diff --cached
!git diff

## Step 2: Determine Commit Type
Based on the changes, select the appropriate type:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style/formatting (no functional changes)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies, tooling
- **build**: Build system or external dependencies
- **ci**: CI/CD configuration changes
- **perf**: Performance improvements

## Step 3: Determine Scope (Optional)
The scope should be the area of the codebase affected (e.g., api, ui, auth, database).
If the user provided $ARGUMENTS, use that as the scope.

## Step 4: Create Commit Message
Format: `<type>(<scope>): <description>`

The description should:
- Use imperative mood ("add" not "added" or "adds")
- Not capitalize the first letter
- Not end with a period
- Be concise (50 characters or less for the first line)

If there are breaking changes, add `!` after the scope: `<type>(<scope>)!: <description>`

## Step 5: Add Body (if needed)
For complex changes, add a blank line and then a more detailed explanation.

## Step 6: Add Footer (if needed)
For breaking changes, add:
```
BREAKING CHANGE: description of what broke and migration path
```

## Step 7: Execute the Commit
Create the commit using the format above. Use a heredoc to pass the commit message to git commit.

Example commit messages:
- `feat(auth): add JWT token validation`
- `fix(api): resolve null pointer in user endpoint`
- `docs: update installation instructions`
- `refactor(database): simplify query builder logic`
- `chore(deps): upgrade spring boot to 3.2.0`

Now proceed with creating the commit based on the current changes.
