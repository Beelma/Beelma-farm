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
      kicker: 'Family-run since 1987',
      title: 'patience.',
      description: 'Healthy animals, honest food, and a farm that leaves the land better than we found it.',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1400&q=85',
      alt: 'A friendly brown cow looking toward the camera',
      note: 'North paddock<br />07:42 / Morning round'
    },
    {
      kicker: 'The curious ones',
      title: 'character.',
      description: 'Bright eyes, nimble feet, and plenty of personality in every corner of the farm.',
      image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1400&q=85',
      alt: 'A white goat standing in a field',
      note: 'East meadow<br />09:18 / Morning round'
    },
    {
      kicker: 'Partners in every season',
      title: 'connection.',
      description: 'A slower way of working, built on trust between people, animals, and the land.',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=85',
      alt: 'A chestnut horse standing in a pasture',
      note: 'South field<br />16:26 / Evening round'
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
