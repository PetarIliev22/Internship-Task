function ratingToStars(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    console.log(fullStars);

    for (let i = 0; i < fullStars; i++) {
        stars += `<i class="bi bi-star-fill"> </i>`;
    }

    if(fullStars < rating) {
        stars += `<i class="bi bi-star-half"> </i>`;
    }

    for (let i = 0; i < 4 - fullStars; i++) {
        stars += `<i class="bi bi-star"> </i>`;
    }

    return stars;
}

document.addEventListener("DOMContentLoaded", () => {

    const product = JSON.parse(sessionStorage.getItem("selectedProduct"));
    if (!product) return;

    const title = document.getElementById("product-title");
    const brand = document.getElementById("product-brand");
    const category = document.getElementById("product-category");
    const desc = document.getElementById("product-description");
    const price = document.getElementById("product-price");
    const image = document.getElementById("product-image");
    const rating = document.getElementById("product-rating");
    const status = document.getElementById("product-status");
    const thumbnails = document.getElementById("product-thumbnails");
    const specs = document.getElementById("product-specs");

    if (title) title.innerHTML = product.title;
    if (brand) brand.innerHTML = product.brand;
    if (category) category.innerHTML = product.category;
    if (desc) desc.innerHTML = product.description;
    if (price) price.innerHTML = Number(product.price).toFixed(2) + " €";
    if (image) image.src = product.images?.[0] || "";
    if (rating) rating.innerHTML = ratingToStars(product.rating) + " " + product.rating;

    if (status) {
        if (product.stock > 0) {
            status.classList.add("bg-success");
            status.innerHTML = "In Stock";
        } else {
            status.classList.add("bg-danger");
            status.innerHTML = "Out of Stock";
        }
    }

    if (thumbnails && product.images) {
        product.images.forEach((img) => {
            thumbnails.innerHTML += `
                <img src="${img}" alt="${product.title}" class="product-thumbnail" data-src="${img}" width="100">
            `;
        });

        document.querySelectorAll(".product-thumbnail").forEach((thumbnail) => {
            thumbnail.addEventListener("click", () => {
                image.src = thumbnail.dataset.src;
            });
        });
    }

    if (specs) {
        specs.innerHTML = `
            <div class="product-spec-list mb-2">
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">SKU: </span> ${product.sku}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Brand: </span> ${product.brand}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Category: </span> ${product.category}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Stock: </span> ${product.stock}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Weight: </span> ${product.weight} g</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Warranty: </span> ${product.warrantyInformation}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Shipping: </span> ${product.shippingInformation}</li>
                <li class="mb-1"><span class="fw-bold text-uppercase text-muted small p-1">Return Policy: </span> ${product.returnPolicy}</li>
            </div>
        `;
    }
});