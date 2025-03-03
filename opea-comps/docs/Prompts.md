We are setting up a new project, using some of the files from previous projects as a starting point. Please follow the instructions in `dev/template/Project-Setup.md` (@Project-Setup.md) up to Step 3.3 Dynamic Documentation, where we will then work together to generate the core project specifications files.

---

Perfectly done! Now let's work together to generate the core project specifications files. Keep in mind that we are now working from the instructions in the copy of `Project-Setup.md` (@Project-Setup.md) in the root of the project folder that you have copied and edited.

We'll start with the `docs/PRD.md` file, and only the `docs/PRD.md` file. Don't forget that you can use the `dev/template/docs/PRD.md` file as a reference for the format of the new `docs/PRD.md` file for this project.

This project is to create an LLM chat application using the Intel OPEA toolchain. Documentation for OPEA has been imported into Cursor and linked:

- (@Getting Started with OPEA) - https://opea-project.github.io/latest/getting-started/README.html#create-and-configure-a-virtual-server
- (@ChatQnA Overview) - https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html#
- (@MegaService of ChatQnA on NVidia) - https://opea-project.github.io/latest/GenAIExamples/ChatQnA/docker_compose/nvidia/gpu/README.html

There are a lot of options for deploying OPEA, here are some notes for our intended deployment:
- We want as simple as possible of a path to a working LLM-powered chat application using OPEA. Cut out any optional features or tools that are not necessary for a functional OPEA project.
- We can use Llama for our LLM model if we absolutely have to, but we would prefer to use other LLM models if possible (or at least be able to experiment with the many we have).
- Our solution must not require the download of any LLM models from HuggingFace or other sources. We have many models on our local disk.
- We are using an NVidia GPU for this project.
- We do not have a Xeon processor, but we can select the Xeon options when it exists in the OPEA documentation.
- We do not have access to AIPC, Gaudi, or other specialized hardware accelerators.
- We prefer Docker over Kubernetes, though we are interested in options that don't require complex configurations.

---

Great! Now we'll move to the `docs/Technical-Spec.md` file, and only the `docs/Technical-Spec.md` file. Don't forget that you can use the `dev/template/docs/Technical-Spec.md` file as a reference for the format of the new `docs/Technical-Spec.md` file for this project.

You will be able to use a lot of the content from the `dev/template/docs/Technical-Spec.md` file because here we are also using Python to create a Streamlit application

Toolset:
- Python 3.12+
- Streamlit
- Ruff
- MyPy
- Pytest
- TinyDB (not initially, but intended for later)
- OPEA

Notes:
- Though we will manually run commands like ruff and mypy, we wil not create any pre-commit hooks.
- This project will not use a database initially. If and when we decidd to add one, we will use TinyDB.
- We are using an NVidia GPU for this project.

Using OPEA tools, and the ChatQnA examples, we will create a minimalistic clone of the ChatGPT interface, allowing the user to send a message and receive a response from an LLM. It does not need to record conversations, have any login, authentication, or user database, or any of the other features that ChatGPT has.  This is a MINIMALISTIC application, providing only what is necessary for a one-shot prompting of an LLM. It doesn't even need to remember the responses so as to construct a conversation, but simply interact with the LLM with a single prompt and receive and print the response. We can add more features later, but this is the definition of the MVP (Minimum Viable Product). The priority is the demonstration of the successful use of the OPEA tools and the ChatQnA examples, not the app itself.

Additional OPEA documentation has been added to Cursor and is available at the docs:

- (@GenAIComps Github) - https://github.com/opea-project/GenAIComps
- (@GenAIExamples Github) - https://github.com/opea-project/GenAIExamples
- (@ChatQnA Github) - Part of the GenAIExamples repository - https://github.com/opea-project/GenAIExamples/tree/main/ChatQnA
- (@ChatQnA Single Node On-Premise Deployment on NVidia GPU) - https://opea-project.github.io/latest/tutorial/ChatQnA/deploy/nvidia.html

We must be able to load the LLM model from a local file on disk. This can be a model that we have downloaded from HuggingFace, or a model that we have already downloaded and placed in the `models` directory. We will not want a solution that requires the docker container to download the model from a remote source itself (e.g., from HuggingFace). As for compatibility, options include (but are not limited to):

- Meta-Llama-3.1:8B
- Meta-Llama-3.2:1B
- Meta-Llama-3.2:3B
- Microsoft-Phi-4:Mini

---

Per the .cursorrules file, per the instructions in the `Project-Setup.md` file, and per my reminders in these prompts:

DO NOT EDIT DOCUMENTS IN THE `dev/template` FOLDER.
DO NOT EDIT DOCUMENTS IN THE `dev/template` FOLDER.
DO NOT EDIT DOCUMENTS IN THE `dev/template` FOLDER.
DO NOT EDIT DOCUMENTS IN THE `dev/template` FOLDER.
DO NOT EDIT DOCUMENTS IN THE `dev/template` FOLDER.

Please let me know if writing it again would be helpful for you.  Please echo that you understand this directive.

This `docs/Technical-Spec.md` file is a good start, but it is missing a lot of my notes from the previous prompt, such as the definition of the MVP and the featuers we will not be aiming to build initially. Let's take another pass at it and include additional detail regarding our implementation priorities and what we're aiming to build as our foundation. Again, we are working in the `docs/Technical-Spec.md` file, and only the `docs/Technical-Spec.md` file.

---

Well done.  Add a note regarding the local models we would prefer to use (they were listed a few prompts ago).  Add a section on documentation web references we've included in Cursor so far so that we have easy reference of it.  

---

Now we will take everything we've created so far (the `docs/PRD.md` and `docs/Technical-Spec.md` files and, at an even higher priority, the notes from my past prompts) and make sure we integrate these notes into our `docs/Action-Plan.md` file. This file is the most important of all the files we've created so far, and it is the one that will guide our work from here on out. Don't forget that you can use the `dev/template/docs/Action-Plan.md` file as a reference for the format of the new `docs/Action-Plan.md` file for this project.

How will we create our MVP, step-by-step? We want to be able to build our application following the steps from top-to-bottom, so ordering of steps is important. In determining this order, consider three factors:

- **MVP Priority**: How can we best enforce our priorities for the features in the construction of this plan? For instance, where the primary priority is the demonstration of the successful use of the OPEA tools and the ChatQnA examples, perhaps our earliest steps should be to get all of this working with simple scripts and CLI testing before we work on something less technical like a UI.
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

We will skip Section 3.3 of the `Project-Setup.md` file, marking these items as `[~]` (intentionally skipped). We will move on to Section 3.4, where these Tool Files should be naturally created in the course of completing Step 1.1 in our `docs/Action-Plan.md` file. Note that in creating our tools files, if there are any that are not applicable, they should be individually marked as `[~]` (intentionally skipped).

So let's move to implementing Step 1.1 in our `docs/Action-Plan.md` file.

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

We are building a chat application using OPEA, where our file structure is given in the `docs/reports/Project-File-Structure.md` file (@Project-File-Structure.md). Please review the `docs/PRD.md` file, the `docs/Technical-Spec.md` file for project overview and sources. Finally, the `docs/Action-Plan.md` file directs our implementation of this project and outlines the steps we will take and the order in which we will take them.

We are now on Phase 1.2 OPEA Exploration and Testing. This is a critical part of our development and is a place where many issues can arise and many others have had difficulty.  Additional documentation regarding OPEA and in particular this ChatQnA example has been included in Cursor and are available here:
### OPEA Documentation
- **(@Getting Started with OPEA)**: https://opea-project.github.io/latest/getting-started/README.html#create-and-configure-a-virtual-server
- **(@ChatQnA Overview)**: https://opea-project.github.io/latest/tutorial/ChatQnA/ChatQnA_Guide.html#
- **(@MegaService of ChatQnA on NVidia)**: https://opea-project.github.io/latest/GenAIExamples/ChatQnA/docker_compose/nvidia/gpu/README.html
- **(@GenAIComps GitHub)**: https://github.com/opea-project/GenAIComps
- **(@GenAIExamples GitHub)**: https://github.com/opea-project/GenAIExamples
- **(@ChatQnA GitHub)**: https://github.com/opea-project/GenAIExamples/tree/main/ChatQnA
- **(@ChatQnA Single Node On-Premise Deployment on NVidia GPU)**: https://opea-project.github.io/latest/tutorial/ChatQnA/deploy/nvidia.html

Please begin integrating the necessary OPEA libraries into our project toward achieving our MVP use of the library. Let us discuss any issues or conflicts that our plan has with the OPEA documentation.

Take this step-by-step, little by little. Do not do extra work not yet agreed upon by both of us. Instead of doing ALL the tasks in Phase 1.2, we can just take one task at a time.  Think deeply about how to begin and how to implement the next step. Think carefully about how the OPEA documentation and the ChatQnA examples are relevant to our project.

---

