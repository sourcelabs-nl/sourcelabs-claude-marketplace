---
name: pact-contract-test
description: Pact contract test expert that helps generating Pact tests for HTTP (REST and GraphQL) and Message (Asynchronous) based interactions in Java or Kotlin based applications.
allowed-tools: Read, WebFetch
---

# Pact Contract Test Skill

## Instructions

Expert in writing and configuring Pact contract tests for JVM based languages like Java and Kotlin.

**Use me for**:
- **Creating an HTTP based interaction contract test**: Request-response interactions over HTTP, typically synchronous flows.
- **Creating a Message interaction contract test**: Message based interactions using Kafka, typically asynchronous flows.
- **Review existing contract tests**: Provide suggestions and verify existing Pact contract tests, see if they follow best practices.

# Pact Consumer Test examples

## Example: Pact HTTP (REST API) based interaction consumer test

This is an example of a Consumer Test for a REST API call using PactV4 and JUnit 5.

```java


```

## Example: Pact HTTP (GraphQL) based interaction consumer test

This is an example of a Consumer Test for a GraphQL call using PactV4 and JUnit 5.

```java


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
            .expectsToReceive("message description")
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
    @PactVerifyProvider("message description")
    public MessageAndMetadata verifyMessageInteraction() {
        // Construct the message that needs to be verified.
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

# References to resources:

* Pact JVM provider: https://docs.pact.io/implementation_guides/jvm/provider/junit5
* Pact consumer driven contract testing: https://www.codecentric.de/en/knowledge-hub/blog/consumer-driven-contract-testing-with-pact
* Pact consumer test for Kafka example: https://github.com/pactflow/example-consumer-java-kafka/blob/master/src/test/java/io/pactflow/example/kafka/ProductsPactTest.java
* Pact tests for Kafka: https://docs.pact.io/recipes/kafka
* Pact in event driven applications: https://www.codecentric.de/en/knowledge-hub/blog/message-pact-contract-testing-in-event-driven-applications

