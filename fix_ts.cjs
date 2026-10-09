const fs = require('fs');

// Fix LanguageContext duplicates
let lc = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

// Find and remove the duplicate section or just deduplicate it
const lines = lc.split('\n');
const seen = new Set();
const cleanLines = [];
let insideDict = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^\s*'([^']+)':/);
    if (match) {
        if (seen.has(match[1])) {
            continue; // Skip duplicate
        }
        seen.add(match[1]);
    }
    cleanLines.push(line);
}
fs.writeFileSync('src/context/LanguageContext.tsx', cleanLines.join('\n'));

// Fix Cricket.tsx match.winner
let cricket = fs.readFileSync('src/pages/Cricket.tsx', 'utf8');
cricket = cricket.replace(/\{t\(match\.winner\)\}/g, "{t(match.winner || '')}");
fs.writeFileSync('src/pages/Cricket.tsx', cricket);

// Fix Home.tsx 
let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
if(!home.includes('const { t } = useLanguage();')) {
    // wait, HomePage has it, but the sub components don't!
}
// QuickAccessCard Needs useLanguage handling or pass t from Home
home = home.replace(/\{t\(item\.title\)\}/g, "{t(item.title || '')}");
home = home.replace(/\{t\(item\.description\)\}/g, "{t(item.description || '')}");
home = home.replace(/\{t\(item\.category\)\}/g, "{t(item.category || '')}");

home = home.replace(/\{t\(announcement\.title\)\}/g, "{t(announcement.title || '')}");
home = home.replace(/\{t\(event\.title\)\}/g, "{t(event.title || '')}");
fs.writeFileSync('src/pages/Home.tsx', home);

