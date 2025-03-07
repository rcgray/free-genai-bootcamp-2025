#!/bin/bash

# Start Vite dev server in the background
cd phaser_game && npm run dev &
VITE_PID=$!

# Wait for Vite server to start
sleep 3

# Go back to project root
cd ..

# Create a development version of main.py that uses the Vite dev server
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
conda activate vn && uv run streamlit run app/dev_main.py

# Clean up when Streamlit is closed
kill $VITE_PID
rm app/dev_main.py 