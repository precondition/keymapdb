function binarySearch(e, lo, hi, sortedArr) {
    if (lo >= hi || hi <= lo) {
        return -1;
    }
    const mid = Math.round(lo+(hi-lo)/2);
    if (sortedArr[mid] === e) {
        return mid;
    } else if (sortedArr[mid] < e) {
        return binarySearch(e, lo, mid-1, sortedArr);
    } else {
        return binarySearch(e, mid+1, hi, sortedArr);
    }
}

if ($("header-searchbox") != undefined) {
    $("header-searchbox").addEventListener("keydown", debounce(async function(keyUpEvent) {
        // No need to go through the costly process of updating
        // the post grid if the key press didn't change the search.
        const ignoredKeysSortedList = [
            "Alt",
            "AltGraph",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "CapsLock",
            "Control",
            "End",
            "Fn",
            "FnLock",
            "Home",
            "Hyper",
            "Meta",
            "NumLock",
            "PageDown",
            "PageUp",
            "ScrollLock",
            "Shift",
            "Super",
            "Symbol",
            "SymbolLock"
        ];
        let isIgnoredKey = binarySearch(keyUpEvent.key, 0, ignoredKeysSortedList.length, ignoredKeysSortedList) !== -1;
        if (!isIgnoredKey) {
            updatePostGrid(this);
        }
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
