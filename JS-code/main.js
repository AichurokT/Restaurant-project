import { getDataMado } from "./dataMado.js";
// import { navFilter } from "./filter.js";

const dataMado = getDataMado();
const leftMenu= document.querySelector(".left-menu")
const rightMenu=document.querySelector(".right-menu")
const titleMenu = document.querySelector("#h1")
const gridContainer=document.querySelector("#grid-container")
const menuId=document.querySelector(".menu-id")
const searchByNames=document.querySelector("#search-bar")
const searchBtn=document.querySelector("#searchBtn")


// clear fucntion
function clearContainer(){
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

//fucntion for each category
export function showItems(arr){
    
    gridContainer.style.display="none"
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
menuId.addEventListener("click", menuDirection)
gridContainer.addEventListener("click",rightMenuAction )
leftMenu.addEventListener("click", rightMenuAction)