# Past Submissions

These are the past submissions for the Free GenAI Bootcamp 2025.


## Pre-week: GenAI Architecture and Prompt Engineering (02/01-02/07)
Submitted: Feb 8, 2025 5:13AM

### Github Link to Sentence Constructor
```
https://github.com/rcgray/free-genai-bootcamp-2025/tree/main/sentence-constructor
```

### Github Link to GenAI Architecture
```
https://github.com/rcgray/free-genai-bootcamp-2025/tree/main/genai-architecting
```

### Hypothesis and Technical Uncertainty
```
Our primary concern regarding technical uncertainty was two-fold. First, since we hope that this could be an application that runs locally on a user's machine, we were uncertain whether local, open-weight models would be sufficient for supporting the features we are looking to build. Second, for larger SaaS models we were not as much concerned about capability but rather how to achieve optimal prompt design and format for the data that the app will need to retrieve. To aid this, we did a deeper investigation into the Japanese language to determine the salient decision points regarding translation that informed prompt design. Our key technical questions included: (1) How to structure prompts to account for Japanese language complexities (formality levels, writing systems, user proficiency), (2) Which prompt format (XML, YAML, Markdown) would work best across different LLM providers, and (3) How to balance between SaaS and local open-weight model deployment options.
```
### Technical Exploration
(Briefly describe the path of technical exploration during these projects.)
```
We documentation our Japanese language considerations to inform prompt design (formality levels, writing systems, JLPT levels), developed and tested three different prompt formats (XML, YAML, Markdown) across multiple LLM models including: - Large SaaS models (Claude, ChatGPT, DeepSeek SaaS) - Mid-size models (Mistral, Llama, DeepSeek Distills) - Smaller local models (8B, 1.5B parameter versions) We worked iteratively with Claude Sonnet 3.5 and DeepSeek R1 to craft LLM-directed prompts in each format and ran all three against a battery of test models, recording results in the respective prompt-*.md files. We recognize that this was not as the assignment was prescribed, but we felt it fit our direction, where we plan to perform a good amount of post-processing on the LLM results to support the app (see README in the architecture folder). We documented architectural components and other technical design considerations.
```
### Final Outcomes
(Describe your final outcomes or domain knowledge acquired.)
```
- Determined that a simplified "two-level" approach (Default/Beginner) would be more effective than mapping to JLPT levels.
- Found that Markdown format generally performed best across models, both locally and with paid SaaS services.
- Discovered that only two models in our format/model test matrix rendered our test prompt perfectly, and both were local models:
  - MD & Mistral Small 24B Instruct 2501 13B Q6_K_L
  - YAML & DeepSeek R1 Distill Llama 8B Q6_K_L
- Identified Japanese-specific models (2B-70B parameter range) potentially suitable for local deployment (but requiring further investigation).
- Established clear separation between prompt engineering and application post-processing to maintain flexibility.
```
### Anything else you'd like to add
```
Enjoying the course so far, and looking forward to the coming weeks! Thank you for everything you and the team are doing for us. :)
```


## Week 1: Language Learning Portal (02/08-02/14)
Submitted: Feb 15, 2025 8:37AM

### Backend API Implementation
(Please describe your backend API implementation.)
```
- I wrote the backend from scratch in FastAPI, which I have never used before and took it as an extra challenge. - This included scripts for constructing and seeding the database, with management via Alembic (also new to me). - I have never used alembic, sqlalchemy, pytest, black, or ruff before. (I do work with Python, but mostly in Jupyter notebooks). - I used Cursor with WSL, and I wrote no code - I worked with it via spec docs and prompts to guide me through the full process, which was also a new experience and extra challenge for me. Backend is complete with automated tests and 86% code coverage.
```

### Frontend API Implementation
(If you have implemented a new frontend)
```
- I wrote the frontend from scratch in React. I have some experience with React, but not for a full website (just poking around with the basics). - I have never used Vite, yarn, or TailwindCSS before. I have never coded a project in TypeScript (but i do work with JavaScript). - Again, I used Cursor with WSL, and I wrote no code myself. I spent years learning computer science and programming, but English is now my new coding language. :) Frontend basic structure is complete and the website runs, but I was not able to complete design and styling or make it fully functional with the backend at the time of submission (Week 2 live stream). I will complete it today after the lesson.
```

### Vocab Importer Implementation
(Please describe your vocab-importer implementation)
```
- I started with the seeding data included in the sample project, and created other seeding files to support the automated tests. - I created a set of Python dev scripts that will create the db from the alembic schema and then seed the database with the data from the files in the /data directory.
```

### OPEA Implementation
(Describe your experience implementing OPEA)
``` 
- I have not yet completed the ollama docker setup, but will continue to work on it. I have no experience with Docker, so I'm doing some prereq learning.
```

### Considerations / Exceptions / Accommodations
(If you want to write a message to your instructor. Or you need Considerations, Exceptions or Accommodations when submitting.)
```
- No exceptions or excuses, just a lot of work. I'm taking on the challenge options when they are proposed for the assignments, and I'll get them done.
```


## Week 2: Multi-Modal Applications (02/15-02/21)
Submitted: Feb 24, 2025 11:25PM

### Github Repo URL
(Provide your Github Repo URL (It's easier for Andrew to find your repo this way.)
```
https://github.com/rcgray/free-genai-bootcamp-2025
```

### Language Listening App
(Describe in summary what the domain knowledge you acquired through technical uncertainty.)
```
- My Listening Learning App is a podcast (or other Japanese audio) transcription and translation app. You can provide a URL or upload a local file. - Files can be processed for both time-coded transcription and time-coded English translation using OpenAI API (which I've never used) - The Study page allows learners to follow along with the podcast, reading the Japanese and English side-by-side with the audio. Syncing with audio is still WIP. - App is written using Streamlit (which I've never used) and TinyDB (which I've never used) - Written entirely with no manual coding, all AI-developed via Cursor on WSL
```

### Kana Practice App
(Describe in summary what the domain knowledge you acquired through technical uncertainty.)
```
- My Kana Practice app is instead a Kanji Practice app, implemented in the form of a game "Kanji Snake" in the Lang Portal - I developed a framework for importing standalone web-based games into the lang portal so they can serve as new "Activities", using the backend's API for learning content. - Kanji Snake was the demonstration of this process, written in Phazer (passing knowledge) and starting with a "base game" template. - Written entirely with no manual coding, all AI-developed via Cursor on WSL and Stable Diffusion
- https://github.com/rcgray/free-genai-bootcamp-2025/tree/main/lang-portal/games/kanji-snake
```

### ASL Finger Spelling (Optional)
(Describe if you attempted the optional reimplementation of the ASL Finger Spelling app.)
```
```

### Considerations / Accommodations
```
I apologize that this is late. I bit off a little more than I could chew in terms of both projects, and the "importing standalone games" gave me particular trouble. However, I am happy with the results and what I've learned in delivering them this week.
```


## Week 3: Containerization and Local LLMs (02/22-02/28)
Submitted: Mar 3, 2025 9:50PM

### Github Repo Link
(Link your github repo so its easy for Andrew to find.)
```
https://github.com/rcgray/free-genai-bootcamp-2025
```

### Describe your progress with OPEA
```
I'm really interested in local LLMs, so my personal goal was to get the OPEA chat to work with a local gguf via a ggerganov/llama.cpp container as its TGI Service. I wanted to build the app free from any dependence on HuggingFace, including the This gives the flexibility of defining any LLM you want, not just those offered by the named HF options. For instance, you can bring in a custom tuned model or one built for Japanese language like Gemma 2-JPN or Stablity AI's beta/gamma versions. We then built a Streamlit app to consume our local textgen service, deployed via Docker, giving us a UI in which to chat with our local model. Learning: - I have never used Docker before, so I had to go on a little Udemy journey last week. - I have limited experience with llama.cpp, where I more just use applications (Kobold, LMStudio) or other libraries (ollama) that wrap it, but it was cool to learn! - My own constraint: As with everything up to date, I have written zero code myself - everything is AI created (via Cursor, Cline, Aider, Claude, OpenAI, DeepSeek, Perplexity, Stable Diffusion, and so on) to force myself to learn how to prompt. It has been very tricky at times (especially with this week's project), but that has been my strongest skill growth.
```

### Describe your progress with Agentic Workflows
```
I've started reading into MCP servers, which the hype crowd on X are saying is the next big focus in GenAI development and even startups, granting agentic capabilities to existing tools like Cursor, etc. As a generalization of RAG, you can implement traditional RAG as an MCP, and one of my goals is by the end of this class to implement my first MCP solution, though I'm not sure what quite yet.
```


## Weeks 4 & 5: Capstone Project - Visual Novel (03/01-03/07)
Submitted: Mar 9, 2025 1:31AM

### Github Repo URL
(So Andrew has easy access to your repo.)
```
https://github.com/rcgray/free-genai-bootcamp-2025
```

### Describe your goals for this week
(We left this week open-ended so bootcampers can choose their priorities. eg Shore up existing app, start building their own unique project.)
```
Video Presentation (6min): https://youtu.be/O42Sabg3YBM
- My goal for this week was to create an immersive visual novel-style game for Japanese language learning.
- The game is entirely created using AI prompting from scratch in Phaser, and I intend for the content of the game to also be LLM-generated.
- I didn't get quite as far as I had hoped, but I do have the core of the game running and I'm ready to implement art and story.
- A key feature is hot-reloading via a Vite HMR setup that uses the save/load functionality of the engine.
- All art will also be created via generative AI.
- Next week is focusing on Stable Diffusion and LLM integration for game content.
- Final week is integrating the weekly projects into a capstone deliverable and presentation.
```


