import requests

urls = [
    "https://www.azuregreen.net/images/A4502At.jpg",
    "https://www.azuregreenw.com/images/A4502At.jpg",
    "http://www.azuregreen.net/images/A4502At.jpg",
    "http://www.azuregreenw.com/images/A4502At.jpg",
    "https://www.azuregreen.net/product_images/A4502At.jpg",
    "https://www.azuregreen.net/site/images/A4502At.jpg"
]

for url in urls:
    try:
        resp = requests.head(url, timeout=5)
        print(f"{url}: {resp.status_code}")
    except Exception as e:
        print(f"{url}: Error {e}")
