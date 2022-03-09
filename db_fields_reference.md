## author (string)
The name of the keymap's author.

Prefer the GitHub username when many aliases are possibles.

### Possible Values
- dustypomerleau 
- "alvaro-prieto" 
- precondition

## keymapUrl (string)
The link to the keymap *folder* files.
### Possible Values
- "https://github.com/qmk/qmk_firmware/tree/master/keyboards/minidox/keymaps/dustypomerleau" 
- "https://github.com/alvaro-prieto/corne" 
- https://github.com/precondition/dactyl-manuform-keymap/

## keymapImage (string)
Link to a visual representation of the keymap in question. 

In most cases, this should be an externally hosted image (e.g. imgur) but hosting the keymap image directly in the repo may be considered.

### Possible Values
- "https://media.discordapp.net/attachments/663573863480950808/876552871309639780/unknown.png"
- "https://i.ibb.co/RQZx2dY/default-kyria2.jpg"


## keyCount (integer)
The amount of physical keys required for the keymap. 

In case a keymap can be applied to multiple different keyboards with varying amount of physical keys, pick the minimum amount of keys required; no ranges.

### Possible Values
- 1 (min)
- 36
- 102
- 255

## firmware (categorical)
The keyboard firmware the keymap is made for.

KeymapDB was designed mostly for QMK keymaps so alternative firmwares are kind of second-class citizens.

### Possible Values
- QMK
- "ZMK"
- Kaleidoscope

## baseLayouts (array[categorical])
An array of all the base alpha layouts that the keymap offers. Ordered in the same way as in the keymap.

IMPORTANT: Only layout families are accepted. US QWERTY, ES QWERTY, and UK QWERTY all fall under the same family of "QWERTY" for example. Same thing for Vanilla Colemak, Colemak-DH, Colemaq etc. which are all variations of the Colemak family (Workman is its own family). Notably, QWERTZ and AZERTY are separate from QWERTY.

It's not rare to come across a keymap that has multiple base layouts hence the use of an array for the data type. However, if the main base layer of a keymap is Dvorak and it implements a QWERTY gaming layer, that doesn't mean QWERTY gets added to the array. Especially so, if it shifts QWERTY to the right to make WASD more comfortable on columnar stagger boards.

### Possible Values
- ["Colemak", "QWERTY"]
- [AZERTY]
- ["BEAKL"]

## keyboard (categorical)
The particular keyboard for which this keymap is designed.

To obtain the name of a keyboard that supports QMK, run the command `qmk info -kb <keyboard_folder>` and look up the "Keyboard Name" attribute.
Some keyboards can support many different firmwares, including QMK. If the keymap is for another firmware but still targets a keyboard supported by QMK, the same procedure described above should be used to obtain the name.

If the keyboard is not supported by QMK at all, use a keyboard name that makes the most sense.

When a keymap is compatible with many different keyboards, pick the keyboard that mostly closely ressembles the keymap's layout.

This field could have been an array[categorical] but I didn't feel like keeping up with Miryoku's ever increasing list of supported keyboards.

<details>
<summary>Just look at this huge list</summary>

- 1upkeyboards/1up60hse
- 1upkeyboards/1up60rgb
- 40percentclub/4x4
- 40percentclub/5x5
- 40percentclub/i75
- 40percentclub/luddite
- 40percentclub/nori
- acheron/keebspcb
- acheron/lasgweloth
- acheron/shark
- ai03/polaris
- akegata_denki/device_one
- alps64
- amj60
- atxkb/1894
- bakeneko60
- bastardkb/tbkmini
- bioi/g60ble
- bm60poker
- bm60rgb
- boardsource/4x12
- boardsource/5x12
- boardsource/microdox
- bt66tech/bt66tech60
- cannonkeys/an_c
- cannonkeys/atlas_alps
- cannonkeys/db60/hotswap
- cannonkeys/db60/j02
- cannonkeys/db60/rev2
- cannonkeys/instant60
- cannonkeys/ortho48
- cannonkeys/ortho60
- cannonkeys/ortho75
- cannonkeys/practice60
- centromere
- clawsome/coupe
- contra
- crkbd
- dm9records/plaid
- dm9records/tartan
- do60
- dp60
- duck/eagle_viper
- dz60
- eek
- efreet
- ergodox_ez
- ergodox_infinity
- evyd13/eon40
- evyd13/plain60
- evyd13/pockettype
- exclusive/e6_rgb
- exclusive/e6v2/le
- exclusive/e6v2/oe
- facew
- foxlab/leaf60/universal
- geminate60
- gh60/revc
- gh60/satan
- gh60/v1p3
- gskt00
- handwired/aranck
- handwired/co60/rev1
- handwired/co60/rev7
- handwired/floorboard
- handwired/heisenberg
- handwired/jot50
- handwired/jotanck
- handwired/riblee_f401
- handwired/riblee_f411
- handwired/rs60
- handwired/swiftrax/nodu
- handwired/wulkan
- handwired/xealousbrown
- hineybush/h60
- hotdox newgame40
- hs60/v1
- hs60/v2/ansi
- idobo
- inett_studio/sqx/universal
- infinity60
- jj40
- jj50
- jm60
- jnao
- kbdfans/kbd4x
- kc60
- kc60se
- keebio/levinson
- keebio/nyquist/rev1
- keebio/nyquist/rev2
- keebio/nyquist/rev3
- keebio/nyquist/rev3 atomic
- keebio/wavelet
- keebio/wtf60
- keycapsss/o4l_5x12
- latin47ble
- lets_split
- lets_split_eh
- marksard/rhymestone
- mechstudio/ud_40_ortho
- meira
- melgeek/mj61/rev1
- melgeek/mj61/rev2
- melgeek/mj63/rev1
- melgeek/mj63/rev2
- miniaxe
- minidox/rev1
- montsinger/rebound/rev1
- montsinger/rebound/rev2
- montsinger/rebound/rev3
- montsinger/rebound/rev4
- mt40
- nimrod
- niu_mini
- noxary/260
- ok60
- org60
- pabile/p40 chimera_ls
- paladin64
- panc60
- peej/lumberjack
- planck/ez
- planck/light
- planck/rev1
- planck/rev2
- planck/rev3
- planck/rev4
- planck/rev5
- planck/rev6
- planck/thk
- playkbtw/pk60
- preonic/rev1
- preonic/rev2
- preonic/rev3
- pteron36
- punk75
- quark
- reviung61
- rgbkb/zygomorph
- ryloo_studio/m0110
- sendyyeah/75pixels bm40hsrgb
- sentraq/s60_x/default
- sentraq/s60_x/rgb.  ergodone
- signum/3_0/elitec
- smk60
- spaceman/pancake/feather
- spaceman/pancake/promicro
- spaceman/pancake/promicro arch_36
- squiggle/rev1
- suihankey/split/rev1 centromere
- tau4
- telophase
- thevankeyboards/bananasplit
- v60_type_r
- vitamins_included
- wilba_tech/zeal60
- xd60/rev2
- xd60/rev3
- xd75
- yd60mq
- ymdk/ymd40/v2 fractal
- zlant
- zvecr/split_blackpill
- zvecr/zv48

</details>

### Possible Values
- Dactyl-Manuform (5x6)
- Clueboard 66% rev4
- Corne

## title (string)
The name of the keymap itself.

Most keymaps don't have an actual name like "Seniply", "Miryoku" or "T-34" so if you're feeling uninspired, just go for "<author>'s keymap for the <keyboard>".

### Possible Values
- Miryoku
- precondition's keymap for the Dactyl Manuform 5x6
- rafaelromao's keyboard layout

## stagger (categorical)
The keyboard stagger for which the keymap is designed around. The effort grid can change from one stagger to another and so will an optimized keymap.

### Possible Values
- row
- columnar
- ortholinear

## isSplit (bool)
Whether the keyboard is split or not.

The criteria is whether there is a space between the two main halves. Two-piece splits like the Kyria obviously fit and so do one-piece splits like the Polilla *and*, since the focus is on keymaps, a keymap that puts something like a numpad between the two main halves of the alpha block *also counts* ([example XD75](https://i.redd.it/w1u3i20mdynz.jpg)). The [wide mod for row stagger boards](https://colemakmods.github.io/ergonomic-mods/wide.html) also counts as split but the [angle mod](https://colemakmods.github.io/ergonomic-mods/angle.html) doesn't.

### Possible Values
- True
- False

## languages (array[categorical])
The (natural) languages this keymap is designed to be used in. The first language in the array is the main language.

Don't associate a region to the language e.g. don't use "English US" and "English UK" or "French FR" and "French BE", use just "English" and just "French". 

See the "ISO language name" column in the [list of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for a complete list of allowed values.

### Possible Values
- ["English", "French"]
- [Japanese, English]
- ["Russian", "English", "Greek", "Spanish"]

## summary (string)
Short summary (max. 140 words) of the keymap to show in the card, below the picture.

### Possible Values
- "Keymap for Corne Keyboard specially designed for software developers using macOS and Windows and writing in Spanish and English."
- "OS independent shortcuts, custom modifier keys, RGB themes, key sequences, and much more."
- "A combo-based layout for Ergonomic Keyboards, implemented in QMK"

## writeup (string)
URL to the detailed write-up of the keymap which explains the rationale behind the design choices. 

It can be a README or a blog post.

### Possible Values
- "https://github.com/skychil/kombol/blob/main/README.md"
- "http://thedarnedestthing.com/thumb%20h"

## OS (array[categorical])
The operating system(s) used by the keymap author, sorted in descending order of usage.

### Possible Values
- ["Windows"]
- ["MacOS", "Windows"]
- ["Linux"]

## keybindings (array[categorical])
Keybindings schemes for which this keymap is optimized for.

Users of evil-based Emacs distros such as Spacemacs or Doom Emacs must tick "Vim" and not "Emacs", since this is about keybindings philosophy, not the actual program that the keymap author uses.

TWM stands for Tiling Windows Manager.

Warning: This is an experimental option that might get removed or severely modified in the future.

### Possible Values
- Vim
- Emacs
- Kakoune
- Graphics/CAD
- TWM
- Spreadsheets
- Gaming

## hasRotaryEncoder (bool)
Indicates whether the keymap uses one or more rotary encoders.

### Possible Values
- True
- False

## hasLetterOnThumb (bool)
Indicates whether the keymap uses one or more letters on the thumb keys of the base layer(s).

### Possible Values
- True
- False

## layerCount (integer)
The amount of layers in the keymap.

For ease of use, the layer count slider is currently capped at 16 layers but if need be, layerCount can go up to 32 layers.

### Possible Values
- 1 (min)
- 8
- 16
- 32 (max)

## isComboEnabled (bool)
Whether combos are enabled and used in the keymap. 

Look for `COMBO_ENABLE` in the rules.mk file in case of a QMK firmware keymap. Search for the equivalent if the firmware is different.

### Possible Values
- True
- False

## isTapDanceEnabled (bool)
Whether tap dance is enabled and used in the keymap. 

### Possible Values
- True
- False

## isAutoShiftEnabled (bool)
Whether auto shift is enabled and used in the keymap. 

### Possible Values
- True
- False

## hasHomeRowMods (bool)
Indicates whether the keymap uses home row mods.

Among [alternatives to home row mods](https://precondition.github.io/home-row-mods#alternatives), only [alternative layouts](https://precondition.github.io/home-row-mods#alternative-home-row-mods-layout) also pass this filter. All the rest (callum-style mods, upper row mods, ...) would result in `hasHomeRowMods` = false.

### Possible Values
- True
- False

----

# Notes
The actual underlying data type of "categorical" is "string". The difference between "string" and "categorical" in the reference above is that "string" have little to no limitation in the range of values it can take, while "categorical" pick from a predefined list of accepted values. This list of accepted values may be extended if sufficiently convincing arguments are defended.
