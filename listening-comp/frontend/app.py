"""Main Streamlit application for Japanese Listening Learning Tool."""

import streamlit as st

from backend import get_greeting


def main() -> None:
    """Run the main Streamlit application."""
    st.set_page_config(
        page_title="Japanese Listening Learning Tool",
        page_icon="🎧",
        layout="wide",
    )

    st.title("Japanese Listening Learning Tool")

    # User input for name
    user_name = st.text_input("Enter your name:", "")

    # Display greeting
    if user_name:
        st.write(get_greeting(user_name))
    else:
        st.write(get_greeting())

    # Placeholder for future podcast URL input
    st.subheader("Podcast Input")
    podcast_url = st.text_input("Enter podcast URL:", "")

    if podcast_url:
        st.info("URL processing will be implemented in future versions.")


if __name__ == "__main__":
    main()
