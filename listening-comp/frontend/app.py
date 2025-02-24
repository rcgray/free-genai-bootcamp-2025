"""Main Streamlit application for Japanese Listening Learning Tool."""

from typing import Literal

import streamlit as st

from backend.db import get_sources

# Define view types
ViewType = Literal["add_content", "library", "study"]

# Define constants
SOURCE_TYPES = ["Podcast URL (.mp3)", "YouTube (NYI)"]
DEFAULT_SOURCE_TYPE = SOURCE_TYPES[0]


def initialize_session_state() -> None:
    """Initialize session state variables."""
    if "current_view" not in st.session_state:
        st.session_state.current_view = "library"
    if "selected_source_id" not in st.session_state:
        st.session_state.selected_source_id = None
    # Initialize filter states
    if "filter_all" not in st.session_state:
        st.session_state.filter_all = True
    if "filter_ready" not in st.session_state:
        st.session_state.filter_ready = False
    if "filter_pending" not in st.session_state:
        st.session_state.filter_pending = False
    # Initialize content input states
    if "source_type" not in st.session_state:
        st.session_state.source_type = DEFAULT_SOURCE_TYPE


def render_add_content_view() -> None:
    """Render the Add Content view."""
    st.header("Add New Content")

    # URL input with validation
    url = st.text_input("Enter podcast URL:", key="url_input")
    # Store source_type in session state for future use
    _source_type = st.selectbox(  # noqa: F841
        "Source Type",
        SOURCE_TYPES,
        key="source_type",
    )

    if st.button("Process URL", key="process_url"):
        if url:
            st.info("URL processing will be implemented in future versions.")
        else:
            st.error("Please enter a valid URL.")


def render_library_view() -> None:
    """Render the Library view."""
    st.header("My Library")

    # Add filters
    col1, col2, col3 = st.columns(3)
    with col1:
        # Store filter states in session state for future use
        _show_all = st.checkbox(  # noqa: F841
            "All",
            key="filter_all",
        )
    with col2:
        _show_ready = st.checkbox(  # noqa: F841
            "Ready",
            key="filter_ready",
        )
    with col3:
        _show_pending = st.checkbox(  # noqa: F841
            "Pending",
            key="filter_pending",
        )

    # Display sources
    sources = get_sources()
    # TODO: Implement filtering based on checkbox states
    for source_id, source in sources.items():
        with st.container():
            col1, col2 = st.columns([3, 1])
            with col1:
                st.subheader(source["title"])
                st.text(f"Duration: {source['duration_seconds'] / 60:.1f} minutes")
                st.text(f"Status: {source['status']}")
            with col2:
                if st.button("Study", key=f"study_{source_id}"):
                    st.session_state.selected_source_id = source_id
                    st.session_state.current_view = "study"


def render_study_view() -> None:
    """Render the Study view."""
    if not st.session_state.selected_source_id:
        st.error("No content selected for study.")
        if st.button("Return to Library"):
            st.session_state.current_view = "library"
        return

    sources = get_sources()
    source = sources.get(st.session_state.selected_source_id)

    if not source:
        st.error("Selected content not found.")
        if st.button("Return to Library"):
            st.session_state.current_view = "library"
        return

    st.header(source["title"])

    # Placeholder for audio player
    st.subheader("Audio Player")
    st.info("Audio player will be implemented in future versions.")

    # Placeholder for transcript
    st.subheader("Transcript")
    st.info("Transcript will be implemented in future versions.")

    # Placeholder for translation
    st.subheader("Translation")
    st.info("Translation will be implemented in future versions.")


def main() -> None:
    """Run the main Streamlit application."""
    # Initialize session state first
    initialize_session_state()

    st.set_page_config(
        page_title="Japanese Listening Learning Tool",
        page_icon="🎧",
        layout="centered",  # Default to centered layout
    )

    # Main navigation
    st.title("Japanese Listening Learning Tool")

    # Navigation tabs
    tab_library, tab_add, tab_study = st.tabs(
        ["Library", "Add Content", "Study Session"]
    )

    # Render content based on selected tab
    with tab_library:
        render_library_view()
    with tab_add:
        render_add_content_view()
    with tab_study:
        render_study_view()


if __name__ == "__main__":
    main()
