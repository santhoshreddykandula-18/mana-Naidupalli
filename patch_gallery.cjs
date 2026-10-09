const fs = require('fs');

let content = fs.readFileSync('src/pages/Gallery.tsx', 'utf8');

// Replace standard variables to translate in Gallery
content = content.replace(/\{item\.title\}/g, "{t(item.title)}");
content = content.replace(/\{item\.category\}/g, "{t(item.category)}");
content = content.replace(/\{filteredItems\[currentIndex\]\.title\}/g, "{t(filteredItems[currentIndex].title)}");
content = content.replace(/\{filteredItems\[currentIndex\]\.category\}/g, "{t(filteredItems[currentIndex].category)}");

fs.writeFileSync('src/pages/Gallery.tsx', content);

let cricket = fs.readFileSync('src/pages/Cricket.tsx', 'utf8');
cricket = cricket.replace(/\{match\.winner\}/g, "{t(match.winner)}");
cricket = cricket.replace(/\{team\.name\}/g, "{t(team.name)}");
cricket = cricket.replace(/\{team\.captain\}/g, "{t(team.captain)}");
cricket = cricket.replace(/\{player\.name\}/g, "{t(player.name)}");
cricket = cricket.replace(/\{player\.role\}/g, "{t(player.role)}");
cricket = cricket.replace(/\{player\.team\}/g, "{t(player.team)}");
cricket = cricket.replace(/\{match\.ground\}/g, "{t(match.ground)}");

fs.writeFileSync('src/pages/Cricket.tsx', cricket);

let temples = fs.readFileSync('src/pages/Temples.tsx', 'utf8');
temples = temples.replace(/\{temple\.name\}/g, "{t(temple.name)}");
temples = temples.replace(/\{temple\.deity\}/g, "{t(temple.deity)}");
temples = temples.replace(/\{temple\.description\}/g, "{t(temple.description)}");
fs.writeFileSync('src/pages/Temples.tsx', temples);

