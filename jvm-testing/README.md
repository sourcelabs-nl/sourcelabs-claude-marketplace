# JVM Testing Plugin

A Claude Code plugin that helps build and set up tests for JVM-based applications (Java/Kotlin).

## Skills

### pact-contract-test

Expert skill for writing Pact contract tests for HTTP (REST/GraphQL) and Message (async) interactions.

**Use this skill for:**
- Creating HTTP-based interaction contract tests (REST APIs, GraphQL)
- Creating Message-based interaction contract tests (Kafka, RabbitMQ)
- Writing consumer tests (define expectations for services you call)
- Writing provider verification tests (verify your service meets consumer expectations)
- Reviewing existing Pact tests for best practices

**Example:**
```
Use the pact-contract-test skill to create a consumer test for my REST API
```

The skill provides:
- Decision flow for choosing the right test type
- Quick start templates with placeholder markers
- Pact V4 examples for JUnit 5 (Java and Kotlin)
- Consumer and provider test templates
- Maven dependency configuration
- Spring Boot 2.x and 3.x integration
- Pact Broker integration and can-i-deploy checks
- Common mistakes and troubleshooting guides

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
