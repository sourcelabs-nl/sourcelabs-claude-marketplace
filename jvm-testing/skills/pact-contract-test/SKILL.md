---
name: pact-contract-test
description: Pact contract test expert that helps creating Pact tests for HTTP (REST and GraphQL) and Message (asynchronous) based interactions in Java or Kotlin applications.
allowed-tools: Read, WebFetch
---

# Pact Contract Test Skill

## Instructions

Expert in writing and configuring Pact contract tests for JVM based languages like Java and Kotlin.

**Use me for**:
- **Creating an HTTP based interaction contract test**: Request-response interactions over HTTP, typically synchronous flows.
- **Creating a Message interaction contract test**: Message based interactions using Kafka, typically asynchronous flows.
- **Review existing contract tests**: Provide suggestions and verify existing Pact contract tests, see if they follow best practices.

Before continuing, first ask for the following input:
1. What is the interaction type: HTTP or Message based interaction?
2. Provide an example interaction: request/response for HTTP or a message for Message (asynchronous) interactions.

# Pact Maven dependencies

The following Pact dependencies are commonly used for Pact V5. Where ${pact.version} is a variable for the pact version (e.g. 4.6.17).

```xml
<dependency>
    <groupId>au.com.dius.pact</groupId>
    <artifactId>provider</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>au.com.dius.pact</groupId>
    <artifactId>consumer</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>au.com.dius.pact.consumer</groupId>
    <artifactId>junit5</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
```

Pact Spring specific dependencies (JUnit 5):

```xml
<dependency>
    <groupId>au.com.dius.pact.provider</groupId>
    <artifactId>junit5spring</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
```

Pact Spring Boot dependencies:

```xml
<dependency>
    <groupId>au.com.dius.pact.provider</groupId>
    <artifactId>spring6</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
```

# Pact Consumer Test examples

## Example: Pact HTTP (REST API) based interaction consumer test

This is an example of a Consumer Test for a REST API call using PactV4 and JUnit 5.

```java
@Pact(provider="provider", consumer="consumer")
    public V4Pact createPact(PactDslWithProvider builder) {
        return builder
            .given("state-description") // In what state do we expect the system to be when this interation occurs
            .uponReceiving("Interaction description") // Short functional description of the HTTP based interaction (e.g. retrieving customer orders)
                .path("/api")
                .method("GET")
                .headers(Map.of("Accept", "application/json"))
            .willRespondWith()
                .headers(Map.of("Content-Type", "application/json"))
                .status(200)
                .body( /* response body */ )
            .toPact(V4Pact.class); // Needed for PactV4.
    }
```

## Example: Pact HTTP (GraphQL) based interaction consumer test

This is an example of a Consumer Test for a GraphQL call using PactV4 and JUnit 5.

```java
@Pact(provider="provider", consumer="consumer")
    public V4Pact createPact(PactDslWithProvider builder) {
        return builder
            .given("state-description") // In what state do we expect the system to be when this interation occurs
            .uponReceiving("Interaction description") // Short functional description of the HTTP based interaction (e.g. retrieving customer orders)
                .path("/graphql")
                .method("POST")
                .headers(Map.of("Accept", "application/json"))
            .willRespondWith()
                .headers(Map.of("Content-Type", "application/json"))
                .status(200)
                .body( /* response body */ )
            .toPact(V4Pact.class); // Needed for PactV4.
    }
```

## Example: Pact Message based interaction consumer test

This is an example of a Consumer Test using PactV4 and JUnit 5.

For message based interactions, the consumer is the party receiving a message.

```java
import au.com.dius.pact.consumer.MessagePactBuilder;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.junit5.PactConsumerTest;
import au.com.dius.pact.core.model.V4Pact;
import au.com.dius.pact.core.model.annotations.Pact;
import org.apache.groovy.util.Maps;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@PactConsumerTest
public class MessageConsumerContractTest {

    /**
     * A Pact defines the contract between the consumer and producer.
     */
    @Pact(consumer = "consumer", provider = "provider")
    public V4Pact messagePact(MessagePactBuilder builder) {
        return builder
            .hasPactWith("provider")
            .expectsToReceive("message-description")
            .withContent(new PactDslJsonBody()
                .uuid("id", UUID.randomUUID().toString())
                .stringType("name", "example")
                .localDate("date", "DD-MM-YYYY", LocalDate.now())
            )
            .withMetadata(Maps.of("kafka-topic", FPH_BUSINESS_EVENT_PROCESSOR_TOPIC))
            .toPact(V4Pact.class);
    }
}
```

# Pact Provider Verification Test examples

## Example: Pact Message based interaction provider test

This is an example of a Provider Verification Test using PactV4, Spring Boot and JUnit 5.

```java
import au.com.dius.pact.provider.MessageAndMetadata;
import au.com.dius.pact.provider.PactVerifyProvider;
import au.com.dius.pact.provider.junit5.MessageTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import au.com.dius.pact.provider.spring.spring6.PactVerificationSpring6Provider;
import org.apache.groovy.util.Maps;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;
import java.util.UUID;

@Provider("provider")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ProviderContractTest {

    @TestTemplate
    @ExtendWith(PactVerificationSpring6Provider.class)
    public void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @BeforeEach
    public void before(PactVerificationContext context) {
        context.setTarget(new MessageTestTarget());
    }

    /**
     * Verify the message interaction with description `message description`. 
     */
    @PactVerifyProvider("message-description")
    public MessageAndMetadata verifyMessageInteraction() {
        // Below an example message is constructed, in a real application the code is invoked that constructs the message that needs to be verified against the consumer contract.
        var message = """ 
            {
              "name": "value",
              ...other fields here...
            }
            """;
        Map<String, String> metadata = Maps.of("topic", "kafka-topic");
        return new MessageAndMetadata(message.getBytes(), metadata);
    }
}
```

## Sharing Pact files via a shared library (without a broker)

When sharing Pact files in a jar, use the following maven configuration for packaging the pacts into a jar during the maven package phase: 

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <executions>
        <execution>
            <id>contract-test</id>
            <phase>package</phase>
            <goals>
                <goal>jar</goal>
            </goals>
            <configuration>
                <classifier>contract</classifier>
                <includes>
                    <include>target/pacts/**</include>
                </includes>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## Pact workflow

### Key concepts

| Concept | Description |
|---------|-------------|
| **Consumer** | Application that uses functionality from another component (e.g., makes HTTP requests) |
| **Provider** | Application that offers functionality to others (e.g., exposes an HTTP API) |
| **Interaction** | Defines what is consumed and how: request, provider state, and expected response |
| **Provider state** | Test fixture describing the provider's state during an interaction |
| **Contract (Pact file)** | Contains all interactions between a specific consumer and provider |
| **Verification** | Replays interactions against provider code and compares actual vs expected responses |

An application can be both consumer and provider depending on the interaction.

### Consumer workflow

1. Write consumer tests that specify the interactions you need
2. Consumer tests generate the Pact file automatically
3. Share the Pact file with the provider for verification

### Provider workflow

1. Verify all existing contracts against your provider code
2. If verification passes, your changes are compatible with all consumers

# References to resources:

* Pact JVM provider: https://docs.pact.io/implementation_guides/jvm/provider/junit5
* Pact consumer driven contract testing: https://www.codecentric.de/en/knowledge-hub/blog/consumer-driven-contract-testing-with-pact
* Pact consumer test for Kafka example: https://github.com/pactflow/example-consumer-java-kafka/blob/master/src/test/java/io/pactflow/example/kafka/ProductsPactTest.java
* Pact tests for Kafka: https://docs.pact.io/recipes/kafka
* Pact in event driven applications: https://www.codecentric.de/en/knowledge-hub/blog/message-pact-contract-testing-in-event-driven-applications

