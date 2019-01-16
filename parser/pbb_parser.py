import re
import json
import requests

# https://raw.githubusercontent.com/dylanaraps/pure-bash-bible/master/README.md
# https://raw.githubusercontent.com/dylanaraps/writing-a-tui-in-bash/master/README.md


def get_json(url, base_indent):
    data = requests.get(url).text.split("\n")
    heading = None
    subheading = None
    content = []
    parsed = {}
    is_code_block = False
    ignored_headers = ["Table of Contents", "FOREWORD", "AFTERWORD", "References"]

    for line in data:
        if line.startswith("```"):
            is_code_block = not is_code_block
        if line.startswith("#" + "#" * (base_indent + 1)):
            if not is_code_block:
                content = []
                subheading = re.sub("#" + "#" * (base_indent + 1) + " *", "", line)
        elif line.startswith("#" + "#" * base_indent):
            if re.sub("#" + "#" * base_indent + " *", "", line) in ignored_headers:
                heading = None
                continue
            if not is_code_block:
                heading = re.sub("#" + "#" * base_indent + " *", "", line)
        elif line.startswith("<!--"):
            continue
        elif heading:
            content.append(line)

        if heading not in parsed and heading is not None:
            parsed[heading] = {}
        if subheading and heading in parsed:
            parsed[heading][subheading] = content
    return parsed


data = [
    {
        "name": "Pure Bash Bible",
        "content": get_json(
            "https://raw.githubusercontent.com/dylanaraps/pure-bash-bible/master/README.md",
            0,
        ),
    },
    {
        "name": "Writing a TUI in Bash",
        "content": get_json(
            "https://raw.githubusercontent.com/dylanaraps/writing-a-tui-in-bash/master/README.md",
            1,
        ),
    },
]

open("../src/pbb.js", "w").write(
    "/* eslint-disable */\nconst data = " + json.dumps(data) + "\nexport default data"
)
