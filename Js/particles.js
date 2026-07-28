const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
// Premium, pretty, feminine blue aesthetic elements
const emojis = ['🩵', '✨', '☁️', '💎', '✨', '💙'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + (Math.random() * 150);
        
        // Size and depth variation to make it look like a high-end moving wallpaper
        const depth = Math.random();
        if (depth > 0.7) {
            this.size = Math.random() * 22 + 18; 
            this.opacity = Math.random() * 0.3 + 0.2; // Soft, not distracting
            this.speedY = Math.random() * 0.5 + 0.3; // Slow drifting
        } else {
            this.size = Math.random() * 12 + 8;
            this.opacity = Math.random() * 0.15 + 0.05; // Barely visible background layer
            this.speedY = Math.random() * 0.3 + 0.1;
        }

        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 0.2 - 0.1; // Super gentle rotation
    }

    update() {
        this.y -= this.speedY;
        this.angle += this.spin;

        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px serif`;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
        ctx.restore();
    }
}

function init() {
    // 35 particles create a magical, dreamy atmosphere
    for (let i = 0; i < 35; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
