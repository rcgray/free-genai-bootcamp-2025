We are building a streamlit application that allows users to specify the URL for a Japanese podcast episode. The tool will download the audio for the episode and then use AI (STT) to create a transcript of the podcast as well as a translation in English.  It will then recreate new audio of the podcast using TTS techniques, offering it for the user to listen to while reading the Japanese transcript.  At any point, the user can query parts of the transcript to get the English translation.

The application will be built using Python and Streamlit.

There is a "frontend" folder that contains the Streamlit application.

There is a "backend" folder that contains the code to download the transcript from the YouTube video.

Can you assist me in creating a new PRD for this project in the @PRD.md file?



Let's create a simple Streamlit application, just the shell for now, in the "frontend" folder. It should reference the python package we write in the "backend" folder. Feel free to add the `__init__.py` file to the "backend" folder and have the streamlit app import the functions from the package to implement something along the lines of a "Hello World" application.

---

We have a Streamlit application with a file structure documented in @Project-File-Structure.md and a PRD defined in `docs/PRD.md`.

I would like to introduce a TinyDB database to the project to manage the audio sources that the user downloads and transcribes/translates. The db file should live at `data/app.json`.  I've never worked with TinyDB before, but we will want to set up a schema and seeding data, as well as some scripts for resetting the database (i.e., for testing). Can you assist me in adding this to the project? We don't have to do all this in one shot, we can start with introducing the dependency and then go step by step.



---

We have a Streamlit application with a file structure documented in @Project-File-Structure.md and a PRD defined in `docs/PRD.md`. We have integrated a database using TinyDB with the schema defined in `docs/Database-Schema.md`. Our technical spec is in `docs/Technical-Spec.md` and our frontend design is in `docs/Frontend-Design.md`. We have an action plan in `docs/Action-Plan.md`, which is what we are following (currently Phase 1.3). We don't have to do everything in one shot, we can go step by step.

I presume most of our work will be done in the `frontend` folder. Let's continue with our Basic Frontend Shell.  What kind of views do we need, and what kind of state management and routing do we need to implement?

 ---

We have a Streamlit application with a file structure documented in `docs/reports/Project-File-Structure.md` and a PRD defined in `docs/PRD.md`. We have integrated a database using TinyDB with the schema defined in `docs/Database-Schema.md`. Our technical spec is in `docs/Technical-Spec.md` and our frontend design is in `docs/Frontend-Design.md`. We have an action plan in `docs/Action-Plan.md`, which is what we are following (currently Phase 2.4 and skipping optional features in previous phases). We don't have to do everything in one shot, we can go step by step.

Let's start working on our Process Content page. For every new source that we download, we will need to perform three steps, currently outlined in the page. These should be presented as separate steps with either a button or a "complete" message. Only the next step should have an active button. We'll be able to tell what step any item is on by the database

- Step 1 is to transcribe the audio content into a transcript file, which will create a transcription txt file in `media/transcripts` for that title and will also have its "transcript_path" field in the database non-null (i.e., it will be set to the proper path). We will want this to be in some form of timestamped text file that we can use to create an interactive audio experience. This may be in something like WebVTT or TTML format, which we'll figure out as we implement this step.
- Step 2 is to translate the transcript from Japanese to English. Whatever timestamp format we use for the transcript, we'll want to use the same format for the translated transcript. This will create a translation txt file in `media/translations` for that title, and the database entry for this item will also have its "translation_path" field in the database non-null and set to the proper path.
- Step 3 is to create a new audio file from the translated transcript. This will create an mp3 file in `media/audio` for that title and will also have its "audio_path" field in the database non-null (i.e., set to the proper path).

This is our plan for developing the Process Content and also provides the cues for how the app should be able to tell what stage of processing any item is on. Let's add this information to the `docs/Frontend-Design.md` file and our plan for implementing this in steps to the `docs/Action-Plan.md` file.

---

Let's add a new source type, which will exist between "Podcast URL (.mp3)" and "Youtube" (which is still NYI) called "Local File (.mp3)".  When the user selects to add content for a local file, we will want to change the form element that says "Enter audio source URL" to say "Select a file from your computer" and add a button below the text field that opens the system's file selection dialog. Returning from the dialog should populate the text field with the path to the selected file.

The validation for this form should also be updated to include the new source type. For instance, it should check that the file exists and is an mp3 file.

The file should be copied to the `media/sources` folder using the Title as the filename (just as with the podcast URL case), and a new database entry should be made just like in the case of a podcast URL, except the "url" field will be populated with simply the string "Local File".

---

Let's create a new file in the `backend` package called `audio_processor.py`. This file will contain the code to process the audio file and create the transcript, translation, and audio files.  We should start first with a function that will take a path to an audio file and return the duration of the file in seconds (to the nearest second).

Let's write a test for this function. In general, we will use audio item #3 in our database (Reira_Warning_Audio.mp3) as our test audio file for this and other tasks unless otherwise specified. Let's find the length of this audio using our new function, which should be 15 seconds.

---

we're working.  ok, now let's create a function in our audio_processor.py that will take the path to an mp3 file and return translated text for it.  in this function, we will be calling out to OpenAI's translation service API.  This is a big step and may involve many smaller steps.  For instance, there are probably new libraries we need to install (be sure we update our pyproject.toml file).  We will also need to set up the OpenAI API key as an environment variable. Creating a `.env` file means we also need to create a `.env.example` file and update our instructions in the README.md file.  We can do this in steps or all at once, up to you.


---

it's ok, that simply existed in the database before we came up with these named states for the workflow.  originally it was just supposed to be "pending" (missing transcription or translation) or "complete" (ready to study).  a database entry would not exist at all unless the file had been successfully imported.  the sub-state of pending would depend on whether "transcript_path" or "translation_path" was null, since they would only be updated once the file was successfully created.  It seems we've gone a different direction in implementing this, so the question is which one should we go with?

---

I am leaning toward the original design.  not creating a database entry until we have the file successfully prevents issues where a download failed but now the user can't try again because "an entry with that title already exists".  as far as the UI goes, we can still use the transcript_path/translation_path is null method easily by encapsulation (e.g., a function) to keep decisions around frontend button display clean. it also is better bound to ground truth, where the status of an audio item is determined by the presence of the performed work and not an accidental database change.  however, i see the advantages about being future-proof and robust.  i'm not making a decision yet, i'm just curious if this changes your recommendation

---

I've decided to make sure our core code works before worrying about end-to-end scenarios. we have some tests set up for this, but they are currently skipped.  I like keeping them skipped so that they don't run every time we run tests (e.g., multiple pre-commit hooks, etc.), so can we look into marking them for conditional running.

Right now we disable them with @pytest.mark.skip(reason="Requires OpenAI API key and credits"). Let's get a little more sophisticated.  First, we will define a custom marker for API-dependent tests, say defining pytest.mark.api in our pytest_configure() function. Second, we mark our API-dependent tests with this marker (e.g., @pytest.mark.api). Third, we add code to automatically skip these tests by default in conftest.py, something like:
```
def pytest_runtest_setup(item):
    # Skip API tests by default unless --run-api option is provided
    if "api" in item.keywords and not item.config.getoption("--run-api"):
        pytest.skip("API test skipped. Use --run-api to run")
```
and fourth, in conftest.py we add a command line option to our pytest invocation to enable running the API-dependent tests, something like:
```
def pytest_addoption(parser):
    parser.addoption(
        "--run-api", 
        action="store_true",
        default=False,
        help="Run tests that require API calls and may incur costs"
    )
```
This way running `pytest` will skip the API-dependent tests by default, but we can run them explicitly with `pytest --run-api`.


