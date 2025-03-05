 # Edit the prompts below and review them before submitting (some marked with @ require file linking)
---

We are setting up a new project, using some of the files from previous projects as a starting point. Please follow the instructions in `dev/template/Project-Setup.md` (@Project-Setup.md) up to Step 3.3 Dynamic Documentation, where we will then work together to generate the core project specifications files.

---
# git commit
# Run `python scripts/update_docs.py`
---

Perfectly done! Here is our new project file structure: (@Project-File-Structure.md) Now let's work together to generate the core project specifications files. Keep in mind that we are now working from the instructions in the copy of `Project-Setup.md` (@Project-Setup.md) in the root of the project folder that you have copied and edited.

We'll start with the `docs/PRD.md` file, and only the `docs/PRD.md` file. Don't forget that you can use the `dev/template/docs/PRD.md` file as a reference for the format of the new `docs/PRD.md` file for this project.

This project aims to create a game in Python that runs in the browser and operates similar to a Renpy visual novel. In fact, the closer we can make it to implementing Renpy's visual novel engine, the better. The game will be written in Japanese for English-speaking players that are looking to learn Japanese through gameplay. The game will be supported by a Large Language Model (LLM) that will be used to generate the dialog for the game and process study objectives such as pronunciation and translation.

The primary goals of this project are:
- (Functional) To create a simple engine for crafting web-based visual novel game experiences.
- (Design) To design a game that provides English-speaking players with a way to learn Japanese through gameplay.
- (Exploration) To explore the potential and limitations of LLMs as a design material for game development.

The game will consist of three scenes:

- Title Scene
- VN (visual novel) Scene
- Study Scene

The player will start on the Title Scene, which may have some options to toggle to customize the game experience (TBD). They will then click a button to start the VN Scene, which is where the majority of the game takes place. There are four UI elements in the VN Scene:

- A background image, such as a landscape or a room.
- Character sprites in front of the background image, showing a vignette of the character's face and body that the player is currently interacting with.
- A chat section in front of the background image and character sprites, where the character dialog is displayed.
- A selection of multiple-choice dialog options (max 3) that the player can click on as their choice of what their character says in the scene to the other characters.

Because this is a game intended for language learning, there will be opportunities in the VN Scene to select language (i.e., a phrase said by a character or the dialog options available to the player) and enter a focused study session for that phrase, which is where the Study Scene comes in. After completing the Study Scene, the player will return to the VN Scene, where the game will continue. These opportunities will be indicated by a button in the VN Scene next to the chat section.

The Study Scene will take the text associated with the portion of the dialog that the player chose to study and present it in a way that allows the player to examine it more closely. For example, with pronunciation (romaji) and English translation. A "Back" button will return the player to the VN Scene.

The game will be supported by a Large Language Model (LLM) that will be used to generate the dialog for the game and provide dynamic content for the study objectives such as pronunciation and translation.

---

Great! Now we'll move to the `docs/Technical-Spec.md` file, and only the `docs/Technical-Spec.md` file. Don't forget that you can use the `dev/template/docs/Technical-Spec.md` file as a reference for the format of the new `docs/Technical-Spec.md` file for this project.

We will write the game using the Phaser game engine. Here is documentation for Phaser, which has been added to Cursor:

- Phaser General Documentation: (@Phaser General Documentation) - https://docs.phaser.io/phaser/getting-started/what-is-phaser
- Phaser API Documentation: (@Phaser API Documentation) - https://docs.phaser.io/api-documentation/api-documentation

Toolset:
- Python 3.12+
- Phaser (current version is 3.88.2)
- Ruff
- MyPy
- Pytest
- TinyDB (not initially, but intended for later)
- OpenAI

Notes:
- Though we will manually run commands like ruff and mypy, we wil not create any pre-commit hooks.
- This project will not use a database initially. If and when we decide to add one, we will use TinyDB.
- We are intentionally not using RenPy for this project, but rather we are attempting to create a similar experience using Phaser.
- We will interact with an LLM backend via a REST API using the OpenAI standard. This does not necessarily mean that we will use OpenAI, but rather that we will use a standard that is compatible with OpenAI and have the flexibility to change providers later if we wish.

Please be sure to include a section for the documentation links in the `docs/Technical-Spec.md` file.

---
# if needed:
---

This `docs/Technical-Spec.md` file is a good start, but it is missing a lot of my notes from the previous prompt, such as the definition of the MVP and the featuers we will not be aiming to build initially. Let's take another pass at it and include additional detail regarding our implementation priorities and what we're aiming to build as our foundation. Again, we are working in the `docs/Technical-Spec.md` file, and only the `docs/Technical-Spec.md` file.

Also add a note regarding the local models we would prefer to use (they were listed a few prompts ago).  Add a section on documentation web references we've included in Cursor so far so that we have easy reference of it.  

---

That sounds great! Now we will take everything we've created so far (the `docs/PRD.md` and `docs/Technical-Spec.md` files and, at an even higher priority, the notes from my past prompts) and make sure we integrate these notes into our `docs/Action-Plan.md` file. This file is the most important of all the files we've created so far, and it is the one that will guide our work from here on out. Don't forget that you can use the `dev/template/docs/Action-Plan.md` file as a reference for the format of the new `docs/Action-Plan.md` file for this project.

How will we create our MVP, step-by-step? We want to be able to build our application following the steps from top-to-bottom, so ordering of steps is important. In determining this order, consider three factors:

- **MVP Priority**: How can we best enforce our priorities for the features in the construction of this plan? Perhaps our earliest steps should be to get the scenes working with the Phaser engine with static text before we work on more complex features like LLM integration. It is useful to set up CLI scripts that can test initially before we test the UI manually.
- **Dependencies**: Ensure that the order of the steps reflects dependencies, where we build dependencies first before ordering other tasks that would depend on them.
- **Implementation Complexity**: Ensure that the steps are as simple as possible, moving into complexity later. It's ok to have an implementation focus "split" across multiple steps, if only part of it is a dependency and the rest is optional or more complex.  

Remember that we are carefully considering multiple sources in constructing this plan:

- The `docs/PRD.md` file
- The `docs/Technical-Spec.md` file
- The notes from my past prompts in this conversation

Let's take a shot at building the `docs/Action-Plan.md` file, and only the `docs/Action-Plan.md` file.

---

Great! We have completed section 3.2 of the `Project-Setup.md` file. Update our progress in the `Project-Setup.md` file.

---
# git commit
---

We will skip Section 3.3 of the `Project-Setup.md` file, marking these items as `[~]` (intentionally skipped). We will move on to Section 3.4, where these Tool Files should be naturally created in the course of completing Step 1.1 in our `docs/Action-Plan.md` file. Note that in creating our tools files, if there are any that are not applicable, they should be individually marked as `[~]` (intentionally skipped).

So let's move to implementing Step 1.1 in our `docs/Action-Plan.md` file and create our basic project, where many of these steps will naturally check off some boxes in the `Project-Setup.md` file for Step 3.4.

IMPORTANT NOTE: You may have a temptation to go further and actually start implementing aspects of the project, but please do not.  Right now we must follow the `docs/Action-Plan.md` file as it is our guide.  We will update it as we go along, but for now we must follow it as written. We are working on Step 1.1 of the `docs/Action-Plan.md` file to create our basic project structure so we can finish out the rest of the steps in the `Project-Setup.md` file.

---
# if needed
---

We were just intending to do Step 1.1 from the @Action-Plan.md Action Plan fileand set up our project structure, though it appears you have gone ahead and implemented some significant portions of the project already. This is not optimal, but we'll move forward with it.  However, in the course of that implementation you made some technical decisions (such as to use Streamlit, which was never specified).  Please review the choices that you made in this implementation and update the @Technical-Spec.md Technical-Spec.md document to include any other assumptions or technologies you've chosen to add to our implementation

---
# edit the pyproject.toml file or package.json file to include my info
---


Beautiful! our final step in the Project-Setup.md file (Step 4: Wrap-Up) is to evaluate the previously copied files for applicability to the new project, adding or removing elements as needed. Now that we've set up our tools and defined our tech stack, we should be able to update our `.gitignore`, `.cursorignore`, `.cursorrules`, `.env.example`, etc. files to better suit our project.

We can then update our `Project-Setup.md` and `Action-Plan.md` files to reflect the changes.

---

Dev Steps:
- Git commit everything
- Create conda env or uv venv or what is needed
- Install tools & dependencies, `uv sync --extra dev`, etc.
- Set up .env from .env.example
- Move (now completed) Project-Setup.md to the /docs directory
- Delete the `dev/template` folder (optional)
- Run `scripts/update_docs.py` script again

- Start a new chat, pick up where we left off in the Action Plan


---

We are building a Japanese learning app in the form of a visual novel game. Our project is a Streamlit app running a game that we are writing using Phaser.  Our project file structure can be found in the `docs/reports/Project-File-Structure.md` file (@Project-File-Structure.md). Our PRD is in the `docs/PRD.md` file. Our Technical Spec is in the `docs/Technical-Spec.md` file. Our Action Plan is in the `docs/Action-Plan.md` file.

We are working within a conda environment called `vn` so please include activating that environment in your commands. Additionally, we are using uv to manage our dependencies, so please include that in your commands.

Our project tools are set up as indicated in `Project-Setup.md`. Now it is time for us to start building the project GRADUALLY via the plan in `docs/Action-Plan.md`.

First, let's make sure that our `docs/Action-Plan.md` file is up to date.  There may be work we've already done that we can use to check off items in the plan.

---

Since our project setup is complete, we have moved the Project-Setup.md file to the `docs/` directory and will not need to reference it again.

It appears we have completed Step 1.1 of the `docs/Action-Plan.md` file. We've now decided to serve our Phaser game using Streamlit (which is not part of the original plan).  We may need to make updates both to our `docs/Action-Plan.md` file and our `docs/Technical-Spec.md` file and possibly the `README.md` file to reflect this change.  I want to make sure that all three of these files are in sync with each other.  If there are any inconsistencies, let's discuss them.

---

Excellent.  Let's move on to Step 1.2 of the `docs/Action-Plan.md` file. In general, we will want to implement as much of our project within the Phaser game, not the Streamlit wrapper.  We may add some utilities and UI outside the game to aid development, but the goal for now is to minimize the Streamlit wrapper and intend to implement as much as possible within the Phaser game itself.

---

Good job, and thank you for remembering to limit your actions to only those requested in the prompt's latest, explicit instructions.  Let's move on to Step 1.3 of the `docs/Action-Plan.md` file. A new file `docs/Prompt-Notes.md` has been added to the project to provide some notes to consider with every prompt as we develop our project. Please review it and keep it in mind as we continue to develop our project.

---



