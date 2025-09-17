document.addEventListener('DOMContentLoaded', () => {
    const likeButton = document.getElementById('like-button');
    const likeCounter = document.getElementById('like-counter');

    let likes = 0;

    likeButton.addEventListener('click', () => {
        likes++;
        likeCounter.textContent = likes;
    });
});
