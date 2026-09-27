// ------------------------------ home slider -----------------------------

const home = document.querySelector(".home_container");
const images = [
    "img/hero_light.png",
    "img/hero1_light.png"
];
let currentImage = 0;

setInterval(() => {
    home.style.backgroundImage = `url("${images[currentImage]}")`;

    currentImage++;

    if (currentImage === images.length) {
        currentImage = 0;
    }
}, 3000);

// ------------------------------ products slider ------------------------

function updateSliderButtons(container) {

        const slider = container.querySelector(".products_slider");
    const btnBrev = container.querySelector(".brevios_btn");
    const btnNext = container.querySelector(".next_btn");

    const isAtStart = slider.scrollLeft <= 140;

    const isAtEnd =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 140;

    btnBrev.style.display = isAtStart ? "none" : "block";
    btnNext.style.display = isAtEnd ? "none" : "block";
}
const containers = document.querySelectorAll(".list_container");

containers.forEach(container => {
    const slider = container.querySelector(".products_slider");
    const btnBrev = container.querySelector(".brevios_btn");
    const btnNext = container.querySelector(".next_btn");
    btnNext.addEventListener("click", () => {

        slider.scrollLeft += 200;

        updateSliderButtons(container);
    });
    btnBrev.addEventListener("click", () => {

        slider.scrollLeft -= 200;

        updateSliderButtons(container);
    });
    slider.addEventListener("scroll", () => {

        updateSliderButtons(container);

    });

});