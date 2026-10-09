const fs = require('fs');

function replaceInFile(filepath, replacements) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.from, r.to);
    }
    fs.writeFileSync(filepath, content);
}

replaceInFile('src/pages/Home.tsx', [
    { from: /{item\.title}/g, to: "{t(item.title)}" },
    { from: /{item\.description}/g, to: "{t(item.description)}" },
    { from: /{item\.category}/g, to: "{t(item.category)}" },
    { from: /{announcement\.title}/g, to: "{t(announcement.title)}" },
    { from: /{event\.title}/g, to: "{t(event.title)}" }
]);

replaceInFile('src/pages/Events.tsx', [
    { from: /{event\.title}/g, to: "{t(event.title)}" },
    { from: /{event\.description}/g, to: "{t(event.description)}" },
    { from: /{event\.category}/g, to: "{t(event.category)}" }
]);

replaceInFile('src/pages/Announcements.tsx', [
    { from: /{announcement\.title}/g, to: "{t(announcement.title)}" },
    { from: /{announcement\.content}/g, to: "{t(announcement.content)}" },
    { from: /{announcement\.category}/g, to: "{t(announcement.category)}" }
]);

replaceInFile('src/components/layout/Navbar.tsx', [
    { from: /{item\.label}/g, to: "{t(item.label)}" }
]);

