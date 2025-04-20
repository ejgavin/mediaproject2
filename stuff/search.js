function openIframe(url) {
  const iframeContainer = document.getElementById("iframeContainer");
  const fullscreenIframe = document.getElementById("fullscreenIframe");
  fullscreenIframe.src = url;
  iframeContainer.style.display = "block";
}

async function searchMedia(query) {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=9a2954cb0084e80efa20b3729db69067&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const container = document.getElementById("bigDiv");
    container.innerHTML = "";

    if (data.results.length === 0) {
      container.innerHTML = '<p>No results found.</p>';
      return;
    }

    data.results.forEach(movie => {
      if (!movie.poster_path) return;

      const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      const rating = movie.vote_average ? `⭐ ${Math.round(movie.vote_average * 10) / 10}` : "";
      const year = movie.release_date ? movie.release_date.slice(0, 4) : movie.first_air_date ? movie.first_air_date.slice(0, 4) : "N/A";
      const link = movie.media_type === "tv" ? `embed/tv.html?id=${movie.id}` : `embed/movie.html?id=${movie.id}`;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${poster}" alt="${movie.title || movie.name}">
        <div class="rating">${rating}</div>
        <div class="year">${year}</div>
        <p>${movie.title || movie.name}</p>
      `;

      card.addEventListener("click", () => openIframe(link));

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchbar");
  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchMedia(searchBar.value.trim());
  });
});

