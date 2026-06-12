document.querySelectorAll(".message-date").forEach((element) => {
    const date = new Date(element.dataset.date);

    element.textContent = date.toLocaleString();
});
