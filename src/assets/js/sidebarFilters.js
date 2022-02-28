function isSliderMinMaxed(slider) {
    return slider.get().length >= 2 && slider.options.range.min === slider.get().at(0) && slider.options.range.max === slider.get().at(-1);
}

function getElementValue(element) {
    if (element instanceof HTMLSelectElement) {
       return Array.from(element.options).filter(option => option.selected).map(option => option.value).toString();
    }
    if (element instanceof HTMLInputElement && element.hasAttribute("type") && element.type === "checkbox") {
        return Array.from(document.querySelectorAll(`input[name=${element.name}]:checked`)).map(option => option.value).toString();
    }
    if ("noUiSlider" in element) {
        return element.noUiSlider.get().join("-");
    }
    return element.getAttribute("value");
}

function updateUrlSearchParams(element) {
    console.log("updating...");
    const urlSearchParams = new URLSearchParams(location.search);
    const value = getElementValue(element);
    const name = element.getAttribute("name");
    // Don't clutter the URL with the default all-encompassing filter value.
    if (value === "" || ("noUiSlider" in element && isSliderMinMaxed(element.noUiSlider))) {
        urlSearchParams.delete(name);
    } else if ("checked" in element && urlSearchParams.get(name) === value) {
        // Checking an option adds it to the URL so if the user clicks on an option that was already present in the URL,
        // it means they clicked on a checked input element, in which case we uncheck it and remove it from the URL.
        element.checked = false;
        urlSearchParams.delete(name);
    } else {
        urlSearchParams.set(name, value);
    }
    const urlSearchParamsString = urlSearchParams.toString() === "" ? "" : "?" + urlSearchParams.toString();
    // Update the search params in the URL
    location.search = urlSearchParams.toString();
    //history.replaceState({}, "", urlSearchParamsString);
    syncSidebarFilters();
    syncPaginationButtons();
}

function disableHrefButton(a) {
    // See https://stackoverflow.com/a/10276157
    // Remove pointer events, gray it out etc.
    a.classList.add("disabled");
    // Clearing the link.
    a.href = "javascript:void(0)";
    // Prevent a from being selected by tabbing through the page
    a.setAttribute("tabindex", -1);
}

function enableHrefButton(a) {
    // See https://stackoverflow.com/a/10276157
    a.classList.remove("disabled");
    a.href = a.getAttribute("href-if-enabled");
    // Add back a into the "tab tree" of the page
    a.removeAttribute("tabindex");
}

function syncPaginationButtons() {
    const urlSearchParams = new URLSearchParams(location.search);
    [matchedString, start, end, total] = $("showing-n-results").innerText.match(/Showing ([0-9]+) to ([0-9]+) of ([0-9]+) results found/);
    // start == 0 is a special case that occurs when the user is on a page that's beyond the total amount of pages for this search.
    if (Number(start) > 1 || Number(start) === 0) {
        enableHrefButton($("previous-button"));
        $("previous-button").search = urlSearchParams;
    } else {
        disableHrefButton($("previous-button"));
    }
    if (Number(end) < Number(total)) {
        enableHrefButton($("next-button"));
        $("next-button").search = urlSearchParams;
    } else {
        disableHrefButton($("next-button"));
    }
    console.log("search of next button is now = " + $("next-button").search);
}

function syncSidebarFilters() {
    const urlSearchParams = new URLSearchParams(location.search);
    for (const [fieldName, fieldValue] of urlSearchParams.entries()) {
        let elements = document.getElementsByName(fieldName);
        for (let element of elements) {
            if ("checked" in element) {
                const fieldValuesArray = fieldValue.split(",");
                element.checked = fieldValuesArray.includes(element.value);
            } else if ("noUiSlider" in element) {
                const slider = element.noUiSlider;
                const fieldValuesArray = fieldValue.split("-");
                slider.set(fieldValuesArray);
            } else if (element instanceof HTMLSelectElement) {
                if (element.multiple) {
                    const options = element.options;
                    const fieldValuesArray = fieldValue.split(",");
                    for (const option of options) {
                        option.selected = fieldValuesArray.includes(option.value);
                    }
                } else {
                    element.value = fieldValue;
                    if (element.selectedIndex === -1) {
                        alert(`The ${fieldName} "${fieldValue}" is not present in the database!\nReverting to "Any".`);
                        element.selectedIndex = 0;
                    }
                }
            }
        }
    }
}

window.onload = function() {
    syncSidebarFilters();
    syncPaginationButtons()
};

function resetSidebarFilters() {
    const urlSearchParams = new URLSearchParams(location.search);
    for (const [fieldName, fieldValue] of urlSearchParams.entries()) {
        let elements = document.getElementsByName(fieldName);
        for (let element of elements) {
            if ("checked" in element) {
                element.checked = false;
            } else if ("noUiSlider" in element) {
                const slider = element.noUiSlider;
                slider.set(slider.options.start);
            } else if (element instanceof HTMLSelectElement) {
                if (element.multiple) {
                    const options = element.options;
                    for (const option of options) {
                        option.selected = false;
                    }
                } else {
                    element.selectedIndex = 0;
                }
            }
        }
    }
    // Remove filters from the URL
    history.replaceState({}, "", location.pathname);
}
