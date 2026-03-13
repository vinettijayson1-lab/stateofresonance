import json
import glob
import os

files = glob.glob('c:/Users/jayvi/OneDrive/Documents/antigravity worspace/templates/article.*.json')

for f in files:    
    with open(f, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
    if 'article-content' in data.get('sections', {}) and data['sections']['article-content'].get('type') == 'rich-text':
        # Extract html from block order
        html_blocks = []
        blocks = data['sections']['article-content'].get('blocks', {})
        order = data['sections']['article-content'].get('block_order', [])
        
        for key in order:
            block = blocks[key]
            if block['type'] == 'heading':
                tag = block['settings'].get('heading_size', 'h2')
                text = block['settings'].get('heading', '')
                html_blocks.append(f"<{tag}>{text}</{tag}>")
            elif block['type'] == 'text':
                html_blocks.append(block['settings'].get('text', ''))
            elif block['type'] == 'button':
                label = block['settings'].get('button_label', '')
                link = block['settings'].get('button_link', '')
                html_blocks.append(f'<br><a href="{link}" class="button button--primary">{label}</a><br><br>')
                
        full_html = "".join(html_blocks)
        
        # Replace section
        data['sections']['main']['type'] = 'main-blog-post'
        data['sections']['article-content'] = {
            "type": "custom-liquid",
            "settings": {
                "color_scheme": "scheme-1",
                "custom_liquid": full_html
            }
        }
        
        with open(f, 'w', encoding='utf-8') as out:
            json.dump(data, out, indent=2)
        print(f"Fixed {os.path.basename(f)}")
