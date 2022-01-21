import { getDataMado } from "./dataMado.js";
// import { showItems } from "./main.js";

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

