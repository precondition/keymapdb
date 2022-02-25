/*
Search for posts with keyword given in the parameter "q"
Only run on search page ("/search/")
*/

class SearchPosts {
  async init() {
    const params = new URL(location.href).searchParams;

    this.start = Number(params.get('start')) || 1;
    this.size = Number(params.get('size')) || 12;

    this.posts = await fetch('../index.json').then((res) => {
      return res.json();
    });

    this.render(params.get('q'));
  }

  render(query) {
    const wrapperEl = document.getElementById('wrapper');
    const searchBoxEl = document.getElementById('searchbox');
    const infoEl = document.getElementById('info');

    query = typeof query === 'string' ? query.toLowerCase() : '';

    history.replaceState(null, null, `?q=${query}&start=${this.start}&size=${this.size}`);

    searchBoxEl.value = query;
    wrapperEl.innerHTML = '';

    if (query === '') {
      infoEl.innerHTML = '<p>Enter keywords in the search box above<br>You can use space-separated search qualifiers using the following syntax : <code>field;value</code>.<br>Examples:<br>hashomerowmods;false stagger;columnar g heavy<br>ifo keyboard;ergodash<br>the rootiest<p><br>See the "Tag List" for a list of the available fields'

      return;
    }
    let getMethods = (obj) => Object.getOwnPropertyNames(obj)
    const matchedPosts = this.posts.filter((post) => {
      const postTitle = post.title.toLowerCase();

      const brokenDownQuery = query.split(' ').map(x => {return x.split(';')});
      console.log(brokenDownQuery);
      const searchFilters = brokenDownQuery.filter(e => {return e.length == 2;});
      console.log("searchFilters is : " + searchFilters);
      const titleSearch = brokenDownQuery.filter(e => {return e.length == 1;}).join(" ");
      console.log("titleSearch is : " + titleSearch);
      const mask = searchFilters.map(qualifier => {return post[qualifier[0]] == qualifier[1]});
      console.log(post.keyboard +  ' ' + typeof post.keyboard)
      if (titleSearch == "") {
        return (mask.every(Boolean));
      } else {
        return (postTitle.indexOf(titleSearch) !== -1 && mask.every(Boolean));
      }
    });

    if (matchedPosts.length === 0) {
      infoEl.textContent = `No results were found for "${query}"`;

      return;
    }

    const size = this.size;
    const offset = this.start - 1;
    const slicedPosts = matchedPosts.slice(offset, offset + size);

    const lastPostIndex = offset + slicedPosts.length;
    const showingRange = this.start < lastPostIndex || this.start !== 1 ? `${this.start} to ${lastPostIndex}` : this.start;
    const extraS = matchedPosts.length > 1 ? 's' : '';

    infoEl.textContent = `Showing ${showingRange} of ${matchedPosts.length} result${extraS} found for "${query}"`;

    slicedPosts.forEach((post) => {
      const { url, title, date } = post;

      const splitStatus = Boolean(post.isSplit) ? "split" : "non-split"
      wrapperEl.innerHTML += `
        <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2">
          <a href="${url}">
            <div class="rounded shadow-md h-full px-6 py-5">
              <div class="font-semibold text-lg mb-2">${title}</div>
              <p class="text-gray-700 mb-1">${post.stagger} stagger, ${post.keycount} keys, ${splitStatus}</p>
            </div>
          </a>
        </div>
      `;
    });
  }
}

if (location.pathname === "{{'/search/' | url }}") {
  const searchBoxEl = document.getElementById('searchbox');
  const searchPosts = new SearchPosts();

  searchPosts.init();

  searchBoxEl.addEventListener('keyup', debounce(function() {
    searchPosts.render(this.value);
  }, 400));
}

// https://github.com/sindresorhus/p-debounce
function debounce(fn, wait) {
  let timer;
  let resolveList = [];

  return function(...arguments_) {
    return new Promise((resolve) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;

        const result = fn.apply(this, arguments_);

        for (resolve of resolveList) {
          resolve(result);
        }

        resolveList = [];
      }, wait);

      resolveList.push(resolve);
    });
  };
}
