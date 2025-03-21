# Sentence Constructor

An AI-powered tool that helps students construct grammatically correct sentences in their target language. This tool is part of the Free GenAI Bootcamp 2025 language learning ecosystem.

## Overview

The Sentence Constructor provides:
- Interactive sentence building exercises
- Progressive difficulty levels

## Prompt Engineering

This directory contains carefully crafted prompts designed for different Large Language Models (LLMs) to provide consistent, high-quality Japanese translations and explanations. Each prompt is optimized for specific model architectures and response patterns.

### Available Prompts

1. **Markdown Format** (`prompt-markdown.md`)
   - Best for: Older and pre-transformer models (e.g., BERT, GPT-2)
   - Tested on: Claude 3.5, ChatGPT-4, DeepSeek, Microsoft Phi-4, etc.
   - Notable performance: Perfect results with Mistral Small 24B Instruct

2. **XML Format** (`prompt-xml.md`)
   - Best for: Llama 2, GPT-4, and Claude 3
   - Tested on: Various models including DeepSeek R1 and its variants
   - Structured for models that prefer explicit hierarchical formatting

3. **YAML Format** (`prompt-yaml.md`)
   - Best for: GPT-3.5, Mistral 7B and 8x7B, and Gemini 1.5 Flash
   - Tested on: Multiple models with varying success
   - Optimal performance with DeepSeek R1 Distill Llama 8B

### Prompt Features

Each prompt includes:
- Role and expertise definitions
- Input/output specifications
- Style guidelines for different politeness levels
- Version guidelines for standard/beginner outputs
- Comprehensive examples with explanations
- Quality checks and error handling

## Usage

Each prompt file contains:
1. Model compatibility information
2. Development and testing notes
3. Performance criteria
4. The actual prompt in its respective format
5. Example inputs and outputs

Choose the appropriate prompt based on:
- The LLM you're using
- Your specific use case requirements
- Performance characteristics needed

## Test Findings

Our comprehensive testing across 9 LLMs revealed significant variations in how different models handle different prompt formats:

### Cross-Format Performance Summary

| Model | Markdown | YAML | XML | Notes |
|-------|----------|------|-----|-------|
| Claude Sonnet 3.5 | ✅ | 🟨 | 🟨 | Performs best with plaintext, adds boilerplate "friendly" wrapping to structured formats |
| ChatGPT-4o | ✅ | 🟨→✅ | ❌ | Strong with Markdown, needed 2 attempts with YAML, rejected XML format |
| DeepSeek V3 | ✅ | ✅ | ✅ | Consistent performer across all formats, includes concluding thoughts |
| Microsoft Phi-4 14B | ✅ | 🟨 | 🟨 | Strong with Markdown, struggles with structured formats |
| Qwen2.5 14B Instruct | ✅ | 🟨 | 🟨 | Similar to Phi-4, handles Markdown well but mixes in grammar analysis with structured formats |
| Mistral Small 24B | ✨ | ✅ | 🟨→✅ | Perfect with Markdown, solid with YAML, initially parsed XML as text before giving perfect answer |
| DeepSeek R1 | ✅ | 🟨 | ✅ | Good performer but high latency (~50s), connection issues in testing |
| DeepSeek R1 Distill Llama 8B | 🟨 | ✨ | 🟨 | Faster than base R1 (~7s), perfect with YAML format |
| DeepSeek R1 Distill Qwen2.5 1.5B | ❌ | ❌ | ❌ | Attempted but produced garbled/incomplete responses across all formats |

### Key Findings

1. **Format-Model Matching Matters**: Specific prompt formats significantly impact performance across different models:
   - **Markdown** format is the most universally accepted, with every model (except the smallest) handling it well
   - **YAML** proved exceptional for DeepSeek R1 Distill Llama 8B, but was challenging for others
   - **XML** received mixed results but worked well with DeepSeek models

2. **Model Size vs. Performance**: 
   - Larger models (>13B parameters) performed consistently better across formats
   - Mid-sized models (7-13B) showed good results with their preferred formats
   - The smallest tested model (1.5B) failed across all formats

3. **Response Patterns**:
   - Most models added varying amounts of "boilerplate" to outputs
   - Some models provided contextual conclusions or friendly wrappers
   - Models often diverged in how they structured kanji analysis

4. **Processing Speed**:
   - Base DeepSeek R1 had the highest latency (~50s)
   - Distilled models showed dramatically improved speed (~7s) with minimal quality loss
   - The smallest model was fastest (~2-3s) but with unacceptable quality

5. **Standout Performances**:
   - Mistral Small 24B achieved perfect results with Markdown format
   - DeepSeek R1 Distill Llama 8B achieved perfect results with YAML format
   - DeepSeek V3 was the most consistent performer across all formats

These findings highlight the importance of matching prompt format to the specific LLM architecture for optimal results. For our application, this testing allows us to implement format switching based on the detected LLM provider.

## Future Development

- Additional prompt formats for other model architectures
- Expanded language support
- Enhanced error handling
- More comprehensive example sets
- Performance optimization tweaks
- Adaptive format selection based on detected model

## Integration

This tool is designed to integrate with the Language Learning Portal (`/lang-portal`). See the main project documentation for integration details.
