with open("src/pages/Education.tsx", "r", encoding="utf-8") as f:
    content = f.read()

reps = {
    "Information on schools, scholarships, exams, and student achievements in Naidupalli.": "{t('Information on schools, scholarships, exams, and student achievements in Naidupalli.')}",
    "Latest news, scholarships, and exams": "{t('Latest news, scholarships, and exams')}",
    "Zilla Parishad High School": "{t('Zilla Parishad High School')}",
    "High School (Govt)": "{t('High School (Govt)')}",
    "6th to 10th": "{t('6th to 10th')}",
    "400+ Students": "{t('400+ Students')}",
    "Mandal Parishad Primary School": "{t('Mandal Parishad Primary School')}",
    "Primary School (Govt)": "{t('Primary School (Govt)')}",
    "1st to 5th": "{t('1st to 5th')}",
    "250+ Students": "{t('250+ Students')}",
    "Lakshmi Priya": "{t('Lakshmi Priya')}",
    "State Level Essay Writing - 1st Prize": "{t('State Level Essay Writing - 1st Prize')}",
    "K. Vinay": "{t('K. Vinay')}",
    "District Sports Meet - Gold in 100m": "{t('District Sports Meet - Gold in 100m')}",
    "Access online study materials and mock tests provided by the state education board.": "{t('Access online study materials and mock tests provided by the state education board.')}",
    "Access Materials": "{t('Access Materials')}",
    "Learn More": "{t('Learn More')}",
    "{post.category}": "{t(post.category)}",
    "{school.name}": "{t(school.name)}",
    "{school.type}": "{t(school.type)}",
    "{school.classes}": "{t(school.classes)}",
    "{school.stats}": "{t(school.stats)}"
}

for k, v in reps.items():
    content = content.replace(k, v)

with open("src/pages/Education.tsx", "w", encoding="utf-8") as f:
    f.write(content)
