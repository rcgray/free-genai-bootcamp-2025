============================= test session starts ==============================
platform linux -- Python 3.12.9, pytest-8.3.4, pluggy-1.5.0 -- /home/gray/miniconda3/envs/freegenai/bin/python3
cachedir: .pytest_cache
rootdir: /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi
configfile: pyproject.toml
plugins: asyncio-0.25.3, anyio-4.8.0, cov-6.0.0
asyncio: mode=Mode.AUTO, asyncio_default_fixture_loop_scope=function
collecting ... collected 160 items

backend-fastapi/tests/test_api/test_v1/test_activities.py::test_create_activity PASSED [  0%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activity PASSED [  1%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activity_not_found PASSED [  1%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_get_activities PASSED [  2%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_update_activity PASSED [  3%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_update_activity_not_found PASSED [  3%]
backend-fastapi/tests/test_api/test_v1/test_activities.py::test_delete_activity PASSED [  4%]
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
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_without_group PASSED [ 12%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_omitted_group PASSED [ 13%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_invalid_group PASSED [ 13%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_session_invalid_activity PASSED [ 14%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_get_session PASSED [ 15%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_get_nonexistent_session PASSED [ 15%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_word_review PASSED [ 16%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_review_invalid_word PASSED [ 16%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_review_invalid_session PASSED [ 17%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_create_word_review_session_without_group PASSED [ 18%]
backend-fastapi/tests/test_api/test_v1/test_sessions.py::test_list_sessions PASSED [ 18%]
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
backend-fastapi/tests/test_crud/test_activity_crud.py::test_create_activity PASSED [ 25%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_activity PASSED [ 26%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_get_multi_activities PASSED [ 26%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_update_activity PASSED [ 27%]
backend-fastapi/tests/test_crud/test_activity_crud.py::test_delete_activity PASSED [ 28%]
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
backend-fastapi/tests/test_models/test_session_model.py::test_session_group_relationship PASSED [ 51%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_activity_relationship PASSED [ 52%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_review_relationship PASSED [ 53%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_attributes PASSED [ 53%]
backend-fastapi/tests/test_models/test_session_model.py::test_session_without_group PASSED [ 54%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_group_relationship PASSED [ 55%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_review_relationship PASSED [ 55%]
backend-fastapi/tests/test_models/test_word_model.py::test_word_attributes PASSED [ 56%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_word_relationship PASSED [ 56%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_session_relationship PASSED [ 57%]
backend-fastapi/tests/test_models/test_word_review_item_model.py::test_word_review_attributes PASSED [ 58%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_create_validation PASSED [ 58%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_update_validation PASSED [ 59%]
backend-fastapi/tests/test_schemas/test_activity_schema.py::test_activity_response_schema PASSED [ 60%]
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
backend-fastapi/tests/test_services/test_activity_service.py::test_get_activity PASSED [ 73%]
backend-fastapi/tests/test_services/test_activity_service.py::test_get_nonexistent_activity PASSED [ 73%]
backend-fastapi/tests/test_services/test_activity_service.py::test_get_activities PASSED [ 74%]
backend-fastapi/tests/test_services/test_activity_service.py::test_create_activity PASSED [ 75%]
backend-fastapi/tests/test_services/test_activity_service.py::test_create_duplicate_activity PASSED [ 75%]
backend-fastapi/tests/test_services/test_activity_service.py::test_update_activity PASSED [ 76%]
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
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_without_group PASSED [ 88%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_invalid_group PASSED [ 88%]
backend-fastapi/tests/test_services/test_session_service.py::test_create_session_invalid_activity PASSED [ 89%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review PASSED [ 90%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_nonexistent_session PASSED [ 90%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_nonexistent_word PASSED [ 91%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_word_not_in_group PASSED [ 91%]
backend-fastapi/tests/test_services/test_session_service.py::test_add_review_session_without_group PASSED [ 92%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_session_stats PASSED [ 93%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_session_stats_nonexistent_session PASSED [ 93%]
backend-fastapi/tests/test_services/test_session_service.py::test_get_sessions PASSED [ 94%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_word PASSED [ 95%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_nonexistent_word PASSED [ 95%]
backend-fastapi/tests/test_services/test_word_service.py::test_get_words_with_stats PASSED [ 96%]
backend-fastapi/tests/test_services/test_word_service.py::test_create_word PASSED [ 96%]
backend-fastapi/tests/test_services/test_word_service.py::test_create_duplicate_word PASSED [ 97%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_word PASSED [ 98%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_nonexistent_word PASSED [ 98%]
backend-fastapi/tests/test_services/test_word_service.py::test_update_word_duplicate_kanji PASSED [ 99%]
backend-fastapi/tests/test_services/test_word_service.py::test_delete_word PASSED [100%]

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

tests/test_api/test_v1/test_activities.py::test_create_activity
  sys:1: SAWarning: relationship 'Group.words' will copy column groups.id to column word_groups.group_id, which conflicts with relationship(s): 'Group.word_groups' (copies groups.id to word_groups.group_id), 'WordGroup.group' (copies groups.id to word_groups.group_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="group,word_groups"' to the 'Group.words' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)

tests/test_api/test_v1/test_activities.py::test_create_activity
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

tests/test_api/test_v1/test_sessions.py: 3 warnings
tests/test_crud/test_session_crud.py: 6 warnings
tests/test_models/test_session_model.py: 1 warning
tests/test_models/test_word_model.py: 1 warning
tests/test_models/test_word_review_item_model.py: 3 warnings
tests/test_services/test_session_service.py: 5 warnings
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
  /home/gray/Projects/free-genai-bootcamp-2025/lang-portal/backend-fastapi/app/services/session_service.py:155: PydanticDeprecatedSince20: The `dict` method is deprecated; use `model_dump` instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    return stats.dict()

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html

---------- coverage: platform linux, python 3.12.9-final-0 -----------
Name                                                 Stmts   Miss  Cover   Missing
----------------------------------------------------------------------------------
backend-fastapi/app/api/v1/endpoints/activities.py      43     17    60%   38-40, 69-71, 101-106, 134-141, 159-163
backend-fastapi/app/api/v1/endpoints/groups.py          50     23    54%   40-42, 70-85, 111-113, 136-147, 165-169
backend-fastapi/app/api/v1/endpoints/sessions.py        57     28    51%   70-86, 116-139, 162-169, 202-218
backend-fastapi/app/api/v1/endpoints/words.py           43     17    60%   39-41, 75-76, 96-98, 121-131, 149-153
backend-fastapi/app/api/v1/router.py                     7      0   100%
backend-fastapi/app/core/config.py                      35      4    89%   40, 55-56, 60
backend-fastapi/app/core/database.py                    18      8    56%   28-36
backend-fastapi/app/core/exceptions.py                  12      1    92%   32
backend-fastapi/app/crud/activity.py                    35      0   100%
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
backend-fastapi/app/services/session_service.py         50      0   100%
backend-fastapi/app/services/word_service.py            36      0   100%
----------------------------------------------------------------------------------
TOTAL                                                  983    138    86%
Coverage HTML written to dir htmlcov

======================= 160 passed, 82 warnings in 7.86s =======================
