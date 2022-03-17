function getKeymapsJSON() {
    return {% include "partials/keymaps_metadata.json.njk" %};
}

function isKeymapConforming(query, keymapData) {
  for (const [queryKey, value] of query) {
    if (queryKey.endsWith("Count")) {
      let lowerbound, upperbound;
      [lowerbound, upperbound] = value.split("-").map(Number);
      if (upperbound === undefined && !isNaN(lowerbound)) {
        // `value` does not contain a "-" and is thus a
        // single number as opposed to a range.
        upperbound = lowerbound;
      }
      const countValue = Number(keymapData[queryKey]);
      if (!(lowerbound <= countValue && countValue <= upperbound)) {
        return false;
      }
    } else if (keymapData[queryKey] instanceof Array) {
        const selectedValues = value.split(",");
        if (!selectedValues.some(x => new Set(keymapData[queryKey]).has(x))) {
            return false;
        }

    } else if (queryKey === "search") {
        // keymapData["summary"] might be null so that's why we use
        // AND's short-circuit evaluation to check for null before accessing
        // the toLowerCase property.
        let isConformingToTypedSearch = (word) => ["title", "author", "summary"]
            .map(fieldN => keymapData[fieldN] && keymapData[fieldN].toLowerCase().indexOf(word.toLowerCase()) !== -1)
            .some(Boolean);
        if (!value.split(" ").every(isConformingToTypedSearch)) {
            return false;
        }
    // In case the keymap data value is a boolean, `value` must be deserialized into a boolean, as done after the &&
    } else if (keymapData[queryKey] !== value && keymapData[queryKey] !== (value === "true")) {
      return false;
    }
  }
  return true;
}

function getFilteredKeymaps() {
    const searchParams = new URLSearchParams(location.search);
    return getKeymapsJSON().filter(keymap => isKeymapConforming(searchParams, keymap));
}

async function populatePostGrid(filteredKeymaps) {
    const postGrid = $("post-grid");
    postGrid.innerHTML = "";
    const postsPerPage = {{ site.paginate }};
    const pageNo = Number((location.pathname.match(/page\/([0-9]+)/) || ["page/1", "1"])[1]);
    const offset = (pageNo - 1) * postsPerPage;
    const slicedKeymaps = filteredKeymaps.slice(offset, offset+postsPerPage);
    // Warning: The function syncPaginationButtons relies on the innerText of the "showing-n-results" doc element.
    // If you change the value of innerText, make sure to reflect that "API" change in syncPaginationButtons too!
    if (filteredKeymaps.length === 0) {
        $("showing-n-results").innerText = "No results found.";
    } else if (offset < filteredKeymaps.length) {
      $("showing-n-results").innerText = `Showing ${offset + 1} to ${Math.min(offset + postsPerPage, filteredKeymaps.length)} of ${filteredKeymaps.length} results found.`;
    } else {
      $("showing-n-results").innerText = `Showing 0 to 0 of ${filteredKeymaps.length} results found.`;
      const amountOfPages = Math.ceil(filteredKeymaps.length/postsPerPage);
      if (amountOfPages === 1) {
          $("showing-n-results").innerText += ` There is only 1 page for this search, not ${pageNo}.`;
      } else {
          $("showing-n-results").innerText += ` There are only ${amountOfPages} pages for this search, not ${pageNo}.`;
      }
    }
    syncPaginationButtons();
    for (const post of slicedKeymaps) {
      postGrid.innerHTML += card(post, post.url);
    }
}

const pageRegExp = new RegExp("{{ '/page/' | url }}[0-9]+");
if (location.pathname === "{{'/' | url }}" || pageRegExp.test(location.pathname)) {
    (async() => {
      let filteredKeymaps = await getFilteredKeymaps();
      populatePostGrid(filteredKeymaps);
    })();
}
