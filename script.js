document.querySelectorAll('.bi-heart, .bi-heart-fill').forEach(heart => {
    heart.addEventListener('click', () => {
        if (heart.classList.contains('bi-heart')) {
            heart.classList.replace('bi-heart', 'bi-heart-fill');
            heart.style.color = 'red';
        } else {
            heart.classList.replace('bi-heart-fill', 'bi-heart');
            heart.style.color = '';
        }
    });
});
