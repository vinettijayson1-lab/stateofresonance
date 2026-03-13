import requests

API_TOKEN = 'atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBii438jNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJGE1OTVlY2FiLTBjMTQtNDRmNy05MGFiLTFhYmU2MTQxM2FiZEokYzlmMTMzZjQtNzYxZC00MjhlLWIzNDgtMDEyN2IzNjIxMTJlEm8KQJJg5R9i51C1wZQaoImzPpS6JtM1xTMQJGjJA_rV_rdEIHH7ycKeeHfRtHx2tUo22yY4IZjmVXsBhVaQMCfFswUSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg'
SHOP_URL = 'state-of-resonance.myshopify.com'

def list_themes():
    url = f"https://{SHOP_URL}/admin/api/2024-01/themes.json"
    headers = {
        "X-Shopify-Access-Token": API_TOKEN
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        themes = response.json().get('themes', [])
        for theme in themes:
            print(f"ID: {theme['id']}, Name: {theme['name']}, Role: {theme['role']}")
    else:
        print(f"Error: {response.status_code}, {response.text}")

if __name__ == "__main__":
    list_themes()
