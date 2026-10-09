const fs = require('fs');

const teluguDict = {
  // Announcements
  'Village General Body Meeting': 'గ్రామ సర్వసభ్య సమావేశం',
  'Monthly general body meeting will be held at the community hall to discuss village development projects.': 'గ్రామ అభివృద్ధి ప్రాజెక్టుల చర్చకు కమ్యూనిటీ హాల్ లో నెలవారీ సర్వసభ్య సమావేశం నిర్వహించబడుతుంది.',
  'General': 'సాధారణ',
  'Sankranti Festival Celebrations': 'సంక్రాంతి పండుగ సంబరాలు',
  'Traditional Sankranti celebrations organized at the village center. All residents are invited.': 'గ్రామ మధ్యలో సంప్రదాయ సంక్రాంతి సంబరాలు. ప్రజలందరికీ ఆహ్వానం.',
  'Festival': 'పండుగ',
  'New Government Scheme for Farmers': 'రైతులకు కొత్త ప్రభుత్వ పథకం',
  'Central government announces new subsidy scheme for small and marginal farmers. Visit government services page for details.': 'చిన్న మరియు సన్నకారు రైతులకు కేంద్ర ప్రభుత్వం కొత్త సబ్సిడీ పథకాన్ని ప్రకటించింది. వివరాల కోసం చూడుము.',
  'Cricket Tournament Registration Open': 'క్రికెట్ పోటీల నమోదు ప్రారంభం',
  'Registration open for the annual Naidupalli Cricket Tournament. Teams can register at the community center.': 'వార్షిక నాయడుపల్లి క్రికెట్ పోటీల నమోదు ప్రారంభం. జట్లు నమోదు చేసుకోవచ్చు.',
  
  // Events
  'Independence Day Celebration': 'స్వాతంత్ర్య దినోత్సవ వేడుకలు',
  'Flag hoisting ceremony followed by cultural programs and sports competitions.': 'జాతీయ జెండా ఆవిష్కరణ అనంతరం సాంస్కృతిక కార్యక్రమాలు, క్రీడా పోటీలు.',
  'Temple Annual Festival': 'గుడి వార్షికోత్సవం',
  'Sri Venkateswara Swamy Temple annual Brahmotsavam with special poojas and cultural events.': 'శ్రీ వేంకటేశ్వర స్వామి గుడి వార్షిక బ్రహ్మోత్సవాలు, ప్రత్యేక పూజలతో.',
  'Temple': 'గుడి',
  'Naidupalli Cricket Tournament Finals': 'నాయడుపల్లి క్రికెట్ టోర్నమెంట్ ఫైనల్స్',
  'Final match of the village cricket tournament between Warriors and Strikers.': 'వారియర్స్ మరియు స్ట్రైకర్స్ మధ్య గ్రామ క్రికెట్ టోర్నమెంట్ ఫైనల్ మ్యాచ్.',
  'Farmers Training Workshop': 'రైతుల శిక్షణా వర్క్‌షాప్',
  'Workshop on modern farming techniques and government schemes for agriculture.': 'ఆధునిక వ్యవసాయ పద్దతులు మరియు ప్రభుత్వ పథకాలపై వర్క్‌షాప్.',
  
  // Quick Access & Categories
  'Village': 'గ్రామం',
  'Temples': 'గుడులు',
  'Cricket': 'క్రికెట్',
  'Festivals': 'పండుగలు',
  'Education': 'విద్య',
  'Culture': 'సంస్కృతి',
  'Nature': 'ప్రకృతి',
  'Competition': 'పోటీ',
  'Service': 'సేవ',
  'Organization': 'సంస్థ',
};

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

const replacementBlock = `
  // Extra Dynamic Content
${Object.entries(teluguDict).map(([en, te]) => `  '${en.replace(/'/g, "\'")}': { en: '${en.replace(/'/g, "\'")}', te: '${te.replace(/'/g, "\'")}' },`).join('\n')}

  // Footer`;

content = content.replace('  // Footer', replacementBlock);
fs.writeFileSync('src/context/LanguageContext.tsx', content);
console.log('LanguageContext.tsx updated');
