function getKeymapsJSON() {
    return {% include "partials/keymaps-metadata.json.njk" %};
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
    // In case the keymap data value is a boolean, `value` must be deserialized into a boolean, as done after the &&
    } else if (keymapData[queryKey] !== value && keymapData[queryKey] !== (value === "true")) {
      console.log("Returning false because " + keymapData[queryKey] + " != " + value);
      return false;
    }
  }
  return true;
}

function getFilteredKeymaps() {
    const searchParams = new URLSearchParams(location.search);
    return getKeymapsJSON().filter(keymap => isKeymapConforming(searchParams, keymap));
}

function populatePostGrid(filteredKeymaps) {
    console.log("filtered keymaps ↓");
    console.log(filteredKeymaps);
    const postGrid = $("post-grid");
    postGrid.innerHTML = "";
    const postsPerPage = {{ site.paginate }};
    const pageNo = Number((location.pathname.match(/page\/([0-9]+)/) || ["page/1", "1"])[1]);
    const offset = (pageNo - 1) * postsPerPage;
    const slicedKeymaps = filteredKeymaps.slice(offset, offset+postsPerPage);
    console.log("sliced keymaps ↓");
    console.log(slicedKeymaps);
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
      const splitStatus = post.isSplit ? "split" : "non-split"
      postGrid.innerHTML += `
      <div class="w-full ${filteredKeymaps.length >= 3 ? "sm:w-1/2 md:w-1/3" : ""} self-stretch p-2 mb-2" style="height:fit-content;">
          <div class="rounded shadow-md h-full">
              <a href="${ post.url}">
                  <img class="w-full m-0 rounded-t lazy"  src="${post.keymapImage}" width="960" height="500" alt="${post.keymapAuthor}'s keymap for the ${post.keyboard}">
              </a>
              <div class="px-6 py-5">
                  <div class="font-semibold text-lg mb-2">
                      <a class="text-gray-900 hover:text-gray-700" href="${post.url}">${post.title}</a>
                  </div>
                  <p class="text-gray-700 mb-1">${post.stagger} stagger, ${post.keyCount} keys, ${post.isSplit ? "split" : "non-split"}</p>
                  <p class="text-gray-800">
                      ${post.summary === null ? "" : post.summary}
                  </p>
              </div>
          </div>
      </div>
      `;
    }
}

const pageRegExp = new RegExp("{{ '/page/' | url }}[0-9]+");
if (location.pathname === "{{'/' | url }}" || pageRegExp.test(location.pathname)) {
    (async() => {
      let filteredKeymaps = await getFilteredKeymaps();
      populatePostGrid(filteredKeymaps);
    })();
}
