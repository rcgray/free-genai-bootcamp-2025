"""
Utilities for serving static files through Streamlit.
"""
import os
import base64
from pathlib import Path
from typing import Optional

import streamlit as st


def get_static_file_path(relative_path: str) -> Path:
    """
    Get the absolute path to a static file.
    
    Args:
        relative_path: The path relative to the static directory
        
    Returns:
        The absolute path to the file
    """
    # Get the project root directory
    root_dir = Path(__file__).parent.parent.parent
    static_dir = root_dir / "static"
    
    return static_dir / relative_path


def get_file_content_as_base64(file_path: Path) -> str:
    """
    Get the content of a file as a base64 encoded string.
    
    Args:
        file_path: Path to the file
        
    Returns:
        Base64 encoded string of the file content
    """
    with open(file_path, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()


def inject_js(js_path: str) -> None:
    """
    Inject JavaScript into the Streamlit page.
    
    Args:
        js_path: Path to the JavaScript file relative to the static directory
    """
    file_path = get_static_file_path(js_path)
    js_content = open(file_path, "r").read()
    
    st.markdown(
        f"""
        <script>
        {js_content}
        </script>
        """,
        unsafe_allow_html=True,
    )


def inject_css(css_path: str) -> None:
    """
    Inject CSS into the Streamlit page.
    
    Args:
        css_path: Path to the CSS file relative to the static directory
    """
    file_path = get_static_file_path(css_path)
    css_content = open(file_path, "r").read()
    
    st.markdown(
        f"""
        <style>
        {css_content}
        </style>
        """,
        unsafe_allow_html=True,
    )


def serve_phaser_game() -> None:
    """
    Serve the Phaser game in the Streamlit app.
    This function injects the necessary JavaScript and CSS files.
    """
    # Create the static directories if they don't exist
    static_dir = Path(__file__).parent.parent.parent / "static"
    js_dir = static_dir / "js"
    css_dir = static_dir / "css"
    
    os.makedirs(js_dir, exist_ok=True)
    os.makedirs(css_dir, exist_ok=True)
    
    # Check if Phaser is available, if not display a message
    phaser_path = js_dir / "phaser.min.js"
    game_js_path = js_dir / "game.js"
    
    if not phaser_path.exists() or not game_js_path.exists():
        st.warning(
            "Phaser library or game.js not found. Please add them to the static/js directory."
        )
        return
    
    # Inject Phaser library
    inject_js("js/phaser.min.js")
    
    # Inject game script
    inject_js("js/game.js")
    
    # Inject any custom CSS
    if (css_dir / "game.css").exists():
        inject_css("css/game.css") 