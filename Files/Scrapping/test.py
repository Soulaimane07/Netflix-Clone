import re

text = "Vikings: Valhalla"
clean_text = re.sub(r'[^\w\s]', '', text)
newtext = clean_text.replace(' ', '+')
print(newtext)

