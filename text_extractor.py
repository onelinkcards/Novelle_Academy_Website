import re

files = ["noH_xaaMvGTDPEfMwGamizuPwPfHIvXvuLVPbd-sXsw.Cy-pOWYK.mjs", "script_main.BXAIisQf.mjs"]

patterns = [
    r"Innovating[^\"\\]*",
    r"Novelle is a premium institution[^\"\\]*",
    r"About the Academy[^\"\\]*",
    r"Science, Art & Leadership[^\"\\]*",
    r"A pioneering vocational training institute[^\"\\]*",
    r"Our Programmes[^\"\\]*",
    r"World-Class Courses[^\"\\]*"
]

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
        for p in patterns:
            matches = re.findall(p, content, re.IGNORECASE)
            for m in matches:
                print(f"[{f}] {m}")
