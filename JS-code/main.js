import { getDataMado } from "./dataMado.js";
// import { navFilter } from "./filter.js";

const dataMado = getDataMado();
const leftMenu = document.querySelector(".left-menu")
const rightMenu = document.querySelector(".right-menu")
const titleMenu = document.querySelector("#h1")
const mainContainer = document.querySelector(".main-conatiner")
const gridContainer=document.querySelector("#grid-container")
const menuId=document.querySelector(".menu-id")
const searchByNames=document.querySelector("#search-bar")
const searchBtn=document.querySelector("#searchBtn")
const categoryPart=document.querySelector(".master")
const madoPage=document.querySelector(".mado-logo")



// clear fucntion
function clearContainer() {
    while (rightMenu.hasChildNodes()) {
        rightMenu.removeChild(rightMenu.firstChild);
    }
}

// getting id from data
function rightMenuAction(event){
const item=event.target;
titleMenu.innerText=item.innerText
const filteredArray = dataMado.filter(el => el.menus.toLowerCase().includes(item.id))     
showItems(filteredArray)
navFilter(filteredArray); // calling filter part and show
}
// show main page
function showMainPage(){
    mainContainer.style.display="block"
    categoryPart.style.display="none"
    gridContainer.style.display = "none"
}

//fucntion for each category
function showItems(arr) {
    gridContainer.style.display = "none"
    mainContainer.style.display="none"
    categoryPart.style.display="flex"
    clearContainer()
    for(let i=0; i<arr.length;i++){
        const newDiv=document.createElement("div")
        newDiv.className="menu-items"
        newDiv.innerHTML=`
        <img src="${arr[i].imgURL}" class="item-img">
        
                     <div class="menu-items">
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
    mainContainer.style.display="none"
    categoryPart.style.display="none"
   
}
// search fucntion by itemTitle name
function searchButton() {
    const result = searchByNames.value.toLowerCase()
    const searchedArray = dataMado.filter(el => el.itemTitle.toLowerCase().includes(result))
    return showItems(searchedArray)
}


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
// event listeners
searchBtn.addEventListener("click", searchButton )
menuId.addEventListener("click", menuDirection)
gridContainer.addEventListener("click",rightMenuAction )
leftMenu.addEventListener("click", rightMenuAction)
madoPage.addEventListener("click", showMainPage)

