#!/usr/bin/env python3
"""
Japanese Language Learning Visual Novel - Main Application
"""

import os
import logging
from pathlib import Path
from typing import Dict, Any, Optional

import streamlit as st
from dotenv import load_dotenv

from app.utils.config import load_config, setup_logging, get_path
from app.game.engine import GameEngine
from app.api.llm import LLMClient


# Load environment variables
load_dotenv()

# Set up configuration
def get_config() -> Dict[str, Any]:
    """Get application configuration from environment variables."""
    config = load_config()
    
    # Override with environment variables
    config["debug"] = os.getenv("DEBUG", "false").lower() == "true"
    config["openai_api_key"] = os.getenv("OPENAI_API_KEY", "")
    config["openai_model"] = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    config["port"] = int(os.getenv("PORT", "8000"))
    config["host"] = os.getenv("HOST", "127.0.0.1")
    
    return config


def initialize_game_engine(config: Dict[str, Any]) -> GameEngine:
    """Initialize the game engine."""
    return GameEngine(config)


def setup_streamlit_page() -> None:
    """Set up the Streamlit page."""
    st.set_page_config(
        page_title="Japanese Language Learning Visual Novel",
        page_icon="🇯🇵",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Custom CSS
    st.markdown("""
        <style>
        .main {
            background-color: #f5f5f5;
        }
        .dialog-box {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .character-name {
            font-weight: bold;
            color: #4b7bec;
        }
        .japanese-text {
            font-size: 1.5em;
            margin: 10px 0;
        }
        .english-text {
            font-style: italic;
            color: #555;
        }
        .pronunciation {
            font-family: monospace;
            color: #777;
            font-size: 0.9em;
        }
        .choice-button {
            background-color: #4b7bec;
            color: white;
            border-radius: 5px;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
        }
        </style>
    """, unsafe_allow_html=True)


def initialize_session_state() -> None:
    """Initialize the session state."""
    if "game_engine" not in st.session_state:
        config = get_config()
        st.session_state.game_engine = initialize_game_engine(config)
        
        # Register scenes
        from app.game.scenes.intro import IntroScene
        st.session_state.game_engine.register_scene("intro", IntroScene, {
            "background_image": "assets/images/backgrounds/classroom.jpg",
            "character_image": "assets/images/characters/teacher/default.png"
        })
        
        # Register characters
        from app.game.characters.teacher import create_teacher
        teacher = create_teacher()
        st.session_state.game_engine.register_character(teacher)
        
        # Start the game with the intro scene
        st.session_state.game_engine.start_game("intro")
        
    if "current_scene" not in st.session_state:
        st.session_state.current_scene = "intro"
        
    if "dialog_history" not in st.session_state:
        st.session_state.dialog_history = []
        
    if "choices" not in st.session_state:
        st.session_state.choices = []
        
    if "background_image" not in st.session_state:
        st.session_state.background_image = "assets/images/backgrounds/default.jpg"
        
    if "character_image" not in st.session_state:
        st.session_state.character_image = "assets/images/characters/teacher/default.png"
        
    if "show_vocabulary" not in st.session_state:
        st.session_state.show_vocabulary = False


def render_dialog(dialog_entry: Dict[str, Any]) -> None:
    """Render a dialog entry."""
    st.markdown(f"""
        <div class="dialog-box">
            <div class="character-name">{dialog_entry.get('character', 'Narrator')}</div>
            <div class="japanese-text">{dialog_entry.get('text', '')}</div>
            <div class="english-text">{dialog_entry.get('translation', '')}</div>
            <div class="pronunciation">{dialog_entry.get('pronunciation', '')}</div>
        </div>
    """, unsafe_allow_html=True)


def render_choices(choices: list) -> Optional[int]:
    """Render player choices and return the selected choice index."""
    if not choices:
        return None
        
    selected_choice = None
    cols = st.columns(len(choices))
    
    for i, choice in enumerate(choices):
        with cols[i]:
            if st.button(
                f"{choice.get('text', '')}\n{choice.get('translation', '')}",
                key=f"choice_{i}"
            ):
                selected_choice = i
                
    return selected_choice


def render_game_ui() -> None:
    """Render the game UI."""
    # Update game state from engine
    game_engine = st.session_state.game_engine
    current_scene = game_engine.current_scene
    
    if current_scene:
        # Update background image
        if hasattr(current_scene, 'background_image'):
            st.session_state.background_image = current_scene.background_image
            
        # Update character image
        if hasattr(current_scene, 'character_image'):
            st.session_state.character_image = current_scene.character_image
            
        # Update dialog history
        if hasattr(current_scene, 'static_dialog') and hasattr(current_scene, 'dialog_index'):
            # Only add new dialog entries
            while len(st.session_state.dialog_history) < current_scene.dialog_index:
                if current_scene.dialog_index <= len(current_scene.static_dialog):
                    dialog_entry = current_scene.static_dialog[len(st.session_state.dialog_history)]
                    st.session_state.dialog_history.append(dialog_entry)
    
    # Sidebar
    with st.sidebar:
        st.title("Game Menu")
        
        if st.button("New Game"):
            st.session_state.current_scene = "intro"
            st.session_state.dialog_history = []
            st.session_state.choices = []
            game_engine.start_game("intro")
            st.experimental_rerun()
            
        if st.button("Save Game"):
            # TODO: Implement save game functionality
            st.success("Game saved!")
            
        save_slots = game_engine.config.get("save_slots", 5)
        load_slot = st.selectbox("Load Game", range(1, save_slots + 1))
        if st.button("Load"):
            # TODO: Implement load game functionality
            st.info(f"Loading game from slot {load_slot}...")
            
        st.divider()
        
        # Language settings
        language_levels = game_engine.config.get(
            "language_levels", ["beginner", "intermediate", "advanced"]
        )
        selected_level = st.selectbox(
            "Language Level",
            language_levels,
            index=language_levels.index(
                game_engine.game_state.get("player", {}).get("language_level", "beginner")
            ) if "player" in game_engine.game_state and "language_level" in game_engine.game_state["player"] else 0
        )
        
        if "player" in game_engine.game_state and selected_level != game_engine.game_state["player"].get("language_level", "beginner"):
            game_engine.game_state["player"]["language_level"] = selected_level
            st.success(f"Language level set to {selected_level}")
            
        st.divider()
        
        # Vocabulary
        st.checkbox("Show Vocabulary", key="show_vocabulary")
        if st.session_state.show_vocabulary:
            st.subheader("Learned Words")
            learned_words = game_engine.game_state.get("player", {}).get("learned_words", [])
            if not learned_words:
                st.info("No words learned yet.")
            else:
                for word in learned_words:
                    st.markdown(f"""
                        **{word['word']}** - Level: {word['mastery_level']}/5
                        - Correct: {word['correct_count']}
                        - Incorrect: {word['incorrect_count']}
                    """)
    
    # Main game area
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Background image
        if Path(st.session_state.background_image).exists():
            st.image(st.session_state.background_image, use_column_width=True)
        else:
            st.error(f"Background image not found: {st.session_state.background_image}")
            
        # Dialog history
        for dialog in st.session_state.dialog_history[-3:]:
            render_dialog(dialog)
            
        # Add a "Continue" button to advance dialog
        if current_scene and hasattr(current_scene, 'static_dialog') and hasattr(current_scene, 'dialog_index'):
            if current_scene.dialog_index < len(current_scene.static_dialog):
                if st.button("Continue"):
                    current_scene._advance_dialog()
                    st.experimental_rerun()
            
        # Player choices
        selected_choice = render_choices(st.session_state.choices)
        if selected_choice is not None:
            # Handle player choice
            if current_scene and hasattr(current_scene, 'handle_choice'):
                current_scene.handle_choice(selected_choice)
            st.session_state.choices = []
            st.experimental_rerun()
    
    with col2:
        # Character image
        if st.session_state.character_image and Path(st.session_state.character_image).exists():
            st.image(st.session_state.character_image, use_column_width=True)


def main() -> None:
    """Main application entry point."""
    # Load configuration
    config = get_config()
    
    # Set up logging
    setup_logging(config)
    logger = logging.getLogger(__name__)
    logger.info(f"Starting application v{config['version']}")
    
    # Set up Streamlit page
    setup_streamlit_page()
    
    # Initialize session state
    initialize_session_state()
    
    # Render game UI
    render_game_ui()
    
    # Log application status
    logger.info(f"Application running in {'debug' if config['debug'] else 'production'} mode")
    logger.info(f"Server running at http://{config['host']}:{config['port']}")


if __name__ == "__main__":
    main() 