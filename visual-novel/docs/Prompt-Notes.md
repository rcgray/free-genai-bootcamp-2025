# Prompt Notes

Here are some notes to consider as part of every prompt as we develop our project. They cover preferences for communication, tool use, project structure, and other topics relevant to nearly all of the communciation between the AI agent and the human developer.

For the human developer, add new items when mistakes are discovered in communicating with the AI or when particular dev decisions (such as division of labor among compnents) need to be made. This file differs from .cursorrules in that it is meant to be constructed over the course of a project through the course of discovering these choices. Some critical prompt rules (that don't seem to be affected by .cursorrules) are also repeated as well.

## General Guidelines
- DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED IN THE PROMPT. You may be given access to an "Action-Plan.md" file, which is a list of completed tasks as well as those ahead of us. Access to this file or a request to update a particular section of it is not license to continue on to the next task. Just because a file is called "Action Plan" does not mean that those actions are all meant for you to complete.
- You will always be working from a list of instructions from a file (e.g., `docs/Action-Plan.md`, or earlier in the project `Project-Setup.md`). After you complete the current task, always update the steps in the file to reflect the current state of the project. If we intentionally skip a step, make sure to mark the item as `[~]` so we can track that intentional decision.

## Command Line Interface
- We are using a conda environment called `vn` so please include activating that environment in your commands.
- We are using `uv` to manage our Python dependencies, so please configure your commands accordingly (e.g., `uv sync` or `uv sync --extra dev` to install dependencies, `uv run <script>` to run a script, `uv run pytest` to run tests, etc.).

## Coding Guidelines
- This project must be portable, so it is absolutely unacceptable to use full paths (i.e., from the `/home/user` directory or the `C:\` directory) in your commands.  Instead, use relative paths from the project root directory such that this project can be run on any other machine.

## Project-SpecificDesign Guidelines
- In general, we will want to implement as much of our project within the Phaser game, not the Streamlit wrapper.  We may add some utilities and UI outside the game to aid development, but the goal for now is to minimize the Streamlit wrapper and intend to implement as much as possible within the Phaser game itself.
- If adding images to the game, and the game file does not exist, add it to the code anyway. Then, create an image file of the appropriate size and name using the CLI utility `convert` (ImageMagick).
