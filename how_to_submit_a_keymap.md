# Submitting a keymap to keymapdb.com

Here are the steps to follow in order to submit a new keymap to keymapdb.com. A GitHub account will be required.

1. Fork this repository
2. Clone your fork
3. Navigate to the `/src/posts/` directory (`cd keymapdb/src/posts`)
4. Create a new file following this format: `${keyboard_folder.replace("/", "_")}-${keymap_author}.md`
    Example: I'm called John and I want to submit my Dactyl Manuform 5x6 keymap. The QMK keyboard folder of the Dactyl Manuform 5x6 is `handwired/dactyl_manuform/5x6`.
    However, slashes are not allowed in a file name so I will have to replace each "/" by a "_", thus resulting in `handwired_dactyl_manuform_5x6`. Next, I'd write a "-" to separate the keyboard name and the keymap author name, followed by the username of the keymap author. Final result: `handwired_dactyl_manuform_5x6-John.md`
5. Copy-paste the following template (The leading `---` MUST be the the first line of the file):
```
---
author:
baseLayouts:
firmware:
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
7. Save and git commit the file
8. Open a merge/pull request to https://github.com/precondition/keymapdb that targets the `main` branch.
9. Wait
