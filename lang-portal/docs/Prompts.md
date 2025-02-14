
We are creating an SPA with a FastAPI backend (spec and schema in @Backend-Technical-Spec.md and file heirarchy in @Project-File-Structure.md), and we're currently writing tests (see @AI-TODO.md, where we are on tests 1.A). Our DB is all set up, and we already have great tests running perfectly for words, so now we're writing them for groups. Keep this in mind so that we can use the words code as a template. For example, @test_group_crud.py should look to @test_word_crud.py and aim to mirror it, @test_groups.py should look to @test_words.py and aim to mirror it, and so on. Even in the API and CRUD endpoints themselves this can be done, such as where @groups.py can look to @words.py and aim to mirror it.

Running the tests right now yields the following:
```

```

We are creating an SPA with a FastAPI backend (spec and schema in @Backend-Technical-Spec.md and file heirarchy in @Project-File-Structure.md), and we're currently writing tests (see @AI-TODO.md, where we are on tests 1.B). Our DB is all set up, and we already have great tests running perfectly for words and groups, so now we're writing them for study_sessions. Keep this in mind so that we can use the words code as a template. For example, our test_study_sessions_crud.py should look to @test_group_crud.py and @test_word_crud.py and aim to mirror them, our test_study_sessions.py should look to @test_groups.py and @test_words.py and aim to mirror them, and so on. Even in the API and CRUD endpoints themselves this can be done.

Running the tests right now yields the following:
```

```


We are creating an SPA with a FastAPI backend (spec and schema in @Backend-Technical-Spec.md and file heirarchy in @Project-File-Structure.md), and we're currently writing tests (see @AI-TODO.md, where we are on tests 1.C). Our DB is all set up, and we already have great tests running perfectly for words, groups, and study_sessions.  However, there are a few words tests we should add for completeness (see the @AI-TODO.md file section 1.C for details). Keep this in mind so that we can use the existing words code as well as the groups tests and study_sessions tests as a template. Where @test_words.py are what we should build from, feel free to examine @test_groups.py and @test_study_sessions.py and aim to mirror them for the corollary tests.

Running all tests right now yields the following:
```

```

We are creating an SPA with a FastAPI backend (spec and schema in @Backend-Technical-Spec.md and file heirarchy in @Project-File-Structure.md), and we're currently writing tests (see @AI-TODO.md, where we are on tests 3.A). Our DB is all set up, and we already have great tests running perfectly for words, groups, and study_sessions CRUD and API functions.  We now want to start on our service layer tests, beginning with the Words Service (see the @AI-TODO.md file section 3.A for details). We are breaking new ground here in terms of test _type_, so though we should use the existing words, groups, and study_sessions tests as a template, we will likely want to create a new directory for our service layer tests, mirroring the existing test_crud and test_api directories.  How should we proceed?
