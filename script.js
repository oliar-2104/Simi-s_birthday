document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.getElementById('countdown-container');
    const mainContainer = document.getElementById('main-container');
    const confettiContainer = document.querySelector('.confetti-container');

    const birthdayDate = new Date('September 17, 2025 18:00:00').getTime();

    // Main countdown loop
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.opacity = '0';
            setTimeout(() => {
                countdownContainer.style.display = 'none';
                revealSurprise();
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

    // Function to reveal the main page
    function revealSurprise() {
        document.body.style.backgroundColor = '#8b0000'; // Change to burgundy
        document.title = 'Happy Birthday, Simi!';
        mainContainer.style.display = 'block';
        setTimeout(() => {
            mainContainer.classList.add('visible');
            startConfetti();
        }, 100);
    }

    // Confetti animation
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

    // Tab/Section switching logic
    const menuButtons = document.querySelectorAll('.menu-button');
    const sections = document.querySelectorAll('.section-content');

    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.section;
            showSection(targetId);
        });
    });

    // Make a Wish (Cake) logic
    const candles = document.querySelectorAll('.candle');
    let extinguishedCount = 0;

    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('extinguished')) {
                candle.classList.add('extinguished');
                extinguishedCount++;

                if (extinguishedCount === candles.length) {
                    document.getElementById('wish-text').textContent = "Make a wish and blow! Happy Birthday!";
                }
            }
        });
    });

    // Postcard logic
    const postcardText = document.getElementById('postcard-text');
    const createPostcardBtn = document.getElementById('create-postcard');
    const postcardPreview = document.getElementById('postcard-preview');

    const postcardImages = [
        'url(https://source.unsplash.com/random/800x600/?mountains,travel)',
        'url(https://source.unsplash.com/random/800x600/?beach,sunset)',
        'url(https://source.unsplash.com/random/800x600/?forest,river)'
    ];

    createPostcardBtn.addEventListener('click', () => {
        const message = postcardText.value;
        const randomImage = postcardImages[Math.floor(Math.random() * postcardImages.length)];
        postcardPreview.style.backgroundImage = randomImage;
        postcardPreview.innerHTML = `<p>${message}</p>`;
        postcardPreview.style.display = 'block';
    });
    
    // Countdown for next year's birthday
    const nextBirthdayElement = document.querySelector('.next-countdown');
    const nextBirthdayDate = new Date('September 18, 2026 00:00:00').getTime();
    
    const nextBirthdayInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = nextBirthdayDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        nextBirthdayElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);

    // Optional: Auto-show main page if birthday has passed for testing
    // if (new Date().getTime() >= birthdayDate) {
    //     countdownContainer.style.display = 'none';
    //     revealSurprise();
    // }
});
