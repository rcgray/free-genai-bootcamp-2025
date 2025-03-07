"""
Main entry point for the Japanese Visual Novel application.
This file serves as the Streamlit wrapper for the Phaser game.
"""
import os
import sys
import base64
import mimetypes
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

def main() -> None:
    """Main application entry point."""
    # Set up the page header
    st.title("Japanese Visual Novel")
    
    # Define file paths
    project_root = Path(__file__).parent.parent
    phaser_dist = project_root / "phaser_game" / "dist"
    
    # Check if the build exists
    if not phaser_dist.exists():
        st.error("Phaser game build not found. Please run `npm --prefix phaser_game run build` first.")
        if st.button("Build Game Now"):
            st.info("Building game...")
            os.chdir(project_root)
            os.system("npm --prefix phaser_game run build")
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
            body {{
                margin: 0;
                padding: 0;
                background-color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                overflow: hidden;
            }}
            #game-container {{
                width: 1200px;
                height: 800px;
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
    st.components.v1.html(html_content, height=850, width=1250)
    
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
                st.image(title_img_path, caption="Title Image", width=200)
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
        
        # Development note
        st.markdown("### Development Option")
        st.info("For best development experience, use `./scripts/run-phaser-dev.sh` to run the development server and open http://localhost:5173 in your browser.")

if __name__ == "__main__":
    main() 