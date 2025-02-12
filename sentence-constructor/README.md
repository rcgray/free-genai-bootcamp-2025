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

## Testing Results

Detailed testing results are included in each prompt file's header, including:
- Model performance ratings (✅, 🟨, ❌)
- Processing times where available
- Specific response characteristics
- Known limitations or issues

## Future Development

- Additional prompt formats for other model architectures
- Expanded language support
- Enhanced error handling
- More comprehensive example sets
- Performance optimization tweaks

## Integration

This tool is designed to integrate with the Language Learning Portal (`/lang-portal`). See the main project documentation for integration details.
