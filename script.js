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

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ham burger toggle 
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");

// Toggle Menu
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");

  if (mobileMenu.classList.contains("max-h-0")) {
    mobileMenu.classList.remove("max-h-0");
    mobileMenu.classList.add("max-h-96");
  } else {
    mobileMenu.classList.add("max-h-0");
    mobileMenu.classList.remove("max-h-96");
  }
});

// Auto close after click
document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("max-h-0");
    mobileMenu.classList.remove("max-h-96");
    menuBtn.classList.remove("open");
  });
});

// Sticky Background on Scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-[#0f172a]/90", "backdrop-blur-md", "shadow-lg");
  } else {
    navbar.classList.remove("bg-[#0f172a]/90", "backdrop-blur-md", "shadow-lg");
  }
});

// contact me section last wala 
document.addEventListener("DOMContentLoaded", function () {

  const flipBtn = document.getElementById("flip-btn");
  const contactCard = document.getElementById("contact-card");

  flipBtn.addEventListener("click", function () {
    contactCard.classList.toggle("flipped");
  });

});

// google sheets form integration 
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('translate-x-[120%]');
  toast.classList.add('translate-x-0');

  setTimeout(() => {
    toast.classList.remove('translate-x-0');
    toast.classList.add('translate-x-[120%]');
  }, 3000);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwEW9vGdd5FokZBCZ5Qs-aSQRkANcjU12_NzvVZ2eFs69sgSgrYb8CvkWeBf9geGZQo/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      form.reset();
      showToast('Message sent successfully 🚀');

    } catch (error) {
      showToast('Something went wrong ❌');
    }
  });
}
