import { displayData } from "../pages/photographer.js";

async function displayFilterBar(medias) {
    const filterBarContainer = document.querySelector(".filter-bar .filter-container");
    const filterActive = filterBarContainer.querySelector(".filter-active");
    const filterOptions = filterBarContainer.querySelectorAll(".filter-options div");

    filterActive.addEventListener("click", (e) => {
        e.stopPropagation();
        if (filterBarContainer.classList.contains("filter-opened")) {
            filterBarContainer.classList.remove("filter-opened");
        }
        else {
            filterBarContainer.classList.add("filter-opened");
        }
    });

    filterOptions.forEach((e) => {
        e.addEventListener("click", () => {
            if (!e.classList.contains("filter-selected")) {
                filterBarContainer.querySelector(".filter-selected").classList.remove("filter-selected");
                filterActive.querySelector("div").innerText = e.innerText;

                e.classList.add("filter-selected");

                switch (e.innerText) {
                    case "Popularité":
                        medias = [...medias].sort((a, b) => b.likes - a.likes);
                        break;
                    case "Date":
                        medias = [...medias].sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                    case "Titre":
                        medias = [...medias].sort((a, b) => (a.title > b.title) ? 1 : -1);
                        break;
                }

                displayData(medias);
            }

            filterBarContainer.classList.remove("filter-opened");
        });
    });

    function closeOptions() {
        if (filterBarContainer.classList.contains("filter-opened")) {
            filterBarContainer.classList.remove("filter-opened");
        }
    }

    document.addEventListener("scroll", closeOptions);
    document.addEventListener("click", closeOptions);
}

export { displayFilterBar };