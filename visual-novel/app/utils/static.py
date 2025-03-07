"""
Utilities for serving static files through Streamlit.
"""
import os
import base64
import shutil
from pathlib import Path
from typing import Optional

import streamlit as st

# Flag to track if assets have been copied
_assets_copied = False

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


def get_file_content_as_string(file_path: Path) -> str:
    """
    Get the content of a file as a string.
    
    Args:
        file_path: Path to the file
        
    Returns:
        String content of the file
    """
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


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
    js_content = get_file_content_as_string(file_path)
    
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
    css_content = get_file_content_as_string(file_path)
    
    st.markdown(
        f"""
        <style>
        {css_content}
        </style>
        """,
        unsafe_allow_html=True,
    )


def copy_assets_to_static() -> None:
    """
    Copy assets to the static directory for serving.
    Only copies assets once per session to avoid repeated copying.
    """
    global _assets_copied
    
    # Only copy assets if they haven't been copied yet
    if _assets_copied:
        return
    
    root_dir = Path(__file__).parent.parent.parent
    assets_dir = root_dir / "assets"
    static_assets_dir = root_dir / "static" / "assets"
    
    # Create the static assets directory if it doesn't exist
    os.makedirs(static_assets_dir, exist_ok=True)
    
    # Copy the assets directory to the static directory
    if assets_dir.exists():
        # Remove the old static assets directory if it exists
        if static_assets_dir.exists():
            shutil.rmtree(static_assets_dir)
        
        # Copy the assets directory to the static directory
        shutil.copytree(assets_dir, static_assets_dir)
        
        print(f"Copied assets from {assets_dir} to {static_assets_dir}")
        
        # Set the flag to indicate assets have been copied
        _assets_copied = True
    else:
        print(f"Assets directory {assets_dir} does not exist")


def serve_phaser_game() -> None:
    """
    Serve the Phaser game in the Streamlit app.
    This function injects the necessary JavaScript and CSS files.
    """
    # Disable Streamlit analytics
    st.markdown(
        """
        <script>
        // Disable Streamlit analytics
        if (window.Streamlit) {
            window.Streamlit.setGatherStatsEnabled(false);
            console.log("Streamlit analytics disabled");
        }
        </script>
        """,
        unsafe_allow_html=True,
    )
    
    # Create the static directories if they don't exist
    static_dir = Path(__file__).parent.parent.parent / "static"
    js_dir = static_dir / "js"
    css_dir = static_dir / "css"
    scenes_dir = js_dir / "scenes"
    
    os.makedirs(js_dir, exist_ok=True)
    os.makedirs(css_dir, exist_ok=True)
    os.makedirs(scenes_dir, exist_ok=True)
    
    # Copy assets to the static directory
    copy_assets_to_static()
    
    # Check if Phaser is available
    phaser_path = js_dir / "phaser.min.js"
    game_js_path = js_dir / "game.js"
    
    if not phaser_path.exists():
        st.error(
            "Phaser library not found. Please add phaser.min.js to the static/js directory."
        )
        return
    
    if not game_js_path.exists():
        st.error(
            "Game script not found. Please add game.js to the static/js directory."
        )
        return
    
    # Inject Phaser library
    inject_js("js/phaser.min.js")
    
    # Inject scene management scripts
    scene_scripts = [
        "js/scenes/BaseScene.js",
        "js/scenes/SceneRegistry.js",
        "js/scenes/AssetManager.js",
        "js/scenes/TestScene.js",
        "js/scenes/TitleScene.js",
        "js/scenes/loader.js"
    ]
    
    for script in scene_scripts:
        script_path = static_dir / script
        if script_path.exists():
            inject_js(script)
        else:
            st.warning(f"Scene script {script} not found. Some features may not work correctly.")
    
    # Inject game script
    inject_js("js/game.js")
    
    # Inject any custom CSS
    css_path = css_dir / "game.css"
    if css_path.exists():
        inject_css("css/game.css") 