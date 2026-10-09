with open("src/pages/Education.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("function EducationCard({ post }: { post: typeof educationPosts[0] }) {\n  return", "function EducationCard({ post }: { post: typeof educationPosts[0] }) {\n  const { t } = useLanguage();\n  return")

with open("src/pages/Education.tsx", "w", encoding="utf-8") as f:
    f.write(text)
