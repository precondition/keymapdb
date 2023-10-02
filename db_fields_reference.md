## author (string)
The name of the keymap's author.

Prefer the GitHub username when many aliases are possibles.

### Possible Values
- dustypomerleau 
- "alvaro-prieto" 
- precondition

## baseLayouts (array[categorical])
An array of all the base alpha layouts that the keymap offers. Ordered in the same way as in the keymap.

IMPORTANT: Only layout families are accepted. US QWERTY, ES QWERTY, and UK QWERTY all fall under the same family of "QWERTY" for example. Same thing for Vanilla Colemak, Colemak-DH, Colemaq etc. which are all variations of the Colemak family (Workman is its own family). Notably, QWERTZ and AZERTY are separate from QWERTY.

It's not rare to come across a keymap that has multiple base layouts hence the use of an array for the data type. However, if the main base layer of a keymap is Dvorak and it implements a QWERTY gaming layer, that doesn't mean QWERTY gets added to the array. Especially so, if it shifts QWERTY to the right to make WASD more comfortable on columnar stagger boards.

### Possible Values
- ["Colemak", "QWERTY"]
- [AZERTY]
- ["BEAKL"]

## firmwares (array[categorical])
The keyboard firmwares the keymap is made for.

Oryx, Via and Vial firmwares all fall under the "QMK" umbrella.

### Possible Values
- [QMK]
- [ZMK]
- [Kaleidoscope]
- [KMonad]
- [QMK, ZMK]

## hasHomeRowMods (bool)
Indicates whether the keymap uses home row mods.

Among [alternatives to home row mods](https://precondition.github.io/home-row-mods#alternatives), only [alternative layouts](https://precondition.github.io/home-row-mods#alternative-home-row-mods-layout) also pass this filter. All the rest (callum-style mods, upper row mods, ...) would result in `hasHomeRowMods` = false.

If there are at least four mod-taps on the home row, `hasHomeRowMods` should be set to true.

### Possible Values
- true
- false

## hasLetterOnThumb (bool)
Indicates whether the keymap uses one or more letters on the thumb keys of the base layer(s).

If there is at least *one* layout in the list of available base layouts that has a letter on thumb, this option should be set to true.

### Possible Values
- true
- false

## hasRotaryEncoder (bool)
Indicates whether the keymap uses one or more rotary encoders.

As long as the keymap contains rotary encoder code, regardless of whether or not the encoders are optional, this option should be set to true.

### Possible Values
- true
- false

## isAutoShiftEnabled (bool)
Indicates whether auto shift is enabled and used in the keymap. 

Check this even if you're using auto shift only on symbols; the slightest use of auto shift counts, this is not limited to auto shift on alphas.

### Possible Values
- true
- false

## isComboEnabled (bool)
Indicates whether combos are enabled and used in the keymap. 

Look for `COMBO_ENABLE` in the rules.mk file in case of a QMK firmware keymap. Search for the equivalent if the firmware is different.

### Possible Values
- true
- false

## isSplit (bool)
Indicates whether the keyboard is split or not.

The criteria is whether there is a space between the two main halves. Two-piece splits like the Kyria obviously fit and so do one-piece splits like the Atreus *and*, since the focus is on keymaps, a keymap that puts something like a numpad between the two main halves of the alpha block *also counts* ([example XD75](https://i.redd.it/w1u3i20mdynz.jpg)). The [wide mod for row stagger boards](https://colemakmods.github.io/ergonomic-mods/wide.html) also counts as split but the [angle mod](https://colemakmods.github.io/ergonomic-mods/angle.html) doesn't.

Note: One-handed keyboard layouts should set `isSplit` to `true`.

### Possible Values
- true
- false

## isTapDanceEnabled (bool)
Indicates whether tap dance is enabled and used in the keymap. 

### Possible Values
- true
- false

## keybindings (array[categorical])
Special keybindings schemes for which this keymap is optimized for.

Users of evil-based Emacs distros such as Spacemacs or Doom Emacs must tick "Vim" and not "Emacs", since this is about keybindings philosophy, not the actual program that the keymap author uses.

TWM stands for Tiling Windows Manager.

### Possible Values
- [Vim]
- [Emacs]
- [Kakoune]
- [Graphics/CAD]
- [TWM]
- [Spreadsheets]
- [Gaming]
- []            (None of the special keybindings above apply)


## keyboard (categorical)
The particular keyboard for which this keymap is designed.

First, check the keyboards drop-down list to see if your keyboard isn't already in the list, in which case you should just copy the existing name.

If your keyboard hasn't been added yet to keymapDB, use the keyboard name that makes the most sense. Don't include manufacturer and/or revision number and/or MCU type in the keyboard name unless it's necessary for disambiguation between similarly named keyboards with differing physical keyboard layouts.

Examples:
| Correct | Incorrect | Incorrect |
|---------|-----------|-----------|
| Kyria   | splitkb/kyria | Kyria rev.2 |
| Atreus | Atreus teensy2 | Keyboardio Atreus |

When a keymap is compatible with many different keyboards, pick the keyboard that most closely ressembles the keymap's layout. This will generally be the keyboard with the least amount of keys. People using multiple keyboards with a varying amount of keys share the same keymap among keyboards and mostly ignore the extra keys.

### Possible Values
- Dactyl Manuform 5x6
- Clueboard 66%
- Corne

## keyCount (integer)
The amount of physical keys required for the keymap. 

In case a keymap can be applied to multiple different keyboards with varying amount of physical keys, pick the minimum amount of keys required; no ranges.

### Possible Values
- 1 (min)
- 36
- 102
- 255

## keymapImage (string)
Link to a visual representation of the keymap in question. 

In most cases, this should be an externally hosted image (e.g. imgur) but hosting the keymap image directly in the repo at `src/assets/img/keymaps/` may be considered.

For best results, make sure to use a big font size for legends and high contrast. When displaying a split keymap, minimise the horizontal distance between the two halves. Good examples include [Pnohty](https://keymapdb.com/keymaps/rayduck/), [datagrok's layout for the Mitosis](https://keymapdb.com/keymaps/datagrok/), [alterecco's Ahokore](https://keymapdb.com/keymaps/alterecco-zmk/), and [Seniply](https://keymapdb.com/keymaps/stevep99/). In particular, avoid screenshots of ASCII art. They aren't very pretty and are unreadable from the home page.

### Possible Values
- "https://i.ibb.co/RQZx2dY/default-kyria2.jpg"
- precondition.jpg

## keymapUrl (string)
The link to the keymap *folder* files.

### Possible Values
- "https://github.com/qmk/qmk_firmware/tree/master/keyboards/minidox/keymaps/dustypomerleau" 
- "https://github.com/alvaro-prieto/corne" 
- https://github.com/precondition/dactyl-manuform-keymap/

## languages (array[categorical])
The (natural) languages this keymap is designed to be used in. The first language in the array is the main language.

Don't associate a region to the language e.g. don't use "English US" and "English UK" or "French FR" and "French BE", use just "English" and just "French". 

See the "ISO language name" column in the [list of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for a complete list of allowed values.

### Possible Values
- ["English", "French"]
- [Japanese, English]
- ["Russian", "English", "Greek", "Spanish"]

## layerCount (integer)
The amount of layers in the keymap.

For ease of use, the layer count slider is currently capped at 16 layers but if need be, layerCount can go up to 32 layers.

When a variable amount of layers is available in a keymap, enter the minimum amount of layers.

### Possible Values
- 1 (min)
- 8
- 16
- 32 (max)

## OS (array[categorical])
The operating system(s) used by the keymap author, sorted in descending order of usage.

### Possible Values
- ["Windows"]
- ["MacOS", "Windows"]
- ["Linux"]

## stagger (categorical)
The keyboard stagger for which the keymap is designed around. The effort grid can change from one stagger to another and so will an optimized keymap.

It must be all lowercase.

### Possible Values
- row
- columnar
- ortholinear

## summary (string or array[string])
Short summary (max. 60 words) of the keymap to show in the card, below the picture.

This is not a mandatory field. You can leave it empty with `summary: ""`.

It is also possible to use [YAML arrays](https://www.w3schools.io/file/yaml-arrays/) for a summary consisting of bullet points. However, those take up a considerable amount of vertical space, so use it in moderation and prefer normal strings when possible.

### Possible Values
- "Keymap for Corne Keyboard specially designed for software developers using macOS and Windows and writing in Spanish and English."
- "OS independent shortcuts, custom modifier keys, RGB themes, key sequences, and much more."
- "A combo-based layout for Ergonomic Keyboards, implemented in QMK"
- ""

## title (string)
The name of the keymap itself.

Most keymaps don't have an actual name like "Seniply", "Miryoku" or "T-34" so if you're feeling uninspired, just go for "&lt;author&gt;'s keymap for the &lt;keyboard&gt;".

### Possible Values
- Miryoku
- precondition's keymap for the Dactyl Manuform 5x6
- rafaelromao's keyboard layout

## writeup (string)
URL to the detailed write-up of the keymap which explains the rationale behind the design choices. 

It can be a README or a blog post.

This is not a mandatory field. If you haven't written a (detailed) write-up for your keymap, just set `writeup: ""`.

### Possible Values
- "https://github.com/skychil/kombol/blob/main/README.md"
- "http://thedarnedestthing.com/thumb%20h"
- ""

----

# Notes
The actual underlying data type of "categorical" is "string". The difference between "string" and "categorical" in the reference above is that "string" have little to no limitation in the range of values it can take, while "categorical" pick from a predefined list of accepted values. This list of accepted values may be extended if sufficiently convincing arguments are defended.

While the keymap entries have a `.md` extension denoting markdown files, they only contain [front matter data](https://www.11ty.dev/docs/data-frontmatter/), which uses [YAML syntax](https://learnxinyminutes.com/docs/yaml/), so don't try to use Markdown syntax like \*italic\* or \~\~crossed-out\~\~.
(This syntax-extension mismatch might be solved by modifying the website file structure but abusing 11ty's native markdown posts support is simply easier.)

Notably, this means that quotes are optional around strings, which is why some of the possible values given as examples are sometimes enclosed in quotes and sometimes not. Additionally, boolean values are case-insensitive; it doesn't matter whether you write `true` or `True` (don't use `1` for true and `0` for false though).
