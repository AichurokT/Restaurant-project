import { getDataMado } from "./dataMado.js";
// import { navFilter } from "./filter.js";

const dataMado = getDataMado();
const leftMenu = document.querySelector(".left-menu")
const rightMenu = document.querySelector(".right-menu")
const titleMenu = document.querySelector("#h1")
const gridContainer = document.querySelector("#grid-container")
const menuPart = document.querySelector("#menu-part")
const menuId = document.querySelector(".menu-id")
const searchByNames = document.querySelector("#search-bar")
const searchBtn = document.querySelector("#searchBtn")
const li = document.querySelectorAll("li")
const mainContainer = document.querySelector(".main-conatiner")
const categoryPart = document.querySelector(".master")
const madoPage = document.querySelector(".mado-logo")
const backToMenu = document.querySelector("#homeIcon")
const details = document.querySelector(".product-wrapper")
const similarProducts = document.querySelector(".similar-products")

// clear fucntion
function clearContainer() {
    while (rightMenu.hasChildNodes()) {
        rightMenu.removeChild(rightMenu.firstChild);
    }
    while (details.hasChildNodes()) {
        details.removeChild(details.firstChild);
    }
}


function showMainPage() {
    mainContainer.style.display = "block"
    categoryPart.style.display = "none"
    gridContainer.style.display = "none"
    menuPart.style.display = "none"
    navFilterBlock.style.display = "none"
}

// getting id from container or leftMenu
function rightMenuAction(event) {
    const item = event.target;
    li.forEach(el => el.classList.remove("active")) // remove active class
    item.classList.add("active");            // add active class
    titleMenu.innerText = item.innerText
    const filteredArray = dataMado.filter(el => el.menus.toLowerCase().includes(item.id))
    showItems(filteredArray)
    navFilter(filteredArray); // calling filter part and show



}

//fucntion for each category
function showItems(arr) {
    gridContainer.style.display = "none"
    menuPart.style.display = "none"
    mainContainer.style.display = "none"
    categoryPart.style.display = "flex"
    details.style.display = "none"
    clearContainer()
    for (let i = 0; i < arr.length; i++) {
        const newDiv = document.createElement("div")
        newDiv.className = "menu-items"
        newDiv.innerHTML = `
        <img src="${arr[i].imgURL}" class="item-img">
                     <div id="${arr[i].id}" class="menu-items">
                             <div class="served-for">${arr[i].servedFor}</div>
                             <div class="item-name">${arr[i].itemTitle}</div>
                             <div class="item-price">${arr[i].itemPrice}</div>
                         </div>
                
        `
        rightMenu.appendChild(newDiv)
    }
}
function menuDirection() {
    gridContainer.style.display = "grid"
    menuPart.style.display = "block"
    mainContainer.style.display = "none"
    categoryPart.style.display = "none"
    details.style.display = "none"
    navFilterBlock.style.display = "none"

}
function backToCateg() {
    details.style.display = "none"
    categoryPart.style.display = "flex"
    navFilterBlock.style.display = "none"

}
// search fucntion by itemTitle name
function searchButton() {
    const result = searchByNames.value.toLowerCase()
    const searchedArray = dataMado.filter(el => el.itemTitle.toLowerCase().includes(result))
    return showItems(searchedArray)
}
// fucntions to show details (daaniyars part)
function showDetails(event) {
    const items = event.target;
    const searchedItems = dataMado.filter(el => el.id.toString().includes(items.id))
    categoryPart.style.display = "none"
    clearContainer()
    details.style.display = "block"
    for (let i = 0; i < searchedItems.length; i++) {
        const detailDiv = document.createElement("div")
        detailDiv.className = "product-container"
        detailDiv.innerHTML = `
    <div class="chosen-product-img">
        <img src="${searchedItems[i].imgURL}" alt="">
      </div>
      <div class="product-container-right">
        <div>
          <h1 class="chosen-product-name">${searchedItems[i].itemTitle}</h1>
        </div>
        <div>
          <p class="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odio,
            voluptatibus non, debitis mollitia numquam in repellat, labore optio perferendis consequatur quos. Eum ullam
            modi a deleniti sapiente consequuntur ipsa.</p>
        </div>

        <div>
          <p class="product-price">${searchedItems[i].itemPrice}</p>
        </div>
        <button class="addCart">add <i class="fas fa-cart-arrow-down"></i></button>
        <div>
             <div class="delivery-logo"><img src="https://assets.website-files.com/5e613103afff65141c9d0b09/6096052c84b19f2914d274f4_492x0w.jpg"  alt=""> </div> 
          <p>Order from:</p>
        </div>
        <hr>
      </div>
    `


        details.appendChild(detailDiv)
    }
    // similar items
    for (let i = 0; i < 4; i++) {
        let ran = Math.floor(Math.random() * dataMado.length)
        similarProducts.style.display = "grid"
        const detailDiv = document.createElement("div")
        detailDiv.className = "similar-product-list"
        detailDiv.innerHTML = `
        <div class="grid-similar-product">
        <div class="product-card"> <img src="${dataMado[ran].imgURL}"
            alt="">

          <div class="grid-product grid-product-1">
            <p class="similar-product-name">${dataMado[ran].itemTitle}</p>
            <p class="product-price"></p>
          </div>
        </div>
      </div>
        `


        details.appendChild(detailDiv)
    }
}

// filtr part Nur
const navFilterBlock = document.querySelector(".nav-search-items");
const itemTitle = document.querySelector("#itemTitle");
const servedFor = document.querySelector("#servedFor");
// ------ slidecontainer---
const slideMin = document.getElementById("priceMin");
const slideMax = document.getElementById("priceMax");
const y = document.getElementById("vMin");
const x = document.getElementById("vMax");
// ------ slidecontainer--- ^^^
function filtrPrice() {
    y.innerHTML = slideMin.value;
    x.innerHTML = slideMax.value;
    slideMin.oninput = function () {
        y.innerHTML = this.value;
    };
    slideMax.oninput = function () {
        x.innerHTML = this.value;
    };
}
function navFilter(filteredArray) {
    navFilterBlock.style.display = "block";
    filtrPrice();
    itemTitleFn(filteredArray, itemTitle);
    servedForFn(filteredArray, servedFor)
}
function servedForFn(filteredArray, dataList) {
    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }
    const searchArray = [];
    for (let i = 0; i < filteredArray.length; i++) {
        let val = filteredArray[i].servedFor;
        if (!searchArray.includes(val)) {
            searchArray.push(val);
            const d = document.createElement("div");
            d.innerHTML = `<option value="${val}">`;
            dataList.appendChild(d);
        }
    }
}
function itemTitleFn(filteredArray, dataList) {
    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }
    const searchArray = [];
    for (let i = 0; i < filteredArray.length; i++) {
        let val = filteredArray[i].itemTitle;
        if (!searchArray.includes(val)) {
            searchArray.push(val);
            const d = document.createElement("div");
            d.innerHTML = `<option value="${val}">`;
            dataList.appendChild(d);
        }
    }
}
// search functions
document.querySelector('.servedForInput').addEventListener('input', function (event) {
    const item = event.target.value;
    console.log(item);
    const filteredArray = dataMado.filter((el) => el.servedFor.includes(item));
    showItems(filteredArray)
    document.querySelector('.servedForInput').value = ""
})
document.querySelector('.itemTitleInput').addEventListener('input', function (event) {
    const item = event.target.value;
    console.log(item);
    const filteredArray = dataMado.filter((el) => el.itemTitle.includes(item));
    showItems(filteredArray)
    document.querySelector('.itemTitleInput').value = ""
})
document.querySelector("#priceSearch").addEventListener("click", (evt) => {
    evt.preventDefault();
    let priceMax = +x.innerText
    let priceMin = +y.innerText
    const filteredArray = dataMado.filter(el =>
        +(el.itemPrice.replace(/\$/g, '')) <= priceMax && +(el.itemPrice.replace(/\$/g, '')) >= priceMin)
    return showItems(filteredArray)
})

// event listeners
searchBtn.addEventListener("click", searchButton)
menuId.addEventListener("click", menuDirection)
gridContainer.addEventListener("click", rightMenuAction)
leftMenu.addEventListener("click", rightMenuAction)
madoPage.addEventListener("click", showMainPage)
rightMenu.addEventListener("click", showDetails)
backToMenu.addEventListener("click", backToCateg)
