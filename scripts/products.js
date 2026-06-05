export function renderProducts(list) {
    const container = document.querySelector('#product-cards');
    container.innerHTML = "";

    list.forEach((item) => {
        container.innerHTML += `
            <div class="card d-inline-block m-1">
                <img src="${item.images[0]}" data-first="${item.images[0]}" data-second="${item.images[1]}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.brand}</h5>
                    <p class="card-text">${item.title}</p>
                    <p class="card-text">${item.price} €</p>
                    <button class="btn btn-dark px-4">View</button>
                </div>
            </div>
        `;
    });

    container.addEventListener('mouseover', (elTarget) => {
        const target = elTarget.target;
        if (target.classList.contains('card-img-top')) {
            const first = target.dataset.first;
            const second = target.dataset.second;
            target.src = second;
            target.style.animation = 'fadeIn 0.3s ease forwards';
            target.addEventListener('mouseout', () => {
                target.src = first;
                target.style.animation = 'fadeOut 0.3s ease forwards';
            });
        }
    });
}








