import re
import sys

def strip_dark_classes(content):
    # Regex to match `dark:some-class` respecting string boundaries
    # We match `dark:` followed by any non-whitespace, non-quote characters
    return re.sub(r'\s*dark:[\w\-/\[\]#]+', '', content)

files = [
    "src/pages/Agriculture.tsx",
    "src/components/agriculture/ChatInterface.tsx",
    "src/components/agriculture/ConfidenceMeter.tsx",
    "src/components/agriculture/ImageUploader.tsx",
    "src/components/agriculture/PredictionCard.tsx",
    "src/components/agriculture/SoilMetricsCard.tsx"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = strip_dark_classes(content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {file}")
