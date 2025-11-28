# Pact Contract Test Skill

A Claude Code skill for creating Pact contract tests for HTTP (REST and GraphQL) and Message (asynchronous) based interactions in Java or Kotlin applications.

## Overview

This skill helps developers create and configure contract tests using the Pact framework for JVM-based applications. It supports:

- **HTTP interactions**: REST APIs and GraphQL endpoints
- **Message interactions**: Kafka and other async messaging systems
- **Consumer tests**: Define expectations for services you call
- **Provider verification**: Verify your service meets consumer expectations

## Usage

Invoke this skill when you need help with:
- Creating new Pact consumer or provider tests
- Configuring Pact dependencies and plugins
- Understanding Pact concepts and best practices
- Reviewing existing contract tests

## References

### Official Documentation

- [Pact JVM Provider Guide](https://docs.pact.io/implementation_guides/jvm/provider/junit5) - Official JUnit 5 provider verification documentation
- [Pact Kafka Recipes](https://docs.pact.io/recipes/kafka) - Guide for testing Kafka-based message interactions

### Tutorials and Articles

- [Consumer Driven Contract Testing with Pact](https://www.codecentric.de/en/knowledge-hub/blog/consumer-driven-contract-testing-with-pact) - Comprehensive introduction to Pact and CDC testing
- [Message Pact: Contract Testing in Event-Driven Applications](https://www.codecentric.de/en/knowledge-hub/blog/message-pact-contract-testing-in-event-driven-applications) - Deep dive into async message testing with Pact

### Example Projects

- [Pact Kafka Consumer Example](https://github.com/pactflow/example-consumer-java-kafka/blob/master/src/test/java/io/pactflow/example/kafka/ProductsPactTest.java) - Complete Kafka consumer contract test example from PactFlow
