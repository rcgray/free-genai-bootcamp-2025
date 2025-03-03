"""
OPEA Client for LLM Chat Application.

This module provides a client for interacting with the OPEA toolchain,
handling model loading, inference requests, and response processing.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional, List, Union

import requests
from requests.exceptions import RequestException

from config.opea_config import OPEAConfig, default_config


logger = logging.getLogger(__name__)


class OPEAClient:
    """Client for interacting with OPEA services."""

    def __init__(
        self, config: Optional[OPEAConfig] = None, timeout: int = 30
    ) -> None:
        """Initialize the OPEA client.

        Args:
            config: OPEA configuration instance. If None, uses default_config.
            timeout: Request timeout in seconds.
        """
        self.config = config or default_config
        self.timeout = timeout
        self.session = requests.Session()

    def is_service_available(self) -> bool:
        """Check if the OPEA service is available.

        Returns:
            bool: True if the service is available, False otherwise.
        """
        try:
            url = f"http://{self.config.api_host}:{self.config.api_port}/health"
            response = self.session.get(url, timeout=self.timeout)
            return response.status_code == 200
        except RequestException as e:
            logger.error(f"Error checking OPEA service availability: {e}")
            return False

    def generate_response(
        self, prompt: str, model: Optional[str] = None
    ) -> Optional[str]:
        """Send a prompt to the LLM and get a response.

        Args:
            prompt: The user's prompt text.
            model: Optional model name to use. If None, uses the default model.

        Returns:
            The generated response text, or None if an error occurred.
        """
        if not self.is_service_available():
            logger.error("OPEA service is not available")
            return None

        model_name = model or self.config.default_model
        request_data = {
            "model": model_name,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": self.config.max_new_tokens,
            "temperature": self.config.temperature,
            "top_p": self.config.top_p,
        }

        try:
            response = self.session.post(
                self.config.get_api_url(),
                json=request_data,
                timeout=self.timeout,
            )
            response.raise_for_status()
            result = response.json()
            return result.get("choices", [{}])[0].get("message", {}).get("content")
        except RequestException as e:
            logger.error(f"Error generating response: {e}")
            return None
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            logger.error(f"Error parsing response: {e}")
            return None

    def get_model_info(self, model: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """Get information about a specific model.

        Args:
            model: Optional model name to get info for. If None, uses the default model.

        Returns:
            Dictionary with model information, or None if an error occurred.
        """
        if not self.is_service_available():
            logger.error("OPEA service is not available")
            return None

        model_name = model or self.config.default_model
        try:
            url = f"http://{self.config.api_host}:{self.config.api_port}/v1/models/{model_name}"
            response = self.session.get(url, timeout=self.timeout)
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            logger.error(f"Error getting model info: {e}")
            return None
        except json.JSONDecodeError as e:
            logger.error(f"Error parsing model info: {e}")
            return None

    def list_available_models(self) -> Optional[List[Dict[str, Any]]]:
        """List all available models in the OPEA service.

        Returns:
            List of model information dictionaries, or None if an error occurred.
        """
        if not self.is_service_available():
            logger.error("OPEA service is not available")
            return None

        try:
            url = f"http://{self.config.api_host}:{self.config.api_port}/v1/models"
            response = self.session.get(url, timeout=self.timeout)
            response.raise_for_status()
            return response.json().get("data", [])
        except RequestException as e:
            logger.error(f"Error listing models: {e}")
            return None
        except json.JSONDecodeError as e:
            logger.error(f"Error parsing models list: {e}")
            return None
