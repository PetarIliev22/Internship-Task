import { restoreFavorites } from "./products.js";

const favoritesList = document.getElementById("favorites-list");
const favoritesBtn = document.getElementById("favorites");


favoritesBtn.addEventListener("click", () => {
    const favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];
    
    favoritesList.innerHTML = "";

    favoriteProducts.forEach((item) => {
        favoritesList.innerHTML += `
            <div class="favorite-item d-flex align-items-center gap-3 p-2">
    
                <div class="favorite-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
    
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.title}</h6>
                    <span class="price">${item.price} €</span>
                </div>
    
                <button class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-x"></i>
                </button>
    
            </div>
        `;
    });

    restoreFavorites();
})



