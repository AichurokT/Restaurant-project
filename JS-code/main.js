import { getDataMado } from "./dataMado.js";

const dataMado = getDataMado();
const leftMenu= document.querySelector(".left-menu")
const rightMenu=document.querySelector(".right-menu")
const container = document.querySelector(".container123");
const titleMenu = document.querySelector("#h1")
const gridContainer=document.querySelector("#grid-container")
const menuId=document.querySelector(".menu-id")
const searchByNames=document.querySelector("#search-bar")
const searchBtn=document.querySelector("#searchBtn")
// dataMado.forEach(function (el) {
//     const info = document.createElement("div");
//     info.innerHTML = `
//     <h4>${el.menus}</h4>
//     <img src="${el.imgURL}" alt="">
//     <p>${el.itemTitle}</p>
//     <p>${el.servedFor}</p>
//     <p>${el.itemPrice}</p>
// `
// container.appendChild(info)
// })

// clear fucntion
function clearContainer(){
    while (rightMenu.hasChildNodes()) {
        rightMenu.removeChild(rightMenu.firstChild);
      }
}
// getting id from data
function rightMenuAction(event){
const item=event.target;
// console.log(item.innerText)
titleMenu.innerText=item.innerText
// const filteredArray=[]
const filteredArray = dataMado.filter(el => el.menus.toLowerCase().includes(item.id))
// for(let i=0; i<dataMado.length; i++){
//    const x = dataMado[i].menus.toLowerCase()
//     if(x.includes(item.id)){
//         filteredArray.push(dataMado[i])
//         // console.log(dataMado[i].menus)
//     }
// }

      
showItems(filteredArray)
// console.log(filteredArray)

}
//fucntion for each category
function showItems(arr){
    
    gridContainer.style.display="none"
    clearContainer()
    for(let i=0; i<arr.length;i++){
        const newDiv=document.createElement("div")
        newDiv.className="menu-item"

        newDiv.innerHTML=`
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
function menuDirection(){
    gridContainer.style.display="grid"
}
// search fucntion 
function searchButton(){
const result = searchByNames.value.toLowerCase()
const searchedArray = dataMado.filter(el => el.itemTitle.toLowerCase().includes(result))
return showItems(searchedArray)
}
/// Please double check this code ----\/
// const searchData = dataMado.filter((el) => {
//     let valArr = Object.values(el);
//     return valArr.toString().toLowerCase().includes(result);
//   });




// event listeners
searchBtn.addEventListener("click", searchButton )
// searchByNames.addEventListener("click")
menuId.addEventListener("click", menuDirection)
gridContainer.addEventListener("click",rightMenuAction )
leftMenu.addEventListener("click", rightMenuAction)