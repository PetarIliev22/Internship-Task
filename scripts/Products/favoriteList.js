import { restoreFavorites } from "./products.js";

const favoritesList = document.getElementById("favorites-list");
const favoritesBtn = document.getElementById("favorites");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateTotalPrice(favorites) {
    return favorites.reduce((sum, item) => sum + parseFloat(item.price), 0);
}

function renderFavorites() {

    favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = `<p class="fw-bold">No favorite products yet</p> `;
        return;
    }

    favorites.forEach((item) => {
        favoritesList.innerHTML += `
            <div class="favorite-item d-flex align-items-center gap-3 p-2" data-id="${item.id}">

                <div class="favorite-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>

                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <span class="price">${item.price}</span>
                </div>

                <button class="remove-favorite btn btn-sm btn-outline-danger z-3">
                    <i class="bi bi-x"></i>
                </button>

            </div>
        `;
    });

    const totalPrice = document.createElement("div");

    totalPrice.innerHTML = `
        <div class="cart-total d-flex justify-content-between align-items-center p-3 border-top mt-2">
            <span class="fw-bold">Total:</span>
            <span class="fw-bold fs-5 total-price">
                ${updateTotalPrice(favorites).toFixed(2)} €
            </span>
        </div>
        <button class="btn btn-dark w-100 mt-2">Go to checkout</button>
    `;

    favoritesList.appendChild(totalPrice);

}

favoritesList.addEventListener("click", (e) => {
    if (!e.target.closest(".remove-favorite")) return;

    const el = e.target.closest(".favorite-item");

    favorites = favorites.filter((item) => item.id !== el.dataset.id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    el.remove();

    document.querySelector(".total-price").textContent =
        updateTotalPrice(favorites).toFixed(2) + " €";

    if (document.querySelectorAll(".favorite-item").length === 0) {
        favoritesList.innerHTML = `<p class="fw-bold">No favorite products yet</p>`;
    }
});

favoritesBtn.addEventListener("click", () => {
    renderFavorites();
    restoreFavorites();
});