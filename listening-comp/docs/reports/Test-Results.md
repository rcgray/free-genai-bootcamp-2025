============================= test session starts ==============================
platform linux -- Python 3.12.2, pytest-8.3.4, pluggy-1.5.0
rootdir: /home/gray/Projects/free-genai-bootcamp-2025/listening-comp
configfile: pyproject.toml
testpaths: tests
plugins: anyio-4.8.0
collected 0 items / 2 errors

==================================== ERRORS ====================================
________________ ERROR collecting tests/test_audio_processor.py ________________
ImportError while importing test module '/home/gray/Projects/free-genai-bootcamp-2025/listening-comp/tests/test_audio_processor.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
../../../miniconda3/lib/python3.12/importlib/__init__.py:90: in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
tests/test_audio_processor.py:8: in <module>
    from backend import get_audio_duration, get_mp3_metadata
E   ModuleNotFoundError: No module named 'backend'
______________________ ERROR collecting tests/test_db.py _______________________
ImportError while importing test module '/home/gray/Projects/free-genai-bootcamp-2025/listening-comp/tests/test_db.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
../../../miniconda3/lib/python3.12/importlib/__init__.py:90: in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
tests/test_db.py:8: in <module>
    from backend.db import Database
E   ModuleNotFoundError: No module named 'backend'
=========================== short test summary info ============================
ERROR tests/test_audio_processor.py
ERROR tests/test_db.py
!!!!!!!!!!!!!!!!!!! Interrupted: 2 errors during collection !!!!!!!!!!!!!!!!!!!!
============================== 2 errors in 0.07s ===============================
