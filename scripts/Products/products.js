const container = document.querySelector('#product-cards');

export function renderProducts(list) {
    container.innerHTML = "";

    list.forEach((item) => {
        container.innerHTML += `
            <div class="card d-inline-block m-1 product-card" data-id="${item.id}">
                <div class="position-relative">
                    <img src="${item.images[0]}" data-first="${item.images[0]}" data-second="${item.images[1]}" class="card-img-top" alt="${item.title}">
                    <a class="heart-icon"><i class="bi bi-heart"></i></a>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-uppercase text-muted small">${item.brand}</h6>
                    <p class="card-text">${item.title}</p>
                    <p class="card-price fw-bold">${item.price.toFixed(2)} €</p>
                    <button class="btn btn-dark px-5 w-100">View</button>
                </div>
            </div>
        `;
    });
}

container.addEventListener('mouseover', (elTarget) => {
    const target = elTarget.target;
    if (target.classList.contains('card-img-top')) {
        const first = target.dataset.first;
        const second = target.dataset.second;

        target.src = second;
        target.style.animation = 'fadeIn 0.3s ease forwards';
    }
});

container.addEventListener('mouseout', (elTarget) => {
    const target = elTarget.target;
    if (target.classList.contains('card-img-top')) {
        const first = target.dataset.first;

        target.src = first;
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

        const exists = favorite.find(item => item.id == id);

        if (!exists) {
            favorite.push(product);
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
        } else {
            favorite = favorite.filter(item => item.id != id);
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
        }

        localStorage.setItem('favorites', JSON.stringify(favorite));
    }
});

export function restoreFavorites() {
    let favorite = JSON.parse(localStorage.getItem('favorites')) || [];

    document.querySelectorAll('.card').forEach(card => {
        const id = card.dataset.id;
        const icon = card.querySelector('.heart-icon i');

        if (favorite.find(item => item.id == id)) {
            icon.classList.add('bi-heart-fill');
            icon.classList.remove('bi-heart');
        }
    });
}