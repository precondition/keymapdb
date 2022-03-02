module.exports = {
  layout: 'post',
  title: 'Untitled',
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
    keymapImage: (data) => {
      if (data.keymapImage) {
        if (data.keymapImage.search(/^https?:\/\//) !== -1) {
          return data.keymapImage;
        }
        return `/assets/img/${data.keymapImage}`;
      } else {
        return false;
      }
    }
  }
};
