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
    is_ready_for_transcription,
    is_ready_for_translation,
    is_ready_for_audio_generation,
    is_ready_for_study,
    is_in_error_state,
    get_processing_progress,
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
            options=["All", "Ready for Study", "In Progress", "Error"],
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
        if filter_status == "All":
            filtered_sources[source_id] = source
        elif filter_status == "Ready for Study" and is_ready_for_study(source):
            filtered_sources[source_id] = source
        elif filter_status == "In Progress" and not is_ready_for_study(source) and not is_in_error_state(source):
            filtered_sources[source_id] = source
        elif filter_status == "Error" and is_in_error_state(source):
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
                
                # Display status based on path fields and status
                if is_in_error_state(source):
                    status_text = "Error"
                elif is_ready_for_study(source):
                    status_text = "Ready for Study"
                elif source["translation_path"]:
                    status_text = "Translation Complete"
                elif source["transcript_path"]:
                    status_text = "Transcription Complete"
                else:
                    status_text = "Pending"
                
                st.text(f"Status: {status_text}")
            with col2:
                # Use empty space to push button to the right
                st.write("")
                st.write("")
                # Show different buttons based on content status
                if is_ready_for_study(source):
                    if st.button(
                        "Study", key=f"study_{source_id}", type="primary", use_container_width=True
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
    st.header("Study Session")

    if not st.session_state.study_target_id:
        st.warning("No content selected for study.")
        st.info("Please select content to study from the Library view.")
        return

    sources = get_sources()
    source = sources.get(st.session_state.study_target_id)

    if not source:
        st.error("Selected content not found.")
        if st.button("Return to Library"):
            st.session_state.current_view = "library"
        return

    # Check if content is ready for study
    if not is_ready_for_study(source):
        st.error(
            "This content needs to be processed before it can be studied. "
            "Please process it first."
        )
        if st.button("Go to Process View"):
            st.session_state.process_target_id = st.session_state.study_target_id
            st.session_state.current_view = "process"
        return

    st.subheader(source["title"])
    
    # Initialize session state for current timestamp if not exists
    if "current_timestamp" not in st.session_state:
        st.session_state.current_timestamp = 0.0
    
    # Get the audio file path
    audio_path = source["download_path"]
    
    # Format duration as minutes:seconds for display
    duration_seconds = source["duration_seconds"]
    if duration_seconds > 0:
        minutes = duration_seconds // 60
        seconds = duration_seconds % 60
        duration_str = f"{minutes}:{seconds:02d}"
    else:
        duration_str = "Unknown"
        duration_seconds = 0  # Fallback to 0 if unknown
    
    # Parse transcript segments early for use throughout the function
    transcript_segments = []
    current_segment_text = "No transcript segment available for this timestamp"
    
    if source["transcript_path"] and Path(source["transcript_path"]).exists():
        try:
            with open(source["transcript_path"], encoding="utf-8") as f:
                transcript_content = f.read()
                
            # Parse different transcript formats
            if source["transcript_path"].endswith('.json'):
                import json
                try:
                    transcript_data = json.loads(transcript_content)
                    if "segments" in transcript_data:
                        for segment in transcript_data["segments"]:
                            start_time = segment.get("start", 0)
                            end_time = segment.get("end", 0)
                            text = segment.get("text", "")
                            transcript_segments.append((start_time, end_time, text))
                except json.JSONDecodeError:
                    pass
            elif source["transcript_path"].endswith('.vtt'):
                lines = transcript_content.split('\n')
                current_timestamp = None
                current_text = []
                start_time = 0
                end_time = 0
                
                # Parse WebVTT content
                for line in lines:
                    if '-->' in line:
                        # This is a timestamp line
                        current_timestamp = line.strip()
                        # Extract start and end times
                        try:
                            times = current_timestamp.split('-->')
                            start_time_str = times[0].strip()
                            end_time_str = times[1].strip()
                            
                            # Parse start time
                            parts = start_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                start_time = (int(hours) * 3600 + 
                                            int(minutes) * 60 + 
                                            int(seconds) + 
                                            int(milliseconds) / 1000)
                            else:
                                minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                start_time = (int(minutes) * 60 + 
                                            int(seconds) + 
                                            int(milliseconds) / 1000)
                                
                            # Parse end time
                            parts = end_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                end_time = (int(hours) * 3600 + 
                                          int(minutes) * 60 + 
                                          int(seconds) + 
                                          int(milliseconds) / 1000)
                            else:
                                minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                end_time = (int(minutes) * 60 + 
                                          int(seconds) + 
                                          int(milliseconds) / 1000)
                        except Exception:
                            start_time = 0
                            end_time = 0
                            
                        current_text = []
                    elif line.strip() and current_timestamp is not None:
                        # This is text content
                        current_text.append(line.strip())
                    elif not line.strip() and current_timestamp is not None and current_text:
                        # End of a segment
                        text = ' '.join(current_text)
                        transcript_segments.append((start_time, end_time, text))
                        current_timestamp = None
                
                # Add the last segment if there is one
                if current_timestamp is not None and current_text:
                    text = ' '.join(current_text)
                    transcript_segments.append((start_time, end_time, text))
            elif source["transcript_path"].endswith('.srt'):
                # Similar parsing for SRT format
                lines = transcript_content.split('\n')
                i = 0
                while i < len(lines):
                    if i + 2 < len(lines) and '-->' in lines[i+1]:
                        # This is a timestamp line
                        timestamp_line = lines[i+1].strip()
                        # Extract start and end times
                        try:
                            times = timestamp_line.split('-->')
                            start_time_str = times[0].strip()
                            end_time_str = times[1].strip()
                            
                            # Parse start time
                            parts = start_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split(',')
                                start_time = (int(hours) * 3600 + 
                                            int(minutes) * 60 + 
                                            int(seconds) + 
                                            int(milliseconds) / 1000)
                            
                            # Parse end time
                            parts = end_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split(',')
                                end_time = (int(hours) * 3600 + 
                                          int(minutes) * 60 + 
                                          int(seconds) + 
                                          int(milliseconds) / 1000)
                                
                            # Collect text lines
                            text_lines = []
                            j = i + 2
                            while j < len(lines) and lines[j].strip():
                                text_lines.append(lines[j].strip())
                                j += 1
                                
                            text = ' '.join(text_lines)
                            transcript_segments.append((start_time, end_time, text))
                            i = j
                        except Exception:
                            i += 1
                    else:
                        i += 1
        except Exception as e:
            st.error(f"Error parsing transcript: {e}")
    
    # Parse translation segments early for use throughout the function
    translation_segments = []
    current_translation_text = "No translation available for this timestamp"
    
    if source["translation_path"] and Path(source["translation_path"]).exists():
        try:
            with open(source["translation_path"], encoding="utf-8") as f:
                translation_content = f.read()
                
            # Parse translation (currently only WebVTT is supported for translations)
            if source["translation_path"].endswith('.vtt'):
                lines = translation_content.split('\n')
                current_timestamp = None
                current_text = []
                start_time = 0
                end_time = 0
                
                # Parse WebVTT content
                for line in lines:
                    if '-->' in line:
                        # This is a timestamp line
                        current_timestamp = line.strip()
                        # Extract start and end times
                        try:
                            times = current_timestamp.split('-->')
                            start_time_str = times[0].strip()
                            end_time_str = times[1].strip()
                            
                            # Parse start time
                            parts = start_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                start_time = (int(hours) * 3600 + 
                                            int(minutes) * 60 + 
                                            int(seconds) + 
                                            int(milliseconds) / 1000)
                            else:
                                minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                start_time = (int(minutes) * 60 + 
                                            int(seconds) + 
                                            int(milliseconds) / 1000)
                                
                            # Parse end time
                            parts = end_time_str.split(':')
                            if len(parts) == 3:
                                hours, minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                end_time = (int(hours) * 3600 + 
                                          int(minutes) * 60 + 
                                          int(seconds) + 
                                          int(milliseconds) / 1000)
                            else:
                                minutes, seconds = parts
                                seconds, milliseconds = seconds.split('.')
                                end_time = (int(minutes) * 60 + 
                                          int(seconds) + 
                                          int(milliseconds) / 1000)
                        except Exception:
                            start_time = 0
                            end_time = 0
                            
                        current_text = []
                    elif line.strip() and current_timestamp is not None:
                        # This is text content
                        current_text.append(line.strip())
                    elif not line.strip() and current_timestamp is not None and current_text:
                        # End of a segment
                        text = ' '.join(current_text)
                        translation_segments.append((start_time, end_time, text))
                        current_timestamp = None
                
                # Add the last segment if there is one
                if current_timestamp is not None and current_text:
                    text = ' '.join(current_text)
                    translation_segments.append((start_time, end_time, text))
        except Exception as e:
            st.error(f"Error parsing translation: {e}")
    
    # Function to find the current segment based on timestamp
    def find_current_segment(timestamp, segments):
        for start, end, text in segments:
            if start <= timestamp <= end:
                return text
        
        # If no exact match, find the closest segment
        if segments:
            closest_segment = min(segments, key=lambda x: abs(x[0] - timestamp))
            return closest_segment[2]
        
        return "No transcript segment available for this timestamp"
    
    # Audio player section
    st.subheader("Audio Player")
    
    if Path(audio_path).exists():
        # Read the audio file
        try:
            with open(audio_path, "rb") as audio_file:
                audio_bytes = audio_file.read()
            
            # Display the audio player
            st.audio(audio_bytes, format="audio/mp3")
            
            # Find and display the current segment text
            if transcript_segments:
                current_segment_text = find_current_segment(st.session_state.current_timestamp, transcript_segments)
                st.markdown(f"**Japanese:** {current_segment_text}")
            
            # Find and display the current translation text
            if translation_segments:
                current_translation_text = find_current_segment(st.session_state.current_timestamp, translation_segments)
                st.markdown(f"**English:** {current_translation_text}")
            
            # Add a timestamp slider to manually select position
            selected_time = st.slider(
                "Select timestamp (seconds)",
                min_value=0.0,
                max_value=float(duration_seconds),
                value=st.session_state.current_timestamp,
                step=1.0,
                format="%.1f",
                help="Drag to select a specific timestamp in the audio"
            )
            
            # Update the session state and display current segment if slider value changed
            if selected_time != st.session_state.current_timestamp:
                st.session_state.current_timestamp = selected_time
                # We'll use rerun to update the display with the new segment
                st.rerun()
                
            # Format the selected time as MM:SS
            selected_min = int(selected_time) // 60
            selected_sec = int(selected_time) % 60
            selected_time_str = f"{selected_min}:{selected_sec:02d}"
            
            st.info(f"Current position: {selected_time_str} (Note: You'll need to manually seek in the player)")
            
        except Exception as e:
            st.error(f"Error loading audio file: {e}")
    else:
        st.error(f"Audio file not found: {audio_path}")

    # Transcript section
    st.subheader("Transcript")
    if source["transcript_path"] and Path(source["transcript_path"]).exists():
        try:
            with open(source["transcript_path"], encoding="utf-8") as f:
                transcript_content = f.read()

            # Display the transcript in an expandable section
            with st.expander("Transcript Content", expanded=True):
                # Check if it's a JSON transcript
                if source["transcript_path"].endswith('.json'):
                    from backend.audio_processor import format_json_transcript_for_display
                    formatted_transcript = format_json_transcript_for_display(transcript_content)
                    
                    # For JSON transcripts, try to extract segments and make them clickable
                    import json
                    try:
                        transcript_data = json.loads(transcript_content)
                        if "segments" in transcript_data:
                            st.write("Click on a segment to set the current timestamp:")
                            
                            for segment in transcript_data["segments"]:
                                start_time = segment.get("start", 0)
                                end_time = segment.get("end", 0)
                                text = segment.get("text", "")
                                
                                # Format timestamp as [MM:SS.ms]
                                start_min = int(start_time) // 60
                                start_sec = int(start_time) % 60
                                start_ms = int((start_time - int(start_time)) * 1000)
                                
                                timestamp = f"[{start_min:02d}:{start_sec:02d}.{start_ms:03d}]"
                                
                                # Create a clickable segment
                                if st.button(f"{timestamp} {text}", key=f"segment_{start_time}"):
                                    st.session_state.current_timestamp = start_time
                                    st.rerun()
                        else:
                            # Fallback to displaying the formatted transcript
                            st.text(formatted_transcript)
                    except json.JSONDecodeError:
                        # Fallback to displaying the formatted transcript
                        st.text(formatted_transcript)
                elif source["transcript_path"].endswith('.vtt'):
                    # For WebVTT, parse and make timestamps clickable
                    lines = transcript_content.split('\n')
                    current_timestamp = None
                    current_text = []
                    segments = []
                    
                    # Parse WebVTT content
                    for line in lines:
                        if '-->' in line:
                            # This is a timestamp line
                            current_timestamp = line.strip()
                            current_text = []
                        elif line.strip() and current_timestamp is not None:
                            # This is text content
                            current_text.append(line.strip())
                        elif not line.strip() and current_timestamp is not None and current_text:
                            # End of a segment
                            segments.append((current_timestamp, ' '.join(current_text)))
                            current_timestamp = None
                    
                    # Add the last segment if there is one
                    if current_timestamp is not None and current_text:
                        segments.append((current_timestamp, ' '.join(current_text)))
                    
                    # Display clickable segments
                    if segments:
                        st.write("Click on a segment to set the current timestamp:")
                        for i, (timestamp, text) in enumerate(segments):
                            # Extract start time in seconds
                            try:
                                start_time_str = timestamp.split('-->')[0].strip()
                                # Parse HH:MM:SS.mmm format
                                parts = start_time_str.split(':')
                                if len(parts) == 3:
                                    hours, minutes, seconds = parts
                                    seconds, milliseconds = seconds.split('.')
                                    start_time = (int(hours) * 3600 + 
                                                int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                                else:
                                    minutes, seconds = parts
                                    seconds, milliseconds = seconds.split('.')
                                    start_time = (int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                            except Exception:
                                # If parsing fails, use segment index as fallback
                                start_time = i * 5  # Assume 5 seconds per segment
                            
                            # Create a clickable segment
                            if st.button(f"{timestamp} {text}", key=f"vtt_segment_{i}"):
                                st.session_state.current_timestamp = start_time
                                st.rerun()
                    else:
                        # Fallback to displaying the raw content
                        st.text(transcript_content)
                elif source["transcript_path"].endswith('.srt'):
                    # For SRT, parse and make timestamps clickable
                    lines = transcript_content.split('\n')
                    segments = []
                    i = 0
                    
                    # Parse SRT content
                    while i < len(lines):
                        if i + 2 < len(lines) and '-->' in lines[i+1]:
                            # This is a timestamp line
                            timestamp = lines[i+1].strip()
                            
                            # Collect text lines
                            text_lines = []
                            j = i + 2
                            while j < len(lines) and lines[j].strip():
                                text_lines.append(lines[j].strip())
                                j += 1
                                
                            text = ' '.join(text_lines)
                            segments.append((timestamp, text))
                            i = j
                        else:
                            i += 1
                    
                    # Display clickable segments
                    if segments:
                        st.write("Click on a segment to set the current timestamp:")
                        for i, (timestamp, text) in enumerate(segments):
                            # Extract start time in seconds
                            try:
                                start_time_str = timestamp.split('-->')[0].strip()
                                # Parse HH:MM:SS,mmm format (SRT uses comma instead of period)
                                parts = start_time_str.split(':')
                                if len(parts) == 3:
                                    hours, minutes, seconds = parts
                                    seconds, milliseconds = seconds.split(',')
                                    start_time = (int(hours) * 3600 + 
                                                int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                                else:
                                    minutes, seconds = parts
                                    seconds, milliseconds = seconds.split(',')
                                    start_time = (int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                            except Exception:
                                # If parsing fails, use segment index as fallback
                                start_time = i * 5  # Assume 5 seconds per segment
                            
                            # Create a clickable segment
                            if st.button(f"{timestamp} {text}", key=f"srt_segment_{i}"):
                                st.session_state.current_timestamp = start_time
                                st.rerun()
                    else:
                        # Fallback to displaying the raw content
                        st.text(transcript_content)
                else:
                    # For other formats, just display the content
                    st.text(transcript_content)
        except Exception as e:
            st.error(f"Error reading transcript: {e}")
    else:
        st.info("Transcript not available.")

    # Translation section
    st.subheader("Translation")
    if source["translation_path"] and Path(source["translation_path"]).exists():
        try:
            with open(source["translation_path"], encoding="utf-8") as f:
                translation_content = f.read()

            # Display the translation in an expandable section
            with st.expander("Translation Content", expanded=True):
                # For WebVTT translations, parse and make timestamps clickable
                if source["translation_path"].endswith('.vtt'):
                    lines = translation_content.split('\n')
                    current_timestamp = None
                    current_text = []
                    segments = []
                    
                    # Parse WebVTT content
                    for line in lines:
                        if '-->' in line:
                            # This is a timestamp line
                            current_timestamp = line.strip()
                            current_text = []
                        elif line.strip() and current_timestamp is not None:
                            # This is text content
                            current_text.append(line.strip())
                        elif not line.strip() and current_timestamp is not None and current_text:
                            # End of a segment
                            segments.append((current_timestamp, ' '.join(current_text)))
                            current_timestamp = None
                    
                    # Add the last segment if there is one
                    if current_timestamp is not None and current_text:
                        segments.append((current_timestamp, ' '.join(current_text)))
                    
                    # Display clickable segments
                    if segments:
                        st.write("Click on a segment to set the current timestamp:")
                        for i, (timestamp, text) in enumerate(segments):
                            # Extract start time in seconds
                            try:
                                start_time_str = timestamp.split('-->')[0].strip()
                                # Parse HH:MM:SS.mmm format
                                parts = start_time_str.split(':')
                                if len(parts) == 3:
                                    hours, minutes, seconds = parts
                                    seconds, milliseconds = seconds.split('.')
                                    start_time = (int(hours) * 3600 + 
                                                int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                                else:
                                    minutes, seconds = parts
                                    seconds, milliseconds = seconds.split('.')
                                    start_time = (int(minutes) * 60 + 
                                                int(seconds) + 
                                                int(milliseconds) / 1000)
                            except Exception:
                                # If parsing fails, use segment index as fallback
                                start_time = i * 5  # Assume 5 seconds per segment
                            
                            # Create a clickable segment
                            if st.button(f"{timestamp} {text}", key=f"translation_segment_{i}"):
                                st.session_state.current_timestamp = start_time
                                st.rerun()
                    else:
                        # Fallback to displaying the raw content
                        st.text(translation_content)
                else:
                    # For other formats, just display the content
                    st.text(translation_content)
        except Exception as e:
            st.error(f"Error reading translation: {e}")
    else:
        st.info("Translation not available.")


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
        # Determine current status based on path fields
        if is_in_error_state(source):
            status_text = "Error"
        elif is_ready_for_study(source):
            status_text = "Completed"
        elif is_ready_for_translation(source):
            status_text = "Ready for Translation"
        elif is_ready_for_transcription(source):
            status_text = "Ready for Transcription"
        else:
            status_text = "Pending"
        
        st.text(f"Current Status: {status_text}")
    with progress_col:
        # Calculate progress using helper function
        progress = get_processing_progress(source)
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
        if is_ready_for_transcription(source):
            col1, col2 = st.columns([3, 1])
            with col1:
                st.info("Ready to start transcription")
                st.caption(
                    f"Note: Audio files must be less than {MAX_FILE_SIZE_MB}MB for transcription"
                )
                
                # Add format selection
                format_option = st.selectbox(
                    "Transcription Format:",
                    options=["json", "verbose_json", "webvtt", "srt", "text"],
                    index=2,  # Set WebVTT as default (index 2)
                    help="Select the output format for transcription",
                    key="start_format",
                    format_func=lambda x: {
                        "json": "JSON",
                        "verbose_json": "Verbose JSON",
                        "webvtt": "WebVTT",
                        "srt": "SRT",
                        "text": "Plain Text"
                    }.get(x, x)
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

                            # Generate the output path based on selected format
                            title = Path(audio_path).stem
                            if format_option == "json":
                                transcript_path = f"media/transcripts/{title}.json"
                            elif format_option == "verbose_json":
                                transcript_path = f"media/transcripts/{title}.verbose.json"
                            elif format_option == "webvtt":
                                transcript_path = f"media/transcripts/{title}.vtt"
                            elif format_option == "srt":
                                transcript_path = f"media/transcripts/{title}.srt"
                            else:
                                transcript_path = f"media/transcripts/{title}.txt"

                            # Transcribe the audio
                            transcript, output_path = transcribe_audio(
                                file_path=audio_path,
                                output_path=transcript_path,
                                format=format_option,  # Use the selected format
                            )

                            # Update the database with transcript path only
                            # Status remains "pending" in the simplified model
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="pending",  # Keep as pending
                                transcript_path=output_path,
                            )

                            # Show success message
                            st.success("Transcription completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during transcription: {e}")
                        # Update with error status
                        update_source_status(
                            doc_id=int(st.session_state.process_target_id),
                            status="error",
                        )
        elif source["transcript_path"]:
            st.success("✓ Transcription Complete")
            st.caption(f"Transcript: {source['transcript_path']}")

            # Add buttons to view and rerun transcription
            col1, col2 = st.columns(2)
            with col1:
                if st.button("View Transcript", key="view_transcript"):
                    transcript_path = source["transcript_path"]
                    try:
                        with open(transcript_path, encoding="utf-8") as f:
                            transcript_content = f.read()

                        # Display the transcript in an expandable section
                        with st.expander("Transcript Content", expanded=True):
                            # Check if it's a JSON transcript
                            if transcript_path.endswith('.json'):
                                from backend.audio_processor import format_json_transcript_for_display
                                formatted_transcript = format_json_transcript_for_display(transcript_content)
                                st.text(formatted_transcript)
                            else:
                                st.text(transcript_content)
                    except Exception as e:
                        st.error(f"Error reading transcript: {e}")
            with col2:
                # Add format selection above the button
                format_option = st.selectbox(
                    "Transcription Format:",
                    options=["json", "verbose_json", "webvtt", "srt", "text"],
                    index=2,  # Set WebVTT as default (index 2)
                    help="Select the output format for transcription",
                    key="rerun_format",
                    format_func=lambda x: {
                        "json": "JSON",
                        "verbose_json": "Verbose JSON",
                        "webvtt": "WebVTT",
                        "srt": "SRT",
                        "text": "Plain Text"
                    }.get(x, x)
                )
                
                if st.button("Rerun Transcription", key="rerun_transcription"):
                    st.session_state.transcription_started = True

                    # Implement transcription logic
                    try:
                        with st.spinner("Transcribing audio... This may take a while."):
                            from backend import transcribe_audio

                            # Get the audio file path
                            audio_path = source["download_path"]

                            # Generate the output path based on selected format
                            title = Path(audio_path).stem
                            if format_option == "json":
                                transcript_path = f"media/transcripts/{title}.json"
                            elif format_option == "verbose_json":
                                transcript_path = f"media/transcripts/{title}.verbose.json"
                            elif format_option == "webvtt":
                                transcript_path = f"media/transcripts/{title}.vtt"
                            elif format_option == "srt":
                                transcript_path = f"media/transcripts/{title}.srt"
                            else:
                                transcript_path = f"media/transcripts/{title}.txt"

                            # Transcribe the audio
                            transcript, output_path = transcribe_audio(
                                file_path=audio_path,
                                output_path=transcript_path,
                                format=format_option,  # Use the selected format
                            )

                            # Update the database with transcript path only
                            # Status remains "pending" in the simplified model
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="pending",  # Keep as pending
                                transcript_path=output_path,
                            )

                            # Show success message
                            st.success("Transcription completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during transcription: {e}")
                        # Update with error status
                        update_source_status(
                            doc_id=int(st.session_state.process_target_id),
                            status="error",
                        )
        else:
            st.info("Waiting for transcription...")

        st.divider()

        # Step 2: Translation
        st.markdown("### Step 2: Translate Text")
        if is_ready_for_translation(source):
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
                            translation_path = f"media/translations/{title}.vtt"

                            # Translate the audio directly to English
                            translation, output_path = translate_audio(
                                file_path=audio_path, output_path=translation_path
                            )

                            # Update the database with translation path and set status to "completed"
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="completed",  # Mark as completed after translation
                                translation_path=output_path,
                            )

                            # Show success message
                            st.success("Translation completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during translation: {e}")
                        # Update with error status
                        update_source_status(
                            doc_id=int(st.session_state.process_target_id),
                            status="error",
                        )
        elif source["translation_path"]:
            st.success("✓ Translation Complete")
            st.caption(f"Translation: {source['translation_path']}")

            # Add buttons to view and rerun translation
            col1, col2 = st.columns(2)
            with col1:
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
            with col2:
                if st.button("Rerun Translation", key="rerun_translation"):
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
                            translation_path = f"media/translations/{title}.vtt"

                            # Translate the audio directly to English
                            translation, output_path = translate_audio(
                                file_path=audio_path, output_path=translation_path
                            )

                            # Update the database with translation path and set status to "completed"
                            update_source_status(
                                doc_id=int(st.session_state.process_target_id),
                                status="completed",  # Mark as completed after translation
                                translation_path=output_path,
                            )

                            # Show success message
                            st.success("Translation completed successfully!")
                            st.rerun()  # Refresh the page to show updated status

                    except Exception as e:
                        st.error(f"Error during translation: {e}")
                        # Update with error status
                        update_source_status(
                            doc_id=int(st.session_state.process_target_id),
                            status="error",
                        )
        else:
            st.info("Waiting for translation...")
            if not source["transcript_path"]:
                st.caption("⚠️ Complete transcription first")

        st.divider()

    # Error handling and retry options
    if is_in_error_state(source):
        st.divider()
        st.error(
            "An error occurred during processing. "
            "Please try again or contact support if the problem persists."
        )
        if st.button("Retry Processing"):
            # Reset error state and retry from last successful step
            update_source_status(
                doc_id=int(st.session_state.process_target_id),
                status="pending",  # Reset to pending
            )
            st.rerun()


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
