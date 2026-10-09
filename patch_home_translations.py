# -*- coding: utf-8 -*-
dict_data = {
    'Naidupalli Cricket': 'నాయుడుపల్లి క్రికెట్',
    'Upcoming Match': 'తదుపరి మ్యాచ్',
    'Recent Result': 'ముదుపు ఫలితం',
    'Winner:': 'విజేత:',
    'View Cricket Section': 'క్రికెట్ో త பகுதిని చూడండి',
    'Naidupalli Village': 'నాయుడుపల్లి గ్రామము',
    'Duttalur Mandal': 'దుట్టలూరు మండలం',
    'SPSR Nellore District': 'SPSR నెల్లూరు జిల్లా',
    'Andhra Pradesh, India': 'ఆంధ్రప్రదేశ్, భారతదేశం',
    'Find us on the map': 'మాప్‌లో మన్ను కనుగొనండి',
    'PIN: 524xxx': 'పిన్: 524xxx'
}

with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

lines = []
for en, te in dict_data.items():
    safe_en = en.replace("'", "\\'")
    safe_te = te.replace("'", "\\'")
    lines.append(f"  '{safe_en}': {{ en: '{safe_en}', te: '{safe_te}' }},")

inject_str = "// Home Page Additional Translations\n" + "\n".join(lines) + "\n\n  // Footer"
content = content.replace("  // Footer", inject_str)

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)