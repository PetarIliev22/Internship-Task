import { cacheData } from "../api.js";
import { renderProducts, restoreFavorites } from "./products.js";

const brandSelect = document.querySelector("#brand-select");
const categorySelect = document.querySelector("#category-select");
const sortSelect = document.querySelector("#sort-select");

let data = [];
function fillFilters() {
    if (!brandSelect || !categorySelect || !sortSelect) return;

    const brands = [...new Set(data.map(item => item.brand))];
    const categories = [...new Set(data.map(item => item.category))];

    brands.forEach(b => {
        brandSelect.innerHTML += `
            <option value="${b}">
                ${b.charAt(0).toUpperCase() + b.split("-").join(" ").slice(1)}
            </option>
        `;
    });

    categories.forEach(c => {
        categorySelect.innerHTML += `
            <option value="${c}">
                ${c.charAt(0).toUpperCase() + c.split("-").join(" ").slice(1)}
            </option>
        `;
    });
}

function applyFilters() {
    let result = [...data];

    const brand = brandSelect.value;
    const category = categorySelect.value;
    const sort = sortSelect.value;

    if (brand) {
        result = result.filter(i => i.brand === brand);
    }

    if (category) {
        result = result.filter(i => i.category === category);
    }

    if (sort === "low") {
        result.sort((a, b) => a.price - b.price);
    }else if (sort === "high") {
        result.sort((a, b) => b.price - a.price);
    }

    renderProducts(result);
    restoreFavorites();
}

brandSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

async function init() {
    data = (await cacheData()) || [];
    
    fillFilters();
    applyFilters();
}

init();