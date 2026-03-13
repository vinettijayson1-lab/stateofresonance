import os
import requests
import json
import time

# Shopify API credentials
# Replace these with your actual store domain and Admin API Access Token
SHOPIFY_STORE_URL = "state-of-resonance-dev-store.myshopify.com"
SHOPIFY_ACCESS_TOKEN = "REDACTED_SECRET"

API_VERSION = "2024-01"
BASE_URL = f"https://{SHOPIFY_STORE_URL}/admin/api/{API_VERSION}"

HEADERS = {
    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json"
}

def get_blog_id():
    """Fetches the ID of the main 'News' or 'Blog' to publish to."""
    print("Fetching available blogs...")
    try:
        response = requests.get(f"{BASE_URL}/blogs.json", headers=HEADERS)
        response.raise_for_status()
        blogs = response.json().get('blogs', [])
        if not blogs:
            print("No blogs found! Please create a blog in the Shopify Admin first.")
            return None
        
        # Prefer 'News' if it exists, otherwise take the first one
        for blog in blogs:
            if blog['title'] == 'News':
                print(f"Found blog 'News' with ID: {blog['id']}")
                return blog['id']
        
        print(f"Using blog '{blogs[0]['title']}' with ID: {blogs[0]['id']}")
        return blogs[0]['id']
    except Exception as e:
        print(f"Error fetching blogs: {e}")
        if hasattr(e, 'response') and e.response is not None:
             print(f"Response: {e.response.text}")
        return None

def create_article(blog_id, title, template_suffix):
    """Creates a new article in the specified blog."""
    # We only need to provide the title and the template suffix.
    # The actual content is stored in the JSON template in the theme.
    article_data = {
        "article": {
            "title": title,
            "author": "State of Resonance",
            "published": True,
            "template_suffix": template_suffix
        }
    }
    
    print(f"Creating article: '{title}' using template '{template_suffix}'...")
    try:
        response = requests.post(
            f"{BASE_URL}/blogs/{blog_id}/articles.json",
            headers=HEADERS,
            json=article_data
        )
        response.raise_for_status()
        article = response.json().get('article', {})
        print(f"✅ Successfully created article: {article.get('title')} (ID: {article.get('id')})")
        return True
    except Exception as e:
        print(f"❌ Error creating article '{title}': {e}")
        if hasattr(e, 'response') and e.response is not None:
             print(f"Response details: {e.response.text}")
        return False

def main():
    if SHOPIFY_ACCESS_TOKEN == "YOUR_ADMIN_API_ACCESS_TOKEN":
        print("ERROR: You must replace 'YOUR_ADMIN_API_ACCESS_TOKEN' with your actual token in the script.")
        print("To get a token: Settings -> Custom Apps -> Create App -> Configure Admin API Scopes (Write Content) -> Install App -> Reveal Token")
        return

    blog_id = get_blog_id()
    if not blog_id:
        return

    # The 5 SEO articles we just created
    articles_to_create = [
        {"title": "Canada's #1 Spiritual & Esoteric Shop", "template": "store-announcement"},
        {"title": "The 'Overwhelmed?' Guide", "template": "overwhelmed-guide"},
        {"title": "Rare Tarot Spotlight", "template": "rare-tarot-spotlight"},
        {"title": "The Alchemist's Shelf", "template": "alchemist-shelf"}
    ]

    for article in articles_to_create:
        create_article(blog_id, article["title"], article["template"])
        # Brief pause to respect API rate limits
        time.sleep(1)
        
    print("\n🎉 All 5 SEO articles have been pushed to Shopify!")

if __name__ == "__main__":
    main()
