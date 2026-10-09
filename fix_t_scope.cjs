const fs = require('fs');

function injectT(filepath, componentNames) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (const cmp of componentNames) {
        // Find: function CmpName({ props }: { ... }) {
        const regex = new RegExp(`function\s+${cmp}\s*\([^)]*\)\s*\{`);
        content = content.replace(regex, (match) => {
            if (!content.includes('useLanguage') && !content.includes('import { useLanguage }')) {
                // Should already be imported if it had compiling errors, but just in case
            }
            return match + '\n  const { t } = useLanguage();';
        });
    }
    fs.writeFileSync(filepath, content);
}

injectT('src/pages/Home.tsx', ['AnnouncementCard', 'EventCard']);
injectT('src/pages/Temples.tsx', ['TempleCard']);
injectT('src/pages/Events.tsx', ['EventCard']);
injectT('src/pages/Announcements.tsx', ['AnnouncementCard']);
injectT('src/components/layout/Navbar.tsx', []);

