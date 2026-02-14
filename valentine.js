// Valentine Proposal Page - Enhanced interaction

// Button elements
const acceptBtn = document.getElementById('acceptBtn');
const declineBtn = document.getElementById('declineBtn');
const questionPhase = document.getElementById('questionPhase');
const answersPhase = document.getElementById('answersPhase');
const answerText = document.getElementById('answerText');

// Hide answer phase initially
answersPhase.style.display = 'none';
answerText.style.opacity = '0';

const responses = [
  "You've just made me the happiest person alive. Forever, it is. 💕✨",
  "I knew you'd say yes. You're my eternity. 💕",
  "Welcome to forever with me, my love. This is just the beginning. 🌹✨",
  "You just gave me the greatest gift—your forever. I'm yours completely. 💕🔥",
  "I love you more than words could ever express. Forever with you is a dream come true. ✨💋",
  "You're mine. I'm yours. Forever. Nothing else matters but this. 💕🖤"
];

// Accept button interaction - show answer phase
acceptBtn.addEventListener('click', () => {
  // Hide question buttons
  questionPhase.classList.remove('active');
  questionPhase.style.opacity = '0';
  questionPhase.style.transform = 'scale(0.9)';
  questionPhase.style.pointerEvents = 'none';
  
  // Trigger celebration particle effects
  triggerProposalCelebration();
  
  // Show answer phase
  setTimeout(() => {
    answersPhase.classList.add('active');
    answersPhase.style.display = 'block';
    answersPhase.style.opacity = '0';
    answersPhase.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      answersPhase.style.opacity = '1';
      answersPhase.style.transform = 'scale(1)';
    }, 50);

    // Populate answer text after display transition starts
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      answerText.textContent = randomResponse;
      answerText.style.opacity = '1';
    }, 400);
  }, 200);
});

// Decline button (runs away with charm)
declineBtn.addEventListener('mouseover', () => {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  declineBtn.style.position = 'fixed';
  declineBtn.style.left = x + 'px';
  declineBtn.style.top = y + 'px';
  declineBtn.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
});

declineBtn.addEventListener('click', () => {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  declineBtn.style.position = 'fixed';
  declineBtn.style.left = x + 'px';
  declineBtn.style.top = y + 'px';
});

// Particle system for celebration
function triggerProposalCelebration() {
  const colors = ['#ff1493', '#ff69b4', '#c71585', '#ff6b9d', '#ffffff', '#ffd700', '#ffb6d9', '#ff69b4'];
  const particleCount = 80;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.setAttribute('data-proposal-particle', 'true');
    particle.style.position = 'fixed';
    particle.style.left = window.innerWidth / 2 + 'px';
    particle.style.top = window.innerHeight / 2 + 'px';
    particle.style.width = '7px';
    particle.style.height = '7px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.boxShadow = `0 0 12px currentColor`;
    particle.style.willChange = 'transform';
    
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 4 + Math.random() * 7;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let life = 1;
    let vyCurrent = vy;
    let animId = null;
    
    function animate() {
      life -= 0.014;
      posX += vx;
      posY += vyCurrent;
      vyCurrent += 0.22;
      
      particle.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      particle.style.opacity = life;
      
      if (life > 0) {
        animId = requestAnimationFrame(animate);
      } else {
        particle.remove();
        cancelAnimationFrame(animId);
      }
    }
    
    animate();
  }
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .btn.floating {
    animation: float-button 2.5s ease-in-out infinite;
  }

  .btn.floating:hover {
    transform: translateY(-8px) scale(1.08);
    box-shadow: 0 20px 40px rgba(255, 20, 147, 0.5);
  }

  @keyframes float-button {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .btn-icon {
    display: inline-block;
    margin-left: 10px;
    animation: spin-icon 2s linear infinite;
  }

  @keyframes spin-icon {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }

  .answer-display {
    animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .answer-text {
    font-size: 1.5em;
    font-family: 'Playfair Display', serif;
    color: #c71585;
    font-weight: 700;
    transition: opacity 0.5s ease;
    line-height: 1.6;
  }
`;
document.head.appendChild(style);

