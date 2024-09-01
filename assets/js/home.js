import { generateCategoryFilters, displayInitialEvents, applyEventFilters } from "../modules/funciones.js";
let fatherCards = document.getElementById("cards");
let categories = document.getElementById("categories");

document.addEventListener('DOMContentLoaded', function () {

    fetch("https://aulamindhub.github.io/amazing-api/events.json")
        .then(res => res.json())
        .then(info => {
            generateCategoryFilters(info, categories, fatherCards);
            displayInitialEvents();


            document.querySelector('input[type="search"]').addEventListener('input', ()=>{
                applyEventFilters()
            });
            categories.addEventListener('change', ()=>{
                applyEventFilters()
            });
        })

});
