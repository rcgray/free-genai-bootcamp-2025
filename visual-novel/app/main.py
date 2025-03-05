"""
Main entry point for the Japanese Visual Novel application.
This file serves as the Streamlit wrapper for the Phaser game.
"""
import os
import sys
from pathlib import Path

import streamlit as st
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.utils.static import serve_phaser_game, inject_css

# Load environment variables
load_dotenv()

# Configure Streamlit page
st.set_page_config(
    page_title="Japanese Visual Novel",
    page_icon="🎮",
    layout="wide",
    initial_sidebar_state="collapsed",
)

def main() -> None:
    """Main application entry point."""
    # Set up the page header
    st.title("Japanese Visual Novel")
    
    # Inject custom CSS
    css_path = Path(__file__).parent.parent / "static" / "css" / "game.css"
    if css_path.exists():
        inject_css("css/game.css")
    
    # Create a container for the Phaser game
    game_container = st.container()
    
    with game_container:
        # Create a div for the Phaser game
        st.markdown(
            """
            <div id="phaser-game">
                <div id="game-container"></div>
            </div>
            """,
            unsafe_allow_html=True,
        )
        
        # Serve the Phaser game
        serve_phaser_game()
    
    # Add minimal controls in the sidebar (for development purposes)
    with st.sidebar:
        st.header("Development Controls")
        st.caption("These controls are for development purposes only.")
        
        if st.button("Reload Game"):
            st.rerun()

if __name__ == "__main__":
    main() 