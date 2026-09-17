// ------------------------------ hero slider -----------------------------

let pagination = document.querySelector(".pagination");
let slides = document.querySelectorAll(".slide");
let counter = 0;
for(i = 0 ; i < slides.length ; i++){
    let pagi = document.createElement("div");
    pagi.classList.add("pagi");
    pagination.appendChild(pagi);
};
pagination.firstElementChild.classList.add("active")
function swiper(){
    slides[counter].classList.remove("active");
    pagination.children[counter].classList.remove("active")
    counter++;
    if(counter === slides.length){
        counter = 0;
    };
    slides[counter].classList.add("active");
    pagination.children[counter].classList.add("active")
};
let slider = setInterval(swiper, 2500);
let pagiBtn = document.querySelectorAll(".pagi");
pagiBtn.forEach((btn, index) => {
    btn.addEventListener("click", () =>{
        clearInterval(slider);
        pagiBtn.forEach(pagi => pagi.classList.remove("active"));
        btn.classList.add("active");
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
        counter = index;
        slider = setInterval(swiper, 2500);
    })
});

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