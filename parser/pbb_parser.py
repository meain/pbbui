import re
import json
import requests

data = requests.get(
    "https://raw.githubusercontent.com/dylanaraps/pure-bash-bible/master/README.md"
).text.split('\n')


heading = None
subheading = None
content = []
parsed = {}
is_code_block = False
ignored_headers = ["Table of Contents", "FOREWORD", "AFTERWORD"]

for line in data:
    if line.startswith("```"):
        is_code_block = not is_code_block
    if line.startswith("##"):
        if not is_code_block:
            content = []
            subheading = re.sub("## *", "", line)
    elif line.startswith("#"):
        if re.sub("# *", "", line) in ignored_headers:
            heading = None
            continue
        if not is_code_block:
            heading = re.sub("# *", "", line)
    elif line.startswith("<!--"):
        continue
    elif heading:
        content.append(line)

    if heading not in parsed and heading is not None:
        parsed[heading] = {}
    if subheading and heading in parsed:
        parsed[heading][subheading] = content

open("../src/pbb.js", "w").write(
    "const data = " + json.dumps(parsed) + "\nexport default data"
)
