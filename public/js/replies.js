const replies = document.querySelector(".replies");

async function getReplies() {
    const response = await fetch("");
    const data = await response.json();

    console.log(data);
}
