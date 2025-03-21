# Free GenAI Bootcamp 2025: Vibe Coding Portfolio

This monorepo showcases a comprehensive collection of Japanese language learning applications developed during the [Free GenAI Bootcamp](https://genai.cloudprojectbootcamp.com/), organized by [Andrew Brown](https://x.com/andrewbrown) and featured on [ExamPro](https://www.exampro.co/).

## Project Overview

Over five weeks, I created a suite of interconnected applications designed to help English speakers learn Japanese, each leveraging different aspects of generative AI:

1. A **language learning portal** with vocabulary management and learning activities
2. A **podcast transcription and translation app** for listening practice
3. A **Kanji learning game** built with Phaser and integrated with the portal
4. A **containerized text generation service** using local LLMs
5. An **interactive visual novel** with AI-powered language learning features

## Key Innovations

- **100% AI-generated development**: All code, artwork, designs, specs, and documentation were created by generative AI. I wrote only the prompts and starter documentation.
- **Prompt engineering showcase**: This portfolio demonstrates my evolving prompt engineering techniques and practical application of AI-assisted development.
- **Full-stack development**: Projects cover frontend, backend, game development, containerization, and more.
- **Vibe coding explorer**: This work exemplifies the growing practice of ["vibe coding"](https://x.com/karpathy/status/1886192184808149383) - a term that emerged in the public consciousness just within the timespan of this workshop - where developers guide AI to generate complete applications with very little (or no) direct intervention.

The primary development environment was Cursor with Claude Sonnet 3.6/7, complemented by tools like Windsurf, Cline, Aider, ChatGPT, Perplexity, DeepSeek, and Stable Diffusion.

**Interested in AI-assisted development? Connect with me on Twitter/X:** [@AcademicGamer](https://x.com/AcademicGamer)

## Repository Structure

```
free-genai-bootcamp-2025/
├── README.md                          # This file
├── genai-architecting/README.md       # Pre-week: GenAI Architecture Diagram
├── sentence-constructor/README.md     # Pre-week: Prompt Engineering Experiments
├── lang-portal/README.md              # Week 1: Language Learning Portal
│   ├── frontend-react/README.md       # Week 1: Frontend for Lang Portal
│   └── games/kanji-snake/README.md    # Week 2: Kanji Learning Game
├── listening-comp/README.md           # Week 2: Podcast Transcription/Translation App
├── opea-comps/README.md               # Week 3: Containerized Text Generation Service
│   └── backend/README.md              # Week 3: Backend for Text Generation Service
└── visual-novel/README.md             # Weeks 4 & 5: Visual Novel
    └── server/README.md               # Weeks 4 & 5: LLM Proxy Server for Visual Novel
```

## Project Timeline and Deliverables

### Pre-week: GenAI Architecture and Prompt Engineering (02/01-02/07)

The bootcamp began with an introduction to generative AI applications, covering architecture diagrams, core concepts (RAG, caching, guardrails), and the current industry landscape.

I created a comprehensive architecture diagram for the Japanese language learning applications and conducted extensive prompt engineering experiments. I tested Markdown, YAML, and XML prompt formats across multiple commercial and open-source models to determine optimal approaches for Japanese language tasks.

![Generative AI Architecture Diagram](genai-architecting/genai-architecture.png)

#### Key Deliverables
- [Architecture Diagram & Documentation](genai-architecting/README.md)
- [Prompt Engineering Experiments](sentence-constructor/README.md)

#### Technical Exploration
- Evaluated local LLMs against SaaS models for Japanese language tasks
- Designed prompts addressing Japanese language complexities (formality levels, writing systems)
- Tested multiple prompt formats across various LLM providers
- Documented architectural components for different deployment scenarios

#### Key Findings
- Simplified "Default/Beginner" approach works better than mapping to JLPT levels
- Markdown format performed best across most models
- Some local models matched or exceeded commercial models on specific tasks
- Identified promising Japanese-specific models for potential local deployment

### Week 1: Language Learning Portal (02/08-02/14)

I built a complete language learning portal featuring a FastAPI backend and React frontend. Instead of implementing the provided sample code, I chose to build everything from scratch as an additional challenge.

![Japanese Language Learning Portal Screenshot](lang-portal/dev/screenshot.png)

#### Key Deliverables
- [Language Portal Backend & Documentation](lang-portal/README.md)
- [React Frontend & Documentation](lang-portal/frontend-react/README.md)

#### Technical Achievements
- Built a full-stack application using unfamiliar technologies (FastAPI, Alembic)
- Implemented database migration and seeding systems
- Created automated tests with 86% code coverage
- Developed a responsive React frontend with TailwindCSS
- Used AI-driven development exclusively via Cursor

### Week 2: Multi-Modal Applications (02/15-02/21)

This week focused on audio and image generation. I created a Streamlit application for processing Japanese audio content and extended the Language Portal with a game framework.

![Japanese Podcast App Screenshot](listening-comp/dev/screenshot.png)
![Kanji Snake Game Screenshot](lang-portal/games/kanji-snake/dev/screenshot.png)

#### Key Deliverables
- [Japanese Listening App](listening-comp/README.md)
- [Kanji Snake Game](lang-portal/games/kanji-snake/README.md)

#### Technical Achievements
- Built an audio processing pipeline with OpenAI's transcription and translation APIs
- Created an interactive study interface for synchronized audio and text
- Developed a reusable game template for the Language Portal
- Implemented Kanji Snake game using Phaser
- Generated custom game art with Stable Diffusion

### Week 3: Containerization and Enterprise AI Deployment (02/22-02/28)

Week 3 focused on professional enterprise-level deployment of AI applications. The challenge was to move beyond simple home-grown solutions (like basic npm or pip requirements) to create production-ready, scalable AI infrastructure. I built a containerized text generation service using Docker, Intel's OPEA platform, and llama.cpp—demonstrating how organizations can securely deploy and manage LLM infrastructure at scale.

The resulting architecture provides a ChatGPT-like experience using entirely local computation, supporting models like Llama 3.1/3.2 and Phi-4 without reliance on external APIs. This approach addresses key enterprise concerns including data privacy, operational costs, and vendor independence.

![OPEA Chat Screenshot](opea-comps/dev/screenshot.png)

#### Key Deliverables
- [Containerized Chat Application](opea-comps/README.md)
- [Backend LLM Service](opea-comps/backend/README.md)

#### Technical Achievements
- Implemented a production-grade containerized LLM stack with Docker and Intel OPEA
- Created a vendor-agnostic architecture supporting any GGUF model for the deployment's TGI service.
- Designed a flexible system that works independently of third-party services at runtime (e.g., HuggingFace)
- Built a responsive Streamlit chat interface


### Weeks 4 & 5: Capstone Project - Visual Novel (03/01-03/07)

For the capstone project, I developed an immersive Japanese language learning experience in the form of an interactive visual novel. The application follows a narrative where the player visits a friend living in Japan, encountering realistic language scenarios across multiple locations (train stations, restaurants, shops, and more).

What sets this project apart is its dynamic language exploration system. Every piece of text in the game can be examined by the player to receive contextual explanations, translations, and cultural notes—powered by an LLM proxy server that connects to either commercial API services or any local GGUF model. The system adapts to the player's needs, offering multiple difficulty levels from beginner to advanced.

The entire project—from code to artwork, UI design, game narrative, dialogue scripts, and teaching materials—was created by generative AI via prompt engineering.

![Japanese Language Learning Visual Novel Screenshot](visual-novel/dev/screenshot.png)

#### Key Deliverables
- [Visual Novel Game](visual-novel/README.md)
- [LLM Proxy Server](visual-novel/server/README.md)

#### Technical Achievements
- Developed a complete visual novel with Phaser and TypeScript
- Implemented a flexible character system with multiple emotion states
- Created a sophisticated dialog system supporting Japanese text conventions
- Built a provider-agnostic LLM proxy supporting multiple AI services
- Designed an intelligent study system for contextual language learning
- Implemented hot module replacement for seamless development
- Structured a complete narrative across multiple locations

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite, Phaser 3
- **Backend**: FastAPI, Alembic, Node.js, Express
- **Databases**: SQLite, TinyDB
- **AI Integration**: OpenAI API, local LLMs via llama.cpp
- **Containerization**: Docker, OPEA
- **Data Visualization**: Streamlit
- **Development**: Cursor, WSL, Stable Diffusion, various AI assistants

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)