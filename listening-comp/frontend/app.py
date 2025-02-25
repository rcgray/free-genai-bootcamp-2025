"""Main Streamlit application for Japanese Listening Learning Tool."""

from pathlib import Path
from typing import Literal, Tuple
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse

import streamlit as st
from streamlit.runtime.uploaded_file_manager import UploadedFile

from backend import get_audio_duration
from backend.audio_processor import MAX_FILE_SIZE_MB
from backend.db import (
    add_source,
    get_source_by_title,
    get_sources,
    update_source_duration,
    update_source_status,
)
from backend.utils import download_file, sanitize_filename

# Define view types
ViewType = Literal["add_content", "library", "process", "study"]

# Define constants
SOURCE_TYPES = {
    "Podcast URL (.mp3)": {"enabled": True},
    "Local File (.mp3)": {"enabled": True},
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
    # Initialize processing step states
    if "transcription_started" not in st.session_state:
        st.session_state.transcription_started = False
    if "translation_started" not in st.session_state:
        st.session_state.translation_started = False
    if "audio_gen_started" not in st.session_state:
        st.session_state.audio_gen_started = False


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


def check_file_size(file_path: Path) -> Tuple[bool, float]:
    """Check if a file exceeds the size limit.

    Args:
        file_path: Path to the file

    Returns:
        Tuple of (is_valid, file_size_mb)
    """
    if not file_path.exists():
        return False, 0

    file_size_bytes = file_path.stat().st_size
    file_size_mb = file_size_bytes / (1024 * 1024)

    return file_size_mb <= MAX_FILE_SIZE_MB, file_size_mb


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

        # Check file size
        is_size_valid, file_size_mb = check_file_size(output_path)
        if not is_size_valid:
            output_path.unlink()  # Clean up oversized file
            return (
                False,
                f"File size ({file_size_mb:.2f}MB) exceeds the limit of {MAX_FILE_SIZE_MB}MB",
            )

        # Get audio duration
        try:
            with st.spinner("Analyzing audio file..."):
                duration = get_audio_duration(str(output_path))
        except Exception as e:
            # If duration detection fails, log the error but continue with duration=0
            st.warning(f"Could not determine audio duration: {e}")
            duration = 0

        # Add to database as final step
        try:
            with st.spinner("Adding to library..."):
                doc_id = add_source(
                    url=url,
                    title=title,
                    source_type=source_type,
                    duration_seconds=duration,  # Use the detected duration
                    download_path=str(output_path),
                )

                if not doc_id:
                    # If database operation returns no doc_id
                    if output_path.exists():
                        output_path.unlink()
                    return False, "Failed to add to library: No document ID returned"

                # Update the status to downloaded if we have a valid duration
                if duration > 0:
                    update_source_duration(doc_id, duration)

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


def process_local_file(
    uploaded_file: UploadedFile,
    title: str,
    source_type: str,
) -> Tuple[bool, str]:
    """Process and save a local audio file.

    Args:
        uploaded_file: Streamlit UploadedFile object
        title: Content title
        source_type: Type of source

    Returns:
        Tuple of (success, message)
    """
    # Create safe filename
    safe_title = sanitize_filename(title)
    output_path = MEDIA_DIR / f"{safe_title}.mp3"

    try:
        # Check file size before saving
        file_size_bytes = uploaded_file.size
        file_size_mb = file_size_bytes / (1024 * 1024)

        if file_size_mb > MAX_FILE_SIZE_MB:
            return (
                False,
                f"File size ({file_size_mb:.2f}MB) exceeds the limit of {MAX_FILE_SIZE_MB}MB",
            )

        # Ensure media directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Save the uploaded file
        with st.spinner("Saving audio file..."):
            # Read the file content
            file_content = uploaded_file.read()

            # Write to the destination path
            with open(output_path, "wb") as f:
                f.write(file_content)

        # Verify file was saved successfully
        if not output_path.exists():
            return False, "Save failed: File was not created"

        if output_path.stat().st_size == 0:
            output_path.unlink()  # Clean up empty file
            return False, "Save failed: File is empty"

        # Get audio duration
        try:
            with st.spinner("Analyzing audio file..."):
                duration = get_audio_duration(str(output_path))
        except Exception as e:
            # If duration detection fails, log the error but continue with duration=0
            st.warning(f"Could not determine audio duration: {e}")
            duration = 0

        # Add to database as final step
        try:
            with st.spinner("Adding to library..."):
                doc_id = add_source(
                    url="Local File",  # Use "Local File" as the URL for local files
                    title=title,
                    source_type=source_type,
                    duration_seconds=duration,  # Use the detected duration
                    download_path=str(output_path),
                )

                if not doc_id:
                    # If database operation returns no doc_id
                    if output_path.exists():
                        output_path.unlink()
                    return False, "Failed to add to library: No document ID returned"

                # Update the status to downloaded if we have a valid duration
                if duration > 0:
                    update_source_duration(doc_id, duration)

            return True, f'Content "{title}" added successfully!'

        except Exception as e:
            # If database operation fails, clean up the saved file
            if output_path.exists():
                output_path.unlink()
            return False, f"Failed to add to library: {e}"

    except ValueError as e:
        if output_path.exists():
            output_path.unlink()
        return False, str(e)
    except OSError as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"File error: {e}"
    except Exception as e:
        if output_path.exists():
            output_path.unlink()
        return False, f"Unexpected error: {e}"


def render_add_content_view() -> None:
    """Render the Add Content view."""
    st.header("Add New Content")

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
        return

    # Display file size limit notice
    st.info(
        f"⚠️ Note: Audio files must be less than {MAX_FILE_SIZE_MB}MB due to API limitations."
    )

    # Title input with validation
    title = st.text_input(
        "Title:",
        key="title_input",
        help="Enter a unique title for this content",
    )

    # URL input or file upload based on source type
    uploaded_file = None
    url = ""  # Initialize with empty string instead of None

    if selected_base_type == "Podcast URL (.mp3)":
        url = st.text_input(
            "Enter audio source URL:",
            key="url_input",
            help="Enter the URL of the podcast episode",
        )
    elif selected_base_type == "Local File (.mp3)":
        # For local files, we use a file uploader
        uploaded_file = st.file_uploader(
            f"Select a file from your computer (max {MAX_FILE_SIZE_MB}MB)",
            type=["mp3"],
            key="file_uploader",
            help=f"Select an MP3 file from your computer (must be less than {MAX_FILE_SIZE_MB}MB)",
        )

        # Display the selected file path and size
        if uploaded_file is not None:
            file_path = uploaded_file.name
            file_size_mb = uploaded_file.size / (1024 * 1024)
            url = "Local File"  # Set URL to "Local File" for local files

            if file_size_mb > MAX_FILE_SIZE_MB:
                st.error(
                    f"⚠️ Selected file is {file_size_mb:.2f}MB, which exceeds the {MAX_FILE_SIZE_MB}MB limit."
                )
            else:
                st.success(f"Selected file: {file_path} ({file_size_mb:.2f}MB)")

    # Process button
    button_label = (
        "Process URL" if selected_base_type == "Podcast URL (.mp3)" else "Process File"
    )
    if st.button(button_label, key="process_content"):
        # Validate title
        title_valid, title_error = validate_title(title)
        if not title_valid:
            st.error(title_error)
            return

        # Validate URL or file
        if selected_base_type == "Podcast URL (.mp3)":
            # Validate URL
            url_valid, url_error = validate_url(
                url
            )  # url is now a string, not Optional[str]
            if not url_valid:
                st.error(url_error)
                return

            # Process the content from URL
            success, message = process_new_content(
                url=url,  # url is now a string, not Optional[str]
                title=title,
                source_type=selected_base_type,
            )
        elif selected_base_type == "Local File (.mp3)":
            # Validate file
            if uploaded_file is None:
                st.error("Please select a file")
                return

            # Check file size
            file_size_mb = uploaded_file.size / (1024 * 1024)
            if file_size_mb > MAX_FILE_SIZE_MB:
                st.error(
                    f"File size ({file_size_mb:.2f}MB) exceeds the {MAX_FILE_SIZE_MB}MB limit."
                )
                return

            # Process the content from local file
            success, message = process_local_file(
                uploaded_file=uploaded_file,
                title=title,
                source_type=selected_base_type,
            )
        else:
            st.error("Unsupported source type")
            return

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

                # Format duration as minutes:seconds
                duration_seconds = source["duration_seconds"]
                if duration_seconds > 0:
                    minutes = duration_seconds // 60
                    seconds = duration_seconds % 60
                    duration_str = f"{minutes}:{seconds:02d}"
                else:
                    duration_str = "Unknown"

                st.text(f"Duration: {duration_str}")
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
                        st.rerun()
                else:
                    if st.button(
                        "Process", key=f"process_{source_id}", use_container_width=True
                    ):
                        st.session_state.process_target_id = source_id
                        st.session_state.current_view = "process"
                        st.rerun()


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

    # Show current status and progress at the top
    status_col, progress_col = st.columns([2, 1])
    with status_col:
        st.text(f"Current Status: {source['status'].title()}")
    with progress_col:
        # Calculate progress (25% per completed step)
        progress = 0.25  # Start with 25% for download
        if source["transcript_path"]:
            progress += 0.25
        if source["translation_path"]:
            progress += 0.25
        if source["status"] == "completed":
            progress += 0.25
        st.progress(progress, text=f"{int(progress * 100)}% Complete")

    st.divider()

    # Display steps vertically with cards
    with st.container():
        # Step 0: Download (always complete)
        st.markdown("### Step 0: Download")
        st.success("✓ Download Complete")
        st.caption(f"File: {source['download_path']}")

        st.divider()

        # Step 1: Transcription
        st.markdown("### Step 1: Transcribe Audio")
        if source["status"] == "downloaded":
            col1, col2 = st.columns([3, 1])
            with col1:
                st.info("Ready to start transcription")
                st.caption(
                    f"Note: Audio files must be less than {MAX_FILE_SIZE_MB}MB for transcription"
                )
            with col2:
                if st.button(
                    "Start Transcription",
                    key="start_transcription",
                    use_container_width=True,
                ):
                    st.session_state.transcription_started = True

                    # Implement transcription logic
                    try:
                        with st.spinner("Transcribing audio... This may take a while."):
                            from backend import transcribe_audio

                            # Get the audio file path
                            audio_path = source["download_path"]

                            # Generate the output path (WebVTT format)
                            title = Path(audio_path).stem
                            transcript_path = f"media/transcripts/{title}.vtt"

                            # Transcribe the audio
                            transcript, output_path = transcribe_audio(
                                file_path=audio_path,
                                output_path=transcript_path,
                                format="webvtt",  # Use WebVTT format
                            )

                            # Update the database
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="transcribed",
                                transcript_path=output_path,
                            )

                            # Show success message
                            st.success("Transcription completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during transcription: {e}")
                        # You could update the database with an error status here
        elif source["transcript_path"]:
            st.success("✓ Transcription Complete")
            st.caption(f"Transcript: {source['transcript_path']}")

            # Add a button to view the transcript
            if st.button("View Transcript", key="view_transcript"):
                transcript_path = source["transcript_path"]
                try:
                    with open(transcript_path, encoding="utf-8") as f:
                        transcript_content = f.read()

                    # Display the transcript in an expandable section
                    with st.expander("Transcript Content", expanded=True):
                        st.text(transcript_content)
                except Exception as e:
                    st.error(f"Error reading transcript: {e}")
        else:
            st.info("Waiting for transcription...")

        st.divider()

        # Step 2: Translation
        st.markdown("### Step 2: Translate Text")
        if source["transcript_path"] and source["status"] == "transcribed":
            col1, col2 = st.columns([3, 1])
            with col1:
                st.info("Ready to start translation")
                st.caption(
                    f"Note: Audio files must be less than {MAX_FILE_SIZE_MB}MB for translation"
                )
            with col2:
                if st.button(
                    "Start Translation",
                    key="start_translation",
                    use_container_width=True,
                ):
                    st.session_state.translation_started = True

                    # Implement translation logic
                    try:
                        with st.spinner(
                            "Translating audio to English... This may take a while."
                        ):
                            from backend import translate_audio

                            # Get the audio file path
                            audio_path = source["download_path"]

                            # Generate the output path
                            title = Path(audio_path).stem
                            translation_path = f"media/translations/{title}.txt"

                            # Translate the audio directly to English
                            translation, output_path = translate_audio(
                                file_path=audio_path, output_path=translation_path
                            )

                            # Update the database
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="translated",
                                translation_path=output_path,
                            )

                            # Show success message
                            st.success("Translation completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during translation: {e}")
                        # You could update the database with an error status here
        elif source["translation_path"]:
            st.success("✓ Translation Complete")
            st.caption(f"Translation: {source['translation_path']}")

            # Add a button to view the translation
            if st.button("View Translation", key="view_translation"):
                translation_path = source["translation_path"]
                try:
                    with open(translation_path, encoding="utf-8") as f:
                        translation_content = f.read()

                    # Display the translation in an expandable section
                    with st.expander("Translation Content", expanded=True):
                        st.text(translation_content)
                except Exception as e:
                    st.error(f"Error reading translation: {e}")
        else:
            st.info("Waiting for translation...")
            if not source["transcript_path"]:
                st.caption("⚠️ Complete transcription first")

        st.divider()

        # Step 3: Audio Generation
        st.markdown("### Step 3: Generate Audio")
        if source["translation_path"] and source["status"] == "translated":
            col1, col2 = st.columns([3, 1])
            with col1:
                st.info("Ready to generate audio")
            with col2:
                if st.button(
                    "Generate Audio", key="start_audio_gen", use_container_width=True
                ):
                    st.session_state.audio_gen_started = True
                    # Audio generation logic will be implemented later

                    # For now, just update the status to "completed"
                    update_source_status(
                        doc_id=int(st.session_state.process_target_id),
                        status="completed",
                    )
                    st.success("Audio generation completed!")
                    st.rerun()
        elif source["status"] == "completed":
            st.success("✓ Audio Generation Complete")
            st.caption("Generated audio is ready for study")
        else:
            st.info("Waiting for audio generation...")
            if not source["translation_path"]:
                st.caption("⚠️ Complete translation first")

    # Error handling and retry options
    if "error" in source["status"].lower():
        st.divider()
        st.error(
            "An error occurred during processing. "
            "Please try again or contact support if the problem persists."
        )
        if st.button("Retry Processing"):
            # Reset error state and retry from last successful step
            pass  # Will be implemented later


def main() -> None:
    """Main entry point for the Streamlit application."""
    initialize_session_state()

    st.set_page_config(
        page_title="Japanese Listening Learning Tool",
        page_icon="🎧",
        layout="centered",  # Default to centered layout
    )

    # Main navigation
    st.title("Japanese Listening Learning Tool")

    # Create tab-like navigation with buttons
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        if st.button(
            "Library",
            key="nav_library",
            type="secondary"
            if st.session_state.current_view != "library"
            else "primary",
            use_container_width=True,
        ):
            st.session_state.current_view = "library"
            st.rerun()
    with col2:
        if st.button(
            "Add Content",
            key="nav_add",
            type="secondary"
            if st.session_state.current_view != "add_content"
            else "primary",
            use_container_width=True,
        ):
            st.session_state.current_view = "add_content"
            st.rerun()
    with col3:
        if st.button(
            "Process Content",
            key="nav_process",
            type="secondary"
            if st.session_state.current_view != "process"
            else "primary",
            use_container_width=True,
        ):
            st.session_state.current_view = "process"
            st.rerun()
    with col4:
        if st.button(
            "Study Session",
            key="nav_study",
            type="secondary" if st.session_state.current_view != "study" else "primary",
            use_container_width=True,
        ):
            st.session_state.current_view = "study"
            st.rerun()

    st.divider()

    # Render content based on current view
    if st.session_state.current_view == "library":
        render_library_view()
    elif st.session_state.current_view == "add_content":
        render_add_content_view()
    elif st.session_state.current_view == "process":
        render_process_view()
    elif st.session_state.current_view == "study":
        render_study_view()


if __name__ == "__main__":
    main()
