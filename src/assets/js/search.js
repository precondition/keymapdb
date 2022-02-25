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
    })();
}
