#!/bin/bash
set -e

# Create a new database if it doesn't exist
if [ ! -f /app/data/lang_portal.db ]; then
    echo "Database not found, initializing..."
    python /app/scripts/db/init_db.py --force
    
    # Seed the database with initial data
    echo "Seeding database with initial data..."
    python /app/scripts/db/seed_db.py
else
    echo "Database already exists, running migrations..."
    python -m alembic upgrade head
fi

# Execute the CMD
exec "$@" 