const fs = require('fs');
let content = fs.readFileSync('src/pages/SriRamYouth.tsx', 'utf8');

content = content.replace(/\{photo\.title\}/g, "{t(photo.title)}");
content = content.replace(/\{photo\.description\}/g, "{t(photo.description)}");
content = content.replace(/\{photo\.category\}/g, "{t(photo.category)}");

content = content.replace(/\{video\.title\}/g, "{t(video.title)}");
content = content.replace(/\{video\.description\}/g, "{t(video.description)}");

content = content.replace(/\{event\.title\}/g, "{t(event.title)}");
content = content.replace(/\{event\.description\}/g, "{t(event.description)}");
content = content.replace(/\{event\.category\}/g, "{t(event.category)}");

content = content.replace(/\{highlight\.title\}/g, "{t(highlight.title)}");
content = content.replace(/\{highlight\.description\}/g, "{t(highlight.description)}");

content = content.replace(/\{filteredPhotos\[currentPhotoIndex\]\.title\}/g, "{t(filteredPhotos[currentPhotoIndex].title)}");
content = content.replace(/\{filteredPhotos\[currentPhotoIndex\]\.description\}/g, "{t(filteredPhotos[currentPhotoIndex].description)}");
content = content.replace(/\{filteredPhotos\[currentPhotoIndex\]\.category\}/g, "{t(filteredPhotos[currentPhotoIndex].category)}");

content = content.replace(/\{selectedVideo\.title\}/g, "{t(selectedVideo.title)}");
content = content.replace(/\{selectedVideo\.description\}/g, "{t(selectedVideo.description)}");

fs.writeFileSync('src/pages/SriRamYouth.tsx', content);
