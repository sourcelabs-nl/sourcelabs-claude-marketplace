# JVM Testing Plugin

A Claude Code plugin that helps build and set up tests for JVM-based applications (Java/Kotlin).

## Skills

### pact-contract-test

Expert skill for writing Pact contract tests for HTTP (REST/GraphQL) and Message (async) interactions.

**Use this skill for:**
- Creating HTTP-based interaction contract tests (REST APIs, GraphQL)
- Creating Message-based interaction contract tests (Kafka)
- Reviewing existing Pact tests for best practices

**Example:**
```
Use the pact-contract-test skill to create a consumer test for my REST API
```

The skill provides:
- PactV4 examples for JUnit 5
- Consumer and provider test templates
- Maven dependency configuration
- Spring Boot integration examples
- Pact file sharing via JAR packaging

## Installation

```bash
# Add the marketplace
/plugin marketplace add sourcelabs-nl/sourcelabs-claude-marketplace

# Install this plugin
/plugin install jvm-testing@sourcelabs
```

## Requirements

- Claude Code
- Java or Kotlin project with Maven

## Author

**Stephan Oudmaijer** - Sourcelabs B.V.

## License

Copyright 2025 - Sourcelabs B.V.
