document.querySelectorAll(".message-date").forEach((element) => {
    const date = new Date(element.dataset.date);

    element.textContent = date.toLocaleString();
});

const button = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");

button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

