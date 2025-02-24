"""Utility functions for the application."""

import re
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def sanitize_filename(filename: str) -> str:
    """Convert a string into a safe filename.

    Args:
        filename: The string to convert

    Returns:
        A safe filename string
    """
    # Remove invalid characters
    filename = re.sub(r'[<>:"/\\|?*]', "", filename)
    # Replace spaces and other characters with underscores
    filename = re.sub(r"[\s\-]+", "_", filename)
    # Remove any non-ASCII characters
    filename = re.sub(r"[^\x00-\x7F]+", "", filename)
    # Ensure it's not too long
    return filename[:100]


def download_file(url: str, output_path: Path, chunk_size: int = 8192) -> None:
    """Download a file from a URL to the specified path.

    Args:
        url: The URL to download from
        output_path: Where to save the file
        chunk_size: Size of chunks to download in bytes

    Raises:
        ValueError: If the URL is invalid
        URLError: If there are network issues
        HTTPError: If there are HTTP errors (404, etc.)
        IOError: If there are file system issues
        Exception: For other unexpected errors
    """
    # Ensure the parent directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Set up request with a user agent to avoid some blocks
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    request = Request(url, headers=headers)

    try:
        with urlopen(request) as response:
            # Check content type
            content_type = response.headers.get("content-type", "").lower()
            if not content_type.startswith("audio/"):
                raise ValueError(
                    f"URL does not point to an audio file (content-type: {content_type})"
                )

            # Get file size if available
            file_size = response.headers.get("content-length")
            if file_size:
                file_size = int(file_size)

            # Download the file in chunks
            with open(output_path, "wb") as f:
                bytes_downloaded = 0
                while True:
                    chunk = response.read(chunk_size)
                    if not chunk:
                        break
                    f.write(chunk)
                    bytes_downloaded += len(chunk)

                # Verify file size if we know it
                if file_size and bytes_downloaded != file_size:
                    raise OSError(
                        f"Download incomplete. Expected {file_size} bytes but got "
                        f"{bytes_downloaded} bytes"
                    )

    except HTTPError as e:
        if output_path.exists():
            output_path.unlink()
        if e.code == 404:
            raise ValueError("File not found at the specified URL") from e
        raise HTTPError(
            e.url, e.code, f"HTTP error occurred: {e.reason}", e.headers, e.fp
        ) from e
    except URLError as e:
        if output_path.exists():
            output_path.unlink()
        raise URLError(f"Network error occurred: {e.reason}") from e
    except Exception:
        if output_path.exists():
            output_path.unlink()
        raise
