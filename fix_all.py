# Fix LanguageContext.tsx
with open("src/context/LanguageContext.tsx", "r", encoding="utf-8") as f:
    lc = f.read()

lc = lc.replace("'Don't miss out", "\"Don't miss out")
lc = lc.replace("atherings': { en: 'Don't miss out", "atherings\": { en: \"Don't miss out")
lc = lc.replace("atherings', te", "atherings\", te")

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(lc)

# Fix Education.tsx
with open("src/pages/Education.tsx", "r", encoding="utf-8") as f:
    ed = f.read()

ed = ed.replace("'{t('Zilla Parishad High School')}'", "'Zilla Parishad High School'")
ed = ed.replace("'{t('High School (Govt)')}'", "'High School (Govt)'")
ed = ed.replace("'{t('6th to 10th')}'", "'6th to 10th'")
ed = ed.replace("'{t('400+ Students')}'", "'400+ Students'")
ed = ed.replace("'{t('Mandal Parishad Primary School')}'", "'Mandal Parishad Primary School'")
ed = ed.replace("'{t('Primary School (Govt)')}'", "'Primary School (Govt)'")
ed = ed.replace("'{t('1st to 5th')}'", "'1st to 5th'")
ed = ed.replace("'{t('250+ Students')}'", "'250+ Students'")

with open("src/pages/Education.tsx", "w", encoding="utf-8") as f:
    f.write(ed)

# Fix Home.tsx 
with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    hm = f.read()

hm = hm.replace('"{t(\"Don\'t miss out', '{t("Don\'t miss out')
hm = hm.replace('gatherings\")}"', 'gatherings")}')
hm = hm.replace('"{t(\'Temples of Naidupalli\')}"', "{t('Temples of Naidupalli')}")
hm = hm.replace('"{t(\'Our spiritual heritage and cultural centers\')}"', "{t('Our spiritual heritage and cultural centers')}")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(hm)
