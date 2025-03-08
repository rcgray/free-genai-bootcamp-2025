"""
Main entry point for the Japanese Visual Novel application.
This file serves as the Streamlit wrapper for the Phaser game.
"""
import os
import sys
import base64
import mimetypes
import requests
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

# Configure Streamlit page
st.set_page_config(
    page_title="Japanese Visual Novel",
    page_icon="🎮",
    layout="wide",
    initial_sidebar_state="collapsed",
)

def get_file_content_as_data_url(file_path):
    """Get file content as a data URL"""
    with open(file_path, "rb") as f:
        data = f.read()
    
    # Determine mime type based on file extension
    mime_type, _ = mimetypes.guess_type(str(file_path))
    if not mime_type:
        if file_path.suffix.lower() == '.png':
            mime_type = 'image/png'
        elif file_path.suffix.lower() == '.jpg' or file_path.suffix.lower() == '.jpeg':
            mime_type = 'image/jpeg'
        else:
            mime_type = 'application/octet-stream'
    
    # Create data URL
    base64_data = base64.b64encode(data).decode()
    return f"data:{mime_type};base64,{base64_data}"

def is_vite_dev_server_running():
    """Check if the Vite development server is running"""
    try:
        response = requests.get("http://localhost:5173", timeout=0.5)
        return response.status_code == 200
    except:
        return False

def main() -> None:
    """Main application entry point."""
    # Set up the page header
    st.title("Japanese Visual Novel")
    
    # Check if Vite development server is running
    dev_mode = is_vite_dev_server_running()
    
    if dev_mode:
        st.success("Development mode active! 🚀 Using the Vite dev server (http://localhost:5173) for hot module replacement.")
        st.info("Any changes to the Phaser game source files should be instantly reflected below without needing to refresh.")
        
        # Create iframe with direct link to Vite development server
        html_content = """
        <div style="display: flex; justify-content: center; align-items: center; height: 800px; width: 100%;">
            <iframe src="http://localhost:5173" width="1200" height="800" frameborder="0" scrolling="no"></iframe>
        </div>
        """
        
        st.components.v1.html(html_content, height=800, width=1200)
        
        with st.sidebar:
            st.header("Development Mode")
            st.info("Using Vite development server for hot module replacement")
            
            if st.button("Open Vite Dev Server in New Tab"):
                js = f"""
                <script>
                window.open("http://localhost:5173", "_blank");
                </script>
                """
                st.components.v1.html(js, height=0)
                
            st.markdown("### Tips for Development")
            st.info("""
            1. Make changes to files in `phaser_game/src`
            2. Vite will automatically reload the game
            3. Refresh this page if needed
            """)
    else:
        # Define file paths
        project_root = Path(__file__).parent.parent
        phaser_dist = project_root / "phaser_game" / "dist"
        
        # Check if the build exists
        if not phaser_dist.exists():
            st.error("Phaser game build not found. Please run `npm --prefix phaser_game run build` first.")
            
            col1, col2 = st.columns(2)
            with col1:
                if st.button("Build Game Now"):
                    st.info("Building game...")
                    os.chdir(project_root)
                    os.system("npm --prefix phaser_game run build")
                    st.rerun()
            
            with col2:
                if st.button("Start Development Mode"):
                    st.info("Development mode requires running scripts/watch-phaser.sh in a separate terminal.")
                    st.code("./scripts/watch-phaser.sh", language="bash")
                    st.rerun()
            return
        
        # Collect all assets we need to embed
        assets = {}
        
        # Add title image
        title_img_path = project_root / "phaser_game" / "assets" / "images" / "backgrounds" / "title.png"
        if title_img_path.exists():
            assets["title-bg"] = get_file_content_as_data_url(title_img_path)
            st.sidebar.success(f"Embedded title image ({title_img_path.name})")
        else:
            st.sidebar.warning(f"Title image not found at {title_img_path}")
        
        # Get JS content - we need to inject our assets before loading
        js_files = list(phaser_dist.glob("assets/*.js"))
        if not js_files:
            st.error("No JavaScript files found in the build. Please rebuild the game.")
            return
        
        js_path = js_files[0]
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f.read()
        
        # Converted assets to a JavaScript array for injection
        assets_js = "window.GAME_ASSETS = " + str(assets).replace("'", '"') + ";"
        
        # Create the wrapper HTML with embedded assets and game
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Japanese Visual Novel</title>
            <style>
                html, body {{
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background-color: transparent;
                }}
                body {{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }}
                #game-container {{
                    width: 1200px;
                    height: 800px;
                    margin: 0;
                    padding: 0;
                }}
            </style>
        </head>
        <body>
            <div id="game-container"></div>
            
            <script>
            // Embedded assets
            {assets_js}
            </script>
            
            <script type="module">
            // Game code
            {js_content}
            </script>
        </body>
        </html>
        """
        
        # Display the game
        st.components.v1.html(html_content, height=800, width=1200)
        
        # Show asset info in sidebar
        with st.sidebar:
            st.header("Development Controls")
            st.caption("These controls are for development purposes only.")
            
            # Debug section
            with st.expander("Asset Debugging Info"):
                if "title-bg" in assets:
                    st.text(f"Title image data URL length: {len(assets['title-bg'])}")
                    st.text(f"Data URL preview: {assets['title-bg'][:50]}...")
                    
                    # Show the image in the sidebar
                    st.image(str(title_img_path), caption="Title Image", width=200)
                else:
                    st.warning("Title image not embedded")
            
            if st.button("Reload App"):
                st.rerun()
            
            if st.button("Rebuild Game"):
                os.chdir(project_root)
                result = os.system("npm --prefix phaser_game run build")
                if result == 0:
                    st.success("Game rebuilt successfully!")
                    st.rerun()
                else:
                    st.error("Failed to rebuild game")
            
            # Development mode link
            st.markdown("### Start Development Mode")
            st.info("For best development experience, run both scripts in separate terminals:")
            st.code("./scripts/watch-phaser.sh", language="bash")
            st.code("./scripts/watch-streamlit.sh", language="bash")

if __name__ == "__main__":
    main() 