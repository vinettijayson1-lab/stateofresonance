"""
Debug description mutation - print full error response
"""
import requests
import json

shop = "state-of-resonance-dev-store.myshopify.com"
token = "atkn_2.CvYBCiQ3N2Y4NGJkYS1lNjM0LTQ1NzMtOGRmNy00ZDQ2MWRiNzdmZmUSJDQ2M2RlYTMxLTdlYWMtNDU2MC1iNTYzLTcwNTdkYzZmMDc0OBoEAQ0DBSDK17HNBiiPo8PNBjIkMjU1NWM1ZWEtMmZkMy00NGVmLWI1YWMtNDk4YTY2MDk0OTdkOiRmYmRiMjY0OS1lMzI3LTQ5MDctOGY2Ny05MDhkMjRjZmQ3ZTNCJDQxNzE1ZTUyLTZkOTYtNDA0ZS05MzBhLWU4MzVkOWFkNjgyOEokNDkxMjdjMWMtNmFhMC00YjExLTgwOGQtYzU3Yjg0NzRlZjdlEm8KQDkTwft8JWbkn7bYUd8GooJxK_ww_cADDMTQ95IRqXZA5uQjAhVBkidP-CpIlGtE60NCsL9XzXVRWd5XtV-OCAMSK1dYUjU2N1ZQS1pnTnQ1TDZyOUxpeFphcmFaekJEOGpJNjRpVFhYVW1UVTg"

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
url = f"https://{shop}/admin/api/2024-01/graphql.json"

# Test simple mutation
mutation = """
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
      descriptionHtml
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""

resp = requests.post(url, headers=headers, json={
    "query": mutation,
    "variables": {
        "input": {
            "id": "gid://shopify/Product/8152223121482",
            "bodyHtml": "<p>Test description.</p>"
        }
    }
})

print(f"HTTP Status: {resp.status_code}")
print(f"Response:\n{json.dumps(resp.json(), indent=2)}")
