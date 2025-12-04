---
name: pact-contract-test
description: Pact contract test expert that helps creating Pact tests for HTTP (REST and GraphQL) and Message (asynchronous) based interactions in Java or Kotlin applications.
allowed-tools: Read, WebFetch, WebSearch
---

# Pact Contract Test Skill

## Instructions

Before continuing, first ask for the following input:
1. What is the interaction type: HTTP or Message based interaction?
2. Is this a Consumer test or Provider verification test?
3. Provide an example interaction: request/response for HTTP or a message for Message (asynchronous) interactions.

> **Kotlin:** Examples use Java syntax. Kotlin is nearly identical—use `fun` for methods, `val`/`var` for variables, and `::class.java` for class references.

## Decision Flow

```
1. HTTP vs Message?
   ├─ HTTP: REST APIs, GraphQL, synchronous request-response
   └─ Message: Kafka, RabbitMQ, async events, pub/sub

2. Consumer vs Provider?
   ├─ Consumer: Your app CALLS another service (you define expectations)
   └─ Provider: Your app IS CALLED by others (you verify expectations)

3. Framework?
   ├─ Spring Boot 3.x → use spring6 artifact
   ├─ Spring Boot 2.x → use junit5spring artifact
   └─ Plain JUnit 5 → use core artifacts only
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Consumer** | Application that uses functionality from another component (e.g., makes HTTP requests) |
| **Provider** | Application that offers functionality to others (e.g., exposes an HTTP API) |
| **Interaction** | Defines what is consumed and how: request, provider state, and expected response |
| **Provider state** | Test fixture describing the provider's state during an interaction |
| **Contract (Pact file)** | Contains all interactions between a specific consumer and provider |
| **Verification** | Replays interactions against provider code and compares actual vs expected responses |

An application can be both consumer and provider depending on the interaction.

## Maven Dependencies

Always add the `${pact.version}` to the maven properties section, this is the variable for the pact version (e.g. 4.6.17).

```xml
<properties>
    <pact.version>4.6.17</pact.version>
</properties>
```

### Consumer Test (Required)

Always use the `${pact.version}` variable, do not inline the version!

```xml
<dependency>
    <groupId>au.com.dius.pact.consumer</groupId>
    <artifactId>junit5</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
```

### Provider Verification (Add based on framework)

```xml
<!-- Spring Boot 3.x (Spring 6) -->
<dependency>
    <groupId>au.com.dius.pact.provider</groupId>
    <artifactId>spring6</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>

<!-- Spring Boot 2.x -->
<dependency>
    <groupId>au.com.dius.pact.provider</groupId>
    <artifactId>junit5spring</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>

<!-- Plain JUnit 5 (no Spring) -->
<dependency>
    <groupId>au.com.dius.pact</groupId>
    <artifactId>provider</artifactId>
    <version>${pact.version}</version>
    <scope>test</scope>
</dependency>
```

## Quick Start Template (HTTP Consumer)

Minimal copy-paste ready template:

```java
import au.com.dius.pact.consumer.MockServer;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactConsumerTest;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.PactSpecVersion;
import au.com.dius.pact.core.model.V4Pact;
import au.com.dius.pact.core.model.annotations.Pact;
import org.junit.jupiter.api.Test;
import java.util.Map;

@PactConsumerTest
@PactTestFor(providerName = "{{PROVIDER_NAME}}", pactVersion = PactSpecVersion.V4)
class {{CONSUMER_NAME}}ContractTest {

    @Pact(provider = "{{PROVIDER_NAME}}", consumer = "{{CONSUMER_NAME}}")
    public V4Pact createPact(PactDslWithProvider builder) {
        return builder
            .given("{{PROVIDER_STATE}}")
            .uponReceiving("{{INTERACTION_DESCRIPTION}}")
                .path("{{PATH}}")
                .method("GET")
                .headers(Map.of("Accept", "application/json"))
            .willRespondWith()
                .headers(Map.of("Content-Type", "application/json"))
                .status(200)
                .body(new PactDslJsonBody()
                    .stringType("field", "example"))
            .toPact(V4Pact.class);
    }

    @Test
    @PactTestFor(pactMethod = "createPact")
    void test(MockServer mockServer) {
        // Use mockServer.getUrl() + path to call the mock
    }
}
```

## Consumer Tests

### JUnit 5 Annotations

| Annotation | Purpose |
|------------|---------|
| `@PactConsumerTest` | Marks class as a Pact consumer test |
| `@Pact` | Defines a pact method that returns V4Pact |
| `@PactTestFor` | Links test to specific pact method, configures mock server |
| `@PactDirectory` | Override pact file output location |
| `@MockServerConfig` | Configure mock server host/port/protocol |

### HTTP (REST API) Consumer Test

```java
import au.com.dius.pact.consumer.MockServer;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.dsl.PactDslWithProvider;
import au.com.dius.pact.consumer.junit5.PactConsumerTest;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.core.model.PactSpecVersion;
import au.com.dius.pact.core.model.V4Pact;
import au.com.dius.pact.core.model.annotations.Pact;
import org.junit.jupiter.api.Test;

import java.util.Map;

@PactConsumerTest
@PactTestFor(providerName = "{{PROVIDER_NAME}}", pactVersion = PactSpecVersion.V4)
class HttpConsumerContractTest {

    @Pact(provider = "{{PROVIDER_NAME}}", consumer = "{{CONSUMER_NAME}}")
    public V4Pact createPact(PactDslWithProvider builder) {
        return builder
            .given("{{PROVIDER_STATE}}")
            .uponReceiving("{{INTERACTION_DESCRIPTION}}")
                .path("/api/users/123")
                .method("GET")
                .headers(Map.of("Accept", "application/json"))
            .willRespondWith()
                .headers(Map.of("Content-Type", "application/json"))
                .status(200)
                .body(new PactDslJsonBody()
                    .uuid("id")
                    .stringType("name", "John Doe")
                    .numberType("age", 30))
            .toPact(V4Pact.class);
    }

    @Test
    @PactTestFor(pactMethod = "createPact")
    void testGetUser(MockServer mockServer) {
        var response = httpClient.get(mockServer.getUrl() + "/api/users/123");
        assertThat(response.statusCode()).isEqualTo(200);
    }
}
```

### HTTP (GraphQL) Consumer Test

```java
@Pact(provider = "{{PROVIDER_NAME}}", consumer = "{{CONSUMER_NAME}}")
public V4Pact createGraphQLPact(PactDslWithProvider builder) {
    return builder
        .given("{{PROVIDER_STATE}}")
        .uponReceiving("GraphQL query for user")
            .path("/graphql")
            .method("POST")
            .headers(Map.of("Accept", "application/json", "Content-Type", "application/json"))
            .body(new PactDslJsonBody()
                .stringType("query", "query GetUser($id: ID!) { user(id: $id) { id name } }")
                .object("variables")
                    .stringType("id", "123")
                    .closeObject())
        .willRespondWith()
            .headers(Map.of("Content-Type", "application/json"))
            .status(200)
            .body(new PactDslJsonBody()
                .object("data")
                    .object("user")
                        .uuid("id")
                        .stringType("name", "John")
                    .closeObject()
                .closeObject())
        .toPact(V4Pact.class);
}
```

### Message Consumer Test

For message based interactions, the consumer is the party receiving a message.

```java
import au.com.dius.pact.consumer.MessagePactBuilder;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.junit5.PactConsumerTest;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.consumer.junit5.ProviderType;
import au.com.dius.pact.core.model.V4Pact;
import au.com.dius.pact.core.model.annotations.Pact;
import au.com.dius.pact.core.model.messaging.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@PactConsumerTest
@PactTestFor(providerName = "{{PROVIDER_NAME}}", providerType = ProviderType.ASYNCH)
public class MessageConsumerContractTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Pact(consumer = "{{CONSUMER_NAME}}", provider = "{{PROVIDER_NAME}}")
    public V4Pact messagePact(MessagePactBuilder builder) {
        return builder
            .hasPactWith("{{PROVIDER_NAME}}")
            .expectsToReceive("{{MESSAGE_DESCRIPTION}}")
            .withContent(new PactDslJsonBody()
                .uuid("id")
                .stringType("name", "example")
                .localDate("date", "dd-MM-yyyy", LocalDate.now()))
            .withMetadata(Map.of("kafka-topic", "{{TOPIC_NAME}}"))
            .toPact(V4Pact.class);
    }

    @Test
    @PactTestFor(pactMethod = "messagePact")
    void testOrderCreatedEvent(List<Message> messages) throws Exception {
        assertThat(messages).hasSize(1);
        var message = messages.get(0);
        var order = objectMapper.readValue(message.contentsAsString(), Order.class);
        assertThat(order.getName()).isNotBlank();
    }
}
```

### Multiple Interactions Per Pact

```java
@Pact(provider = "{{PROVIDER_NAME}}", consumer = "{{CONSUMER_NAME}}")
public V4Pact multipleInteractions(PactDslWithProvider builder) {
    return builder
        .given("users exist")
        .uponReceiving("get all users")
            .path("/users")
            .method("GET")
        .willRespondWith()
            .status(200)
            .body(/* response body */)

        .given("user 123 exists")
        .uponReceiving("get user by id")
            .path("/users/123")
            .method("GET")
        .willRespondWith()
            .status(200)
            .body(/* response body */)

        .toPact(V4Pact.class);
}
```

### Error Response Testing

```java
@Pact(provider = "{{PROVIDER_NAME}}", consumer = "{{CONSUMER_NAME}}")
public V4Pact notFoundPact(PactDslWithProvider builder) {
    return builder
        .given("user 999 does not exist")
        .uponReceiving("get non-existent user")
            .path("/users/999")
            .method("GET")
        .willRespondWith()
            .status(404)
            .body(new PactDslJsonBody()
                .stringType("error", "User not found")
                .stringType("code", "USER_NOT_FOUND"))
        .toPact(V4Pact.class);
}
```

### Matchers

#### Basic Matchers

```java
new PactDslJsonBody()
    // Type matchers
    .stringType("name", "example")
    .numberType("count", 5)
    .booleanType("active", true)

    // Format matchers
    .uuid("id")
    .ipAddress("ip")
    .timestamp("createdAt", "yyyy-MM-dd'T'HH:mm:ss")
    .localDate("date", "dd-MM-yyyy", LocalDate.now())

    // Regex matchers
    .stringMatcher("email", "^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$", "test@example.com")
```

#### Array Matchers

```java
new PactDslJsonBody()
    .eachLike("items")              // Array with at least 1 element
        .stringType("name")
        .closeArray()
    .minArrayLike("tags", 1)        // Array with minimum 1 element
        .stringType("value")
        .closeArray()
    .maxArrayLike("results", 10)    // Array with maximum 10 elements
        .stringType("id")
        .closeArray()
    .minMaxArrayLike("data", 1, 5)  // Array with 1-5 elements
        .numberType("value")
        .closeArray()
```

#### Nested Objects

```java
new PactDslJsonBody()
    .object("address")
        .stringType("street")
        .stringType("city")
        .closeObject()
```

#### Query Parameters and Headers Matching

```java
.uponReceiving("search users")
    .path("/users")
    .method("GET")
    .matchQuery("name", ".*", "John")
    .matchQuery("limit", "\\d+", "10")
    .matchHeader("Accept", "application/.*json", "application/json")
    .matchHeader("X-Request-Id", "[a-f0-9-]+", "abc-123")
```

#### Lambda DSL (Alternative Syntax)

```java
import static au.com.dius.pact.consumer.dsl.LambdaDsl.newJsonBody;

newJsonBody(body -> {
    body.stringType("name", "example");
    body.numberType("age", 25);
    body.array("items", arr -> {
        arr.object(item -> {
            item.stringType("id");
            item.stringType("name");
        });
    });
}).build()
```

## Pact Stub Server

Run Pact contract files as a mock HTTP server for testing consumers against provider stubs during development.

### Quick Start (Docker)

```bash
docker run -d --name pact-stub \
  -p 8081:8080 \
  -v "$(pwd)/target/pacts:/pacts" \
  pactfoundation/pact-stub-server \
  -f /pacts/consumer-provider.json \
  -p 8080
```

### Essential CLI Options

| Option | Description |
|--------|-------------|
| `-f, --file <file>` | Pact file to load (repeatable) |
| `-d, --dir <dir>` | Directory of pact files to load |
| `-p, --port <port>` | Port to run on |
| `-w, --watch` | Watch for changes and reload |
| `-o, --cors` | Enable CORS headers |
| `-l, --loglevel <level>` | Log level: error, warn, info, debug, trace |

### Pact Broker Options

| Option | Description |
|--------|-------------|
| `-b, --broker-url <url>` | URL of the Pact Broker |
| `-t, --token <token>` | Bearer token for authentication |
| `--provider-name <name>` | Filter pacts by provider name |

### Docker Commands

```bash
docker logs pact-stub      # View logs
docker stop pact-stub      # Stop server
docker rm -f pact-stub     # Remove container
```

### Load from Pact Broker

```bash
docker run -d --name pact-stub \
  -p 8081:8080 \
  pactfoundation/pact-stub-server \
  -b https://your-broker.pactflow.io \
  -t your-api-token \
  --provider-name customer-service \
  -p 8080
```

### Docker Compose

```yaml
services:
  pact-stub:
    image: pactfoundation/pact-stub-server
    ports:
      - "8081:8080"
    volumes:
      - ./target/pacts:/pacts
    command: ["-d", "/pacts", "-p", "8080"]
```

### Testing the Stub

```bash
curl http://localhost:8081/customers/1234
```

## Provider Verification Tests

### JUnit 5 Annotations

| Annotation | Purpose |
|------------|---------|
| `@Provider` | Specifies the provider name |
| `@PactBroker` | Load pacts from Pact Broker |
| `@PactFolder` | Load pacts from local folder |
| `@State` | Provider state setup/teardown handler |
| `@TestTemplate` | JUnit 5 template for pact verification |
| `@PactVerifyProvider` | Links method to message interaction verification |
| `@IgnoreNoPactsToVerify` | Don't fail if no pacts found |
| `@VerificationReports` | Configure report formats (console, markdown, json) |

### HTTP Provider Test (Plain JUnit 5)

For plain JUnit 5 tests without Spring Boot, start your HTTP server manually:

```java
import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;

@Provider("{{PROVIDER_NAME}}")
@PactFolder("pacts")
class HttpProviderContractTest {

    private static final int PORT = 8080;

    @BeforeAll
    static void startServer() {
        // Start your application server on PORT
    }

    @AfterAll
    static void stopServer() {
        // Stop your application server
    }

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @BeforeEach
    void before(PactVerificationContext context) {
        context.setTarget(new HttpTestTarget("localhost", PORT));
    }

    @State("{{PROVIDER_STATE}}")
    void setupState() {
        // Set up test data for this state
    }
}
```

### HTTP Provider Test (Spring Boot)

```java
import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.spring.junit5.PactVerificationSpring6Provider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.State;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@Provider("{{PROVIDER_NAME}}")
@PactBroker  // or @PactFolder("pacts")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HttpProviderContractTest {

    @LocalServerPort
    private int port;

    @TestTemplate
    @ExtendWith(PactVerificationSpring6Provider.class)  // Use Spring6 for Spring Boot 3.x
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @BeforeEach
    void before(PactVerificationContext context) {
        context.setTarget(new HttpTestTarget("localhost", port));
    }

    @State("{{PROVIDER_STATE}}")
    void setupState() {
        // Set up test data for this state
    }
}
```

### Message Provider Test (Plain JUnit 5)

For message-based interactions, the provider is the party that **produces/publishes messages** (e.g., to Kafka, RabbitMQ). This test verifies that your message producer generates messages matching the consumer's expectations.

```java
import au.com.dius.pact.provider.MessageAndMetadata;
import au.com.dius.pact.provider.PactVerifyProvider;
import au.com.dius.pact.provider.junit5.MessageTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Map;

@Provider("{{PROVIDER_NAME}}")
@PactFolder("pacts")
class MessageProviderContractTest {

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @BeforeEach
    void before(PactVerificationContext context) {
        context.setTarget(new MessageTestTarget());
    }

    @PactVerifyProvider("{{MESSAGE_DESCRIPTION}}")
    MessageAndMetadata verifyMessageInteraction() {
        // Call your actual message producer/builder here
        var message = """
            {
              "id": "123",
              "name": "value"
            }
            """;
        Map<String, Object> metadata = Map.of("kafka-topic", "{{TOPIC_NAME}}");
        return new MessageAndMetadata(message.getBytes(), metadata);
    }
}
```

### Message Provider Test (Spring Boot)

Use this when your message producer depends on Spring beans:

```java
import au.com.dius.pact.provider.MessageAndMetadata;
import au.com.dius.pact.provider.PactVerifyProvider;
import au.com.dius.pact.provider.junit5.MessageTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import au.com.dius.pact.provider.spring.junit5.PactVerificationSpring6Provider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@Provider("{{PROVIDER_NAME}}")
@PactFolder("pacts")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MessageProviderContractTest {

    @Autowired
    private MessageProducer messageProducer;  // Your Spring bean

    @TestTemplate
    @ExtendWith(PactVerificationSpring6Provider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @BeforeEach
    void before(PactVerificationContext context) {
        context.setTarget(new MessageTestTarget());
    }

    @PactVerifyProvider("{{MESSAGE_DESCRIPTION}}")
    MessageAndMetadata verifyMessageInteraction() {
        // Use injected Spring bean to produce the message
        var message = messageProducer.createMessage();
        Map<String, Object> metadata = Map.of("kafka-topic", "{{TOPIC_NAME}}");
        return new MessageAndMetadata(message.getBytes(), metadata);
    }
}
```

### Provider State Handlers

Provider states link consumer expectations to test fixtures. The `.given()` string in the consumer must match the `@State` annotation exactly.

**Consumer side:**
```java
@Pact(consumer = "{{CONSUMER_NAME}}", provider = "{{PROVIDER_NAME}}")
public V4Pact createPact(PactDslWithProvider builder) {
    return builder
        .given("a user exists with id 123")  // Creates providerState in Pact
        .uponReceiving("get user by id")
        // ...
}
```

**Provider side:**
```java
@State("a user exists with id 123")
void userExists() {
    userRepository.save(new User(123, "Test User"));
}

@State(value = "a user exists with id 123", action = StateChangeAction.TEARDOWN)
void userExistsTeardown() {
    userRepository.deleteAll();
}
```

### Request Modifications for Verification

Adding authentication headers during provider verification:

```java
@TestTemplate
@ExtendWith(PactVerificationInvocationContextProvider.class)
void verifyPact(PactVerificationContext context, HttpRequest request) {
    request.addHeader("Authorization", "Bearer " + generateToken());
    context.verifyInteraction();
}
```

### Provider State Injection

Inject dynamic values from provider state into requests:

```java
.pathFromProviderState("/users/${userId}", "/users/123")
.headerFromProviderState("Authorization", "Bearer ${token}", "Bearer abc123")
.queryParameterFromProviderState("id", "${userId}", "123")
```

## Pact Broker Integration

### Loading Pacts from Broker

```java
@Provider("{{PROVIDER_NAME}}")
@PactBroker(
    url = "${PACT_BROKER_URL}",
    authentication = @PactBrokerAuth(token = "${PACT_BROKER_TOKEN}")
)
class ProviderContractTest {
    // ...
}
```

### Consumer Version Selectors

Select which pacts to verify from the broker:

```java
@PactBrokerConsumerVersionSelectors
static SelectorBuilder consumerVersionSelectors() {
    return new SelectorBuilder()
        .mainBranch()           // Latest from main branch
        .deployedTo("prod")     // Deployed to production
        .matchingBranch();      // Same branch name as provider
}
```

### Pending and WIP Pacts

Prevents new pacts from breaking provider builds:

```java
@PactBroker(
    enablePendingPacts = "true",
    providerTags = "main",
    includeWipPactsSince = "2024-01-01"
)
```

### Publishing Verification Results

System properties for publishing to the broker:

```
-Dpact.verifier.publishResults=true
-Dpact.provider.version=${project.version}
-Dpact.provider.branch=${git.branch}
-Dpact.provider.tag=main,prod
```

### Maven Plugin for Publishing

```xml
<plugin>
    <groupId>au.com.dius.pact.provider</groupId>
    <artifactId>maven</artifactId>
    <version>${pact.version}</version>
    <configuration>
        <pactBrokerUrl>${pact.broker.url}</pactBrokerUrl>
        <pactBrokerToken>${pact.broker.token}</pactBrokerToken>
    </configuration>
</plugin>
```

### Can-I-Deploy

Check deployment safety before deploying:

```bash
pact-broker can-i-deploy \
    --pacticipant {{CONSUMER_NAME}} \
    --version 1.0.0 \
    --to-environment production

# Maven integration
mvn pact:can-i-deploy \
    -Dpacticipant={{CONSUMER_NAME}} \
    -Dpact.version=1.0.0 \
    -Dto=production
```

## Exchanging Pact Files (Without Broker)

**Options:**
* **Commit to provider repository** - Create a PR with the changed interactions
* **Provider fetches Pact files** - Publish to build server artifacts, S3, etc.

### Sharing via JAR

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

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Using exact values instead of matchers | Brittle tests that break on any value change | Use `stringType()`, `numberType()` etc. |
| Forgetting `.toPact(V4Pact.class)` | Compilation error or wrong pact version | Always end builder chain with `.toPact(V4Pact.class)` |
| Mismatched provider state strings | Provider can't find state handler | Copy exact string from consumer `.given()` to provider `@State` |
| Missing `@PactConsumerTest` | Mock server not started | Add annotation to test class |
| Wrong `@ExtendWith` provider class | Spring context issues | Use `PactVerificationSpring6Provider` for Spring Boot 3.x |
| Not closing objects/arrays | Malformed JSON structure | Match every `.object()` with `.closeObject()`, `.eachLike()` with `.closeArray()` |

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "No pact files found" | Wrong `@PactFolder` path | Check `target/pacts` exists after running consumer tests |
| "No matching interaction found" | Request doesn't match pact definition | Verify path, method, headers match exactly |
| "Provider state not found" | Missing `@State` method | Add `@State("exact string")` method to provider test |
| "Connection refused" | Provider not running | Ensure `@BeforeAll` starts server, check port matches |
| Mock server returns 500 | Test method threw exception | Check test logic, ensure client uses `mockServer.getUrl()` |

## Quick Reference

**Consumer Test Setup:**
```
@PactConsumerTest + @PactTestFor + @Pact + @Test
```

**Provider HTTP Test Setup:**
```
@Provider + @PactFolder/@PactBroker + @TestTemplate + @ExtendWith + HttpTestTarget
```

**Provider Message Test Setup:**
```
@Provider + @PactFolder/@PactBroker + @TestTemplate + @ExtendWith + MessageTestTarget + @PactVerifyProvider
```

**Pact File Location:**
Consumer tests generate pact files to `target/pacts/` by default. Override with `@PactDirectory`.

**Common System Properties:**
```
-Dpact.verifier.publishResults=true      # Publish results to broker
-Dpact.provider.version=${version}       # Provider version for broker
-Dpact.rootDir=target/pacts              # Change pact output directory
```