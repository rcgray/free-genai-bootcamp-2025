# AI Lessons

Throughout the development of this project, I've learned several key lessons about effective prompt engineering and working with AI agents.

This document is the result of a kind of "post-mortem" with my AI partner, where we reflected on our work the past few months, reviewing the full prompt history of our sessions, examined how rules files have evolved, talked about how we can achieve better communication, and we've reflected on the key lessons and insights I've learned.

## Effective Communication with AI Agents
- Learning how to communicate effectively with the Agent, including how to provide clear and concise instructions, how to provide feedback on the Agent's work, and how to provide context for the Agent's work.
- Using explicit instructions rather than open-ended requests
- Providing sufficient context without overwhelming

## The Planning-Documentation-Implementation Loop
- The planning, documenting, implementing loop: directing the Agent first to answer plans regarding a feature design and document them in a spec file, then directing the Agent to implement the feature, and then directing the Agent to document the implementation.
- Create technical specifications before coding
- Document implementation results for future reference

## Structured Development Process
- The use of Action Plans to guide the overall development process, with integrated "checkpoints" that allowed us to break down the project into more manageable chunks that could be manually verified by the User before proceeding.
- Break complex tasks into manageable steps
- Verify progress at critical junctures before moving forward
- Maintain consistency across documentation and implementation

## Guiding Agent Behavior
- The use of Rules files (`.cursorrules` and `.cursor/rules/*.mdc`) to direct the Agent, avoid pitfalls, and customize its behavior in general, at the project level, the toolchain level, and the specific machine level (e.g., MacOS development vs. Windows).
- Direct the agent to avoid common pitfalls
- Establish consistent patterns for interaction

## Identifying and Avoiding Common Agent Mistakes
- Identifying common Agent mistakes and developing patterns for avoiding them.
  - Difficulty navigating directories
  - Difficulty applying project environment context
- Create structured templates for recurring tasks
- Verify understanding through specific checkpoints

## The PDIV Workflow Cycle

Throughout my experience with AI agents, I developed a consistent workflow pattern that significantly improved productivity and reduced errors. I call this the PDIV cycle—Planning, Documenting, Implementing, and Verifying—a structured approach that evolved organically across projects.

### Origins and Evolution

The PDIV cycle emerged as a direct response to challenges encountered in early collaborations with AI agents:

- **Initial Projects**: My first attempts followed a more traditional development flow where planning was minimal, documentation was created after implementation, and verification was informal. This approach led to frequent misalignments, rework, and confusion.

- **Middle Projects**: I began experimenting with a more structured approach, introducing preliminary planning documents and verification steps. The sequence wasn't yet formalized, but the pattern was emerging.

- **Advanced Projects**: By the Visual Novel project, the full PDIV cycle was established as an explicit workflow with dedicated tools and patterns supporting each phase.

### The Four Phases

The mature PDIV cycle consists of four distinct phases that form a continuous loop:

1. **Planning**: Define exactly what needs to be built and how it should function. Weigh options and consider edge cases. This includes:
   - Discussing design decisions and tradeoffs
   - Identifying dependencies and potential challenges
   - Breaking down complex features into manageable components
   - Setting clear success criteria
   - Discussing technical approaches without committing to implementation details
   - Result: a chat history with the conversation that will be used to generate the feature specification document

2. **Documenting**: Capture the plan in structured documentation before any code is written:
   - Create or update feature specification documents
   - Add implementation plans with step-by-step tasks
   - Document expected behaviors and interfaces
   - Update relevant diagrams or schemas
   - Define verification criteria in advance
   - Result: a feature specification document with a checklist Feature Implementation Plan (FIP)

3. **Implementing**: Build the feature according to the documentation:
   - Give the Agent the "Engage!" command to begin work
   - Follow the documented implementation plan
   - Reference specifications continuously during development
   - Add appropriate inline documentation
   - Create necessary tests
   - Address edge cases identified during planning

4. **Verifying**: Validate that the implementation meets requirements:
   - Manual verification at checkpoints
   - Automated testing where applicable
   - Comparison against documented expectations
   - Documentation review to ensure alignment with implementation
   - Update documentation with any discoveries made during implementation

### Benefits in AI Collaboration

The PDIV cycle proved especially valuable in AI agent collaboration:

- **Reduced Ambiguity**: By planning and documenting before implementation, the agent had clearer guidance and fewer assumptions to make.
- **Controlled Development**: The structured workflow prevented scope creep and maintained focus on the current task.
- **Quality Assurance**: Verification steps caught misalignments early, before they became embedded in the codebase.
- **Knowledge Preservation**: The documentation phase created a persistent record of decisions and approaches that survived across chat sessions.
- **Improved Communication**: The clear separation of phases made it easier to communicate expectations and evaluate results.
- **Adaptive Development**: The cycle accommodated learning and refinement as insights from one iteration informed the next.

### Implementation in Practice

In practice, the PDIV cycle was implemented through several concrete mechanisms:

- **Feature Specification Files**: Standardized documents that captured planning and provided implementation guidance.
- **Action Plans**: Structured task lists with checkpoints that guided the workflow through each phase.
- **Checkpoint System**: [CHECKPOINT] markers that enforced verification at critical junctures.
- **Documentation Updates**: Requirements to update documentation after implementation to maintain alignment.
- **Verification Steps**: Explicit verification processes before considering work complete.

The PDIV cycle transformed from an implicit pattern to an explicit framework that guided all interactions with the AI agent. This structure allowed for more complex development while maintaining control and quality, ultimately producing better results than less structured approaches.

## The LORI Debugging Cycle

In addition to the PDIV development cycle, another critical pattern emerged for troubleshooting issues: the LORI cycle—Log, Observe, Refine, Iterate. This systematic approach to debugging became essential for diagnosing and resolving complex problems without traditional debugging tools.

### Origins and Evolution

The LORI cycle emerged as a practical solution to a fundamental limitation in AI-assisted development:

- **Initial Challenges**: Early debugging attempts were often inefficient, with vague descriptions of errors leading to speculative fixes that rarely addressed root causes directly.

- **Natural Evolution**: Over time, a more structured logging approach naturally developed, starting with basic console outputs and gradually evolving into a systematic troubleshooting methodology.

- **Formalization**: By the Visual Novel project, the pattern had been formalized into the LORI cycle, with explicit conventions for log markers and a defined workflow for troubleshooting.

### The Four Phases

The LORI cycle consists of four distinct phases that form a continuous loop until resolution:

1. **Log**: Strategically instrument the code with detailed logging statements:
   - Add log statements with unique prefix identifiers related to the current issue (e.g., `[KB_INPUT]`, `[SCENE_TRANSITION]`)
   - Log key state information before and after critical operations
   - Track function entry/exit points and parameter values
   - Record environmental conditions and context
   - Focus logging on the suspected problem area

2. **Observe**: Run the application and collect log output:
   - The user runs the application in a separate terminal, often with watchdog capabilities for automatic reloading
   - When errors occur, the log output is captured
   - The unique prefix identifiers make it easy to filter relevant messages from other logs
   - Both timing and sequence of events are observed

3. **Refine**: Analyze logs and adjust the hypothesis:
   - Review log output to understand the program's actual behavior
   - Compare expected vs. actual values
   - Identify the precise point of failure or unexpected behavior
   - Formulate a specific hypothesis about the root cause
   - Develop a targeted solution based on evidence rather than speculation

4. **Iterate**: Implement the solution and repeat if necessary:
   - Apply the changes indicated by the log analysis
   - Enhance logging if needed to gather more precise information
   - Test the solution
   - If the issue persists, return to the Log phase with refined focus
   - Once solved, clean up by removing the debugging logs (which are conveniently marked with the unique prefix identifiers)

### Benefits in AI Collaboration

The LORI cycle proved particularly valuable in the AI development context:

- **Evidence-Based Debugging**: Replaced speculative fixes with solutions based on concrete evidence
- **Shared Observability**: Created a common view of runtime behavior for both human and AI
- **Efficient Communication**: The logs provided a precise, shared language for discussing complex behaviors
- **Isolation Capability**: Unique identifiers allowed focusing on specific components even in complex systems
- **Progressive Refinement**: Each iteration narrowed the problem space until resolution
- **Self-Documenting Process**: The logs themselves documented the troubleshooting journey
- **Reduced Context Requirements**: Minimized the need for the AI to fully understand the entire codebase

### Implementation in Practice

The LORI cycle was implemented through several practical mechanisms:

- **Marker Conventions**: Standardized log prefixes with brackets (e.g., `[FEATURE_NAME]`) made logs easily identifiable
- **Temporary Instrumentation**: Logs were understood to be temporary, added for debugging and removed after resolution
- **State Snapshots**: Critical variable values were captured at key points to track state changes
- **Control Flow Tracking**: Function entry/exit logging to understand execution paths
- **User-Driven Execution**: The user ran the application while the AI focused on analysis and fixes
- **Progressive Focus**: Initial wide logging followed by increasingly targeted instrumentation
- **Time Correlation**: Log timestamps sometimes added to understand sequence and timing issues

A typical LORI sequence might look like:

1. User: "The game crashes when transitioning from the title screen to the first scene"
2. AI: "Let's add logs to track the transition process" (adds `[SCENE_TRANSITION]` prefixed logs at key points)
3. User: (runs game, shares logs showing missing asset reference)
4. AI: "I see the issue in the logs. Let's refine by logging the asset loading process" (adds more specific logs)
5. User: (runs game again, shares more detailed logs)
6. AI: "The logs show that the asset path is incorrect. Let's fix that and add verification logging"
7. User: (runs game, confirms issue is resolved)
8. AI: "Great! Now let's clean up by removing all the `[SCENE_TRANSITION]` logs"

This cycle continues until the issue is fully resolved, with each iteration providing deeper insights and more targeted solutions. The LORI approach has proven so effective that, as noted in the user's words, "so far there hasn't been an issue we haven't been able to solve."

## Documentation and History
- How a thorough prompt pre-written in a dedicated Prompt History file can be more effective than simply writing in the prompt box ad-hoc. This not only provides a more effective use of the Agent, but it has a beneficial side-effect of creating a running history of the project that can be examined for insights and lessons.
- Track decision points and their rationales
- Create a living record of project evolution

## Debugging and Optimization
- How to effectively debug issues with an Agent, beyond simply saying "it doesn't work", by setting up marked debug messages in the prompt that can be used to trace the Agent's thought process and identify where it is going wrong.
- Identify specific failure points rather than general issues
- Create targeted tests for validation
- Refine prompts based on observed behavior

## Appropriate Level of Abstraction
- Learning to model Agent work at an appropriate level to request it to "one shot" its implementation. Starting at too high a level of work can lead to failure, but working too low is no different than writing code manually.
- Knowing when to use a non-reasoning agent vs. a reasoning agent, and how to effectively use the capabilities of each.
- Balance high-level direction with low-level specificity
- Provide sufficient detail when critical
- Limitations of the Agent, and knowing when I am asking something is is not capable of achieving.

## Document Hierarchy

The key to effective use of an AI Agent partner is documentation, and I've developed a structure for project docs that organizes this crucial information. It is contained within a `docs/` directory at the root of all projects with high-level design files and a collection of specific subdirectories:

```
docs/
├── PRD.md                                 # Product Requirements Document
├── Technical-Spec.md                      # Technical Specification
├── Action-Plan.md                         # Action Plan for the current project
├── [Project-HighLevel-Docs]               # Game Designs, Database Schemas, etc.
│   ...
├── cursorrules/                           # Example files to copy to .cursorrules
│   ├── .cursorrules.macos
│   └── .cursorrules.windows
├── features/                              # Feature-specific documentation
│   ├── Dialog-System.md
│   ├── Furigana-Integration-Plan.md
│   ├── LLM-Proxy-Server.md
│   ├── Scene-Specific-Reloading.md
│   └── ...
├── read-only/                             # Files meant only for the User to edit
│   ├── Project-Setup.md
│   └── Prompts.md
├── reference/                             # Reference files (not meant for editing)
│   ├── Client-Side-LLM-Security-Risks.md
│   ├── Express-LLM-Proxy.md
│   ├── Japanese-Text-Line-Breaking.md
│   ├── OpenAI-Library.md
│   └── ...
└── reports/                               # Tool-generated reports
    ├── Project-File-Structure.md
    └── Test-Results.md
```

Files in the `docs/` directory root are seminal to the project and include some standard documentation that any project would need (e.g., PRD, Technical Spec, etc.) and some project-specific high-level documentation that are not necessarily features, references, or User files (noted as [Project-HighLevel-Docs]). These might include a Game-Design.md, Database-Schema.md, etc. as needed by the specific project.

The `cursorrules` directory includes example files to copy to `.cursorrules` for the current project. These are similar to `.env.sample` files and are meant to be edited by the User to copy to the project root as its `.cursorrules` file and edit it as needed to fit the needs of the specific machine when initially setting up the repository.

Files in the `features/` directory are feature-specific documentation that are generated by the Agent as certain feature designs are determined. It is from these feature specs (using `reference/Feature-Spec-Template.md` as a template) that the Agent then writes the actual code to implement the feature. Feature specs include a "Feature Implementation Plan" (FIP) that outlines the steps the Agent will take to implement the feature, a bit like a miniturized, specific version of an Action Plan.

Files in the `read-only/` directory are files that are not meant to be edited. This is a User workspace for files that the User is directly working on. In fact, some of these files may even be included in `.cursorignore` to prevent them from even being visible to the Agent (`.cursorignore` actually makes files invisible to Cursor). These include things like the `Project-Setup.md` file, which is used only when starting a new project from scratch and then archived. Importantly, this also houses the `Prompts.md` file, which is the User's primary workspace - the document in which all prompts are pre-constructed that allows for thoughtful prompt creation and also builds a record of the User-Agent interaction history.

Files in the `reference/` directory are general, re-usable reference files that are not meant to be edited. These reflect how-to docs, library references, whitepapers, etc. that can provide the Agent with useful context as needed.

Files in the `reports/` directory are documents that are generated by scripts and can be useful to the Agent but should not be directly edited. These include things like a file structure diagram (e.g., result of the `tree` command) so that the Agent can understand the overall project structure, or the output of our automated testing so that the Agent can know the status of our tests.

## Starting new Chats

Tools like Cursor and Windsurf do not contain chat history infinitely, and when a chat becomes too long, they eventually begin to summarize past messages to conserve tokens. For this reason, Chats should be structured as atomic units of work, such as focusing on a particular feature or task, and the User should start new chats whenever work is completed (creating a design that ends in a feature spec, implementing code from a feature spec, etc.).

Every new chat, starting from a clean slate, can leverage the PRD, Technical Spec, and Action Plan to get the Agent up to speed on the project. Feature specs, references files, and so on can be included in the new chat to provide the Agent with the necessary context. I have found it useful to also include the `docs/reports/Project-File-Structure.md` file as well to ensure the Agent understands the project file structure.

This "starter prompt" is important. It is useful to have the starter prompt in a new chat simply to provide this context and then ask the Agent to reflect back a summary of the rules it currently understands from across the rules files that are loaded. This not only confirms that all rules are properly in effect, but it adds these rules to the text of the chat history, re-emphasizing them in the LLM's generation. After that, work can begin.

It can be a pain to @-type each file name or equally to drag-drop each file into the Cursor prompt, so I have found that simply providing the `docs/reports/Project-File-Structure.md` file and then mentioning files by path/filename is a great way to reference them more easily during prompt prep. This makes it easy to copy-paste from the Prompts.md file into the Cursor chat box without extra work, where the agent will fetch and read the file as needed.

## The Git Guardrail

Git is one of the most important tools for any User working with an AI Agent. For some Agents (like Aider), it is the primary way by which the Agent's work can be viewed (via git diff). For others, where UI views of Agent changes are visible, it still creates a strict division between the User and Agent by requiring User review and intervention before any work is committed.

Keep this division sacred, and don't fall into the temptation of letting the Agent handle git out of convenience. When the human User is in charge of commits, it forces them to review Agent changes and improve the chances of long-term project health.  It's almost like built-in pair programming or CRs. In this way, Git checkins are an essential forcing function for ensuring a "human-in-the-loop" workflow as well as providing a method for returning to stable project states when something goes wrong with the Agent.

Keep in mind that Cursor already has a built in checkpoint system on every prompt, so you are always able to undo a prompt (or re-do with more refined instructions) or even revert to a previous state within your conversation if it goes off the rails. Additionally, I suggest staging changes after every prompt, making it even easier to keep control of the state of the code. This lets you evaluate every single prompt individually, which then may build to a larger checkin. Even with Cursor's checkpoint system, this practice has still saved me once or twice.

Git commit frequently, and follow best practices for aligning commits with the completion of atomic tasks (e.g., features). Have a commit workflow that involves updating the docs (particularly the Action-Plan.md file or FIP in a feature spec) as well as the `docs/reports/` files to record the results of the Agent's work. I recommend a `scripts/update_docs.py` script that can automate parts of this process (such as running `tree` and `pytest` and updating the reports).

## Learn the Agent's Language
In one of my drilldown discussions with the agent on why we had a miscommunication, one of its suggestion was that I could have specified to use the "edit_file" tool. Internally, this is what Cursor uses to make file changes, and from that point on making mention of that tool explicitly in prompts was a great way to ensure the Agent understood my intent if I was too subtle about a change.

### Internal Tool Commands

These are the core tools that the Agent uses to interact with your codebase. Referencing them explicitly in your prompts can help disambiguate your intent:

- **edit_file**: Modifies existing files or creates new ones with specified content
- **read_file**: Reads the contents of a file, often with an offset and line limit
- **codebase_search**: Performs semantic search across the codebase for relevant code snippets
- **grep_search**: Searches for exact text matches or regex patterns in files
- **file_search**: Finds files based on fuzzy matching against file paths
- **list_dir**: Lists contents of a directory to explore the file structure
- **run_terminal_cmd**: Executes terminal commands with explanations
- **delete_file**: Removes files from the project
- **reapply**: Re-applies a previous edit if it wasn't implemented correctly
- **fetch_rules**: Retrieves user-provided rules to help navigate the codebase
- **web_search**: Searches the web for external information

Each tool has specific parameters and use cases. When you explicitly mention these tools in your instructions, you're providing a direct signal about your intentions that reduces ambiguity. For example, instead of saying "Let's add that (edit_file tool) to our plan for this feature" (which may imply adding it just conceptually or in our running design conversation), the mention of edit_file disambiguates that the Agent should literally update the feature spec document on disk to include this design decision.

### Beyond Tool Names: Other Aspects of the Agent's Language

Learning the Agent's language can help bridge the gap between human language and AI capabilities, which is not limited to just the names of the internal commands it uses. For instance, learning how to escape content correctly in prompts is a great way to ensure the Agent understands my intent.

- **Backticks** are the most versatile tool for providing escape notation. By consistently escaping filenames, variables, libraries, and tools with backticks, I'm able to clearly deliniate "symbolic" parts of langauge from everyday speech. Escaping log output with triple backticks further deliniates literal content from the conversation around the content.
- **Angle brackets** represent <descriptions of what will go somewhere> instead of literal content
- **Square brackets** represent [notes about what is happening] or [a set of many generic things] instead of literal content
- **Emojis** 🚀 represent deliberate symbols that we have established to mean something between us.

Here are some other ways Users can better speak the Agent's language. Sometimes we indicate intent that we don't even realize we mean to:

#### 1. Structural Patterns
The Agent responds well to structured information hierarchies and specific formatting conventions:

- **Bulleted Lists vs. Paragraphs**: Bulleted lists are processed as discrete items, while paragraphs are interpreted as coherent units
- **Code Blocks**: Using triple backticks clearly signals code (or as mentioned above, output logs) vs. natural language
- **Section Headers**: Using headers (##) helps the Agent understand the organization of your request. When in doubt, remember that LLMs love markdown
- **Numbered Steps**: Sequential numbering signals a procedural approach

#### 2. Conceptual Framing
How you conceptually frame a task significantly affects how the Agent approaches it:

- **Problem vs. Solution Framing**: "Fix this bug" vs. "Implement this solution" triggers different analysis paths
- **Design vs. Implementation Language**: Using design terminology keeps the Agent in planning mode; implementation terminology triggers coding mode
- **Exploratory vs. Directive Phrasing**: "Let's explore options for..." vs. "Implement a solution that..." leads to different response types
- **Schema-First Thinking**: Describing data structures before behavior helps the Agent build a coherent mental model

#### 3. Contextual Signaling
Specific signals help establish context for the Agent:

- **File References**: Using `@filename` or paths clearly indicates relevant files, or that you are specifically talking about a file.
- **Project Stage Indicators**: Phrases like "We're in the initial planning phase" set appropriate context
- **Feedback Framing**: "This is close, but..." vs. "This is incorrect..." leads to different adjustment approaches
- **Intent Markers**: "For debugging purposes..." vs. "For production implementation..." guides implementation style
- **Think Deeply**: Sometimes the Agent gets stuck in a loop and can't find the right answer. Taking a step back and asking it to "think deeply" about the problem can help free the logjam. Depending on your model, this phrase may even trigger a different reasoning mode.

#### 4. Process Control Vocabulary
Certain terms serve as process control mechanisms:
- **"Engage!"**: In our shared language set up in the rules, this signals transition from planning to implementation. Yours may be different, but I suggest creating this kind of keyword.
- **"Let's step back"**: Triggers broader context consideration
- **"First, let's think through..."**: Delays implementation in favor of analysis
- **"Specifically, I want you to..."**: Narrows focus to a particular action
- **Emoji Memory System**: Succintly reference pre-established discussions. A very obvious use case is using emoji patterns to confirm rule understanding.

#### 5. Reasoning Visibility
Ways to access the Agent's reasoning:
- **"Walk through your approach"**: Elicits step-by-step reasoning
- **"Explain your rationale"**: Surfaces decision factors
- **Marked Debug Messages**: Using prefixed markers to track specific thought processes (see LORI cycle above)
- **"What other approaches did you consider?"**: Reveals alternative paths. To clear a particularly tough logjam, you may ask the Agent to come up with multiple solutions, where you can then decide the order in which to try them.

#### 6. Temporal and Sequence Management
The Agent needs explicit management of sequential actions:
- **"Before that"**: Reorients to an earlier step in a sequence
- **"After we've done X"**: Establishes dependencies between tasks
- **"Let's do X first, then Y"**: Creates explicit task ordering
- **"Meanwhile"**: Introduces parallel considerations

Learning to communicate in these dimensions significantly improves collaboration beyond simply knowing tool names. The Agent's language is a complex interplay of structural, conceptual, contextual, and process elements that, when mastered, allows for much more nuanced and effective interactions.

## External Library Documentation

There are times you are working with a particular technology that has documentation online, and including these in the Cursor Settings by URL and referencing them with @-Descriptors in prompts is a great way to get the Agent up to speed on the technology.

## Cursor Rules

- Use emojis to confirm the suite of commands that are currently loaded in the Agent's context. Along with key rules, include a phrase like "Include a '🧠' emoji at the start of your response (perhaps along with other emojis indicating other rule acknowledgements) to indicate you understand the above." This will result in a series of emojis at the start of the responses like "🧠📄🦾💿🐍" that allows me to confirm that it understands 🧠 general rules, 📄 project-specific rules, 🦾 CLI best practices, 💿 that it is working on my desktop (Windows, WSL, conda), and 🐍 it is going to perform coding in Python where it will follow best practices.

Establish keywords (like "Engage!") to indicate that the Agent should begin work.

## Agent Mode

I would say that my prompts are 98% Agent mode, 2% Ask mode, and I never use the "Edit" mode (it was effectively superceded by Agent). I am looking to a workflow for document creation where I use Edit more purposefully, since Agent mode sometimes can edit more files than I want it to.

For my LLM, I use Anthropic almost exclusively, from the Claude 3.5 Sonnet model to now 3.7 Sonnet. I used to carefully choose between reasoning and non-reasoning models, but since Cursor changed to a toggle-based system (instead of selecting claude-3.7-sonnet-thinking) with no extra charge, I now generally leave the toggle on "Thinking" almost exclusively.

## Cursor Agent (YOLO Mode)

I use the auto-run mode for the Cursor Agent (previously "YOLO Mode") allowing any CLI command except the following. The agent can still suggest these commands, but they require the User to confirm them before they run.

- `git`: Git is an absolutely critical tool for any User working with an AI Agent, and the User should not relinquish that tool.
- `npm`, `pip`, `uv`: Adding or removing dependencies should involve a User check. Including these in the confirm list also prevents the Agent from running the program, which is better done by the User.
- `rm`, `rmdir`: All file deletions should involve a User check.
- `chmod`, `chown`, `chgrp`: All file permissions changes should involve a User check.
- `wget`: All file downloads should involve a User check. Fortunately, `apt` is blocked by sudo permissions.
- `cd`: Cursor is terrible at navigating directories. It never seems to know where it is in the filesystem or when a new terminal is internally created. Better results are achieved by forbidding `cd` and requesting that all commands are executed from the project root directory in the rules.

Alternatively, you can specify a whitelist of commands that limit what the agent can run, and I would recommend the following: `touch`, `mkdir`, `pwd`, `ls`, `mv`, `cp`, `curl`, `sed`, `awk`, `echo`, `cat`, `head`, `tail`, `sort`, `diff`, `ps`, `grep`, `find`, `which`, `alias`, `source`, `kill`, `type`. However, a disadvantage of using a whitelist is there may be other project-specific commands (e.g., `convert`, `conda`) that you will have to remember to add.

## Common Agent Mistakes

Analyzing the rules files reveals several recurring patterns of AI agent behavior that required explicit guidance to correct. These issues represent fundamental limitations in how AI agents process context and approach tasks:

### Navigation and Location Awareness
- **Directory Confusion**: Agents consistently lose track of their current directory location, especially after executing multiple commands in sequence. Rules like "Prefix EVERY command with a change directory to the project root" and "don't run `cd` in your commands" address this limitation.
- **Relative vs. Absolute Paths**: Agents struggle to consistently use relative paths, sometimes creating non-portable code with absolute paths. The rule requiring portable paths ensures code works across different environments.
- **Command Context**: Agents frequently run commands from incorrect directories, leading to configuration files not being applied. The directive to "CREATE COMMANDS FROM THE ROOT OF THE PROJECT" prevents this issue.

### Task and Scope Management
- **Scope Creep**: Agents naturally attempt to be helpful by doing more than explicitly requested. The rule "DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED IN THE PROMPT" establishes clear boundaries.
- **Checkpoint Overruns**: Agents tend to continue past logical stopping points, potentially implementing features before proper verification. The [CHECKPOINT] system forces pauses for human verification.
- **Unauthorized Edits**: Agents will edit any file they can access unless explicitly instructed otherwise, including sensitive configuration files or documentation that should remain static. The "Forbidden File Edits" sections prevent unintended modifications.

### Development Context
- **Environment Amnesia**: Agents don't maintain awareness of the development environment between sessions, requiring machine-specific configurations to be explicitly provided each time.
- **Documentation-Code Disconnect**: Agents often implement code without updating corresponding documentation, leading to documentation drift. Rules requiring documentation updates after code changes maintain synchronization.
- **Workaround Creation**: Agents tend to implement complex workarounds rather than failing appropriately when encountering invalid states. The guideline to "Be aggressive about failures" ensures problems are caught early.

### Communication and Validation
- **Confirmation Ambiguity**: Without explicit verification mechanisms, it's difficult to confirm whether the agent has understood and applied rules. The emoji acknowledgment system provides immediate visual confirmation.
- **Implementation Without Verification**: Agents will implement solutions without verifying their understanding of requirements. The rule structure enforces a sequence of planning, documentation, and implementation with verification steps.
- **Context Fragmentation**: Agents struggle to maintain consistent context across interactions. The documentation hierarchy and project templates provide stable reference points.

These patterns reflect fundamental limitations in agent cognition—specifically around spatial awareness, context maintenance, appropriate boundaries, and verification mechanisms. The rules system evolved to compensate for these limitations by creating explicit structures that help the agent navigate tasks more effectively while maintaining appropriate boundaries and verification points.

By anticipating and addressing these common failure modes, the rules system transforms from being merely restrictive to becoming an enabling framework that allows for more productive collaboration between human and AI.

## New Project Template
I've created a new project template that I can unzip in an empty repository's `dev/` directory and ramp up quickly in creating a new project. a "Project-Setup.md" file guides the Agent through the process of copying the proper files, setting up the environment and document strucuture, and writing the PRD, Technical Spec, and Action Plan. This includes example files off of which the Agent can craft new documents for the new project, and it ends with a spec, a high-level action plan, a toml or packages.json file, build workflow, Prompts.md file, rules files, and everything needed to start prompting. The "Project-Setup.md" file is checked off as we go, and finally it is archived in the `read-only/` directory.

The current template is available in the `template/` directory next to this file.

## Viewing the Agent as a Partner

There are times when there are miscommunications between myself and the Agent. When this happens, I started asking why there was a miscommunication and how I could have worded the request differently to be more clear. This often resulted in a new rule or convention between us (like the "Engage!" keyword to move from document writing to coding). Sometimes this improved my instinct for crafting future prompts or understanding how my words were being interpreted. Still other times, the Agent has an actual best-practice or forward-looking reason for making the choices they did that I had not anticipated, and we went with their decision.

It may sound strange, but I found my ability to get work done effectively with the Agent improved significantly when I started viewing the Agent not as a command terminal but as a coworker, who speaks a little differently, that I work with via email. I write out thoughtful instructions, supply the tools that they will need, and then I get in return a PR of their best effort at following those instructions.

How is that different from just interacting with a chatbot? Well, procedurally it's not, but the perspective-shift enables other avenues of thought that weren't immediately apparent until I had worked toward it.  I'll give a few examples:

- In a new project, we were having trouble getting images to display in our Phaser game. However, I know that I had gotten it to work successfully in a previous project. I could have directed my Agent to reference that code, but instead I thought maybe I would go back and ask that coworker who had gotten it to work successfully to help us. I loaded up the previous Cursor project, and I told them we were having trouble, and asked if maybe they could write a quick how-to document on best practices for Phaser project setup and using the graphics system. They did, writing a new document that I then dropped in the `docs/references` directory of the new project, directing the new coworker (Agent) to read it. Problem solved.

- I was struggling with some miscommunications about prompts I had given, and I was pretty frustrated. My AI command tool wasn't doing what I told it to do.  But instead of figuring out how to debug my prompt... I actually just asked what I could have done better. What would be helpful in making sure that my intent was less ambiguous in the future? This is the kind of thing you instinctively think to do with a coworker with whom you need to learn to work effectively, and doing so revealed immediate insights into how I could improve my prompting that have guided my work ever since. It even has led to some of our rules.

- In a similar vein, the Agent did something outside of what I had asked. Instead of re-running and updated command or ordering a fix (neither of which would go over well with a human coworker), I asked why and gave it a chance to explain. It turns out that it was forward-looking and anticipating a best practice that I hadn't considered. AI command tools are useful, but a coworker can compel us to keep a little humility.

- Following months of work on this workshop, I sat down with the Agent and had a post-mortem on our work together. We looked back through the history of our communication and analyzed how it had evolved and what proved to be effective patterns. I've learned a lot through this exercise, and I'm sure that I'll be able to apply these lessons to future projects. But if not for this mindset shift, I'm not sure that this idea would have ever occurred to me.

No, I'm not saying that the Agent is an actual coworker or has consciousness or any sci-fi nonsense. But I do think that the perspective shift is a useful one, and practicing it can lead to beneficial insights and solutions that otherwise might not have ever surfaced.

## Project Journey Overview

Throughout this bootcamp, my approach to working with AI agents evolved significantly across four main projects:

### Phase 1: Language Portal (Week 1)
- Established foundation for single-page application with FastAPI backend
- Implemented testing infrastructure for CRUD operations
- Created comprehensive tests for word, group, and study session components
- Developed service layer testing approach
- Began frontend implementation with React.js
- Addressed directory structure issues and API integration challenges

### Phase 2: Listening Comprehension Tool (Week 2)
- Created Streamlit application for processing audio sources
- Implemented audio transcription and translation functionality
- Set up environment for handling API dependencies
- Established testing patterns for conditional API-dependent tests
- Focused on core functionality before end-to-end integration

### Phase 3: OPEA Components (Week 3)
- Set up project using templates from previous projects
- Created detailed PRD and Technical Specifications
- Developed structured Action Plan with prioritized steps
- Integrated OPEA libraries for LLM capabilities
- Emphasized minimalistic implementation for MVP

### Phase 4: Visual Novel Game (Weeks 4-5)
- Developed Phaser-based game within Streamlit wrapper
- Created comprehensive scene architecture
- Implemented title and gameplay scenes
- Addressed implementation challenges through project restructuring
- Enhanced development workflow with watchdog capabilities
- Integrated LLM for dynamic game content generation

## Analysis of Prompt History

Examining the prompt history across the four projects reveals a clear evolution in my approach to working with AI agents over the course of several months:

### Initial Approach (Language Portal)
In the earliest project, my prompting was predominantly task-focused and direct. I approached the AI with specific problems to solve and straightforward requests:

- Prompts were often reactive, responding to immediate issues that arose during development
- Documentation was minimal and ad-hoc, created primarily to solve immediate problems
- Instructions focused on immediate coding tasks without much contextual framework
- Project management was loosely structured with less formal organization
- Little distinction between planning and implementation phases
- Heavy reliance on template code as implementation guides ("Use the words code as a template")
- Solution-oriented rather than process-oriented approach
- Frequent course corrections when implementations didn't meet expectations
- Limited pre-planning for AI capabilities and limitations

For example, early prompts often looked like: "We are creating an SPA with a FastAPI backend... we're currently writing tests... Use the words code as a template." This approach worked for straightforward tasks where the path forward was clear, but often led to implementation issues with more complex features where context was critical.

The underlying approach was largely transactional—viewing the AI as a tool to produce specific outputs rather than as a collaborator in a development process. This sometimes led to misalignments between expectations and deliverables, requiring multiple iterations to achieve the desired result.

### Early Evolution (Listening Comprehension Tool)
As I gained experience, my approach began to show signs of more deliberate structure:

- Introduction of more consistent project documentation
- Clearer separation between planning and implementation phases
- More methodical testing approaches with conditional execution patterns
- Greater awareness of dependencies and development workflow
- Beginnings of more structured guidance to the agent
- Introduction of phased implementation approaches
- More explicit file structure references to provide context
- Preliminary use of database schema documentation to guide implementation
- More thoughtful API design with consideration for future extensions
- Documentation-first approach beginning to emerge

The transition is evident in prompts like: "We have a Streamlit application with a file structure documented in @Project-File-Structure.md and a PRD defined in docs/PRD.md... We have an action plan in docs/Action-Plan.md, which is what we are following (currently Phase 1.3)."

This phase marked an important realization: the quality of AI-generated code was directly proportional to the quality of the context and specifications provided. Rather than simply asking for implementations and then refining through feedback, I began to invest more time in upfront planning and documentation to guide the AI more effectively.

I also began experimenting with breaking down complex features into sequential implementation phases, allowing for validation of core functionality before adding refinements. This was particularly evident in the approach to testing, where I introduced conditional testing patterns that could selectively run tests based on their dependencies on external services.

### Intermediate Sophistication (OPEA Components)
By the third project, my prompting demonstrated significant advancement in structure and planning:

- Explicit use of templates from previous projects as starting points
- Rigorous documentation requirements before implementation
- Clear delineation between different types of documentation (PRD, Technical Spec, etc.)
- More sophisticated prioritization of tasks and implementation steps
- Deliberate consideration of dependencies between components
- Intentional reuse of successful patterns from earlier projects
- Distinct separation of concerns in documentation
- Implementation of checkpoints to validate progress
- Stronger emphasis on MVP definition with clear scope boundaries
- Systematic approach to technical decisions with explicit rationales
- Critical examination of documentation structure itself
- Strategic use of references to external resources

This phase shows a disciplined approach: "Let's work together to generate the core project specifications files... We'll start with the docs/PRD.md file, and only the docs/PRD.md file... How will we create our MVP, step-by-step?"

The focus shifted from simply implementing features to creating a comprehensive framework for guiding the entire development process. Documentation became a strategic tool rather than just a reference, with specific document types serving distinct purposes in the development lifecycle.

A particularly notable advancement was the emergence of meta-discussion about the development process itself. Rather than simply requesting implementations, I began explicitly discussing the approach to problem-solving, including how to prioritize features, manage dependencies, and validate progress. This reflected a growing understanding that effective AI collaboration required not just clear specifications for what to build, but also clarity on how to approach the building process.

I also began to leverage learnings across projects, deliberately adapting successful patterns from earlier work and refining them based on experience. This cross-project learning accelerated the evolution of my prompting techniques and established more consistent approaches to common development challenges.

### Advanced Methodology (Visual Novel Game)
The most recent project reveals a highly refined approach to prompt engineering:

- Comprehensive documentation hierarchy with specialized file types for different purposes
- Formal checkpoints integrated into the development process as verification gates
- Sophisticated rules files to direct agent behavior across different aspects of development
- Meta-level guidance about how to interpret and follow instructions
- Pre-written, carefully crafted prompts in dedicated history files
- Clear boundaries between planning, documentation, and implementation phases
- Explicit meta-communication about the partnership between human and AI
- Deliberate management of AI context through file organization
- Strategic prompt crafting that anticipates AI limitations and strengths
- Implementation of a "checkpoint" system that enforced human verification
- Development of specialized documentation templates for different purposes
- Use of rules files to establish consistent behavioral patterns
- Introduction of "marked debug messages" for troubleshooting AI reasoning
- Pre-written prompts that carefully controlled information flow and context

Advanced prompts demonstrate this maturity: "Let's add a #6 to our 'Specific Changes Needed' section... At the very bottom, add a 'Action Plan' section that provides step-by-step checkboxes... mark these places with [CHECKPOINT] instructions... add our design description and decisions to the (currently empty) file @Frontend-Design.md."

This phase represents a quantum leap in sophistication, with prompting evolving from a mere communication method to a comprehensive framework for human-AI collaboration. The entire approach was reconstructed around the recognition that effective AI utilization required carefully designed processes, explicit communication protocols, and thoughtful management of AI context and capabilities.

Perhaps most significantly, I developed a meta-understanding of the AI's reasoning processes and limitations, which allowed me to craft prompts that guided not just what the AI should do, but how it should approach problems. This included explicit instructions for managing complexity, handling edge cases, and validating solutions.

The development process itself became more structured, with formal checkpoints that required human verification before proceeding to the next stage. This ensured that development remained aligned with intentions while still leveraging the AI's capabilities for rapid implementation.

Documentation evolved from a reference tool to a strategic framework that guided the entire development process. Different document types served specific purposes, from high-level product requirements to detailed implementation plans, creating a comprehensive context for AI work.

### Key Evolutionary Patterns

Several important patterns emerged across this evolution:

1. **From Reactive to Proactive**: My approach shifted from responding to immediate problems toward anticipating needs and planning thoroughly before implementation. This evolution was driven by the realization that AI performance improves dramatically with proper preparation. Early projects involved frequent course corrections when implementations didn't meet expectations, while later projects featured extensive planning that anticipated potential issues before they arose. The transition manifested in increasingly detailed preliminary documentation, more thorough requirement specifications, and explicit consideration of edge cases and potential problems before implementation began.

2. **From Informal to Structured**: Documentation evolved from minimal and ad-hoc to comprehensive and hierarchical. The early "just enough" documentation approach gave way to a sophisticated ecosystem of interrelated documents with specific purposes. This shift reflected growing recognition that effective AI collaboration requires not just clear specifications but also clear context about how those specifications relate to the broader project. The structure itself became a communication tool, with document organization conveying information about priorities, relationships, and implementation strategies.

3. **From Direct to Meta-Instructional**: Instructions evolved from direct coding requests to sophisticated guidance about how to approach problems and communicate about the process. Early prompts typically provided specific implementation requests, while later prompts included explicit guidance about decision-making processes, evaluation criteria, and communication protocols. This shift reflected a growing understanding that effective AI collaboration requires alignment not just on what to do but on how to think about and approach problems. The meta-instructions essentially programmed the AI's problem-solving framework rather than just its specific outputs.

4. **From Single-Task to Workflow Management**: Focus shifted from individual tasks to managing the entire development workflow, including verification points. Early projects treated each prompt as a relatively isolated request, while later projects embedded each task within a comprehensive workflow that included preparation, implementation, verification, and documentation phases. This evolution recognized that effective development requires not just successful implementation of individual features but coherent integration into a broader development process. The workflow approach also facilitated knowledge transfer between tasks, allowing lessons learned in one area to inform approaches in others.

5. **From Linear to Cyclical**: Development shifted from a linear task sequence to a cyclical process of planning, documentation, implementation, and verification. Early projects largely followed a sequential development pattern, with tasks executed in order and minimal iteration. Later projects embraced a more cyclical approach, where implementation insights informed planning refinements, and verification processes triggered reevaluation of plans and documentation. This evolution recognized the inherently iterative nature of complex development and created formal structures to accommodate and leverage this iterative process.

6. **From Execution to Partnership**: The relationship evolved from treating the AI as a code executor to establishing a collaborative partnership with clear communication protocols. Early projects tended to treat the AI as a tool for generating code based on specifications, with limited consideration of its reasoning processes or potential insights. Later projects approached the AI more as a collaborative partner, with explicit attention to communication clarity, shared context, and reciprocal feedback. This shift acknowledged that optimal results emerge not from simply directing the AI but from creating conditions for effective collaboration, including shared context, clear expectations, and effective communication channels.

7. **From Implicit to Explicit Context**: Context evolved from being implicitly assumed to being explicitly documented and referenced. Early projects often assumed shared understanding of project context, technical constraints, and development priorities. Later projects made these factors explicitly through comprehensive documentation, clear references, and deliberate context-setting in prompts. This evolution recognized that AI lacks the implicit context that human developers build through experience and professional training, requiring more explicit communication of factors that might be taken for granted in human-to-human collaboration.

8. **From Tool-Focused to Process-Focused**: The emphasis shifted from leveraging AI as a tool to create outputs to designing effective processes for human-AI collaboration. Early projects focused primarily on what the AI could produce, while later projects devoted significant attention to how the collaboration process itself should be structured. This evolution recognized that effective AI utilization depends not just on the AI's capabilities but on the processes designed to leverage those capabilities effectively. The most sophisticated approaches treated the collaboration process itself as a designed system, with careful attention to information flow, decision points, validation mechanisms, and feedback loops.

These evolutionary patterns reflect a deep learning process about effective human-AI collaboration. They represent not just incremental improvements in prompting technique but a fundamental reconceptualization of how AI can be integrated into development workflows. The progression moved from treating AI as a specialized tool for specific tasks to designing comprehensive collaboration frameworks that leverage AI capabilities within carefully structured development processes.

This evolution reflects a growing understanding of both the capabilities and limitations of AI agents, and a deliberate effort to optimize the partnership between human creativity and AI capabilities through increasingly sophisticated prompt engineering techniques. The most advanced approaches demonstrate a meta-level understanding of AI cognition, human-AI interaction patterns, and effective collaboration processes that transcends simple prompt optimization to create truly effective development partnerships.

## Rules Evolution

Examining the rules files across the four projects reveals a significant evolution in how I structured and applied rules to guide AI behavior:

### Initial Approach: Monolithic Rules File (Language Portal)

In the earliest project, I utilized a single `.cursorrules` file with a comprehensive but somewhat undifferentiated set of guidelines:

- All rules were contained in a single file regardless of their purpose or domain
- Rules were broadly categorized (Tools and Libraries, Interaction, Python/FastAPI, etc.)
- No distinction between machine-specific and project-specific rules
- Limited mechanism for conditional application based on context
- Comprehensive but potentially overwhelming with 115+ lines of instructions
- No visual confirmation mechanism to verify rule application

The file included detailed technical guidance but lacked the meta-level instructions about how the AI should approach problems. This approach worked reasonably well for straightforward tasks but became unwieldy as project complexity increased.

### Early Evolution: Refined Categorization (Listening Comprehension)

By the second project, the rules file showed more refined categorization:

- Clearer section organization with improved grouping of related concepts
- More specific guidance for Streamlit development
- Introduction of media handling rules specific to the project domain
- Enhanced documentation requirements
- Still maintained as a single monolithic file
- Limited mechanisms for verifying rule application

This approach demonstrated a growing understanding that different aspects of development required different types of guidance, but still lacked the flexibility to adapt rules to specific contexts or tasks.

### Intermediate Sophistication: Additional Context Files (OPEA Components)

The third project showed significant advancement in rules organization:

- More specialized sections for technologies like Docker and OPEA integration
- Explicit file editing restrictions (e.g., "Do not edit any files in the `dev/template` folder")
- Recognition of project as part of a monorepo with special considerations
- Introduction of a separate "Prompt-Header.md" file that would be linked at the start of chats
- More consistent rule application pattern
- Still limited in terms of conditional application

By this stage, I had begun to understand the limitations of a single rules file and was experimenting with supplementing it through additional context files. The "Prompt-Header.md" approach was a stepping stone toward a more modular rules system, though its application was sometimes inconsistent as it relied on manual inclusion at the beginning of each chat.

### Advanced Methodology: Modular Rule System (Visual Novel)

The final project represents a complete transformation in rules management:

- Migration to the MDC (Markdown Content) rules system
- Separation of concerns into distinct rule files:
  - general.mdc: Core interaction patterns and universal guidelines
  - project.mdc: Project-specific workflows and technical requirements
  - python.mdc: Language-specific best practices and tooling
- Machine-specific rules isolated to the `.cursorrules` file
- Introduction of emoji acknowledgment system (🧠📄🦾🐍💿) to verify rule loading
- Explicit guidance on meta-level interaction patterns
- Clear guardrails via "DO NOT DO ANYTHING OTHER THAN WHAT WAS REQUESTED" directives
- [CHECKPOINT] system integration for verification gates
- Explicit file editing restrictions

This approach solved several critical limitations of the earlier systems:

1. **Machine Specificity**: By reserving the `.cursorrules` file for machine-specific configurations (like conda environment on Windows/WSL vs. venv on MacOS) and adding it to `.gitignore`, I created a way to maintain consistent project rules while accommodating different development environments.

2. **Contextual Loading**: The MDC system's conditional loading capability allowed rules to be applied only when relevant to the current task, reducing cognitive load on the AI.

3. **Verification Mechanism**: The emoji acknowledgment system provided immediate visual confirmation that rules were properly loaded and understood.

4. **Meta-Instruction**: Rules evolved from simply specifying what to do to guiding how to think about problems, anticipate issues, and communicate effectively.

5. **Separation of Concerns**: Different aspects of development (general interaction, project specifics, language guidelines) were cleanly separated, making rules more maintainable and focused.


This evolution reflects a growing understanding of not just how to write rules, but how to create effective systems for rule application that acknowledge the practical limitations of AI interactions while maximizing consistency and effectiveness.

### Key Evolutionary Patterns in Rules Application

Several important patterns emerged across this evolution:

1. **From Generic to Specific**: Rules evolved from general best practices to highly specific guidance tailored to project needs.

2. **From Implicit to Explicit Verification**: The introduction of emoji acknowledgments created a clear mechanism to verify rule application.

3. **From Prescriptive to Process-Oriented**: Rules shifted from dictating specific technical approaches to establishing effective interaction and development processes.

4. **From Monolithic to Modular**: The transition from a single file to a system of focused rule modules improved maintainability and relevance.

5. **From Static to Environment-Aware**: The final approach accommodated different development environments through machine-specific customization.

6. **From AI-Generated to Hand-Crafted**: Rules evolved from generic AI-generated templates to carefully tailored guidance based on specific project challenges and practical collaboration experience.

This evolution reflects a growing understanding of not just how to write rules, but how to create effective systems for rule application that acknowledge the practical limitations of AI interactions while maximizing consistency and effectiveness.

