"""
OPEA Configuration for LLM Chat Application.

This module contains the configuration settings for the OPEA toolchain,
including model paths, inference settings, and API endpoints.
"""

from pathlib import Path
from typing import Dict, Any, Optional


class OPEAConfig:
    """Configuration for OPEA integration."""

    def __init__(self) -> None:
        """Initialize OPEA configuration with default values."""
        # Base paths
        self.models_dir = Path("models")
        
        # Default model settings
        self.default_model = "Meta-Llama-3.2-3B-Instruct"  # Default model to use
        self.available_models = [
            "Meta-Llama-3.1-8B-Instruct",
            "Meta-Llama-3.2-1B-Instruct",
            "Meta-Llama-3.2-3B-Instruct",
            "Microsoft-Phi-4-Mini-Instruct",
        ]
        
        # OPEA API settings
        self.api_host = "localhost"
        self.api_port = 8000
        self.api_endpoint = "/v1/chat/completions"
        
        # Inference settings
        self.max_new_tokens = 1024
        self.temperature = 0.7
        self.top_p = 0.9
        self.top_k = 40
        self.repetition_penalty = 1.1
    
    def get_api_url(self) -> str:
        """Get the full API URL for the OPEA service."""
        return f"http://{self.api_host}:{self.api_port}{self.api_endpoint}"
    
    def get_model_path(self, model_name: Optional[str] = None) -> Path:
        """Get the path to a specific model file."""
        model = model_name or self.default_model
        if model not in self.available_models:
            raise ValueError(f"Unknown model: {model}")
        
        # Map model name to filename with extension
        model_filename_map = {
            "Meta-Llama-3.1-8B-Instruct": "Meta-Llama-3.1-8B-Instruct-Q6_K_L.gguf",
            "Meta-Llama-3.2-1B-Instruct": "Meta-Llama-3.2-1B-Instruct-Q6_K_L.gguf",
            "Meta-Llama-3.2-3B-Instruct": "Meta-Llama-3.2-3B-Instruct-Q6_K_L.gguf",
            "Microsoft-Phi-4-Mini-Instruct": "Microsoft-Phi-4-Mini-Instruct-Q6_K_L.gguf",
        }
        
        return self.models_dir / model_filename_map[model]
    
    def get_inference_params(self) -> Dict[str, Any]:
        """Get all inference parameters as a dictionary."""
        return {
            "max_new_tokens": self.max_new_tokens,
            "temperature": self.temperature,
            "top_p": self.top_p,
            "top_k": self.top_k,
            "repetition_penalty": self.repetition_penalty,
        }


# Default configuration instance
default_config = OPEAConfig()
