// ============================================
// GLOBAL SCRIPT - ALL PAGES
// ============================================

// Optimized Cursor Glow with Throttle
let cursorX = 0, cursorY = 0;
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  
  if (cursorGlow) {
    requestAnimationFrame(() => {
      cursorGlow.style.left = (cursorX - 30) + 'px';
      cursorGlow.style.top = (cursorY - 30) + 'px';
    });
  }

  // Reduced particle creation - 2% instead of 8%
  if (Math.random() < 0.02) {
    createParticles(cursorX, cursorY, 1, ['rgba(255,105,180,0.4)', 'rgba(199,21,133,0.3)']);
  }
});

// ============================================
// PARTICLE SYSTEM - Optimized for Performance
// ============================================
function createParticles(x, y, count = 20, colors = ["#ff1493", "#ff69b4", "#ff6b9d", "#c71585", "#ffffff"]) {
  // Limit total particles to prevent memory bloat
  if (document.querySelectorAll('[data-particle]').length > 150) return;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.setAttribute('data-particle', 'true');
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = "5px";
    particle.style.height = "5px";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";
    particle.style.boxShadow = `0 0 8px currentColor`;
    particle.style.willChange = "transform";
    
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 3 + Math.random() * 5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = x, posY = y, life = 1, vxCurrent = vx, vyCurrent = vy;
    let animId = null;
    
    function animate() {
      life -= 0.018;
      if (life < 0) {
        particle.remove();
        cancelAnimationFrame(animId);
        return;
      }
      
      vyCurrent += 0.12;
      posX += vxCurrent;
      posY += vyCurrent;
      
      particle.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      particle.style.opacity = life;
      animId = requestAnimationFrame(animate);
    }
    animate();
  }
}

// ============================================
// BUTTON CLICK EFFECTS - Global (Limited)
// ============================================
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn') && Math.random() < 0.5) {
    createParticles(e.clientX, e.clientY, 8, ['#ff69b4', '#ff1493', '#ffffff']);
  }
});

// ============================================
// PARALLAX - Optimized with RAF
// ============================================
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      const page = document.querySelector('.page');
      if (page) {
        page.style.transform = `translate3d(0, ${lastScrollY * 0.3}px, 0)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ============================================
// MOUSE PARALLAX - Hero Content & Photos
// ============================================
let parallaxTicking = false;
document.addEventListener("mousemove", (e) => {
  if (!parallaxTicking) {
    requestAnimationFrame(() => {
      const heroContent = document.querySelector('.hero-content');
      const heroPhoto = document.querySelector('.hero-photo');
      
      if (heroContent && window.innerHeight > 600) {
        const speed = 35;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        heroContent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (heroPhoto && window.innerHeight > 600) {
        const speed = 45;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        heroPhoto.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      parallaxTicking = false;
    });
    parallaxTicking = true;
  }
}, { passive: true });

// ============================================
// INTERSECTION OBSERVER - Lazy animations
// ============================================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe only critical elements
document.querySelectorAll('.word, .verse, .prose, .chapter-photo, .memory-item').forEach(el => {
  observer.observe(el);
});

// ============================================
// ENHANCE HERO TITLES - Word by word animation
// ============================================
window.addEventListener('load', () => {
  const words = document.querySelectorAll('.hero-title .word');
  words.forEach((word, index) => {
    word.style.opacity = '0';
    word.style.animation = `fadeInWord 0.6s ease-out ${0.08 * index}s forwards`;
  });
});

// Add optimized animation styles
const globalStyles = document.createElement('style');
globalStyles.textContent = `
  @keyframes fadeInWord {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .word {
    display: inline-block;
    margin: 0 8px;
    will-change: auto;
  }

  /* Base animation state - only on scroll */
  .verse, .soft-text, .question-lead, .answer-text, .prose {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .verse.visible, .soft-text.visible, .question-lead.visible, 
  .answer-text.visible, .prose.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Photo hover effects - optimized */
  .hero-photo, .chapter-photo, .proposal-hero-photo {
    will-change: transform;
    transition: transform 0.3s ease;
  }

  .hero-photo:hover,
  .chapter-photo:hover,
  .proposal-hero-photo:hover {
    transform: scale(1.01);
  }

  /* Smooth page transitions */
  .page {
    will-change: transform;
  }

  /* Disable heavy animations on mobile */
  @media (max-width: 768px) {
    .memory-item {
      animation: none !important;
    }
    
    .hero::before {
      animation: none !important;
    }
    
    .valentine-title {
      animation: none !important;
    }
  }
`;
document.head.appendChild(globalStyles);

// ============================================
// PRELOAD IMAGES - For smooth experience
// ============================================
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.backfaceVisibility = 'hidden';
    img.style.perspective = '1000px';
  });
});

// ============================================
// MOBILE OPTIMIZATIONS
// ============================================
if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
  // Disable heavy animations on mobile
  document.documentElement.style.setProperty('--enable-animations', '0');
  
  // Reduce particle count on mobile
  const originalCreateParticles = createParticles;
  window.createParticles = function(x, y, count = 20, colors) {
    originalCreateParticles(x, y, Math.ceil(count / 3), colors);
  };

  // Disable cursor glow on mobile
  const glow = document.querySelector('.cursor-glow');
  if (glow) glow.style.display = 'none';
  
  // Disable parallax on mobile
  parallaxTicking = true;
}

