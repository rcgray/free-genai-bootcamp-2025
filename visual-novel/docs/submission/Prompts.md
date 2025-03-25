# Edit the prompts below and review them before submitting (some marked with @ require file linking)

---

# New chat (Agent, claude-3.7-sonnet, thinking toggled)
# [from the monoproject root directory, one level up from `visual-novel` project]

---

[Longer Context]
We are at the root of a monoproject repository, and we are preparing it for delivery. The work is complete, but we now need to organize our README files throughout the monorepo to make it easier for potential users to understand our project. This is also a deliverable for a project that will be graded as part of a course, so we will want to ensure that the README files make this grading process as easy as possible for the graders.

Let's take an inventory of the README files in the monorepo:

- `README.md` (@README.md)
- Pre-week 1
  - `genai-architecting/README.md` (@genai-architecting/README.md)
  - `sentence-constructor/README.md` (@sentence-constructor/README.md)
- Week 1
  - `lang-portal/README.md` (@lang-portal/README.md)
  - `lang-portal/frontend-react/README.md` (@lang-portal/frontend-react/README.md)
- Week 2
  - `listening-comp/README.md` (@listening-comp/README.md)
  - `lang-portal/games/kanji-snake/README.md` (NYI)
- Week 3
  - `opea-comps/README.md` (@opea-comps/README.md)
  - `opea-comps/backend/README.md` (@opea-comps/backend/README.md)
- Weeks 4 & 5
  - `visual-novel/README.md` (@visual-novel/README.md)
  - `visual-novel/server/README.md` (@visual-novel/server/README.md)
  - `visual-novel/phaser_game/src/utils/README.md` (@visual-novel/phaser_game/src/utils/README.md)

See the `./README.md` file for a summary of the projects within the monorepo and the course work completed. Our current task will be to finalize all of these files to ensure that they are complete and accurate.

For our first step: One README file is missing (NYI): `lang-portal/games/kanji-snake/README.md` - which we should add since it became a pretty significant item of work.  Let's add it, highlighting its key purpose as a sample game for our system in which games can be independently developed, using our template and libraries, and then imported into our lang-portal app to share in the learning functionality (word database, groups, etc.) offered by the platform.

You have access to the project's spec documents:

- `lang-portal/docs/Game-Kanji-Snake.md` (@Game-Kanji-Snake.md)
  - This is the specification for the Kanji Snake game.
- `lang-portal/docs/Games-Feature-Spec.md` (@Games-Feature-Spec.md)
  - This is the specification for the functionality added to the Lang Portal that allows for the integration of new games.
- `lang-portal/docs/Games-Harness-Spec.md` (@Game-Harness-Spec.md)
  - This is a how-to guide for developers who want to integrate their games into the Lang Portal.

You also have access to screenshots from the Kanji Snake game in the `lang-portal/games/kanji-snake/dev/` directory (@dir).

Finally, you have access to the Kanji Snake game code in the `lang-portal/games/kanji-snake/` directory, where you can look through source files such as `src/scenes/MainScene.ts` (@MainScene.ts) to see the implementation of the game to get a sense of controls and user instructions.

Please create a new README file `lang-portal/games/kanji-snake/README.md` for the Kanji Snake game, highlighting its key purpose as a sample game for our system in which games can be independently developed, using our template and libraries, and then imported into our lang-portal app to share in the learning functionality (word database, groups, etc.) offered by the platform. At the moment, this is your only task - to write the `lang-portal/games/kanji-snake/README.md` file.

---

Great, now let's turn our attention to the other README files in the monorepo. We can skip the root README file for now (we will address that at the end), and we can skip the Pre-week 1 README files as well. Let's start with the Week 1 README files.  We are looking for the following:

- Consistency in the formatting of the README files.
- Copy-editing for correctness and clarity.
- Ensure that the files explain the purpose of the project, the technologies used, and the development process.
- If a file has a screenshot (which you can see in the root project README file, or in the `dev/` directory of the project), please include it in the README file.
- Ensure that the files explain how an individual can run the project, either in development or production mode.

---

Great, and finally, let's take a look at our root README file. The formatting is a little different on this one since it is also a homework submission for a workshop. Details regarding projects and how to run them are provided in the individual project README files. We are looking for the following:

- Copy-editing for correctness and clarity. It's ok if the file is a little verbose, because we want to be thorough. It is also appropriate for it to be written as prose instead of simply as brief lists.
- Ensure that the links to other files (sub-project README files, images, etc.) are correct.

Please make your suggested edits to the root README file, and then echo back a summary of the changes you made.

---

We have been given our final submission form. I am gathering the instructions, which are provided on a webform and a YouTub video. To help gather these instructions, I will need to download the transcript of the video. I have a script @youtube_transcript_dl.py that will help me do this.

The script is not working at the moment. Running it with the command:
`pip install youtube-transcript-api`
(no errors, then I run):
`python youtube_transcript_dl.py https://youtu.be/8jmVBCp2kK4`
or
`python youtube_transcript_dl.py https://youtu.be/8jmVBCp2kK4 -o final_submission_transcript.txt`

Neither has any visible output, either to console or to any file. How could we go about debugging this?

---

Please take the @final_submission_transcript.txt transcript of the video and clean it up - remove the timestamps and blend the speaking together into regular paragraphs such that it can be better consumed as text.  Do not edit in-place - Instead, write the "cleaned up" version of the transcript in the bottom section of the @Submission-Task.md file

---

In the Submission Form section of the @Submission-Task.md file, please observe the fields marked with <TBD>. Read through the Video Transcript section (which includes detailed instructions) on these sections, and add helpful instructions and guidance to the "Notes From Video" section of the form for each of these fields. Do not worry about the "Answer" sections yet, we will get to them later.

---

Now let's populate the "Answer" sections of the @Submission-Task.md file still marked with <TBD>. Note that some of the Answer fields are set to precise values and not marked with <TBD>, and these should not be changed.

For each of the <TBD> fields, please create a thoughtful answer in list format that addresses the question posed in the field. Take the insight gained from the Notes From Video section for each question to help you craft your answer for that question. The final answer we submit will be brief, but for this step be as thorough as you can, so we can then trim down and identify the key points. Be comprehensive in this step.

To help craft thoughtful answers, please review the @README.md file that we have created to serve as a summary of the project. Please also review the @Past-Submissions.md file to see all submissions from previous weeks.

If needed, you can reference the README.md files for each of the weekly sub-projects to help you craft your answers. They are as follows (as referenced in the @README.md file):

- Pre-week 1
  - `genai-architecting/README.md` (@genai-architecting/README.md)
  - `sentence-constructor/README.md` (@sentence-constructor/README.md)
- Week 1
  - `lang-portal/README.md` (@lang-portal/README.md)
  - `lang-portal/frontend-react/README.md` (@lang-portal/frontend-react/README.md)
- Week 2
  - `listening-comp/README.md` (@listening-comp/README.md)
  - `lang-portal/games/kanji-snake/README.md` (NYI)
- Week 3
  - `opea-comps/README.md` (@opea-comps/README.md)
  - `opea-comps/backend/README.md` (@opea-comps/backend/README.md)
- Weeks 4 & 5
  - `visual-novel/README.md` (@visual-novel/README.md)
  - `visual-novel/server/README.md` (@visual-novel/server/README.md)
  - `visual-novel/phaser_game/src/utils/README.md` (@visual-novel/phaser_game/src/utils/README.md)

Your ONLY EDITS for this task should be to the Submission-Task.md file. You should not edit any other files in the project.
---

Great work, and now let's take a look at the prompt history for this project, which is scattered among many "Prompts*.md" files throughout the project. My system has evolved over the course of the work, but these are a record of my communication with you, the Agent, and are a valuable resource for understanding the development process.

As a first step in examining the prompt history, let's create a new directory in the project called `visual-novel/docs/submission/prompts` and create a copy of each of the "Prompts*.md" files in this directory. Have the name of each copied file reflect the subproject it is associated with.

For now, merely copy the files, do not edit them in any way, and do not edit any other files in the project.

---

In the prompts directory `visual-novel/docs/submission/prompts`, we have four prompt files that contain the full prompt history for this project. This consists of four files, one for each of the sub-projects in the project. They are also ordered to show the progression of my prompt engineering skills over the course of the project. I want to start working on a new file `visual-novel/docs/submission/Prompt-Lessons.md` that discuss key lessons that I demonstrated learning over the course of the project.

A couple of things that come to mind:
- Learning how to communicate effectively with the Agent, including how to provide clear and concise instructions, how to provide feedback on the Agent's work, and how to provide context for the Agent's work.
- The planning, documenting, implementing loop: directing the Agent first to answer plans regarding a feature design and document them in a spec file, then directing the Agent to implement the feature, and then directing the Agent to document the implementation.
- The use of Action Plans to guide the overall development process, with integrated "checkpoints" that allowed us to break down the project into more manageable chunks that could be manually verified by the User before proceeding.
- The use of Rules files (`.cursorrules` and `.cursor/rules/*.mdc`) to direct the Agent, avoid pitfalls, and customize its behavior in general, at the project level, the toolchain level, and the specific machine level (e.g., MacOS development vs. Windows).
- Identifying common Agent mistakes and developing patterns for avoiding them.
  - Difficulty navigating directories
  - Difficulty applying project environment context
- How a thorough prompt pre-written in a dedicated Prompt History file can be more effective than simply writing in the prompt box ad-hoc. This not only provides a more effective use of the Agent, but it has a beneficial side-effect of creating a running history of the project that can be examined for insights and lessons.
- How to effectively debug issues with an Agent, beyond simply saying "it doesn't work", by setting up marked debug messages in the prompt that can be used to trace the Agent's thought process and identify where it is going wrong.
- Knowing when to use a non-reasoning agent vs. a reasoning agent, and how to effectively use the capabilities of each.
- Learning to model Agent work at an appropriate level to request it to "one shot" its implementation. Starting at too high a level of work can lead to failure, but working too low is no different than writing code manually.
- Limitations of the Agent, and knowing when I am asking something is is not capable of achieving.

Please create a new file called `Prompt-Lessons.md` that we will begin building out as a deliverable for this final submission. The only edits you should make are to create this specific file and to add the content above.

---

Sorry, I was a little too specific. I would like for you to include the points (now in the file), but not necessarily copy them verbatim. Instead, please use them as a guide to help you write a new file that we will begin building out as a deliverable for this final submission. This is a presentation in markdown, so I will be looking to you to assist in creating a structure that facilitates this presentation.

Next, I would like for you to read through the history of the prompts in the four files in `visual-novel/docs/submission/prompts` directory (@prompts) and add a section to our Prompt-Lessons.md file that provides an overview/summary of the journey I took with you over the course of the project.

---

With your knowledge of the four prompt histories, add a new section to the bottom of the @Prompt-Lessons.md file (Analysis of Prompt History) that explains in more detail how my prompting evolved from the start to the end, which was over a period of a few months. What is your interpretation of the evolution of my prompting?

---

This is great - keeping the same structure, can you go more deeply into it?  More details and insight?

---

Let's take a look at our rules files in the same way we've examined the evolution of the prompts.  I'll save you the lookup and give you these files:

- `lang-portal/.cursorrules`
- `listening-comp/.cursorrules`
- `opea-comps/.cursorrules`
- `visual-novel/.cursorrules`

However, during development of the visual-novel project, I adopted a more sophisticated approach to rules files, taking on their new mdc system. Therefore, this project also has a few others:

- `visual-novel/.cursor/rules/general.mdc`
- `visual-novel/.cursor/rules/project.mdc`
- `visual-novel/.cursor/rules/python.mdc`

Please copy all of the files listed above to the `visual-novel/docs/submission/rules` directory (@rules) in such a way that their filenames reflect the project they are associated with. Don't worry about editing the Prompt-Lessons.md file yet, there is a little more context that I will need to provide first.
---

I've added a ".txt" suffix to the mdc files, so that they are not processed by Cursor, but the content is still there. Next, I would like for you to read through the history of the rules files in the  `visual-novel/docs/submission/rules` directory (@rules) and add a section to our Prompt-Lessons.md file that provides an overview/summary of the evolution of how rules were applied.

A huge difference took place in the visual-novel project. I used to have the .cursorrules file along with a "Prompt-Header.md" file that I would simply link as context at the start of every new chat. This was hit-or-miss, where the rules in "Prompt-Header.md" were MOSTLY followed but not as strictly as those in .cursorrules. I eventually broke out the rules in this "Prompt-Header.md" file to be subject-specific mdc files, which work more effectively and are loaded on-demand as the task requires.

I ran into an issue where I wanted some rules to apply depending on the machine I was using. For example, my Windows/WSL machine uses `conda` for environment management, while my MacOS machine uses classic python venv. I wanted to make sure that the rules files were applied correctly on each machine, but Cursor does not support that kind of conditional processing.

Therefore, I reserve the special .cursorrules file for machine-specific rules where I can include this in the .gitignore file to ensure that it remains individual to each machine.

So let's add a new section to the @Prompt-Lessons.md file (Rules Evolution) that explains the evolution of how rules were applied, and how I overcame the limitations of Cursor to apply rules more effectively.

---

Another key evolution is that I went from AI-generated rules to handwritten.  almost all of the rules in the first .cursorrules file were the result of me asking the AI to create a rules file for the toolchain we were using.  By the end, the rules are hand-crafted based on the challenges and lessons along the way.

---

From the rules files in aggregate, what do you think are the most common Agent mistakes that I've discovered along the way that would have been the purpose for adding these rules?  Create a new section in the @Prompt-Lessons.md file (Common Agent Mistakes) that summarizes these mistakes and how the rules files help avoid them. Please re-read the file, as it has been updated since you last read it.

---

You touched on something interesting in your analysis when you mentioned that there was a "planning, documenting, implementing, and verifying" loop that we were working through.  Let's come up with a name for this - most obvious is the "Planning, Documenting, Implementing, and Verifying" loop (PDIV)?  Can we make a dedicated section on this and how we developed it as a core workflow concept?

---

I've added a new section to the @Prompt-Lessons.md file called "Learn the Agent's Language" that discusses how knowing the names of the internal commands the Agent uses can help bridge the gap between human language and AI capabilities. Can you expand this in two different ways.

1) Create as comprehensive a list as possible of the internal commands the Agent makes use of regularly.
2) Consider ways that Users can "Learn the Agent's Language" beyond just knowing the names of commands.  That's one example, but I bet there are more.

---

Let's talk about another loop (or "cycle" as you seem to prefer) that has become an essential part of our workflow. It is the "Log, Observe, Refine, Iterate" cycle (LORI).  In general, I ask you to not execute the main command for the project - I usually run it myself in another terminal, and preferably withe a watchdog system.

Then, when an error comes up, I send you the error message in my next prompt. Since we don't really have sophisticated debugging tools (man, whoever makes a competent debugger MCP is going to be rich), we instead resort to dreaded "printf debugging". You speckle the codebase with log statements with a unique prefix identifier that relates to our current issue or feature (e.g., "[KB_INPUT] <message>"). I run it again, give you the log output again, and you gain insight into what is going wrong. Not to mention that the unique identifier prefix makes it easy to pull out the relevant messages among other logs so even I can offer ideas. You can see examples of this in the prompt history file for the visual-novel project, as well as the rules files.

We repeat this process until we have a working solution. Then we can remove the logs, either via memory or by that identifier, and we move forward.  We call this the LORI cycle - Log, Observe, Refine, Iterate... and so far there hasn't been an issue we haven't been able to solve.

Can you create a new section in the @AI-Lessons.md file (we renamed the Prompt-Lessons.md file to AI-Lessons.md) for this workflow that describes this process in more detail?

---

# New chat (Agent, claude-3.7-sonnet, thinking toggled)
# [from the monoproject root directory, one level up from `visual-novel` project]

---

[Ask]
OK, we've had a great history of working together over the last few months, in which my ability to effectively communicate with you has improved. In a previous chat, we discussed the evolution of my prompting skills (and rules files) over the course of the project. I'm creating a compilation of the lessons I've learned and how my approach has evolved over time.

You've helped me a lot with this. First we examined my prompt history over the last few months (stored in the files in the `visual-novel/docs/submission/prompts` directory), and we also looked at how my rules files evolved over time (stored in the `visual-novel/docs/submission/rules` directory). We've had a productive discussion and ended up with a file that both you and I have written.  This file is the focus of our work now: AI-Lessons.md (@AI-Lessons.md).

When you take a look at AI-Lessons.md, you will see that it is a bit of a jumbled mess, where we've collected all of the lessons we could think of over the course of the project, inferring from the prompt history and rules files as well as my own notes.

The clay is all on the wheel, but we need to shape it into a more coherent form. Read through and give me your thoughts on a high-level structure that we can use to organize the lessons into a more coherent form.

---

I think this looks good. Let's take what we have in this AI-Lessons.md file and create a new file called AI-Lessons-Reorganized.md that takes the content of the first file and shapes it into a more coherent form following your suggestions.

---

[Max: $0.40]
Alright, our new file `AI-Lessons-Reorganized.md` (@AI-Lessons-Reorganized.md) is much better organized, but at the moment we've taken the raw clay and repositioned it on the wheel - we haven't yet shaped it into a beautiful vase.

What we need to do now is to make it flow. It should have a fuller introduction that explains what the reader is about to experience, it should introduce the structure and transition smoothly between sections, and it should have a conclusion that ties everything together. It should clearly state its purpose and then support that purpose through the course of the document.

The raw materials here came from a number of different sources - some of them were just brainstorming notes, some were lists, some where freewriting paragraphs, and some were written by you based on analysis of historical interaction data and your insights about yourself. Though the raw writing has been moved to the proper places in the document and unified under common themes now, it needs to be smoothed out and made consistent. Sure, some of the list content should remain as lists, but some of them should be converted to paragraphs.

The writing style should be persuasive, as if we are convincing the reader that these lessons are important and worth their time. We are championing the use of AI agents in our workflow, and we are sharing our journey with them. It should be instructional, where we are attempting to teach the reader how to effectively use AI agents in their workflow. It should avoid stale business-speak and instead be written in a way that is engaging and interesting to read.

Let's write a new version into a new file called `AI-Lessons-Refined.md` (@AI-Lessons-Refined.md - currently empty) that takes the content of `AI-Lessons-Reorganized.md` and writes it in a more final form.

Here are some objectives to consider while performing the rewrite:

- Make sure the document has a full introduction that explains what the reader is about to experience.
- Make sure the document has a conclusion that ties everything together.
- Make sure that content appropriate for list formatting remains as lists, and content that is better suited for paragraphs is converted to paragraphs.
- Make sure the document has a smooth flow and introduction of the structure and flow between sections so the journey the reader takes makes sense to them.
- Make sure the document has a cohesive style and tone as if written by a single author. This tone should be persuasive, instructional, and engaging. It does not need to be formal, and we want to avoid business-speak.
- Of course, make sure the document is free of errors and typos. (copyediting)

Let's make a beautiful vase.

---

# Not entirely satisfied with the MAX model result as a one-shot (and one prompt cost $0.40), so going to try it also with regular claude-3.7-sonnet-thinking and compare the two.
# moved AI-Lessons-Refined.md to AI-Lessons-Max.md and will try again.

---

[re-run withclaude-3.7-sonnet, thinking toggled]
Alright, Our new file `AI-Lessons-Reorganized.md` (@AI-Lessons-Reorganized.md) is much better organized, but at the moment we've taken the raw clay and repositioned it on the wheel - we haven't yet shaped it into a beautiful vase.

What we need to do now is to make it flow. It should have a fuller introduction that explains what the reader is about to experience, it should introduce the structure and transition smoothly between sections, and it should have a conclusion that ties everything together. It should clearly state its purpose and then support that purpose through the course of the document.

The raw materials here came from a number of different sources - some of them were just brainstorming notes, some were lists, some where freewriting paragraphs, and some were written by you based on analysis of historical interaction data and your insights about yourself. Though the raw writing has been moved to the proper places in the document and unified under common themes now, it needs to be smoothed out and made consistent. Sure, some of the list content should remain as lists, but some of them should be converted to paragraphs.

The writing style should be persuasive, as if we are convincing the reader that these lessons are important and worth their time. We are championing the use of AI agents in our workflow, and we are sharing our journey with them. It should be instructional, where we are attempting to teach the reader how to effectively use AI agents in their workflow. It should avoid stale business-speak and instead be written in a way that is engaging and interesting to read.

It should not be overly verbose, and it should adhere to the source material in terms of examples. We don't want completely new content, we just want to smooth out the rough edges of the current content.

Let's write a new version into a new file called `AI-Lessons-Refined.md` (@AI-Lessons-Refined.md - currently empty) that takes the content of `AI-Lessons-Reorganized.md` and writes it in a more final form.

Here are some objectives to consider while performing the rewrite:

- Make sure the document has a full introduction that explains what the reader is about to experience.
- Make sure the document has a conclusion that ties everything together.
- Make sure that content appropriate for list formatting remains as lists, and content that is better suited for paragraphs is converted to paragraphs.
- Make sure the document has a smooth flow and introduction of the structure and flow between sections so the journey the reader takes makes sense to them.
- Make sure the document has a cohesive style and tone as if written by a single author. This tone should be persuasive, instructional, and engaging.
- Of course, make sure the document is free of errors and typos. (copyediting)

Let's make a beautiful vase.

---

We have iterated on this file a few times now, and I believe we have ended up with a great final version. Let's add mention of this to the project README file (@README.md).  It is one of the most, if not the most significant deliverable for this project, encapsulating my largest domain of growth and evidence of my greatest success in the workshop.  Be sure to provide a link to the AI-Lessons.md file relative to the root of the project: `visual-novel/docs/submission/AI-Lessons.md`.

Let's also make sure that we integrate it into our final submission form (@Submission-Task.md), since it is a significant part of our workshop efforts.

---