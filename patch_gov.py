import re

with open("src/pages/Government.tsx", "r", encoding="utf-8") as f:
    text = f.read()

reps = {
    '"Recent publications from the Gram Panchayat"': 't("Recent publications from the Gram Panchayat")'
}

for k,v in reps.items():
    text = text.replace(k,v)

with open("src/pages/Government.tsx", "w", encoding="utf-8") as f:
    f.write(text)

