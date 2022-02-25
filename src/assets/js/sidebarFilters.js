function isIteratorEmpty(iterator) {
    // See the iterator protocol: 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
    return iterator.next().done
}

function getElementValue(element) {
    if (element instanceof HTMLSelectElement) {
       return Array.from(element.options).filter(option => option.selected).map(option => option.value).toLocaleString();
    }
    if (element instanceof HTMLInputElement && element.hasAttribute("type") && element.type === "checkbox") {
        return Array.from(document.querySelectorAll(`input[name=${element.name}]:checked`)).map(option => option.value).toLocaleString();
    }
    if (element.hasAttribute("class") && element.getAttribute("class").startsWith("slider-styled")) {
        return element.noUiSlider.get().join("-");
    }
    return element.getAttribute("value");
}

function updateUrlSearchParams(element) {
    console.log("updating...");
    const urlSearchParams = new URLSearchParams(location.search);
    const value = getElementValue(element);
    const name = element.getAttribute("name");
    // Checking an option adds it to the URL so if the user clicks on an option that was already present in the URL,
    // it means they clicked on a checked input element, in which case we uncheck it and remove it from the URL.
    if (value === "" || "checked" in element && urlSearchParams.get(name) === value) {
        element.checked = false;
        urlSearchParams.delete(name);
    } else {
        urlSearchParams.set(name, value);
    }
    const newUrl = isIteratorEmpty(urlSearchParams.keys()) ? location.pathname : location.pathname + "?" + urlSearchParams;
    // Update the search params in the URL
    history.replaceState({}, "", newUrl);
}
