import sqlite3
import json

db_path = r"c:\Users\jayvi\OneDrive\Documents\antigravity worspace\state-of-resonance\prisma\dev.sqlite"

def query():
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Session;")
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return rows
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    result = query()
    print(json.dumps(result, indent=2))
