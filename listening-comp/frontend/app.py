"""Main Streamlit application for Japanese Listening Learning Tool."""

from pathlib import Path
from typing import Literal, Tuple
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse

import streamlit as st

from backend.db import add_source, get_source_by_title, get_sources
from backend.utils import download_file, sanitize_filename

# Define view types
ViewType = Literal["add_content", "library", "process", "study"]

# Define constants
SOURCE_TYPES = {
    "Podcast URL (.mp3)": {"enabled": True},
    "YouTube (NYI)": {"enabled": False},
}
DEFAULT_SOURCE_TYPE = next(
    source_type for source_type, config in SOURCE_TYPES.items() if config["enabled"]
)

# Define paths
MEDIA_DIR = Path("media/sources")


def initialize_session_state() -> None:
    """Initialize session state variables."""
    if "current_view" not in st.session_state:
        st.session_state.current_view = "library"
    # Separate process and study targets
    if "process_target_id" not in st.session_state:
        st.session_state.process_target_id = None
    if "study_target_id" not in st.session_state:
        st.session_state.study_target_id = None
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


def format_source_type_option(source_type: str) -> str:
    """Format source type option for display.

    Args:
        source_type: The source type to format

    Returns:
        Formatted source type string with disabled indicator if needed
    """
    if not SOURCE_TYPES[source_type]["enabled"]:
        return f"⚠️ {source_type} (disabled)"
    return source_type


def validate_url(url: str) -> Tuple[bool, str]:
    """Validate URL format and accessibility.

    Args:
        url: URL to validate

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not url:
        return False, "Please enter a URL"

    try:
        result = urlparse(url)
        if not all([result.scheme, result.netloc]):
            return False, "Invalid URL format"
        return True, ""
    except Exception:
        return False, "Invalid URL format"


def validate_title(title: str) -> Tuple[bool, str]:
    """Validate title format and uniqueness.

    Args:
        title: Title to validate

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not title:
        return False, "Please enter a title"

    if len(title) < 3:
        return False, "Title must be at least 3 characters long"

    if len(title) > 100:
        return False, "Title must be less than 100 characters"

    # Check for invalid filename characters
    sanitized = sanitize_filename(title)
    if not sanitized:
        return False, "Title cannot consist entirely of invalid characters"

    if sanitized != title:
        invalid_chars = set(title) - set(sanitized)
        return False, (
            "Title cannot contain invalid characters: "
            f"{', '.join(repr(c) for c in invalid_chars)}"
        )

    # Check if title already exists
    existing_source = get_source_by_title(title)
    if existing_source is not None:
        return False, "A source with this title already exists"

    return True, ""


def process_new_content(
    url: str,
    title: str,
    source_type: str,
) -> Tuple[bool, str]:
    """Process and download new content.

    Args:
        url: Content URL
        title: Content title
        source_type: Type of source

    Returns:
        Tuple of (success, message)
    """
    # Create safe filename
    safe_title = sanitize_filename(title)
    output_path = MEDIA_DIR / f"{safe_title}.mp3"

    try:
        # Ensure media directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Download file with progress bar
        with st.spinner("Downloading audio file..."):
            download_file(url, output_path)

        # Verify file was downloaded successfully
        if not output_path.exists():
            return False, "Download failed: File was not created"

        if output_path.stat().st_size == 0:
            output_path.unlink()  # Clean up empty file
            return False, "Download failed: File is empty"

        # Add to database as final step
        try:
            with st.spinner("Adding to library..."):
                doc_id = add_source(
                    url=url,
                    title=title,
                    source_type=source_type,
                    duration_seconds=0.0,  # Will be updated later
                    download_path=str(output_path),
                )

                if not doc_id:
                    # If database operation returns no doc_id
                    if output_path.exists():
                        output_path.unlink()
                    return False, "Failed to add to library: No document ID returned"

            return True, f'Content "{title}" added successfully!'

        except Exception as e:
            # If database operation fails, clean up the downloaded file
            if output_path.exists():
                output_path.unlink()
            return False, f"Failed to add to library: {e}"

    except ValueError as e:
        if output_path.exists():
            output_path.unlink()
        return False, str(e)
    except HTTPError as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"HTTP error: {e}"
    except URLError as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"Network error: {e}"
    except OSError as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"Download error: {e}"
    except Exception as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"Unexpected error: {e}"


def render_add_content_view() -> None:
    """Render the Add Content view."""
    st.header("Add New Content")

    # Title input with validation
    title = st.text_input(
        "Title:",
        key="title_input",
        help="Enter a unique title for this content",
    )

    # URL input with validation
    url = st.text_input(
        "Enter audio source URL:",
        key="url_input",
        help="Enter the URL of the podcast episode",
    )

    # Format options for display
    source_type_options = [format_source_type_option(st) for st in SOURCE_TYPES.keys()]

    # Store source_type in session state for future use
    selected_source_type = st.selectbox(
        "Source Type:",
        source_type_options,
        key="source_type",
        help="Select the type of content source",
    )

    # Check if selected type is enabled
    selected_base_type = selected_source_type.split(" (disabled)")[0].replace("⚠️ ", "")
    is_enabled = SOURCE_TYPES[selected_base_type]["enabled"]

    if not is_enabled:
        st.warning(
            "This source type is not yet implemented. Please select a different option."
        )
        st.button("Process URL", disabled=True)
    else:
        if st.button("Process URL", key="process_url"):
            # Validate title
            title_valid, title_error = validate_title(title)
            if not title_valid:
                st.error(title_error)
                return

            # Validate URL
            url_valid, url_error = validate_url(url)
            if not url_valid:
                st.error(url_error)
                return

            # Process the content
            success, message = process_new_content(
                url=url,
                title=title,
                source_type=selected_base_type,
            )

            if success:
                st.success(message)
            else:
                st.error(message)


def render_library_view() -> None:
    """Render the Library view."""
    st.header("My Library")

    # Add filter dropdown in a narrower container
    col1, col2, col3 = st.columns([2, 4, 2])
    with col1:
        filter_status = st.selectbox(
            "Filter by Status:",
            options=["All", "Ready", "Pending"],
            key="filter_status",
            help="Select which items to display",
        )

    # Display sources
    sources = get_sources()

    # Sort sources by created_at timestamp in reverse order
    sorted_sources = dict(
        sorted(sources.items(), key=lambda x: x[1]["created_at"], reverse=True)
    )

    # Filter sources based on selection
    filtered_sources = {}
    for source_id, source in sorted_sources.items():
        if filter_status == "All" or source["status"].lower() == filter_status.lower():
            filtered_sources[source_id] = source

    if not filtered_sources:
        st.info(f"No {filter_status.lower()} items found.")
        return

    # Display filtered sources
    for source_id, source in filtered_sources.items():
        with st.container():
            col1, col2 = st.columns([4, 1])
            with col1:
                st.subheader(source["title"])
                st.text(f"Duration: {source['duration_seconds'] / 60:.1f} minutes")
                st.text(f"Status: {source['status']}")
            with col2:
                # Use empty space to push button to the right
                st.write("")
                st.write("")
                # Show different buttons based on content status
                if source["status"] == "ready":
                    if st.button(
                        "Study", key=f"study_{source_id}", use_container_width=True
                    ):
                        st.session_state.study_target_id = source_id
                        st.session_state.current_view = "study"
                else:
                    if st.button(
                        "Process", key=f"process_{source_id}", use_container_width=True
                    ):
                        st.session_state.process_target_id = source_id
                        st.session_state.current_view = "process"


def render_study_view() -> None:
    """Render the Study view."""
    if not st.session_state.study_target_id:
        st.error("No content selected for study.")
        if st.button("Return to Library"):
            st.session_state.current_view = "library"
        return

    sources = get_sources()
    source = sources.get(st.session_state.study_target_id)

    if not source:
        st.error("Selected content not found.")
        if st.button("Return to Library"):
            st.session_state.current_view = "library"
        return

    # Check if content is ready for study
    if source["status"] != "ready":
        st.error(
            "This content needs to be processed before it can be studied. "
            "Please process it first."
        )
        if st.button("Go to Process View"):
            st.session_state.process_target_id = st.session_state.study_target_id
            st.session_state.current_view = "process"
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


def render_process_view() -> None:
    """Render the Process Content view."""
    st.header("Process Content")

    if not st.session_state.process_target_id:
        st.warning("No content selected for processing.")
        st.info("Please select content to process from the Library view.")
        return

    sources = get_sources()
    source = sources.get(st.session_state.process_target_id)

    if not source:
        st.error("Selected content not found.")
        return

    st.subheader(source["title"])
    st.text(f"Status: {source['status']}")

    # Placeholder for processing steps
    st.info("Content processing features will be implemented in future versions.")
    st.markdown(
        """
    Future processing steps will include:
    - Audio transcription
    - Text translation
    - Audio recreation
    - Quality checks
    """
    )


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
    tab_library, tab_add, tab_process, tab_study = st.tabs(
        ["Library", "Add Content", "Process Content", "Study Session"]
    )

    # Render content based on selected tab
    with tab_library:
        render_library_view()
    with tab_add:
        render_add_content_view()
    with tab_process:
        render_process_view()
    with tab_study:
        render_study_view()


if __name__ == "__main__":
    main()
