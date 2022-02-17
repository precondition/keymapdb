module.exports = {
  layout: 'post',
  title: 'Untitled',
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
    keymap_image: (data) => {
      if (data.keymap_image) {
        if (data.keymap_image.search(/^https?:\/\//) !== -1) {
          return data.keymap_image;
        }
        return `/assets/img/${data.keymap_image}`;
      } else {
        return false;
      }
    }
  }
};
