import { getDataMado } from "./dataMado.js";
import { showItems } from "./main.js";

const dataMado = getDataMado();
const container = document.querySelector(".container"); // change className

dataMado.forEach(function (el) {
    const info = document.createElement("div");
    info.innerHTML = `
    <h4>${el.menus}</h4>
    <img src="${el.imgURL}" alt="">
    <p>${el.itemTitle}</p>
    <p>${el.servedFor}</p>
    <p>${el.itemPrice}</p>
`
container.appendChild(info)
})

// filtr part Nur

const navFilterBlock = document.querySelector(".nav-search-items");
const itemTitle = document.querySelector("#itemTitle");
const servedFor = document.querySelector("#servedFor");

export function navFilter(filteredArray) {
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
    showItems(filteredArray);
})
document.querySelector('.itemTitleInput').addEventListener('input', function (event) {
    const item = event.target.value;
    console.log(item);
})
// --- search in all  Data
// const searchValue = document.querySelector(".allData");
// export function searchAllData() {
//     const val = searchValue.value;
//     console.log(val);
// }

// ------ slidecontainer---
const slideMin = document.getElementById("priceMin");
const slideMax = document.getElementById("priceMax");
const y = document.getElementById("vMin");
const x = document.getElementById("vMax");
// ------ slidecontainer--- ^^^
export function filtrPrice() {
    y.innerHTML = slideMin.value;
    x.innerHTML = slideMax.value;
    slideMin.oninput = function () {
        y.innerHTML = this.value;
    };
    slideMax.oninput = function () {
        y.innerHTML = this.value;
    };
}