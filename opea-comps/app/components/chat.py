"""
Chat components for the Streamlit application
"""

import streamlit as st
from typing import Callable, Any

def display_chat_message(role: str, content: str) -> None:
    """
    Display a chat message with the appropriate styling.
    
    Args:
        role: The role of the message author ('user' or 'assistant')
        content: The content of the message
    """
    with st.chat_message(role):
        st.markdown(content)

def create_chat_input(on_submit: Callable[[str], None]) -> None:
    """
    Create a chat input form for user messages.
    
    Args:
        on_submit: Callback function to handle the submitted message
    """
    # Create the chat input widget
    if user_input := st.chat_input("Type your message here..."):
        on_submit(user_input)
