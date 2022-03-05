function getKeymapsJSON() {
    return {% include "partials/keymaps-metadata.json.njk" %};
}

async function getSVG(fieldName, fieldValue) {
   return fetch("{{ '/assets/svg/' | url }}" + fieldName + "/" + fieldValue + ".svg").then(res => res.ok ? res.text() : "");
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
        let isConformingToTypedSearch = (word) => keymapData["title"].toLowerCase().indexOf(word) !== -1 || keymapData["keymapAuthor"].toLowerCase().indexOf(word) !== -1;
        if (!value.split(" ").every(isConformingToTypedSearch)) {
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
      const splitStatus = post.isSplit ? "Split" : "Non-split"
      const titleHover = post.title.toLowerCase().includes(post.keymapAuthor.toLowerCase()) ? '' : `title="by ${post.keymapAuthor}"`;
      post.OS.map(async (osName) => getSVG("OS", osName).then(svgIcon => { $("OS-table-cell-" + post.fileSlug).innerHTML += svgIcon; }));
      postGrid.innerHTML += `
      <div class="postcard">
          <div class="rounded shadow-md h-full">
              <a href="${post.url}">
              <img
              class="w-full m-0 rounded-t lazy"
              src="${post.keymapImage}"
              width="960"
              height="500"
              alt="${splitStatus} ${post.stagger}-staggered ${post.keyboard} with ${post.baseLayouts.join(" and ")} legends"
              title="${splitStatus} ${post.stagger}-staggered ${post.keyboard} with ${post.baseLayouts.join(" and ")} legends">
              </a>
              <div class="px-6 py-5">
                  <div class="font-semibold text-lg mb-2">
                      <a class="text-gray-900 hover:text-gray-700" ${titleHover} href="${post.url}">${post.title}</a>
                  </div>
                  <div class="my-5 flex flex-wrap justify-between">
                      <p id="keyCount-table-cell-${post.fileSlug}"   class="text-gray-700 mb-1">${post.keyCount} keys</p>
                      <p id="layerCount-table-cell-${post.fileSlug}" class="text-gray-700 mb-1">${post.layerCount} layers</p>
                      <div class="flexitems-break"></div>
                      <p id="languages-table-cell-${post.fileSlug}"  class="text-gray-700 mb-1 break-words">${post.languages.join(", ")}</p>
                      <p id="OS-table-cell-${post.fileSlug}"         class="text-gray-700 mb-1 break-words"><!-- filled in asynchronously with SVG icons --></p>
                  </div>
                  <p>${post.summary === null ? "" : post.summary} </p>
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
