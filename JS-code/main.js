import { getDataMado } from "./dataMado.js";

const dataMado = getDataMado();
const leftMenu= document.querySelector(".left-menu")
const rightMenu=document.querySelector(".right-menu")
const container = document.querySelector(".container123");
const titleMenu = document.querySelector("#h1")
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
// -------------sulu part
function clearContainer(){
    while (rightMenu.hasChildNodes()) {
        rightMenu.removeChild(rightMenu.firstChild);
      }
}




function rightMenuAction(event){
const item=event.target;

const filteredArray=[]
for(let i=0; i<dataMado.length; i++){
   const x = dataMado[i].menus.toLowerCase()
    if(x.includes(item.id)){
        filteredArray.push(dataMado[i])
        // console.log(dataMado[i].menus)
    }
}
showItems(filteredArray)
// console.log(filteredArray)

}
function showItems(arr){
    clearContainer()
    for(let i=0; i<arr.length;i++){
        const newDiv=document.createElement("div")
        newDiv.className="menu-item"
        console.log(arr.servedFor)
        // <h1 id="h1">${arr[i].menus}</h1>
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









leftMenu.addEventListener("click", rightMenuAction)