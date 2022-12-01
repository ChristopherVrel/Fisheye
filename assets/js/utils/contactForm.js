function displayModal(name) {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    setTimeout(() => {
        modal.classList.add("open");
    }, 50);

    const modalTitle = modal.querySelector("#modal-title");
    modalTitle.innerText = `Contactez-moi\n${name}`;

    modal.onsubmit = function(e) {
        e.preventDefault();

        showData(e);
    }
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

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("open");

    setTimeout(() => {
        modal.style.display = "none";
    }, 800);
}

export { displayModal, closeModal };