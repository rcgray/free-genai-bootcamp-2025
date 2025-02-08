# Japanese Language Learning App

The following are investigations and key decisions that were made while designing the Sentence Constructor Activity.

## Language Formality
The Japanese language has different modes of speech, depending on the relationship between the speaker and the listener. These styles can generally be divided into three levels: Casual, Polite, and Formal. In the Casual style (くだけた表現, kudaketa hyougen), the speaker is talking to either someone who is close to them within their family or friend group, or they are speaking to someone below them in age or social stature, such as a younger sibling or student in a lower grade. Casual style is a shorter, more curt and informal mode of speech that is not disrespectful but rather efficient and endearing. Casual style often uses the raw or infinitive form of verbs (食べる vs. 食べます), prefers "だ" over "です," and drops particles that are common in speech.

In the Standard or Polite style, sometimes called "です-ます" form is used in most public situations and between speakers who are unfamiliar with each other. It's generally accepted everywhere and is considered proper in most situations. It maintains all particles and uses standard honorifics (お金,お酒), as well as fully conjugated verbs.

The Formal style, known as 敬語 (keigo), is used in business formal situations, when speaking to strangers to whom you are in service (e.g., customers), or when speaking in honor to someone who is above you in social stature, age, or position. It will use special forms, humble and honorific prefixes, and will have formal verb constructions.

So the question is how will our application manage these different levels of speech when requesting translations? If we have a user who is purposely attempting to learn 敬語, perhaps there should be some way for them to specify this. On the other hand, if a user is looking to improve their conversation with close friends or a romantic partner, they may want to intentionally train in くだけた. The answer to this will depend on what we want this app to be.

## Writing Systems
The Japanese writing system is a complex, mixed system that evolved over a long period of time (centuries) with influences from several other cultures. It is a hybrid "logosyllabic" system that consists of both a large set of logographic characters called 漢字 (kanji) and two syllabic (moraic) scripts called 仮名 (かな, kana): namely ひらがな and カタカナ. In both of the 仮名 syllabaries, 46 "characters" (morae) are used to indicate the sounds that would be used to construct words. Though all Japanese words can be formed (in sound) using these 46 morae (along with diacritical marks that denote a total of 107 distinct sounds) just as one could construct all words in a roman language with a Latin alphabet (and its own diacritical marks), additional context can be provided by replacing phonetic sequences with the logographic representations of their 漢字 form.

The 漢字 logography consists of over 50,000 characters (with 2,136 characters considered common in modern use), which is not an immediately accessible reading experience to all students of Japanese, including children in Japan. Therefore, a style of writing known as 振り仮名 (furigana) includes a 仮名-based annotation (usually in superscript) for the 漢字 characters used that serves as a pronunciation guide in writing meant for a less-proficient audience. Though this is not strictly a different character set, it is still a relevant "mode of writing" in any learning application.

Further, to aid in the readability of Japanese text by native speakers of Latin alphabet languages, as well as integration of ubiquietous technology interfaces that presume a Latin-based alphabet, another representation of Japanese text is available in the form of ローマ字 (romaji). Romaji is a romanization of 仮名 morae, providing an approximation of the same sounds written using the Latin alphabet as a pronunciation guide. In our design, we will need to consider which of these systems we want to use and how we want to display them and use them for learning, though this will likely become more concrete once features are more fully fleshed out.

## User level
Beyond customizing the responses toward the style of Japanese the user wishes to learn, there's also consideration for the level of Japanese proficiency they already have. Some users may be just starting out with the language and could be overwhelmed by translations that are intended for a near fluent speaker. Our design may want to include a concept of user proficiency in what we want to support, how it will be defined or described for the LLM, and how the user will specify which proficiency level they prefer.

## Consideration for JLPT Levels
The Japanese government offers a standardized test known as the JLPT that is available in five different levels. Where level five (N5) is considered the most beginner level, there are native speakers that have jokingly confessed to me the difficulty with some of the obscurity in N1 (calling it "beyond native"). It is considered that passing N2 is sufficient to designate a speaker as "business fluent." The nice thing about the JLPT is that it has strict demarcations between levels (e.g., the vocabulary and the kanji) that are expected to be known by the user, and progressing through JLPT levels provides a predictable and consistent path through language acquisition. Furthermore, because the levels remain consistent year to year, a speaker's JLPT proficiency level can be useful for categorizing their competency in the language across time and in different contexts.

So referencing JLPT levels would provide us with a way to benchmark vocabulary and grammar that the user is studying. And it could also assist the LLM in maintaining consistency across sessions. Additionally, for users who are specifically studying for JLPT exams, the familiarity of this ranking system might be appealing. You could even imagine an interface in which a user selects a drop-down preference or perhaps their profile is set to a particular level that is included in the context in the LLM queries.

However, JLPT levels don't always match with practical usefulness, where some of the contrived lessons in N5 might never actually be used in common speech, and some N2 expressions (which would be potentially restricted for a user not on that level) might be more useful even for a beginner. Additionally, there are concerns about constraining the LLM from providing natural language if it feels that it must comply with the JLPT level standards, which may lead to lower-quality results overall (not to mention that this approach depends heavily on the model's understanding of the JLPT corpus). Finally, because this is a personal project and I am not studying for the JLPT, I am more interested in real-world usefulness. I would prefer not to have an application that is tailored toward a test that I don't intend to take at the expense of teaching useful phrases.

## Native Focus
In considering the complications and decisions above, it is useful to consider the core aim of the application we are building.  In particular, we have chosen (whether it aligns with the assigned task or not), that we wish to create an app that promotes natural, "native" Japanese speech.  This may not be as useful to brand new learners or enable all types of learning objectives, but where mutually exclusive design decisions need to be made, we wish to err on the side of pushing users toward modern, typical, native speech.  Considering the above, this means the following decisions for this feature:
 - **Two Levels (Default, Beginner):** We are still going to have an idea of "levels", but instead we will reference merely two different modes of use. By default, the application will produce "native" Japanese translations and, if the user so wishes, they can designate themselves as preferring "beginner" treatment where appropriate. In this way the application retains its focus on providing the best language education possible with a goal of native-like proficiency, but allows a "beginner" to mark an option that can make the application more accessible to users just starting out.
 - **JLPT Independence:** We will not align with the JLPT designations for learning content
 - **Standard (Polite) Style:** At the risk of complicating our prompts and leading to lower-quality results, we will only target the style of Japanese used in public and considered polite in most cases. We believe targeting this formality level will yield the greatest flexibility for the LLM to apply honorifics where natural while preparing students for the scenarios they will most typically encounter.
 - **漢字 & 振り仮名:** Again with a desire to leave the LLM as unconstrained and flexible as possible (in effort to achieve the most natural responses), we will embrace the use of 漢字 and opt to provide 振り仮名 as a pronunciation guide. This is in contrast to some learning sources for brand-new speakers that heavily favor interactions that are exclusively ひらがな & ローマ字 or favor them heavily.  That said, it may be natural (depending on our UI) to also provide these as well.

## Technical Considerations
The following are questions regarding the technology that we are building and leveraging to create the Sentence Constructor Activity:
### Separation of logic between prompting and application code post-processing

The LLM is very good at retrieving and synthesizing information for us, but we don't necessarily want the raw output from the LLM to go straight to the user. There's an opportunity for us to provide some post-processing on the response from the LLM in order to craft the user experience. For instance, we could ask that when it generates a sentence, it also includes 振り仮名 for all of the 漢字 in the prompt instructions, or that it pulls out key vocab words and creates a list. It can do all of this in a formatted way (e.g., in JSON or XML), where our application receiving this response from the LLM can parse the information out and present it however we want.

For example, if we don't want to give the student the answer (i.e., full translation), but we still want our application to know the answer, the mechanism that drives the sentence construction can be written in our post-processing logic rather than in concocting a prompt that would yield the information in the way that we want. That way, we can do a one-shot request to the LLM and get back all of the information that we need and then choose how to provide it piece-wise.  

However, with this method there is now a question regarding how to coordinate the prompt and the post-processing code. The prompt will want to request information in a particular format that can then be parsed by our application logic once it's received. One risk is that an LLM may not return the information in the exact form that we want. To mitigate this, we could make smaller, more direct calls for each individual piece of information we want (translate this sentence, provide definitions for these words, provide 振り仮名 for these words, etc.), but this could be costly (in terms of monetary and performance) because it requires multiple round trips through the LLM. Further, setting this up is likely something that has to be custom-built for each individual activity, and it is not something that we can solve globally. So it adds extra overhead to each activity that we want to support.

### Prompt Support for Multiple LLM Backends

When we're considering how to create prompts to support multiple backend LLM models (e.g., OpenAI, Llama, Mistral, Anthropic), it can be the case that some LLMs prefer plain text for their prompts. However, others are known to work best when the prompts are formatted in XML, and some may even prefer JSON or YAML. Based on my preliminary investigations, this is what we understand about different models and the effectiveness of prompts in various formats (many of these models are outdated, yes):

| Model Family        | Preferred Format |
| ------------------- | ---------------- |
| OpenAI GPT-2        | MD               |
| OpenAI GPT-3.5      | YAML             |
| Meta LLaMa 2 70B    | XML              |
| Microsoft Phi       | JSON             |
| Mistral 7B/8x7B     | YAML             |
| Gemini 1.5 Flash    | YAML             |
| OpenAI GPT-4        | XML              |
| Anthropic Claude 3+ | XML              |
| BART                | MD               |
Other notes:
- XML's tag-based structure improves output accuracy for machine-readable data by 18-23% compared to JSON in benchmarks. Developers report fewer syntax errors when using basic XML tags like `<summary>` or `<analysis>` compared to JSON's strict formatting.
- YAML reduces token usage by 30-50% compared to JSON while maintaining human readability. Its minimal syntax makes it particularly effective for configuration templates and multi-step workflows.
- While JSON remains standard for API integrations, its strict syntax leads to 12-15% more formatting errors than XML/YAML in free-form generation tasks. Best practice is to generate in YAML/XML first then convert to JSON post-processing.

### Support for Hosted (SaaS) and Local Deployments

Because this project is open source, it would be a benefit if users could be able to easily launch their own local version of this application. This would enable users to have more control over their language learning experience. Though it's also expected that there would be a hosted version, it's almost certain that this hosted version would be a paid application due to its dependency on SaaS LLM services such as ChatGPT and Claude. If a user decided to run the application in their own local environment, they would of course have to provide their own model. However, this could also be a benefit, where many local models may offer not only a cheaper cost but also more flexibility in implementation and variance in execution. It should also be the case that if a local user still wants to use a SaaS LLM backend, they should be able to provide their own API keys and accomplish this without too much hassle.

This also coordinates with other objectives in the current design, such as the desire to investigate Japanese language-specific, open-weight models, which are easier to experiment with when running locally. One concern or technical risk is that local models may be lacking the maturity or overall power to render accurate and high quality language teaching capability.

### Response Evaluation

Unlike when working with curated curriculum, we don't have the luxury of getting to see exactly what the user is going to see before it goes out to them. While the LLM is a very powerful tool in generating dynamic content on demand, this use of artificial intelligence only creates a need for a different artificial intelligence. Specifically, we will need to develop methods for evaluating and verifying the correctness and quality of the LLM response so that we can equally ensure the quality of the learning experience.

There are a few methods already proposed for assessing the quality of translation software:
- **BLEU:** Evaluates translated text to the original text by comparing the frequency of words.
- **chrF++:** Evaluates based on character combination matching and word order.
- **Comet:** An ML model based on records of human evaluations of translations.

Some of these may not be applicable to our situation. Most solutions seem to be of one of two camps. The first is that after translating into the other language, we translate the generated text back into the original language and then perform some sort of measurement to assess how near to the original statement it was. The reverse translation can also be performed by another LLM system, independent of the one that we're evaluating, to avoid compounding effects. The second type of approach appears to be running a translation task through multiple LLMs and comparing the translated text from each of them to each other or to a gold standard or ground truth (e.g., native-speaker translation).

In any case, it would seem that having a "judge" in the loop in some capacity is likely our most viable solution. However, it may not be something that we implement in the MVP.

### In-Browser Inference

This is not likely to be needed in the early iterations of the application, but recent breakthroughs have made browser-based inference of LLM models viable. In the case that we have very minor or trivial language tasks that could be performed more quickly in the user's local environment and avoid the round trip back to the server and to the LLM service, we may find ways to make use of it. This could be simple translations, pronunciation look-ups (e.g., 振り仮名 generation), analysis of single sentences or words, and so on. Of particular interest are the very small open-weight models, particularly those that are Japanese language specific (see below).

### Japanese-Specific Models

This is a work in progress of some of the investigations we've done regarding open-weight Japanese-specific LLM models:

Small (2B-7B)
- https://huggingface.co/google/gemma-2-2b-jpn-it
  - Google's own JPN fine-tune of their Gemma 2 (it) release
- https://huggingface.co/stabilityai/japanese-stablelm-instruct-beta-7b
  - StabilityAI's JPN + instruct fine-tune of Llama2-7B
  - Fine-tuned on Databricks Dolly-15k, Anthropic HH datasets
- https://huggingface.co/stabilityai/japanese-stablelm-instruct-gamma-7b
  - StabilityAI's JPN + instruct fine-tune of Mistral-7B-v0.1

Others (70B):
- https://huggingface.co/stabilityai/japanese-stablelm-base-beta-70b
  - StabilityAI's JPN fine-tune of Llama2-70B
- https://huggingface.co/stabilityai/japanese-stablelm-instruct-beta-70b
  - StabilityAI's JPN + instruct fine-tune of Llama2-70B
- https://huggingface.co/Saxo/Linkbricks-Horizon-AI-Japanese-Pro-V3-70B
  - Llama-3.1-70B (Hermes - i.e. Nous)


