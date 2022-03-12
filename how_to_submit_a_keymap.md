# Submitting a keymap to keymapdb.com

Here are the steps to follow in order to submit a new keymap to keymapdb.com. A GitHub account will be required.

1. Fork this repository
2. Clone your fork
3. Navigate to the `/src/posts/` directory (`cd keymapdb/src/posts`)
4. Create a new file with the `.md` extension, named after your username. All hyphens, "-", present in your username must be replaced with an underscore, "\_" (this substitution is not necessary in the "author" field, it is only necessary in the file name). For example, if my username is "week-end", I would create a file called `week_end.md` and write `author: week-end` inside.
<br><br>
In the rare case if you've made two or more *considerably different* keymaps (e.g. a main, daily driver, dactyl keymap and an experimental 7-key one-handed Macedonian keymap), you can disambiguate the file names of your keymaps by appending an extra chunk of identifiable information after your username and a hyphen, like so: `<your_username>-<extra_chunk>.md`. The extra chunk should preferably use `snake_case` over `kebab-case`.<br>
Examples: `week_end.md` and `week_end-one_handed.md` or `week_end-dactyl.md` and `week_end-chorded_macedonian.md`.

5. Copy-paste the following template:
```
---
author:
baseLayouts:
firmwares:
hasHomeRowMods:
hasLetterOnThumb:
hasRotaryEncoder:
isAutoShiftEnabled:
isComboEnabled:
isSplit:
isTapDanceEnabled:
keybindings:
keyboard:
keyCount:
keymapImage:
keymapUrl:
languages:
layerCount:
OS:
stagger:
summary:
title:
writeup:
---
```
6. Look up the [database fields reference](db_fields_reference.md) document to figure out how to fill in the blanks after the colons
7. Make sure that the leading `---` is the first line in the file.
8. Make sure to leave a single space after each colon. In other words, it should look like `key: value`. `key:value` is not correct.
9. Save and git commit the file
10. Open a merge/pull request to https://github.com/precondition/keymapdb that targets the `main` branch.
11. Wait
