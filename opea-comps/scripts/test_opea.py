#!/usr/bin/env python
"""
Test script for OPEA integration.

This script provides a simple command-line interface to test the OPEA client
and verify that it can connect to the OPEA service and generate responses.
"""

import argparse
import logging
import sys
from pathlib import Path

# Add parent directory to path so we can import our modules
sys.path.append(str(Path(__file__).parent.parent))

from backend.opea_client import OPEAClient
from config.opea_config import default_config


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def test_service_availability(client: OPEAClient) -> None:
    """Test if the OPEA service is available.
    
    Args:
        client: The OPEA client instance.
    """
    if client.is_service_available():
        print("✅ OPEA service is available.")
    else:
        print("❌ OPEA service is not available.")


def test_list_models(client: OPEAClient) -> None:
    """Test listing available models.
    
    Args:
        client: The OPEA client instance.
    """
    models = client.list_available_models()
    if models is None:
        print("❌ Failed to retrieve models list.")
        return
    
    print(f"✅ Found {len(models)} available models:")
    for model in models:
        print(f"  - {model.get('id', 'Unknown ID')}")


def test_model_info(client: OPEAClient, model: str = None) -> None:
    """Test retrieving model information.
    
    Args:
        client: The OPEA client instance.
        model: Optional model name to get info for.
    """
    model_name = model or default_config.default_model
    info = client.get_model_info(model_name)
    
    if info is None:
        print(f"❌ Failed to retrieve information for model: {model_name}")
        return
    
    print(f"✅ Model information for {model_name}:")
    for key, value in info.items():
        print(f"  - {key}: {value}")


def test_generate_response(client: OPEAClient, prompt: str, model: str = None) -> None:
    """Test generating a response from the model.
    
    Args:
        client: The OPEA client instance.
        prompt: The prompt text to send.
        model: Optional model name to use.
    """
    model_name = model or default_config.default_model
    print(f"Generating response using model: {model_name}")
    print(f"Prompt: {prompt}")
    
    response = client.generate_response(prompt, model_name)
    
    if response is None:
        print("❌ Failed to generate response.")
        return
    
    print("\nResponse:")
    print(f"{response}")


def main() -> None:
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description="Test OPEA integration")
    parser.add_argument("--host", help="OPEA API host", default=default_config.api_host)
    parser.add_argument("--port", help="OPEA API port", type=int, default=default_config.api_port)
    parser.add_argument("--model", help="Model name to use")
    parser.add_argument("--prompt", help="Prompt to send to the model")
    parser.add_argument("--timeout", help="Request timeout in seconds", type=int, default=60)
    parser.add_argument("--test", choices=["service", "models", "info", "generate", "all"], 
                        default="all", help="Test to run")
    
    args = parser.parse_args()
    
    # Update config with command line arguments
    default_config.api_host = args.host
    default_config.api_port = args.port
    
    # Create client
    client = OPEAClient(config=default_config, timeout=args.timeout)
    
    # Run specified test(s)
    if args.test in ["service", "all"]:
        test_service_availability(client)
        print()
    
    if args.test in ["models", "all"]:
        test_list_models(client)
        print()
    
    if args.test in ["info", "all"]:
        test_model_info(client, args.model)
        print()
    
    if args.test in ["generate", "all"]:
        if not args.prompt and args.test == "generate":
            print("Error: --prompt is required for the 'generate' test.")
            sys.exit(1)
        elif args.prompt:
            test_generate_response(client, args.prompt, args.model)


if __name__ == "__main__":
    main() 