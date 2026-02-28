(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const typedText = $('#typed-text');
  const typingPhrases = [
    'I Build Modern Business Websites',
    'Helping Local Businesses Go Online',
    'Fast. Affordable. Professional.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeLoop = () => {
    if (!typedText) return;
    const phrase = typingPhrases[phraseIndex];
    typedText.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 45 : 85;
    if (!deleting && charIndex < phrase.length) {
      charIndex += 1;
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
    } else if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 1400;
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      delay = 350;
    }
    setTimeout(typeLoop, delay);
  };

  const hero = $('#home');
  const glow = $('#cursor-glow');
  let mouseX = 0;
  let mouseY = 0;
  let gx = 0;
  let gy = 0;

  const animateGlow = () => {
    if (!hero || !glow) return;
    gx += (mouseX - gx) * 0.12;
    gy += (mouseY - gy) * 0.12;
    glow.style.left = `${gx}px`;
    glow.style.top = `${gy}px`;
    requestAnimationFrame(animateGlow);
  };

  if (hero && glow && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      glow.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => (glow.style.opacity = '0'));
    animateGlow();
  }

  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  const parallaxItems = $$('[data-parallax]');
  const nav = $('#navbar');

  const onScroll = () => {
    const y = window.scrollY;
    parallaxItems.forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0.1;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    if (nav) nav.classList.toggle('scrolled', y > 8);
  };

  const navLinks = $$('.nav-link').filter((link) => link.getAttribute('href')?.startsWith('#'));
  const sections = navLinks
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  const menuBtn = $('#menu-btn');
  const mobileMenu = $('#mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.contains('max-h-96');
      menuBtn.classList.toggle('open', !open);
      menuBtn.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('max-h-0', open);
      mobileMenu.classList.toggle('max-h-96', !open);
    });

    $$('#mobile-menu a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileMenu.classList.add('max-h-0');
        mobileMenu.classList.remove('max-h-96');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  const contactCard = $('#contact-card');
  const flipBtn = $('#flip-btn');
  const flipBackBtn = $('#flip-back-btn');
  if (contactCard && flipBtn) {
    flipBtn.addEventListener('click', () => contactCard.classList.add('flipped'));
  }
  if (contactCard && flipBackBtn) {
    flipBackBtn.addEventListener('click', () => contactCard.classList.remove('flipped'));
  }

  const form = $('#contact-form');
  const toast = $('#toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('translate-x-[120%]');
    toast.classList.add('translate-x-0');
    setTimeout(() => {
      toast.classList.remove('translate-x-0');
      toast.classList.add('translate-x-[120%]');
    }, 3000);
  };

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

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  typeLoop();
})();
