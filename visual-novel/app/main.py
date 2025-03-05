#!/usr/bin/env python3
"""
Japanese Language Learning Visual Novel - Main Application
"""

import os
from pathlib import Path
from typing import Dict, Any

import streamlit as st
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def setup_streamlit_page() -> None:
    """Set up the Streamlit page."""
    st.set_page_config(
        page_title="Japanese Language Learning Visual Novel",
        page_icon="🇯🇵",
        layout="wide",
        initial_sidebar_state="collapsed"
    )
    
    # Custom CSS
    st.markdown("""
        <style>
        .main {
            background-color: #f5f5f5;
        }
        iframe {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        </style>
    """, unsafe_allow_html=True)

def main() -> None:
    """Main application entry point."""
    setup_streamlit_page()
    
    # Title
    st.title("Japanese Language Learning Visual Novel")
    
    # Display the Phaser game in an iframe
    html_path = Path("static/phaser-game.html").absolute()
    
    # Create a container for the game with a fixed height
    game_container = st.container()
    with game_container:
        st.components.v1.html(
            f"""
            <iframe 
                src="http://localhost:8501/static/phaser-game.html" 
                width="100%" 
                height="650px"
                allow="autoplay"
                allowfullscreen
            ></iframe>
            """,
            height=650,
        )
    
    # Add a small footer
    st.markdown("---")
    st.markdown("Visual Novel Game Engine - Powered by Streamlit and Phaser")

if __name__ == "__main__":
    main() 