async function getMovieData() {
  const params = new URLSearchParams(window.location.search);
  const ID = params.get("id");

  if (!ID) {
    window.location.href = "/";
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=9a2954cb0084e80efa20b3729db69067&language=en-US`;

  try {
    const response = await fetch(url);
    const movie = await response.json();

    window.currentMovie = movie.title;
    updateTitleAndIframe(ID);

  } catch (error) {
    console.error("Error fetching movie data:", error);
    document.getElementById("titletext").innerText = "Error loading movie.";
  }
}

function updateTitleAndIframe(ID) {
  const source = document.getElementById("sourceSelector").value;
  document.getElementById("titletext").innerText = window.currentMovie;

  let src = "";
  switch (source) {
    case "1":
      src = `https://vidfast.pro/movie/${ID}?autoPlay=true`;
      break;
    case "2":
      src = `https://player.videasy.net/movie/${ID}?autoPlay=true&episodeSelector=false`;
      break;
    case "3":
      src = `https://111movies.com/movie/${ID}?autoPlay=true`;
      break;
  }

  document.getElementById("iframe").src = src;
}

document.getElementById("sourceSelector").addEventListener("change", () => {
  const params = new URLSearchParams(window.location.search);
  const ID = params.get("id");
  updateTitleAndIframe(ID);
});

document.addEventListener("DOMContentLoaded", getMovieData);

