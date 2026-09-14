const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const slides = [
    {
      kicker: 'Mazabuka, Zambia',
      title: 'patience.',
      description: 'Healthy animals, honest food, and a farm that leaves the land better than we found it.',
      image: 'images/Image.jpg',
      alt: 'Cattle gathered behind the feedlot rails',
      note: 'Mazabuka<br />07:42 / Morning round'
    },
    {
      kicker: 'Professional feedlot care',
      title: 'consistency.',
      description: 'Clean facilities, proper nutrition, and daily monitoring from pen to market.',
      image: 'images/Image (7).jpg',
      alt: 'Cattle standing together in the Beelma Farms yard',
      note: 'Mazabuka<br />09:18 / Morning round'
    },
    {
      kicker: 'Proudly Zambian-owned',
      title: 'progress.',
      description: 'Quality, traceable cattle helping strengthen food security and local agriculture.',
      image: 'images/Image (4).jpg',
      alt: 'Cattle gathered beneath the open sky at the feedlot',
      note: 'Mazabuka<br />16:26 / Evening round'
    }
  ];
  const kicker = carousel.querySelector('[data-slide-kicker]');
  const title = carousel.querySelector('[data-slide-title]');
  const description = carousel.querySelector('[data-slide-description]');
  const image = carousel.querySelector('[data-slide-image]');
  const note = carousel.querySelector('[data-slide-note]');
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  let currentSlide = 0;
  let autoAdvance;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];
    [kicker, title, description, image, note].forEach((element) => { element.style.opacity = '0'; });
    window.setTimeout(() => {
      kicker.textContent = slide.kicker;
      title.textContent = slide.title;
      description.textContent = slide.description;
      image.src = slide.image;
      image.alt = slide.alt;
      note.innerHTML = slide.note;
      [kicker, title, description, image, note].forEach((element) => { element.style.opacity = '1'; });
    }, 180);
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const restartAutoAdvance = () => {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(() => showSlide(currentSlide + 1), 3500);
  };

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAutoAdvance();
  });
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAutoAdvance();
  });
  dots.forEach((dot) => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slide)); restartAutoAdvance(); }));
  restartAutoAdvance();
}
