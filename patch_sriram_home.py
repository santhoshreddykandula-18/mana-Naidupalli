with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("05 October 2026", "{t('05 October 2026')}")
text = text.replace("25 December 2025", "{t('25 December 2025')}")
text = text.replace('alt="Sri Ram Youth celebration"', 'alt={t("Sri Ram Youth celebration")}')
text = text.replace('alt="Sri Ram Youth community service"', 'alt={t("Sri Ram Youth community service")}')
text = text.replace('alt="Video thumbnail"', 'alt={t("Video thumbnail")}')

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(text)
