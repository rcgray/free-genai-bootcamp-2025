"""
Application Configuration for LLM Chat Application.

This module contains configuration settings for the Streamlit application,
including UI settings and application behavior.
"""

from pathlib import Path
from typing import Dict, Any, List


class AppConfig:
    """Configuration for the Streamlit application."""

    def __init__(self) -> None:
        """Initialize application configuration with default values."""
        # App display settings
        self.app_title = "OPEA Chat"
        self.app_description = "Chat with LLMs using Intel's OPEA toolchain"
        self.app_icon = "💬"
        
        # UI settings
        self.max_chat_history = 10  # Number of messages to display
        self.input_placeholder = "Type your message here..."
        self.send_button_text = "Send"
        self.default_model_display_name = "Meta-Llama-3.2:3B"
        
        
        # Message styling
        self.user_message_css = """
        background-color: #e6f7ff;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        """
        
        self.assistant_message_css = """
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        """
        
        # Colors
        self.primary_color = "#0071c5"  # Intel blue
        self.secondary_color = "#00aeef"
        self.background_color = "#ffffff"
        self.text_color = "#333333"
    
    def get_page_config(self) -> Dict[str, Any]:
        """Get Streamlit page configuration settings."""
        return {
            "page_title": self.app_title,
            "page_icon": self.app_icon,
            "layout": "centered",
            "initial_sidebar_state": "collapsed",
        }
    
    def get_custom_css(self) -> str:
        """Get custom CSS for the application."""
        return f"""
        <style>
        .stButton button {{
            background-color: {self.primary_color};
            color: white;
        }}
        .stTextInput {{
            border-color: {self.primary_color};
        }}
        .user-message {{
            {self.user_message_css}
        }}
        .assistant-message {{
            {self.assistant_message_css}
        }}
        </style>
        """


# Default configuration instance
default_config = AppConfig()
