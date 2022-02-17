class SearchPosts {
  async init(indexJSONpath) {
    const params = new URL(location.href).searchParams;
    this.posts = await fetch(indexJSONpath).then((res) => {
      return res.json();
    });
    this.render(params);
  }

  render(query) {
    const matchedPosts = this.posts.filter((post) => {
      for (const [queryKey, value] of query) {
        if (queryKey.endsWith("Count")) {
          let lowerbound, upperbound;
          [lowerbound, upperbound] = value.split("-").map(Number);
          if (upperbound === undefined && !isNaN(lowerbound)) {
            // `value` does not contain a "-" and is thus a
            // single number as opposed to a range.
            upperbound = lowerbound;
          }
          const postCount = Number(post[queryKey]);
          if (!(lowerbound <= postCount && postCount <= upperbound)) {
            return false;
          }
        } else if (Array.isArray(post[queryKey])) {
            const selectedValues = value.split(",");
            if (!selectedValues.some(x => new Set(post[queryKey]).has(x))) {
                return false;
            }
        } else if (post[queryKey] !== value) {
          console.log("Returning false because " + post[queryKey] + " != " + value);
          return false;
        }
      }
      return true;
    });
    console.log("matchedPosts is \n");
    console.log(matchedPosts);
  }
}


const pageRegExp = new RegExp("{{ '/page/' | url }}[0-9]+");
if (location.pathname === "{{'/' | url }}") {
  const searchPosts = new SearchPosts();
  searchPosts.init("index.json");
} else if (pageRegExp.test(location.pathname)) {
  const searchPosts = new SearchPosts();
  searchPosts.init("../../index.json");
}

// Array.isArray polyfill
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
