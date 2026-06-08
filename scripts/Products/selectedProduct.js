document.addEventListener("click", (e) => {

    const btn = e.target.closest(".btn");
    if (!btn) return;

    const card = btn.closest(".product-card");
    if (!card) return;
    const id = Number(card.dataset.id);

    const products = JSON.parse(sessionStorage.getItem("data")) || [];
    const product = products.find(p => p.id === id);

    if (!product) return;

    sessionStorage.setItem("selectedProduct", JSON.stringify(product));

    window.location.href = "product.html";
});