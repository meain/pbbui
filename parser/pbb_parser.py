import json
import re

import requests


def get_json(url, base_indent):
    print("processing:", url)
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


def arr_to_dict(x):
    return {
        "name": x[0],
        "content": get_json(x[1], x[2]),
    }


data = list(
    map(
        arr_to_dict,
        [
            [
                "Pure Bash Bible",
                "https://raw.githubusercontent.com/dylanaraps/pure-bash-bible/master/README.md",
                0,
            ],
            [
                "Pure sh Bible",
                "https://raw.githubusercontent.com/dylanaraps/pure-sh-bible/master/README.md",
                0,
            ],
            [
                "Writing a TUI in Bash",
                "https://raw.githubusercontent.com/dylanaraps/writing-a-tui-in-bash/master/README.md",
                1,
            ],
            [
                "Frontend Checklist",
                "https://raw.githubusercontent.com/thedaviddias/Front-End-Checklist/master/README.md",
                1,
            ],
            [
                "API Security Checklist",
                "https://raw.githubusercontent.com/shieldfy/API-Security-Checklist/master/README.md",
                0,
            ],
            [
                "The Art of Command Line",
                "https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md",
                0,
            ],
            [
                "Neovim lua guide",
                "https://raw.githubusercontent.com/nanotee/nvim-lua-guide/master/README.md",
                0,
            ],
        ],
    )
)

open("../src/pbb.js", "w").write(
    "/* eslint-disable */\nconst data = " + json.dumps(data) + "\nexport default data"
)
