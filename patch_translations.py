dict_data = {
    'Information on schools, scholarships, exams, and student achievements in Naidupalli.': 'నాయుడుపల్లిలో పాఠశాలలు, స్కాలర్షిప్స్, పరీక్షలు మరియు విద్యార్థుల సాధనల గురించిన సమాచారం.',
    'Zilla Parishad High School': 'జిల్లా పరిషత్ ఉన్నత పాఠశాల',
    'Mandal Parishad Primary School': 'మండల పరిషత్ ప్రాథమిక పాఠశాల',
    'State Level Essay Writing - 1st Prize': 'రాష్ట్ర స్థాయి వ్యాసరచన - 1వ బహుమతి',
    'District Sports Meet - Gold in 100m': 'జిల్లా క్రీడా పోటీలు - 100 మీటర్లలో గోల్డ్',
    'Access online study materials and mock tests provided by the state education board.': 'రాష్ట్ర విద్యా బోర్డు అందించే ఆన్‌లైన్ స్టడీ మెటీరియల్స్ మరియు మాక్ టెస్ట్‌లను ప్రాప్యత చేయండి.',
    'Access Materials': 'మెటీరియల్స్ చూడండి',
    'Scholarships': 'స్కాలర్షిప్స్',
    'Exams': 'పరీక్షలు',
    'Achievements': 'సాధనలు',
    'A digital platform connecting our village, our people, our culture and our future.': 'మన గ్రామం, మన ప్రజలు, మన సంస్కృతి మరియు మన భవిష్యత్తును అనుసంధానించే డిజిటల్ ప్లాట్‌ఫారమ్.',
    'Our spiritual heritage and cultural centers': 'మన ఆధ్యాత్మిక వారసత్వం మరియు సాంస్కృతిక కేంద్రాలు',
    'Temples of Naidupalli': 'నాయుడుపల్లి దేవాలయాలు',
    'upcoming': 'రాబోయే',
    'completed': 'పూర్తయింది',
    'live': 'లైవ్',
    'Festivals': 'పండుగలు',
    'Nature': 'ప్రకృతి',
    'Culture': 'సంస్కృతి',
    'Village': 'గ్రామం',
    'Temples': 'దేవాలయాలు',
    'Batsman': 'బ్యాట్స్‌మెన్',
    'Bowler': 'బౌలర్'
}

with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

lines = []
for en, te in dict_data.items():
    safe_en = en.replace("'", "\'")
    safe_te = te.replace("'", "\'")
    lines.append(f"  '{safe_en}': {{ en: '{safe_en}', te: '{safe_te}' }},")

inject_str = "// Additional Py Translations\n" + "\n".join(lines) + "\n\n  // Footer"
content = content.replace("  // Footer", inject_str)

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)
