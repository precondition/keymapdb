function oxfordJoin(coll) {
    return coll.length < 2 ? coll.join(", ") : coll.slice(0, -1).join(", ") + ", and " + coll[coll.length-1];
}

async function getSVG(fieldName, fieldValue) {
   return fetch("{{ '/assets/svg/' | url }}" + fieldName + "/" + fieldValue + ".svg").then(res => res.ok ? res.text() : "");
}

function card(post, postUrl) {
  const splitStatus = post.isSplit ? "Split" : "Non-split"
  const titleHover = post.title.toLowerCase().includes(post.author.toLowerCase()) ? '' : `title="by ${post.author}"`;
  let summary = "";
  if (Array.isArray(post.summary)) {
    summary = '<ul class="list-disc">';
    summary += post.summary
          .map(bulletPoint => `\n<li>\n\t\t${bulletPoint}\n\t</li>`)
          .join("\n");
    summary += '\n</ul>';
  } else if (post.summary != null) {
    summary = `<p>${post.summary}</p>`;
  }
  return `
  <div class="postcard">
      <div class="rounded shadow-lg h-full bg-gray-50 hover:shadow-xl">
          <a href="${post.url}">
          <img
          class="w-full m-0 rounded-t lazy max-h-72 object-cover object-top card-thumbnail"
          src="${post.keymapImage}"
          width="960"
          height="500"
          alt="${splitStatus} ${post.stagger}-staggered ${post.keyboard} with ${oxfordJoin(post.baseLayouts)} legends">
          </a>
          <div class="px-6 py-5">
              <div class="font-semibold text-lg mb-2">
                  <a class="text-gray-900 hover:text-gray-700" ${titleHover} href="${post.url}">${post.title}</a>
              </div>
              <div class="my-5 flex flex-wrap justify-between">
                  <p id="keyCount-table-cell-${post.fileSlug}" class="text-gray-700 mb-1">${post.keyCount} keys</p>
                  <p id="languages-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 break-words text-right">${post.languages.join(", ")}</p>
                  <div class="flexitems-break"></div>
                  <p id="layerCount-table-cell-${post.fileSlug}" class="text-gray-700 mb-1">${post.layerCount} layers</p>
                  <p id="baseLayouts-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 break-words text-right">${post.baseLayouts.join(", ")}</p>
              </div>
              ${summary}
          </div>
      </div>
  </div>
  `;
}
