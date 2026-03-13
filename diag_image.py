import requests
import json

shop = "state-of-resonance.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBii438jNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJGE1OTVlY2FiLTBjMTQtNDRmNy05MGFiLTFhYmU2MTQxM2FiZEokYzlmMTMzZjQtNzYxZC00MjhlLWIzNDgtMDEyN2IzNjIxMTJlEm8KQJJg5R9i51C1wZQaoImzPpS6JtM1xTMQJGjJA_rV_rdEIHH7ycKeeHfRtHx2tUo22yY4IZjmVXsBhVaQMCfFswUSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"
api_version = "2024-01"

HEADERS = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
GRAPHQL_URL = f"https://{shop}/admin/api/{api_version}/graphql.json"

GID = "gid://shopify/Product/8742147719191" # Cheshire Cat ashtray
IMG_URL = "https://www.azuregreen.net/images/FAT3251.jpg"

MUTATION = """
mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $productId, media: $media) {
    media { alt mediaContentType }
    mediaUserErrors { field message }
  }
}
"""

variables = {
    "productId": GID,
    "media": [{
        "originalSource": IMG_URL,
        "alt": "4\" Cheshire Cat ashtray",
        "mediaContentType": "IMAGE"
    }]
}

resp = requests.post(GRAPHQL_URL, headers=HEADERS, json={"query": MUTATION, "variables": variables})
print(f"Status: {resp.status_code}")
print(json.dumps(resp.json(), indent=2))
