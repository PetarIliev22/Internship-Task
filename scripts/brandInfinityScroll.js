const track = document.getElementById("track");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const allComp = [track, leftBtn, rightBtn];

if (allComp.every((comp) => comp)) {
    const brands = [
        { img: "./assets/brands/rolex.png", alt: "Rolex" },
        { img: "./assets/brands/patek.png", alt: "Patek Philippe" },
        { img: "./assets/brands/breitling.png", alt: "Breitling" },
        { img: "./assets/brands/tag-heuer.png", alt: "Tag Heuer" },
        { img: "./assets/brands/omega.png", alt: "Omega" },
        { img: "./assets/brands/cartier.png", alt: "Cartier" },
        { img: "./assets/brands/logines.png", alt: "Logines" },
        { img: "./assets/brands/iwc.png", alt: "IWC" },
        { img: "./assets/brands/hublot.png", alt: "Hublot" },
        { img: "./assets/brands/tissot.png", alt: "Tissot" },
        { img: "./assets/brands/seiko.png", alt: "Seiko" },
    ];

    const allBrands = [...brands, ...brands];

    allBrands.forEach((brand) => {
        track.innerHTML += `
        <div class="branding-img">
            <img src="${brand.img}" alt="${brand.alt}"/>
        </div>`;
    });

    let baseSpeed = 0.8;
    let speed = baseSpeed;
    let position = 0;

    const totalWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;

    function animateSlider() {
        position -= speed;

        if (position <= -totalWidth + containerWidth) {
            speed = -baseSpeed;
        } else if (position >= 0) {
            speed = baseSpeed;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateSlider);
    }

    animateSlider();

    rightBtn.addEventListener("click", () => {
        if (speed > 0) {
            speed = speed * 20;
        } else {
            speed = -speed * 20;
        }

        setTimeout(() => {
            speed = speed > 0 ? 0.8 : -0.8;
        }, 150);
    });

    leftBtn.addEventListener("click", () => {
        if (speed < 0) {
            speed = speed * 20;
        } else {
            speed = -speed * 20;
        }

        setTimeout(() => {
            speed = speed > 0 ? 0.8 : -0.8;
        }, 150);
    });
}