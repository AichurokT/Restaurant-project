import { getDataMado } from "./dataMado.js";
// import { navFilter } from "./filter.js";

const dataMado = getDataMado();
const leftMenu = document.querySelector(".left-menu")
const rightMenu = document.querySelector(".right-menu")
const titleMenu = document.querySelector("#h1")
const gridContainer = document.querySelector("#grid-container")
const menuId = document.querySelector(".menu-id")
const searchByNames = document.querySelector("#search-bar")
const searchBtn = document.querySelector("#searchBtn")
const li = document.querySelectorAll("li")

// clear fucntion
function clearContainer() {
    while (rightMenu.hasChildNodes()) {
        rightMenu.removeChild(rightMenu.firstChild);
    }
}
// getting id from containerAisulu or leftMenu
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
    clearContainer()
    for (let i = 0; i < arr.length; i++) {
        const newDiv = document.createElement("div")
        newDiv.className = "menu-item"
        newDiv.innerHTML = `
        <a href="#" class="item-card">
          <div class="item-info">
             <img src="${arr[i].imgURL}" class="item-img">
             <div class="served-for">${arr[i].servedFor}</div>
             <div class="item-name">${arr[i].itemTitle}</div>
             <div class="item-price">${arr[i].itemPrice}</div>
          </div>
        </a>
        `
        rightMenu.appendChild(newDiv)
    }
}
function menuDirection() {
    gridContainer.style.display = "grid"
}
// search fucntion by itemTitle name
function searchButton() {
    const result = searchByNames.value.toLowerCase()
    const searchedArray = dataMado.filter(el => el.itemTitle.toLowerCase().includes(result))
    return showItems(searchedArray)
}

// event listeners
searchBtn.addEventListener("click", searchButton)
// searchByNames.addEventListener("click")
menuId.addEventListener("click", menuDirection)
gridContainer.addEventListener("click", rightMenuAction)
leftMenu.addEventListener("click", rightMenuAction)

/// Please double check this code ----\/
// const searchData = dataMado.filter((el) => {
//     let valArr = Object.values(el);
//     return valArr.toString().toLowerCase().includes(result);
//   });

// filtr part Nur
const navFilterBlock = document.querySelector(".nav-search-items");
const itemTitle = document.querySelector("#itemTitle");
const servedFor = document.querySelector("#servedFor");
// ------ slidecontainer---
const slideMax = document.getElementById("priceMax");
const x = document.getElementById("vMax");
// ------ slidecontainer--- ^^^
function filtrPrice() {
    x.innerHTML = slideMax.value;
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

document.querySelector('.servedForInput').addEventListener('input', function (event) {
    const item = event.target.value;
    console.log(item);
    const filteredArray = dataMado.filter((el) => el.servedFor.includes(item));
    showItems(filteredArray)
})
document.querySelector('.itemTitleInput').addEventListener('input', function (event) {
    const item = event.target.value;
    console.log(item);
    const filteredArray = dataMado.filter((el) => el.itemTitle.includes(item));
    showItems(filteredArray)
})
// document.querySelector("#priceSearch").addEventListener("click", () => {
//     console.log("price click")
// })
