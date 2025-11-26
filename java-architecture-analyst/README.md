<div align="center">

# Java Architecture Analyst Agent

[![Agent Type](https://img.shields.io/badge/🤖_Agent-Java_Architecture_Analyst-8b5cf6?style=for-the-badge&labelColor=4c1d95)](.)
[![Model](https://img.shields.io/badge/🧠_Model-Claude_Sonnet-3b82f6?style=for-the-badge&labelColor=1e40af)](.)

![Version](https://img.shields.io/badge/version-0.0.1-blue?style=flat-square)
![Layers](https://img.shields.io/badge/layers-18-informational?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)

</div>

---

## ✨ Overview
An expert-level Java architecture analysis agent that produces structured architecture reports for Java/Spring Boot applications.
It generates evidence-based documentation tailored to specific architectural layers.

## 🔨 Usage

### Basic Syntax
```
use java-architecture-analyst with variable layer-name=<layer-name>
```

### Examples

#### Security Review, Data Layer Analysis
```
use java-architecture-analyst with variable layer-name=security-architecture,data-architecture
```
### Default Behavior
If no `layer-name` is specified, defaults to `project-overview`.

---

## 📚 Available Layer Templates

The agent supports analysis across **18 architectural layers**. Each layer produces a specialized report focused on specific architectural concerns.

| Layer Name | Focus Area | Best For |
|------------|------------|----------|
| `project-overview` | High-level system architecture, tech stack | 🎯 Start here - holistic view |
| `application-architecture` | Application structure, component organization | 📦 Understanding code organization |
| `architectural-patterns` | Design patterns, architectural styles | 🏗️ Pattern identification & usage |
| `business-logic-architecture` | Domain model, business rules, services | 💼 Core business logic analysis |
| `data-architecture` | Data models, persistence, database design | 🗄️ Data flow & storage strategy |
| `security-architecture` | Authentication, authorization, security controls | 🔒 Security posture assessment |
| `performance-scalability` | Performance characteristics, scaling patterns | ⚡ Performance optimization |
| `testing` | Test strategy, coverage, quality assurance | ✅ Testing maturity assessment |
| `deployment-operations` | Deployment, monitoring, observability | 🚀 DevOps & operations review |
| `configuration-management` | Configuration strategy, profiles, environments | ⚙️ Config management practices |
| `cross-cutting-concerns` | Logging, error handling, transactions, AOP | 🔄 Cross-cutting implementations |
| `requests-flow` | Request processing, API interactions | 🔀 Request/response patterns |
| `technology-stack` | Technology choices, dependencies, versions | 🛠️ Tech stack deep dive |
| `key-design-decisions` | ADRs, critical design choices | 📋 Decision documentation |
| `cost-resource-optimization` | Resource utilization, cost considerations | 💰 Efficiency & cost analysis |
| `recommendations` | Improvement suggestions, refactoring opportunities | 💡 Actionable improvements |
| `conclusions` | Summary findings, risk assessment, health | 📊 Overall assessment |
| `appendices` | Supporting information, references | 📚 Additional documentation |

---

## 🎯 Agent Capabilities

### 🎓 Expertise Areas

| Domain | Specializations |
|--------|----------------|
| **Enterprise Architecture** | Patterns, principles, SOLID, clean architecture |
| **Spring Ecosystem** | Spring Boot, Spring Framework, Spring Data, Spring Security, Spring Cloud |
| **Cloud-Native** | 12-factor apps, microservices, containerization, Kubernetes |
| **Distributed Systems** | Service decomposition, resilience patterns, event-driven architectures, messaging |
| **Domain-Driven Design** | DDD patterns, bounded contexts, aggregates, domain events |
| **Performance** | Optimization strategies, caching, async processing, load testing |
| **Security** | Security architecture, OWASP, compliance frameworks, threat modeling |
| **DevOps** | CI/CD pipelines, IaC, deployment strategies, GitOps |

### ✨ Analysis Features

| Feature | Description |
|---------|-------------|
| **Evidence-Based** | References actual code, configuration files, and dependencies |
| **Template-Driven** | Follows consistent structure across all reports |
| **Technical Depth** | Tailored for senior engineers with appropriate detail level |
| **Visual Diagrams** | Includes architectural diagrams (ASCII art, Mermaid) |
| **Best Practices** | Aligned with industry standards and quality guidelines |
| **Actionable** | Provides concrete, prioritized recommendations |

---

## 📄 Output

### Report Structure
Each generated report follows a predefined template specific to the layer being analyzed, ensuring:

| Quality Attribute | Description |
|-------------------|-------------|
| **Consistency** | Uniform structure across different analyses |
| **Completeness** | Full coverage of the architectural concern |
| **Depth** | Appropriate level of detail for senior engineers |
| **Actionability** | Concrete, implementable recommendations |

### Report Location
```
docs/architecture-reports/<layer-name>-YYYY-MM-DD.md
```

**Example outputs:**
- `docs/architecture-reports/project-overview-2025-11-26.md`
- `docs/architecture-reports/security-architecture-2025-11-26.md`

### Report Format

| Component | Details |
|-----------|---------|
| **Format** | Markdown (`.md`) for version control compatibility |
| **Structure** | Hierarchical sections based on layer template |
| **Code Examples** | Configuration snippets, code samples with syntax highlighting |
| **Diagrams** | ASCII art or Mermaid syntax for visual representation |
| **References** | Source file paths and line numbers for traceability |

---

## ✅ Quality Standards

The agent applies quality standards from the **active-developer** pattern:

| Standard | Implementation |
|----------|----------------|
| **Accuracy** | Precise technical details with source verification |
| **Evidence-Based** | All conclusions backed by code/config references |
| **Clarity** | Professional technical writing for senior engineers |
| **Actionability** | Prioritized recommendations by impact and effort |
| **Risk Assessment** | Identified risks with mitigation strategies |

---

## 🔗 Integration

### IDE Integration
The agent integrates seamlessly with Claude in IDEs through the Claude plugin:
- ✅ Visual Studio Code
- ✅ JetBrains IDEs (IntelliJ IDEA, WebStorm, etc.)

### Version Control Benefits

| Benefit | Description |
|---------|-------------|
| 📝 **Living Documentation** | Evolves with the codebase, stays current |
| 📜 **Historical Record** | Tracks architectural decisions over time |
| 🎓 **Onboarding Material** | Accelerates new team member ramp-up |
| 🔍 **Review Reference** | Supports architectural reviews and audits |
| 🤝 **Team Alignment** | Creates shared understanding of architecture |

---

## 💡 Tips for Effective Use

| # | Tip | Rationale |
|---|-----|-----------|
| 1️⃣ | **Start with project-overview** | Get a holistic understanding before diving deep |
| 2️⃣ | **Deep dive into specific layers** | Focus on areas relevant to your current work |
| 3️⃣ | **Regenerate after major changes** | Keep documentation current and accurate |
| 4️⃣ | **Combine multiple layer reports** | Build comprehensive architectural documentation |
| 5️⃣ | **Use recommendations layer** | Identify improvement opportunities systematically |
| 6️⃣ | **Review conclusions layer** | Assess overall architectural health regularly |
| 7️⃣ | **Version control the reports** | Track architectural evolution over time |
| 8️⃣ | **Share with the team** | Create shared understanding and alignment |

---

## 🎬 Example Workflows

### 📋 Scenario 1: Complete Architecture Assessment
```bash
# 1. Generate project overview
# 2. Analyze application structure
# 3. Review architectural patterns
# 4. Get recommendations
# 5. Review overall conclusions
use java-architecture-analyst with variable layer-name=project-overview,application-architecture,architectural-patterns,recommendations,conclusions
```

### 🔒 Scenario 2: Security Audit
```bash
# 1. Security architecture review
# 2. Check cross-cutting concerns (error handling, logging)
# 3. Review configuration management
# 4. Get security recommendations
use java-architecture-analyst with variable layer-name=security-architecture,cross-cutting-concerns,configuration-management,recommendations
```

### 🏗️ Scenario 3: Refactoring Planning
```bash
# 1. Review current patterns
# 2. Analyze business logic structure
# 3. Review key design decisions
# 4. Get refactoring recommendations
use java-architecture-analyst with variable layer-name=architectural-patterns,business-logic-architecture,key-design-decisions,recommendations
```

---

## 📋 Requirements

| Category | Details |
|----------|---------|
| **Project Type** | Java Spring Boot application with standard Maven/Gradle structure |
| **Access** | Source code, configuration files, and build files |

---

## 📚 Additional Resources

- **Agent Definition**: `.claude/agents/java-architecture-analyst.md`
- **Layer Templates**: `.claude/agents/templates/layers/`
- **Output Formats**: `.claude/agents/templates/output-formats/`
- **Quality Patterns**: `.claude/agents/templates/patterns/`

---

<div align="center">

**Last Updated:** November 26, 2025 | **Agent Version:** 1.0 | **Minimum Claude Version:** Sonnet

Made with ❤️ for Java & Spring Boot architects

</div>

