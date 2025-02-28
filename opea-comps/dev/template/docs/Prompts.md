We are setting up a new project, using some of the files from previous projects as a starting point. Please follow the instructions in `dev/template/Project-Setup.md` (@Project-Setup.md) up to Step 3.3 Dynamic Documentation, where we will then work together to generate the core project specifications files.

---

Perfectly done! Now let's work together to generate the core project specifications files. Keep in mind that we are now working from the instructions in the copy of `Project-Setup.md` (@Project-Setup.md) in the root of the project folder that you have copied and edited.

We'll start with the `docs/PRD.md` file.

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

