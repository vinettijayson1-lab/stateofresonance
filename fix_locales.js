const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && !f.includes('schema') && f !== 'en.default.json');

files.forEach(file => {
    const filePath = path.join(localesDir, file);
    try {
        let raw = fs.readFileSync(filePath, 'utf8');

        // Inject general.pagination.page
        if (!raw.includes('"general":')) {
            raw = raw.replace(/\{\r?\n/, '{\n  "general": {\n    "pagination": {\n      "page": "Page {{ page }}"\n    }\n  },\n');
        }

        // Inject blogs.article.all_topics
        if (raw.includes('"article": {') && !raw.includes('"all_topics":')) {
            raw = raw.replace(/"article": \{\r?\n/, '"article": {\n        "all_topics": "All Topics",\n');
        }

        fs.writeFileSync(filePath, raw, 'utf8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.error(`Failed ${file}`, e);
    }
});
