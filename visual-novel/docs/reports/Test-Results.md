============================= test session starts ==============================
platform linux -- Python 3.12.9, pytest-7.4.3, pluggy-1.5.0 -- /home/gray/Projects/free-genai-bootcamp-2025/visual-novel/.venv/bin/python3
cachedir: .pytest_cache
rootdir: /home/gray/Projects/free-genai-bootcamp-2025/visual-novel
configfile: pyproject.toml
testpaths: tests
plugins: cov-4.1.0, anyio-4.8.0
collecting ... collected 13 items

tests/test_game_engine.py::test_game_engine_initialization PASSED        [  7%]
tests/test_game_engine.py::test_register_scene PASSED                    [ 15%]
tests/test_game_engine.py::test_register_character PASSED                [ 23%]
tests/test_game_engine.py::test_start_game PASSED                        [ 30%]
tests/test_game_engine.py::test_transition_to_scene PASSED               [ 38%]
tests/test_game_engine.py::test_update PASSED                            [ 46%]
tests/test_game_engine.py::test_render PASSED                            [ 53%]
tests/test_game_engine.py::test_handle_input PASSED                      [ 61%]
tests/test_game_engine.py::test_scene_exit_callback PASSED               [ 69%]
tests/test_language_utils.py::test_extract_vocabulary PASSED             [ 76%]
tests/test_language_utils.py::test_get_word_info PASSED                  [ 84%]
tests/test_language_utils.py::test_track_learned_vocabulary PASSED       [ 92%]
tests/test_language_utils.py::test_track_learned_vocabulary_empty_player_data PASSED [100%]

---------- coverage: platform linux, python 3.12.9-final-0 -----------
Name                               Stmts   Miss  Cover
------------------------------------------------------
app/api/llm.py                        23     12    48%
app/game/characters/character.py      17      4    76%
app/game/characters/teacher.py         9      9     0%
app/game/dialog/manager.py            57     37    35%
app/game/engine.py                    96     35    64%
app/game/scenes/base.py               19      0   100%
app/game/scenes/intro.py              58     58     0%
app/main.py                          130    130     0%
app/utils/config.py                   54     54     0%
app/utils/database.py                111    111     0%
app/utils/language.py                 86     45    48%
------------------------------------------------------
TOTAL                                660    495    25%


============================== 13 passed in 0.14s ==============================
