document.addEventListener("DOMContentLoaded", () => {

    const product = JSON.parse(sessionStorage.getItem("selectedProduct"));

    console.log("LOADED:", product);

    if (!product) return;

    const title = document.getElementById("product-title");
    const brand = document.getElementById("product-brand");
    const price = document.getElementById("product-price");
    const image = document.getElementById("product-image");
    const desc = document.getElementById("product-description");

    if (title) title.textContent = product.title;
    if (brand) brand.textContent = product.brand;
    if (price) price.textContent = Number(product.price).toFixed(2);
    if (image) image.src = product.images[0];
    if (desc) desc.textContent = product.description;
});