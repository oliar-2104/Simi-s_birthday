document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.getElementById('countdown-container');
    const cardContainer = document.getElementById('card-container');
    const confettiContainer = document.querySelector('.confetti-container');

    // Set the birthday date to September 18, 2025
    const birthdayDate = new Date('September 17, 2025 18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.opacity = '0';
            setTimeout(() => {
                countdownContainer.style.display = 'none';
                document.body.style.backgroundColor = '#8b0000'; // Darker burgundy on reveal
                document.title = 'Happy Birthday, Simi!';
                showBirthdayCard();
                startConfetti();
            }, 1000);
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial check in case the birthday is already passed
    updateCountdown();

    function showBirthdayCard() {
        cardContainer.style.display = 'block';
        setTimeout(() => {
            cardContainer.classList.add('visible');
        }, 100);
    }

    function startConfetti() {
        const numberOfConfetti = 100;
        for (let i = 0; i < numberOfConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.backgroundColor = i % 2 === 0 ? '#c8a2c8' : '#8b0000';
            confetti.style.width = confetti.style.height = `${Math.random() * 8 + 5}px`;
            confettiContainer.appendChild(confetti);
        }
    }

    // Optional: Auto-show card if the date has passed
    if (new Date().getTime() >= birthdayDate) {
        countdownContainer.style.display = 'none';
        document.body.style.backgroundColor = '#8b0000';
        document.title = 'Happy Birthday, Simi!';
        showBirthdayCard();
        startConfetti();
    }
});
