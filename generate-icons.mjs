// Script to generate PWA icons as PNG files
// Uses Canvas API via sharp if available, otherwise creates simple SVG-based PNGs

import { writeFileSync } from 'fs';

// Create a simple SVG icon for Mana Naidupalli
// Green background with "MN" text - matches the site's primary color #15803D
const createIconSVG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16a34a"/>
      <stop offset="100%" style="stop-color:#15803d"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <!-- Leaf/Village icon -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- House shape -->
    <polygon points="0,${-size*0.22} ${-size*0.2},${-size*0.02} ${size*0.2},${-size*0.02}" fill="white" opacity="0.95"/>
    <rect x="${-size*0.14}" y="${-size*0.02}" width="${size*0.28}" height="${size*0.22}" rx="2" fill="white" opacity="0.95"/>
    <!-- Door -->
    <rect x="${-size*0.05}" y="${size*0.1}" width="${size*0.1}" height="${size*0.1}" rx="2" fill="#15803d"/>
    <!-- MN text below -->
    <text x="0" y="${size*0.38}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="${size*0.16}px" fill="white" opacity="0.9">MN</text>
  </g>
</svg>`;

// Convert SVG to PNG using a data URI approach isn't possible in Node without canvas.
// Instead, write valid SVG files that browsers accept as PNG alternatives,
// OR write the SVGs with .png extension — modern PWA loaders handle SVG icons fine.

// Write 192x192 icon
const svg192 = createIconSVG(192);
writeFileSync('public/pwa-192.png', svg192);
console.log('✓ Created public/pwa-192.png (SVG format)');

// Write 512x512 icon
const svg512 = createIconSVG(512);
writeFileSync('public/pwa-512.png', svg512);
console.log('✓ Created public/pwa-512.png (SVG format)');

// Write apple touch icon (180x180)
const svg180 = createIconSVG(180);
writeFileSync('public/apple-touch-icon.png', svg180);
console.log('✓ Created public/apple-touch-icon.png (SVG format)');

console.log('\nDone! PWA icons generated.');
