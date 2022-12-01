
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { displayLightbox } from "../utils/lightbox.js";
import { displayFilterBar } from "../utils/filterBar.js";
import { closeModal, displayModal } from "../utils/contactForm.js";

// get all medias by photograph id
async function getMedias(id) {
    return await fetch("assets/data/photographers.json")
        .then((response) => response.json())
        .then((data) => { return data.media.filter(e => e.photographerId == id) });
}

// get photograph informations by id
async function getPhotographersByID(id) {
    return await fetch("assets/data/photographers.json")
        .then((response) => response.json())
        .then((data) => { return data.photographers.filter(e => e.id == id) });
}


// create medias cards, attach event & display
async function displayData(medias) {
    const photograhMedia = document.querySelector(".photograph-medias");
    const allmedias = [];

    (photograhMedia.childElementCount > 0) ? photograhMedia.replaceChildren() : "";

    medias.forEach((media, index) => {
        const mediasModel = mediaFactory(media);
        const mediaCardDOM = mediasModel.getMediaCardDOM();

        allmedias.push({
            path: mediasModel.assetPath,
            isVideo: mediasModel.isVideo
        });

        mediaCardDOM.querySelector("header").addEventListener("click", (e) => {
            displayLightbox(allmedias, index);
        });

        mediaCardDOM.querySelector("footer .likes").addEventListener("click", (e) => {
            updatePhotographStats(e, media);
        });

        photograhMedia.appendChild(mediaCardDOM);
    });
}

// create & display photograph banner
async function displayBanner(photographerModel) {
    const photographInfos = document.querySelector(".photograh-informations");
    const photographImage = document.querySelector(".photograph-image");    

    const bannerInfos = photographerModel.getUserBannerInformationsDOM();
    Object.keys(bannerInfos).map(e => photographInfos.appendChild(bannerInfos[e]));

    const bannerImage = photographerModel.getUserBannerPictureDOM();
    photographImage.appendChild(bannerImage);

    document.querySelector(".photograph-header .contact_button").addEventListener("click", () => displayModal(photographerModel.name));
    document.querySelector("#contact_modal .modal header div img").addEventListener("click", closeModal);
}

// create & display photograph banner
async function displayPhotographgStats(photographerModel, totalLikesCount) {
    const mainContainer = document.getElementById("main");
    const likesContainer = photographerModel.getPhotographStatsDOM();

    likesContainer.querySelector("#photograph-likes").innerText = totalLikesCount;
    mainContainer.appendChild(likesContainer);
}

// update target & global likes count
function updatePhotographStats(e, media) {
    let element = e.target;
    let likesElement = element.parentNode.querySelector(".likes-text");
    let totalLikesElement = document.getElementById("photograph-likes");
    let totalLikes = parseInt(totalLikesElement.innerText);

    if (element.classList.contains("likes-checked")) {
        element.classList.remove("likes-checked");

        likesElement.innerText = media.likes - 1;
        media.likes -= 1;
        media["isAlreadyLiked"] = false;
        totalLikesElement.innerText = totalLikes - 1;
    }
    else {
        element.classList.add("likes-checked");

        likesElement.innerText = media.likes + 1;
        media.likes += 1;
        media["isAlreadyLiked"] = true;
        totalLikesElement.innerText = totalLikes + 1;
    }
}

// get total likes from all medias
function getTotalLikes(medias) {
    return medias.reduce((a, b) => a + b.likes, 0);
}

const regNum = new RegExp(/^[0-9]{1,4}$/);
// test url parameters & throw an error 
async function testParams(id) {
    const medias = await getMedias(id);

    return (regNum.test(id) && medias.length > 0) ? medias : (() => { throw new Error("Parameters Error") })();
}

// initialize photograph page
async function init() {
    const photographerID = (new URL(document.location)).searchParams.get("id");

    testParams(photographerID).then(async (medias) => {
        const photograph = await getPhotographersByID(photographerID);
        const photographerModel = photographerFactory(photograph[0]);

        displayBanner(photographerModel);

        displayFilterBar(medias, photographerModel);

        // sort data by default popularity
        medias = [...medias].sort((a, b) => b.likes - a.likes);
        displayData(medias);

        const totalLikesCount = getTotalLikes(medias);
        displayPhotographgStats(photographerModel, totalLikesCount);
    }).catch((error) => {
        console.log(`[rejected]: ${error.message}`);
        window.location.replace(`${window.location.origin}/404.html`);
    });
}

init();

export { displayData };