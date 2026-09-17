import { storage } from "./main.js";
import { cartPage } from "./main.js";

function creatProductCard (product, container, className){
    const displayedName = product.name.slice(0, 18) + " ...";
            
    const card = document.createElement("div");
    card.classList.add(className);
    container.appendChild(card);

    card.setAttribute("data-id", product.id);
    card.setAttribute("data-name", product.name);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-oldprice", product.old_price);
    card.setAttribute("data-imgs", product.images);

    const openDetails = document.createElement("button");
    openDetails.classList.add("open_details_page");
    card.appendChild(openDetails);

    const imageBox = document.createElement("div");
    imageBox.classList.add("image");
    card.appendChild(imageBox);

    const img = document.createElement("img");
    imageBox.appendChild(img);
    img.src = product.img;

    const name = document.createElement("a");
    name.classList.add("description");
    name.textContent = displayedName;
    card.appendChild(name);

    const price = document.createElement("div");
    price.classList.add("price");
    const realPrice = document.createElement("p");
    realPrice.classList.add("real_price");
    realPrice.textContent = "$" + product.price;
    price.appendChild(realPrice)
    card.appendChild(price);

    if(product.hasOwnProperty("old_price")){
        let saleBox = document.createElement("p");
        saleBox.classList.add("sale_box");
        let disValue = product.old_price - product.price;
        saleBox.textContent = Math.floor((disValue / product.old_price) * 100) + "%";
        card.appendChild(saleBox);

        let oldPrice = document.createElement("small");
        let lineCross = document.createElement("del");
        price.appendChild(oldPrice);
        oldPrice.appendChild(lineCross);
        lineCross.textContent = "$" + product.old_price;
    };

    let btnBox = document.createElement("div");
    btnBox.classList.add("btn_box");
    card.appendChild(btnBox);

    let addToFavIcon = document.createElement("button");
    addToFavIcon.classList.add("add_to_fav");
    btnBox.appendChild(addToFavIcon);
    let cardFavIcon = document.createElement("i");
    cardFavIcon.classList.add("fa-regular","fa-heart");
    addToFavIcon.appendChild(cardFavIcon);

    let addToCartIcon = document.createElement("button");
    addToCartIcon.classList.add("add_to_cart");
    btnBox.appendChild(addToCartIcon);
    let cardCartIcon = document.createElement("i");
    cardCartIcon.classList.add("fa-solid","fa-cart-shopping");
    addToCartIcon.appendChild(cardCartIcon);
    let content = document.createElement("p");
    content.textContent = "Add to Cart";
    addToCartIcon.appendChild(content);
    
};
fetch("./products_gallery_test.json")
.then(res => res.json())
.then(mydata =>{
    mydata.forEach( product => {
        if(product.hasOwnProperty("old_price")){
        // const originalName = product.name;
        const displayedName = product.name.slice(0, 18) + " ...";
        
        let saleProducts = document.querySelector(".sale_producst");
        let saleCard = document.createElement("div");
        saleCard.classList.add("card");
        saleProducts.appendChild(saleCard);

        saleCard.setAttribute("data-id", product.id);
        saleCard.setAttribute("data-name", product.name);
        saleCard.setAttribute("data-price", product.price);
        saleCard.setAttribute("data-oldprice", product.old_price);
        saleCard.setAttribute("data-imgs", product.images);

        const openDetails = document.createElement("button");
        openDetails.classList.add("open_details_page");
        saleCard.appendChild(openDetails);

        let saleBox = document.createElement("p");
        saleBox.classList.add("sale_box");
        let disValue = product.old_price - product.price;
        saleBox.textContent = Math.floor((disValue / product.old_price) * 100) + "%";
        saleCard.appendChild(saleBox);

        let imageBox = document.createElement("div");
        imageBox.classList.add("image");
        saleCard.appendChild(imageBox);

        let img = document.createElement("img");
        imageBox.appendChild(img);
        img.src = product.img;

        let name = document.createElement("a");
        name.classList.add("description"); 
        name.textContent = displayedName;
        saleCard.appendChild(name);

        let price = document.createElement("div");
        price.classList.add("price");
        let realPrice = document.createElement("p")
        realPrice.classList.add("real_price")
        realPrice.textContent = "$" + product.price;
        price.appendChild(realPrice)
        saleCard.appendChild(price);
        let oldPrice = document.createElement("small");
        let lineCross = document.createElement("del");
        price.appendChild(oldPrice);
        oldPrice.appendChild(lineCross);
        lineCross.textContent = "$" + product.old_price;

        let btnBox = document.createElement("div");
        btnBox.classList.add("btn_box");
        saleCard.appendChild(btnBox);

        let addToFavIcon = document.createElement("button");
        addToFavIcon.classList.add("add_to_fav");
        btnBox.appendChild(addToFavIcon);
        let cardFavIcon = document.createElement("i");
        cardFavIcon.classList.add("fa-regular","fa-heart");
        addToFavIcon.appendChild(cardFavIcon);

        let addToCartIcon = document.createElement("button");
        addToCartIcon.classList.add("add_to_cart");
        btnBox.appendChild(addToCartIcon);
        let cardCartIcon = document.createElement("i");
        cardCartIcon.classList.add("fa-solid","fa-cart-shopping");
        addToCartIcon.appendChild(cardCartIcon);
        let content = document.createElement("p");
        content.textContent = "Add to Cart";
        addToCartIcon.appendChild(content);
        };
    });
    const electronicsProducts = document.querySelector(".electronics_products")
    const applliancesProducts = document.querySelector(".appliances_products")
    const mobilesProducts = document.querySelector(".mobiles_products")
    mydata.forEach(product =>{
        if(product.catetory === "electronics"){
            creatProductCard(product, electronicsProducts, "card")
        };
    })
    mydata.forEach(product =>{
        if(product.catetory === "appliances"){
            creatProductCard(product, applliancesProducts, "card")
        };   
    });
    mydata.forEach(product =>{
        if(product.catetory === "mobiles"){
            creatProductCard(product, mobilesProducts, "card")
        };   
    });

    const containers = document.querySelectorAll(".list_container");

    containers.forEach(container => {
        updateSliderButtons(container);
    });

    
});