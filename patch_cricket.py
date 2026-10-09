import re

with open('src/pages/Cricket.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the "Featured Players from Village Teams" block with empty string
pattern = re.compile(r'      \{\/\* Featured Players from Village Teams \*\/\}.*?      <\/section>', re.DOTALL)
text = pattern.sub('', text)

with open('src/pages/Cricket.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
