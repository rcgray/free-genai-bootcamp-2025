"""
OPEA-Based LLM Chat Application
Main Streamlit application entry point
"""

import os
import sys
import streamlit as st
import requests
import json
from typing import List, Dict, Any, Optional

# Add the project root to the path to allow imports from other parts of the application
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the chat component
from app.components.chat import display_chat_message, create_chat_input

# Configuration
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8888")
API_ENDPOINT = f"{BACKEND_URL}/v1/chatqna"
HEALTH_ENDPOINT = f"{BACKEND_URL}/health"

# Page configuration
st.set_page_config(
    page_title="OPEA Chat",
    page_icon="💬",
    layout="centered",
    initial_sidebar_state="collapsed",
)

def initialize_session_state() -> None:
    """Initialize the Streamlit session state for chat history."""
    if "messages" not in st.session_state:
        st.session_state.messages = []
    
    if "is_processing" not in st.session_state:
        st.session_state.is_processing = False

def display_chat_history() -> None:
    """Display the current chat history in the UI."""
    for message in st.session_state.messages:
        display_chat_message(
            role=message["role"],
            content=message["content"]
        )

def check_backend_health() -> bool:
    """Check if the backend service is available."""
    try:
        response = requests.get(HEALTH_ENDPOINT, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def send_message_to_llm(user_message: str) -> Optional[str]:
    """Send a message to the LLM via the backend API and return the response."""
    try:
        payload = {
            "messages": [{"role": "user", "content": user_message}],
            "stream": False,
            "context": [],
            "meta": {"auth_token": ""}
        }
        
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            if "choices" in data and len(data["choices"]) > 0:
                return data["choices"][0]["message"]["content"]
            else:
                st.error("Received an empty response from the model.")
                return None
        else:
            st.error(f"Error from backend: {response.status_code} - {response.text}")
            return None
            
    except requests.RequestException as e:
        st.error(f"Failed to communicate with the backend: {str(e)}")
        return None
    except Exception as e:
        st.error(f"An unexpected error occurred: {str(e)}")
        return None

def handle_user_input(user_input: str) -> None:
    """Process user input and get response from LLM."""
    if not user_input.strip():
        return
    
    # Disable repeated submissions while processing
    if st.session_state.is_processing:
        return
    
    # Add user message to the chat history
    st.session_state.messages.append({"role": "user", "content": user_input})
    
    # Set processing flag
    st.session_state.is_processing = True
    
    # Force a rerun to update the UI with the user message
    st.rerun()

def main() -> None:
    """Main application entry point."""
    # Initialize session state
    initialize_session_state()
    
    # Application header
    st.title("OPEA Chat")
    st.markdown("Chat with your local LLM using NVIDIA GPU acceleration")
    
    # Check backend health
    if not check_backend_health():
        st.error("⚠️ Backend service is not available. Please make sure the backend is running.")
        st.info("You can start the backend with: `./backend/setup.sh`")
        return
    
    # Display chat history
    display_chat_history()
    
    # Check if we need to process a new user message
    if st.session_state.is_processing and st.session_state.messages and st.session_state.messages[-1]["role"] == "user":
        with st.spinner("Thinking..."):
            user_message = st.session_state.messages[-1]["content"]
            llm_response = send_message_to_llm(user_message)
            
            if llm_response:
                # Add the LLM response to the chat history
                st.session_state.messages.append({"role": "assistant", "content": llm_response})
        
        # Reset processing flag
        st.session_state.is_processing = False
        
        # Force a rerun to update the UI with the LLM response
        st.rerun()
    
    # Create the chat input area
    create_chat_input(handle_user_input)

if __name__ == "__main__":
    main()
