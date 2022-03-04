function isSliderMinMaxed(slider) {
    return slider.get().length >= 2 && slider.options.range.min === slider.get().at(0) && slider.options.range.max === slider.get().at(-1);
}

function isCheckable(element) {
    // For an obscure reason, `<input type="text">` also have a `checked`
    // property so verifying `"checked" in element` is not sufficient.
    return "checked" in element && element.hasAttribute("type") &&
        (element.type === "radio" || element.type === "checkbox");
}
function getElementValue(element) {
    if (element instanceof HTMLSelectElement) {
       return Array.from(element.options).filter(option => option.selected).map(option => option.value).toString();
    }
    if (element instanceof HTMLInputElement && element.hasAttribute("type")) {
        if (element.type === "checkbox") {
            return Array.from(document.querySelectorAll(`input[name=${element.name}]:checked`)).map(option => option.value).toString();
        } else if (element.type === "text") {
            return element.value;
        }
    }
    if ("noUiSlider" in element) {
        return element.noUiSlider.get().join("-");
    }
    return element.getAttribute("value");
}

function updateUrlSearchParams(element) {
    const urlSearchParams = new URLSearchParams(location.search);
    const value = getElementValue(element);
    const name = element.getAttribute("name");
    // Don't clutter the URL with the default all-encompassing filter value.
    if (value === "" || ("noUiSlider" in element && isSliderMinMaxed(element.noUiSlider))) {
        urlSearchParams.delete(name);
    } else if (isCheckable(element) && urlSearchParams.get(name) === value) {
        // Checking an option adds it to the URL so if the user clicks on an option that was already present in the URL,
        // it means they clicked on a checked input element, in which case we uncheck it and remove it from the URL.
        element.checked = false;
        urlSearchParams.delete(name);
    } else {
        urlSearchParams.set(name, value);
    }
    // Go back to page 1 (aka root of the website) and append the URL search params to the URL.
    const isIteratorEmpty = urlSearchParams.keys().next().done;
    if (isIteratorEmpty) {
        history.pushState({}, "", "{{ '/' | url }}");
    } else {
        history.pushState({}, "", "{{ '/' | url }}" + "?" + urlSearchParams);
    }
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

function enableHrefButton(a, href) {
    // See https://stackoverflow.com/a/10276157
    a.classList.remove("disabled");
    if (href !== undefined) {
        a.href = href;
    }
    // Add back a into the "tab tree" of the page
    a.removeAttribute("tabindex");
}

function flipPages(relativeOffset) {
    const pageNo = Number((location.pathname.match(/page\/([0-9]+)/) || ["page/1", "1"])[1]);
    const newPageNo = pageNo + relativeOffset;
    if (newPageNo <= 1) {
        return "{{ '/' | url }}";
    } else {
        return "{{ '/' | url }}" + "page/" + newPageNo;
    }
}

function syncPaginationButtons() {
    if ($("showing-n-results").innerText === "No results found.") {
        disableHrefButton($("previous-button"));
        disableHrefButton($("next-button"));
        return;
    }
    const urlSearchParams = new URLSearchParams(location.search);
    [matchedString, start, end, total] = $("showing-n-results").innerText.match(/Showing ([0-9]+) to ([0-9]+) of ([0-9]+) results found/);
    if (Number(end) < Number(total)) {
        enableHrefButton($("next-button"), flipPages(+1));
        $("next-button").search = urlSearchParams;
    } else {
        disableHrefButton($("next-button"));
    }

    if (Number(start) > 1) {
        enableHrefButton($("previous-button"), flipPages(-1));
        $("previous-button").search = urlSearchParams;
    } else if (Number(start) == 0) {
        // start == 0 is a special case that occurs when the user is on a page that's beyond the total amount of pages for this search.
        const postsPerPage = {{ site.paginate }};
        const amountOfPages = Math.ceil(total/postsPerPage);
        const pageNo = Number((location.pathname.match(/page\/([0-9]+)/) || ["page/1", "1"])[1]);
        // Compute the difference between current page number and the number
        // of the last valid page so that clicking the "Previous" button
        // leads to the user to the last valid page.
        enableHrefButton($("previous-button"), flipPages(amountOfPages - pageNo));
        $("previous-button").search = urlSearchParams;
        disableHrefButton($("next-button"));
    } else {
        disableHrefButton($("previous-button"));
    }
}

function syncSidebarFilters() {
    const urlSearchParams = new URLSearchParams(location.search);
    for (const [fieldName, fieldValue] of urlSearchParams.entries()) {
        let elements = document.getElementsByName(fieldName);
        for (let element of elements) {
            if ("noUiSlider" in element) {
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
            } else if (element instanceof HTMLInputElement && element.type === "text") {
                element.value = fieldValue;
            } else if (isCheckable(element)) {
                const fieldValuesArray = fieldValue.split(",");
                element.checked = fieldValuesArray.includes(element.value);
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
            console.log(element)
            if (isCheckable(element)) {
                element.checked = false;
            }
            if ("noUiSlider" in element) {
                const slider = element.noUiSlider;
                slider.set(slider.options.start);
            }
            if (element instanceof HTMLSelectElement) {
                if (element.multiple) {
                    const options = element.options;
                    for (const option of options) {
                        option.selected = false;
                    }
                } else {
                    element.selectedIndex = 0;
                }
            }
            if (element instanceof HTMLInputElement) {
                element.value = "";
            }
        }
    }
    // Remove filters from the URL
    history.replaceState({}, "", location.pathname);
    populatePostGrid(getFilteredKeymaps());
}

function updatePostGrid(element) {
    updateUrlSearchParams(element);
    populatePostGrid(getFilteredKeymaps());
}
