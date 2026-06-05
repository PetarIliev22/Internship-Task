import { cacheData } from "./API.js";
import { renderProducts } from "./products.js";

const data = await cacheData();

let state = {
    brand: "",
    category: "",
    sort: ""
};

function brandSelection() {
    const brands = [...new Set(data.map(item => item.brand))];
    const brandSelect = document.querySelector("#brand-select");

    brands.forEach(el => {
        brandSelect.innerHTML += `
            <option value="${el}">${el}</option>
        `;
    });

    brandSelect.addEventListener("change", () => {
        const brand = brandSelect.value;
        state.brand = brand;
        applyFilters();
    });

}
brandSelection();

function categorySelection() {
    const categories = [...new Set(data.map(item => item.category))];
    const categorySelect = document.querySelector("#category-select");

    categories.forEach(el => {
        categorySelect.innerHTML += `
            <option value="${el}">${el.charAt(0).toUpperCase() + el.split("-").join(" ").slice(1)}</option>
        `;
    });

    categorySelect.addEventListener("change", () => {
        const category = categorySelect.value;
        state.category = category;
        applyFilters();
    });

}
categorySelection();

function sortByPrice(){
    const sortSelect = document.querySelector("#sort-select");

    sortSelect.addEventListener("change", () => {
        if (sortSelect.value === "high") {
            state.sort = "high";
        } else if (sortSelect.value === "low") {
            state.sort = "low";
        } else {
            state.sort = "";
        }

        applyFilters();
    });
}
sortByPrice();

function applyFilters() {
    let filteredData = [...data];

    if (state.brand) {
        filteredData = filteredData.filter(item => item.brand === state.brand);
    }

    if (state.category) {
        filteredData = filteredData.filter(item => item.category === state.category);
    }

    if (state.sort === "low") {
        filteredData.sort((a, b) => a.price - b.price);
    }

    if (state.sort === "high") {
        filteredData.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredData);
}


applyFilters();