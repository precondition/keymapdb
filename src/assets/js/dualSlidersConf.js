let keyCountSlider = document.getElementById('keyCountSlider');
let layerCountSlider = document.getElementById('layerCountSlider');

noUiSlider.create(keyCountSlider, {
    start: [30, 60],
    connect: true,
    step: 1,
    tooltips: true,
    format: {
        to: (numberValue) => Math.ceil(numberValue),
        from: (stringValue) => Number(stringValue.replace(',-', ''))
    },
    pips: {
        mode: 'values',
        values: [1, 20, 40, 60, 80, 100, 120],
        density: 4
    },
    range: {
        'min': 1,
        'max': 120
    }
});

// TODO: Show "16+" as last element of slider
noUiSlider.create(layerCountSlider, {
    start: [1, 32],
    connect: true,
    step: 1,
    tooltips: true,
    format: {
        to: (numberValue) => Math.ceil(numberValue),
        from: (stringValue) => Number(stringValue.replace(',-', ''))
    },
    pips: {
        mode: 'values',
        values: [1, 4, 8, 16],
        density: 4
    },
    range: {
        'min': 1,
        'max': 16,
    }
});

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

                    // Center this tooltip over the affected handles
                    tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
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
