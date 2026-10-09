dict_data = {
    'Next Match': 'తదుపరి మ్యాచ్',
    'more photos in the archive': 'ఆర్కైవ్‌లో మరిన్ని డాటాలు',
    'Celebration Video': 'వేడుక వీడియో',
    'Players in Squad': 'జట్టులోని క్రీడాకారులు',
    'Naidupalli Pirates': 'నాయుడుపల్లి పైరేట్స్'
}

with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

lines = []
for en, te in dict_data.items():
    safe_en = en.replace("'", "\'")
    safe_te = te.replace("'", "\'")
    lines.append(f"  '{safe_en}': {{ en: '{safe_en}', te: '{safe_te}' }},")

inject_str = "// Additional Py Translations 3\n" + "\n".join(lines) + "\n\n  // Footer"
content = content.replace("  // Footer", inject_str)

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)
