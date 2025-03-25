The following is an overview of the submission task for the entire workshop. It consists of a form of several questions as well as an explanation video. The form questions and the transcript from the video are provided below.

## Submission Form

**Github URL**
 - Type: text
 - Written Description: Provide a link to your Github URL
 - Answer: "https://github.com/rcgray/free-genai-bootcamp-2025"

**Discord Handle**
 - Type: text
 - Written Description: Provide your account handle in the workshop Discord server
 - Answer: "graycodes (gray)"

**What grade level are you targeting?**
 - Type: dropdown
 - Options: Blue Squad | Teal Squad | Gold Squad | Red Squad
 - Answer: "Red Squad"
 
**In Summary, What were you not able to do?**
 - Type: textbox
 - Written Description: In summary, what were you not able to do?
 - Notes From Video: Focus on technical things you set out to achieve but couldn't complete. This should emphasize genuine technical uncertainty (challenges that even experienced people at a company might struggle with), not just skills you personally haven't developed yet. Good documentation of what you learned through the process is valuable. Examples might include working with poorly documented models or attempting novel approaches. Keep your response concise, focused, and to the point. Generic learning points like "I learned what a database is" aren't valuable from a company perspective.
 - Answer: 
```
- I was unable to complete a fully integrated audio synchronization feature in the podcast app where timestamps would highlight the transcript text in real-time and clicking the text would fast-forward to the relevant part of the audio. I have figured out the timecode syncing, but I would need to customize the Streamlit audio player or integrate another web-based player that allowed this kind of API access.

- I didn't achieve fully dynamic conversation content generation in the visual novel on each run (i.e., supplied dynamically by an LLM on each playthrough) and had to stick with the "fallback" script as a static game script. I was still able to make the study info dynamically generated as a demonstration of LLM integration. In the end, this was just too ambitious in the time allowed, but I do see a path to it being possible.

- I never got streaming to work on the TGI server in the OPEA project, so I had to settle for batch processing. Streaming, man... why is it so hard?

- I wanted to combine all projects into a final, single project that integrated all the sub-projects - a language learning web app that served Kanji Snake and the Visual Novel as "activities" pulling from the lang-portal db, a podcast study tool, all running via a Docker/OPEA deployment. The best I could do was make Kanji Snake part of the lang-portal by creating a Lang-Portal library/template and activity import system, but the others would require some rewrites that I didn't have time for.

- I never created an MCP server, which was a goal I had set as I started discovering them over the course of the workshop. It will be my next project immediately after this course concludes.
```

**In Summary, What were you able to achieve?**
- Type: textbox
- Written Description: In Summary, What were you able to achieve?
- Notes From Video: Describe technical achievements that involved overcoming genuine uncertainty or challenges. Don't report common or straightforward accomplishments that most people could do. Instead, focus on unique aspects of your work that stood out. Report things that were unique to your project. Andrew mentions he looks at everything - he clones repos, runs the code, and examines commits, so be honest about your achievements.
- Answer:
```
Video Presentation (6 min):  

- I successfully achieved my self-imposed goal of completing the workshop without writing a single line of code. Though very frustrating at times (as a professional developer), it forced me to rapidly grow in my prompting capabilities and my understanding of how AI agents work (and don't work).

- I created a comprehensive [AI Lessons Document](https://bit.ly/4lfQNSf) that systematically catalogs the evolution of AI collaboration practices throughout the workshop. This document analyzes patterns in my full prompt and rules history to share the insights I've learned through this workshop on working effectively with AI coding agents. The full prompts and rules history are available in the repo under the `visual-novel/docs/submission/` directory.

- I created a hot module replacement system for Phaser 3 games, which is not natively supported. This involved developing a custom state persistence and restoration mechanism that could seamlessly transfer game state between reload cycles without interrupting gameplay—allowing for rapid development despite Phaser's limitations in this area. In fairness, time constraints eventually prevented me from fixing this when it eventually broke, but I did have it working when I most needed it.

- I developed a containerized text generation service using Docker and Intel OPEA that works completely offline with local GGUF models... AND I worked around the OPEA dependency on HuggingFace at runtime. This allows the TGI (based on llama.cpp) to operate completely self-contained and offline without any 3rd-party dependencies.

- I implemented an dynamic language study system in the visual novel that allows contextual exploration of any text element, providing definitions, grammatical explanations, and cultural notes powered by an LLM - either commercial APIs or local models. The provider-agnostic LLM proxy server needed for this is certainly going to be a component of other projects I want to build that involve LLM integration (which I suspect will be most of them).
```

**Where did you put your focus?**
- Type: textbox
- Written Description: Some people focused more on creating a cohesive deliverable app. Others took on great technical uncertainty with very specific use cases. Some tried to just stick to the letter of instruction they best they could.
- Notes From Video: Clearly state where you directed your efforts. Some bootcampers focused on technical challenges and R&D (like the person who worked with ancient Greek), while others prioritized building a cohesive application with good user experience. You might have focused on business use cases and practical applications ("Would this work at scale?"). Neither approach is inherently better - just be clear about your priorities. If you couldn't focus heavily on research and development, you can emphasize your business-focused approach instead.
- Answer:
```
- Vibe coding! Through this workshop I experimented with Cursor, Windsurf, Cline, and Aider... as well as Claude, Chat-GPT, Perplexity, DeepSeek, Stable Diffusion, LM Studio, and about 20 local LLM models (Llama, Phi, Mistral, Qwen, Gemma, etc.).

- Along with familiarizing myself with the tools, a significant focus of my efforts went into documenting my AI collaboration journey (culminating in the [AI Lessons document](https://bit.ly/4lfQNSf) mentioned above). I think this will be one of the most important skills to have in the coming years, and this constitutes my largest domain of growth throughout the workshop.

- I concentrated on demonstrating diverse AI applications by incorporating different AI capabilities into each component: code generation for the language portal, speech-to-text and translation for the podcast app, image generation for the game assets, local models in the OPEA project, and LLMs as a design material for the visual novel.
```

**Considerations / Accommodations**
- Type: textbox
- Written Description: What do you want to tell your grader to take into consideration or for accommodation?
- Notes From Video: This section is for anything specific you want the grader to consider or accommodate. If you experienced gaps in your learning journey or faced specific challenges, mention them here. Keep it concise - the size of the box indicates the expected length. If you need to provide more detailed information, put it in your GitHub repository where it's easy to find, and remember this section should be a summary.
- Answer:
```
- This was my first time working extensively with many of the technologies used in this project (FastAPI, Alembic, Phaser, Docker, OPEA, Vite, Streamlit, TinyDB, etc.), which presented a steep learning curve but also demonstrated my ability to quickly adapt to new tools.

- Due to time constraints and the breadth of applications being developed, some features are more polished than others. I prioritized having functional versions of all planned components rather than perfect applications.

- Much of my work involved creating proper infrastructure rather than just "making it work," which might be less visually impressive but demonstrates a production-minded approach to development that I prioritize in my work. This also supported my goals of working with AI agents long-term, forcing me to consider how to create maintainable systems with them and not just quick demos.
```

## Video Transcript

Hey folks, it's Andrew Brown and we are taking a look at the final submissions form. I want to give you extra instruction here just so that you have the best opportunity to get the outcome that you want for your final submissions.

This form is open for a period of time that is specified on the GenAI Bootcamp website. Could you submit outside the time frame? It really depends if we do another cohort or if we have post-bootcamp support. At the time of this video, I'm not making any of those promises. If it's open, it's open; if it's not, it's not. But make sure you check those dates because if you're outside that date, you cannot submit and get the grade level that you might want to get. There are some badges that you can get no matter what - if you don't submit, I'll just issue them out. But for those top badges, Gold and Red Squad, you have to fill in this final submissions form the best you can on time.

So what I'm going to do is shrink my head on down here, and you'll notice here we have "Final Submissions Form." This appears in its own group, its own chapter. I just want to make a point here: once you submit this, you cannot change it. So if you need to put it in a draft, put it as a draft, but don't forget to submit it. Some people do that - they'll forget to go back and submit it and think it's submitted. So here it says "unsubmitted," and you can go back here, give it a hard refresh, make sure it is submitted.

We'll go ahead and fill in the form. I'm not actually going to fill in the form, but I'm going to talk around these points so that you know exactly what I'm looking for. First thing is GitHub URL - that will be your repository. I might also put in here your Discord handle. If you have been active on the Discord (if you're not, that's fine), but if you have been, I would like you to place it into here. We already have it somewhere else in the system, but these forms don't carry everything over. We have to improve our system so it's easier to gather information in one place. If you can put in your Discord handle there, I will cross-reference to see if you have any activity that might give you bonus points that might push you into Red Squad. So if you do have a Discord handle, put it in there so that I can easily find and map stuff when I'm doing grading.

Your GitHub URL - I ask every week for you to put this in. I'm explicitly asking for this week again just because, the way our system's built, I only see what's in the current form. I have to do a lot of digging to find other submissions, so I'm putting it here so you have another opportunity to make sure that I can quickly and easily find your repository.

Select what grade level you're going for - these are mapped on the marketing website. We didn't do a complex rubric like we did for prior bootcamps. The reason I didn't do that was just because we are treading new ground with GenAI technology, and I couldn't really create a cohesive baseline. So I'm going to do everything - marking everything on a curve. I'm going to get through enough grading (which I have done, not for final submissions, but for last weeks like Week 5 or Week 4 - Week 5 we didn't have a submission, but for Week 4 submissions) I've done enough to have an idea of where to place things.

Tell me what you're targeting for because if you're going for Gold Squad and you're not going for Red Squad, then that's going to make my grading go a lot faster. I'm not going to deliberate so much; I'm just going to make it easy for me to release it. So just tell me what level you're going for. You really can't get Gold or Red Squad if you do not submit this form, so just make it clear as to what you are targeting for.

Tell me in summary what you were not able to do - what technical things that you set out to achieve that you were not able to achieve. It doesn't matter if you weren't able to do things if you have good documentation and you've shown what you have learned through that process. And when I say "what you have learned," I don't just mean generic things. A lot of folks think like "Oh, I learned what a database was" or "what an LLM is" - that's not valuable from a company perspective. That's just you learning those fundamental elements.

What's valuable is the technical uncertainty of something not even anyone at the company knows, or something you can't find online. So like, if you're using an ancient Greek model and you download it and nobody's using that model, and you go out and find maybe a fine-tuned one that has poor documentation - things like that. That is something that is worth putting in in terms of technical uncertainty. But if it's something that other people can figure out and just you can't figure out, it's not technical uncertainty - it's technical uncertainty that you have because you don't have those skills yet, but a lot of other people do.

So if it's very common things, that's just a lot of noise for me that I have to cut through. When you're writing these things, just make sure it's very to the point and dry. Make it as concise and easy for me to read as possible so that I can go and evaluate your projects. I will clone your repos, I will try to run them if I have the technology, the keys, and things like that. I have been running projects if folks have yet to see that in the grading experience. Just so you know, I do run these things, I do crawl through the code, I look at your commits, I look at everything.

"What were you able to achieve?" - these are the things that you had technical uncertainty of and that you did achieve. Again, if these are things that I was able to do and everyone else is able to do and they're very straightforward things, those aren't things worth reporting. Report things that were very unique to what you did.

If you were more focused on something else, this is your opportunity to put it here. Some folks might not have been trying to seek out and do very technically uncertain tasks - they might have just been trying to follow along and build a cohesive project and ship it, and think more about the business use case. That's good too. So just tell me what your focus was.

Some people, like we had one bootcamper that used ancient Greek, it would be very hard for them to make a cohesive application - if they could, that's great, but it would be very hard for them to deliver that because of the technologies they chose, because it's more like research and development and stretching the limits. Some folks might say, "Well, I'm still trying to learn this stuff, so I'm just trying to figure out how to build a cohesive application and understand the business use case and if it's applicable." That could be like, "Would this work at scale?" or "Would this actually work for this real use case?" things like that.

So if you can't lean heavily into the research development part of it, you can lean heavily into the business side of it and things like that.

"Considerations/Accommodations" - if there's something you want to tell me that you want me to consider, put it in this box. If there are accommodations like there were gaps in stuff or there were specific challenges that you had, this is your opportunity to put it in that box.

Just do your best here and try not to write too much. The size of the boxes is the size of information - maybe you can go beyond the size of the box of course, but if you go more than twice the size of the lines here, then you might be writing a little bit too much. If you want to expand and have more information within your GitHub, you could absolutely do that, but remember this is for me in summary. Any additional information is going to be found in your repo - it should be easy for me to find.

Should you submit this form if you have yet to receive grading at all? It really is up to you. I've shared in the Discord, I've shared in a few places that I'm grading thousands of people for some weeks, and then in later weeks it's only hundreds. So if you get to later weeks in time, then you should get a grade. If you are very behind, you are at risk, and so closer to that date, make sure you get submitted no matter what. But if you want to wait a little bit and see if you get feedback from me, it's just up to you.

This bootcamp is extremely difficult. It's very hard for me to pull in TAs, whereas in the Big AWS Cloud Project Bootcamp, we were able to bring in TAs. But this one, it's mostly me and then the other Andrew if I have to bring him in. We're doing our best to try to get feedback back for everybody, but anyone that does submit for final submission and has all their weeks filled out will get feedback - video feedback specifically, not just written text.

There you go, and good luck, and hopefully you had a really fun time. I'm not trying to stress you out too much with this form, but that's what I'm looking for in this submission.

