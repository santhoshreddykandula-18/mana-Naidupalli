const fs = require('fs');

const teluguDict = {
  // Navigation / Quick Access
  'Home': 'హోమ్',
  'Announcements': 'ప్రకటనలు',
  'Events': 'కార్యక్రమాలు',
  'Temples': 'గుడులు',
  'Cricket': 'క్రికెట్',
  'Agriculture': 'వ్యవసాయం',
  'Education': 'విద్య',
  'Government': 'ప్రభుత్వం',
  'Emergency': 'అత్యవసరం',
  'Gallery': 'గ్యాలరీ',
  
  // Quick Access Descriptions
  'Latest village updates and notices': 'తాజా గ్రామ అప్‌డేట్స్ మరియు నోటీసులు',
  'Upcoming festivals and gatherings': 'రాబోయే పండుగలు మరియు సమావేశాలు',
  'Temple timings and festivals': 'గుడి సమయాలు మరియు పండుగలు',
  'Matches, teams and scores': 'మ్యాచ్‌లు, జట్లు మరియు స్కోర్లు',
  'Farming tips and crop guidance': 'వ్యవసాయ సూచనలు మరియు పంట మార్గదర్శకత్వం',
  'Youth community activities and media': 'యువత సముదాయ కార్యకలాపాలు మరియు మీడియా',
  'Official government services and links': 'అధికారిక ప్రభుత్వ సేవలు మరియు లింకులు',
  'Village photos and memories': 'గ్రామ ఫోటోలు మరియు స్మృతులు',
  
  // Emergency Contacts
  'Ambulance': 'అంబులెన్స్',
  'Emergency Medical Assistance': 'అత్యవసర వైద్య సహాయం',
  'Police': 'పోలీస్',
  'Police Emergency': 'పోలీస్ అత్యవసరం',
  'Fire': 'అగ్నిమాపక దళం',
  'Fire Emergency': 'అగ్నిమాపక అత్యవసరం',
  'Government Hospital': 'ప్రభుత్వ ఆసుపత్రి',
  'Nearest Government Hospital': 'సమీప ప్రభుత్వ ఆసుపత్రి',
  'Women Helpline': 'మహిళా హెల్ప్‌లైన్',
  'Women Safety Helpline': 'మహిళా భద్రత హెల్ప్‌లైన్',
  'Child Helpline': 'చిల్డ్ హెల్ప్‌లైన్',
  'Child Protection Helpline': 'బాలల రక్షణ హెల్ప్‌లైన్',

  // Sri Ram Youth Content
  'Community Spirit': 'సముదాయ స్ఫూర్తి',
  'Bringing youth together through devotion, culture and service since 2010.': '2010 నుండి భక్తి, సంస్కృతి మరియు సేవ ద్వారా యువతను ఒకచోటికి చేర్చడం.',
  '150+ Active Volunteers': '150+ క్రియాశీల స్వేచ్ఛాకారులు',
  'Dedicated youth members serving the community across various initiatives.': 'వవిధ కార్యక్రమాల్లో సముదాయానికి సేవచేస్తున్న నిబద్ధత గల యువత సభ్యులు.',
  'District Best Youth Org': 'జిల్లా ఉత్తమ యువత సంస్థ',
  'Awarded "Best Youth Organization" by SPSR Nellore District for 3 consecutive years.': 'SPSR నెల్లూరు జిల్లా చే 3 వరుస సంవత్సరాలు "ఉత్తమ యువత సంస్థ" అవార్డు.',
  '5000+ Hours Service': '5000+ గంటల సేవ',
  'Cumulative community service hours contributed by our volunteers annually.': 'ప్రతియేటా మా యువత అందించిన సామాజిక సేవా గంటలు.',
  'Cultural Preservation': 'సాంస్కృతిక సంరక్షణ',
  'Preserving traditional art forms - Kolatam, Burrakatha, and Harikatha.': 'ప్రాచీన కళా రూపాలను - కోలాటం, బుర్రకథ మరియు హరికథ నిలబెట్టడం.',
  'Youth Fellowship': 'యువత ఫెలోషిప్',
  'Weekly gatherings for spiritual growth, skill development, and fellowship.': 'ఆధ్యాత్మిక వృద్ధి, నైపుణ్య అభివృద్ధి కోసం వారాంతపు సమావేశాలు.',
  
  'Sri Rama Navami Celebration 2026': 'శ్రీ రామ నవమి వేడుక 2026',
  'Grand procession with decorated chariot and cultural performances': 'అలంకరించిన రథం ఆకట్టుకునే యాత్ర మరియు సాంస్కృతిక ప్రదర్శనలు',
  'Community Service - Village Cleanup': 'సముదాయ సేవ - గ్రామ శుభ్రత',
  'Youth volunteers cleaning village roads and temple premises': 'గ్రామ రోడ్లు, గుడి పరిసరాలను శుభ్రం చేస్తున్న యువ స్వేచ్ఛాకారులు',
  'Youth Cultural Festival': 'యువత సాంస్కృతిక ఉత్సవం',
  'Traditional dance and music performances by youth members': 'యువత సభ్యుల ద్వారా సామాస్రదాయక నృత్య, సంగీత ప్రదర్శనలు',
  'Educational Awareness Camp': 'విద్యా చైతన్య శిబిరం',
  'Career guidance session for village students': 'గ్రామ విద్యార్థులకు కరీర్ మార్గదర్శక సెషన్',
  'Temple Renovation Volunteering': 'గుడి పునరుద్ధరణ స్వేచ్ఛా సేవ',
  'Youth helping in Sri Rama Temple renovation work': 'శ్రీ రామ గుడి పునరుద్ధరణలో యువత సహాయం',
  'Blood Donation Camp': 'రక్తదాన శిబిరం',
  'Annual blood donation drive organized with Red Cross': 'రెడ్ క్రాస్ సహకారంతో వార్షిక రక్తదాన శిబిరం',
  'Sports Tournament Finals': 'క్రీడల పోటీల ఫైనల్స్',
  'Kabaddi and volleyball tournament among youth teams': 'యువత జట్ల మధ్య కబడ్డీ వాలీబాల్ పోటీలు',
  'Diwali Celebration': 'దీపావళి వేడుక',
  'Traditional Diwali celebration with lamps and fireworks': 'దీపాలు, టపాసులతో సంప్రదాయ దీపావళి వేడుక',
  'Sri Rama Navami Kalyanam 2026': 'శ్రీ రామ నవమి కల్యాణం 2026',
  'Complete wedding ceremony of Lord Rama and Sita Devi': 'సీతారాముల సంపూర్ణ కల్యాణ మహోత్సవం',
  'Community Service Drive 2026': 'సముదాయ సేవా కార్యక్రమం 2026',
  'Village cleanup and tree plantation drive': 'గ్రామ శుభ్రత మరియు మొక్కలు నాటే కార్యక్రమం',
  'Youth Cultural Festival 2025': 'యువత సాంస్కృతిక ఉత్సవం 2025',
  'Traditional dance, music and drama performances': 'సాంప్రదాయక నృత్య, సంగీత మరియు నాటక ప్రదర్శనలు',
  'Sri Rama Navami Celebrations': 'శ్రీ రామ నవమి వేడుకలు',
  'Grand annual celebrations at Sri Rama Temple with special poojas, cultural programs, and annadanam.': 'శ్రీ రామ గుడిలో ప్రత్యేక పూజలు, సాంస్కృతిక కార్యక్రమాలు, మరియు అన్నదానంతో వార్షిక వేడుకలు.',
  'Youth Leadership Camp': 'యువత నాయకత్వ శిబిరం',
  'Three-day leadership development camp for village youth focusing on communication, teamwork, and community service.': 'కమ్యూనికేషన్, టీమ్‌వర్క్ మరియు సముదాయ సేవల మీద దృష్టిపెట్టి యువత కోసం 3 రోజుల శిబిరం.',
  'Annual blood donation drive in collaboration with Red Cross Society.': 'రెడ్ క్రాస్ సొసైటీ భాగస్వామ్యంతో వార్షిక రక్తదాన శిబిరం.',
  'Environment Day Tree Plantation': 'పర్యావరణ దినోత్సవం మొక్కలు నాటే కార్యక్రమం',
  'Planting 500+ saplings across village roads and school premises.': 'గ్రామ రోడ్లు మరియు పాఠశాల ఆవరణలలో 500+ మొక్కలు నాటడం.',
  'Annual Sports Tournament': 'వార్షిక క్రీడల పోటీలు',
  'Kabaddi, Volleyball, and Cricket tournament for youth.': 'యువత కోసం కబడ్డీ, వాలీబాల్ మరియు క్రికెట్ పోటీలు.',
  'Diwali Cultural Evening': 'దీపావళి సాంస్కృతిక సాయంత్రం',
  'Traditional dance, music, and drama performances by youth members.': 'యువత సభ్యుల ద్వారా సాంప్రదాయ నృత్య, సంగీత మరియు నాటక ప్రదర్శనలు.',
};

let content = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

// Inject the dynamic translations
const replacementBlock = `
  // Dynamic Content Translations
${Object.entries(teluguDict).map(([en, te]) => `  '${en.replace(/'/g, "\'")}': { en: '${en.replace(/'/g, "\'")}', te: '${te.replace(/'/g, "\'")}' },`).join('\n')}

  // Footer`;

content = content.replace('  // Footer', replacementBlock);
fs.writeFileSync('src/context/LanguageContext.tsx', content);
console.log('LanguageContext.tsx updated');
