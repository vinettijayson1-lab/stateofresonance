import sqlite3
import os

db_path = os.getenv("DATABASE_PATH", r"c:\Users\jayvi\OneDrive\Documents\antigravity worspace\state-of-resonance\prisma\dev.sqlite") # REDACTED: Move this to .env
# shop_url = "state-of-resonance.myshopify.com"
# access_token = "REDACTED"

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT shop, accessToken FROM Session")
        rows = cursor.fetchall()
        for row in rows:
            print(f"Shop: {row[0]}, Token: {row[1]}")
    except Exception as e:
        print(f"Error querying db: {e}")
    finally:
        conn.close()
else:
    print(f"Database not found at {db_path}")
