"""
Development version of the Streamlit app that uses an iframe to display the built game.
This is a simpler approach for testing purposes.
"""
import os
import sys
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

# Configure Streamlit page
st.set_page_config(
    page_title="Japanese Visual Novel (Dev)",
    page_icon="🎮",
    layout="wide",
    initial_sidebar_state="collapsed",
)

def main():
    """Main application entry point."""
    # Set up the page header
    st.title("Japanese Visual Novel (Simple Iframe Version)")
    
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
    
    # Serve the game using file:// protocol
    file_path = phaser_dist / "index.html"
    file_url = f"file://{file_path.absolute()}"
    
    # Display using iframe with file URL
    st.warning("This version uses a file:// URL which might have security restrictions in some browsers.")
    st.code(file_url, language="bash")
    
    # Iframe alternative using Streamlit's html component
    html_content = f"""
    <div style="display: flex; justify-content: center; align-items: center; height: 820px; width: 100%;">
        <iframe src="{file_url}" width="1200" height="800" style="border: none;"></iframe>
    </div>
    """
    st.components.v1.html(html_content, height=850, width=1250)
    
    # Also offer direct access to built HTML
    st.markdown(f"You can also [open the built game directly]({file_url})")
    
    # Add development controls in the sidebar
    with st.sidebar:
        st.header("Development Controls")
        st.caption("These controls are for development purposes only.")
        
        if st.button("Reload App"):
            st.rerun()
        
        if st.button("Rebuild Game"):
            os.chdir(project_root)
            rebuild_result = os.system("npm --prefix phaser_game run build")
            if rebuild_result == 0:
                st.success("Game rebuilt successfully!")
                st.rerun()
            else:
                st.error("Failed to rebuild game. Check console for errors.")

if __name__ == "__main__":
    main() 