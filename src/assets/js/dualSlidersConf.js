let keyCountSlider = $('keyCountSlider');
let layerCountSlider = $('layerCountSlider');

const MAX_KEY_COUNT = 120;
const keyCountPipsStep = 20;
let keyCountPips = [1]
for (let v = keyCountPipsStep; v <= MAX_KEY_COUNT ; v += keyCountPipsStep) {
    keyCountPips.push(v);
}

noUiSlider.create(keyCountSlider, {
    start: [1, MAX_KEY_COUNT],
    connect: true,
    step: 1,
    tooltips: true,
    format: {
        to: (numberValue) => Math.round(numberValue),
        from: (stringValue) => Number(stringValue.replace(',-', ''))
    },
    pips: {
        mode: 'values',
        values: keyCountPips,
        density: 4
    },
    range: {
        'min': 1,
        'max': MAX_KEY_COUNT
    }
});

// Ignore all parameters passed to the callback
keyCountSlider.noUiSlider.on("change",
    noUiSliderCallbackArgs => updateUrlSearchParams(keyCountSlider));

/* Layers can go up to 32 in QMK but it's very unlikely to encounter more than
 * 16 layers in a keymap so in order to make the slider more comfortable to use,
 * we limit the max to 16. However, we can and should change that if we do find
 * a keymap with more 16 layers.
 */
const MAX_LAYER_COUNT = 16;
const layerCountPipsStep = 4;
let layerCountPips = [1]
for (let v = layerCountPipsStep; v <= MAX_LAYER_COUNT ; v += layerCountPipsStep) {
    layerCountPips.push(v);
}

noUiSlider.create(layerCountSlider, {
    start: [1, MAX_LAYER_COUNT],
    connect: true,
    step: 1,
    tooltips: true,
    format: {
        to: (numberValue) => Math.round(numberValue),
        from: (stringValue) => Number(stringValue.replace(',-', ''))
    },
    pips: {
        mode: 'values',
        values: layerCountPips,
        density: 7,
    },
    range: {
        'min': 1,
        'max': MAX_LAYER_COUNT,
    }
});

// Ignore all parameters passed to the callback
layerCountSlider.noUiSlider.on("change",
    noUiSliderCallbackArgs => updateUrlSearchParams(layerCountSlider));


// Source: https://refreshless.com/nouislider/examples/#section-merging-tooltips
/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider, threshold, separator) {

    var textIsRtl = getComputedStyle(slider).direction === 'rtl';
    var isRtl = slider.noUiSlider.options.direction === 'rtl';
    var isVertical = slider.noUiSlider.options.orientation === 'vertical';
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
        if (tooltip) {
            origins[index].appendChild(tooltip);
        }
    });

    slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {

        var pools = [[]];
        var poolPositions = [[]];
        var poolValues = [[]];
        var atPool = 0;

        // Assign the first tooltip to the first pool, if the tooltip is configured
        if (tooltips[0]) {
            pools[0][0] = 0;
            poolPositions[0][0] = positions[0];
            poolValues[0][0] = values[0];
        }

        for (var i = 1; i < positions.length; i++) {
            if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
                atPool++;
                pools[atPool] = [];
                poolValues[atPool] = [];
                poolPositions[atPool] = [];
            }

            if (tooltips[i]) {
                pools[atPool].push(i);
                poolValues[atPool].push(values[i]);
                poolPositions[atPool].push(positions[i]);
            }
        }

        pools.forEach(function (pool, poolIndex) {
            var handlesInPool = pool.length;

            for (var j = 0; j < handlesInPool; j++) {
                var handleNumber = pool[j];

                if (j === handlesInPool - 1) {
                    var offset = 0;

                    poolPositions[poolIndex].forEach(function (value) {
                        offset += 1000 - value;
                    });

                    var direction = isVertical ? 'bottom' : 'right';
                    var last = isRtl ? 0 : handlesInPool - 1;
                    var lastOffset = 1000 - poolPositions[poolIndex][last];
                    offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                    // Filter out duplicate tool tip values
                    var tooltipValues = poolValues[poolIndex].filter((v, i, a) => a.indexOf(v) === i);

                    // Center this tooltip over the affected handles
                    tooltips[handleNumber].innerHTML = tooltipValues.join(separator);
                    tooltips[handleNumber].style.display = 'block';
                    tooltips[handleNumber].style[direction] = offset + '%';
                } else {
                    // Hide this tooltip
                    tooltips[handleNumber].style.display = 'none';
                }
            }
        });
    });
}

// Not an ASCII hyphen, the separator is an en-dash
//<–> 8211, Hex 2013, Oct 20023, Digr -N
mergeTooltips(keyCountSlider, 15, '–');
mergeTooltips(layerCountSlider, 15, '–');
