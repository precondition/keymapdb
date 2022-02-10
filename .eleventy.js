const pluginTailwind = require('eleventy-plugin-tailwindcss');
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = (config) => {
  config.addPlugin(pluginTailwind, {
    src: 'src/assets/css/*',
    // excludeNonCssFiles is bugged in 
    // eleventy-plugin-tailwindcss@0.3.0 (git+ssh://git@github.com/dafiulh/eleventy-plugin-tailwindcss.git#c8b8d4d7419e2f5fcf4483b8556cce163bd4d0a9).
    // See https://github.com/dafiulh/eleventy-plugin-tailwindcss/pull/34
    excludeNonCssFiles: false
  });

  config.addPlugin(UpgradeHelper);
  config.setDataDeepMerge(true);

  config.addPassthroughCopy('src/assets/img/**/*');
  config.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    pathPrefix: "/keymapdb/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
