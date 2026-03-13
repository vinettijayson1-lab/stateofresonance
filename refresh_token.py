import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
# REDACTED: Move this to .env
# client_id = "REDACTED"
# client_secret = "REDACTED"
# refresh_token = "REDACTED"

url = f"https://{shop}/admin/oauth/access_token"

payload = {
    "client_id": client_id,
    "client_secret": client_secret,
    "refresh_token": refresh_token,
    "grant_type": "refresh_token"
}

headers = {
    "Content-Type": "application/json"
}

def refresh():
    response = requests.post(url, json=payload, headers=headers)
    return response.status_code, response.text

if __name__ == "__main__":
    status, text = refresh()
    print(f"Status: {status}")
    print(f"Response: {text}")
