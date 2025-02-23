We are building a streamlit application that allows users to specify the URL for a Japanese podcast episode. The tool will download the audio for the episode and then use AI (STT) to create a transcript of the podcast as well as a translation in English.  It will then recreate new audio of the podcast using TTS techniques, offering it for the user to listen to while reading the Japanese transcript.  At any point, the user can query parts of the transcript to get the English translation.

The application will be built using Python and Streamlit.

There is a "frontend" folder that contains the Streamlit application.

There is a "backend" folder that contains the code to download the transcript from the YouTube video.

Can you assist me in creating a new PRD for this project in the @PRD.md file?



Let's create a simple Streamlit application, just the shell for now, in the "frontend" folder. It should reference the python package we write in the "backend" folder. Feel free to add the `__init__.py` file to the "backend" folder and have the streamlit app import the functions from the package to implement something along the lines of a "Hello World" application.