import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Telugu translations
const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.home': { en: 'Home', te: 'హోమ్' },
  'nav.events': { en: 'Events', te: 'విధులు' },
  'nav.temples': { en: 'Temples', te: 'దేవాలయాలు' },
  'nav.cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'nav.agriculture': { en: 'Agriculture', te: 'వ్యవసాయం' },
  'nav.sriRamYouth': { en: 'Sri Ram Youth', te: 'శ్రీ రామ యువత' },
  'nav.government': { en: 'Government', te: 'ప్రభుత్వం' },
  'nav.gallery': { en: 'Gallery', te: 'గ్యాలరీ' },

  // Common
  'common.loading': { en: 'Loading...', te: 'లోడ్ అవుతోంది...' },
  'common.error': { en: 'Error', te: 'లోపం' },
  'common.retry': { en: 'Retry', te: 'మళ్లీ ప్రయత్నించండి' },
  'common.search': { en: 'Search', te: 'శోధించండి' },
  'common.all': { en: 'All', te: 'అన్ని' },
  'common.viewAll': { en: 'View All', te: 'అన్ని చూడండి' },
  'common.readMore': { en: 'Read More', te: 'మరింత చదవండి' },
  'common.noData': { en: 'No data available', te: 'డేటా అందుబాటులో లేదు' },
  'common.clearFilters': { en: 'Clear Filters', te: 'ఫիլ్టర్స్ క్లియర్ చేయండి' },

  // Hero/Home
  'hero.title': { en: 'Welcome to Mana Naidupalli', te: 'మన నాయడుపల్లికి స్వాగతం' },
  'hero.subtitle': { en: 'Rural Life – Culture – Festivals', te: 'గ్రామీణ జీవితం – సంస్కృతి – పండుగలు' },
  'hero.explore': { en: 'Explore Village', te: 'గ్రామాన్ని అన్వేషించండి' },

  // Announcements
  'announcements.title': { en: 'Village Announcements', te: 'గ్రామ ప్రకటనలు' },
  'announcements.subtitle': { en: 'Stay updated with important information and official notices', te: 'ముఖ్యమైన సమాచారం మరియు επίష్టు నోటీసులతో అప్‌డేట్‌ల అవండి' },
  'announcements.categories.all': { en: 'All', te: 'అన్ని' },
  'announcements.categories.general': { en: 'General', te: 'సాధారణ' },
  'announcements.categories.festival': { en: 'Festival', te: 'పండుగ' },
  'announcements.categories.temple': { en: 'Temple', te: 'దేవాలయం' },
  'announcements.categories.government': { en: 'Government', te: 'ప్రభుత్వం' },
  'announcements.categories.education': { en: 'Education', te: 'విద్య' },
  'announcements.categories.cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'announcements.categories.agriculture': { en: 'Agriculture', te: 'వ్యవసాయం' },
  'announcements.categories.emergency': { en: 'Emergency', te: 'అత్యవసర స్థితి' },
  'announcements.categories.other': { en: 'Other', te: 'ఇతర' },
  'announcements.noResults': { en: 'No announcements found', te: 'క 손가락 ప్రకటనలు ఏవీ లేవు' },
  'announcements.clearFilters': { en: 'Clear Filters', te: 'ఫిల్టర్స్ క్లియర్ చేయండి' },

  // Events
  'events.title': { en: 'Village Events', te: 'గ్రామ విధులు' },
  'events.subtitle': { en: 'Discover festivals, gatherings, and community events in Naidupalli', te: 'నాయడుపల్లిలో పండుగలు, సభలు మరియు సముదాయ కార్యక్రమాలను αναుగంస encontra' },
  'events.upcoming': { en: 'Upcoming Events', te: 'ముందస్తున్న విధులు' },
  'events.past': { en: 'Past Events', te: 'గత విధులు' },
  'events.noEvents': { en: 'No events found', te: 'విధులు దొరకలేదు' },
  'events.adjustFilters': { en: 'Try adjusting your search or filter criteria.', te: 'మీ శోధన లేదా ఫిల్టర్ నియమాలను సరిదిద్దാൻ ప్రయత్నించండి.' },
  'events.tab.upcoming': { en: 'Upcoming', te: 'ముందస్తున్న' },
  'events.tab.past': { en: 'Past', te: 'గత' },
  'events.tab.all': { en: 'All', te: 'అన్ని' },
  'events.category.all': { en: 'All', te: 'అన్ని' },
  'events.category.festival': { en: 'Festival', te: 'పండుగ' },
  'events.category.temple': { en: 'Temple', te: 'దేవాలయం' },
  'events.category.cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'events.category.cultural': { en: 'Cultural', te: 'సాంస్కృతిక' },
  'events.category.education': { en: 'Education', te: 'విద్య' },
  'events.category.villageMeeting': { en: 'Village Meeting', te: 'గ్రామ సభ' },
  'events.category.other': { en: 'Other', te: 'ఇతర' },

  // Temples
  'temples.title': { en: 'Temples', te: 'దేవాలయాలు' },
  'temples.subtitle': { en: 'Explore the spiritual centers and cultural heritage of our village', te: 'మా గ్రామమందిరాల ఆధ్యాత్మిక కేంద్రాలు మరియు సాంస్కృతిక వారసత్వాన్ని అన్వేషించండి' },
  'temples.visit': { en: 'Visit Temple', te: 'దేవాలయం సందర్శించండి' },
  'temples.featured': { en: 'Featured Temple', te: 'ప్రధాన దేవాలయం' },
  'temples.otherTemples': { en: 'Other Temples', te: 'ఇతర దేవాలయాలు' },

  // Common (additional)
  'common.by': { en: 'By', te: 'ద్వారా' },
  'common.location': { en: 'Location', te: 'విత్తमानం' },
  'common.organizer': { en: 'Organizer', te: 'అయోజకుడు' },
  'common.about': { en: 'About', te: 'గురించి' },
  'common.festivals': { en: 'Festivals & Celebrations', te: 'పండుగలు మరియు ఉత్సవాలు' },
  'common.visitInfo': { en: 'Visit Information', te: 'సందర్శన సమాచారం' },
  'common.timings': { en: 'Timings', te: 'సమయాలు' },
  'common.annualFestival': { en: 'Annual Festival', te: 'వార్షిక ఉత్సవం' },
  'common.deity': { en: 'Deity', te: 'దేవత' },
  'common.quickInfo': { en: 'Quick Info', te: 'త్వరిత సమాచారం' },
  'common.contribute': { en: 'Want to contribute?', te: 'చెల్లడానికి సంకల్పం ఉంది?' },
  'common.contactCommittee': { en: 'Contact Committee', te: 'కమిటీని సంప్రదించండి' },
  'common.relatedAnnouncements': { en: 'Related Announcements', te: 'సంబంధిత ప్రకటనలు' },

  // Education
  'education.title': { en: 'Education', te: 'విద్య' },
  'education.updates': { en: 'Education Updates', te: 'విద్యా అప్‌డేట్స్' },
  'education.schools': { en: 'Schools in Naidupalli', te: 'నాయడుపల్లి పాఠశాలలు' },
  'education.scholarships': { en: 'Scholarships', te: 'స్కాలర్షిపులు' },
  'education.exams': { en: 'Exam Schedule', te: 'పరీక్షా ਜਾ saamaya' },
  'education.achievements': { en: 'Student Achievements', te: 'విద్యార్థి సాధనలు' },
  'education.resources': { en: 'Study Resources', te: 'అధ్యయన వనepravులు' },

  // Emergency
  'emergency.title': { en: 'Emergency Help', te: 'అత్యవసర సహాయం' },
  'emergency.contacts': { en: 'Emergency Contacts', te: 'అత్యవసర సంప్రదింపులు' },
  'emergency.whenToCall': { en: 'When to Call', te: 'ఎప్పుడు কল్ చేయాలి' },
  'emergency.nonEmergency': { en: 'Non-Emergency', te: 'అత్యవసరం కాదు' },
  'emergency.call': { en: 'Call', te: 'కాల్' },

  // Gallery
  'gallery.title': { en: 'Photo Gallery', te: 'ఫోటో గ్యాలరీ' },
  'gallery.subtitle': { en: 'Memories, events and daily life in our village', te: 'మా గ్రామంలో స్మృతులు, కార్యక్రమాలు మరియు ದೈనందిన జీవితం' },
  'gallery.videos': { en: 'Videos', te: 'వీడియోలు' },
  'gallery.categories': { en: 'Categories', te: 'విభాగాలు' },
  'gallery.category.all': { en: 'All', te: 'అన్ని' },
  'gallery.category.village': { en: 'Village', te: 'గ్రామం' },
  'gallery.category.temples': { en: 'Temples', te: 'దేవాలయాలు' },
  'gallery.category.cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'gallery.category.festivals': { en: 'Festivals', te: 'పండుగలు' },
  'gallery.category.education': { en: 'Education', te: 'విద్య' },
  'gallery.category.culture': { en: 'Culture', te: 'సంస్కృతి' },
  'gallery.category.nature': { en: 'Nature', te: 'ప్రకృతి' },

  // Cricket
  'cricket.title': { en: 'Cricket', te: 'క్రికెట్' },
  'cricket.subtitle': { en: 'Naidupalli Pirates - Village Cricket', te: 'నాయడుపల్లి పైరెట్స్ - గ్రామ వ్యవసాయం కాదు ఇక్కడ క్రికెట్' },
  'cricket.tagline': { en: 'We Don\'t Chase History, We Create It.', te: 'మనం చరిత్రను అనుసరించము, సృష్టిస్తాము.' },
  'cricket.squad': { en: 'The Squad', te: 'బృందం' },
  'cricket.squadSubtitle': { en: 'Our Players - The Heart of Naidupalli Pirates', te: 'మా ఆటగాళ్లు - నాయడుపల్లి పైరెట్స్ హృదయం' },
  'cricket.achievements': { en: 'Our Achievements', te: 'మా విజయాలు' },
  'cricket.achievementsSubtitle': { en: 'Celebrating the victories that became part of our journey', te: 'మా ప్రయాణంలో భాగమైన విజయాలను జరుపుకుంటున్నాము' },
  'cricket.upcoming': { en: 'Upcoming Matches', te: 'రాబోయే పందాలు' },
  'cricket.results': { en: 'Recent Results', te: 'ఇటీవలి ఫలితాలు' },
  'cricket.resultsSubtitle': { en: 'Latest match outcomes', te: 'ఇటీవలి పందె ఫలితాలు' },
  'cricket.teams': { en: 'Village Teams', te: 'గ్రామ జట్లు' },
  'cricket.teamsSubtitle': { en: 'Local teams participating in village tournaments', te: 'గ్రామ టోర్నమెంట్లలో పాల్గొనే జట్లు' },
  'cricket.pointsTable': { en: 'Points Table', te: 'పాయింట్ల పట్టిక' },
  'cricket.pointsTableSubtitle': { en: 'Current tournament standings', te: 'ప్రస్తుత పోటీల స్థానం' },
  'cricket.gallery': { en: 'Celebrations', te: 'వేడుకలు' },
  'cricket.gallerySubtitle': { en: 'Moments, memories and victories with our cricket family', te: 'మా క్రికెట్ కుటుంబంతో క్షణాలు మరియు స్మృతులు' },
  'cricket.players': { en: 'Featured Players', te: 'కీలక ఆటగాళ్లు' },
  'cricket.playersSubtitle': { en: 'Key players from our village teams', te: 'గ్రామ జట్ల నుండి కీలక ఆటగాళ్లు' },
  'cricket.nextMatch': { en: 'Next Match', te: 'తర్వాతి పందెం' },
  'cricket.matchDetails': { en: 'Match Details', te: 'పందెం వివరాలు' },
  'cricket.winner': { en: 'Winner', te: 'విజేత' },
  'cricket.score': { en: 'Score', te: 'స్కోర్' },
  'cricket.played': { en: 'Played', te: 'ఆడినవి' },
  'cricket.won': { en: 'Won', te: 'గెలిచినవి' },
  'cricket.lost': { en: 'Lost', te: 'ఓడినవి' },
  'cricket.points': { en: 'Points', te: 'పాయింట్లు' },
  'cricket.celebrationPhotos': { en: 'Celebration Photos', te: 'వేడుకల ఫోటోలు' },
  'cricket.celebrationVideos': { en: 'Celebration Videos', te: 'వేడుకల వీడియోలు' },
  'cricket.champions': { en: 'Champions', te: 'విజేతలు' },
  'cricket.runnersUp': { en: 'Runners Up', te: 'రన్నరప్' },
  'cricket.collection': { en: 'Collection', te: 'సేకరణ' },
  'cricket.status.upcoming': { en: 'Upcoming', te: 'రాబోయే' },
  'cricket.status.completed': { en: 'Completed', te: 'పూర్తయింది' },
  'cricket.status.live': { en: 'Live', te: 'లైవ్' },
  'cricket.vs': { en: 'VS', te: 'VS' },
  'cricket.captain': { en: 'Captain', te: 'కెప్టెన్' },
  'cricket.playersCount': { en: 'Players', te: 'ఆటగాళ్లు' },

  // Agriculture
  'agriculture.title': { en: 'Agriculture', te: 'వ్యవసాయం' },
  'agriculture.subtitle': { en: 'Information and guidance for our farming community', te: 'మా రైతుల సముదాయానికి సమాచారం మరియు మార్గదర్శకత్వం' },
  'agriculture.advisory': { en: 'Crop Advisory', te: 'పంట సలహాలు' },
  'agriculture.advisorySubtitle': { en: 'Seasonal guidance for major crops in our region', te: 'మా ప్రాంతంలో ప్రధాన పంటలకు కాలానుగుణ సలహాలు' },
  'agriculture.schemes': { en: 'Government Schemes', te: 'ప్రభుత్వ పథకాలు' },
  'agriculture.schemesSubtitle': { en: 'Available support for farmers', te: 'రైతులకు లభించే మద్దతు' },
  'agriculture.tips': { en: 'Farming Tips', te: 'వ్యవసాయ సూచనలు' },
  'agriculture.tipsSubtitle': { en: 'Best practices for better yields', te: 'మెరుగైన ఫలితాల కోసం ఉత్తమ అభ్యాసాలు' },
  'agriculture.announcements': { en: 'Agriculture Announcements', te: 'వ్యవసాయ ప్రకటనలు' },
  'agriculture.announcementsSubtitle': { en: 'Latest updates for farmers', te: 'రైతులకు తాజా అప్‌డేట్స్' },
  'agriculture.diseaseDetection': { en: 'AI Disease Detection', te: 'ఏఐ వ్యాధి గుర్తింపు' },
  'agriculture.diseaseDetectionDesc': { en: 'Upload a crop or leaf image to identify possible diseases and receive guidance.', te: 'పంట లేదా ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి, సాధ్య వ్యాధులను గుర్తించి మార్గదర్శన పొందండి.' },
  'agriculture.detectDisease': { en: 'Detect Crop Disease (Coming Soon)', te: 'పంట వ్యాధిని గుర్తించండి (త్వరలో వస్తుంది)' },
  'agriculture.cropInfo': { en: 'Crop Information', te: 'పంట సమాచారం' },
  'agriculture.season': { en: 'Season', te: 'కాలం' },
  'agriculture.waterRequirement': { en: 'Water Requirement', te: 'నీరు అవసరం' },
  'agriculture.commonDiseases': { en: 'Common Diseases', te: 'సాధారణ వ్యాధులు' },
  'agriculture.tipsList': { en: 'Farming Tips', te: 'వ్యవసాయ సూచనలు' },
  'agriculture.sunlightManagement': { en: 'Sunlight Management', te: 'సూర్యకాంతి నిర్వహణ' },
  'agriculture.waterManagement': { en: 'Water Management', te: 'నీరు నిర్వహణ' },
  'agriculture.windProtection': { en: 'Wind Protection', te: 'గాలి రక్షణ' },
  'agriculture.sunlightTip': { en: 'Ensure crops receive optimal sunlight. Avoid shading from taller plants.', te: 'పంటలు అనుకూల సూర్యకాంతిని పొందుతాయని నిర్ధారించండి. ఎత్తైన పంటల నుండి నీడను నివారించండి.' },
  'agriculture.waterTip': { en: 'Use drip irrigation for water efficiency. Monitor soil moisture regularly.', te: 'నీరు సామర్థ్యానికి డ్రిప్ నీటిపారుదల వాడండి. మట్టి తేమను క్రమంగా పర్యవేక్షించండి.' },
  'agriculture.windTip': { en: 'Plant windbreaks for tall crops. Stake young plants during monsoon.', te: 'ఎత్తైన పంటల కోసం గాలి తీవ్రతను తగ్గించడానికి గాలితెవులను నాటండి. వర్షాకాలంలో యువ మొక్కలకు మద్దతు ఇవ్వండి.' },
  'agriculture.pmKisan': { en: 'PM-KISAN', te: 'పీఎం-కిసాన్' },
  'agriculture.pmKisanDesc': { en: '₹6,000/year income support for small & marginal farmers', te: 'చిన్న మరియు సీమांत రైతులకు వార్షిక ₹6,000 ఆదాయ మద్దతు' },
  'agriculture.rythuBandhu': { en: 'Rythu Bandhu', te: 'రైతు బంధు' },
  'agriculture.rythuBandhuDesc': { en: 'Investment support for agriculture & horticulture crops', te: 'వ్యవసాయం మరియు హార్టికల్చర్ పంటలకు పెట్టుబడి మద్దతు' },
  'agriculture.cropInsurance': { en: 'Crop Insurance', te: 'పంట బీమా' },
  'agriculture.cropInsuranceDesc': { en: 'Pradhan Mantri Fasal Bima Yojana for risk coverage', te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన రిస్క్ కవరేజ్ కోసం' },
  'agriculture.soilHealth': { en: 'Soil Health Card', te: 'మట్టి ఆరోగ్య కార్డు' },
  'agriculture.soilHealthDesc': { en: 'Free soil testing & nutrient recommendations', te: 'ఉచిత మట్టి పరీక్ష మరియు పోషక సలహాలు' },
  'agriculture.kisanCredit': { en: 'Kisan Credit Card', te: 'కిసాన్ క్రెడిట్ కార్డు' },
  'agriculture.kisanCreditDesc': { en: 'Short-term credit for cultivation needs', te: 'వ్యవసాయ అవసరాల కొరకు సార్వకాలిక క్రెడిట్' },
  'agriculture.subsidySchemes': { en: 'Subsidy Schemes', te: 'సబ్సిడీ냈습니다' },
  'agriculture.subsidySchemesDesc': { en: 'Seeds, fertilizers, equipment & irrigation subsidies', te: 'విథనాలు, ఎరువులు, ఉపకరణాలు మరియు నీటిపారుదల సబ్సిడీ' },

  // Agriculture AI Features - Tabs
  'agriculture.tab.advisory': { en: 'Crop Advisory', te: 'పంట సలహాలు' },
  'agriculture.tab.disease': { en: 'Disease Detection', te: 'వ్యాధి గుర్తింపు' },
  'agriculture.tab.soil': { en: 'Soil Analysis', te: 'మట్టి విశ్లేషణ' },
  'agriculture.tab.assistant': { en: 'AI Assistant', te: 'ఏఐ సహాయకుడు' },

  // Agriculture AI Features - Image Uploader
  'agriculture.upload.dragDrop': { en: 'Drag and drop your crop leaf image', te: 'మీ పంట ఆకు చిత్రానిని డ్రాగ్ మరియు డ్రాప్ చేయండి' },
  'agriculture.upload.dragDropSoil': { en: 'Drag and drop your soil surface image', te: 'మీ మట్టి سطح చిత్రానిని డ్రాగ్ మరియు డ్రాప్ చేయండి' },
  'agriculture.upload.supports': { en: 'Supports JPG, PNG, WEBP up to 10MB', te: 'JPG, PNG, WEBP వరకు 10MB అప్‌లోడ్ చేయవచ్చు' },
  'agriculture.upload.browse': { en: 'Browse Files', te: 'ఫাইল్స్ బ్రౌజ్ చేయండి' },
  'agriculture.upload.takePhoto': { en: 'Take Photo', te: 'ఫోటో తీసుకోండి' },
  'agriculture.upload.capture': { en: 'Capture Image', te: 'చిత్రానిని పట్టుకోండి' },
  'agriculture.upload.cancel': { en: 'Cancel', te: 'రద్దు చేయండి' },
  'agriculture.upload.remove': { en: 'Remove image', te: 'చిత్రానిని తొలగించండి' },
  'agriculture.upload.invalidFormat': { en: 'Invalid file format. Please upload JPG, PNG, or WEBP images.', te: 'అమానitar ఫైల్ ఫార్మాట్. దయచేసి JPG, PNG, లేదా WEBP చిత్రాలను అప్‌లోడ్ చేయండి.' },
  'agriculture.upload.fileTooLarge': { en: 'File exceeds maximum 10MB limit.', te: 'ఫైల్ గరిష్ట 10MB పరిధిని నేర్చుకొ汤.' },
  'agriculture.upload.samples': { en: 'Or test with preset samples:', te: 'లేదా ప్రీసెట్ నమూనాలతో పరీక్షించండి:' },
  'agriculture.upload.sampleTomato': { en: 'Tomato Early Blight (Foliar)', te: 'టమోటో అర్లీ బ్లైట్ (ఆకు)' },
  'agriculture.upload.sampleCorn': { en: 'Corn Common Rust (Pustules)', te: 'మొక్కజొన్న సాధారణ రస్ట్ (పుస్తల్స్)' },
  'agriculture.upload.samplePepper': { en: 'Healthy Bell Pepper Leaf', te: 'ఆరోగ్యకరమైన బెల్ పెప્પర్ ఆకు' },
  'agriculture.upload.sampleDrySoil': { en: 'Dry Soil with Surface Cracking', te: 'ముట్టిన మట్టి Wegen музе ხార peringkat' },
  'agriculture.upload.sampleMoistSoil': { en: 'Moist Humic Agricultural Loam', te: 'తేమగా ఉన్న హ్యూమిక్ వ్యవసాయ లోమ్' },

  // Agriculture AI Features - Analysis
  'agriculture.analysis.runPlant': { en: 'Analyze Disease', te: 'వ్యాధిని విశ్లేషించండి' },
  'agriculture.analysis.runSoil': { en: 'Analyze Soil Surface', te: 'మట్టి سطحాన్ని విశ్లేషించండి' },
  'agriculture.analysis.loadingPlant': { en: 'Analyzing leaf image with MobileNetV2 CNN...', te: 'మొਬైల్‌నెట్V2 CNNతో ఆకు చిత్రానిని విశ్లేషిస్తున్నాము...' },
  'agriculture.analysis.loadingSoil': { en: 'Analyzing soil surface with OpenCV computer vision...', te: 'OpenCV కంప్యూటర్ విషన్తో మట్టి 표面안을 విశ్లేషిస్తున్నాము...' },
  'agriculture.analysis.ready': { en: 'Ready to Analyze', te: 'విశ్లేషించడానికి సిద్ధంగా ఉంది' },
  'agriculture.analysis.uploadFirst': { en: 'Upload a Crop Leaf Image', te: 'ఒక పంట ఆకు చిత్రానిని అప్‌లోడ్ చేయండి' },
  'agriculture.analysis.uploadSoilFirst': { en: 'Upload a Soil Surface Image', te: 'ఒక మట్టి سطح చిత్రానిని అప్‌లోడ్ చేయండి' },
  'agriculture.analysis.selectCrop': { en: 'Select Crop', te: 'పంటను ఎంచుకోండి' },

  // Agriculture AI Features - Results
  'agriculture.result.prediction': { en: 'Prediction', te: 'అంచనా' },
  'agriculture.result.confidence': { en: 'Confidence', te: 'విశ్వాసం' },
  'agriculture.result.symptoms': { en: 'Observed Symptoms', te: 'గుర్తుకున్న లక్షణాలు' },
  'agriculture.result.causes': { en: 'Pathogen & Environmental Causes', te: 'ప్యాథజన్ మరియు పర్యావరణ కారణాలు' },
  'agriculture.result.organicTreatment': { en: 'Organic & Biological Treatment', te: 'సేంద్రీయ మరియు జీవవిభాగ చికిత్స' },
  'agriculture.result.chemicalTreatment': { en: 'Chemical Treatment Options', te: 'రసాయన చికిత్స ఎంపికలు' },
  'agriculture.result.prevention': { en: 'Prevention Tips', te: 'నివారణ సూచనలు' },
  'agriculture.result.differential': { en: 'Differential Diagnoses (Top Probabilities)', te: 'వివిధ диаగ్నోసిస్ (శీర్ష సంభావ్యతలు)' },
  'agriculture.result.disclaimer': { en: 'Disclaimer:', te: 'వితర్ణం:' },
  'agriculture.result.done': { en: 'Done', te: 'పూర్తయింది' },
  'agriculture.result.recommendations': { en: 'Recommended Actions', te: 'సిఫార్సు చేయబడిన చర్యలు' },
  'agriculture.result.healthy': { en: 'Healthy Foliage', te: 'ఆరోగ్యకరమైన ఆకులు' },
  'agriculture.result.diseased': { en: 'Disease Detected', te: 'వ్యాధి గుర్తించబడింది' },
  'agriculture.result.lowConfidence': { en: 'Low confidence result. Please consult an agronomist for verification.', te: 'తక్కువ విశ్వాస ఫలితం. దయచేసి ధృవీకరణ కోసం అగ్రోనోమిస్ట్‌ను సంప్రదించండి.' },

  // Confidence Meter
  'agriculture.confidence.label': { en: 'Model Confidence', te: 'మోడల్ విశ్వాసం' },
  'agriculture.confidence.high': { en: 'High Confidence', te: 'అధిక విశ్వాసం' },
  'agriculture.confidence.moderate': { en: 'Moderate Confidence', te: 'మధ్యమ విశ్వాసం' },
  'agriculture.confidence.low': { en: 'Low Confidence', te: 'తక్కువ విశ్వాసం' },
  'agriculture.confidence.threshold': { en: 'Threshold', te: 'మర్యಾದ' },

  // Soil Metrics
  'agriculture.soil.moisture': { en: 'Apparent Moisture', te: 'మట్టి తేమ' },
  'agriculture.soil.cracking': { en: 'Surface Cracking', te: 'ఉపరితల పగుళ్లు' },
  'agriculture.soil.color': { en: 'Dominant Hue', te: 'ప్రధాన రంగు' },
  'agriculture.soil.residue': { en: 'Residue & Tilth', te: 'అవశేషాలు & గుల్లదనం' },
  'agriculture.soil.title': { en: 'Soil Surface Optical Inspection', te: 'మట్టి ఉపరితల 사라ల పరీక్ష' },
  'agriculture.soil.colorCategory': { en: 'Color Category', te: 'రంగు వర్గం' },
  'agriculture.soil.intact': { en: 'Intact Surface', te: 'అక్షిగ్రస్తjší ఉపరితలం' },
  'agriculture.soil.density': { en: 'Density', te: 'ఘనత' },

  // Chat Interface
  'agriculture.chat.title': { en: 'AI Farming Assistant', te: 'ఏఐ व्यవసాయ సహాయకుడు' },
  'agriculture.chat.subtitle': { en: 'Crop Protection, Soil Management & Field Advisory', te: 'పంట సంరక్షణ, మట్టి నిర్వహణ మరియు పొలా సలహాలు' },
  'agriculture.chat.context': { en: 'Context:', te: 'సందర్భం:' },
  'agriculture.chat.welcome': { en: 'Hello! I am your AI Farming Assistant. Ask me anything about crop diseases, organic treatments, soil health management, irrigation concepts, or fertilizer principles.\n\nHow can I help your farm today?', te: 'హలో! నేను మీ ఏఐవ్యవసాయ సహాయకుడు. పంట వ్యాధులు, సేంద్రీయ చికిత్సలు, మట్టి ఆరోగ్య నిర్వహణ, నీటిపారుదల భావనలు, లేదా ఎరువు సిద్ధాంతాల గురించి ఏదైనా అడగండి.\n\nఈ రోజు మీ పొలానికి ఎలా సహాయపడగలి?' },
  'agriculture.chat.placeholder': { en: 'Ask about plant symptoms, soil remedies, irrigation...', te: 'మొక్క లక్షణాలు, మట్టి ఉపచారాలు, నీటిపారుదల... గురించి అడగండి' },
  'agriculture.chat.suggested': { en: 'Suggested Next Steps:', te: 'సూచnait следующие దశలు:' },
  'agriculture.chat.disclaimer': { en: 'This is AI-generated agricultural guidance. For critical decisions, please consult a certified agronomist or local extension officer.', te: 'ఇది ఏఐ జన్యతవ్యవసాయ మార్గదర్శకత్వం. కీలక నిర్ణయాల కోసం, దయచేసి ఒక ధృవీకరించిన అగ్రోనోమిస్ట్ లేదా స్థానిక విస్తరణ అధికారిని సంప్రదించండి.' },
  'agriculture.chat.thinking': { en: 'Assistant is evaluating agronomy knowledge base...', te: 'సహాయకరుడు అగ్రోనమి జ్ఞాన בטasketను పరిశీలిస్తున్నాడు...' },
  'agriculture.chat.contextCrop': { en: 'Crop Context', te: 'పంట సందర్భం' },
  'agriculture.chat.contextDisease': { en: 'Disease/Analysis Context', te: 'వ్యాధి/విశ్లేషణ సందర్భం' },
  'agriculture.chat.noContext': { en: 'None — Ask general questions or analyze a crop/soil first', te: 'లేదు — సాధారణ ప్రశ్నలు అడగండి లేదా మొదట ఒక పంట/మట్టిని విశ్లేషించండి' },
  'agriculture.chat.analyzeToSet': { en: 'Analyze a crop to set context', te: 'సందర్భం సర Didierlosamsurgent' },
  'agriculture.chat.quickTopics': { en: 'Quick Topics', te: 'త్వరిత విషయాలు' },
  'agriculture.chat.responsibility': { en: 'Scientific Responsibility', te: 'విజ్ఞాన బాధ్యత' },
  'agriculture.chat.responsibility1': { en: 'AI responses are for educational guidance only', te: 'ఏఐ ప్రతిస్పందనలు విద్యా మార్గదర్శకత్వంపైన మాత్రమే' },
  'agriculture.chat.responsibility2': { en: 'Always verify with certified agronomist for critical decisions', te: 'కీలక నిర్ణయాల కోసం ఎప్పుడూ ధృవీకరించిన అగ్రోనోమిస్ట్ հետ సరిహద్దు చేయండి' },
  'agriculture.chat.responsibility3': { en: 'Lab testing required for soil nutrient & disease confirmation', te: 'మట్టి hocha arables మరియు వ్యాధి ధృవీకరణకు ల్యాబ్ పరీక్ష అవసరం' },
  'agriculture.chat.responsibility4': { en: 'Follow local agricultural extension recommendations', te: 'স্থానిక వ్యవసాయ విస్తరణ సిఫార్సులను అనుసరించండి' },

  // Government
  'government.title': { en: 'Government Services', te: 'ప్రభుత్వ సేవలు' },
  'government.subtitle': { en: 'Quick access to important government portals and schemes', te: 'ముఖ్య ప్రభుత్వ పోర్టల్‌లు మరియు పథకాలకు త్వరితöglichత' },
  'government.schemes': { en: 'Schemes', te: 'పథకాలు' },
  'government.documents': { en: 'Documents', te: 'డాక్యుమెంట్లు' },
  'government.panchayat': { en: 'Panchayat Services', te: 'పంచాయత్ సేవలు' },
  'government.important': { en: 'Important Links', te: 'ముఖ్య లింకులు' },
  'government.noNotices': { en: 'No recent notices available.', te: 'ఇటీవలి నోటీసులు అందుబాటులో లేవు.' },
  'government.officialWebsite': { en: 'Official Website', te: 'అధికారిక వెబ్‌సైట్' },

  // Sri Ram Youth
  'sriRamYouth.title': { en: 'Sri Ram Youth', te: 'శ్రీ రామ యువత' },
  'sriRamYouth.subtitle': { en: 'Celebrating our youth community\'s activities, culture and memories', te: 'మా యువత సముదాయం యొక్క కార్యకలాపాలు, సంప్రదాయం మరియు స్మృతులను జరుపుకోవడం' },
  'sriRamYouth.photos': { en: 'Photos', te: 'ఫోటోలు' },
  'sriRamYouth.videos': { en: 'Videos', te: 'వీడియోలు' },
  'sriRamYouth.events': { en: 'Events', te: 'విధులు' },
  'sriRamYouth.highlights': { en: 'Highlights', te: 'హైలైట్స్' },
  'sriRamYouth.about': { en: 'About Us', te: 'మనం గురించి' },
  'sriRamYouth.activities': { en: 'Our Activities', te: 'మా కార్యకలాపాలు' },
  'sriRamYouth.gallery': { en: 'Photo Gallery', te: 'ఫోటో గ్యాలరీ' },
  'sriRamYouth.upcomingEvents': { en: 'Upcoming Events', te: 'ముందస్తున్న కార్యక్రమాలు' },
  'sriRamYouth.pastEvents': { en: 'Past Events', te: 'గత కార్యక్రమాలు' },
  'sriRamYouth.joinUs': { en: 'Join Us', te: 'మమ్మల్ని చేరండి' },
  'sriRamYouth.contact': { en: 'Contact', te: 'సంప్రదించండి' },
  'sriRamYouth.volunteers': { en: 'Volunteers', te: 'స్వేచ్ఛాకారులు' },
  'sriRamYouth.achievements': { en: 'Achievements', te: 'సాధనలు' },
  'sriRamYouth.photo': { en: 'Photo', te: 'ఫోటో' },
  'sriRamYouth.video': { en: 'Video', te: 'వీడియో' },
  'sriRamYouth.managePhotos': { en: 'Manage Photos', te: 'ఫోటోలు నిర్వహించండి' },
  'sriRamYouth.viewAllPhotos': { en: 'View All Photos', te: 'అన్ని ఫోటోలు చూడండి' },
  'sriRamYouth.allVideos': { en: 'All Videos', te: 'అన్ని వీడియోలు' },
  'sriRamYouth.manageEvents': { en: 'Manage Events', te: 'విధులు నిర్వహించండి' },
  'sriRamYouth.viewAll': { en: 'View All', te: 'అన్ని చూడండి' },
  'sriRamYouth.sriRamaNavami': { en: 'Sri Rama Navami', te: 'శ్రీ రామ నవమి' },
  'sriRamYouth.procession': { en: 'Procession & Celebration', te: 'యాత్ర మరియు ఉత్సవం' },
  'sriRamYouth.communityService': { en: 'Community Service Drive', te: 'సమುದాయ సేవ ప్రయత్నం' },
  'sriRamYouth.cleanup': { en: 'Village Cleanup Initiative', te: 'గ్రామ శుభ్రándhలకు యోజన' },
  'sriRamYouth.kalyanam': { en: 'Sri Rama Navami Kalyanam', te: 'శ్రీ రామ నవమి కల్యాణం' },
  'sriRamYouth.culturalFestival': { en: 'Youth Cultural Festival', te: 'యువత సాంస్కృతిక ఉత్సవం' },
  'sriRamYouth.watch': { en: 'Watch', te: 'చూడండి' },


  // Dynamic Content Translations
  'Home': { en: 'Home', te: 'హోమ్' },
  'Announcements': { en: 'Announcements', te: 'ప్రకటనలు' },
  'Events': { en: 'Events', te: 'కార్యక్రమాలు' },
  'Temples': { en: 'Temples', te: 'గుడులు' },
  'Cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'Agriculture': { en: 'Agriculture', te: 'వ్యవసాయం' },
  'Education': { en: 'Education', te: 'విద్య' },
  'Government': { en: 'Government', te: 'ప్రభుత్వం' },
  'Emergency': { en: 'Emergency', te: 'అత్యవసరం' },
  'Gallery': { en: 'Gallery', te: 'గ్యాలరీ' },
  'Latest village updates and notices': { en: 'Latest village updates and notices', te: 'తాజా గ్రామ అప్‌డేట్స్ మరియు నోటీసులు' },
  'Upcoming festivals and gatherings': { en: 'Upcoming festivals and gatherings', te: 'రాబోయే పండుగలు మరియు సమావేశాలు' },
  'Temple timings and festivals': { en: 'Temple timings and festivals', te: 'గుడి సమయాలు మరియు పండుగలు' },
  'Matches, teams and scores': { en: 'Matches, teams and scores', te: 'మ్యాచ్‌లు, జట్లు మరియు స్కోర్లు' },
  'Farming tips and crop guidance': { en: 'Farming tips and crop guidance', te: 'వ్యవసాయ సూచనలు మరియు పంట మార్గదర్శకత్వం' },
  'Youth community activities and media': { en: 'Youth community activities and media', te: 'యువత సముదాయ కార్యకలాపాలు మరియు మీడియా' },
  'Official government services and links': { en: 'Official government services and links', te: 'అధికారిక ప్రభుత్వ సేవలు మరియు లింకులు' },
  'Village photos and memories': { en: 'Village photos and memories', te: 'గ్రామ ఫోటోలు మరియు స్మృతులు' },
  'Ambulance': { en: 'Ambulance', te: 'అంబులెన్స్' },
  'Emergency Medical Assistance': { en: 'Emergency Medical Assistance', te: 'అత్యవసర వైద్య సహాయం' },
  'Police': { en: 'Police', te: 'పోలీస్' },
  'Police Emergency': { en: 'Police Emergency', te: 'పోలీస్ అత్యవసరం' },
  'Fire': { en: 'Fire', te: 'అగ్నిమాపక దళం' },
  'Fire Emergency': { en: 'Fire Emergency', te: 'అగ్నిమాపక అత్యవసరం' },
  'Government Hospital': { en: 'Government Hospital', te: 'ప్రభుత్వ ఆసుపత్రి' },
  'Nearest Government Hospital': { en: 'Nearest Government Hospital', te: 'సమీప ప్రభుత్వ ఆసుపత్రి' },
  'Women Helpline': { en: 'Women Helpline', te: 'మహిళా హెల్ప్‌లైన్' },
  'Women Safety Helpline': { en: 'Women Safety Helpline', te: 'మహిళా భద్రత హెల్ప్‌లైన్' },
  'Child Helpline': { en: 'Child Helpline', te: 'చిల్డ్ హెల్ప్‌లైన్' },
  'Child Protection Helpline': { en: 'Child Protection Helpline', te: 'బాలల రక్షణ హెల్ప్‌లైన్' },
  'Community Spirit': { en: 'Community Spirit', te: 'సముదాయ స్ఫూర్తి' },
  'Bringing youth together through devotion, culture and service since 2010.': { en: 'Bringing youth together through devotion, culture and service since 2010.', te: '2010 నుండి భక్తి, సంస్కృతి మరియు సేవ ద్వారా యువతను ఒకచోటికి చేర్చడం.' },
  '150+ Active Volunteers': { en: '150+ Active Volunteers', te: '150+ క్రియాశీల స్వేచ్ఛాకారులు' },
  'Dedicated youth members serving the community across various initiatives.': { en: 'Dedicated youth members serving the community across various initiatives.', te: 'వవిధ కార్యక్రమాల్లో సముదాయానికి సేవచేస్తున్న నిబద్ధత గల యువత సభ్యులు.' },
  'District Best Youth Org': { en: 'District Best Youth Org', te: 'జిల్లా ఉత్తమ యువత సంస్థ' },
  'Awarded "Best Youth Organization" by SPSR Nellore District for 3 consecutive years.': { en: 'Awarded "Best Youth Organization" by SPSR Nellore District for 3 consecutive years.', te: 'SPSR నెల్లూరు జిల్లా చే 3 వరుస సంవత్సరాలు "ఉత్తమ యువత సంస్థ" అవార్డు.' },
  '5000+ Hours Service': { en: '5000+ Hours Service', te: '5000+ గంటల సేవ' },
  'Cumulative community service hours contributed by our volunteers annually.': { en: 'Cumulative community service hours contributed by our volunteers annually.', te: 'ప్రతియేటా మా యువత అందించిన సామాజిక సేవా గంటలు.' },
  'Cultural Preservation': { en: 'Cultural Preservation', te: 'సాంస్కృతిక సంరక్షణ' },
  'Preserving traditional art forms - Kolatam, Burrakatha, and Harikatha.': { en: 'Preserving traditional art forms - Kolatam, Burrakatha, and Harikatha.', te: 'ప్రాచీన కళా రూపాలను - కోలాటం, బుర్రకథ మరియు హరికథ నిలబెట్టడం.' },
  'Youth Fellowship': { en: 'Youth Fellowship', te: 'యువత ఫెలోషిప్' },
  'Weekly gatherings for spiritual growth, skill development, and fellowship.': { en: 'Weekly gatherings for spiritual growth, skill development, and fellowship.', te: 'ఆధ్యాత్మిక వృద్ధి, నైపుణ్య అభివృద్ధి కోసం వారాంతపు సమావేశాలు.' },
  'Sri Rama Navami Celebration 2026': { en: 'Sri Rama Navami Celebration 2026', te: 'శ్రీ రామ నవమి వేడుక 2026' },
  'Grand procession with decorated chariot and cultural performances': { en: 'Grand procession with decorated chariot and cultural performances', te: 'అలంకరించిన రథం ఆకట్టుకునే యాత్ర మరియు సాంస్కృతిక ప్రదర్శనలు' },
  'Community Service - Village Cleanup': { en: 'Community Service - Village Cleanup', te: 'సముదాయ సేవ - గ్రామ శుభ్రత' },
  'Youth volunteers cleaning village roads and temple premises': { en: 'Youth volunteers cleaning village roads and temple premises', te: 'గ్రామ రోడ్లు, గుడి పరిసరాలను శుభ్రం చేస్తున్న యువ స్వేచ్ఛాకారులు' },
  'Youth Cultural Festival': { en: 'Youth Cultural Festival', te: 'యువత సాంస్కృతిక ఉత్సవం' },
  'Traditional dance and music performances by youth members': { en: 'Traditional dance and music performances by youth members', te: 'యువత సభ్యుల ద్వారా సామాస్రదాయక నృత్య, సంగీత ప్రదర్శనలు' },
  'Educational Awareness Camp': { en: 'Educational Awareness Camp', te: 'విద్యా చైతన్య శిబిరం' },
  'Career guidance session for village students': { en: 'Career guidance session for village students', te: 'గ్రామ విద్యార్థులకు కరీర్ మార్గదర్శక సెషన్' },
  'Temple Renovation Volunteering': { en: 'Temple Renovation Volunteering', te: 'గుడి పునరుద్ధరణ స్వేచ్ఛా సేవ' },
  'Youth helping in Sri Rama Temple renovation work': { en: 'Youth helping in Sri Rama Temple renovation work', te: 'శ్రీ రామ గుడి పునరుద్ధరణలో యువత సహాయం' },
  'Blood Donation Camp': { en: 'Blood Donation Camp', te: 'రక్తదాన శిబిరం' },
  'Annual blood donation drive organized with Red Cross': { en: 'Annual blood donation drive organized with Red Cross', te: 'రెడ్ క్రాస్ సహకారంతో వార్షిక రక్తదాన శిబిరం' },
  'Sports Tournament Finals': { en: 'Sports Tournament Finals', te: 'క్రీడల పోటీల ఫైనల్స్' },
  'Kabaddi and volleyball tournament among youth teams': { en: 'Kabaddi and volleyball tournament among youth teams', te: 'యువత జట్ల మధ్య కబడ్డీ వాలీబాల్ పోటీలు' },
  'Diwali Celebration': { en: 'Diwali Celebration', te: 'దీపావళి వేడుక' },
  'Traditional Diwali celebration with lamps and fireworks': { en: 'Traditional Diwali celebration with lamps and fireworks', te: 'దీపాలు, టపాసులతో సంప్రదాయ దీపావళి వేడుక' },
  'Sri Rama Navami Kalyanam 2026': { en: 'Sri Rama Navami Kalyanam 2026', te: 'శ్రీ రామ నవమి కల్యాణం 2026' },
  'Complete wedding ceremony of Lord Rama and Sita Devi': { en: 'Complete wedding ceremony of Lord Rama and Sita Devi', te: 'సీతారాముల సంపూర్ణ కల్యాణ మహోత్సవం' },
  'Community Service Drive 2026': { en: 'Community Service Drive 2026', te: 'సముదాయ సేవా కార్యక్రమం 2026' },
  'Village cleanup and tree plantation drive': { en: 'Village cleanup and tree plantation drive', te: 'గ్రామ శుభ్రత మరియు మొక్కలు నాటే కార్యక్రమం' },
  'Youth Cultural Festival 2025': { en: 'Youth Cultural Festival 2025', te: 'యువత సాంస్కృతిక ఉత్సవం 2025' },
  'Traditional dance, music and drama performances': { en: 'Traditional dance, music and drama performances', te: 'సాంప్రదాయక నృత్య, సంగీత మరియు నాటక ప్రదర్శనలు' },
  'Sri Rama Navami Celebrations': { en: 'Sri Rama Navami Celebrations', te: 'శ్రీ రామ నవమి వేడుకలు' },
  'Grand annual celebrations at Sri Rama Temple with special poojas, cultural programs, and annadanam.': { en: 'Grand annual celebrations at Sri Rama Temple with special poojas, cultural programs, and annadanam.', te: 'శ్రీ రామ గుడిలో ప్రత్యేక పూజలు, సాంస్కృతిక కార్యక్రమాలు, మరియు అన్నదానంతో వార్షిక వేడుకలు.' },
  'Youth Leadership Camp': { en: 'Youth Leadership Camp', te: 'యువత నాయకత్వ శిబిరం' },
  'Three-day leadership development camp for village youth focusing on communication, teamwork, and community service.': { en: 'Three-day leadership development camp for village youth focusing on communication, teamwork, and community service.', te: 'కమ్యూనికేషన్, టీమ్‌వర్క్ మరియు సముదాయ సేవల మీద దృష్టిపెట్టి యువత కోసం 3 రోజుల శిబిరం.' },
  'Annual blood donation drive in collaboration with Red Cross Society.': { en: 'Annual blood donation drive in collaboration with Red Cross Society.', te: 'రెడ్ క్రాస్ సొసైటీ భాగస్వామ్యంతో వార్షిక రక్తదాన శిబిరం.' },
  'Environment Day Tree Plantation': { en: 'Environment Day Tree Plantation', te: 'పర్యావరణ దినోత్సవం మొక్కలు నాటే కార్యక్రమం' },
  'Planting 500+ saplings across village roads and school premises.': { en: 'Planting 500+ saplings across village roads and school premises.', te: 'గ్రామ రోడ్లు మరియు పాఠశాల ఆవరణలలో 500+ మొక్కలు నాటడం.' },
  'Annual Sports Tournament': { en: 'Annual Sports Tournament', te: 'వార్షిక క్రీడల పోటీలు' },
  'Kabaddi, Volleyball, and Cricket tournament for youth.': { en: 'Kabaddi, Volleyball, and Cricket tournament for youth.', te: 'యువత కోసం కబడ్డీ, వాలీబాల్ మరియు క్రికెట్ పోటీలు.' },
  'Diwali Cultural Evening': { en: 'Diwali Cultural Evening', te: 'దీపావళి సాంస్కృతిక సాయంత్రం' },
  'Traditional dance, music, and drama performances by youth members.': { en: 'Traditional dance, music, and drama performances by youth members.', te: 'యువత సభ్యుల ద్వారా సాంప్రదాయ నృత్య, సంగీత మరియు నాటక ప్రదర్శనలు.' },


  // Extra Dynamic Content
  'Village General Body Meeting': { en: 'Village General Body Meeting', te: 'గ్రామ సర్వసభ్య సమావేశం' },
  'Monthly general body meeting will be held at the community hall to discuss village development projects.': { en: 'Monthly general body meeting will be held at the community hall to discuss village development projects.', te: 'గ్రామ అభివృద్ధి ప్రాజెక్టుల చర్చకు కమ్యూనిటీ హాల్ లో నెలవారీ సర్వసభ్య సమావేశం నిర్వహించబడుతుంది.' },
  'General': { en: 'General', te: 'సాధారణ' },
  'Sankranti Festival Celebrations': { en: 'Sankranti Festival Celebrations', te: 'సంక్రాంతి పండుగ సంబరాలు' },
  'Traditional Sankranti celebrations organized at the village center. All residents are invited.': { en: 'Traditional Sankranti celebrations organized at the village center. All residents are invited.', te: 'గ్రామ మధ్యలో సంప్రదాయ సంక్రాంతి సంబరాలు. ప్రజలందరికీ ఆహ్వానం.' },
  'Festival': { en: 'Festival', te: 'పండుగ' },
  'New Government Scheme for Farmers': { en: 'New Government Scheme for Farmers', te: 'రైతులకు కొత్త ప్రభుత్వ పథకం' },
  'Central government announces new subsidy scheme for small and marginal farmers. Visit government services page for details.': { en: 'Central government announces new subsidy scheme for small and marginal farmers. Visit government services page for details.', te: 'చిన్న మరియు సన్నకారు రైతులకు కేంద్ర ప్రభుత్వం కొత్త సబ్సిడీ పథకాన్ని ప్రకటించింది. వివరాల కోసం చూడుము.' },
  'Cricket Tournament Registration Open': { en: 'Cricket Tournament Registration Open', te: 'క్రికెట్ పోటీల నమోదు ప్రారంభం' },
  'Registration open for the annual Naidupalli Cricket Tournament. Teams can register at the community center.': { en: 'Registration open for the annual Naidupalli Cricket Tournament. Teams can register at the community center.', te: 'వార్షిక నాయడుపల్లి క్రికెట్ పోటీల నమోదు ప్రారంభం. జట్లు నమోదు చేసుకోవచ్చు.' },
  'Independence Day Celebration': { en: 'Independence Day Celebration', te: 'స్వాతంత్ర్య దినోత్సవ వేడుకలు' },
  'Flag hoisting ceremony followed by cultural programs and sports competitions.': { en: 'Flag hoisting ceremony followed by cultural programs and sports competitions.', te: 'జాతీయ జెండా ఆవిష్కరణ అనంతరం సాంస్కృతిక కార్యక్రమాలు, క్రీడా పోటీలు.' },
  'Temple Annual Festival': { en: 'Temple Annual Festival', te: 'గుడి వార్షికోత్సవం' },
  'Sri Venkateswara Swamy Temple annual Brahmotsavam with special poojas and cultural events.': { en: 'Sri Venkateswara Swamy Temple annual Brahmotsavam with special poojas and cultural events.', te: 'శ్రీ వేంకటేశ్వర స్వామి గుడి వార్షిక బ్రహ్మోత్సవాలు, ప్రత్యేక పూజలతో.' },
  'Temple': { en: 'Temple', te: 'గుడి' },
  'Naidupalli Cricket Tournament Finals': { en: 'Naidupalli Cricket Tournament Finals', te: 'నాయడుపల్లి క్రికెట్ టోర్నమెంట్ ఫైనల్స్' },
  'Final match of the village cricket tournament between Warriors and Strikers.': { en: 'Final match of the village cricket tournament between Warriors and Strikers.', te: 'వారియర్స్ మరియు స్ట్రైకర్స్ మధ్య గ్రామ క్రికెట్ టోర్నమెంట్ ఫైనల్ మ్యాచ్.' },
  'Farmers Training Workshop': { en: 'Farmers Training Workshop', te: 'రైతుల శిక్షణా వర్క్‌షాప్' },
  'Workshop on modern farming techniques and government schemes for agriculture.': { en: 'Workshop on modern farming techniques and government schemes for agriculture.', te: 'ఆధునిక వ్యవసాయ పద్దతులు మరియు ప్రభుత్వ పథకాలపై వర్క్‌షాప్.' },
  'Village': { en: 'Village', te: 'గ్రామం' },
  'Festivals': { en: 'Festivals', te: 'పండుగలు' },
  'Culture': { en: 'Culture', te: 'సంస్కృతి' },
  'Nature': { en: 'Nature', te: 'ప్రకృతి' },
  'Competition': { en: 'Competition', te: 'పోటీ' },
  'Service': { en: 'Service', te: 'సేవ' },
  'Organization': { en: 'Organization', te: 'సంస్థ' },

// Py Translations\n  'Use these verified emergency contacts when immediate help is needed. Save these numbers for quick access.': { en: 'Use these verified emergency contacts when immediate help is needed. Save these numbers for quick access.', te: 'ఇవి అవసరాలపడినప్పుడు ఉపయోగించడానికి ధృవీకరించిన అత్యవసర సంప్రదింపులు. త్వరిత ప్రాప్తికి నంబర్లు సేవ్ చేయండి.' },\n  'Verified emergency numbers for immediate assistance': { en: 'Verified emergency numbers for immediate assistance', te: 'త్వరిత సహాయానికి ధృవీకరించిన అత్యవసర నంబర్లు' },\n  'Video thumbnail': { en: 'Video thumbnail', te: 'వీడియో థంబ్నైల్' },\n  'Sri Ram Youth community service': { en: 'Sri Ram Youth community service', te: 'శ్రీ రామ యువత సముదాయ సేవ' },\n  'Naidupalli Village': { en: 'Naidupalli Village', te: 'నాయడుపల్లి గ్రామం' },\n  'Learn More': { en: 'Learn More', te: 'మరిన్ని తెలుసుకోండి' },\n  'High School (Govt)': { en: 'High School (Govt)', te: 'హై స్కూల్ (ప్రభుత్వ)' },\n  'Primary School (Govt)': { en: 'Primary School (Govt)', te: 'ప్రైమరీ స్కూల్ (ప్రభుత్వ)' },\n  '6th to 10th': { en: '6th to 10th', te: '6వ నుండి 10వ తరగతులు' },\n  '1st to 5th': { en: '1st to 5th', te: '1వ నుండి 5వ తరగతులు' },\n  '400+ Students': { en: '400+ Students', te: '400+ విద్యార్థులు' },\n  '250+ Students': { en: '250+ Students', te: '250+ విద్యార్థులు' },\n  'Recent publications from the Gram Panchayat': { en: 'Recent publications from the Gram Panchayat', te: 'గ్రామ పంచాయత్ నుండి ఇటీవలి ప్రచురణలు' },\n  'Edit Announcement': { en: 'Edit Announcement', te: 'ప్రకటనను సవరించండి' },\n  'Create Announcement': { en: 'Create Announcement', te: 'ప్రకటన సృష్టించండి' },\n  'Enter announcement title': { en: 'Enter announcement title', te: 'ప్రకటన శీర్షికను నమోదు చేయండి' },\n  'Enter announcement content': { en: 'Enter announcement content', te: 'ప్రకటన విషయాన్ని నమోదు చేయండి' },\n  'Enter author name': { en: 'Enter author name', te: 'రచయిత పేరు నమోదు చేయండి' },\n  'Save Changes': { en: 'Save Changes', te: 'మార్పులను సేవ్ చేయండి' },\n  'Rice (Paddy)': { en: 'Rice (Paddy)', te: 'వరి (బియ్యం)' },\n  'Cotton': { en: 'Cotton', te: 'పత్తి' },\n  'Groundnut': { en: 'Groundnut', te: 'వేరుశనగ' },\n  'Kharif (June - October)': { en: 'Kharif (June - October)', te: 'ఖరీఫ్ (జూన్ - అక్టోబర్)' },\n  'Kharif (June - November)': { en: 'Kharif (June - November)', te: 'ఖరీఫ్ (జూన్ - నవంబర్)' },\n  'Kharif & Rabi': { en: 'Kharif & Rabi', te: 'ఖరీఫ్ మరియు రాబీ' },\n  'High - Requires standing water': { en: 'High - Requires standing water', te: 'అధికం - నిలువు నీరు అవసరం' },\n  'Medium - Regular irrigation': { en: 'Medium - Regular irrigation', te: 'మధ్యమం - క్రమమైన నీటిపారుదల' },\n  'Low to Medium': { en: 'Low to Medium', te: 'తక్కువ నుండి మధ్యమం వరకు' },\n  'Blast, Bacterial Leaf Blight, Sheath Blight': { en: 'Blast, Bacterial Leaf Blight, Sheath Blight', te: 'బ్లాస్ట్, బ్యాక్టెరియల్ లీఫ్ బ్లైట్, షీత్ బ్లైట్' },\n  'Leaf Curl, Boll Rot, Root Rot': { en: 'Leaf Curl, Boll Rot, Root Rot', te: 'లీఫ్ కర్ల్, బోల్ రాట్, రూట్ రాట్' },\n  'Leaf Spot, Rust, Bud Necrosis': { en: 'Leaf Spot, Rust, Bud Necrosis', te: 'లీఫ్ స్పాట్, రస్ట్, బడ్డ నేక్రోసిస్' },\n  'Use certified seeds. Maintain 2-5cm water level. Apply balanced fertilizers.': { en: 'Use certified seeds. Maintain 2-5cm water level. Apply balanced fertilizers.', te: 'ప్రమాణీకరణ పొందిన బీజాలను ఉపయోగించండి. 2-5సెం.మీ నీల లెవెల్ ఉంచండి. సమతుల్య ఎరువులు వాడండి.' },\n  'Use BT cotton varieties. Timely pest monitoring. Avoid waterlogging.': { en: 'Use BT cotton varieties. Timely pest monitoring. Avoid waterlogging.', te: 'బీటి పత్తి రకాలను వాడండి. సమయానికి తెగుళ్లు పర్యవేక్షించండి. నీరు నిలిచిపోకుండా నివారించండి.' },\n  'Gypsum application at flowering. Seed treatment with fungicide. Proper drainage.': { en: 'Gypsum application at flowering. Seed treatment with fungicide. Proper drainage.', te: 'పువ్వుల సమయంలో జిప్సమ్ వాడండి. బీజాలకు ఫంగిసైడ్ చికిత్స. సరైన డ్రైనేజ్.' },\n  'Scholarship Applications Open': { en: 'Scholarship Applications Open', te: 'స్కాలర్షిప్ అప్లికేషన్స్ విడుదల' },\n  'State government scholarship applications for SC/ST/BC students now open. Last date: Feb 15, 2026.': { en: 'State government scholarship applications for SC/ST/BC students now open. Last date: Feb 15, 2026.', te: 'SC/ST/BC విద్యార్థులకు రాష్ట్ర ప్రభుత్వ స్కాలర్షిప్ దరఖాస్తులు విడుదల. చివరి తేదీ: ఫిబ్రవరి 15, 2026.' },\n  'SSC Exam Schedule Released': { en: 'SSC Exam Schedule Released', te: 'ఎస్ఎస్‌సీ పరీక్షా సామయం విడుదల' },\n  '10th class board exam timetable announced. Exams begin March 15, 2026.': { en: '10th class board exam timetable announced. Exams begin March 15, 2026.', te: '10వ తరగతి బోర్డ్ పరీక్షా టైమ్‌టేబుల్ ప్రకటించబడింది. పరీక్షలు మార్చి 15, 2026 నుండి ప్రారంభమవుతాయి.' },\n  'Student Achievement - District Topper': { en: 'Student Achievement - District Topper', te: 'విద్యార్థి సాధన - జిల్లా టాపర్' },\n  'Lakshmi Priya from Naidupalli ZP High School secured district 1st rank in SSC exams.': { en: 'Lakshmi Priya from Naidupalli ZP High School secured district 1st rank in SSC exams.', te: 'నాయడుపల్లి ZP హైస్కూల్ నుండి లక్ష్మి ప్రియ SSC పరీక్షలలో జిల్లా 1వ ర్యాంక్ సాధించింది.' },\n  'AP State Government': { en: 'AP State Government', te: 'ఏపీ ప్రభుత్వం' },\n  'Official Andhra Pradesh Government information and services': { en: 'Official Andhra Pradesh Government information and services', te: 'అధికారిక ఆంధ్రప్రదేశ్ ప్రభుత్వ సమాచారం మరియు సేవలు' },\n  'SPSR Nellore District': { en: 'SPSR Nellore District', te: 'SPSR నెల్లూరు జిల్లా' },\n  'District administration and public information': { en: 'District administration and public information', te: 'జిల్లా నిర్వహణ మరియు ప్రజా సమాచారం' },\n  'AP Seva': { en: 'AP Seva', te: 'ఏపీ సేవ' },\n  'Citizen services and applications portal': { en: 'Citizen services and applications portal', te: 'ప్రజా సేవలు మరియు అప్లికేషన్స్ పోర్టల్' },\n  'Grama/Ward Sachivalayam': { en: 'Grama/Ward Sachivalayam', te: 'గ్రామ/వార్డ్ సచివాలయం' },\n  'Village and ward secretariat services': { en: 'Village and ward secretariat services', te: 'గ్రామ మరియు వార్డ్ సచివాలయం సేవలు' },\n  'Spandana': { en: 'Spandana', te: 'స్పందన' },\n  'Public grievance redressal platform': { en: 'Public grievance redressal platform', te: 'ప్రజా ఫిర్యాదుల పరిష్కార వేదిక' },\n  'AP Panchayat Services': { en: 'AP Panchayat Services', te: 'ఏపీ పంచాయత్ సేవలు' },\n  'Panchayat-related services including house tax, trade license, property valuation': { en: 'Panchayat-related services including house tax, trade license, property valuation', te: 'ఇంటి పన్ను, ట్రేడ్ లైసెన్సు, ప్రాపర్టీ వాల్యూషన్ వంటి పంచాయత్ సంబంధిత సేవలు' },\n  'MeeBhoomi': { en: 'MeeBhoomi', te: 'మీభూమి' },\n  'Land and revenue records': { en: 'Land and revenue records', te: 'భూమి మరియు రెవిన్యూ రికార్డులు' },\n  'Agriculture Department': { en: 'Agriculture Department', te: 'వ్యవసాయ శాఖ' },\n  'Agriculture department information and farmer schemes': { en: 'Agriculture department information and farmer schemes', te: 'వ్యవసాయ శాఖ సమాచారం మరియు రైతు పథకాలు' },\n  'Health & Family Welfare': { en: 'Health & Family Welfare', te: 'ఆరోగ్యం మరియు కుటుంబ క్షేమం' },\n  'Health, Medical & Family Welfare Department services': { en: 'Health, Medical & Family Welfare Department services', te: 'ఆరోగ్య, వైద్య మరియు కుటుంబ క్షేమ శాఖ సేవలు' },\n  'Birth/Death Certificates': { en: 'Birth/Death Certificates', te: 'జనన/మరణ సర్టిఫికేట్లు' },\n  'Register and download certificates online': { en: 'Register and download certificates online', te: 'ఆన్‌లైన్‌లో జనన/మరణ సర్టిఫికేట్లు నమోదు చేయండి మరియు డౌన్లోడ్ చేయండి' },\n  'AP State Portal': { en: 'AP State Portal', te: 'ఏపీ స్టేట్ పోర్టల్' },\n  'Unified portal for all AP government services': { en: 'Unified portal for all AP government services', te: 'అన్ని ఏపీ ప్రభుత్వ సేవలకు ఏకీకృత పోర్టల్' },\n  'RTI Online': { en: 'RTI Online', te: 'ఆర్‌టీఐ ఆన్‌లైన్' },\n  'Right to Information portal for Andhra Pradesh': { en: 'Right to Information portal for Andhra Pradesh', te: 'సమాచార హక్కు చట్టం (ఆర్‌టీఐ) పోర్టల్' },\n  'AP eProcurement': { en: 'AP eProcurement', te: 'ఏపీ ఈ-ప్రోక్యూరుమెంట్' },\n  'Government e-procurement platform': { en: 'Government e-procurement platform', te: 'ప్రభుత్వ ఈ-ప్రోక్యూరుమెంట్ ప్లాట్‌ఫారమ్' },\n  'CM Dashboard': { en: 'CM Dashboard', te: 'సిఎం డాష్‌బోర్డ్' },\n  'Chief Minister dashboard for governance': { en: 'Chief Minister dashboard for governance', te: 'సుపరిపాలన కోసం ముఖ్యమంత్రి డాష్‌బోర్డ్' },\n  'Sri Venkateswara Swamy Temple': { en: 'Sri Venkateswara Swamy Temple', te: 'శ్రీ వేంకటేశ్వర స్వామి గుడి' },\n  'Lord Venkateswara': { en: 'Lord Venkateswara', te: 'భగవాన్ వేంకటేశ్వరుడు' },\n  'Ancient temple dedicated to Lord Venkateswara, serving as the spiritual center of the village for generations.': { en: 'Ancient temple dedicated to Lord Venkateswara, serving as the spiritual center of the village for generations.', te: 'తరతరాలుగా గ్రామ ఆధ్యాత్మిక కేంద్రంగా ఉన్న పురాతన శ్రీ వేంకటేశ్వర స్వామి ఆలయం.' },\n  '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM': { en: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM', te: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM' },\n  'Annual Brahmotsavam in March': { en: 'Annual Brahmotsavam in March', te: 'మార్చి నెలలో వార్షిక బ్రహ్మోత్సవాలు' },\n  'Sri Rama Temple': { en: 'Sri Rama Temple', te: 'శ్రీ రామ గుడి' },\n  'Lord Rama': { en: 'Lord Rama', te: 'భగవాన్ రాముడు' },\n  'Beautiful temple dedicated to Lord Rama, known for its peaceful atmosphere and Ram Navami celebrations.': { en: 'Beautiful temple dedicated to Lord Rama, known for its peaceful atmosphere and Ram Navami celebrations.', te: 'శాంతమైన వాతావరణం మరియు రామ నవమి వేడుకలకు ప్రసిద్ధి చెందిన అందమైన శ్రీ రామ ఆలయం.' },\n  '6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM': { en: '6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM', te: '6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM' },\n  'Gramadevatha Temple': { en: 'Gramadevatha Temple', te: 'గ్రామదేవత గుడి' },\n  'Goddess Gramadevatha': { en: 'Goddess Gramadevatha', te: 'గ్రామదేవత అమ్మవారు' },\n  'Village deity temple protecting the community, central to local festivals and traditions.': { en: 'Village deity temple protecting the community, central to local festivals and traditions.', te: 'గ్రామాన్ని రక్షించే గ్రామ దేవత గుడి, స్థానిక వేడుకలకు మరియు సంప్రదాయాలకు కేంద్రం.' },\n  '5:30 AM - 11:00 AM, 4:30 PM - 8:30 PM': { en: '5:30 AM - 11:00 AM, 4:30 PM - 8:30 PM', te: '5:30 AM - 11:00 AM, 4:30 PM - 8:30 PM' },\n  'Annual Jatara in April': { en: 'Annual Jatara in April', te: 'ఏప్రిల్ నెలలో వార్షిక జాతర' },\n  'Naidupalli Warriors': { en: 'Naidupalli Warriors', te: 'నాయడుపల్లి వారియర్స్' },\n  'Naidupalli Strikers': { en: 'Naidupalli Strikers', te: 'నాయడుపల్లి స్ట్రైకర్స్' },\n  'Naidupalli Titans': { en: 'Naidupalli Titans', te: 'నాయడుపల్లి టైటన్స్' },\n  'Naidupalli Challengers': { en: 'Naidupalli Challengers', te: 'నాయడుపల్లి చెల్లెన్సర్స్' },\n  'Ramesh Kumar': { en: 'Ramesh Kumar', te: 'రమేష్ కుమార్' },\n  'Suresh Reddy': { en: 'Suresh Reddy', te: 'సురేష్ రెడ్డి' },\n  'Mahesh Naidu': { en: 'Mahesh Naidu', te: 'మహేశ్ నాయుడు' },\n  'Venkat Rao': { en: 'Venkat Rao', te: 'వెంకట్ రావు' },\n  'Warriors: 156/6 (20 overs) | Strikers: 142/8 (20 overs)': { en: 'Warriors: 156/6 (20 overs) | Strikers: 142/8 (20 overs)', te: 'వారియర్స్: 156/6 (20 ఓవర్స్) | స్ట్రైకర్స్: 142/8 (20 ఓవర్స్)' },\n  'Warriors: 178/4 (20 overs) | Challengers: 165/7 (20 overs)': { en: 'Warriors: 178/4 (20 overs) | Challengers: 165/7 (20 overs)', te: 'వారియర్స్: 178/4 (20 ఓవర్స్) | చెల్లెన్సర్స్: 165/7 (20 ఓవర్స్)' },\n  'Village Cricket Ground': { en: 'Village Cricket Ground', te: 'గ్రామ క్రికెట్ మైదానం' },\n  'Village Panorama': { en: 'Village Panorama', te: 'గ్రామ వాతావరణం' },\n  'Cricket Match Action': { en: 'Cricket Match Action', te: 'క్రికెట్ మ్యాచ్ పనులు' },\n  'School Children': { en: 'School Children', te: 'పాఠశాల చిన్నారులు' },\n  'Rice Fields': { en: 'Rice Fields', te: 'వరి పొలాలు' },\n  'Temple Festival Procession': { en: 'Temple Festival Procession', te: 'గుడి వేడుక యాత్ర' },\n  'Community Meeting': { en: 'Community Meeting', te: 'సముదాయ సమావేశం' },\n  'Village Walkthrough Video': { en: 'Village Walkthrough Video', te: 'గ్రామ సందర్శన வீடியோ' },\n  'Temple Tour Video': { en: 'Temple Tour Video', te: 'గుడి ప్రదర్శన వీడియో' },\n  'Upcoming': { en: 'Upcoming', te: 'రాబోయే' },\n  'Past': { en: 'Past', te: 'గత' },\n  'All': { en: 'All', te: 'అన్ని' },\n  'General': { en: 'General', te: 'సాధారణ' },\n  'Festival': { en: 'Festival', te: 'పండుగ' },\n  'Temple': { en: 'Temple', te: 'ఆలయం' },\n  'Government': { en: 'Government', te: 'ప్రభుత్వం' },\n  'Education': { en: 'Education', te: 'విద్య' },\n  'Cricket': { en: 'Cricket', te: 'క్రికెట్' },\n  'Agriculture': { en: 'Agriculture', te: 'వ్యవసాయం' },\n  'Emergency': { en: 'Emergency', te: 'అత్యవసర' },\n  'Cultural': { en: 'Cultural', te: 'సాంస్కృతిక' },\n  'Village Meeting': { en: 'Village Meeting', te: 'గ్రామ సమావేశం' },\n  'Other': { en: 'Other', te: 'ఇతర' },\n  'Organized by': { en: 'Organized by', te: 'నిర్వహించిన వారు' },\n  'Temple Festival Preparations and Gram Sabha Meeting': { en: 'Temple Festival Preparations and Gram Sabha Meeting', te: 'ఆలయ ఉత్సవ సన్నాహాలు మరియు గ్రామసభా సమావేశం' },\n  'All villagers are requested to attend the meeting regarding upcoming festival arrangements. Important decisions regarding funds and responsibilities will be discussed.': { en: 'All villagers are requested to attend the meeting regarding upcoming festival arrangements. Important decisions regarding funds and responsibilities will be discussed.', te: 'రాబోయే పండుగ ఏర్పాట్లకు సంబంధించిన సభకు గ్రామస్తులందరూ హాజరు కావాల్సిందిగా కోరుతున్నాము.' },\n  'Kharif Crop Advisory Released by Agriculture Dept': { en: 'Kharif Crop Advisory Released by Agriculture Dept', te: 'వ్యవసాయ శాఖ నుండి ఖరీఫ్ పంటకు సలహాలు విడుదల' },\n  'Farmers are advised to prepare their fields according to the new rain forecast. Specific seeds are available at subsidy rates in the Rythu Bharosa Kendra.': { en: 'Farmers are advised to prepare their fields according to the new rain forecast. Specific seeds are available at subsidy rates in the Rythu Bharosa Kendra.', te: 'కొత్త వర్ష సూచన ప్రకారం పొలాలను సిద్ధం చేయాలని రైతులకు సూచిస్తున్నాము. రైతు భరోసా కేంద్రంలో సబ్సిడీ ధరలో ప్రత్యేక విత్తనాలు లభిస్తాయి.' },\n  'Cricket Tournament Registrations Open': { en: 'Cricket Tournament Registrations Open', te: 'క్రికెట్ టోర్నమెంట్ రిజిస్ట్రేషన్ ప్రారంభం' },\n  'The annual Naidupalli T20 tournament registrations are now open. Team captains must submit the player list before 10th October.': { en: 'The annual Naidupalli T20 tournament registrations are now open. Team captains must submit the player list before 10th October.', te: 'వార్షిక నాయుడుపల్లి టీ20 టోర్నమెంట్ నమోదు ప్రారంభమైంది. కెప్టెన్లు క్రీడాకారుల జాబితాను అక్టోబర్ 10 లోపు సమర్పించాలి.' },\n  'Primary School Renovation Completion': { en: 'Primary School Renovation Completion', te: 'ప్రాథమిక పాఠశాల నవీకరణ పూర్తి' },\n  'The village primary school renovation has been completed with new benches and a digital classroom. Classes will resume from Monday.': { en: 'The village primary school renovation has been completed with new benches and a digital classroom. Classes will resume from Monday.', te: 'గ్రామ ప్రాథమిక పాఠశాల నవీకరణ కొత్త బెంచీలు, డిజిటల్ తరగతి గదితో పూర్తయింది. తరగతులు సోమవారం నుండి ప్రారంభించబడతాయి.' },\n  'Power Cut Schedule for Sunday': { en: 'Power Cut Schedule for Sunday', te: 'ఆదివారం కరెంట్ కోత షెడ్యూల్' },\n  'There will be a scheduled power cut this Sunday from 9:00 AM to 5:00 PM for substation maintenance. Please plan accordingly.': { en: 'There will be a scheduled power cut this Sunday from 9:00 AM to 5:00 PM for substation maintenance. Please plan accordingly.', te: 'సబ్ స్టేషన్ నిర్వహణ కొరకు ఈ ఆదివారం ఉదయం 9 గంటల నుండి సాయంత్రం 5 గంటల వరకు కరెంటు కోత ఉంటుంది. గమనించగలరు.' },\n  'Panchayat Office': { en: 'Panchayat Office', te: 'పంచాయతీ కార్యాలయం' },\n  'Mandal Agriculture Officer': { en: 'Mandal Agriculture Officer', te: 'మండల వ్యవసాయ అధికారి' },\n  'Sports Committee': { en: 'Sports Committee', te: 'క్రీడా కమిటీ' },\n  'School Headmaster': { en: 'School Headmaster', te: 'పాఠశాల ప్రధానాచార్యుడు' },\n  'Electricity Board': { en: 'Electricity Board', te: 'విద్యుత్ శాఖ' },\n  'Latest News': { en: 'Latest News', te: 'తాజా వార్తలు' },\n\n// Additional Py Translations
  'Information on schools, scholarships, exams, and student achievements in Naidupalli.': { en: 'Information on schools, scholarships, exams, and student achievements in Naidupalli.', te: 'నాయుడుపల్లిలో పాఠశాలలు, స్కాలర్షిప్స్, పరీక్షలు మరియు విద్యార్థుల సాధనల గురించిన సమాచారం.' },
  'Zilla Parishad High School': { en: 'Zilla Parishad High School', te: 'జిల్లా పరిషత్ ఉన్నత పాఠశాల' },
  'Mandal Parishad Primary School': { en: 'Mandal Parishad Primary School', te: 'మండల పరిషత్ ప్రాథమిక పాఠశాల' },
  'State Level Essay Writing - 1st Prize': { en: 'State Level Essay Writing - 1st Prize', te: 'రాష్ట్ర స్థాయి వ్యాసరచన - 1వ బహుమతి' },
  'District Sports Meet - Gold in 100m': { en: 'District Sports Meet - Gold in 100m', te: 'జిల్లా క్రీడా పోటీలు - 100 మీటర్లలో గోల్డ్' },
  'Access online study materials and mock tests provided by the state education board.': { en: 'Access online study materials and mock tests provided by the state education board.', te: 'రాష్ట్ర విద్యా బోర్డు అందించే ఆన్‌లైన్ స్టడీ మెటీరియల్స్ మరియు మాక్ టెస్ట్‌లను ప్రాప్యత చేయండి.' },
  'Access Materials': { en: 'Access Materials', te: 'మెటీరియల్స్ చూడండి' },
  'Scholarships': { en: 'Scholarships', te: 'స్కాలర్షిప్స్' },
  'Exams': { en: 'Exams', te: 'పరీక్షలు' },
  'Achievements': { en: 'Achievements', te: 'సాధనలు' },
  'A digital platform connecting our village, our people, our culture and our future.': { en: 'A digital platform connecting our village, our people, our culture and our future.', te: 'మన గ్రామం, మన ప్రజలు, మన సంస్కృతి మరియు మన భవిష్యత్తును అనుసంధానించే డిజిటల్ ప్లాట్‌ఫారమ్.' },
  'Our spiritual heritage and cultural centers': { en: 'Our spiritual heritage and cultural centers', te: 'మన ఆధ్యాత్మిక వారసత్వం మరియు సాంస్కృతిక కేంద్రాలు' },
  'Temples of Naidupalli': { en: 'Temples of Naidupalli', te: 'నాయుడుపల్లి దేవాలయాలు' },
  'upcoming': { en: 'upcoming', te: 'రాబోయే' },
  'completed': { en: 'completed', te: 'పూర్తయింది' },
  'live': { en: 'live', te: 'లైవ్' },
  'Batsman': { en: 'Batsman', te: 'బ్యాట్స్‌మెన్' },
  'Bowler': { en: 'Bowler', te: 'బౌలర్' },

// Additional Py Translations 2
  'Latest news, scholarships, and exams': { en: 'Latest news, scholarships, and exams', te: 'తాజా వార్తలు, స్కాలర్షిప్స్ మరియు పరీక్షలు' },
  'Lakshmi Priya': { en: 'Lakshmi Priya', te: 'లక్ష్మి ప్రియ' },
  'K. Vinay': { en: 'K. Vinay', te: 'కె. వినయ్' },
  "Don't miss out on village festivals and gatherings": { en: "Don't miss out on village festivals and gatherings", te: 'గ్రామ పండుగలు మరియు సమావేశాలను కోల్పోకండి' },
  'Panchayat Dashboard': { en: 'Panchayat Dashboard', te: 'పంచాయత్ డాష్‌బోర్డ్' },

// Additional Py Translations 3
  'Next Match': { en: 'Next Match', te: 'తదుపరి మ్యాచ్' },
  'more photos in the archive': { en: 'more photos in the archive', te: 'ఆర్కైవ్‌లో మరిన్ని డాటాలు' },
  'Celebration Video': { en: 'Celebration Video', te: 'వేడుక వీడియో' },
  'Players in Squad': { en: 'Players in Squad', te: 'జట్టులోని క్రీడాకారులు' },
  'Naidupalli Pirates': { en: 'Naidupalli Pirates', te: 'నాయుడుపల్లి పైరేట్స్' },

// Home Page Additional Translations
  'Naidupalli Cricket': { en: 'Naidupalli Cricket', te: 'నాయుడుపల్లి క్రికెట్' },
  'Upcoming Match': { en: 'Upcoming Match', te: 'తదుపరి మ్యాచ్' },
  'Recent Result': { en: 'Recent Result', te: 'ముదుపు ఫలితం' },
  'Winner:': { en: 'Winner:', te: 'విజేత:' },
  'View Cricket Section': { en: 'View Cricket Section', te: 'క్రికెట్ో త பகுதిని చూడండి' },
  'Naidupalli Village': { en: 'Naidupalli Village', te: 'నాయుడుపల్లి గ్రామము' },
  'Duttalur Mandal': { en: 'Duttalur Mandal', te: 'దుట్టలూరు మండలం' },
  'SPSR Nellore District': { en: 'SPSR Nellore District', te: 'SPSR నెల్లూరు జిల్లా' },
  'Andhra Pradesh, India': { en: 'Andhra Pradesh, India', te: 'ఆంధ్రప్రదేశ్, భారతదేశం' },
  'Find us on the map': { en: 'Find us on the map', te: 'మాప్‌లో మన్ను కనుగొనండి' },
  'PIN: 524xxx': { en: 'PIN: 524xxx', te: 'పిన్: 524xxx' },

// Sri Ram Youth Additional Translations
  '05 October 2026': { en: '05 October 2026', te: '05 అక్టోబర్ 2026' },
  '25 December 2025': { en: '25 December 2025', te: '25 డిసెంబర్ 2025' },
  'Sri Ram Youth celebration': { en: 'Sri Ram Youth celebration', te: 'శ్రీ రామ యువత వేడుక' },
  'Sri Ram Youth community service': { en: 'Sri Ram Youth community service', te: 'శ్రీ రామ యువత సముదాయ సేవ' },
  'Video thumbnail': { en: 'Video thumbnail', te: 'వీడియో థంబ్నైల్' },

  // Footer
  'footer.about': { en: 'About Us', te: 'మనం గురించి' },
  'footer.contact': { en: 'Contact', te: 'సంప్రదించండి' },
  'footer.rights': { en: 'All rights reserved', te: 'అన్ని హక్కులుGFRधी' },

  // Language
  'language.english': { en: 'English', te: 'English' },
  'language.telugu': { en: 'తెలుగు', te: 'తెలుగు' },

  // Admin (for admin pages)
  'admin.dashboard': { en: 'Dashboard', te: 'డాష్‌బోర్డ్' },
  'admin.announcements': { en: 'Announcements', te: 'ప్రకటనలు' },
  'admin.events': { en: 'Events', te: 'విధులు' },
  'admin.temples': { en: 'Temples', te: 'దేవాలయాలు' },
  'admin.cricket': { en: 'Cricket', te: 'క్రికెట్' },
  'admin.agriculture': { en: 'Agriculture', te: 'వ్యవసాయం' },
  'admin.government': { en: 'Government', te: 'ప్రభుత్వం' },
  'admin.sriRamYouth': { en: 'Sri Ram Youth', te: 'శ్రీ రామ యువత' },
  'admin.gallery': { en: 'Gallery', te: 'గ్యాలరీ' },
  'admin.notifications': { en: 'Notifications', te: 'నోటిఫికేషన్స్' },
  'admin.settings': { en: 'Settings', te: 'సెట్టింగ్స్' },
  'admin.logout': { en: 'Logout', te: 'లాగ్‌ఆయుట్' },

  // Auth
  'auth.welcomeBack': { en: 'Welcome Back', te: 'మళ్లీ స్వాగతం' },
  'auth.mobileEmail': { en: 'Mobile Number / Email', te: 'మోబైల్ నంబర్ / ఇమెయిల్' },
  'auth.password': { en: 'Password', te: 'పాస్వర్డ్' },
  'auth.enterEmailMobile': { en: 'Enter your email or mobile', te: 'మీ ఇమెయిల్ లేదా మోబైల్ ప్రవేశించండి' },
  'auth.enterPassword': { en: 'Enter your password', te: 'మీ పాస్‌వర్డ్ ప్రవేశించండి' },
  'auth.rememberMe': { en: 'Remember me', te: 'నాకు గుర్తుపడు' },
  'auth.forgotPassword': { en: 'Forgot Password?', te: 'పాస్‌వర్డ్ మర్చిపోయారా?' },
  'auth.login': { en: 'Login', te: 'లాగిన్' },
  'auth.or': { en: 'Or', te: 'లేదా' },
  'auth.noAccount': { en: 'Don\'t have an account? ', te: 'ఖాతా లేదు? ' },
  'auth.createAccount': { en: 'Create Account', te: 'ఖాతా సృష్టించండి' },
  'auth.fullName': { en: 'Full Name', te: 'పూర్తి పేరు' },
  'auth.confirmPassword': { en: 'Confirm Password', te: 'పాస్‌వర్డ్ ధృవీకరించండి' },
  'auth.accountCreated': { en: 'Account created successfully', te: 'ఖాతా విజయవంతంగా సృష్టించబడింది' },
  'auth.redirecting': { en: 'Redirecting to login page...', te: 'లాగిన్ పేజీకి redirect అవుతోంది...' },
  'auth.goToLogin': { en: 'Go to Login', te: 'లాగిన్ చేయడానికి వెళ్తండి' },
  'auth.passwordsNoMatch': { en: 'Passwords do not match', te: 'పాస్‌వర్డ్స్ సరిపోలలేదు' },
  'auth.alreadyHaveAccount': { en: 'Already have an account?', te: 'ఇప్పటికే ఖాతా ఉందా?' },
  'auth.joinCommunity': { en: 'Join MANA NAIDUPALLI digital community', te: 'మన నాయడుపల్లి డిజిటల్ సముదాయంలో చేరండి' },

};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (translation && translation[language]) {
      return translation[language];
    }
    // Fallback to English if translation missing
    return translation?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}