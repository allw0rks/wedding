document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const loadingPercentage = document.getElementById('loading-percentage');
    const mainContent = document.querySelector('.main-content');
    const detailsSection = document.querySelector('.details-section');
    const countdownSection = document.querySelector('.countdown-section');
    const wishesSection = document.querySelector('.wishes-section');
    const mapSection = document.querySelector('.map-section');
    const detailsButton = document.getElementById('details-button');
    const countdown = document.getElementById('countdown');
    const wishesForm = document.getElementById('wishes-form');
    const musicToggle = document.getElementById('music-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    const body = document.body;

    let percentage = 0;

    // Прелоадер
    const interval = setInterval(() => {
        percentage += 1;
        loadingPercentage.textContent = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(interval);
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000);
            startFireworks();
        }
    }, 30);

    // Автоматическое воспроизведение музыки с громкостью 50%
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
    musicToggle.textContent = '🎵 Выключить музыку';

    // Кнопка "Подробнее"
    detailsButton.addEventListener('click', () => {
        detailsSection.classList.add('visible');
        detailsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Плавное появление элементов при прокрутке
    const sections = [detailsSection, countdownSection, wishesSection, mapSection];

    const checkScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkScroll);

    // Обратный отсчет
    const weddingDate = new Date('2025-05-25T18:00:00').getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = 'Свадьба началась!';
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    // Форма пожеланий
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за ваше пожелание!');
        wishesForm.reset();
    });

    // Музыка
    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Выключить музыку';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Включить музыку';
        }
    });

    // Темная тема
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️ Светлая тема' : '🌙 Темная тема';
    });

    // Фейерверки
    function startFireworks() {
        let particles = [];
        const particleCount = 100;

        function createParticle(x, y) {
            return {
                x: x,
                y: y,
                size: Math.random() * 5 + 1,
                speedX: (Math.random() - 0.5) * 4,
                speedY: (Math.random() - 0.5) * 4,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: Math.random() * 100 + 50 // Увеличиваем время жизни частиц
            };
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 1;

                if (particle.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                }
            });

            if (particles.length < particleCount) {
                particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height)); // Разлет по всему экрану
            }

            requestAnimationFrame(animate);
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});