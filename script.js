const API_KEY = "754fa1e5";
const BASE_URL = "https://www.omdbapi.com/";

const search = document.getElementById("search");
const btn = document.getElementById("btn");
const msg = document.getElementById("msg");
const card = document.getElementById("card");

async function fetchMovie(movieName) {
    const response = await fetch(`${BASE_URL}?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
}

function showMovie(movie) {
    const poster = movie.Poster !== "N/A" ?
        movie.Poster :
        "https://via.placeholder.com/200x300?text=Poster+Yok";

    card.innerHTML = `
    <img src="${poster}" alt="${movie.Title}">
    <h2>${movie.Title}</h2>
    <p><strong>Yıl:</strong> ${movie.Year}</p>
    <p><strong>Tür:</strong> ${movie.Genre}</p>
    <p><strong>Yönetmen:</strong> ${movie.Director}</p>
  `;

    card.style.display = "block";
}

function clearScreen() {
    msg.textContent = "";
    card.innerHTML = "";
    card.style.display = "none";
}

async function searchMovie(movieName) {
    clearScreen();

    if (!movieName) {
        msg.textContent = "Lütfen bir film adı giriniz.";
        return;
    }

    try {
        const data = await fetchMovie(movieName);

        if (data.Response === "False") {
            msg.textContent = data.Error;
            return;
        }

        showMovie(data);
        localStorage.setItem("lastMovie", movieName);
    } catch (error) {
        msg.textContent = "Bir hata oluştu: " + error.message;
        console.error(error);
    }
}

btn.addEventListener("click", () => {
    const movieName = search.value.trim();
    searchMovie(movieName);
});

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const movieName = search.value.trim();
        searchMovie(movieName);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const lastMovie = localStorage.getItem("lastMovie");

    if (lastMovie) {
        search.value = lastMovie;
        searchMovie(lastMovie);
    }
});