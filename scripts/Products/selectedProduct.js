document.addEventListener("click", (e) => {

    const btn = e.target.closest(".btn");
    if (!btn || !btn.textContent.includes("View")) return;

    const card = btn.closest(".product-card");
    const id = Number(card.dataset.id);

    const products = JSON.parse(sessionStorage.getItem("data")) || [];
    const product = products.find(p => p.id === id);

    sessionStorage.setItem("selectedProduct", JSON.stringify(product));

    window.location.href = "product.html";
});