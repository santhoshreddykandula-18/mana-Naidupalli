import re

with open("src/pages/Cricket.tsx", "r", encoding="utf-8") as f:
    text = f.read()

reps = {
    "Next Match": "{t('Next Match')}",
    "24} more photos in the archive": "24} {t('more photos in the archive')}",
    "Celebration Video": "{t('Celebration Video')}",
    "Players in Squad": "{t('Players in Squad')}",
    "<p className=\"text-xs text-text-secondary\">Naidupalli Pirates</p>": "<p className=\"text-xs text-text-secondary\">{t('Naidupalli Pirates')}</p>"
}

for k,v in reps.items():
    text = text.replace(k,v)

with open("src/pages/Cricket.tsx", "w", encoding="utf-8") as f:
    f.write(text)

