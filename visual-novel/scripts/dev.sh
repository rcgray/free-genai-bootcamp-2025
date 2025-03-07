#!/bin/bash

# Ensure we're in the project root
cd "$(dirname "$0")/.." || exit

# Activate conda environment properly
eval "$(conda shell.bash hook)"
conda activate vn

# Start Vite dev server in the background
(cd phaser_game && npm run dev) &
VITE_PID=$!

# Wait for Vite server to start
sleep 3

# Create a development version of main.py that uses the Vite dev server
mkdir -p app
cat > app/dev_main.py << EOF
import streamlit as st

st.set_page_config(
    page_title="Japanese Visual Novel (Dev)",
    page_icon="🎮",
    layout="wide",
)

st.title("Japanese Visual Novel (Development Mode)")

# Embed the Vite dev server in an iframe
st.components.v1.iframe(
    src="http://localhost:5173",
    height=820,
    width=1220,
    scrolling=False
)

st.caption("Development mode: Changes to Phaser code will automatically reload.")
EOF

# Run Streamlit with the development main.py
uv run streamlit run app/dev_main.py

# Clean up when Streamlit is closed
kill $VITE_PID 2>/dev/null || true
rm app/dev_main.py 2>/dev/null || true 