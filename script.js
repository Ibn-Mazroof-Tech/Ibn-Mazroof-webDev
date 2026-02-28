// Typing animation text rotation
const typingPhrases = [
  'I Build Modern Business Websites',
  'Helping Local Businesses Go Online',
  'Fast. Affordable. Professional.'
];

const typedTextElement = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypingAnimation() {
  const currentPhrase = typingPhrases[phraseIndex];
  const displayedText = currentPhrase.substring(0, charIndex);
  typedTextElement.textContent = displayedText;

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1400;
    isDeleting = true;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 350;
  }

  window.setTimeout(runTypingAnimation, delay);
}

// Cursor glow effect in hero
const heroSection = document.getElementById('hero');
const glow = document.getElementById('cursor-glow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

heroSection.addEventListener('mousemove', (event) => {
  const rect = heroSection.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  glow.style.opacity = '1';
});

heroSection.addEventListener('mouseleave', () => {
  glow.style.opacity = '0';
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  glow.style.left = `${glowX}px`;
  glow.style.top = `${glowY}px`;
  requestAnimationFrame(animateGlow);
}

// Subtle parallax effect on hero content
const parallaxItems = document.querySelectorAll('[data-parallax]');
function applyParallax() {
  const scrollY = window.scrollY;
  parallaxItems.forEach((element) => {
    const speed = Number(element.dataset.parallax) || 0.1;
    element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
}

// Intersection Observer for one-time reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px'
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Sticky navbar visual treatment on scroll
const nav = document.getElementById('navbar');
function handleNavScroll() {
  if (window.scrollY > 8) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  applyParallax();
  handleNavScroll();
});

runTypingAnimation();
animateGlow();
applyParallax();
handleNavScroll();
