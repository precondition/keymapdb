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

async function getFilteredKeymaps() {
      const keymapsJSON = await fetch("{{'/index.json' | url}}").then(res => res.json());
      const searchParams = new URLSearchParams(location.search);
      return keymapsJSON.filter(keymap => isKeymapConforming(searchParams, keymap));
}

const pageRegExp = new RegExp("{{ '/page/' | url }}[0-9]+");
if (location.pathname === "{{'/' | url }}" || pageRegExp.test(location.pathname)) {
    (async() => {
      let filteredKeymaps = await getFilteredKeymaps();
      console.log("filtered keymaps ↓");
      console.log(filteredKeymaps);
      const postGrid = document.getElementById("post-grid");
      postGrid.innerHTML = "";
      for (const post of filteredKeymaps) {
        const splitStatus = Boolean(post.split) ? "split" : "non-split"
        postGrid.innerHTML += `
        <div class="w-full ${filteredKeymaps.length >= 3 ? "sm:w-1/2 md:w-1/3" : ""} self-stretch p-2 mb-2" style="height:fit-content;">
            <div class="rounded shadow-md h-full">
                <a href="${ post.url}">
                    <img class="w-full m-0 rounded-t lazy"  src="${post.keymap_image}" width="960" height="500" alt="${post.keymap_author}'s keymap for the ${post.keyboard}">
                </a>
                <div class="px-6 py-5">
                    <div class="font-semibold text-lg mb-2">
                        <a class="text-gray-900 hover:text-gray-700" href="${post.url}">${post.title}</a>
                    </div>
                    <p class="text-gray-700 mb-1">${post.stagger} stagger, ${post.keyCount} keys, ${post.split ? "split" : "non-split"}</p>
                    <p class="text-gray-800">
                        ${post.summary === null ? "" : post.summary}
                    </p>
                </div>
            </div>
        </div>
        `;
      }
    })();
}
