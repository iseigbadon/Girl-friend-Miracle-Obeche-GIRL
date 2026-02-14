// ============================================
// CAROUSEL FUNCTIONALITY - Optimized
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');
const totalSlides = slides.length;

function showSlide(n) {
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.style.transition = 'opacity 0.5s ease-in-out';
  });
  slides[n].classList.add('active');
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  showSlide(currentSlide);
  
  // Reduced particle effect intensity
  if (Math.random() < 0.5) {
    const carousel = document.querySelector('.photo-carousel');
    if (carousel) {
      const rect = carousel.getBoundingClientRect();
      createBurstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
    }
  }
}

// Auto-rotate carousel every 5 seconds
const carouselInterval = setInterval(() => {
  changeSlide(1);
}, 5000);

// Particle System
class Particle {
  constructor(x, y, vx, vy, color = '#ff69b4', size = 8, life = 1) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.gravity = 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= 0.015;
    this.size *= 0.98;
  }

  draw(canvas, ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(1, this.size), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Particle Manager
const particles = [];

function createParticles(x, y, count = 15, colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffffff']) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 3 + Math.random() * 4;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 6;
    particles.push(new Particle(x, y, vx, vy, color, size, 1));
  }
}

function createBurstParticles(x, y, count = 30) {
  const colors = ['#ffb6c1', '#ff69b4', '#ff1493', '#c71585', '#ffffff'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 4 + Math.random() * 8;
    particles.push(new Particle(x, y, vx, vy, color, size, 0.8));
  }
}

// Mouse cursor glow
document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';

    // Create subtle particles on mouse movement (10% chance)
    if (Math.random() < 0.1) {
      createParticles(e.clientX, e.clientY, 3, ['rgba(255,105,180,0.6)']);
    }
  }
});

// Button interactions
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const result = document.getElementById('result');

function dodge() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

  // Particle burst on dodge
  createBurstParticles(x + 60, y + 30);
}

function createRipple(element) {
  const rect = element.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255,255,255,0.6)';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.left = rect.width / 2 - 10 + 'px';
  ripple.style.top = rect.height / 2 - 10 + 'px';
  ripple.style.pointerEvents = 'none';
  ripple.style.animation = 'ripple 0.6s ease-out';
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

noBtn.addEventListener('mouseover', dodge);
noBtn.addEventListener('click', dodge);
noBtn.addEventListener('touchstart', dodge);

// YES button wins with particle effects
yesBtn.addEventListener('click', () => {
  const rect = yesBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Optimized burst - fewer waves, fewer particles per wave
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createParticles(cx, cy, 15, ['#ff69b4', '#ff1493', '#ffffff', '#c71585']);
    }, i * 120);
  }

  createRipple(yesBtn);
  
  setTimeout(() => {
    // Show result and continue section
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').style.animation = 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    document.getElementById('continueSection').style.display = 'block';
    document.getElementById('continueSection').style.animation = 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both';
    document.querySelector('.interactive-buttons').style.display = 'none';
  }, 400);
});

// Animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .cursor-glow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,105,180,0.5) 0%, rgba(255,105,180,0.2) 70%, transparent 100%);
    box-shadow: 0 0 20px rgba(255,105,180,0.6), inset 0 0 20px rgba(255,105,180,0.4);
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-15px, -15px);
    z-index: 9999;
    mix-blend-mode: screen;
  }

  .btn.floating {
    position: relative;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn.floating:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 105, 180, 0.4);
  }

  .btn-icon {
    display: inline-block;
    margin-left: 8px;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);

// Animation loop for particles
function animate() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

animate();

// Parallax and scroll effects
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.content-section');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const scrollPercent = 1 - (rect.top / window.innerHeight);
    if (scrollPercent > 0 && scrollPercent < 1) {
      el.style.transform = `translateY(${scrollPercent * 10}px)`;
    }
  });
});
