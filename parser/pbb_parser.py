import re
import json
import requests

# https://raw.githubusercontent.com/dylanaraps/pure-bash-bible/master/README.md
# https://raw.githubusercontent.com/dylanaraps/writing-a-tui-in-bash/master/README.md
# https://raw.githubusercontent.com/denysdovhan/wtfjs/master/README.md


def get_json(url, base_indent):
    data = requests.get(url).text.split("\n")
    heading = None
    subheading = None
    content = []
    parsed = {}
    is_code_block = False
    ignored_headers = [
        "Table of Contents",
        "FOREWORD",
        "AFTERWORD",
        "References",
        "Contributing",
    ]

    for line in data:
        if line.startswith("```"):
            is_code_block = not is_code_block
        if line.startswith("#" + "#" * (base_indent + 1) + " "):
            if not is_code_block:
                content = []
                subheading = re.sub("#" + "#" * (base_indent + 1) + " *", "", line)
        elif line.startswith("#" + "#" * base_indent + " "):
            if re.sub("#" + "#" * base_indent + " *", "", line) in ignored_headers:
                heading = None
                continue
            if not is_code_block:
                subheading = None
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
        "name": "Pure sh Bible",
        "content": get_json(
            "https://raw.githubusercontent.com/dylanaraps/pure-sh-bible/master/README.md",
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
    {
        "name": "Frontend Checklist",
        "content": get_json(
            "https://raw.githubusercontent.com/thedaviddias/Front-End-Checklist/master/README.md",
            1,
        ),
    },
    {
        "name": "API Security Checklist",
        "content": get_json(
            "https://raw.githubusercontent.com/shieldfy/API-Security-Checklist/master/README.md",
            0,
        ),
    },
    # {
    #     "name": "Awesome list",
    #     "content": get_json(
    #         "https://raw.githubusercontent.com/sindresorhus/awesome/master/readme.md",
    #         1,
    #     ),
    # },
    # {
    #     "name": "Node best practices",
    #     "content": get_json(
    #         "https://raw.githubusercontent.com/goldbergyoni/nodebestpractices/master/README.md",
    #         0,
    #     ),
    # },
]

open("../src/pbb.js", "w").write(
    "/* eslint-disable */\nconst data = " + json.dumps(data) + "\nexport default data"
)
