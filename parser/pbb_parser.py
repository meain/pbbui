import re
import json

FILENAME = "pbb.md"

data = open(FILENAME).read().split("\n")
heading = None
subheading = None
content = []
parsed = {}
is_code_block = False
for line in data:
    if line.startswith('```'):
        is_code_block = not is_code_block
    if line.startswith("##"):
        if not is_code_block:
            content = []
            subheading = re.sub("## *", "", line)
    elif line.startswith("#"):
        if not is_code_block:
            heading = re.sub("# *", "", line)
    else:
        content.append(line)

    if heading not in parsed:
        parsed[heading] = {}
    if subheading:
        parsed[heading][subheading] = content

open("../src/pbb.js", "w").write('const data = ' + json.dumps(parsed) + '\nexport default data')
