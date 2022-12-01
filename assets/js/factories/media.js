function mediaFactory(data) {
    const { image, date, likes, photographerId, title } = data;
    const isVideo = Object.prototype.hasOwnProperty.call(data, "video");
    const assetPath = (isVideo) ? `assets/img/photos/${photographerId}/video/${data.video}` : `assets/img/photos/${photographerId}/full/${image}`;
    const assetMediumPath = `assets/img/photos/${photographerId}/medium/${image}`;
    
    function getMediaCardDOM() {
        const article = document.createElement("article");
        const header = document.createElement("header");
        article.appendChild(header);

        if (isVideo) {
            const video = document.createElement("video");
            video.setAttribute("controls", "controls");

            const videoSource = document.createElement("source");
            videoSource.src = assetPath;

            video.appendChild(videoSource);
            header.appendChild(video);
        } 
        else {
            const img = document.createElement("img");
            img.src = assetMediumPath;

            header.appendChild(img);
        }

        const footer = document.createElement("footer");
        article.appendChild(footer);

        const footerTitle = document.createElement("p");
        footerTitle.innerText = title;
        footer.appendChild(footerTitle);

        const footerLikeContainer = document.createElement("div");
        footer.appendChild(footerLikeContainer);

        const footerLikeCount = document.createElement("span");
        footerLikeCount.classList.add("likes-text");
        footerLikeCount.innerText = likes;
        footerLikeContainer.appendChild(footerLikeCount);

        const footerLike = document.createElement("i");
        const isAlreadyLiked = (Object.prototype.hasOwnProperty.call(data, "isAlreadyLiked") ? "likes-checked" : null);
        footerLike.classList.add("fa-regular", "fa-heart", "likes", isAlreadyLiked);
        footerLikeContainer.appendChild(footerLike);

        return article;
    }

    return { date, isVideo, assetPath, getMediaCardDOM }
}

export { mediaFactory };