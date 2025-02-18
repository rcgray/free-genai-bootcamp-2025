============================= test session starts ==============================
platform linux -- Python 3.12.9, pytest-8.3.4, pluggy-1.5.0 -- /home/gray/miniconda3/envs/freegenai/bin/python3
cachedir: .pytest_cache
rootdir: /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi
configfile: pyproject.toml
plugins: asyncio-0.25.3, anyio-4.8.0, cov-6.0.0
asyncio: mode=Mode.AUTO, asyncio_default_fixture_loop_scope=function
collecting ... collected 160 items

backend-fastapi/tests/test_api/test_v1/test_activities.py::test_create_activity FAILED [  0%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activity FAILED [  1%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activity_not_found PASSED [  1%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activities FAILED [  2%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_update_activity FAILED [  3%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_update_activity_not_found PASSED [  3%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_delete_activity FAILED [  4%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_delete_activity_not_found PASSED [  5%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_create_group PASSED [  5%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_create_duplicate_group PASSED [  6%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_get_groups_pagination PASSED [  6%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_get_groups_sorting PASSED [  7%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_get_group PASSED [  8%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_get_group_details PASSED [  8%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_update_group PASSED [  9%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_update_nonexistent_group PASSED [ 10%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_delete_group PASSED [ 10%]
backend-fastapi/tests/test_api/test_v1/test_groups.py::test_delete_nonexistent_group PASSED [ 11%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session PASSED [ 11%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_without_group FAILED [ 12%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_omitted_group FAILED [ 13%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_invalid_group PASSED [ 13%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_invalid_activity PASSED [ 14%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_get_session PASSED [ 15%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_get_nonexistent_session PASSED [ 15%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_word_review PASSED [ 16%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_review_invalid_word PASSED [ 16%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_review_invalid_session PASSED [ 17%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_word_review_session_without_group FAILED [ 18%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_list_sessions FAILED [ 18%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_list_sessions ERROR [ 18%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_create_word PASSED [ 19%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_create_duplicate_word PASSED [ 20%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_get_words_pagination PASSED [ 20%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_get_word PASSED [ 21%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_get_words_sorting PASSED [ 21%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_update_word PASSED [ 22%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_update_nonexistent_word PASSED [ 23%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_delete_word PASSED [ 23%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_delete_nonexistent_word PASSED [ 24%]
backend-fastapi/tests/test_api/test_v1/test_words.py::test_get_word_with_review_stats PASSED [ 25%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_create_activity FAILED [ 25%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_activity FAILED [ 26%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_multi_activities FAILED [ 26%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_update_activity FAILED [ 27%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_delete_activity FAILED [ 28%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_create_group PASSED [ 28%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_get_group PASSED [ 29%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_get_group_not_found PASSED [ 30%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_update_group PASSED [ 30%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_delete_group PASSED [ 31%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_get_groups_pagination PASSED [ 31%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_add_words_to_group PASSED [ 32%]
backend-fastapi/tests/test_crud/test_group_crud.py::test_set_words_in_group PASSED [ 33%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_create_session PASSED [ 33%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_session PASSED [ 34%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_session_not_found PASSED [ 35%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_session_with_reviews PASSED [ 35%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_sessions_pagination PASSED [ 36%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_create_word_review PASSED [ 36%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_session_statistics PASSED [ 37%]
backend-fastapi/tests/test_crud/test_session_crud.py::test_get_multi_with_reviews PASSED [ 38%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_create_word PASSED [ 38%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_get_word PASSED  [ 39%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_get_word_with_groups PASSED [ 40%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_get_words_with_stats PASSED [ 40%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_update_word PASSED [ 41%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_delete_word PASSED [ 41%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_get_word_not_found PASSED [ 42%]
backend-fastapi/tests/test_crud/test_word_crud.py::test_get_words_pagination PASSED [ 43%]
backend-fastapi/tests/test_db/test_integration.py::test_database_connection PASSED [ 43%]
backend-fastapi/tests/test_db/test_integration.py::test_transaction_commit PASSED [ 44%]
backend-fastapi/tests/test_db/test_integration.py::test_transaction_rollback PASSED [ 45%]
backend-fastapi/tests/test_db/test_integration.py::test_concurrent_access PASSED [ 45%]
backend-fastapi/tests/test_db/test_integration.py::test_foreign_key_cascade PASSED [ 46%]
backend-fastapi/tests/test_db/test_integration.py::test_unique_constraint PASSED [ 46%]
backend-fastapi/tests/test_db/test_integration.py::test_index_performance PASSED [ 47%]
backend-fastapi/tests/test_models/test_activity_model.py::test_activity_session_relationship PASSED [ 48%]
backend-fastapi/tests/test_models/test_activity_model.py::test_activity_attributes PASSED [ 48%]
backend-fastapi/tests/test_models/test_activity_model.py::test_activity_creation PASSED [ 49%]
backend-fastapi/tests/test_models/test_group_model.py::test_group_word_relationship PASSED [ 50%]
backend-fastapi/tests/test_models/test_group_model.py::test_group_session_relationship PASSED [ 50%]
backend-fastapi/tests/test_models/test_group_model.py::test_group_attributes PASSED [ 51%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_group_relationship ERROR [ 51%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_activity_relationship ERROR [ 52%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_review_relationship ERROR [ 53%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_attributes ERROR [ 53%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_without_group ERROR [ 54%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_group_relationship PASSED [ 55%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_review_relationship ERROR [ 55%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_attributes PASSED [ 56%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_word_relationship ERROR [ 56%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_session_relationship ERROR [ 57%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_attributes ERROR [ 58%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_create_validation FAILED [ 58%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_update_validation FAILED [ 59%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_response_schema FAILED [ 60%]
backend-fastapi/tests/test_schemas/test_base_schema.py::test_base_schema PASSED [ 60%]
backend-fastapi/tests/test_schemas/test_base_schema.py::test_timestamp_schema PASSED [ 61%]
backend-fastapi/tests/test_schemas/test_base_schema.py::test_paginated_response PASSED [ 61%]
backend-fastapi/tests/test_schemas/test_group_schema.py::test_group_base_validation PASSED [ 62%]
backend-fastapi/tests/test_schemas/test_group_schema.py::test_group_create_validation PASSED [ 63%]
backend-fastapi/tests/test_schemas/test_group_schema.py::test_group_update_validation PASSED [ 63%]
backend-fastapi/tests/test_schemas/test_group_schema.py::test_group_response_schema PASSED [ 64%]
backend-fastapi/tests/test_schemas/test_group_schema.py::test_group_with_words_schema PASSED [ 65%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_session_base_validation PASSED [ 65%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_session_create_validation PASSED [ 66%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_session_update_validation PASSED [ 66%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_session_response_schema PASSED [ 67%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_word_review_validation PASSED [ 68%]
backend-fastapi/tests/test_schemas/test_session_schema.py::test_session_stats_validation PASSED [ 68%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_part_validation PASSED [ 69%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_base_validation PASSED [ 70%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_create_validation PASSED [ 70%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_update_validation PASSED [ 71%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_response_schema PASSED [ 71%]
backend-fastapi/tests/test_schemas/test_word_schema.py::test_word_in_group_schema PASSED [ 72%]
backend-fastapi/tests/test_services/test_activity_service.py::test_get_activity FAILED [ 73%]
backend-fastapi/tests/test_services/test_activity_service.py::test_get_nonexistent_activity PASSED [ 73%]
backend-fastapi/tests/test_services/test_activity_service.py::test_get_activities PASSED [ 74%]
backend-fastapi/tests/test_services/test_activity_service.py::test_create_activity FAILED [ 75%]
backend-fastapi/tests/test_services/test_activity_service.py::test_create_duplicate_activity PASSED [ 75%]
backend-fastapi/tests/test_services/test_activity_service.py::test_update_activity FAILED [ 76%]
backend-fastapi/tests/test_services/test_activity_service.py::test_update_nonexistent_activity PASSED [ 76%]
backend-fastapi/tests/test_services/test_activity_service.py::test_update_activity_duplicate_name PASSED [ 77%]
backend-fastapi/tests/test_services/test_activity_service.py::test_delete_activity PASSED [ 78%]
backend-fastapi/tests/test_services/test_group_service.py::test_get_group PASSED [ 78%]
backend-fastapi/tests/test_services/test_group_service.py::test_get_nonexistent_group PASSED [ 79%]
backend-fastapi/tests/test_services/test_group_service.py::test_get_groups PASSED [ 80%]
backend-fastapi/tests/test_services/test_group_service.py::test_get_group_words PASSED [ 80%]
backend-fastapi/tests/test_services/test_group_service.py::test_create_group PASSED [ 81%]
backend-fastapi/tests/test_services/test_group_service.py::test_create_group_with_words PASSED [ 81%]
backend-fastapi/tests/test_services/test_group_service.py::test_create_duplicate_group PASSED [ 82%]
backend-fastapi/tests/test_services/test_group_service.py::test_create_group_invalid_word PASSED [ 83%]
backend-fastapi/tests/test_services/test_group_service.py::test_update_group PASSED [ 83%]
backend-fastapi/tests/test_services/test_group_service.py::test_update_group_words PASSED [ 84%]
backend-fastapi/tests/test_services/test_group_service.py::test_update_group_invalid_word PASSED [ 85%]
backend-fastapi/tests/test_services/test_group_service.py::test_delete_group PASSED [ 85%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_session PASSED [ 86%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_nonexistent_session PASSED [ 86%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session PASSED [ 87%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_without_group FAILED [ 88%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_invalid_group PASSED [ 88%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_invalid_activity PASSED [ 89%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review PASSED [ 90%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_nonexistent_session PASSED [ 90%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_nonexistent_word PASSED [ 91%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_word_not_in_group PASSED [ 91%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_session_without_group FAILED [ 92%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_session_stats PASSED [ 93%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_session_stats_nonexistent_session PASSED [ 93%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_sessions FAILED [ 94%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_sessions ERROR [ 94%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_word PASSED [ 95%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_nonexistent_word PASSED [ 95%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_words_with_stats PASSED [ 96%]
backend-fastapi/tests/test_services/test_word_service.py::test_create_word PASSED [ 96%]
backend-fastapi/tests/test_services/test_word_service.py::test_create_duplicate_word PASSED [ 97%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_word PASSED [ 98%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_nonexistent_word PASSED [ 98%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_word_duplicate_kanji PASSED [ 99%]
backend-fastapi/tests/test_services/test_word_service.py::test_delete_word PASSED [100%]

==================================== ERRORS ====================================
___________________ ERROR at teardown of test_list_sessions ____________________

    def finalizer() -> None:
        """Yield again, to finalize."""
    
        async def async_finalizer() -> None:
            try:
                await gen_obj.__anext__()  # type: ignore[union-attr]
            except StopAsyncIteration:
                pass
            else:
                msg = "Async generator fixture didn't stop."
                msg += "Yield only once."
                raise ValueError(msg)
    
        task = _create_task_in_context(event_loop, async_finalizer(), context)
>       event_loop.run_until_complete(task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:347: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:338: in async_finalizer
    await gen_obj.__anext__()  # type: ignore[union-attr]
backend-fastapi/tests/conftest.py:86: in db
    await session.commit()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/ext/asyncio/session.py:1011: in commit
    await greenlet_spawn(self.sync_session.commit)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:190: in greenlet_spawn
    result = context.switch(*args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:2032: in commit
    trans.commit(_to_root=True)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:103: in _go
    self._raise_for_prerequisite_state(fn.__name__, current_state)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <sqlalchemy.orm.session.SessionTransaction object at 0x7fa4eeb0a7d0>
operation_name = 'commit', state = <SessionTransactionState.DEACTIVE: 4>

    def _raise_for_prerequisite_state(
        self, operation_name: str, state: _StateChangeState
    ) -> NoReturn:
        if state is SessionTransactionState.DEACTIVE:
            if self._rollback_exception:
>               raise sa_exc.PendingRollbackError(
                    "This Session's transaction has been rolled back "
                    "due to a previous exception during flush."
                    " To begin a new transaction with this Session, "
                    "first issue Session.rollback()."
                    f" Original exception was: {self._rollback_exception}",
                    code="7s2a",
                )
E               sqlalchemy.exc.PendingRollbackError: This Session's transaction has been rolled back due to a previous exception during flush. To begin a new transaction with this Session, first issue Session.rollback(). Original exception was: (sqlite3.IntegrityError) NOT NULL constraint failed: sessions.group_id
E               [SQL: INSERT INTO sessions (group_id, activity_id) VALUES (?, ?) RETURNING id, created_at]
E               [parameters: (None, 1)]
E               (Background on this error at: https://sqlalche.me/e/20/gkpj) (Background on this error at: https://sqlalche.me/e/20/7s2a)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:973: PendingRollbackError
______________ ERROR at setup of test_session_group_relationship _______________

request = <SubRequest 'sample_activity' for <Coroutine test_session_group_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec618b0>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4cea0>
context = <_contextvars.Context object at 0x7fa4ed99f2c0>
setup_task = <Task finished name='Task-1024' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec61a00>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
_____________ ERROR at setup of test_session_activity_relationship _____________

request = <SubRequest 'sample_activity' for <Coroutine test_session_activity_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec62300>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4d9e0>
context = <_contextvars.Context object at 0x7fa4eeb2b800>
setup_task = <Task finished name='Task-1033' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec631a0>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
______________ ERROR at setup of test_session_review_relationship ______________

request = <SubRequest 'sample_activity' for <Coroutine test_session_review_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec61ca0>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eecef740>
context = <_contextvars.Context object at 0x7fa4ed99f2c0>
setup_task = <Task finished name='Task-1042' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec60b30>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
__________________ ERROR at setup of test_session_attributes ___________________

request = <SubRequest 'sample_activity' for <Coroutine test_session_attributes>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec347a0>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec8e8e0>
context = <_contextvars.Context object at 0x7fa4ed99fe00>
setup_task = <Task finished name='Task-1051' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec36990>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
_________________ ERROR at setup of test_session_without_group _________________

request = <SubRequest 'sample_activity' for <Coroutine test_session_without_group>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec61a90>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eecefba0>
context = <_contextvars.Context object at 0x7fa4ed99f2c0>
setup_task = <Task finished name='Task-1059' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec61a30>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
_______________ ERROR at setup of test_word_review_relationship ________________

request = <SubRequest 'sample_activity' for <Coroutine test_word_review_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec35df0>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4dda0>
context = <_contextvars.Context object at 0x7fa4eeb2bf00>
setup_task = <Task finished name='Task-1080' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec35850>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
_____________ ERROR at setup of test_word_review_word_relationship _____________

request = <SubRequest 'sample_activity' for <Coroutine test_word_review_word_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec346b0>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4e520>
context = <_contextvars.Context object at 0x7fa4ed99f2c0>
setup_task = <Task finished name='Task-1099' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec36930>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
___________ ERROR at setup of test_word_review_session_relationship ____________

request = <SubRequest 'sample_activity' for <Coroutine test_word_review_session_relationship>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec2d370>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4ce00>
context = <_contextvars.Context object at 0x7fa4eeb29240>
setup_task = <Task finished name='Task-1109' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec2ce00>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
________________ ERROR at setup of test_word_review_attributes _________________

request = <SubRequest 'sample_activity' for <Coroutine test_word_review_attributes>>
kwargs = {'db': <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec2cb60>}
event_loop_fixture_id = 'event_loop'
setup = <function _wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup at 0x7fa4eec4eca0>
context = <_contextvars.Context object at 0x7fa4ed99f2c0>
setup_task = <Task finished name='Task-1119' coro=<_wrap_async_fixture.<locals>._async_fixture_wrapper.<locals>.setup() done, defin...-packages/pytest_asyncio/plugin.py:369> exception=TypeError("'image_url' is an invalid keyword argument for Activity")>

    @functools.wraps(fixture)
    def _async_fixture_wrapper(request: FixtureRequest, **kwargs: Any):
        func = _perhaps_rebind_fixture_func(fixture, request.instance)
        event_loop_fixture_id = _get_event_loop_fixture_id_for_async_fixture(
            request, func
        )
        event_loop = request.getfixturevalue(event_loop_fixture_id)
        kwargs.pop(event_loop_fixture_id, None)
    
        async def setup():
            res = await func(**_add_kwargs(func, kwargs, event_loop, request))
            return res
    
        context = contextvars.copy_context()
        setup_task = _create_task_in_context(event_loop, setup(), context)
>       result = event_loop.run_until_complete(setup_task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:375: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:370: in setup
    res = await func(**_add_kwargs(func, kwargs, event_loop, request))
backend-fastapi/tests/test_models/conftest.py:39: in sample_activity
    activity = Activity(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:571: in _initialize_instance
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state.py:569: in _initialize_instance
    manager.original_init(*mixed[1:], **kwargs)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <app.models.activity.Activity object at 0x7fa4eec2e3c0>
kwargs = {'description': 'Practice vocabulary with flashcards', 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', 'url': 'http://example.com/flashcards'}
cls_ = <class 'app.models.activity.Activity'>, k = 'image_url'

    def _declarative_constructor(self: Any, **kwargs: Any) -> None:
        """A simple constructor that allows initialization from kwargs.
    
        Sets attributes on the constructed instance using the names and
        values in ``kwargs``.
    
        Only keys that are present as
        attributes of the instance's class are allowed. These could be,
        for example, any mapped columns or relationships.
        """
        cls_ = type(self)
        for k in kwargs:
            if not hasattr(cls_, k):
>               raise TypeError(
                    "%r is an invalid keyword argument for %s" % (k, cls_.__name__)
                )
E               TypeError: 'image_url' is an invalid keyword argument for Activity

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/decl_base.py:2175: TypeError
____________________ ERROR at teardown of test_get_sessions ____________________

    def finalizer() -> None:
        """Yield again, to finalize."""
    
        async def async_finalizer() -> None:
            try:
                await gen_obj.__anext__()  # type: ignore[union-attr]
            except StopAsyncIteration:
                pass
            else:
                msg = "Async generator fixture didn't stop."
                msg += "Yield only once."
                raise ValueError(msg)
    
        task = _create_task_in_context(event_loop, async_finalizer(), context)
>       event_loop.run_until_complete(task)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:347: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py:691: in run_until_complete
    return future.result()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:338: in async_finalizer
    await gen_obj.__anext__()  # type: ignore[union-attr]
backend-fastapi/tests/conftest.py:86: in db
    await session.commit()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/ext/asyncio/session.py:1011: in commit
    await greenlet_spawn(self.sync_session.commit)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:190: in greenlet_spawn
    result = context.switch(*args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:2032: in commit
    trans.commit(_to_root=True)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:103: in _go
    self._raise_for_prerequisite_state(fn.__name__, current_state)
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <sqlalchemy.orm.session.SessionTransaction object at 0x7fa4ed9aaed0>
operation_name = 'commit', state = <SessionTransactionState.DEACTIVE: 4>

    def _raise_for_prerequisite_state(
        self, operation_name: str, state: _StateChangeState
    ) -> NoReturn:
        if state is SessionTransactionState.DEACTIVE:
            if self._rollback_exception:
>               raise sa_exc.PendingRollbackError(
                    "This Session's transaction has been rolled back "
                    "due to a previous exception during flush."
                    " To begin a new transaction with this Session, "
                    "first issue Session.rollback()."
                    f" Original exception was: {self._rollback_exception}",
                    code="7s2a",
                )
E               sqlalchemy.exc.PendingRollbackError: This Session's transaction has been rolled back due to a previous exception during flush. To begin a new transaction with this Session, first issue Session.rollback(). Original exception was: (sqlite3.IntegrityError) NOT NULL constraint failed: sessions.group_id
E               [SQL: INSERT INTO sessions (group_id, activity_id) VALUES (?, ?) RETURNING id, created_at]
E               [parameters: (None, 1)]
E               (Background on this error at: https://sqlalche.me/e/20/gkpj) (Background on this error at: https://sqlalche.me/e/20/7s2a)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:973: PendingRollbackError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
=================================== FAILURES ===================================
_____________________________ test_create_activity _____________________________
  + Exception Group Traceback (most recent call last):
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 76, in collapse_excgroups
  |     yield
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 178, in __call__
  |     async with anyio.create_task_group() as task_group:
  |                ^^^^^^^^^^^^^^^^^^^^^^^^^
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/anyio/_backends/_asyncio.py", line 767, in __aexit__
  |     raise BaseExceptionGroup(
  | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
  +-+---------------- 1 ----------------
    | Traceback (most recent call last):
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 341, in from_call
    |     result: TResult | None = func()
    |                              ^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 242, in <lambda>
    |     lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 92, in pytest_runtest_call
    |     yield from thread_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 68, in thread_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 95, in pytest_runtest_call
    |     yield from unraisable_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 70, in unraisable_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 846, in pytest_runtest_call
    |     yield from self._runtest_for(item, "call")
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 829, in _runtest_for
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/capture.py", line 880, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/skipping.py", line 257, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 174, in pytest_runtest_call
    |     item.runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 533, in runtest
    |     super().runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 1627, in runtest
    |     self.ihook.pytest_pyfunc_call(pyfuncitem=self)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 159, in pytest_pyfunc_call
    |     result = testfunction(**testargs)
    |              ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 1052, in inner
    |     _loop.run_until_complete(task)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py", line 691, in run_until_complete
    |     return future.result()
    |            ^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_api/test_v1/test_activities.py", line 15, in test_create_activity
    |     response = await client.post(
    |                ^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1859, in post
    |     return await self.request(
    |            ^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1540, in request
    |     return await self.send(request, auth=auth, follow_redirects=follow_redirects)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1629, in send
    |     response = await self._send_handling_auth(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1657, in _send_handling_auth
    |     response = await self._send_handling_redirects(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1694, in _send_handling_redirects
    |     response = await self._send_single_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1730, in _send_single_request
    |     response = await transport.handle_async_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py", line 170, in handle_async_request
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py", line 1054, in __call__
    |     await super().__call__(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py", line 112, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 187, in __call__
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 165, in __call__
    |     await self.app(scope, receive, _send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 177, in __call__
    |     with recv_stream, send_stream, collapse_excgroups():
    |                                    ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/contextlib.py", line 158, in __exit__
    |     self.gen.throw(value)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 82, in collapse_excgroups
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 179, in __call__
    |     response = await self.dispatch_func(request, call_next)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/main.py", line 43, in wrap_response
    |     response = await call_next(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 154, in call_next
    |     raise app_exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 141, in coro
    |     await self.app(scope, receive_or_disconnect, send_no_error)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py", line 85, in __call__
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py", line 62, in __call__
    |     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 715, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 735, in app
    |     await route.handle(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 288, in handle
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 76, in app
    |     await wrap_app_handling_exceptions(app, request)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 73, in app
    |     response = await f(request)
    |                ^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 301, in app
    |     raw_response = await run_endpoint_function(
    |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 212, in run_endpoint_function
    |     return await dependant.call(**values)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py", line 93, in create_activity
    |     image_url=str(activity_in.image_url),
    |                   ^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py", line 891, in __getattr__
    |     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
    | AttributeError: 'ActivityCreate' object has no attribute 'image_url'
    +------------------------------------

During handling of the above exception, another exception occurred:

client = <httpx.AsyncClient object at 0x7fa4efd13530>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4efd10bf0>

    async def test_create_activity(client: AsyncClient, db: AsyncSession):
        """Test creating a new activity."""
>       response = await client.post(
            f"{settings.API_V1_PREFIX}/activities",
            json=TEST_ACTIVITY
        )

backend-fastapi/tests/test_api/test_v1/test_activities.py:15: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1859: in post
    return await self.request(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1540: in request
    return await self.send(request, auth=auth, follow_redirects=follow_redirects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1629: in send
    response = await self._send_handling_auth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1657: in _send_handling_auth
    response = await self._send_handling_redirects(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1694: in _send_handling_redirects
    response = await self._send_single_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1730: in _send_single_request
    response = await transport.handle_async_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py:170: in handle_async_request
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py:1054: in __call__
    await super().__call__(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py:112: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:187: in __call__
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:165: in __call__
    await self.app(scope, receive, _send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:177: in __call__
    with recv_stream, send_stream, collapse_excgroups():
../../../miniconda3/envs/freegenai/lib/python3.12/contextlib.py:158: in __exit__
    self.gen.throw(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py:82: in collapse_excgroups
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:179: in __call__
    response = await self.dispatch_func(request, call_next)
backend-fastapi/app/main.py:43: in wrap_response
    response = await call_next(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:154: in call_next
    raise app_exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:141: in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py:85: in __call__
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py:62: in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:715: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:735: in app
    await route.handle(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:288: in handle
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:76: in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:73: in app
    response = await f(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:301: in app
    raw_response = await run_endpoint_function(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:212: in run_endpoint_function
    return await dependant.call(**values)
backend-fastapi/app/api/v1/endpoints/activities.py:93: in create_activity
    image_url=str(activity_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
______________________________ test_get_activity _______________________________
  + Exception Group Traceback (most recent call last):
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 76, in collapse_excgroups
  |     yield
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 178, in __call__
  |     async with anyio.create_task_group() as task_group:
  |                ^^^^^^^^^^^^^^^^^^^^^^^^^
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/anyio/_backends/_asyncio.py", line 767, in __aexit__
  |     raise BaseExceptionGroup(
  | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
  +-+---------------- 1 ----------------
    | Traceback (most recent call last):
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 341, in from_call
    |     result: TResult | None = func()
    |                              ^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 242, in <lambda>
    |     lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 92, in pytest_runtest_call
    |     yield from thread_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 68, in thread_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 95, in pytest_runtest_call
    |     yield from unraisable_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 70, in unraisable_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 846, in pytest_runtest_call
    |     yield from self._runtest_for(item, "call")
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 829, in _runtest_for
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/capture.py", line 880, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/skipping.py", line 257, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 174, in pytest_runtest_call
    |     item.runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 533, in runtest
    |     super().runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 1627, in runtest
    |     self.ihook.pytest_pyfunc_call(pyfuncitem=self)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 159, in pytest_pyfunc_call
    |     result = testfunction(**testargs)
    |              ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 1052, in inner
    |     _loop.run_until_complete(task)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py", line 691, in run_until_complete
    |     return future.result()
    |            ^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_api/test_v1/test_activities.py", line 30, in test_get_activity
    |     create_response = await client.post(
    |                       ^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1859, in post
    |     return await self.request(
    |            ^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1540, in request
    |     return await self.send(request, auth=auth, follow_redirects=follow_redirects)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1629, in send
    |     response = await self._send_handling_auth(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1657, in _send_handling_auth
    |     response = await self._send_handling_redirects(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1694, in _send_handling_redirects
    |     response = await self._send_single_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1730, in _send_single_request
    |     response = await transport.handle_async_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py", line 170, in handle_async_request
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py", line 1054, in __call__
    |     await super().__call__(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py", line 112, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 187, in __call__
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 165, in __call__
    |     await self.app(scope, receive, _send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 177, in __call__
    |     with recv_stream, send_stream, collapse_excgroups():
    |                                    ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/contextlib.py", line 158, in __exit__
    |     self.gen.throw(value)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 82, in collapse_excgroups
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 179, in __call__
    |     response = await self.dispatch_func(request, call_next)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/main.py", line 43, in wrap_response
    |     response = await call_next(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 154, in call_next
    |     raise app_exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 141, in coro
    |     await self.app(scope, receive_or_disconnect, send_no_error)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py", line 85, in __call__
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py", line 62, in __call__
    |     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 715, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 735, in app
    |     await route.handle(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 288, in handle
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 76, in app
    |     await wrap_app_handling_exceptions(app, request)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 73, in app
    |     response = await f(request)
    |                ^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 301, in app
    |     raw_response = await run_endpoint_function(
    |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 212, in run_endpoint_function
    |     return await dependant.call(**values)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py", line 93, in create_activity
    |     image_url=str(activity_in.image_url),
    |                   ^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py", line 891, in __getattr__
    |     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
    | AttributeError: 'ActivityCreate' object has no attribute 'image_url'
    +------------------------------------

During handling of the above exception, another exception occurred:

client = <httpx.AsyncClient object at 0x7fa4efde13a0>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4efde11f0>

    async def test_get_activity(client: AsyncClient, db: AsyncSession):
        """Test getting an activity by ID."""
        # Create activity
>       create_response = await client.post(
            f"{settings.API_V1_PREFIX}/activities",
            json=TEST_ACTIVITY
        )

backend-fastapi/tests/test_api/test_v1/test_activities.py:30: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1859: in post
    return await self.request(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1540: in request
    return await self.send(request, auth=auth, follow_redirects=follow_redirects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1629: in send
    response = await self._send_handling_auth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1657: in _send_handling_auth
    response = await self._send_handling_redirects(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1694: in _send_handling_redirects
    response = await self._send_single_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1730: in _send_single_request
    response = await transport.handle_async_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py:170: in handle_async_request
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py:1054: in __call__
    await super().__call__(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py:112: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:187: in __call__
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:165: in __call__
    await self.app(scope, receive, _send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:177: in __call__
    with recv_stream, send_stream, collapse_excgroups():
../../../miniconda3/envs/freegenai/lib/python3.12/contextlib.py:158: in __exit__
    self.gen.throw(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py:82: in collapse_excgroups
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:179: in __call__
    response = await self.dispatch_func(request, call_next)
backend-fastapi/app/main.py:43: in wrap_response
    response = await call_next(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:154: in call_next
    raise app_exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:141: in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py:85: in __call__
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py:62: in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:715: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:735: in app
    await route.handle(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:288: in handle
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:76: in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:73: in app
    response = await f(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:301: in app
    raw_response = await run_endpoint_function(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:212: in run_endpoint_function
    return await dependant.call(**values)
backend-fastapi/app/api/v1/endpoints/activities.py:93: in create_activity
    image_url=str(activity_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_____________________________ test_get_activities ______________________________
  + Exception Group Traceback (most recent call last):
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 76, in collapse_excgroups
  |     yield
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 178, in __call__
  |     async with anyio.create_task_group() as task_group:
  |                ^^^^^^^^^^^^^^^^^^^^^^^^^
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/anyio/_backends/_asyncio.py", line 767, in __aexit__
  |     raise BaseExceptionGroup(
  | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
  +-+---------------- 1 ----------------
    | Traceback (most recent call last):
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 341, in from_call
    |     result: TResult | None = func()
    |                              ^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 242, in <lambda>
    |     lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 92, in pytest_runtest_call
    |     yield from thread_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 68, in thread_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 95, in pytest_runtest_call
    |     yield from unraisable_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 70, in unraisable_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 846, in pytest_runtest_call
    |     yield from self._runtest_for(item, "call")
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 829, in _runtest_for
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/capture.py", line 880, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/skipping.py", line 257, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 174, in pytest_runtest_call
    |     item.runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 533, in runtest
    |     super().runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 1627, in runtest
    |     self.ihook.pytest_pyfunc_call(pyfuncitem=self)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 159, in pytest_pyfunc_call
    |     result = testfunction(**testargs)
    |              ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 1052, in inner
    |     _loop.run_until_complete(task)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py", line 691, in run_until_complete
    |     return future.result()
    |            ^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_api/test_v1/test_activities.py", line 69, in test_get_activities
    |     await client.post(f"{settings.API_V1_PREFIX}/activities", json=activity_1)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1859, in post
    |     return await self.request(
    |            ^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1540, in request
    |     return await self.send(request, auth=auth, follow_redirects=follow_redirects)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1629, in send
    |     response = await self._send_handling_auth(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1657, in _send_handling_auth
    |     response = await self._send_handling_redirects(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1694, in _send_handling_redirects
    |     response = await self._send_single_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1730, in _send_single_request
    |     response = await transport.handle_async_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py", line 170, in handle_async_request
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py", line 1054, in __call__
    |     await super().__call__(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py", line 112, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 187, in __call__
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 165, in __call__
    |     await self.app(scope, receive, _send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 177, in __call__
    |     with recv_stream, send_stream, collapse_excgroups():
    |                                    ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/contextlib.py", line 158, in __exit__
    |     self.gen.throw(value)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 82, in collapse_excgroups
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 179, in __call__
    |     response = await self.dispatch_func(request, call_next)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/main.py", line 43, in wrap_response
    |     response = await call_next(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 154, in call_next
    |     raise app_exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 141, in coro
    |     await self.app(scope, receive_or_disconnect, send_no_error)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py", line 85, in __call__
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py", line 62, in __call__
    |     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 715, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 735, in app
    |     await route.handle(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 288, in handle
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 76, in app
    |     await wrap_app_handling_exceptions(app, request)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 73, in app
    |     response = await f(request)
    |                ^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 301, in app
    |     raw_response = await run_endpoint_function(
    |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 212, in run_endpoint_function
    |     return await dependant.call(**values)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py", line 93, in create_activity
    |     image_url=str(activity_in.image_url),
    |                   ^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py", line 891, in __getattr__
    |     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
    | AttributeError: 'ActivityCreate' object has no attribute 'image_url'
    +------------------------------------

During handling of the above exception, another exception occurred:

client = <httpx.AsyncClient object at 0x7fa4ef411730>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ef412870>

    async def test_get_activities(client: AsyncClient, db: AsyncSession):
        """Test getting list of activities."""
        # Create test activities
        activity_1 = {
            "name": "Activity 1",
            "url": "http://example.com/1",
            "image_url": "http://example.com/images/1.png",
            "description": "First activity"
        }
        activity_2 = {
            "name": "Activity 2",
            "url": "http://example.com/2",
            "image_url": "http://example.com/images/2.png",
            "description": "Second activity"
        }
    
>       await client.post(f"{settings.API_V1_PREFIX}/activities", json=activity_1)

backend-fastapi/tests/test_api/test_v1/test_activities.py:69: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1859: in post
    return await self.request(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1540: in request
    return await self.send(request, auth=auth, follow_redirects=follow_redirects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1629: in send
    response = await self._send_handling_auth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1657: in _send_handling_auth
    response = await self._send_handling_redirects(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1694: in _send_handling_redirects
    response = await self._send_single_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1730: in _send_single_request
    response = await transport.handle_async_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py:170: in handle_async_request
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py:1054: in __call__
    await super().__call__(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py:112: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:187: in __call__
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:165: in __call__
    await self.app(scope, receive, _send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:177: in __call__
    with recv_stream, send_stream, collapse_excgroups():
../../../miniconda3/envs/freegenai/lib/python3.12/contextlib.py:158: in __exit__
    self.gen.throw(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py:82: in collapse_excgroups
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:179: in __call__
    response = await self.dispatch_func(request, call_next)
backend-fastapi/app/main.py:43: in wrap_response
    response = await call_next(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:154: in call_next
    raise app_exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:141: in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py:85: in __call__
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py:62: in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:715: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:735: in app
    await route.handle(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:288: in handle
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:76: in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:73: in app
    response = await f(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:301: in app
    raw_response = await run_endpoint_function(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:212: in run_endpoint_function
    return await dependant.call(**values)
backend-fastapi/app/api/v1/endpoints/activities.py:93: in create_activity
    image_url=str(activity_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Activity 1', url='http://example.com/1', description='First activity')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_____________________________ test_update_activity _____________________________
  + Exception Group Traceback (most recent call last):
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 76, in collapse_excgroups
  |     yield
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 178, in __call__
  |     async with anyio.create_task_group() as task_group:
  |                ^^^^^^^^^^^^^^^^^^^^^^^^^
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/anyio/_backends/_asyncio.py", line 767, in __aexit__
  |     raise BaseExceptionGroup(
  | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
  +-+---------------- 1 ----------------
    | Traceback (most recent call last):
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 341, in from_call
    |     result: TResult | None = func()
    |                              ^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 242, in <lambda>
    |     lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 92, in pytest_runtest_call
    |     yield from thread_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 68, in thread_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 95, in pytest_runtest_call
    |     yield from unraisable_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 70, in unraisable_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 846, in pytest_runtest_call
    |     yield from self._runtest_for(item, "call")
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 829, in _runtest_for
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/capture.py", line 880, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/skipping.py", line 257, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 174, in pytest_runtest_call
    |     item.runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 533, in runtest
    |     super().runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 1627, in runtest
    |     self.ihook.pytest_pyfunc_call(pyfuncitem=self)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 159, in pytest_pyfunc_call
    |     result = testfunction(**testargs)
    |              ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 1052, in inner
    |     _loop.run_until_complete(task)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py", line 691, in run_until_complete
    |     return future.result()
    |            ^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_api/test_v1/test_activities.py", line 108, in test_update_activity
    |     create_response = await client.post(
    |                       ^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1859, in post
    |     return await self.request(
    |            ^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1540, in request
    |     return await self.send(request, auth=auth, follow_redirects=follow_redirects)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1629, in send
    |     response = await self._send_handling_auth(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1657, in _send_handling_auth
    |     response = await self._send_handling_redirects(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1694, in _send_handling_redirects
    |     response = await self._send_single_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1730, in _send_single_request
    |     response = await transport.handle_async_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py", line 170, in handle_async_request
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py", line 1054, in __call__
    |     await super().__call__(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py", line 112, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 187, in __call__
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 165, in __call__
    |     await self.app(scope, receive, _send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 177, in __call__
    |     with recv_stream, send_stream, collapse_excgroups():
    |                                    ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/contextlib.py", line 158, in __exit__
    |     self.gen.throw(value)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 82, in collapse_excgroups
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 179, in __call__
    |     response = await self.dispatch_func(request, call_next)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/main.py", line 43, in wrap_response
    |     response = await call_next(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 154, in call_next
    |     raise app_exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 141, in coro
    |     await self.app(scope, receive_or_disconnect, send_no_error)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py", line 85, in __call__
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py", line 62, in __call__
    |     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 715, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 735, in app
    |     await route.handle(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 288, in handle
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 76, in app
    |     await wrap_app_handling_exceptions(app, request)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 73, in app
    |     response = await f(request)
    |                ^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 301, in app
    |     raw_response = await run_endpoint_function(
    |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 212, in run_endpoint_function
    |     return await dependant.call(**values)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py", line 93, in create_activity
    |     image_url=str(activity_in.image_url),
    |                   ^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py", line 891, in __getattr__
    |     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
    | AttributeError: 'ActivityCreate' object has no attribute 'image_url'
    +------------------------------------

During handling of the above exception, another exception occurred:

client = <httpx.AsyncClient object at 0x7fa4ee76e960>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee76d460>

    async def test_update_activity(client: AsyncClient, db: AsyncSession):
        """Test updating an activity."""
        # Create activity
>       create_response = await client.post(
            f"{settings.API_V1_PREFIX}/activities",
            json=TEST_ACTIVITY
        )

backend-fastapi/tests/test_api/test_v1/test_activities.py:108: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1859: in post
    return await self.request(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1540: in request
    return await self.send(request, auth=auth, follow_redirects=follow_redirects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1629: in send
    response = await self._send_handling_auth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1657: in _send_handling_auth
    response = await self._send_handling_redirects(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1694: in _send_handling_redirects
    response = await self._send_single_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1730: in _send_single_request
    response = await transport.handle_async_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py:170: in handle_async_request
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py:1054: in __call__
    await super().__call__(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py:112: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:187: in __call__
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:165: in __call__
    await self.app(scope, receive, _send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:177: in __call__
    with recv_stream, send_stream, collapse_excgroups():
../../../miniconda3/envs/freegenai/lib/python3.12/contextlib.py:158: in __exit__
    self.gen.throw(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py:82: in collapse_excgroups
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:179: in __call__
    response = await self.dispatch_func(request, call_next)
backend-fastapi/app/main.py:43: in wrap_response
    response = await call_next(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:154: in call_next
    raise app_exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:141: in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py:85: in __call__
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py:62: in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:715: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:735: in app
    await route.handle(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:288: in handle
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:76: in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:73: in app
    response = await f(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:301: in app
    raw_response = await run_endpoint_function(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:212: in run_endpoint_function
    return await dependant.call(**values)
backend-fastapi/app/api/v1/endpoints/activities.py:93: in create_activity
    image_url=str(activity_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_____________________________ test_delete_activity _____________________________
  + Exception Group Traceback (most recent call last):
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 76, in collapse_excgroups
  |     yield
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 178, in __call__
  |     async with anyio.create_task_group() as task_group:
  |                ^^^^^^^^^^^^^^^^^^^^^^^^^
  |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/anyio/_backends/_asyncio.py", line 767, in __aexit__
  |     raise BaseExceptionGroup(
  | ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
  +-+---------------- 1 ----------------
    | Traceback (most recent call last):
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 341, in from_call
    |     result: TResult | None = func()
    |                              ^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 242, in <lambda>
    |     lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 92, in pytest_runtest_call
    |     yield from thread_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/threadexception.py", line 68, in thread_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 95, in pytest_runtest_call
    |     yield from unraisable_exception_runtest_hook()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/unraisableexception.py", line 70, in unraisable_exception_runtest_hook
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 846, in pytest_runtest_call
    |     yield from self._runtest_for(item, "call")
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/logging.py", line 829, in _runtest_for
    |     yield
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/capture.py", line 880, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 167, in _multicall
    |     teardown.throw(outcome._exception)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/skipping.py", line 257, in pytest_runtest_call
    |     return (yield)
    |             ^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/runner.py", line 174, in pytest_runtest_call
    |     item.runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 533, in runtest
    |     super().runtest()
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 1627, in runtest
    |     self.ihook.pytest_pyfunc_call(pyfuncitem=self)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_hooks.py", line 513, in __call__
    |     return self._hookexec(self.name, self._hookimpls.copy(), kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_manager.py", line 120, in _hookexec
    |     return self._inner_hookexec(hook_name, methods, kwargs, firstresult)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 182, in _multicall
    |     return outcome.get_result()
    |            ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_result.py", line 100, in get_result
    |     raise exc.with_traceback(exc.__traceback__)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pluggy/_callers.py", line 103, in _multicall
    |     res = hook_impl.function(*args)
    |           ^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/_pytest/python.py", line 159, in pytest_pyfunc_call
    |     result = testfunction(**testargs)
    |              ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py", line 1052, in inner
    |     _loop.run_until_complete(task)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/asyncio/base_events.py", line 691, in run_until_complete
    |     return future.result()
    |            ^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_api/test_v1/test_activities.py", line 153, in test_delete_activity
    |     create_response = await client.post(
    |                       ^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1859, in post
    |     return await self.request(
    |            ^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1540, in request
    |     return await self.send(request, auth=auth, follow_redirects=follow_redirects)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1629, in send
    |     response = await self._send_handling_auth(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1657, in _send_handling_auth
    |     response = await self._send_handling_redirects(
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1694, in _send_handling_redirects
    |     response = await self._send_single_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py", line 1730, in _send_single_request
    |     response = await transport.handle_async_request(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py", line 170, in handle_async_request
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py", line 1054, in __call__
    |     await super().__call__(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py", line 112, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 187, in __call__
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py", line 165, in __call__
    |     await self.app(scope, receive, _send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 177, in __call__
    |     with recv_stream, send_stream, collapse_excgroups():
    |                                    ^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/contextlib.py", line 158, in __exit__
    |     self.gen.throw(value)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py", line 82, in collapse_excgroups
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 179, in __call__
    |     response = await self.dispatch_func(request, call_next)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/main.py", line 43, in wrap_response
    |     response = await call_next(request)
    |                ^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 154, in call_next
    |     raise app_exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py", line 141, in coro
    |     await self.app(scope, receive_or_disconnect, send_no_error)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py", line 85, in __call__
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py", line 62, in __call__
    |     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 715, in __call__
    |     await self.middleware_stack(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 735, in app
    |     await route.handle(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 288, in handle
    |     await self.app(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 76, in app
    |     await wrap_app_handling_exceptions(app, request)(scope, receive, send)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 53, in wrapped_app
    |     raise exc
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py", line 42, in wrapped_app
    |     await app(scope, receive, sender)
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py", line 73, in app
    |     response = await f(request)
    |                ^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 301, in app
    |     raw_response = await run_endpoint_function(
    |                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py", line 212, in run_endpoint_function
    |     return await dependant.call(**values)
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py", line 93, in create_activity
    |     image_url=str(activity_in.image_url),
    |                   ^^^^^^^^^^^^^^^^^^^^^
    |   File "/home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py", line 891, in __getattr__
    |     raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
    | AttributeError: 'ActivityCreate' object has no attribute 'image_url'
    +------------------------------------

During handling of the above exception, another exception occurred:

client = <httpx.AsyncClient object at 0x7fa4ee74b800>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee74bf80>

    async def test_delete_activity(client: AsyncClient, db: AsyncSession):
        """Test deleting an activity."""
        # Create activity
>       create_response = await client.post(
            f"{settings.API_V1_PREFIX}/activities",
            json=TEST_ACTIVITY
        )

backend-fastapi/tests/test_api/test_v1/test_activities.py:153: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1859: in post
    return await self.request(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1540: in request
    return await self.send(request, auth=auth, follow_redirects=follow_redirects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1629: in send
    response = await self._send_handling_auth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1657: in _send_handling_auth
    response = await self._send_handling_redirects(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1694: in _send_handling_redirects
    response = await self._send_single_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_client.py:1730: in _send_single_request
    response = await transport.handle_async_request(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/httpx/_transports/asgi.py:170: in handle_async_request
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/applications.py:1054: in __call__
    await super().__call__(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/applications.py:112: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:187: in __call__
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/errors.py:165: in __call__
    await self.app(scope, receive, _send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:177: in __call__
    with recv_stream, send_stream, collapse_excgroups():
../../../miniconda3/envs/freegenai/lib/python3.12/contextlib.py:158: in __exit__
    self.gen.throw(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_utils.py:82: in collapse_excgroups
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:179: in __call__
    response = await self.dispatch_func(request, call_next)
backend-fastapi/app/main.py:43: in wrap_response
    response = await call_next(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:154: in call_next
    raise app_exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/base.py:141: in coro
    await self.app(scope, receive_or_disconnect, send_no_error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/cors.py:85: in __call__
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/middleware/exceptions.py:62: in __call__
    await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:715: in __call__
    await self.middleware_stack(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:735: in app
    await route.handle(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:288: in handle
    await self.app(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:76: in app
    await wrap_app_handling_exceptions(app, request)(scope, receive, send)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:53: in wrapped_app
    raise exc
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/_exception_handler.py:42: in wrapped_app
    await app(scope, receive, sender)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/starlette/routing.py:73: in app
    response = await f(request)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:301: in app
    raw_response = await run_endpoint_function(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/fastapi/routing.py:212: in run_endpoint_function
    return await dependant.call(**values)
backend-fastapi/app/api/v1/endpoints/activities.py:93: in create_activity
    image_url=str(activity_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
______________________ test_create_session_without_group _______________________

client = <httpx.AsyncClient object at 0x7fa4ef2ae2a0>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ef2b3590>

    async def test_create_session_without_group(client: AsyncClient, db: AsyncSession):
        """Test creating a session without a group."""
        session_data = {
            "activity_id": TEST_SESSION["activity_id"],
            "group_id": None
        }
        response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404 Not Found]>.status_code

backend-fastapi/tests/test_api/test_v1/test_sessions.py:49: AssertionError
______________________ test_create_session_omitted_group _______________________

client = <httpx.AsyncClient object at 0x7fa4ee7574d0>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee756f30>

    async def test_create_session_omitted_group(client: AsyncClient, db: AsyncSession):
        """Test creating a session with group_id field omitted."""
        session_data = {
            "activity_id": TEST_SESSION["activity_id"]
        }
        response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404 Not Found]>.status_code

backend-fastapi/tests/test_api/test_v1/test_sessions.py:62: AssertionError
________________ test_create_word_review_session_without_group _________________

client = <httpx.AsyncClient object at 0x7fa4eedbdc40>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbd220>

    async def test_create_word_review_session_without_group(client: AsyncClient, db: AsyncSession):
        """Test creating a word review for a session without a group."""
        # Create session without group
        session_data = {**TEST_SESSION, "group_id": None}
        create_response = await client.post(f"{settings.API_V1_PREFIX}/sessions", json=session_data)
>       assert create_response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404 Not Found]>.status_code

backend-fastapi/tests/test_api/test_v1/test_sessions.py:151: AssertionError
______________________________ test_list_sessions ______________________________

self = <sqlalchemy.engine.base.Connection object at 0x7fa4eedbcdd0>
dialect = <sqlalchemy.dialects.sqlite.aiosqlite.SQLiteDialect_aiosqlite object at 0x7fa4f00632c0>
context = <sqlalchemy.dialects.sqlite.aiosqlite.SQLiteExecutionContext_aiosqlite object at 0x7fa4eedbc8f0>
statement = <sqlalchemy.dialects.sqlite.base.SQLiteCompiler object at 0x7fa4ef22e9f0>
parameters = [(None, 1)]

    def _exec_single_context(
        self,
        dialect: Dialect,
        context: ExecutionContext,
        statement: Union[str, Compiled],
        parameters: Optional[_AnyMultiExecuteParams],
    ) -> CursorResult[Any]:
        """continue the _execute_context() method for a single DBAPI
        cursor.execute() or cursor.executemany() call.
    
        """
        if dialect.bind_typing is BindTyping.SETINPUTSIZES:
            generic_setinputsizes = context._prepare_set_input_sizes()
    
            if generic_setinputsizes:
                try:
                    dialect.do_set_input_sizes(
                        context.cursor, generic_setinputsizes, context
                    )
                except BaseException as e:
                    self._handle_dbapi_exception(
                        e, str(statement), parameters, None, context
                    )
    
        cursor, str_statement, parameters = (
            context.cursor,
            context.statement,
            context.parameters,
        )
    
        effective_parameters: Optional[_AnyExecuteParams]
    
        if not context.executemany:
            effective_parameters = parameters[0]
        else:
            effective_parameters = parameters
    
        if self._has_events or self.engine._has_events:
            for fn in self.dispatch.before_cursor_execute:
                str_statement, effective_parameters = fn(
                    self,
                    cursor,
                    str_statement,
                    effective_parameters,
                    context,
                    context.executemany,
                )
    
        if self._echo:
            self._log_info(str_statement)
    
            stats = context._get_cache_stats()
    
            if not self.engine.hide_parameters:
                self._log_info(
                    "[%s] %r",
                    stats,
                    sql_util._repr_params(
                        effective_parameters,
                        batches=10,
                        ismulti=context.executemany,
                    ),
                )
            else:
                self._log_info(
                    "[%s] [SQL parameters hidden due to hide_parameters=True]",
                    stats,
                )
    
        evt_handled: bool = False
        try:
            if context.execute_style is ExecuteStyle.EXECUTEMANY:
                effective_parameters = cast(
                    "_CoreMultiExecuteParams", effective_parameters
                )
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_executemany:
                        if fn(
                            cursor,
                            str_statement,
                            effective_parameters,
                            context,
                        ):
                            evt_handled = True
                            break
                if not evt_handled:
                    self.dialect.do_executemany(
                        cursor,
                        str_statement,
                        effective_parameters,
                        context,
                    )
            elif not effective_parameters and context.no_parameters:
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_execute_no_params:
                        if fn(cursor, str_statement, context):
                            evt_handled = True
                            break
                if not evt_handled:
                    self.dialect.do_execute_no_params(
                        cursor, str_statement, context
                    )
            else:
                effective_parameters = cast(
                    "_CoreSingleExecuteParams", effective_parameters
                )
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_execute:
                        if fn(
                            cursor,
                            str_statement,
                            effective_parameters,
                            context,
                        ):
                            evt_handled = True
                            break
                if not evt_handled:
>                   self.dialect.do_execute(
                        cursor, str_statement, effective_parameters, context
                    )

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1964: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/default.py:942: in do_execute
    cursor.execute(statement, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:172: in execute
    self._adapt_connection._handle_exception(error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:323: in _handle_exception
    raise error
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:154: in execute
    self.await_(_cursor.execute(operation, parameters))
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:132: in await_only
    return current.parent.switch(awaitable)  # type: ignore[no-any-return,attr-defined] # noqa: E501
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:196: in greenlet_spawn
    value = await result
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:40: in execute
    await self._execute(self._cursor.execute, sql, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:32: in _execute
    return await self._conn._execute(fn, *args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:122: in _execute
    return await future
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <Connection(Thread-1, started daemon 140346374768320)>

    def run(self) -> None:
        """
        Execute function calls on a separate thread.
    
        :meta private:
        """
        while True:
            # Continues running until all queue items are processed,
            # even after connection is closed (so we can finalize all
            # futures)
    
            tx_item = self._tx.get()
            if tx_item is _STOP_RUNNING_SENTINEL:
                break
    
            future, function = tx_item
    
            try:
                LOG.debug("executing %s", function)
>               result = function()
E               sqlite3.IntegrityError: NOT NULL constraint failed: sessions.group_id

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:105: IntegrityError

The above exception was the direct cause of the following exception:

client = <httpx.AsyncClient object at 0x7fa4eedbec00>
db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbe210>

    @pytest.mark.asyncio
    async def test_list_sessions(
        client: AsyncClient,
        db: AsyncSession
    ):
        """Test listing sessions with pagination and sorting."""
        # Create test data
        session1 = await session.create(
            db,
            obj_in=SessionCreate(group_id=1, activity_id=1)
        )
>       session2 = await session.create(
            db,
            obj_in=SessionCreate(group_id=None, activity_id=1)  # Session without group
        )

backend-fastapi/tests/test_api/test_v1/test_sessions.py:177: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/base.py:56: in create
    await db.commit()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/ext/asyncio/session.py:1011: in commit
    await greenlet_spawn(self.sync_session.commit)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:203: in greenlet_spawn
    result = context.switch(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:2032: in commit
    trans.commit(_to_root=True)
<string>:2: in commit
    ???
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:139: in _go
    ret_value = fn(self, *arg, **kw)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:1313: in commit
    self._prepare_impl()
<string>:2: in _prepare_impl
    ???
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:139: in _go
    ret_value = fn(self, *arg, **kw)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:1288: in _prepare_impl
    self.session.flush()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4353: in flush
    self._flush(objects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4488: in _flush
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4449: in _flush
    flush_context.execute()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/unitofwork.py:466: in execute
    rec.execute(self)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/unitofwork.py:642: in execute
    util.preloaded.orm_persistence.save_obj(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/persistence.py:93: in save_obj
    _emit_insert_statements(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/persistence.py:1233: in _emit_insert_statements
    result = connection.execute(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1416: in execute
    return meth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/sql/elements.py:516: in _execute_on_connection
    return connection._execute_clauseelement(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1638: in _execute_clauseelement
    ret = self._execute_context(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1843: in _execute_context
    return self._exec_single_context(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1983: in _exec_single_context
    self._handle_dbapi_exception(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:2352: in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1964: in _exec_single_context
    self.dialect.do_execute(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/default.py:942: in do_execute
    cursor.execute(statement, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:172: in execute
    self._adapt_connection._handle_exception(error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:323: in _handle_exception
    raise error
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:154: in execute
    self.await_(_cursor.execute(operation, parameters))
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:132: in await_only
    return current.parent.switch(awaitable)  # type: ignore[no-any-return,attr-defined] # noqa: E501
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:196: in greenlet_spawn
    value = await result
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:40: in execute
    await self._execute(self._cursor.execute, sql, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:32: in _execute
    return await self._conn._execute(fn, *args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:122: in _execute
    return await future
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <Connection(Thread-1, started daemon 140346374768320)>

    def run(self) -> None:
        """
        Execute function calls on a separate thread.
    
        :meta private:
        """
        while True:
            # Continues running until all queue items are processed,
            # even after connection is closed (so we can finalize all
            # futures)
    
            tx_item = self._tx.get()
            if tx_item is _STOP_RUNNING_SENTINEL:
                break
    
            future, function = tx_item
    
            try:
                LOG.debug("executing %s", function)
>               result = function()
E               sqlalchemy.exc.IntegrityError: (sqlite3.IntegrityError) NOT NULL constraint failed: sessions.group_id
E               [SQL: INSERT INTO sessions (group_id, activity_id) VALUES (?, ?) RETURNING id, created_at]
E               [parameters: (None, 1)]
E               (Background on this error at: https://sqlalche.me/e/20/gkpj)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:105: IntegrityError
_____________________________ test_create_activity _____________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbfc20>

    async def test_create_activity(db: AsyncSession):
        """Test creating a new activity."""
        activity_in = ActivityCreate(**TEST_ACTIVITY)
>       db_activity = await activity.create(db, obj_in=activity_in)

backend-fastapi/tests/test_crud/test_activity_crud.py:13: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
______________________________ test_get_activity _______________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee757a10>

    async def test_get_activity(db: AsyncSession):
        """Test getting an activity by ID."""
        # Create activity
        activity_in = ActivityCreate(**TEST_ACTIVITY)
>       db_activity = await activity.create(db, obj_in=activity_in)

backend-fastapi/tests/test_crud/test_activity_crud.py:24: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
__________________________ test_get_multi_activities ___________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbcf80>

    async def test_get_multi_activities(db: AsyncSession):
        """Test getting multiple activities with pagination and sorting."""
        # Create test activities
        activity_1 = ActivityCreate(
            name="Activity 1",
            url="http://example.com/1",
            image_url="http://example.com/images/1.png",
            description="First activity"
        )
        activity_2 = ActivityCreate(
            name="Activity 2",
            url="http://example.com/2",
            image_url="http://example.com/images/2.png",
            description="Second activity"
        )
    
>       await activity.create(db, obj_in=activity_1)

backend-fastapi/tests/test_crud/test_activity_crud.py:51: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Activity 1', url='http://example.com/1', description='First activity')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_____________________________ test_update_activity _____________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ef2b1250>

    async def test_update_activity(db: AsyncSession):
        """Test updating an activity."""
        # Create activity
        activity_in = ActivityCreate(**TEST_ACTIVITY)
>       db_activity = await activity.create(db, obj_in=activity_in)

backend-fastapi/tests/test_crud/test_activity_crud.py:88: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_____________________________ test_delete_activity _____________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ef23df40>

    async def test_delete_activity(db: AsyncSession):
        """Test deleting an activity."""
        # Create activity
        activity_in = ActivityCreate(**TEST_ACTIVITY)
>       db_activity = await activity.create(db, obj_in=activity_in)

backend-fastapi/tests/test_crud/test_activity_crud.py:116: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://localhost:5173/study/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_______________________ test_activity_create_validation ________________________

    def test_activity_create_validation():
        """Test ActivityCreate schema validation."""
        # Test valid data
        valid_data = {
            "name": "Flashcards",
            "url": "http://example.com/flashcards",
            "image_url": "http://example.com/images/flashcards.png",
            "description": "Practice vocabulary with flashcards"
        }
        activity_create = ActivityCreate(**valid_data)
        assert activity_create.name == valid_data["name"]
        assert str(activity_create.url) == valid_data["url"]
>       assert str(activity_create.image_url) == valid_data["image_url"]

backend-fastapi/tests/test_schemas/test_activity_schema.py:31: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='Flashcards', url='http://example.com/flashcards', description='Practice vocabulary with flashcards')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
_______________________ test_activity_update_validation ________________________

    def test_activity_update_validation():
        """Test ActivityUpdate schema validation."""
        # Test with all fields
        valid_data = {
            "name": "Updated Flashcards",
            "url": "http://example.com/updated",
            "image_url": "http://example.com/images/updated.png",
            "description": "Updated description"
        }
        activity_update = ActivityUpdate(**valid_data)
        assert activity_update.name == valid_data["name"]
        assert str(activity_update.url) == valid_data["url"]
>       assert str(activity_update.image_url) == valid_data["image_url"]

backend-fastapi/tests/test_schemas/test_activity_schema.py:72: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityUpdate(name='Updated Flashcards', url='http://example.com/updated', description='Updated description')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityUpdate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
________________________ test_activity_response_schema _________________________

sample_activity_data = {'description': 'Practice vocabulary with flashcards', 'id': 1, 'image_url': 'http://example.com/images/flashcards.png', 'name': 'Flashcards', ...}

    def test_activity_response_schema(sample_activity_data: Dict[str, Any]):
        """Test Activity response schema."""
        activity = Activity(**sample_activity_data)
        assert activity.id == sample_activity_data["id"]
        assert activity.name == sample_activity_data["name"]
        assert str(activity.url) == sample_activity_data["url"]
>       assert str(activity.image_url) == sample_activity_data["image_url"]

backend-fastapi/tests/test_schemas/test_activity_schema.py:105: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = Activity(name='Flashcards', url='http://example.com/flashcards', description='Practice vocabulary with flashcards', id=1)
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'Activity' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
______________________________ test_get_activity _______________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee95c650>
test_activity = <app.models.activity.Activity object at 0x7fa4ee95da60>

    async def test_get_activity(db: AsyncSession, test_activity: Activity) -> None:
        """Test retrieving a single activity by ID."""
        activity = await ActivityService.get_activity(db, test_activity.id)
        assert activity is not None
        assert activity.id == test_activity.id
        assert activity.name == test_activity.name
        assert str(activity.url) == str(test_activity.url)
>       assert str(activity.image_url) == str(test_activity.image_url)
E       AttributeError: 'Activity' object has no attribute 'image_url'

backend-fastapi/tests/test_services/test_activity_service.py:19: AttributeError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
_____________________________ test_create_activity _____________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee95f2f0>

    async def test_create_activity(db: AsyncSession) -> None:
        """Test creating a new activity."""
>       activity = await ActivityService.create_activity(
            db,
            name="New Activity",
            url="http://example.com/new",
            image_url="http://example.com/images/new.png",
            description="A new test activity"
        )

backend-fastapi/tests/test_services/test_activity_service.py:42: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/services/activity_service.py:81: in create_activity
    return await activity.create(db, obj_in=activity_in)
backend-fastapi/app/crud/activity.py:48: in create
    image_url=str(obj_in.image_url),
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = ActivityCreate(name='New Activity', url='http://example.com/new', description='A new test activity')
item = 'image_url'

    def __getattr__(self, item: str) -> Any:
        private_attributes = object.__getattribute__(self, '__private_attributes__')
        if item in private_attributes:
            attribute = private_attributes[item]
            if hasattr(attribute, '__get__'):
                return attribute.__get__(self, type(self))  # type: ignore
    
            try:
                # Note: self.__pydantic_private__ cannot be None if self.__private_attributes__ has items
                return self.__pydantic_private__[item]  # type: ignore
            except KeyError as exc:
                raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
        else:
            # `__pydantic_extra__` can fail to be set if the model is not yet fully initialized.
            # See `BaseModel.__repr_args__` for more details
            try:
                pydantic_extra = object.__getattribute__(self, '__pydantic_extra__')
            except AttributeError:
                pydantic_extra = None
    
            if pydantic_extra:
                try:
                    return pydantic_extra[item]
                except KeyError as exc:
                    raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}') from exc
            else:
                if hasattr(self.__class__, item):
                    return super().__getattribute__(item)  # Raises AttributeError if appropriate
                else:
                    # this is the current error
>                   raise AttributeError(f'{type(self).__name__!r} object has no attribute {item!r}')
E                   AttributeError: 'ActivityCreate' object has no attribute 'image_url'

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/main.py:891: AttributeError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
_____________________________ test_update_activity _____________________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee9c5250>
test_activity = <app.models.activity.Activity object at 0x7fa4ee9c5730>

    async def test_update_activity(db: AsyncSession, test_activity: Activity) -> None:
        """Test updating an existing activity."""
        activity_update = ActivityUpdate(
            name="Updated Activity",
            description="Updated description"
        )
        updated_activity = await ActivityService.update_activity(
            db,
            activity_id=test_activity.id,
            activity_in=activity_update
        )
        assert updated_activity.id == test_activity.id
        assert updated_activity.name == "Updated Activity"
        assert updated_activity.description == "Updated description"
        # Unchanged fields should remain the same
        assert updated_activity.url == test_activity.url
>       assert updated_activity.image_url == test_activity.image_url
E       AttributeError: 'Activity' object has no attribute 'image_url'

backend-fastapi/tests/test_services/test_activity_service.py:83: AttributeError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
______________________ test_create_session_without_group _______________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec37890>
test_activity = <app.models.activity.Activity object at 0x7fa4eec2c4d0>

    async def test_create_session_without_group(
        db: AsyncSession,
        test_activity: Activity
    ) -> None:
        """Test creating a new session without a group."""
>       session = await SessionService.create_session(
            db,
            group_id=None,
            activity_id=test_activity.id
        )

backend-fastapi/tests/test_services/test_session_service.py:52: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eec37890>

    @staticmethod
    async def create_session(
        db: AsyncSession,
        *,
        group_id: int,
        activity_id: int
    ) -> Session:
        """
        Create a new session with validation.
    
        Args:
            group_id: ID of the group to study
            activity_id: ID of the activity to use
    
        Raises:
            ValueError: If group or activity doesn't exist
        """
        # Verify group exists
        db_group = await group.get(db, group_id)
        if not db_group:
>           raise ValueError(f"Group {group_id} not found")
E           ValueError: Group None not found

backend-fastapi/app/services/session_service.py:72: ValueError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
____________________ test_add_review_session_without_group _____________________

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbc050>
test_activity = <app.models.activity.Activity object at 0x7fa4ee9c4ef0>
test_word = <app.models.word.Word object at 0x7fa4ee9c4d70>

    async def test_add_review_session_without_group(
        db: AsyncSession,
        test_activity: Activity,
        test_word: Word
    ) -> None:
        """Test adding a review to a session without a group."""
        # Create a session without a group
>       session = await SessionService.create_session(
            db,
            group_id=None,
            activity_id=test_activity.id
        )

backend-fastapi/tests/test_services/test_session_service.py:159: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4eedbc050>

    @staticmethod
    async def create_session(
        db: AsyncSession,
        *,
        group_id: int,
        activity_id: int
    ) -> Session:
        """
        Create a new session with validation.
    
        Args:
            group_id: ID of the group to study
            activity_id: ID of the activity to use
    
        Raises:
            ValueError: If group or activity doesn't exist
        """
        # Verify group exists
        db_group = await group.get(db, group_id)
        if not db_group:
>           raise ValueError(f"Group {group_id} not found")
E           ValueError: Group None not found

backend-fastapi/app/services/session_service.py:72: ValueError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
______________________________ test_get_sessions _______________________________

self = <sqlalchemy.engine.base.Connection object at 0x7fa4eec2cdd0>
dialect = <sqlalchemy.dialects.sqlite.aiosqlite.SQLiteDialect_aiosqlite object at 0x7fa4f00632c0>
context = <sqlalchemy.dialects.sqlite.aiosqlite.SQLiteExecutionContext_aiosqlite object at 0x7fa4eec36a80>
statement = <sqlalchemy.dialects.sqlite.base.SQLiteCompiler object at 0x7fa4ef22e9f0>
parameters = [(None, 1)]

    def _exec_single_context(
        self,
        dialect: Dialect,
        context: ExecutionContext,
        statement: Union[str, Compiled],
        parameters: Optional[_AnyMultiExecuteParams],
    ) -> CursorResult[Any]:
        """continue the _execute_context() method for a single DBAPI
        cursor.execute() or cursor.executemany() call.
    
        """
        if dialect.bind_typing is BindTyping.SETINPUTSIZES:
            generic_setinputsizes = context._prepare_set_input_sizes()
    
            if generic_setinputsizes:
                try:
                    dialect.do_set_input_sizes(
                        context.cursor, generic_setinputsizes, context
                    )
                except BaseException as e:
                    self._handle_dbapi_exception(
                        e, str(statement), parameters, None, context
                    )
    
        cursor, str_statement, parameters = (
            context.cursor,
            context.statement,
            context.parameters,
        )
    
        effective_parameters: Optional[_AnyExecuteParams]
    
        if not context.executemany:
            effective_parameters = parameters[0]
        else:
            effective_parameters = parameters
    
        if self._has_events or self.engine._has_events:
            for fn in self.dispatch.before_cursor_execute:
                str_statement, effective_parameters = fn(
                    self,
                    cursor,
                    str_statement,
                    effective_parameters,
                    context,
                    context.executemany,
                )
    
        if self._echo:
            self._log_info(str_statement)
    
            stats = context._get_cache_stats()
    
            if not self.engine.hide_parameters:
                self._log_info(
                    "[%s] %r",
                    stats,
                    sql_util._repr_params(
                        effective_parameters,
                        batches=10,
                        ismulti=context.executemany,
                    ),
                )
            else:
                self._log_info(
                    "[%s] [SQL parameters hidden due to hide_parameters=True]",
                    stats,
                )
    
        evt_handled: bool = False
        try:
            if context.execute_style is ExecuteStyle.EXECUTEMANY:
                effective_parameters = cast(
                    "_CoreMultiExecuteParams", effective_parameters
                )
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_executemany:
                        if fn(
                            cursor,
                            str_statement,
                            effective_parameters,
                            context,
                        ):
                            evt_handled = True
                            break
                if not evt_handled:
                    self.dialect.do_executemany(
                        cursor,
                        str_statement,
                        effective_parameters,
                        context,
                    )
            elif not effective_parameters and context.no_parameters:
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_execute_no_params:
                        if fn(cursor, str_statement, context):
                            evt_handled = True
                            break
                if not evt_handled:
                    self.dialect.do_execute_no_params(
                        cursor, str_statement, context
                    )
            else:
                effective_parameters = cast(
                    "_CoreSingleExecuteParams", effective_parameters
                )
                if self.dialect._has_events:
                    for fn in self.dialect.dispatch.do_execute:
                        if fn(
                            cursor,
                            str_statement,
                            effective_parameters,
                            context,
                        ):
                            evt_handled = True
                            break
                if not evt_handled:
>                   self.dialect.do_execute(
                        cursor, str_statement, effective_parameters, context
                    )

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1964: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/default.py:942: in do_execute
    cursor.execute(statement, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:172: in execute
    self._adapt_connection._handle_exception(error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:323: in _handle_exception
    raise error
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:154: in execute
    self.await_(_cursor.execute(operation, parameters))
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:132: in await_only
    return current.parent.switch(awaitable)  # type: ignore[no-any-return,attr-defined] # noqa: E501
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:196: in greenlet_spawn
    value = await result
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:40: in execute
    await self._execute(self._cursor.execute, sql, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:32: in _execute
    return await self._conn._execute(fn, *args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:122: in _execute
    return await future
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <Connection(Thread-1, started daemon 140346374768320)>

    def run(self) -> None:
        """
        Execute function calls on a separate thread.
    
        :meta private:
        """
        while True:
            # Continues running until all queue items are processed,
            # even after connection is closed (so we can finalize all
            # futures)
    
            tx_item = self._tx.get()
            if tx_item is _STOP_RUNNING_SENTINEL:
                break
    
            future, function = tx_item
    
            try:
                LOG.debug("executing %s", function)
>               result = function()
E               sqlite3.IntegrityError: NOT NULL constraint failed: sessions.group_id

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:105: IntegrityError

The above exception was the direct cause of the following exception:

db = <sqlalchemy.orm.session.AsyncSession object at 0x7fa4ee9c4650>

    @pytest.mark.asyncio
    async def test_get_sessions(db: AsyncSession):
        """Test getting multiple sessions with pagination and sorting."""
        # Create test data
        session1 = await session.create(
            db,
            obj_in=SessionCreate(group_id=1, activity_id=1)
        )
>       session2 = await session.create(
            db,
            obj_in=SessionCreate(group_id=None, activity_id=1)  # Session without group
        )

backend-fastapi/tests/test_services/test_session_service.py:224: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
backend-fastapi/app/crud/base.py:56: in create
    await db.commit()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/ext/asyncio/session.py:1011: in commit
    await greenlet_spawn(self.sync_session.commit)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:203: in greenlet_spawn
    result = context.switch(value)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:2032: in commit
    trans.commit(_to_root=True)
<string>:2: in commit
    ???
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:139: in _go
    ret_value = fn(self, *arg, **kw)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:1313: in commit
    self._prepare_impl()
<string>:2: in _prepare_impl
    ???
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/state_changes.py:139: in _go
    ret_value = fn(self, *arg, **kw)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:1288: in _prepare_impl
    self.session.flush()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4353: in flush
    self._flush(objects)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4488: in _flush
    with util.safe_reraise():
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/langhelpers.py:146: in __exit__
    raise exc_value.with_traceback(exc_tb)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/session.py:4449: in _flush
    flush_context.execute()
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/unitofwork.py:466: in execute
    rec.execute(self)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/unitofwork.py:642: in execute
    util.preloaded.orm_persistence.save_obj(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/persistence.py:93: in save_obj
    _emit_insert_statements(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/orm/persistence.py:1233: in _emit_insert_statements
    result = connection.execute(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1416: in execute
    return meth(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/sql/elements.py:516: in _execute_on_connection
    return connection._execute_clauseelement(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1638: in _execute_clauseelement
    ret = self._execute_context(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1843: in _execute_context
    return self._exec_single_context(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1983: in _exec_single_context
    self._handle_dbapi_exception(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:2352: in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/base.py:1964: in _exec_single_context
    self.dialect.do_execute(
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/engine/default.py:942: in do_execute
    cursor.execute(statement, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:172: in execute
    self._adapt_connection._handle_exception(error)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:323: in _handle_exception
    raise error
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/dialects/sqlite/aiosqlite.py:154: in execute
    self.await_(_cursor.execute(operation, parameters))
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:132: in await_only
    return current.parent.switch(awaitable)  # type: ignore[no-any-return,attr-defined] # noqa: E501
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/util/_concurrency_py3k.py:196: in greenlet_spawn
    value = await result
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:40: in execute
    await self._execute(self._cursor.execute, sql, parameters)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/cursor.py:32: in _execute
    return await self._conn._execute(fn, *args, **kwargs)
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:122: in _execute
    return await future
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

self = <Connection(Thread-1, started daemon 140346374768320)>

    def run(self) -> None:
        """
        Execute function calls on a separate thread.
    
        :meta private:
        """
        while True:
            # Continues running until all queue items are processed,
            # even after connection is closed (so we can finalize all
            # futures)
    
            tx_item = self._tx.get()
            if tx_item is _STOP_RUNNING_SENTINEL:
                break
    
            future, function = tx_item
    
            try:
                LOG.debug("executing %s", function)
>               result = function()
E               sqlalchemy.exc.IntegrityError: (sqlite3.IntegrityError) NOT NULL constraint failed: sessions.group_id
E               [SQL: INSERT INTO sessions (group_id, activity_id) VALUES (?, ?) RETURNING id, created_at]
E               [parameters: (None, 1)]
E               (Background on this error at: https://sqlalche.me/e/20/gkpj)

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/aiosqlite/core.py:105: IntegrityError
---------------------------- Captured stdout setup -----------------------------

Cleanup completed successfully
=============================== warnings summary ===============================
backend-fastapi/app/core/config.py:26
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/core/config.py:26: PydanticDeprecatedSince20: Pydantic V1 style `@validator` validators are deprecated. You should migrate to Pydantic V2 style `@field_validator` validators, see the migration guide for more details. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    @validator("DATABASE_URL")

../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/_internal/_config.py:295
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/_internal/_config.py:295
../../../miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/_internal/_config.py:295
  /home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pydantic/_internal/_config.py:295: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    warnings.warn(DEPRECATION_MESSAGE, DeprecationWarning)

backend-fastapi/app/api/v1/endpoints/words.py:17
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/words.py:17: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    sort_by: str = Query("romaji", regex="^(kanji|romaji|english|correct_count|wrong_count)$"),

backend-fastapi/app/api/v1/endpoints/words.py:18
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/words.py:18: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    order: str = Query("asc", regex="^(asc|desc)$"),

backend-fastapi/app/api/v1/endpoints/groups.py:18
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/groups.py:18: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    sort_by: str = Query("name", regex="^(name|words_count)$"),

backend-fastapi/app/api/v1/endpoints/groups.py:19
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/groups.py:19: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    order: str = Query("asc", regex="^(asc|desc)$"),

backend-fastapi/app/api/v1/endpoints/groups.py:55
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/groups.py:55: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    sort_by: str = Query("romaji", regex="^(kanji|romaji|english)$"),

backend-fastapi/app/api/v1/endpoints/groups.py:56
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/groups.py:56: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    order: str = Query("asc", regex="^(asc|desc)$"),

backend-fastapi/app/api/v1/endpoints/activities.py:16
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py:16: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    sort_by: str = Query("name", regex="^(name)$", description="Field to sort by"),

backend-fastapi/app/api/v1/endpoints/activities.py:17
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/api/v1/endpoints/activities.py:17: DeprecationWarning: `regex` has been deprecated, please use `pattern` instead
    order: str = Query("asc", regex="^(asc|desc)$", description="Sort order"),

tests/test_api/test_v1/test_activities.py::test_create_activity
  /home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/pytest_asyncio/plugin.py:867: DeprecationWarning: The event_loop fixture provided by pytest-asyncio has been redefined in
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/conftest.py:60
  Replacing the event_loop fixture with a custom implementation is deprecated
  and will lead to errors in the future.
  If you want to request an asyncio event loop with a scope other than function
  scope, use the "loop_scope" argument to the asyncio mark when marking the tests.
  If you want to return different types of event loops, use the event_loop_policy
  fixture.
  
    warnings.warn(

tests/test_api/test_v1/test_activities.py::test_get_activity_not_found
  sys:1: SAWarning: relationship 'Group.words' will copy column groups.id to column word_groups.group_id, which conflicts with relationship(s): 'Group.word_groups' (copies groups.id to word_groups.group_id), 'WordGroup.group' (copies groups.id to word_groups.group_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="group,word_groups"' to the 'Group.words' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)

tests/test_api/test_v1/test_activities.py::test_get_activity_not_found
  sys:1: SAWarning: relationship 'Group.words' will copy column words.id to column word_groups.word_id, which conflicts with relationship(s): 'Word.word_groups' (copies words.id to word_groups.word_id), 'WordGroup.word' (copies words.id to word_groups.word_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="word,word_groups"' to the 'Group.words' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)

tests/test_api/test_v1/test_groups.py: 10 warnings
tests/test_api/test_v1/test_sessions.py: 12 warnings
tests/test_crud/test_group_crud.py: 9 warnings
tests/test_db/test_integration.py: 2 warnings
tests/test_services/test_group_service.py: 2 warnings
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/crud/group.py:17: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    group_data = obj_in.dict(exclude={"word_ids"})

tests/test_api/test_v1/test_groups.py::test_get_group_details
tests/test_api/test_v1/test_groups.py::test_update_group
tests/test_crud/test_group_crud.py::test_update_group
tests/test_services/test_group_service.py::test_get_group_words
tests/test_services/test_group_service.py::test_update_group
tests/test_services/test_group_service.py::test_update_group_words
tests/test_services/test_group_service.py::test_update_group_words
tests/test_services/test_group_service.py::test_update_group_words
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/crud/group.py:192: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    update_data = obj_in.dict(exclude={"word_ids"}, exclude_unset=True)

tests/test_api/test_v1/test_sessions.py: 1 warning
tests/test_crud/test_session_crud.py: 6 warnings
tests/test_services/test_session_service.py: 3 warnings
  /home/gray/miniconda3/envs/freegenai/lib/python3.12/site-packages/sqlalchemy/sql/schema.py:3616: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
    return util.wrap_callable(lambda ctx: fn(), fn)  # type: ignore

tests/test_api/test_v1/test_words.py::test_update_word
tests/test_services/test_word_service.py::test_update_word
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/crud/base.py:72: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    update_data = obj_in.dict(exclude_unset=True)

tests/test_models/test_group_model.py::test_group_word_relationship
  sys:1: SAWarning: DELETE statement on table 'word_groups' expected to delete 1 row(s); 0 were matched.  Please set confirm_deleted_rows=False within the mapper configuration to prevent this warning.

tests/test_schemas/test_base_schema.py::test_timestamp_schema
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/tests/test_schemas/test_base_schema.py:36: DeprecationWarning: datetime.datetime.utcnow() is deprecated and scheduled for removal in a future version. Use timezone-aware objects to represent datetimes in UTC: datetime.datetime.now(datetime.UTC).
    now = datetime.utcnow()

tests/test_services/test_session_service.py::test_get_session_stats
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/services/session_service.py:154: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    return stats.dict()

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html

---------- coverage: platform linux, python 3.12.9-final-0 -----------
Name                                                 Stmts   Miss  Cover   Missing
----------------------------------------------------------------------------------
backend-fastapi/app/api/v1/endpoints/activities.py      43     18    58%   29-40, 66-68, 96, 98, 126-130, 148-152
backend-fastapi/app/api/v1/endpoints/groups.py          50     23    54%   40-42, 70-85, 111-113, 136-147, 165-169
backend-fastapi/app/api/v1/endpoints/sessions.py        57     36    37%   37-86, 116-139, 162-169, 202-218
backend-fastapi/app/api/v1/endpoints/words.py           43     17    60%   39-41, 75-76, 96-98, 121-131, 149-153
backend-fastapi/app/api/v1/router.py                     7      0   100%
backend-fastapi/app/core/config.py                      35      4    89%   40, 55-56, 60
backend-fastapi/app/core/database.py                    18      8    56%   28-36
backend-fastapi/app/core/exceptions.py                  12      1    92%   32
backend-fastapi/app/crud/activity.py                    37      7    81%   31, 51-54, 66, 68
backend-fastapi/app/crud/base.py                        54      6    89%   42-45, 92-93
backend-fastapi/app/crud/group.py                      101      9    91%   50, 86, 105, 139, 173, 186, 189-190, 217
backend-fastapi/app/crud/session.py                     58      4    93%   35-38
backend-fastapi/app/crud/word.py                        39      5    87%   64-67, 72
backend-fastapi/app/main.py                             34      5    85%   47, 56, 80-82, 92
backend-fastapi/app/models/activity.py                  10      0   100%
backend-fastapi/app/models/base.py                       9      0   100%
backend-fastapi/app/models/group.py                     13      0   100%
backend-fastapi/app/models/session.py                   16      3    81%   7-9
backend-fastapi/app/models/word.py                      20      0   100%
backend-fastapi/app/models/word_group.py                10      0   100%
backend-fastapi/app/models/word_review_item.py          17      1    94%   10
backend-fastapi/app/schemas/activity.py                 16      0   100%
backend-fastapi/app/schemas/base.py                     29      6    79%   28, 30, 32, 34, 36, 38
backend-fastapi/app/schemas/group.py                    20      0   100%
backend-fastapi/app/schemas/session.py                  49      1    98%   87
backend-fastapi/app/schemas/word.py                     25      0   100%
backend-fastapi/app/services/activity_service.py        35      0   100%
backend-fastapi/app/services/group_service.py           42      0   100%
backend-fastapi/app/services/session_service.py         49      1    98%   36
backend-fastapi/app/services/word_service.py            36      0   100%
----------------------------------------------------------------------------------
TOTAL                                                  984    155    84%
Coverage HTML written to dir htmlcov

=========================== short test summary info ============================
FAILED backend-fastapi/tests/test_api/test_v1/test_activities.py::test_create_activity
FAILED backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activity
FAILED backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activities
FAILED backend-fastapi/tests/test_api/test_v1/test_activities.py::test_update_activity
FAILED backend-fastapi/tests/test_api/test_v1/test_activities.py::test_delete_activity
FAILED backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_without_group
FAILED backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_omitted_group
FAILED backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_word_review_session_without_group
FAILED backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_list_sessions
FAILED backend-fastapi/tests/test_crud/test_activity_crud.py::test_create_activity
FAILED backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_activity
FAILED backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_multi_activities
FAILED backend-fastapi/tests/test_crud/test_activity_crud.py::test_update_activity
FAILED backend-fastapi/tests/test_crud/test_activity_crud.py::test_delete_activity
FAILED backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_create_validation
FAILED backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_update_validation
FAILED backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_response_schema
FAILED backend-fastapi/tests/test_services/test_activity_service.py::test_get_activity
FAILED backend-fastapi/tests/test_services/test_activity_service.py::test_create_activity
FAILED backend-fastapi/tests/test_services/test_activity_service.py::test_update_activity
FAILED backend-fastapi/tests/test_services/test_session_service.py::test_create_session_without_group
FAILED backend-fastapi/tests/test_services/test_session_service.py::test_add_review_session_without_group
FAILED backend-fastapi/tests/test_services/test_session_service.py::test_get_sessions
ERROR backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_list_sessions
ERROR backend-fastapi/tests/test_models/test_session_model.py::test_session_group_relationship
ERROR backend-fastapi/tests/test_models/test_session_model.py::test_session_activity_relationship
ERROR backend-fastapi/tests/test_models/test_session_model.py::test_session_review_relationship
ERROR backend-fastapi/tests/test_models/test_session_model.py::test_session_attributes
ERROR backend-fastapi/tests/test_models/test_session_model.py::test_session_without_group
ERROR backend-fastapi/tests/test_models/test_word_model.py::test_word_review_relationship
ERROR backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_word_relationship
ERROR backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_session_relationship
ERROR backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_attributes
ERROR backend-fastapi/tests/test_services/test_session_service.py::test_get_sessions
=========== 23 failed, 128 passed, 73 warnings, 11 errors in 14.66s ============
