// Enhanced Particle System with Physics
class Particle {
  constructor(x, y, vx, vy, color = '#ff1493', size = 8, life = 1) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.gravity = 0.15;
    this.friction = 0.98;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.life -= 0.012;
    this.size *= 0.97;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.5, this.size), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.restore();
  }
}

// Particle System Manager
const particles = [];
let canvas = null;
let ctx = null;
let animationId = null;

function initCanvas() {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '998';
  document.body.insertBefore(canvas, document.body.firstChild);
  ctx = canvas.getContext('2d');

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function createConfetti(x, y, count = 30) {
  const colors = ['#ff1493', '#ff69b4', '#ff6b9d', '#c71585', '#ffffff', '#ffb6d9', '#ffd700', '#ff69b4'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    const vx = Math.cos(angle) * speed;
    const vy = (Math.sin(angle) - 1) * speed;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 5 + Math.random() * 8;
    particles.push(new Particle(x, y, vx, vy, color, size, 0.8));
  }
}

function createHeartParticles(x, y, count = 20) {
  const colors = ['#ff1493', '#ff69b4', '#ffffff', '#ffc0cb', '#ff6b9d', '#c71585'];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const speed = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 6;
    particles.push(new Particle(x, y, vx, vy, color, size, 1));
  }
}

// Mouse cursor glow and interactive particles - optimized
document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';

    // Reduced particle creation on movement - 5% instead of 15%
    if (Math.random() < 0.05) {
      createConfetti(e.clientX, e.clientY, 1);
    }
  }
}, { passive: true });

// Click for celebration burst - reduced
document.addEventListener('click', (e) => {
  if (Math.random() < 0.6) {
    createHeartParticles(e.clientX, e.clientY, 15);
    createConfetti(e.clientX, e.clientY, 20);
  }
});

// Animation loop
function animate() {
  if (!canvas) return;
  
  // Clear canvas with fade effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  animationId = requestAnimationFrame(animate);
}

// Initialization
window.addEventListener('load', () => {
  initCanvas();
  animate();

  // Trigger celebration on page load
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Optimized initial burst - reduced from 20 waves to 10
  for (let wave = 0; wave < 10; wave++) {
    setTimeout(() => {
      createHeartParticles(centerX, centerY, 30);
      createConfetti(centerX, centerY, 40);
    }, wave * 100);
  }

  // Reduced continuous celebration - 6 seconds instead of 10
  const celebrationInterval = setInterval(() => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight * 0.7;
    createConfetti(randomX, randomY, 15);
    createHeartParticles(randomX, randomY, 12);
  }, 300);

  setTimeout(() => clearInterval(celebrationInterval), 6000);
});

// Animation styles
const style = document.createElement('style');
style.textContent = `
  .celebration-container {
    text-align: center;
    animation: celebration-pop 1s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    z-index: 10;
  }

  .celebrate-message {
    font-size: 3em;
    font-family: 'Playfair Display', serif;
    color: #c71585;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 0 10px 30px rgba(216, 107, 135, 0.4);
    animation: celebration-slide-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
  }

  .celebration-subtext {
    font-size: 1.4rem;
    color: #ff1493;
    margin-top: 20px;
    font-weight: 600;
    animation: fadeIn 1.5s ease-in 0.5s both;
    letter-spacing: 1px;
  }

  .memories-gallery {
    animation: galleryFadeIn 1.5s ease-in 0.7s both;
  }

  .final-message {
    animation: messageReveal 1s ease-out 0.9s both;
  }

  @keyframes celebration-slide-in {
    from {
      opacity: 0;
      transform: translateY(-40px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes galleryFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes messageReveal {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes celebration-pop {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(30px);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .memory-item:hover {
    animation: memoryGlow 0.6s ease-in-out;
  }

  @keyframes memoryGlow {
    0%, 100% {
      box-shadow: 0 15px 50px rgba(216, 107, 135, 0.4);
    }
    50% {
      box-shadow: 0 20px 60px rgba(216, 107, 135, 0.7);
    }
  }
`;
document.head.appendChild(style);

// Scroll parallax effect
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.celebration-container');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const offset = rect.top * 0.5;
    el.style.transform = `translateY(${offset}px)`;
  });
});

// Enhanced global script features
document.addEventListener('DOMContentLoaded', () => {
  // Add glow on interaction
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      createHeartParticles(e.clientX, e.clientY, 20);
    });
