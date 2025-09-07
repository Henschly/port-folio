// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
  });
  
  // 2. Form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
  
  // 3. Project cards
  document.querySelectorAll('.project-card').forEach(setupProjectCard);
});

// Functions
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      showFormStatus('success', 'Message sent successfully!');
      form.reset();
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    showFormStatus('error', 'Error sending message. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
}

function showFormStatus(type, message) {
  const statusDiv = document.getElementById('form-status');
  statusDiv.innerHTML = `<p class="${type}">${message}</p>`;
}

function setupProjectCard(card) {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
}