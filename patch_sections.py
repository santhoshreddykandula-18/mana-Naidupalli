import re

def wrap_section(file_path, comment, array_name):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    pattern = re.compile(rf'(\s*\{{\/\* {comment} \*\/\}}\s*)<section([^>]*)>(.*?)<\/section>', re.DOTALL)

    def replacer(match):
        prefix = match.group(1)
        section_attributes = match.group(2)
        inner = match.group(3)
        return prefix + '{' + array_name + '.length > 0 && (\n        <section' + section_attributes + '>' + inner + '</section>\n      )}'

    new_text = pattern.sub(replacer, text)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_text)

wrap_section('src/pages/Agriculture.tsx', 'Crop Information', 'crops')


with open('src/pages/Education.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern_edu = re.compile(r'(\s*)<section>(\s*<SectionHeader[^>]*title=\{t\(\'education\.updates\'\)\}[^>]*>.*?<\/section>)', re.DOTALL)
def replacer_edu(match):
    space = match.group(1)
    body = match.group(2)
    return space + '{educationPosts.length > 0 && (\n' + space + '<section>' + body + '\n' + space + ')}'

text = pattern_edu.sub(replacer_edu, text)
with open('src/pages/Education.tsx', 'w', encoding='utf-8') as f:
    f.write(text)