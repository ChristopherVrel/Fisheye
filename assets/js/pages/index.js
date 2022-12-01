import { photographerFactory } from "../factories/photographer.js";

// get all photograph
async function getPhotographers() {
    return await fetch("assets/data/photographers.json")
        .then((response) => response.json())
        .then((data) => { return data.photographers });
}

// create photograph cards & display
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);

        const userCardDOM = photographerModel.getUserCardDOM();

        photographersSection.appendChild(userCardDOM);
    });
}

// initialize index page
async function init() {
    const photographers = await getPhotographers();
    
    displayData(photographers);
}

init();
    