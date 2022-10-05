const $gifArea = $("#gif-area");
const $searchInput = $("#search");


/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search?api_key=vjwvVwdxjrwQOzBXhzyun6Aiv0PVl49v&limit=25&offset=0&rating=g&lang=en", {
    params: {
      q: searchTerm,
    }
  });
  addGif(response);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});