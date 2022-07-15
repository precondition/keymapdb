module.exports = {
  layout: "layouts/keymapdb_entry_redirect.njk",
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
  }
};
