# Prompt Notes

Here are some notes to consider as part of every prompt as we develop our project. They cover preferences for communication, tool use, project structure, and other topics relevant to nearly all of the communciation between the AI agent and the human developer.

For the human developer, this is intended to be a project- AND machine-specific file separate from `.cursorrules` that:

1. Allows us to add new items when mistakes are discovered in communicating with the AI or when particular dev decisions (such as division of labor among components) need to be made.
2. Allows for machine-specific directions (e.g., conda environments on Windows and python venv on MacOS).

This file differs from .cursorrules in that it is meant to be constructed over the life of a project through the course of discovering project-specific preferences and choices. Some critical prompt rules (that don't seem to be sufficiently affected by .cursorrules) are also repeated as well.

## General Guidelines
- DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED IN THE PROMPT. You may be given access to an "Action-Plan.md" file, which is a list of completed tasks as well as those ahead of us. Access to this file or a request to update a particular section of it is not license to continue on to the next task. Just because a file is called "Action Plan" does not mean that those actions are all meant for you to complete.
- Always stop at [CHECKPOINT] instructions in any Action Plan (Project-Setup.md, Action-Plan.md, feature spec action plan, etc.). These are designed for the human developer to verify that the AI is on track to complete the project. Do not perform any actions beyond those requested in the checkpoint instructions, and do not continue on to the next task until the human developer has verified that the current task is complete.
- You will always be working from a list of instructions from a file (e.g., `docs/Action-Plan.md`, or earlier in the project `Project-Setup.md`). After you complete the current task, always update the steps in the file to reflect the current state of the project. If we intentionally skip a step, make sure to mark the item as `[~]` so we can track that intentional decision.
- Do not edit any files in the `docs/read-only` folder, which include files such as `Prompt-Header.md` and `Prompts.md`. Files in this folder are generated and maintained only by the user. You may read these files, but do not edit them.

## Command Line Interface
- We are using a conda environment called `vn` so please include activating that environment in your commands.
- We are using `uv` to manage our Python dependencies, so please configure your commands accordingly (e.g., `uv sync` or `uv sync --extra dev` to install dependencies, `uv run <script>` to run a script, `uv run pytest` to run tests, etc.).
- Create commands from the root of the project. There are some config files in the root of the project that dictate how certain components run (for example, `.streamlit/config.toml`). If you attempt to `cd app` and then `uv run streamlit run main.py`, our config will not be applied. Instead, run your commands from the project root: `uv run streamlit run app/main.py`.
- Include a "💻" emoji at the start of your response (perhaps along with other emojis indicating other rule acknowledgements) to indicate that you understand these Command Line Interface guidelines, so I'll know whether or not I need to remind you of this `Prompt-Header.md` file.

## Coding Guidelines
- This project must be portable, so it is absolutely unacceptable to use full paths (i.e., from the `/home/user` directory or the `C:\` directory) in your commands.  Instead, use relative paths from the project root directory such that this project can be run on any other machine.

## Project-SpecificDesign Guidelines
- In general, we will want to implement as much of our project within the Phaser game, not the Streamlit wrapper.  We may add some utilities and UI outside the game to aid development, but the goal for now is to minimize the Streamlit wrapper and intend to implement as much as possible within the Phaser game itself.
- If adding images to the game, and the game file does not exist, add it to the code anyway. Then, create an image file of the appropriate size and name using the CLI utility `convert` (ImageMagick).
