# Integrating Phaser Games with Streamlit: A How-To Guide

## Introduction

This guide explains how to structure and integrate a Phaser game within a Streamlit application. Phaser is a popular HTML5 game framework, while Streamlit is a Python library for creating web applications. By combining these technologies, you can create interactive games that are easily accessible through a Streamlit interface.

## Project Structure

Here's a recommended project structure for a Streamlit app with an embedded Phaser game:

```
my-streamlit-phaser-app/
├── streamlit_app.py           # Main Streamlit application
├── requirements.txt           # Python dependencies
├── .python-version            # Python version file (if using pyenv)
├── phaser_game/
│   ├── index.html             # HTML entry point for the Phaser game
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite build configuration
│   ├── assets/                # Game assets (images, sounds, etc.)
│   │   ├── background.png
│   │   ├── sprite.png
│   │   └── ...
│   └── src/                   # Game source code
│       ├── index.ts           # Main entry point
│       ├── scenes/            # Game scenes
│       │   ├── MainScene.ts
│       │   └── ...
│       └── ...
```

## Step 1: Setting Up the Phaser Game

### 1.1 Initialize the Phaser Project

First, create and set up your Phaser game project:

```bash
mkdir -p my-streamlit-phaser-app/phaser_game
cd my-streamlit-phaser-app/phaser_game
npm init -y
npm install phaser vite @vitejs/plugin-react typescript
```

### 1.2 Configure TypeScript and Vite

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

Create a `vite.config.ts` file:

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',  // Use relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

### 1.3 Create the HTML Entry Point

Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phaser Game</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #333;
    }
    #game-container {
      width: 1200px;
      height: 800px;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <script type="module" src="/src/index.ts"></script>
</body>
</html>
```

### 1.4 Create the Game Source Files

Create the main entry point at `src/index.ts`:

```typescript
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#333333',
  scene: [MainScene],
  pixelArt: true,
};

new Phaser.Game(config);
```

Create a basic scene at `src/scenes/MainScene.ts`:

```typescript
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Load assets
    this.load.image('background', 'assets/background.png');
    this.load.image('sprite', 'assets/sprite.png');
  }

  create() {
    // Add background
    this.add.image(400, 300, 'background');
    
    // Add sprite
    const sprite = this.add.image(400, 300, 'sprite');
    
    // Add some animation or interaction
    this.tweens.add({
      targets: sprite,
      y: 350,
      duration: 2000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    // Game loop logic
  }
}
```

### 1.5 Add Assets

Create an `assets` directory and add your game assets (images, sounds, etc.):

```bash
mkdir -p phaser_game/assets
# Add your image files to this directory
```

### 1.6 Build the Game

Add build scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

Build the game:

```bash
npm run build
```

This will create a `dist` directory with the built game.

## Step 2: Setting Up the Streamlit App with uv

### 2.1 Set Up Python Environment

First, set up your Python environment. You can use `pyenv` to manage Python versions:

```bash
# Navigate to your project root
cd my-streamlit-phaser-app

# Set Python version (if using pyenv)
pyenv local 3.11.0  # Or your preferred Python version
```

### 2.2 Create Requirements File

Create a `requirements.txt` file:

```
streamlit>=1.24.0
```

### 2.3 Install Dependencies with uv

Install the dependencies using `uv`:

```bash
# Install dependencies
uv pip install -r requirements.txt
```

### 2.4 Create the Streamlit Application

Create a `streamlit_app.py` file in the root directory:

```python
import streamlit as st
import os
import base64

# Set page config
st.set_page_config(
    page_title="Phaser Game in Streamlit",
    layout="wide"
)

# Function to read and encode the HTML file
def get_html_content():
    html_file = os.path.join("phaser_game", "dist", "index.html")
    with open(html_file, "r", encoding="utf-8") as f:
        return f.read()

# Function to create an iframe with the game
def render_phaser_game():
    # Get the HTML content
    html_content = get_html_content()
    
    # Create an iframe to display the game
    st.components.v1.html(
        f"""
        <iframe 
            src="phaser_game/dist/index.html" 
            width="820" 
            height="620" 
            style="border:none; overflow:hidden;"
        ></iframe>
        """,
        height=620,
        width=820,
    )

# Main app
def main():
    st.title("Phaser Game in Streamlit")
    st.write("Below is a Phaser game embedded in Streamlit:")
    
    render_phaser_game()
    
    st.write("Game controls and instructions can be added here.")

if __name__ == "__main__":
    main()
```

## Step 3: Serving Static Files in Streamlit

Streamlit needs to serve the static files (HTML, JS, CSS, and assets) for the Phaser game. There are two approaches:

### Option 1: Using Streamlit's Static Files Directory

Create a `.streamlit` directory in the root of your project and add a `config.toml` file:

```toml
[server]
enableStaticServing = true
```

Then, move your built Phaser game to the `static` directory:

```bash
mkdir -p .streamlit/static
cp -r phaser_game/dist/* .streamlit/static/
```

Update your iframe source in `streamlit_app.py`:

```python
st.components.v1.html(
    f"""
    <iframe 
        src="./static/index.html" 
        width="820" 
        height="620" 
        style="border:none; overflow:hidden;"
    ></iframe>
    """,
    height=620,
    width=820,
)
```

### Option 2: Embedding the Game Directly

For a more portable solution, you can embed the game directly in the Streamlit app:

```python
import streamlit as st
import os
import base64

def get_file_content_as_base64(file_path):
    with open(file_path, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()

def main():
    st.title("Phaser Game in Streamlit")
    
    # Get the paths to your built files
    html_path = os.path.join("phaser_game", "dist", "index.html")
    js_path = os.path.join("phaser_game", "dist", "assets", "index.js")
    
    # Read the HTML content
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Replace the script src with the base64 encoded JS
    js_base64 = get_file_content_as_base64(js_path)
    html_content = html_content.replace(
        '<script type="module" src="/assets/index.js"></script>',
        f'<script type="module">{js_base64}</script>'
    )
    
    # Do the same for any images
    # Example for background.png:
    bg_path = os.path.join("phaser_game", "dist", "assets", "background.png")
    bg_base64 = get_file_content_as_base64(bg_path)
    html_content = html_content.replace(
        'assets/background.png',
        f'data:image/png;base64,{bg_base64}'
    )
    
    # Render the HTML
    st.components.v1.html(html_content, height=620, width=820)

if __name__ == "__main__":
    main()
```

## Step 4: Running the Application

Run the Streamlit app using `uv`:

```bash
# Run the Streamlit app
uv run streamlit run streamlit_app.py
```

## Troubleshooting Image Loading Issues

If you're having trouble loading images in your Phaser game, here are some common issues and solutions:

### 1. Incorrect Asset Paths

Make sure your asset paths are correct. In Phaser's `preload` method, paths are relative to the HTML file:

```typescript
// Correct way to load assets
preload() {
  // If assets are in the assets directory at the same level as index.html
  this.load.image('background', 'assets/background.png');
  
  // If using Vite with the assets directory inside the src directory
  this.load.image('background', '/assets/background.png');
}
```

### 2. CORS Issues

When running in Streamlit, you might encounter CORS (Cross-Origin Resource Sharing) issues. To solve this:

- Use relative paths for assets
- Ensure the assets are served from the same origin as the game
- Use the embedding approach described in Option 2 above

### 3. Asset Loading Timing

Make sure assets are fully loaded before using them:

```typescript
preload() {
  // Add a loading progress bar
  const progressBar = this.add.graphics();
  const progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
  
  // Show loading progress
  this.load.on('progress', function (value) {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });
  
  // Clear progress bar when complete
  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
  });
  
  // Load assets
  this.load.image('background', 'assets/background.png');
}
```

### 4. File Format Issues

Ensure your image files are in a web-compatible format (PNG, JPEG, WebP) and not corrupted.

### 5. Vite Configuration

If using Vite, make sure your `vite.config.ts` is properly configured to handle assets:

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',  // Use relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
```

## FAQ: Common Questions About Phaser Game Development

### Does writing a Phaser game require TypeScript?

No, TypeScript is not required for Phaser game development. You can develop Phaser games using plain JavaScript. However, TypeScript offers several advantages:

1. **Type Safety**: Catches errors during development rather than at runtime
2. **Better IDE Support**: Provides autocompletion, type checking, and documentation
3. **Improved Maintainability**: Makes code more readable and self-documenting
4. **Easier Refactoring**: Types make it safer to change code structure

If you prefer JavaScript, you can simply use `.js` files instead of `.ts` files and remove TypeScript-specific configurations.

### What roles do Vite and npm play in Phaser game development?

**npm (Node Package Manager)**:
- **Dependency Management**: Installs and manages Phaser and other libraries
- **Script Running**: Provides a standardized way to run build commands
- **Package Distribution**: Helps if you want to share your game as a package

**Vite**:
- **Development Server**: Provides a fast development server with hot module replacement
- **Build Tool**: Bundles and optimizes your code for production
- **Asset Handling**: Processes and optimizes images and other assets
- **Module Resolution**: Handles ES modules and imports
- **TypeScript Support**: Compiles TypeScript to JavaScript

Vite is a modern build tool that's significantly faster than older tools like Webpack, especially for development. It's particularly well-suited for Phaser games because:

1. It has excellent support for static assets like images
2. It provides fast hot module replacement for quick development iterations
3. It optimizes the final bundle size, which is important for web games

## Conclusion

By following this guide, you should be able to successfully integrate a Phaser game into a Streamlit application using `uv` for Python dependency management. The key points to remember are:

1. Structure your project with clear separation between the Phaser game and Streamlit app
2. Build the Phaser game with proper asset handling
3. Use `uv` to manage Python dependencies
4. Configure Streamlit to serve the static files or embed them directly
5. Pay attention to asset paths and CORS issues when loading images

With these steps, your Phaser game should load and display images correctly within your Streamlit application. 