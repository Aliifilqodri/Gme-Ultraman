// script.js
document.addEventListener('DOMContentLoaded', () => {
    const ultraman = document.getElementById('ultraman');
    const monster = document.getElementById('monster');
    const youLose = document.getElementById('you-lose');
    const backgroundMusic = document.getElementById('background-music');
    const jumpSound = document.getElementById('jump-sound');
    const gameOverSound = document.getElementById('game-over-sound');
    let ultramanLeft = 50;

    backgroundMusic.play();

    function jump() {
        if (!ultraman.classList.contains('jump')) {
            ultraman.classList.add('jump');
            jumpSound.play();
            setTimeout(() => {
                ultraman.classList.remove('jump');
            }, 500);
        }
    }

    function moveUltraman(direction) {
        if (direction === 'left' && ultramanLeft > 0) {
            ultramanLeft -= 10;
        } else if (direction === 'right' && ultramanLeft < window.innerWidth - ultraman.clientWidth) {
            ultramanLeft += 10;
        }
        ultraman.style.left = ultramanLeft + 'px';
    }

    document.addEventListener('keydown', event => {
        if (event.code === 'ArrowUp' || event.code === 'Space') {
            jump();
        } else if (event.code === 'ArrowLeft') {
            moveUltraman('left');
        } else if (event.code === 'ArrowRight') {
            moveUltraman('right');
        }
    });

    function collisionDetection() {
        const ultramanRect = ultraman.getBoundingClientRect();
        const monsterRect = monster.getBoundingClientRect();

        if (
            ultramanRect.right > monsterRect.left &&
            ultramanRect.left < monsterRect.right &&
            ultramanRect.bottom > monsterRect.top &&
            ultramanRect.top < monsterRect.bottom
        ) {
            gameOverSound.play();
            backgroundMusic.pause();
            youLose.style.display = 'block';
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    setInterval(collisionDetection, 100);
});
