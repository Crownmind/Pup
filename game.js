const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load snake head image and targets
const snakeHeadImg = new Image();
snakeHeadImg.src = '1.jpg';

const targets = ['2.png', '3.png', '4.png'].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let snake = [{ x: 50, y: 50 }];
let target = { x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) };
let score = 0;
let speed = 5;
let bodyColor = 'green';
let growing = false;
let scoreDisplay = document.getElementById('score-display');

// Load and play background music
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.5; // Adjust volume if needed
bgMusic.play(); // Ensure autoplay works

// Set the initial direction
let direction = { x: 0, y: 0 };

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move snake
    const head = { ...snake[0] };
    head.x += direction.x * speed;
    head.y += direction.y * speed;

    // Borderless world logic (snake goes through walls)
    if (head.x >= canvas.width) head.x = 0;
    if (head.y >= canvas.height) head.y = 0;
    if (head.x < 0) head.x = canvas.width;
    if (head.y < 0) head.y = canvas.height;

    // Add new head and remove last part of the snake unless growing
    snake.unshift(head);
    if (!growing) {
        snake.pop();
    } else {
        growing = false;
    }

    // Draw snake head and body
    ctx.drawImage(snakeHeadImg, head.x, head.y, 30, 30);
    for (let i = 1; i < snake.length; i++) {
        ctx.fillStyle = bodyColor;
        ctx.fillRect(snake[i].x, snake[i].y, 30, 30);
    }

    // Check if snake eats target
    if (Math.abs(head.x - target.x) < 30 && Math.abs(head.y - target.y) < 30) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        growing = true;

        // Delay the appearance of the next target by 0.1 seconds
        setTimeout(() => {
            target = { x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) };
        }, 100);
    }

    // Draw target
    const targetImg = targets[Math.floor(Math.random() * targets.length)];
    ctx.drawImage(targetImg, target.x, target.y, 30, 30);

    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Reset the game but keep the score
            snake = [{ x: 50, y: 50 }];
        }
    }

    requestAnimationFrame(gameLoop);
}

// Helper function to get random coordinates
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

requestAnimationFrame(gameLoop);
