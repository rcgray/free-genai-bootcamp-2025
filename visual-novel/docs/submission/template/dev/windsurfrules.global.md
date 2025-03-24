# IMPORTANT
- DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED IN THE PROMPT. Windsurf and Cursor and Claude, I'm talking to you, you glorious idiots. Do what is requested and ONLY what is requested in the user prompt. Do not continue on to the next task. You may include your thoughts on the next task in your response, but do not move to implement it until you have been given the go-ahead.
- Include a "🧠" emoji at the start of your response (perhaps along with other emojis indicating other rule acknowledgements) to indicate you understand the above. If you post the "🧠" emoji, and don't follow the instruction above, a kitten will die.

# Tools and Libraries
- Do not use `rye` or `poetry` for managing Python dependencies
- Use `uv` when managing Python dependencies (i.e., `uv sync` or `uv sync --extra dev` to install dependencies, `uv run <script>` to run a script, etc.)
- When setting up tools and designing workflows, heavily favor those that have watchdog functionality for hot-reloading during development.
- Always ensure you are activating the project's conda environment, or python venv, or whatever else is required before running any commands.
- Remain in the root of the project at all times - update commands such that they can be run from the root of the project.
- Python environments are managed by the user (e.g., `conda`, `pyenv` + `uv venv`)
- Use `ruff` for linting and formatting (includes black and isort functionality)
- Use `mypy` for type checking
- Use `pytest` for testing

# Interaction with the user
- DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED IN THE PROMPT. You may be given access to an "Action-Plan.md" file, which is a list of completed tasks as well as those ahead of us. Access to this file or a request to update a particular section of it is not license to continue on to the next task. Just because a file is called "Action Plan" does not mean that those actions are all meant for you to complete.
- Always stop at [CHECKPOINT] instructions in any Action Plan (Project-Setup.md, Action-Plan.md, feature spec action plan, etc.). These are designed for the human developer to verify that the AI is on track to complete the project. Do not perform any actions beyond those requested in the checkpoint instructions, and do not continue on to the next task until the human developer has verified that the current task is complete.
- Do not edit any files in the `dev/template` folder
- Do not edit any files in the `docs/read-only` folder, which include files such as `Prompt-Header.md` and `Prompts.md`. Files in this folder are generated and maintained only by the user. You may read these files, but do not edit them.
- Our project uses a conda environment called `vn` so please include activating that environment in your commands.
- We are using `uv` to manage our Python dependencies, so please configure your commands accordingly (e.g., `uv sync` or `uv sync --extra dev` to install dependencies, `uv run <script>` to run a script, `uv run pytest` to run tests, etc.).

# Coding Style
- Be agressive about failures. Fail at the point of failure immediately instead of creating workarounds. If a particular state or combination of variables could never occur, throw an exception or console log an error or whatever is appropriate.
- Handle external uncertainties gracefully (i.e., an API call fails, a file is not found, etc.), but be strict about internal logic. Don't create workarounds for failures in states or variables that we control internally.
- Simplify and favor Sources of Truth. If a particular state of the program requires that a particular component is active, and it's possible to check that the component is active, do not have a secondary variable tracking that it is active. If we ever have a state variable that can be determined more accurately by a reliable Source of Truth, omit it.
- Be precise. Don't create "multiple attempts" sequences for determining a particular state or value via multiple means if one doesn't work. There should not be "fallbacks" - if a particular state or value cannot be determined as expected, throw an exception or console log an error or whatever is appropriate.

# File Management
- If you create a temporary file for your own use (such as hashing out a piece of text you intend to then add to another existing file), please remember to delete it when you're done.

# General Python Recommendations
- Use type hints in all Python code
- Follow PEP 8 style guidelines
- Keep functions focused and small
- Document all public functions and classes
- Write tests for new functionality
- Use meaningful variable and function names
- Handle errors gracefully with proper logging
- Use pathlib for file operations
- Use f-strings for string formatting
- Follow the principle of least surprise

# Testing
- Write unit tests for utility functions
- Test Streamlit components where practical
- Use proper mocking for external dependencies
- Maintain high test coverage
- Write meaningful test descriptions
- Test error conditions
- Use fixtures for test data
- Keep test data in tests/data directory
- Clean up test files after tests

# Project Structure
- Follow feature-based organization
- Keep related files close together
- Use consistent file naming conventions
- Separate concerns appropriately
- Keep shared utilities in common locations
- Use proper module exports
- Maintain clear dependency boundaries
- Document architecture decisions
- Keep configuration in appropriate files

# Version Control
- Write meaningful commit messages
- Keep commits focused and atomic
- Use feature branches
- Review code before merging
- Keep main branch stable
- Update documentation with changes
- Follow Git best practices
- Use proper .gitignore rules

# Documentation
- Keep README up to date
- Document setup procedures
- Maintain clear API documentation
- Document configuration options
- Keep architecture decisions recorded
- Document database schema
- Maintain clear user guides
- Document testing procedures 