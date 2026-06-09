const container = document.querySelector('#product-cards');

export function renderProducts(list) {
    container.innerHTML = "";

    container.innerHTML = list.map(item => `
        <div class="card d-inline-block m-1 product-card" data-id="${item.id}">
            <div class="position-relative">
                <img src="${item.thumbnail}" data-first="${item.thumbnail}" data-second="${item.images[1]}" class="card-img-top position-relative" alt="${item.title}" loading="lazy" style="z-index: 2;">
                <img src="../assets/background-logo.png" class="position-absolute top-0 start-0" alt="New" style="opacity: 0.04; z-index: 1;">
                <a class="heart-icon z-3"><i class="bi bi-heart p-md-0 p-2"></i></a>
            </div>
            <div class="card-body">
                <h6 class="card-title text-uppercase text-muted small">${item.brand}</h6>
                <p class="card-text">${item.title}</p>
                <p class="card-price">${item.price.toFixed(2)} €</p>
                <button class="btn btn-dark px-5 w-100">View</button>
            </div>
        </div>
    `).join('');

}

container.addEventListener('mouseover', (elTarget) => {
    const target = elTarget.target;
    if (target.classList.contains('card-img-top')) {
        const second = target.dataset.second;
        if (second) target.src = second;
        target.style.animation = 'fadeIn 0.3s ease forwards';
    }
});

container.addEventListener('mouseout', (elTarget) => {
    const target = elTarget.target;
    if (target.classList.contains('card-img-top')) {
        const first = target.dataset.first;
        if (first) target.src = first;
        target.style.animation = 'fadeOut 0.3s ease forwards';
    }
});

container.addEventListener('click', (elTarget) => {
    let favorite = JSON.parse(localStorage.getItem('favorites')) || [];
    const target = elTarget.target;

    if (target.closest('.heart-icon')) {
        const icon = target.closest('.heart-icon').querySelector('i');
        const card = target.closest('.card');

        const id = card.dataset.id;
        const title = card.querySelector('.card-title').textContent;
        const price = card.querySelector('.card-price').textContent;
        const image = card.querySelector('img').src;

        const product = { id, title, price, image };

        const exists = favorite.find(item => item.id === id);

        if (!exists) {
            favorite.push(product);
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
        } else {
            favorite = favorite.filter(item => item.id !== id);
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
        }

        localStorage.setItem('favorites', JSON.stringify(favorite));
    }
});

export function restoreFavorites() {
    let favorite = JSON.parse(localStorage.getItem('favorites')) || [];

    document.querySelectorAll('.card').forEach(card => {
        const id = Number(card.dataset.id);
        const icon = card.querySelector('.heart-icon i');

        if (favorite.find(item => Number(item.id) === Number(id))) {
            icon.classList.add('bi-heart-fill');
            icon.classList.remove('bi-heart');
        }
    });
}