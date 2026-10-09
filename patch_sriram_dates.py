dict_data = {
    '05 October 2026': '05 అక్టోబర్ 2026',
    '25 December 2025': '25 డిసెంబర్ 2025',
    'Sri Ram Youth celebration': 'శ్రీ రామ యువత వేడుక',
    'Sri Ram Youth community service': 'శ్రీ రామ యువత సముదాయ సేవ',
    'Video thumbnail': 'వీడియో థంబ్నైల్'
}

with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

lines = []
for en, te in dict_data.items():
    safe_en = en.replace("'", "\'")
    safe_te = te.replace("'", "\'")
    lines.append(f"  '{safe_en}': {{ en: '{safe_en}', te: '{safe_te}' }},")

inject_str = "// Sri Ram Youth Additional Translations\n" + "\n".join(lines) + "\n\n  // Footer"
content = content.replace("  // Footer", inject_str)

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)
