"""Configuration for pytest."""

import pytest
from _pytest.config import Config
from _pytest.config.argparsing import Parser
from _pytest.nodes import Item


def pytest_configure(config: Config) -> None:
    """Register custom markers."""
    config.addinivalue_line(
        "markers", "api: mark tests that require API calls and may incur costs"
    )


def pytest_addoption(parser: Parser) -> None:
    """Add command line options to pytest."""
    parser.addoption(
        "--api-tests",
        action="store_true",
        default=False,
        help="Run tests that require API calls and may incur costs",
    )


def pytest_runtest_setup(item: Item) -> None:
    """Skip API tests by default unless --api-tests option is provided."""
    if "api" in item.keywords and not item.config.getoption("--api-tests"):
        pytest.skip("API test skipped. Use --api-tests to run")
