const replies = document.querySelectorAll(".replies");

async function getReplies() {
    const dev = "http://localhost:3000/api/replies"
    const prod = "https://mini-message-board-0ait.onrender.com/api/replies"
    const response = await fetch(dev);
    const data = await response.json();

    replies.forEach((replyElement) => {
        const messageId = Number(replyElement.id);

        const replyCount = data.filter((reply) => reply.message_id === messageId).length;

        replyElement.textContent = `Replies: ${replyCount}`
    })

}

getReplies();
