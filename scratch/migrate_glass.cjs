const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '../src/views');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace literal class attributes containing "glass" (but not glass-input)
    // Matches class="something glass something"
    content = content.replace(/class="([^"]*)\bglass\b([^"]*)"/g, (match, p1, p2) => {
        let newClass = `${p1}${p2}`.replace(/\s+/g, ' ').trim();
        return `class="${newClass}" style="background: var(--color-onyx); border: 1px solid rgba(212, 175, 55, 0.2);"`;
    });

    // Replace class='something glass something'
    content = content.replace(/class='([^']*)\bglass\b([^']*)'/g, (match, p1, p2) => {
        let newClass = `${p1}${p2}`.replace(/\s+/g, ' ').trim();
        return `class='${newClass}' style="background: var(--color-onyx); border: 1px solid rgba(212, 175, 55, 0.2);"`;
    });

    // Strip glow-edge as well since we don't want soft glows
    content = content.replace(/\bglow-edge\b/g, '');
    content = content.replace(/\bglow-hover\b/g, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Migrated: ${path.basename(filePath)}`);
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
console.log('Migration complete.');
