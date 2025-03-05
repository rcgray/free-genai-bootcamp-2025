#!/usr/bin/env python3
"""
Japanese Language Learning Visual Novel - Main Application
"""

import os
import shutil
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
        .game-container {
            width: 800px;
            height: 600px;
            margin: 0 auto;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .game-background {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .game-title {
            position: absolute;
            top: 100px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 48px;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px #000000;
        }
        </style>
    """, unsafe_allow_html=True)

def copy_assets_to_static():
    """
    Copy assets to the static directory so they can be accessed by Phaser.
    
    Phaser expects assets to be relative to the HTML file, which is in the static directory.
    """
    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "assets"
    static_assets_dir = project_root / "static" / "assets"
    
    # Create the static/assets directory if it doesn't exist
    static_assets_dir.mkdir(parents=True, exist_ok=True)
    
    # Copy the assets directory to the static directory
    if assets_dir.exists():
        # Copy only if the source directory exists and the destination doesn't have the same files
        if not static_assets_dir.exists() or not list(static_assets_dir.glob("**/*")):
            print(f"Copying assets from {assets_dir} to {static_assets_dir}")
            # Use shutil to copy the directory tree
            if static_assets_dir.exists():
                shutil.rmtree(static_assets_dir)
            shutil.copytree(assets_dir, static_assets_dir)
        else:
            print(f"Assets already exist in {static_assets_dir}")

def main() -> None:
    """Main application entry point."""
    setup_streamlit_page()
    
    # Copy assets to the static directory
    copy_assets_to_static()
    
    # Title
    st.title("Japanese Language Learning Visual Novel")
    
    # Create a container for the game
    game_container = st.container()
    
    # Get the path to the Phaser HTML file
    project_root = Path(__file__).parent.parent
    phaser_html_path = project_root / "static" / "phaser-game.html"
    
    # Display the Phaser game
    if phaser_html_path.exists():
        with game_container:
            # Use st.components.v1.html to load the HTML file directly
            with open(phaser_html_path, "r") as f:
                phaser_html = f.read()
                
            st.components.v1.html(
                phaser_html,
                height=650,
                scrolling=False
            )
    else:
        st.error(f"Could not find Phaser HTML file at {phaser_html_path}")
        
        # As a fallback, just display the title background image
        title_bg_path = project_root / "assets" / "images" / "backgrounds" / "title.jpg"
        if title_bg_path.exists():
            st.image(str(title_bg_path), caption="Title Background")
        else:
            st.error(f"Could not find title background image at {title_bg_path}")
    
    # Add a small footer
    st.markdown("---")
    st.markdown("Visual Novel Game Engine - Powered by Streamlit and Phaser")

if __name__ == "__main__":
    main() 