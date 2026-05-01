const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '../src/views');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace duplicate style="..." attributes
    // Sometimes there might be a space or other attributes between them, but usually they are adjacent
    // because my script added it right after class="...".
    // Example: class="..." style="background: var(--color-onyx); border: 1px solid rgba(212, 175, 55, 0.2);" style="padding: 4rem; max-width: 800px; border-radius: 12px; margin: 0 auto; z-index: 10;"
    
    // We can use a regex to find two style attributes on the same tag
    // This regex looks for style="..." followed by some spaces (or other non-closing tag chars) and another style="..."
    let changed = true;
    while (changed) {
        let newContent = content.replace(/style="([^"]*)"([^>]*?)style="([^"]*)"/g, (match, s1, middle, s2) => {
            // Check if middle contains a tag close `>`
            if (middle.includes('>')) return match; // They belong to different tags
            
            // Clean up semicolons
            let cleanedS1 = s1.trim().replace(/;$/, '');
            let cleanedS2 = s2.trim().replace(/;$/, '');
            
            return `style="${cleanedS1}; ${cleanedS2};"${middle}`;
        });
        
        if (newContent === content) {
            changed = false;
        } else {
            content = newContent;
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed styles in: ${path.basename(filePath)}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.vue')) {
            processFile(fullPath);
        }
    }
}

walk(viewsDir);
console.log('Fix complete.');
