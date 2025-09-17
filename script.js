document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.getElementById('countdown-container');
    const cardContainer = document.getElementById('card-container');
    const confettiContainer = document.querySelector('.confetti-container');
    const activitiesContainer = document.getElementById('activities-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizResult = document.getElementById('quiz-result');
    const postcardText = document.getElementById('postcard-text');
    const createPostcardBtn = document.getElementById('create-postcard');
    const postcardPreview = document.getElementById('postcard-preview');

    const birthdayDate = new Date('September 17, 2025 00:00:00').getTime();

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

    updateCountdown();

    function revealSurprise() {
        document.body.style.backgroundColor = '#8b0000';
        document.title = 'Happy Birthday, Simi!';
        cardContainer.style.display = 'block';
        setTimeout(() => {
            cardContainer.classList.add('visible');
            startConfetti();
            startFloatingIcons();
        }, 100);

        // Reveal activities section after a delay
        setTimeout(() => {
            activitiesContainer.style.display = 'block';
            setTimeout(() => activitiesContainer.classList.add('visible'), 50);
        }, 4000);
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
    
    function startFloatingIcons() {
        const icons = ['✈️', '📸', '🎈', '🧭', '🎉'];
        for (let i = 0; i < 20; i++) {
            const icon = document.createElement('div');
            icon.classList.add('floating-icon');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.animationDuration = `${Math.random() * 8 + 5}s`;
            icon.style.animationDelay = `${Math.random() * 3}s`;
            document.body.appendChild(icon);
        }
    }

    // Friendship Quiz Logic
    const quizQuestions = [
        {
            question: "What is the best way to cheer me up when I'm down?",
            options: ["A funny meme", "A long conversation", "A short voice note", "A video of a cat"],
            answer: "A long conversation"
        },
        {
            question: "If we could travel anywhere, where would we go first?",
            options: ["Switzerland's mountains", "A historical city in Europe", "A beach in Bali", "A safari in Africa"],
            answer: "A historical city in Europe"
        }
    ];
    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuizQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            quizQuestion.textContent = currentQuestion.question;
            quizOptions.innerHTML = '';
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
                quizOptions.appendChild(button);
            });
        } else {
            quizResult.textContent = `Quiz complete! Your score: ${score} out of ${quizQuestions.length}.`;
            quizOptions.innerHTML = '';
        }
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
            quizResult.textContent = 'Correct!';
        } else {
            quizResult.textContent = 'Not quite! The answer was: ' + correct;
        }
        currentQuestionIndex++;
        setTimeout(() => {
            quizResult.textContent = '';
            displayQuizQuestion();
        }, 1500);
    }
    displayQuizQuestion();

    // Digital Postcard Logic
    const postcardImages = [
        'url(https://source.unsplash.com/random/800x600/?mountains,nature)',
        'url(https://source.unsplash.com/random/800x600/?travel,landscape)',
        'url(https://source.unsplash.com/random/800x600/?city,sunset)'
    ];

    createPostcardBtn.addEventListener('click', () => {
        const message = postcardText.value;
        const randomImage = postcardImages[Math.floor(Math.random() * postcardImages.length)];
        postcardPreview.style.backgroundImage = randomImage;
        postcardPreview.innerHTML = `<p>${message}</p>`;
        postcardPreview.style.display = 'block';
    });
    
    // Optional: Auto-show card if the date has passed
    if (new Date().getTime() >= birthdayDate) {
        countdownContainer.style.display = 'none';
        revealSurprise();
    }
});
