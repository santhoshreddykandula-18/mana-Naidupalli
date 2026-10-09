with open("src/pages/Education.tsx", "r", encoding="utf-8") as f:
    text = f.read()
import re

text = re.sub(
    r'<img\s+src="https://images\.unsplash\.com/[^>]+>',
    '',
    text
)
with open("src/pages/Education.tsx", "w", encoding="utf-8") as f:
    f.write(text)


with open("src/pages/Emergency.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(
    r'<img\s+src="https://images\.unsplash\.com/[^>]+>',
    '',
    text
)
with open("src/pages/Emergency.tsx", "w", encoding="utf-8") as f:
    f.write(text)


with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace(
    'src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600"',
    'src="/sri-ram-youth/photos/bg3.png"'
)
with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(text)

