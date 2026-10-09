dict_data = {
    "Latest news, scholarships, and exams": "తాజా వార్తలు, స్కాలర్షిప్స్ మరియు పరీక్షలు",
    "Lakshmi Priya": "లక్ష్మి ప్రియ",
    "K. Vinay": "కె. వినయ్",
    "Don't miss out on village festivals and gatherings": "గ్రామ పండుగలు మరియు సమావేశాలను కోల్పోకండి",
    "Panchayat Dashboard": "పంచాయత్ డాష్‌బోర్డ్"
}

with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

lines = []
for en, te in dict_data.items():
    safe_en = en.replace("'", "\'")
    safe_te = te.replace("'", "\'")
    lines.append(f"  '{safe_en}': {{ en: '{safe_en}', te: '{safe_te}' }},")

inject_str = "// Additional Py Translations 2\n" + "\n".join(lines) + "\n\n  // Footer"
content = content.replace("  // Footer", inject_str)

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)
