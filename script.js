const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const observerOptions = { threshold: 0.2 };

function handleTypewriter() {
  const text = 'Python Developer';
  const element = document.querySelector('.typewriter');
  let index = 0;
  let visible = true;

  setInterval(() => {
    element.textContent = visible ? text.slice(0, index) + '|' : text.slice(0, index);
    if (visible) index = (index + 1) % (text.length + 1);
    if (index === 0) visible = false;
    if (index === text.length) visible = true;
  }, 120);
}

function setActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href='#${id}']`);
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((item) => item.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}

function createObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach((block) => observer.observe(block));
}

function initModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = modal.querySelector('img');
  const closeButton = modal.querySelector('.modal-close');

  document.querySelectorAll('.certificate-card').forEach((button) => {
    button.addEventListener('click', () => {
      const imageUrl = button.dataset.image;
      modalImage.src = imageUrl;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeButton.click();
    }
  });
}

function initForm() {
  const form = document.getElementById('contact-form');
  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    feedback.textContent = 'Sending message...';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        feedback.textContent = 'Message sent successfully. I will reply soon.';
        form.reset();
      } else {
        feedback.textContent = 'Oops! Something went wrong. Please try again.';
      }
    } catch (error) {
      feedback.textContent = 'Unable to send message right now. Please try later.';
    }
  });
}

function initMenu() {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', () => {
  handleTypewriter();
  createObserver();
  initModal();
  initForm();
  initMenu();
  setActiveLink();
});
