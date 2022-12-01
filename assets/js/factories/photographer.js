function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const lowPicture = `assets/img/photographers/Low_${portrait}`;
    const picture = `assets/img/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.classList.add("article");
        
        const header = document.createElement("header");
        article.appendChild(header);

        const link = document.createElement("a");
        link.setAttribute("href", `${window.location.href}photographer.html?id=${id}`);
        header.appendChild(link);

        const imgContainer = document.createElement("div");
        link.appendChild(imgContainer);

        const lowimg = document.createElement("img");
        lowimg.setAttribute("src", lowPicture);
        
        const img = document.createElement("img");            
        img.onload = function () {
            lowimg.src = this.src;
        };
        setTimeout(() => {
            img.src = picture;
        }, 50);
        imgContainer.appendChild(lowimg);

        const h2 = document.createElement("h2");
        h2.textContent = name;
        link.appendChild(h2);

        const footer = document.createElement("footer");
        article.appendChild(footer);

        const footerH3 = document.createElement("h3");
        footerH3.innerText = `${city}, ${country}`;
        footer.appendChild(footerH3);

        const footerSection = document.createElement("section");
        footer.appendChild(footerSection);

        const footerTagline = document.createElement("p");
        footerSection.innerText = tagline;
        footerSection.appendChild(footerTagline);
        
        const footerPrice = document.createElement("p");
        footerPrice.innerText = `${price}€/Jour`;
        footerSection.appendChild(footerPrice);

        return (article);
    }

    function getUserBannerInformationsDOM() {
        const divContainer = document.createElement("div");
        divContainer.classList.add("photograh-informations");

        const h1 = document.createElement("h1");
        h1.innerText = name;
        divContainer.appendChild(h1);

        const h3 = document.createElement("h3");
        h3.innerText = `${city}, ${country}`;
        divContainer.appendChild(h3);

        const p = document.createElement("p");
        p.innerText = tagline;
        divContainer.appendChild(p);

        return { h1, h3, p };
    }

    function getUserBannerPictureDOM() {
        const lowimg = document.createElement("img");
        lowimg.setAttribute("src", lowPicture);

        const img = document.createElement("img");   

        img.onload = function () {
            lowimg.src = this.src;
        };

        setTimeout(() => {
            img.src = picture;
        }, 50);

        return lowimg;
    }

    function getPhotographStatsDOM() {
        const divContainer = document.createElement("div");
        divContainer.classList.add("photograph-stats");

        const likesContainer = document.createElement("div");
        divContainer.appendChild(likesContainer);

        const likesCount = document.createElement("p");
        likesCount.id = "photograph-likes";
        likesContainer.appendChild(likesCount);

        const likesIcon = document.createElement("i");
        likesIcon.classList.add("fa-solid", "fa-heart");
        likesContainer.appendChild(likesIcon);

        const photograhPrice = document.createElement("p");
        photograhPrice.innerText = `${price}€ / jour`;
        divContainer.appendChild(photograhPrice);

        return divContainer;
    }

    return { 
        name, city, country, tagline, price, picture, 
        getUserCardDOM, 
        getUserBannerPictureDOM, 
        getUserBannerInformationsDOM, 
        getPhotographStatsDOM
    }
}

export { photographerFactory };