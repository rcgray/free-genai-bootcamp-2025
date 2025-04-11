# Japanese Language Learning Visual Novel

![Japanese Language Learning Visual Novel Screenshot](dev/screenshot.png)

## Overview

Experience a virtual day in Tokyo through this immersive Japanese learning experience. As an American visiting Japan for the first time, you're guided by your old friend Kaori, a native Japanese woman who shows you around the vibrant city of Tokyo. Together, you'll navigate train stations, order food at restaurants, explore parks, shop at malls, and interact with locals - all while learning conversational Japanese in context.

What makes this visual novel special is the ability to explore Japanese phrases and cultural insights at your own pace. When you encounter interesting dialogue, simply click to study the phrase and our LLM-powered system will dynamically generate detailed explanations, grammar breakdowns, alternative expressions, and cultural context - providing a personalized language learning experience that adapts to your interests.

With multiple difficulty levels from beginner to advanced, this game creates an engaging environment where language acquisition happens naturally through meaningful interactions rather than rote memorization.

## AI-Generated Development

This project represents the author's personal achievement in AI-assisted development: **every aspect of the game - including all code, artwork, UI, game design, story, and dialogue - was created entirely by AI without direct human programming or asset creation**.  Tools included Cursor, Claude-Sonnet-3.6/7, Stable Diffusion, ChatGPT, and others.

The game is built using:
- **Phaser 3** game framework for creating the interactive visual novel
- **TypeScript** for type-safe code
- **Vite** for fast development and optimized builds

## Docker Setup

This project can be run using Docker containers for both the game and the LLM proxy server.

### Quick Start with Docker

1. From the repository root, start both Visual Novel containers:
   ```bash
   docker compose up -d visual_novel_game visual_novel_server
   ```

2. Access the game at:
   - Game: http://localhost:8080
   - LLM Proxy Server: http://localhost:3011

3. To configure the LLM integration, set the following environment variables before running:
   ```bash
   LLM_API_KEY=your_api_key_here \
   LLM_API_BASE_URL=https://api.openai.com/v1 \
   LLM_MODEL=o3-mini \
   docker compose up -d visual_novel_game visual_novel_server
   ```

For more details on Docker configuration, see the [Docker README](../docker/README.md).

## Technical Implementation

To run the game with full functionality:
1. The main game can be launched via the Vite development server
2. The LLM proxy server must be running to enable the language learning features

The LLM integration is highly flexible, supporting:
- **Local LLMs** through Ollama, LM Studio, or similar providers
- **Cloud LLM providers** including OpenAI (GPT models), Anthropic (Claude models), and others
- Simple configuration through `.env` files, allowing easy switching between providers

## Features

- Interactive visual novel gameplay with dynamic interactions
- Japanese language learning integrated into the gameplay
- Dynamic dialog generation using LLM through a secure proxy server
- Vocabulary tracking and learning progress
- Multiple difficulty levels for language learners
- Hot module replacement for smooth development experience

## Project Structure

```
.
├── phaser_game/            # Phaser game (TypeScript)
│   ├── assets/             # Game assets
│   │   ├── images/         # Image files
│   │   ├── audio/          # Audio files
│   │   └── fonts/          # Font files
│   ├── src/                # Game source code
│   │   ├── scenes/         # Game scenes
│   │   └── utils/          # Utility functions
│   ├── index.html          # Game HTML template
│   ├── package.json        # npm dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── vite.config.ts      # Vite build configuration
├── server/                 # LLM proxy server (Node.js/Express)
│   ├── server.js           # Proxy server implementation
│   ├── package.json        # npm dependencies for the proxy
│   ├── .env.example        # Example environment variables for the proxy
│   └── README.md           # Proxy server documentation
├── data/                   # Game data
├── docs/                   # Documentation
├── scripts/                # Build and development scripts
├── tests/                  # Test files
├── .env.example            # Example environment variables
├── pyproject.toml          # Python dependencies and tool configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/japanese-visual-novel.git
   cd japanese-visual-novel
   ```

2. Install Node.js dependencies for the Phaser game:
   ```bash
   cd phaser_game
   npm install
   cd ..
   ```

3. Install Node.js dependencies for the LLM proxy server:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. Create `.env` files from the examples:
   ```bash
   # For the LLM proxy server (IMPORTANT!)
   cp server/.env.example server/.env
   ```
   
5. Edit the `.env` files:
   - Edit `server/.env` to add your OpenAI API key (or other LLM provider information) for the proxy server

### Building the Game

To build the Phaser game for production:

```bash
npm --prefix phaser_game run build
```

### Running the Application

To run the complete application (proxy server and Phaser game):

```bash
./scripts/start-dev-with-proxy.sh
```

## Development Workflow

This project uses several development workflows to provide the best experience when working on all components.

### Option 1: All-in-One Development Environment (Recommended)

Run the all-in-one development script with proxy server:

```bash
./scripts/start-dev-with-proxy.sh
```

This will:
1. Start the LLM proxy server for secure API key handling
2. Launch the Phaser development server with hot module replacement

### Option 2: Without LLM Features

If you don't need the LLM features during development:

```bash
npm --prefix phaser_game run dev
```

This will start only the Phaser game without the proxy server.

### Option 3: Manual Development Environment

For more control, run the scripts in separate terminals:

Terminal 1 (LLM Proxy Server):
```bash
cd server && npm run dev
```

This starts the proxy server on port 3000 (by default). You can test it with:

```bash
curl http://localhost:3000/api/health
```

Terminal 2 (Phaser):
```bash
cd phaser_game && npm run dev
```

This starts the Vite server for the Phaser game with hot-reloading on port 5173 (by default). You can test it by visiting `http://localhost:5173` in a browser.

### How the Development Workflow Works

- The LLM proxy server securely handles API requests without exposing keys in client code
- The Phaser game runs a Vite development server with hot module replacement (HMR)
- Changes to Phaser game files are instantly reflected without manual refresh

### Stopping the Development Environment

To stop all the development servers:

```bash
./scripts/cleanup-dev.sh
```

Or close the terminal windows where they're running.

## Utility Scripts

The project includes several utility scripts to help with development, building, and maintenance:

### Development Scripts

- `./scripts/start-dev-with-proxy.sh` - One-click script to start the proxy server and Phaser
- `./scripts/watch-phaser.sh` - Starts the Phaser development server with hot module replacement
- `./scripts/cleanup-dev.sh` - Stops all development servers

### Build Scripts

- `./scripts/build_game.py` - Python script to build the Phaser game for production

### Maintenance Scripts

- `./scripts/update_docs.py` - Updates project documentation files like Project-File-Structure.md

## Development Tools

### TypeScript/Phaser Tools

- Build the game:
  ```bash
  npm --prefix phaser_game run build
  ```

- Run the development server:
  ```bash
  npm --prefix phaser_game run dev
  ```

- Preview the built game:
  ```bash
  npm --prefix phaser_game run preview
  ```

### Node.js/Express Tools

- Run the LLM proxy server:
  ```bash
  npm --prefix server start
  ```

- Run the proxy in development mode:
  ```bash
  npm --prefix server run dev
  ```

## Troubleshooting

### LLM Proxy Server Issues

If the application cannot connect to the LLM API:

1. Verify the proxy server is running (`npm --prefix server run dev`)
2. Check that you've created a `server/.env` file with your API key
3. Look for error messages in the proxy server console
4. Try hitting the health check endpoint: http://localhost:3000/api/health
5. If needed, restart the proxy server and the application

### Hot Module Replacement (HMR) Issues

If changes to Phaser game files aren't automatically reflected:

1. Check the browser console for error messages
2. Try running `./scripts/cleanup-dev.sh` to kill any lingering processes
3. Restart the development servers
4. Try opening the Phaser dev server directly at http://localhost:5173

### Asset Loading Issues

If game assets aren't loading correctly:

1. Ensure the assets are in the `phaser_game/assets` directory
2. Check the browser console for 404 errors
3. Verify the file paths in your game code
4. Rebuild the game with `npm --prefix phaser_game run build`

## LLM Proxy Server

The project includes a secure LLM proxy server that handles communication with LLM providers, protecting API keys and sensitive data.

### Key Features

- **Provider-agnostic design**: Works with OpenAI, Anthropic, Ollama, LM Studio, and other providers
- **Intelligent response handling**: Automatically extracts valid JSON from responses based on your request format
- **Secure**: API keys are stored server-side only, never exposed to clients
- **Configurable**: Easily switch between different LLM providers by changing environment variables

### Running the Proxy Server

```bash
# From project root
cd server
npm install
cp .env.example .env  # Then edit .env with your API keys and settings
npm run dev
```

### Configuration

Configure the proxy server by editing the `.env` file in the `server` directory:

```
# Example for OpenAI
LLM_API_KEY=sk-your-api-key
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4
LLM_ENDPOINT_PATH=chat/completions

# For local models (LM Studio, Ollama, etc.)
LLM_API_KEY=not-needed
LLM_API_BASE_URL=http://localhost:1234/v1
LLM_MODEL=mistral-7b
LLM_ENDPOINT_PATH=chat/completions
```

See `server/README.md` for more detailed configuration options and examples.

