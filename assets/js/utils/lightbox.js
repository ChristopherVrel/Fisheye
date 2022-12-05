function displayLightbox(allMedias, currentIndex) {
    const lightboxContainer = openLightbox();
    const lightboxContent = lightboxContainer.querySelector("#content");
    const closeButton = lightboxContainer.querySelector(".close-container");

    const paths = {
        prev: allMedias[(currentIndex - 1 < 0) ? allMedias.length - 1 : currentIndex - 1],
        curr: allMedias[currentIndex],
        next: allMedias[(currentIndex + 1 > allMedias.length - 1) ? 0 : currentIndex + 1]
    }

    lightBoxDOM(lightboxContent, paths);

    // keyboard controls
    function moveWithKeyboard(e) {
        switch (e.key) {
            case "ArrowLeft":
                goPrevious();
                break;
            case "ArrowRight":
                goNext();
                break;
            case "Escape":
                closeLightbox(e)
                break;
        }
    }

    // go to previous slide
    function goPrevious() {
        let divs = lightboxContent.querySelectorAll("div");
    
        [...divs].map((e, i) => {
            if (i == 0) {
                e.remove();
    
                currentIndex = (currentIndex < allMedias.length - 1) ? currentIndex + 1 : 0;
                let previousIndex = (currentIndex - 1 < 0) ? allMedias.length - 1 : currentIndex - 1;
                let nextIndex = (currentIndex + 1 > allMedias.length - 1) ? 0 : currentIndex + 1;

                paths.prev = allMedias[previousIndex];
                paths.curr = allMedias[currentIndex];
                paths.next = allMedias[nextIndex];
    
                const content = createLightboxContent(lightboxContent, paths.next);
                content.style.transform = "translateX(150%)";
            }
    
            if (i == 1) {
                e.style.transform = "translateX(-150%)";
                e.style.opacity = "0";
            }
    
            if (i == 2) {
                e.style.transform = "translateX(0)";
                e.style.opacity = "1";
            }
        });
    }
    
    // go to next slide
    function goNext() {
        let divs = lightboxContent.querySelectorAll("div");

        [...divs].map((e, i) => {
            if (i == 0) {
                e.style.transform = "translateX(0)";
                e.style.opacity = "1";
            }
    
            if (i == 1) {
                e.style.transform = "translateX(150%)";
                e.style.opacity = "0";
            }
    
            if (i == 2) {
                e.remove();

                currentIndex = (currentIndex <= 0) ? allMedias.length - 1 : currentIndex - 1;
                let previousIndex = (currentIndex - 1 < 0) ? allMedias.length - 1 : currentIndex - 1;
                let nextIndex = (currentIndex + 1 > allMedias.length - 1) ? 0 : currentIndex + 1;
    
                paths.prev = allMedias[previousIndex];
                paths.curr = allMedias[currentIndex];
                paths.next = allMedias[nextIndex];

                const content = createLightboxContent(lightboxContent, paths.prev, "pre");
                content.style.transform = "translateX(-150%)";

                e.style.opacity = "0";
            }
        });
    }    

    // close lightbox & remove event
    function closeLightbox(e) {
        e.stopPropagation();

        const lightboxContainer = document.getElementById("lightbox");

        const main = document.getElementById("main");
        main.setAttribute("aria-hidden", false);
        main.style.display = "block";

        document.body.style.overflow = "";

        lightboxContainer.classList.remove("open");
        lightboxContainer.querySelector("#content").replaceChildren();

        setTimeout(() => {
            lightboxContainer.style.display = "none";
        }, 800);

        document.removeEventListener("keydown", moveWithKeyboard);
        lightboxContainer.querySelector("#previous").removeEventListener("click", goPrevious);
        lightboxContainer.querySelector("#next").removeEventListener("click", goNext);
    }

    closeButton.addEventListener("click", closeLightbox);
    lightboxContainer.querySelector("#previous").addEventListener("click", goPrevious);
    lightboxContainer.querySelector("#next").addEventListener("click", goNext);
    document.addEventListener("keydown", moveWithKeyboard);
}

// open lightbox
function openLightbox() {
    const lightboxContainer = document.getElementById("lightbox");

    const main = document.getElementById("main");
    main.setAttribute("aria-hidden", true);
    main.style.display = "none";

    document.body.style.overflow = "hidden";

	lightboxContainer.style.display = "flex";

    setTimeout(() => {
        lightboxContainer.classList.add("open");
    }, 50);

    return lightboxContainer;
}

// Create one element in the lightbox
function createLightboxContent(parent, path, child = "app") {
    const content = document.createElement("div");

    if (!path.isVideo) {
        const img = document.createElement("img");

        img.src = path.path;
        img.onload = function () {
            if (img.width >= img.height) {
                img.style.width = "100%";

                if (img.height >= content.clientHeight) {
                    img.style.height = "100%";
                    img.style.width = "auto";
                }
            }

            if (img.height >= img.width) {
                img.style.height = "100%";

                if (img.width >= content.clientWidth) {
                    img.style.width = "100%";
                    img.style.height = "auto";
                }
            }
        }

        content.appendChild(img); 
    }
    else {
        const video = document.createElement("video");
        video.setAttribute("controls", "controls");

        const videoSource = document.createElement("source");
        videoSource.src = path.path;

        video.onloadeddata = function () {
            if (video.videoWidth >= content.clientWidth) {
                video.style.width = "100%";
            }
            else {
                video.style.width = "auto";
            }
        }

        video.appendChild(videoSource);
        content.appendChild(video);   
    }

    if (child === "app") {
        parent.appendChild(content);
    }
    else if (child === "pre") {
        parent.prepend(content);
    }

    return content;
}

// create lightboxDOM on open
function lightBoxDOM(parent, paths) {
    Object.keys(paths).map((e, i) => {
        const content = createLightboxContent(parent, paths[e]);
    
        if (i == 0) {
            content.style.transform = "translateX(-150%)";
        }

        if (i == 1) {
            content.style.transform = "translateX(0)";
            content.style.opacity = "1";
        }

        if (i == 2) {
            content.style.transform = "translateX(150%)";
        }
    });
}


export { displayLightbox };