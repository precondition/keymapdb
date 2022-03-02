import re
import json
import os

with open("new_data.json", "r") as data_f:
    json_data = json.load(data_f)

assert os.getcwd().endswith(os.path.join("posts", "gen_keymap_posts"))

print(f"{len(json_data['keymaps'])=}")
for keymap in json_data["keymaps"]:
    url = keymap["url"]
    # Filename is in the format `keyboard-name-author-name`
    # e.g. `preonic-shwilliam`
    filename = url[url.find("/keyboards/")+11:]
    filename = filename.replace("/keymaps/", "-").replace("/", "-")
    filecontent = "---\nlayout: layouts/keymapdb_entry.njk\n"
    for key, value in keymap.items():
        if key == "author":
            key = "keymapAuthor"
        elif key == "image":
            key = "keymapImage"
        elif key == "name":
            # The name often has apostrophes (possessive 's) 
            # so they must be escaped in YAML fashion.
            value = '"' + re.sub("\[([^\]]*)\]\(http[^)]+\)", "\\1", value) + '"'
            key = "title"
        filecontent += f"{key}: {value}\n"
    filecontent += "---"
    with open("../" + filename + ".md", "w") as f:
        f.write(filecontent)

