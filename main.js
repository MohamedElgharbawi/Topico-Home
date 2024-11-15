let myCart = document.querySelector(".my-cart");
let bodyofcart = document.querySelector(".my-cart .body");
let final_price = document.getElementsByClassName("final-price")[0];
let final_price2 = document.getElementsByClassName("final-price")[1];
let P = 0;
let other_product_swiper = document.getElementById("other_product_swiper");
let other_product_swiper2 = document.getElementById("other_product_swiper2");
let to_Top = document.querySelector(".to-Top");
let bg1 = document.querySelector(".bg");
let bars = document.querySelector(".fa-bars");
let fa_circle_xmark = document.querySelector(".fa-circle-xmark");
let span = document.querySelector("header nav+span");
let nav = document.querySelector("header nav");
let btn_Swip = document.querySelectorAll(".btn-Swip");
let arr = [];
let shopMoreBtn = document.querySelector(".my-cart button:not(.checkout)");
let checkBtn = document.querySelector(".checkout");
shopMoreBtn.onclick = function () {
    myCart.classList.remove("active");
    bg1.classList.remove("active");
}
btn_Swip.forEach(e => {
    e.style.top = `${e.offsetHeight + document.querySelector(".top-slide").offsetHeight + 12}px`;
})
document.querySelector(".date").append(new Date().getFullYear());
window.onscroll =  _ => to_Top.style.display = window.scrollY ? "block" : "none";
to_Top.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
function addActive() {
    myCart.classList.add("active");
}
function removeActive() {
    myCart.classList.remove("active")
} 
function set_bg_active() {
    bg1.classList.add("active");
}
function remove_bg_active() {
    bg1.classList.remove("active");
}
bars.onclick = function () {
    nav.style.display = "block";
    span.style.display = "block";
}
document.querySelector(".side-bar").style.cssText = `margin-top:${document.querySelector("header").offsetHeight + 20}px`;
window.onresize =  () => {
    document.querySelector(".side-bar").style.cssText = `margin-top:${document.querySelector("header").offsetHeight + 20}px`;
}
fa_circle_xmark.onclick = function () {
    fa_circle_xmark.parentElement.parentElement.style.display = "none";
    span.style.display = "none";
}
span.onclick = function () {
    nav.style.display = "none";
    span.style.display = "none";
}
function removeProducts() {
    let i = document.querySelectorAll(".my-cart .body i");
    i.forEach(product => {
        product.addEventListener("click", () => {
            let imgs = document.querySelectorAll(".product .img-product :first-child");
            for (let i = 0; i < imgs.length; i++) 
                if (imgs[i].src === product.parentElement.firstElementChild.firstElementChild.src) 
                    imgs[i].parentElement.parentElement.children[1].firstElementChild.classList.remove("active");
            product.parentElement.remove();
            document.querySelector(".count-items").innerHTML = document.querySelector(".my-cart .body").children.length;
            document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${document.querySelector(".my-cart .body").children.length} Item In Cart)`;
            P -= Number(product.parentElement.children[1].children[1].innerHTML.slice(1));
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            if (!document.querySelectorAll(".my-cart .body i").length) {
                bodyofcart.innerHTML += `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
                window.localStorage.clear();
            }
            addToLocalStorageOrRemove();
        });
    });
}
if (!bodyofcart.children.length) bodyofcart.innerHTML = `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
fetch("Ecommerce-Website.json").then(data => data.json()).then(products => {
    let TheProducts = document.getElementById("TheProducts");
    products.forEach(product => {
        let salePercentage = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0;
        let oldPriceHTML = product.old_price ? `<p class="old-price">${product.old_price}</p>` : "";
        let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
        let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`
        let TheProduct = `
                <div class="product position-relative text-center overflow-hidden swiper-slide">
                    ${salePercentage ? SPAN : ZERO}
                    <div class="icons position-absolute d-flex flex-column">
                        <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
                    </div>
                    <div class="img-product position-relative">
                        <img src="${product.img}" alt="">
                        <img class="img-hover position-absolute" src="${product.img_hover}" alt="">
                    </div>
                    <h3 class="product-name">
                        <a href="#">${product.name}</a>
                    </h3>
                    <div class="stars my-3">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="price d-flex justify-content-center align-items-center">
                        <p class="fw-bold">${product.price}</p>
                        ${oldPriceHTML}
                    </div>
                </div>
                `;
        TheProducts.innerHTML += TheProduct;
        if (other_product_swiper)
            other_product_swiper.innerHTML += TheProduct;
        if (other_product_swiper2)
            other_product_swiper2.innerHTML += TheProduct;
    });
    let Elements = TheProducts.children;
    Elements = [...Elements];
    Elements.forEach(Element => {
        let bodyOfCart = document.querySelector(".my-cart .body");
        let count_items = document.querySelector(".count-items");
        Element.children[1].children[0].onclick =  function ()  {
            this.classList.add("active");
            let allImgs = document.querySelectorAll(".my-cart .body img");
            let flag = true;
            if (other_product_swiper) {
                for (let i = 0; i < other_product_swiper.children.length; i++)
                    if (Element.children[2].firstElementChild.src === other_product_swiper.children[i].children[2].firstElementChild.src) {
                        other_product_swiper.children[i].children[1].children[0].classList.add("active");
                        break;
                    }
            }
            if (other_product_swiper2) {
                for (let i = 0; i < other_product_swiper2.children.length; i++)
                    if (Element.children[2].firstElementChild.src === other_product_swiper2.children[i].children[2].firstElementChild.src) {
                        other_product_swiper2.children[i].children[1].children[0].classList.add("active");
                        break;
                    }
            }
            for (let i = 0; i < allImgs.length; i++)
                if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                    flag = false;
                    break;
                }
            if (flag) {
                if (document.querySelector(".no-product"))
                    document.querySelector(".no-product").remove();
            P += parseInt(Element.children[5].firstElementChild.innerHTML);
            let count_items = document.querySelector(".count-items"); 
            bodyOfCart.innerHTML += `
                <div class="product d-flex align-items-center">
                    <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                    <div class="text">
                        <p>${Element.children[3].firstElementChild.innerHTML}</p>
                        <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                    </div>
                    <i class="fa-solid fa-trash"></i>
                </div>
            `;
                addToLocalStorageOrRemove();
                final_price.innerHTML = `$${P}`;
                final_price2.innerHTML = `$${P}`;
                count_items.innerHTML = bodyOfCart.children.length;
                document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                removeProducts();
            }    
        };
    });
    if (other_product_swiper) {
        Elements = other_product_swiper.children;
        Elements = [...Elements];
        Elements.forEach((Element) => {
            let bodyOfCart = document.querySelector(".my-cart .body");
            let count_items = document.querySelector(".count-items");
            Element.children[1].children[0].onclick = function () {
                this.classList.add("active");
                let allImgs = document.querySelectorAll(".my-cart .body img");
                let flag = true;
                for (let i = 0; i < TheProducts.children.length; i++) 
                    if (Element.children[2].firstElementChild.src === TheProducts.children[i].children[2].firstElementChild.src) {
                        TheProducts.children[i].children[1].firstElementChild.classList.add("active");
                        break;
                    }
                for (let i = 0; i < other_product_swiper2.children.length; i++) 
                    if (Element.children[2].firstElementChild.src === other_product_swiper2.children[i].children[2].firstElementChild.src) {
                        other_product_swiper2.children[i].children[1].children[0].classList.add("active");
                        break;
                    }
                for (let i = 0; i < allImgs.length; i++)
                    if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                        flag = false;
                        break;
                    }
                if (flag) {
                    if (document.querySelector(".no-product"))
                        document.querySelector(".no-product").remove();
                    P += parseInt(Element.children[5].firstElementChild.innerHTML);
                    let count_items = document.querySelector(".count-items");
                    bodyOfCart.innerHTML += `
                    <div class="product d-flex align-items-center">
                        <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                        <div class="text">
                            <p>${Element.children[3].firstElementChild.innerHTML}</p>
                            <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                        </div>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                `;
                    addToLocalStorageOrRemove();
                    final_price.innerHTML = `$${P}`;
                    final_price2.innerHTML = `$${P}`;
                    count_items.innerHTML = bodyOfCart.children.length;
                    document.querySelector(
                        ".my-cart .head p .Span_Two"
                    ).innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                    removeProducts();
                }
            };
        });
        if (window.localStorage.getItem("arr")) {
            let a = window.localStorage.getItem("arr").split(",");
            for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < other_product_swiper.children.length; j++) {
                        if (other_product_swiper.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                            other_product_swiper.children[j].children[1].firstElementChild.classList.add("active");
                            break;
                        }
                    }
            }
        }
    }
    if (other_product_swiper2) {
        Elements = other_product_swiper2.children;
        Elements = [...Elements];
        Elements.forEach((Element) => {
            let bodyOfCart = document.querySelector(".my-cart .body");
            let count_items = document.querySelector(".count-items");
            Element.children[1].children[0].onclick = function () {
                this.classList.add("active");
                let allImgs = document.querySelectorAll(".my-cart .body img");
                let flag = true;
                for (let i = 0; i < TheProducts.children.length; i++) 
                    if (Element.children[2].firstElementChild.src === TheProducts.children[i].children[2].firstElementChild.src) {
                        TheProducts.children[i].children[1].firstElementChild.classList.add("active");
                        break;
                    }
                for (let i = 0; i < other_product_swiper.children.length; i++) 
                    if (Element.children[2].firstElementChild.src === other_product_swiper.children[i].children[2].firstElementChild.src) {
                        other_product_swiper.children[i].children[1].firstElementChild.classList.add("active");
                        break;
                    }
                for (let i = 0; i < allImgs.length; i++)
                    if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                        flag = false;
                        break;
                    }
                if (flag) {
                    if (document.querySelector(".no-product"))
                        document.querySelector(".no-product").remove();
                    P += parseInt(Element.children[5].firstElementChild.innerHTML);
                    let count_items = document.querySelector(".count-items");
                    bodyOfCart.innerHTML += `
                    <div class="product d-flex align-items-center">
                        <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                        <div class="text">
                            <p>${Element.children[3].firstElementChild.innerHTML}</p>
                            <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                        </div>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                `;
                    addToLocalStorageOrRemove();
                    final_price.innerHTML = `$${P}`;
                    final_price2.innerHTML = `$${P}`;
                    count_items.innerHTML = bodyOfCart.children.length;
                    document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                    removeProducts();
                }
            };
        });
        if (window.localStorage.getItem("arr")) {
            let a = window.localStorage.getItem("arr").split(",");
            for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < other_product_swiper2.children.length; j++) {
                        if (other_product_swiper2.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                            other_product_swiper2.children[j].children[1].firstElementChild.classList.add("active");
                            break;
                        }
                    }
            }
        }
    }
    if (window.localStorage.getItem("arr")) {
        let a = window.localStorage.getItem("arr").split(",");
        for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < TheProducts.children.length; j++) {
                    if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                        TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                        break;
                    }
                }
        }
    }
});
var swiper = new Swiper(".slide-swp", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});
var swiper = new Swiper(".sale-sec ", {
    pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
    },
    slidesPerView:5,
    spaceBetween:30,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    loop: true,
});
var swiper = new Swiper(".product_swip ", {
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});
function addToLocalStorageOrRemove() {
    let A = document.querySelector(".body");
    A = [...A.children];
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        let img = A[i].querySelector("img");
        let src = img.getAttribute("src");
        let absoluteUrl = new URL(src, window.location.href);
        let relativeUrl = absoluteUrl.pathname.slice(13).substr(0 , 10) + " " +absoluteUrl.pathname.slice(13).substr(13) ;
        arr.push(relativeUrl);
    }
    window.localStorage.setItem("arr", arr);
}
checkBtn.onclick = function () {
    window.open("https://mohamedelgharbawi.github.io/Topico-Checkout/", "_self"); 
}


if (window.localStorage.getItem("arr")) {
    let a = window.localStorage.getItem("arr").split(",");
    bodyofcart.innerHTML = "";
    for (let i = 0; i < a.length; i++) {
        fetch("Ecommerce-Website.json").then(data => data.json()).then(data => {
            for (let j = 0; j < data.length; j++) {
                if (a[i] === data[j].img) {
                    bodyofcart.innerHTML += 
                                    `<div class="product d-flex align-items-center">
                                            <div class="image"><img src="${a[i]}" alt="image${i + 1}"></div>
                                            <div class="text">
                                                <p>${data[j].name}</p>
                                                <div class="price">$${data[j].price}</div>
                                            </div>
                                            <i class="fa-solid fa-trash"></i>
                                    </div>`;        
                    P += data[j].price;
                    break;
                }
            }
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            document.querySelector("span.count-items").innerHTML = bodyofcart.children.length;
            document.querySelector(".Span_Two").innerHTML = `(${bodyofcart.children.length} Item In Cart)`;
            removeProducts();
        })
    }
}