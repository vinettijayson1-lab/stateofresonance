import sqlite3
import os
import json

db_path = r"c:\Users\jayvi\OneDrive\Documents\antigravity worspace\state-of-resonance\prisma\dev.sqlite"

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM Session")
        columns = [description[0] for description in cursor.description]
        rows = cursor.fetchall()
        sessions = []
        for row in rows:
            sessions.append(dict(zip(columns, row)))
        print(json.dumps(sessions, indent=2))
    except Exception as e:
        print(f"Error querying db: {e}")
    finally:
        conn.close()
else:
    print(f"Database not found at {db_path}")
