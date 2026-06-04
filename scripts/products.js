import { cacheData } from "./API.js";

const data = await cacheData();
console.log(data);

const container = document.querySelector('#product-cards');

data.forEach((item) => {
    container.innerHTML += `
        <div class="card d-inline-block m-1" style="width: 18rem;">
            <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.brand}</h5>
                <p class="card-text">${item.title}</p>
                <button class="btn btn-dark px-4">View</button>
            </div>
        </div>
    `;
});