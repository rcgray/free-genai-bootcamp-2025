"""Backend package for Japanese Listening Learning Tool."""


def get_greeting(name: str = "World") -> str:
    """Return a greeting message.

    Args:
        name: Name to greet. Defaults to "World".

    Returns:
        A greeting message string.
    """
    return f"こんにちは {name}! Welcome to Japanese Listening Learning Tool!"
