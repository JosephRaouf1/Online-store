history.scrollRestoration = "manual";
const cartCounter = document.querySelector(".cart_counter");
const favCounter = document.querySelector(".fav_counter");
const cartIcon = document.querySelector(".cart_icon");
const favIcon = document.querySelector(".fav_icon");
const cartSection = document.querySelector(".cart_section");
const favSection = document.querySelector(".fav_section");
export const cartPage = document.querySelector(".cart_page");
const favPage = document.querySelector(".fav_page");
const closeCartMark = document.querySelector(".close_cart_mark");
const closeFavMark = document.querySelector(".close_fav_mark");
const cartQuantity = document.querySelector(".cart_qty");
const favQuantity = document.querySelector(".fav_qty");
const totalPrice = document.querySelector(".total_price");
const productDetailsPage = document.querySelector(".product_details_page");
// const openDetailsBtn = document.querySelector(".open_details_page");
const closeDetailsPage = document.querySelector(".close_details_page");
let cartPriceArr = [];
let productCounter = 0;
let favProductCounter = 0;
function updateFavCounter(){
    favCounter.textContent = favProductCounter; 
    favQuantity.textContent = favProductCounter;
};
cartIcon.addEventListener("click", () => {
    cartSection.classList.remove("close_cart");
});
closeCartMark.addEventListener("click", () => {
    cartSection.classList.add("close_cart");
});
favIcon.addEventListener("click", () => {
    favSection.classList.remove("close_fav");
});
closeFavMark.addEventListener("click", () => {
    favSection.classList.add("close_fav");
});
// openDetailsBtn.addEventListener("click", () => {
//     productDetailsPage.classList.remove("details_hide");
// });
closeDetailsPage.addEventListener("click", () => {
    productDetailsPage.classList.add("details_hide");
});

// ------------------ add to cart oporation -----------------

export let storage = JSON.parse(localStorage.getItem('storage')) || [];

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add_to_cart");
    const product = e.target.closest(".card");
    if(!product) return;
    const productImage = product.querySelector(".image");
    const productName = product.querySelector(".description");
    const productPrice = product.querySelector(".real_price");
    if(!btn || btn.classList.contains("added")) return;
    if(btn){
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart_item");
        cartPage.appendChild(cartItem);

        cartItem.setAttribute("data-id", product.dataset.id);

        const frist = document.createElement("div");
        frist.classList.add("frist");
        cartItem.appendChild(frist);

        const cartImageBox = document.createElement("div");
        cartImageBox.classList.add("image");
        cartImageBox.innerHTML = productImage.innerHTML;
        frist.appendChild(cartImageBox);

        const cartItemTextbox = document.createElement("div");
        cartItemTextbox.classList.add("text_box");
        frist.appendChild(cartItemTextbox);

        const cartItemTitle = document.createElement("p");
        cartItemTitle.classList.add("title");
        cartItemTitle.textContent = productName.textContent;

        const cartItemPrice = document.createElement("p");
        cartItemPrice.classList.add("price");
        cartItemPrice.textContent = productPrice.textContent;

        const qtyControl = document.createElement("div");
        qtyControl.classList.add("qty_control");
        cartItemTextbox.append(cartItemTitle, cartItemPrice, qtyControl);

        const qtyMinus = document.createElement("i");
        qtyMinus.classList.add("fa-solid", "fa-minus");

        const qty = document.createElement("p");
        qty.classList.add("qty");
        qty.textContent = 1;

        const qtyPlus = document.createElement("i");
        qtyPlus.classList.add("fa-solid", "fa-plus");
        qtyControl.append(qtyMinus, qty,  qtyPlus);

        const deleteBox = document.createElement("div");
        deleteBox.classList.add("delete");
        cartItem.appendChild(deleteBox);
        const cartDeleteIcon = document.createElement("i");
        cartDeleteIcon.classList.add("fa-solid", "fa-trash-can", "delete_icon");
        deleteBox.appendChild(cartDeleteIcon);

        cartPriceArr.push(Number(cartItem.querySelector(".price").textContent.split("$").pop()));
        totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);

        const cardId = product.dataset.id;
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(matchId => {
            if(matchId.dataset.id === cardId){
                const matchIdBtn = matchId.querySelector(".add_to_cart");
                matchIdBtn.classList.add("added");
                matchIdBtn.querySelector("p").textContent = "Item in cart";
            };
        });

        productCounter++;
        cartCounter.textContent = productCounter;
        cartQuantity.textContent = productCounter;

        qtyPlus.addEventListener("click", () => {
            const checkPrice = Number(cartItem.querySelector(".price").textContent.split("$").pop());
            const startIndex = cartPriceArr.indexOf(checkPrice);
            qty.textContent++;
            const repeatPrice = Number(productPrice.textContent.split("$").pop()) * Number(qty.textContent);
            cartItemPrice.textContent = "$" + repeatPrice;
            if(cartPriceArr.includes(checkPrice)){
                cartPriceArr.splice(startIndex, 1, repeatPrice);
                totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);
            };
            totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);
        });
        qtyMinus.addEventListener("click", () => {
            if(qty.textContent < 2 ) return;
            const checkPrice = Number(cartItem.querySelector(".price").textContent.split("$").pop());
            const startIndex = cartPriceArr.indexOf(checkPrice);
            qty.textContent--;
            const repeatPrice = Number(productPrice.textContent.split("$").pop()) * Number(qty.textContent);
            cartItemPrice.textContent = "$" + repeatPrice;
            if(cartPriceArr.includes(checkPrice)){
                cartPriceArr.splice(startIndex, 1, repeatPrice);
                totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);
            };
            totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);
        });

        const item ={
            id: product.dataset.id,
            name: product.dataset.name,
            image: product.dataset.imgs,
            price: product.dataset.price,
        };
        // storage.push(item);
        // localStorage.setItem('storage', JSON.stringify(storage));

        cartDeleteIcon.addEventListener("click", (e) => {
            const checkPrice = Number(cartItem.querySelector(".price").textContent.split("$").pop());
            const startIndex = cartPriceArr.indexOf(checkPrice);
            
            if(btn.classList.contains("added") && cartItem.dataset.id === cardId){
                allCards.forEach(matchId => {
                    if(matchId.dataset.id === cardId){
                        const matchIdBtn = matchId.querySelector(".add_to_cart");
                        matchIdBtn.classList.remove("added");
                        matchIdBtn.querySelector("p").textContent = "Add to Cart";
                        // storage.filter(item => item.name !== cartItem.name )
                        // localStorage.setItem('storage', JSON.stringify(storage));
                    };
                });
            };
            cartItem.remove();
            productCounter--;
            if(cartPriceArr.includes(checkPrice)){
                cartPriceArr.splice(startIndex, 1);
                totalPrice.textContent = "$" + cartPriceArr.reduce((a, b) => a + b, 0);
            };
            cartCounter.textContent = productCounter;
            cartQuantity.textContent = productCounter;
        });
        
    };
});
// localStorage.clear()

// --------------------- add to fav oporation ------------------------

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add_to_fav");
    if(!btn) return;
    const product = e.target.closest(".card");
    const productImage = product.querySelector(".image");
    const productName = product.querySelector(".description");
    const productPrice = product.querySelector(".real_price");
    
    let isFav = !btn.classList.contains("fav");
    if(isFav){
        const favItem = document.createElement("div");
        favItem.classList.add("fav_item");
        favPage.appendChild(favItem);

        favItem.setAttribute("data-id", product.dataset.id);

        const frist = document.createElement("div");
        frist.classList.add("frist");
        favItem.appendChild(frist);

        const favImageBox = document.createElement("div");
        favImageBox.classList.add("image");
        favImageBox.innerHTML = productImage.innerHTML;
        frist.appendChild(favImageBox);

        const favItemTextbox = document.createElement("div");
        favItemTextbox.classList.add("text_box");
        frist.appendChild(favItemTextbox);

        const favItemTitle = document.createElement("p");
        favItemTitle.classList.add("title");
        favItemTitle.textContent = productName.textContent;

        const favItemPrice = document.createElement("p");
        favItemPrice.classList.add("price");
        favItemPrice.textContent = productPrice.textContent;
        favItemTextbox.append(favItemTitle, favItemPrice);

        const deleteBox = document.createElement("div");
        deleteBox.classList.add("delete");
        favItem.appendChild(deleteBox);
        const favDeleteIcon = document.createElement("i");
        favDeleteIcon.classList.add("fa-solid", "fa-trash-can", "delete_icon");
        deleteBox.appendChild(favDeleteIcon);

        const cardId = product.dataset.id;
        const allCards = document.querySelectorAll(".card");
        allCards.forEach( matchId => {
            if(matchId.dataset.id === cardId){
                const matchIdBtn = matchId.querySelector(".add_to_fav");
                matchIdBtn.classList.toggle("fav");
                matchIdBtn.querySelector("i").className = "fa-solid fa-heart";
            };
        });

        favProductCounter++;
        updateFavCounter();

        favDeleteIcon.addEventListener("click", (e) => {
            const favItem = e.target.closest(".fav_item");
            const checkPrice = Number(favItem.querySelector(".price").textContent.split("$").pop());
            const checkName = favItem.querySelector(".title");
            allCards.forEach(matchId => {
                if(matchId.dataset.id === cardId){
                    const matchIdBtn = matchId.querySelector(".add_to_fav");
                    if(matchIdBtn.classList.contains("fav")){
                        matchIdBtn.classList.remove("fav");
                        matchIdBtn.querySelector("i").className = "fa-regular fa-heart";
                    };
                };
            });
            favItem.remove();
            favProductCounter--;
            updateFavCounter();
        });
    }else{
        const card = e.target.closest(".card");
        const cardId = product.dataset.id;
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(matchId => {
            if(matchId.dataset.id === cardId){
                const matchIdBtn = matchId.querySelector(".add_to_fav");
                matchIdBtn.classList.remove("fav");
                matchIdBtn.querySelector("i").className = "fa-regular fa-heart";
            };
        });
        favProductCounter--;
        const favItems = favPage.querySelectorAll(".fav_item");
        favItems.forEach(favItem => {
            if(favItem.dataset.id === cardId){
                favItem.remove();
            };
        });
        updateFavCounter();
    };
});

// -------------------------------- open details page ------------------

const detailsPic = document.querySelectorAll(".pic");
const mainPhoto = document.querySelector(".main_photo");
const detContainer = document.querySelector(".det_container");
const detName = document.querySelector(".det_name");
const detPrice = document.querySelector(".det_price");
const detOldPrice = document.querySelector(".det_old_price");

document.addEventListener("click", (e) => {
    const openDetailsBtn = e.target.closest(".open_details_page");
    if(openDetailsBtn){
        productDetailsPage.classList.remove("details_hide");
    };
    const product = e.target.closest(".card");
    if(!product) return;
    const productImage = product.querySelector(".image").innerHTML;
    const moreImgs = product.dataset.imgs.split(",");
    mainPhoto.innerHTML = productImage;
    detName.textContent = product.dataset.name;
    detPrice.textContent = "$" + product.dataset.price;
    detOldPrice.textContent = "$" + product.dataset.oldprice;
    if(product.dataset.oldprice === "undefined"){
        detOldPrice.textContent = ""
    }
    const activePic = mainPhoto.querySelector("img");
    for(i = 0 ; i < moreImgs.length ; i++){
        detailsPic[i].src = moreImgs[i]
    }
    detailsPic.forEach( picture => {
        picture.addEventListener("click", () => {
            activePic.setAttribute("src", picture.getAttribute("src"));
        });
    });
});