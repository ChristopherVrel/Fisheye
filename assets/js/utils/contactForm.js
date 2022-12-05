function displayModal(name) {
    const modal = document.getElementById("contact_modal");

    document.getElementById("main").setAttribute("aria-hidden", true);

	modal.style.display = "block";
    modal.setAttribute("aria-hidden", false);

    setTimeout(() => {
        modal.classList.add("open");
    }, 50);

    const modalTitle = modal.querySelector("#modal-title");
    modalTitle.innerText = `Contactez-moi\n${name}`;

    // force focus on the first input
    modal.querySelectorAll("input")[0].focus();

    modal.onsubmit = function(e) {
        e.preventDefault();

        showData(e);
    }

    document.addEventListener("keydown", modalKeyboardControl);
}

// only used to show data in an object
function showData(e) {
    const form = new FormData(e.target);
    const data = [];

    [...form].map(([key, value]) => {
        let label = e.currentTarget.querySelector(`label[for=${key}]`).innerText;

        data.push({ [label]: (value.length > 0) ? value : "" });
    });

    console.log(data);
}

function modalKeyboardControl(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");

    document.getElementById("main").setAttribute("aria-hidden", false);

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", true);

    setTimeout(() => {
        modal.style.display = "none";
    }, 800);

    document.removeEventListener("keydown", modalKeyboardControl);
}

export { displayModal, closeModal };