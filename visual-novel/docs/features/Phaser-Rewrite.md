# Phaser Implementation Rewrite Analysis

This document analyzes our current Phaser implementation compared to the recommendations in the Streamlit-Phaser-Howto.md reference document. It identifies key differences and suggests changes needed to align with the recommended approach.

## Current Implementation vs. Recommended Approach

### Project Structure

#### Current Structure:
```
visual-novel/
├── app/
│   ├── main.py                # Streamlit entry point
│   ├── api/                   # API endpoints
│   └── utils/
│       └── static.py          # Static file serving utilities
├── assets/
│   ├── images/
│   │   ├── backgrounds/
│   │   └── characters/
│   ├── audio/
│   └── fonts/
├── static/
│   ├── assets/                # Copied assets from assets/ directory
│   ├── css/
│   │   └── game.css
│   ├── js/
│   │   ├── game.js            # Main game configuration
│   │   ├── phaser.min.js      # Phaser library
│   │   └── scenes/            # Game scenes
│   │       ├── BaseScene.js
│   │       ├── SceneRegistry.js
│   │       ├── AssetManager.js
│   │       ├── TestScene.js
│   │       ├── TitleScene.js
│   │       └── loader.js
│   └── index.html             # HTML template
├── .streamlit/
│   └── config.toml            # Streamlit configuration
```

#### Recommended Structure:
```
visual-novel/
├── app/main.py                # Streamlit entry point
├── phaser_game/               # Separate Phaser project
│   ├── index.html             # HTML entry point
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite build configuration
│   ├── assets/                # Game assets
│   └── src/                   # Game source code (TypeScript)
│       ├── index.ts           # Main entry point
│       └── scenes/            # Game scenes
├── .streamlit/
│   └── config.toml            # Streamlit configuration
```

### Key Differences

1. **Build System**
   - **Current**: Direct inclusion of JavaScript files in HTML, manual script loading
   - **Recommended**: Using npm, TypeScript, and Vite for a modern build system

2. **Asset Management**
   - **Current**: Manual copying of assets from assets/ to static/assets/
   - **Recommended**: Assets managed by Vite build process

3. **Code Organization**
   - **Current**: Plain JavaScript files with global variables
   - **Recommended**: TypeScript modules with proper imports/exports

4. **Static File Serving**
   - **Current**: Custom Python utility to inject JavaScript into Streamlit
   - **Recommended**: Using Streamlit's static file serving or embedding the built game

5. **Development Workflow**
   - **Current**: Direct editing of JavaScript files, manual reloading
   - **Recommended**: Modern development server with hot reloading

## Specific Changes Needed

### 1. Build System Implementation

- Create a proper Node.js project for the Phaser game:
  ```bash
  npm init -y
  npm install phaser vite @vitejs/plugin-react typescript
  ```

- Add TypeScript configuration (tsconfig.json)
- Add Vite configuration (vite.config.ts)
- Convert JavaScript files to TypeScript modules

### 2. Asset Management Improvements

- Stop manually copying assets from assets/ to static/assets/
- Configure Vite to handle assets properly
- Update asset loading paths in game code
- Remove any now unecessary libraries that were being used solely for this purpose

### 3. Code Structure Refactoring

- Convert global variables to proper module imports/exports
- Implement proper class inheritance with TypeScript
- Use ES modules instead of global script loading

### 4. Static File Serving Changes

- **DECISION**: We will embed the game directly in the Streamlit app rather than using a separate static directory.

- Rationale for direct embedding:
  - **Simplicity**: Our Streamlit app's sole purpose is to serve as a wrapper for this specific Phaser game, so embedding eliminates unnecessary complexity.
  - **Portability**: A self-contained application is easier to deploy and share.
  - **Asset Management**: Direct embedding with base64-encoded assets solves our image loading issues more definitively.
  - **Deployment**: A single, self-contained Streamlit app is easier to deploy than one that depends on specific directory structures.
  - **Maintenance**: Fewer moving parts means less that can break when making changes or updates.

- Implementation approach:
  - Use the approach outlined in the Streamlit-Phaser-Howto.md document for embedding:
    - Encode assets as base64 strings
    - Include the built JS directly in the Streamlit app
    - Use Streamlit's components.v1.html to render the game

### 5. Development Workflow Enhancement

- Set up npm scripts for development and building
- Use Vite's development server during development
- Build the game for production before serving in Streamlit
- **Implement hot reloading for development**:
  - Use Vite's built-in hot module replacement (HMR) for Phaser game development
  - Set up a development mode that automatically rebuilds and refreshes when code changes
  - Create a streamlined workflow for rapid iteration

### 6. Documentation and Build Command Updates

- **README.md Updates**:
  - Add detailed instructions for setting up the development environment, including Node.js and npm requirements
  - Document the new build process and commands
  - Update the project description to reflect the new architecture
  - Add a section on how to run the development server for the Phaser game
  - Include troubleshooting tips for common issues

- **Technical Specification Updates**:
  - Update `docs/Technical-Spec.md` to reflect the new architecture
  - Document the TypeScript and Vite configuration
  - Update the project structure section to reflect the new organization
  - Add details about the embedding approach for the Phaser game
  - Update any diagrams or flowcharts to reflect the new architecture

- **Build Scripts**:
  - Create npm scripts in package.json for common tasks:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "streamlit": "npm run build && cd .. && uv run streamlit run app/main.py",
      "watch": "vite --watch"
    }
    ```
  - Create a Python script to automate the build and run process
  - Update any CI/CD configurations if applicable

- **Environment Setup Documentation**:
  - Document the Node.js and npm version requirements
  - Provide instructions for installing and configuring TypeScript and Vite
  - Update the conda environment setup instructions to include Node.js integration
  - Document how to set up VS Code or other IDEs for TypeScript development

- **Asset Management Documentation**:
  - Document the new asset organization and loading process
  - Provide guidelines for adding new assets to the project
  - Include examples of how to reference assets in the TypeScript code

## Implementation Considerations

### Phaser Version
- We're currently using Phaser 3.88.2, which is compatible with the recommended approach
- No version change needed, but we should use npm to manage the dependency

### TypeScript vs. JavaScript
- **DECISION**: We will use TypeScript for the rewrite.
- Rationale for using TypeScript:
  - **Type Safety**: Catches errors during development rather than at runtime
  - **Better IDE Support**: Provides autocompletion, type checking, and documentation
  - **Improved Maintainability**: Makes code more readable and self-documenting
  - **Easier Refactoring**: Types make it safer to change code structure
  - **Future-Proofing**: Better supports the project as it grows in complexity

### Asset Loading Issues
- Our current image loading issues likely stem from incorrect asset paths
- The recommended approach addresses this with proper asset handling in Vite
- CORS issues would also be resolved with the recommended approach
- Direct embedding with base64-encoded assets will eliminate path-related issues entirely

### Development Workflow
- **DECISION**: We will implement a hot-reloading development workflow.
- Vite provides built-in hot module replacement (HMR) that automatically updates the browser when code changes
- This will significantly improve development speed and iteration time
- We'll set up two distinct workflows:
  1. **Development Mode**: Using Vite's dev server with HMR for rapid iteration on the Phaser game
  2. **Production Mode**: Building the game and embedding it in Streamlit for final testing and deployment

## Additional Considerations - Decisions

### 1. Development Environment Setup
- **DECISION**: We will use npm as it is required for Vite and TypeScript.
- We will document the Node.js and npm requirements in the project README.
- Team members will be expected to have Node.js and npm installed alongside the conda environment.
- No special integration between npm and conda is needed; they will be used for separate aspects of the project.

### 2. Build Process Integration
- **DECISION**: We will automate the build process and implement watch mode for development.
- Implementation approach:
  - Add npm scripts for building the game
  - Create a script that builds the game before starting Streamlit
  - Implement watch mode for development to automatically rebuild on changes
  - Document the build process in the README

### 3. Asset Organization
- **DECISION**: We will move assets into the phaser_game/ directory structure.
- This is the simplest approach that will minimize build steps and potential points of failure.
- Vite will handle asset processing and optimization automatically.
- This eliminates the need for manual asset copying between directories.

### 4. Backward Compatibility
- **DECISION**: We will not maintain backward compatibility with the previous implementation.
- The new implementation will completely replace the old one.
- This approach minimizes work and complexity during the transition.

### 5. Testing Strategy
- **DECISION**: We will defer formal testing until later in the project.
- For now, we will rely on manual testing during development.
- We will revisit testing needs as the project matures.

## Migration Strategy

A phased approach to migration would be:

1. Set up the new project structure alongside the existing one
2. Port one scene at a time to the new structure
3. Update the Streamlit integration to use the embedded game approach
4. Test thoroughly and address any issues
5. Remove the old implementation once everything is working

## Implementation Timeline Estimate

- **Phase 1**: Setup and initial structure (1-2 days)
  - Set up Node.js project
  - Configure TypeScript and Vite
  - Create basic project structure

- **Phase 2**: Core implementation (3-5 days)
  - Port BaseScene and SceneRegistry
  - Implement asset loading
  - Create basic game initialization

- **Phase 3**: Scene migration (2-3 days per scene)
  - Port TitleScene
  - Port TestScene
  - Port any additional scenes

- **Phase 4**: Streamlit integration (2-3 days)
  - Implement embedding approach
  - Test and debug integration
  - Optimize performance

- **Phase 5**: Cleanup and finalization (1-2 days)
  - Remove old implementation
  - Document new approach
  - Final testing

## Conclusion

Our current implementation differs significantly from the recommended approach in the Streamlit-Phaser-Howto.md document. The recommended approach uses modern web development tools and practices that would likely resolve our current issues with image loading and provide a more maintainable codebase.

The most significant change would be adopting a proper build system with npm, TypeScript, and Vite, rather than our current approach of directly including JavaScript files. This would require restructuring our project but would provide significant benefits in terms of development experience, maintainability, and asset handling.

By embedding the game directly in the Streamlit app rather than using separate static files, we'll create a more self-contained and portable application that's easier to maintain and deploy. This approach aligns with our project's goal of using Streamlit primarily as a wrapper for the Phaser game.

With the decisions made regarding development environment, build process, asset organization, backward compatibility, and testing strategy, we now have a clear path forward for implementing the rewrite. These decisions prioritize simplicity, automation, and minimizing potential points of failure, which should lead to a smoother development experience and a more robust application.

## Action Plan

### Phase 1: Environment Setup and Project Structure
- [ ] **1.1 Development Environment Setup**
  - [ ] Install Node.js and npm if not already installed
  - [ ] Verify Node.js (v16+) and npm (v8+) versions
  - [ ] Document Node.js and npm requirements in README.md

- [ ] **1.2 Create Phaser Game Project Structure**
  - [ ] Create `phaser_game` directory in project root
  - [ ] Initialize npm project: `cd phaser_game && npm init -y`
  - [ ] Install dependencies:
    ```bash
    npm install phaser@3.88.2
    npm install --save-dev typescript vite @vitejs/plugin-react
    ```

- [ ] **1.3 Configure TypeScript and Vite**
  - [ ] Create `tsconfig.json` with appropriate configuration:
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
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
      },
      "include": ["src"]
    }
    ```
  - [ ] Create `vite.config.ts` with appropriate configuration:
    ```typescript
    import { defineConfig } from 'vite';
    import { resolve } from 'path';

    export default defineConfig({
      base: './',
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
        hmr: true, // Enable Hot Module Replacement
      },
    });
    ```

- [ ] **1.4 Create Basic HTML Template**
  - [ ] Create `phaser_game/index.html`:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Japanese Visual Novel</title>
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

- [ ] **1.5 Set Up Directory Structure**
  - [ ] Create `phaser_game/src` directory
  - [ ] Create `phaser_game/src/scenes` directory
  - [ ] Create `phaser_game/assets` directory
  - [ ] Create subdirectories for different asset types:
    - [ ] `phaser_game/assets/images`
    - [ ] `phaser_game/assets/images/backgrounds`
    - [ ] `phaser_game/assets/images/characters`
    - [ ] `phaser_game/assets/audio` (if needed)
    - [ ] `phaser_game/assets/fonts` (if needed)

- [ ] **1.6 Configure Build Scripts**
  - [ ] Add npm scripts to `package.json`:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "streamlit": "npm run build && cd .. && uv run streamlit run app/main.py",
      "watch": "vite --watch"
    }
    ```

- [ ] **1.7 Set Up Development Workflow with Hot Reloading**
  - [ ] Create a development script that runs both Vite dev server and Streamlit:
    ```bash
    # scripts/dev.sh
    #!/bin/bash
    
    # Start Vite dev server in the background
    cd phaser_game && npm run dev &
    VITE_PID=$!
    
    # Wait for Vite server to start
    sleep 3
    
    # Go back to project root
    cd ..
    
    # Create a development version of main.py that uses the Vite dev server
    cat > app/dev_main.py << EOF
    import streamlit as st
    
    st.set_page_config(
        page_title="Japanese Visual Novel (Dev)",
        page_icon="🎮",
        layout="wide",
    )
    
    st.title("Japanese Visual Novel (Development Mode)")
    
    # Embed the Vite dev server in an iframe
    st.components.v1.iframe(
        src="http://localhost:5173",
        height=820,
        width=1220,
        scrolling=False
    )
    
    st.caption("Development mode: Changes to Phaser code will automatically reload.")
    EOF
    
    # Run Streamlit with the development main.py
    uv run streamlit run app/dev_main.py
    
    # Clean up when Streamlit is closed
    kill $VITE_PID
    rm app/dev_main.py
    ```
  - [ ] Make the script executable: `chmod +x scripts/dev.sh`
  - [ ] Add a npm script for development mode:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "streamlit": "npm run build && cd .. && uv run streamlit run app/main.py",
      "watch": "vite --watch",
      "dev:streamlit": "cd .. && ./scripts/dev.sh"
    }
    ```

**[CHECKPOINT 1: Basic Project Setup]**
*Verification Steps:*
1. Verify Node.js and npm are installed: `node -v && npm -v`
2. Verify project structure is created correctly: `ls -la phaser_game/`
3. Verify Vite development server works: `cd phaser_game && npm run dev`
4. Verify the development script works: `./scripts/dev.sh`
5. Check that a blank page with a game container appears in the browser
6. Verify hot reloading by making a simple change to the HTML file

### Phase 2: Asset Migration and Core Implementation

- [ ] **2.1 Migrate Assets**
  - [ ] Copy existing assets from `assets/` to `phaser_game/assets/`
  - [ ] Organize assets by type in the appropriate subdirectories
  - [ ] Optimize images if needed (compression, format conversion)

- [ ] **2.2 Create Main Entry Point**
  - [ ] Create `phaser_game/src/index.ts`:
    ```typescript
    import Phaser from 'phaser';
    // Import scenes here as they are created
    // import TitleScene from './scenes/TitleScene';

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1200,
      height: 800,
      parent: 'game-container',
      backgroundColor: '#333333',
      scene: [
        // Add scenes here as they are created
        // TitleScene
      ],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    // Create game instance
    const game = new Phaser.Game(config);

    // Enable hot module replacement for development
    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        console.log('HMR update detected');
      });
    }
    ```

- [ ] **2.3 Implement Base Scene Class**
  - [ ] Create `phaser_game/src/scenes/BaseScene.ts`:
    ```typescript
    import Phaser from 'phaser';

    export default class BaseScene extends Phaser.Scene {
      protected gameState: any;
      protected transitionDuration: number;
      protected isTransitioning: boolean;

      constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.gameState = null;
        this.transitionDuration = 500;
        this.isTransitioning = false;
      }

      // Port existing BaseScene methods with TypeScript types
      // ...
    }
    ```
  - [ ] Port all methods from the existing BaseScene.js with proper TypeScript types

- [ ] **2.4 Implement Scene Registry**
  - [ ] Create `phaser_game/src/scenes/SceneRegistry.ts`:
    ```typescript
    import Phaser from 'phaser';

    class SceneRegistry {
      private scenes: Map<string, typeof Phaser.Scene>;
      private gameState: any;

      constructor() {
        this.scenes = new Map();
        this.gameState = null;
      }

      // Port existing SceneRegistry methods with TypeScript types
      // ...
    }

    // Export as singleton
    export default new SceneRegistry();
    ```
  - [ ] Port all methods from the existing SceneRegistry.js with proper TypeScript types

- [ ] **2.5 Implement Asset Manager**
  - [ ] Create `phaser_game/src/utils/AssetManager.ts`:
    ```typescript
    class AssetManager {
      private assets: {
        images: Map<string, any>;
        audio: Map<string, any>;
        spritesheets: Map<string, any>;
        fonts: Map<string, any>;
      };
      private paths: Record<string, string>;

      constructor() {
        // Initialize with TypeScript types
        // ...
      }

      // Port existing AssetManager methods with TypeScript types
      // ...
    }

    // Export as singleton
    export default new AssetManager();
    ```
  - [ ] Port all methods from the existing AssetManager.js with proper TypeScript types

**[CHECKPOINT 2: Core Framework Implementation]**
*Verification Steps:*
1. Verify TypeScript compilation works: `cd phaser_game && npm run build`
2. Check for any TypeScript errors in the console
3. Verify the main entry point creates a Phaser game instance by running the dev server and checking the console
4. Verify the BaseScene, SceneRegistry, and AssetManager are properly implemented by importing them in the main entry point
5. Test basic asset loading by adding a test image and loading it in the main entry point
6. Verify the development workflow still works with the new TypeScript files

### Phase 3: Scene Migration

- [ ] **3.1 Implement Test Scene**
  - [ ] Create `phaser_game/src/scenes/TestScene.ts`
  - [ ] Port existing TestScene.js with proper TypeScript types
  - [ ] Update asset loading paths
  - [ ] Register the scene in the main entry point

- [ ] **3.2 Implement Title Scene**
  - [ ] Create `phaser_game/src/scenes/TitleScene.ts`
  - [ ] Port existing TitleScene.js with proper TypeScript types
  - [ ] Update asset loading paths
  - [ ] Register the scene in the main entry point

- [ ] **3.3 Test Scene Functionality**
  - [ ] Run the development server with hot reloading: `cd phaser_game && npm run dev`
  - [ ] Verify scenes load correctly
  - [ ] Verify assets load correctly
  - [ ] Verify scene transitions work
  - [ ] Test hot reloading by making changes to scene files

**[CHECKPOINT 3: Scene Implementation]**
*Verification Steps:*
1. Verify each scene loads correctly in isolation
2. Test scene transitions between the Test and Title scenes
3. Verify all assets are loading correctly in each scene
4. Test hot reloading by making changes to scene files and verifying they update in real-time
5. Check that game state is properly maintained between scene transitions
6. Verify that all functionality from the original JavaScript implementation works in the TypeScript version

### Phase 4: Streamlit Integration

- [ ] **4.1 Update Streamlit App for Embedding**
  - [ ] Modify `app/main.py` to use the embedding approach:
    ```python
    import streamlit as st
    import os
    import base64

    def get_file_content_as_base64(file_path):
        with open(file_path, "rb") as f:
            data = f.read()
        return base64.b64encode(data).decode()

    def main():
        st.title("Japanese Visual Novel")
        
        # Get the paths to built files
        js_path = os.path.join("phaser_game", "dist", "assets", "index.js")
        
        # Read the HTML content
        html_path = os.path.join("phaser_game", "dist", "index.html")
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
        # bg_path = os.path.join("phaser_game", "dist", "assets", "background.png")
        # bg_base64 = get_file_content_as_base64(bg_path)
        # html_content = html_content.replace(
        #     'assets/background.png',
        #     f'data:image/png;base64,{bg_base64}'
        # )
        
        # Render the HTML
        st.components.v1.html(html_content, height=820, width=1220)

    if __name__ == "__main__":
        main()
    ```

- [ ] **4.2 Create Build Script**
  - [ ] Create a Python script to automate the build process:
    ```python
    # scripts/build_game.py
    import os
    import subprocess
    import sys

    def build_game():
        """Build the Phaser game for production."""
        print("Building Phaser game...")
        os.chdir("phaser_game")
        result = subprocess.run(["npm", "run", "build"], check=True)
        os.chdir("..")
        return result.returncode == 0

    if __name__ == "__main__":
        success = build_game()
        sys.exit(0 if success else 1)
    ```

- [ ] **4.3 Update Streamlit Run Command**
  - [ ] Create a script to build and run the app:
    ```python
    # scripts/run_app.py
    import os
    import subprocess
    import sys
    from scripts.build_game import build_game

    def run_app():
        """Build the game and run the Streamlit app."""
        if build_game():
            print("Starting Streamlit app...")
            result = subprocess.run(["uv", "run", "streamlit", "run", "app/main.py"], check=True)
            return result.returncode == 0
        return False

    if __name__ == "__main__":
        success = run_app()
        sys.exit(0 if success else 1)
    ```

- [ ] **4.4 Test Integration**
  - [ ] Build the game: `cd phaser_game && npm run build`
  - [ ] Run the Streamlit app: `uv run streamlit run app/main.py`
  - [ ] Verify the game loads correctly in Streamlit
  - [ ] Verify assets are displayed correctly
  - [ ] Test scene transitions and interactions

- [ ] **4.5 Test Development Workflow**
  - [ ] Run the development workflow: `cd phaser_game && npm run dev:streamlit`
  - [ ] Make changes to a scene file and verify hot reloading works
  - [ ] Test the full development cycle from code change to seeing the result in the browser

**[CHECKPOINT 4: Streamlit Integration]**
*Verification Steps:*
1. Verify the production build works: `cd phaser_game && npm run build`
2. Check that the Streamlit app loads the game correctly: `uv run streamlit run app/main.py`
3. Verify all assets are displayed correctly in the embedded game
4. Test scene transitions and interactions in the Streamlit-embedded game
5. Verify the development workflow with hot reloading works: `./scripts/dev.sh`
6. Make changes to scene files and verify they update in real-time in the development mode
7. Test the full development cycle from code change to seeing the result in the browser
8. Verify that the game works correctly in both development and production modes

### Phase 5: Documentation and Cleanup

- [ ] **5.1 Update README.md**
  - [ ] Document the new project structure
  - [ ] Add setup instructions for Node.js and npm
  - [ ] Document the build process
  - [ ] Add development workflow instructions, including hot reloading
  - [ ] Include troubleshooting tips

- [ ] **5.2 Update Technical Specification**
  - [ ] Update `docs/Technical-Spec.md` with the new architecture
  - [ ] Document TypeScript and Vite configuration
  - [ ] Update project structure section
  - [ ] Add details about the embedding approach
  - [ ] Document the development workflow with hot reloading

- [ ] **5.3 Clean Up Old Implementation**
  - [ ] Remove unused files from `static/js/scenes/`
  - [ ] Remove unused utility functions from `app/utils/static.py`
  - [ ] Remove any other unused code or assets

- [ ] **5.4 Final Testing**
  - [ ] Verify all functionality works as expected
  - [ ] Test on different browsers if applicable
  - [ ] Address any remaining issues

- [ ] **5.5 Update Action Plan**
  - [ ] Mark the Phaser rewrite as completed in `docs/Action-Plan.md`
  - [ ] Update any related tasks or dependencies

**[CHECKPOINT 5: Final Verification]**
*Verification Steps:*
1. Review all documentation for accuracy and completeness
2. Verify the project builds and runs correctly from a clean state
3. Test the game in multiple browsers (Chrome, Firefox, Safari, Edge) if applicable
4. Verify all functionality from the original implementation works in the new implementation
5. Check that the development workflow is properly documented and works as expected
6. Verify that all unused code and assets have been removed
7. Ensure the Action Plan is updated to reflect the completed rewrite
8. Have another team member review the changes and test the implementation
