const searchIcon = document.getElementById("search_icon");
const searchClose = document.getElementById("search_close");
const searchBox = document.querySelector(".search_box");
const menuIcon = document.getElementById("menu_icon");
const menuResIcon = document.getElementById("menu_icon_header");
const menuRestext = document.getElementById("menu_res_text");
const headLinksContainer = document.querySelector(".head_links_container");
const headLinks = document.querySelectorAll(".head_link");
searchIcon.addEventListener("click", () =>{
    searchBox.classList.remove("search_opacity");
    searchIcon.classList.add("hide");
    searchClose.classList.remove("hide");
});
searchClose.addEventListener("click", () =>{
    searchBox.classList.add("search_opacity");
    searchIcon.classList.remove("hide");
    searchClose.classList.add("hide");
})
menuIcon.addEventListener("click", () =>{
    headLinksContainer.classList.toggle("show");
    menuResIcon.classList.toggle("hide");
    menuRestext.classList.toggle("hide");
})
headLinks.forEach(link =>{
    link.addEventListener("click", () =>{
        headLinksContainer.classList.remove("show");
        menuResIcon.classList.add("hide");
        menuRestext.classList.add("hide");
    })
})