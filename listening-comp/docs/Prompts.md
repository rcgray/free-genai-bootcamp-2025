We are building a streamlit application that allows users to specify the URL for a Japanese podcast episode. The tool will download the audio for the episode and then use AI (STT) to create a transcript of the podcast as well as a translation in English.  It will then recreate new audio of the podcast using TTS techniques, offering it for the user to listen to while reading the Japanese transcript.  At any point, the user can query parts of the transcript to get the English translation.

The application will be built using Python and Streamlit.

There is a "frontend" folder that contains the Streamlit application.

There is a "backend" folder that contains the code to download the transcript from the YouTube video.

Can you assist me in creating a new PRD for this project in the @PRD.md file?



Let's create a simple Streamlit application, just the shell for now, in the "frontend" folder. It should reference the python package we write in the "backend" folder. Feel free to add the `__init__.py` file to the "backend" folder and have the streamlit app import the functions from the package to implement something along the lines of a "Hello World" application.


We have a Streamlit application with a file structure documented in @Project-File-Structure.md and a PRD defined in `docs/PRD.md`. I would like to introduce a TinyDB database to the project to manage the audio sources that the user downloads and transcribes/translates. The db file should live at `data/app.json`.  I've never worked with TinyDB before, but we will want to set up a schema and seeding data, as well as some scripts for resetting the database (i.e., for testing). Can you assist me in adding this to the project? We don't have to do all this in one shot, we can start with introducing the dependency and then go step by step.



