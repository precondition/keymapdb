function oxfordJoin(coll) {
    return coll.length < 2 ? coll.join(", ") : coll.slice(0, -1).join(", ") + ", and " + coll[coll.length-1];
}

module.exports = {
  layout: "layouts/keymapdb_entry.njk",
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
    keymapImage: (data) => {
      if (data.keymapImage) {
        if (data.keymapImage.search(/^https?:\/\//) !== -1) {
          return data.keymapImage.replace("http:", "https:");
        }
        return `/assets/img/keymaps/${data.keymapImage}`;
      } else {
        return false;
      }
    },
    description: (data) => `Get inspired by this ${data.keyCount}-key ${data.languages.length > 1 ? "multilingual " : ""}${data.keyboard} keymap made by ${data.author} and browse other ${data.firmwares.join(" and ")} keymaps like this.`,
    ogImage: (data) => data.keymapImage,
    imageAlt: (data) => `${data.isSplit ? "Split" : "Non-split"} ${data.stagger}-staggered ${data.keyboard} with ${oxfordJoin(data.baseLayouts)} legends.`
  }
};
