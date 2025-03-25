# Youtube Transcript Downloader

"""
This script is used to download the transcript of a YouTube video.

- Extracts the video ID from various YouTube URL formats
- Attempts to get the transcript in the specified language
- Falls back to translation if the language isn't directly available
- Formats the transcript with timestamps
- Can output to a file or to the console

Setup:
$ pip install youtube-transcript-api

https://youtu.be/8jmVBCp2kK4

Print transcript to console:
$ python youtube_transcript_dl.py https://www.youtube.com/watch?v=VIDEO_ID

Save transcript to a file:
$ python youtube_transcript_dl.py https://www.youtube.com/watch?v=VIDEO_ID -o transcript.txt

Specify a different language (e.g., Spanish):
$ python youtube_transcript_dl.py https://www.youtube.com/watch?v=VIDEO_ID -l es
"""

#!/usr/bin/env python
import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi
import re
import argparse

def extract_video_id(url):
    """Extract the video ID from various YouTube URL formats."""
    print(f"Parsing URL: {url}")
    # Patterns for different YouTube URL formats
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/e\/|youtube\.com\/shorts\/|youtube\.com\/live\/|youtube\.com\/watch\?.*v=)([^&\?\/\s]+)',
        r'youtube\.com\/watch\?.*\bv=([^&\?\/\s]+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            video_id = match.group(1)
            print(f"Extracted video ID: {video_id}")
            return video_id
    
    # If no pattern matches but the input might already be a video ID
    if re.match(r'^[a-zA-Z0-9_-]{11}$', url):
        print(f"Input appears to be a video ID already: {url}")
        return url
    
    print(f"Could not extract video ID from: {url}")
    return None

def save_transcript(transcript, output_file=None):
    """Format and save transcript, either to a file or print to console."""
    formatted_transcript = ""
    
    for entry in transcript:
        time_seconds = int(entry['start'])
        minutes = time_seconds // 60
        seconds = time_seconds % 60
        timestamp = f"[{minutes:02d}:{seconds:02d}]"
        
        formatted_transcript += f"{timestamp} {entry['text']}\n"
    
    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(formatted_transcript)
        print(f"Transcript saved to {output_file}")
    else:
        print(formatted_transcript)

def get_available_languages(video_id):
    """Get a list of available transcript languages for a video."""
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        available_languages = {}
        
        # Get manually created transcripts
        for transcript in transcript_list._manually_created_transcripts.values():
            available_languages[transcript.language_code] = {
                'name': transcript.language, 
                'type': 'MANUALLY CREATED',
                'translatable': transcript.is_translatable
            }
        
        # Get generated transcripts
        for transcript in transcript_list._generated_transcripts.values():
            available_languages[transcript.language_code] = {
                'name': transcript.language, 
                'type': 'GENERATED',
                'translatable': transcript.is_translatable
            }
            
        return available_languages
    except Exception as e:
        print(f"Error retrieving available languages: {str(e)}")
        return {}

def display_available_languages(video_id):
    """Display available transcript languages for the video."""
    available_languages = get_available_languages(video_id)
    
    if not available_languages:
        print("Could not retrieve information about available languages.")
        return
    
    print("\nAvailable transcript languages for this video:")
    print("----------------------------------------------")
    
    # Group by type
    manually_created = []
    generated = []
    
    for lang_code, info in available_languages.items():
        if info['type'] == 'MANUALLY CREATED':
            manually_created.append((lang_code, info))
        else:
            generated.append((lang_code, info))
    
    # Display manually created
    if manually_created:
        print("\nMANUALLY CREATED:")
        for lang_code, info in manually_created:
            translatable = "[TRANSLATABLE]" if info['translatable'] else ""
            print(f" - {lang_code} (\"{info['name']}\") {translatable}")
    
    # Display generated
    if generated:
        print("\nGENERATED:")
        for lang_code, info in generated:
            translatable = "[TRANSLATABLE]" if info['translatable'] else ""
            print(f" - {lang_code} (\"{info['name']}\") {translatable}")
    
    print("\nIf a transcript is marked as [TRANSLATABLE], you can request it in other languages.")
    print("----------------------------------------------")

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Download YouTube video transcript.')
    parser.add_argument('url', help='YouTube video URL or video ID')
    parser.add_argument('-o', '--output', help='Output file (default: print to console)')
    parser.add_argument('-l', '--language', default='en', help='Language code (default: en)')
    parser.add_argument('--list-languages', action='store_true', 
                        help='List available languages for the video and exit')
    parser.add_argument('--translate-from', help='Use translation from this language code')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Extract video ID from URL
    video_id = extract_video_id(args.url)
    if not video_id:
        print("Error: Could not extract video ID from the provided URL")
        sys.exit(1)
    
    # If user wants to list available languages
    if args.list_languages:
        display_available_languages(video_id)
        return
    
    print(f"Downloading transcript for video ID: {video_id}")
    
    # If user specified a translation source
    if args.translate_from:
        try:
            print(f"Attempting to translate from {args.translate_from} to {args.language}")
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            transcript = transcript_list.find_transcript([args.translate_from])
            
            if transcript.is_translatable:
                translated_transcript = transcript.translate(args.language)
                transcript_data = translated_transcript.fetch()
                save_transcript(transcript_data, args.output)
                return
            else:
                print(f"The {args.translate_from} transcript is not translatable. Falling back to standard methods.")
        except Exception as e:
            print(f"Translation attempt failed: {str(e)}")
            print("Falling back to standard transcript retrieval methods.")
    
    # Try different language options
    # If user specified a language, try that first, then fallbacks
    language_options = []
    if args.language:
        language_options.append(args.language)
    
    # Add fallback languages if the specified one isn't 'en'
    if args.language != 'en':
        language_options.extend(['en', 'en-US', 'en-GB'])
    # If the specified is 'en', add variants
    elif args.language == 'en':
        language_options.extend(['en-US', 'en-GB'])
    
    # Add None as last resort
    language_options.append(None)
    
    # Remove duplicates while preserving order
    language_options = list(dict.fromkeys(language_options))
    
    success = False
    for lang in language_options:
        try:
            print(f"Trying language: {lang}")
            if lang:
                transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[lang])
            else:
                transcript = YouTubeTranscriptApi.get_transcript(video_id)
                
            save_transcript(transcript, args.output)
            success = True
            break  # Exit the loop if successful
            
        except Exception as e:
            if lang == language_options[-1]:  # If this is the last language option
                print(f"Failed to retrieve transcript after trying all language options: {str(e)}")
            else:
                print(f"Failed with language {lang}, trying next option. Error: {str(e)}")
                continue
    
    if not success:
        print("Could not retrieve the transcript for this video.")
        print("\nAvailable languages for this video:")
        display_available_languages(video_id)

if __name__ == "__main__":
    main()