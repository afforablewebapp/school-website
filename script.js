const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const currentPath = window.location.pathname.split('/').pop();
navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
    link.classList.add('active');
  }
});

function showToast(message) {
  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-dark border-0 position-fixed bottom-0 end-0 m-4';
  toastEl.style.zIndex = 1080;
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;
  document.body.appendChild(toastEl);
  const bsToast = new bootstrap.Toast(toastEl, {delay: 3000});
  bsToast.show();
  toastEl.querySelector('.btn-close').addEventListener('click', () => bsToast.hide());
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function createAdmissionMailto(form) {
  const email = 'bhavanagudavalli10@gmail.com';
  const subject = encodeURIComponent('Admission Enquiry');
  const data = new FormData(form);
  const bodyLines = [
    `Student Name: ${data.get('studentName') || ''}`,
    `Parent Name: ${data.get('parentName') || ''}`,
    `Class Applying For: ${data.get('applyClass') || ''}`,
    `Phone Number: ${data.get('admissionPhone') || ''}`,
    `Email: ${data.get('admissionEmail') || ''}`,
    `Address: ${data.get('admissionAddress') || ''}`,
    `Previous School: ${data.get('previousSchool') || ''}`,
    `Message: ${data.get('admissionMessage') || ''}`
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

function bindForm(formId, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    if (formId === 'admissionForm') {
      createAdmissionMailto(form);
    }

    form.reset();
    form.classList.remove('was-validated');
    showToast(successMessage);
  });
}

bindForm('contactForm', 'Thank you! Your message has been sent.');
bindForm('admissionForm', 'Thank you! Your admission enquiry has been sent.');

const filterButtons = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');

const scrollControls = document.querySelectorAll('.scroll-control');
scrollControls.forEach(button => {
  button.addEventListener('click', () => {
    const strip = button.closest('.auto-scroll-strip');
    const row = strip ? strip.querySelector('.auto-scroll-row') : null;
    if (!row) return;
    const distance = row.clientWidth * 0.8;
    const delta = button.classList.contains('scroll-next') ? distance : -distance;
    row.scrollBy({ left: delta, behavior: 'smooth' });
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    const imageUrl = card.dataset.galleryImage;
    if (!imageUrl || !galleryModalImage) return;
    galleryModalImage.src = imageUrl;
    const modal = new bootstrap.Modal(galleryModal);
    modal.show();
  });
});