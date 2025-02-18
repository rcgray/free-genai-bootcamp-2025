"""update sessions and activities

Revision ID: 20250217_0400
Revises: be4ef40d2c7f
Create Date: 2025-02-17 04:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '20250217_0400'
down_revision: Union[str, None] = 'be4ef40d2c7f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # SQLite doesn't support ALTER COLUMN, so we need to recreate tables
    
    # 1. Update sessions table
    op.execute("""
        CREATE TABLE sessions_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER,
            activity_id INTEGER NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE RESTRICT,
            FOREIGN KEY (activity_id) REFERENCES activities (id) ON DELETE RESTRICT
        )
    """)
    
    op.execute("""
        INSERT INTO sessions_new (id, group_id, activity_id, created_at)
        SELECT id, group_id, activity_id, created_at FROM sessions
    """)
    
    op.execute("DROP TABLE sessions")
    op.execute("ALTER TABLE sessions_new RENAME TO sessions")
    
    # Recreate session indexes
    op.create_index('idx_sessions_group_id', 'sessions', ['group_id'])
    op.create_index('idx_sessions_activity_id', 'sessions', ['activity_id'])
    op.create_index('idx_sessions_created_at', 'sessions', ['created_at'])

    # 2. Update activities table
    op.execute("""
        CREATE TABLE activities_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            description TEXT NOT NULL
        )
    """)
    
    op.execute("""
        INSERT INTO activities_new (id, name, url, description)
        SELECT id, name, url, description FROM activities
    """)
    
    op.execute("DROP TABLE activities")
    op.execute("ALTER TABLE activities_new RENAME TO activities")


def downgrade() -> None:
    # 1. Restore activities table with image_url
    op.execute("""
        CREATE TABLE activities_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            image_url TEXT NOT NULL,
            description TEXT NOT NULL
        )
    """)
    
    # This will fail if we try to restore without image_url data
    op.execute("""
        INSERT INTO activities_new (id, name, url, image_url, description)
        SELECT 
            id, 
            name, 
            url, 
            url || '.jpg',  -- Default fallback for image_url
            description 
        FROM activities
    """)
    
    op.execute("DROP TABLE activities")
    op.execute("ALTER TABLE activities_new RENAME TO activities")

    # 2. Restore sessions table with NOT NULL group_id
    op.execute("""
        CREATE TABLE sessions_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL,
            activity_id INTEGER NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE RESTRICT,
            FOREIGN KEY (activity_id) REFERENCES activities (id) ON DELETE RESTRICT
        )
    """)
    
    # This will fail if any NULL group_ids exist
    op.execute("""
        INSERT INTO sessions_new (id, group_id, activity_id, created_at)
        SELECT id, group_id, activity_id, created_at FROM sessions
        WHERE group_id IS NOT NULL
    """)
    
    op.execute("DROP TABLE sessions")
    op.execute("ALTER TABLE sessions_new RENAME TO sessions")
    
    # Recreate session indexes
    op.create_index('idx_sessions_group_id', 'sessions', ['group_id'])
    op.create_index('idx_sessions_activity_id', 'sessions', ['activity_id'])
    op.create_index('idx_sessions_created_at', 'sessions', ['created_at']) 