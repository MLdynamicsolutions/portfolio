/**
 * Main JavaScript file
 * Contains core functionality for the website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializePortfolioFilter();
  initializeTestimonialSlider();
  initializeContactForm();
  initializeNewsletterForm();
  initializeStatCounters();
  setupScrollEvents();
});

/**
 * Portfolio filtering functionality
 */
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Testimonial slider functionality
 */
function initializeTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  let currentSlide = 0;
  
  // Set initial state
  updateSlider();
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });
  }
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.getAttribute('data-index'));
      updateSlider();
    });
  });
  
  // Auto-advance the slider every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }, 5000);
  
  // Update slider state
  function updateSlider() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
}

/**
 * Contact form validation and submission
 */
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset error messages
      const errorMessages = contactForm.querySelectorAll('.error-message');
      errorMessages.forEach(message => message.textContent = '');
      
      // Form validation
      let isValid = true;
      
      // Validate name
      const nameInput = contactForm.querySelector('#name');
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      }
      
      // Validate email
      const emailInput = contactForm.querySelector('#email');
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate subject
      const subjectInput = contactForm.querySelector('#subject');
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'Subject is required');
        isValid = false;
      }
      
      // Validate message
      const messageInput = contactForm.querySelector('#message');
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // If form is valid, submit
      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For demo purposes, we'll just show the success message
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('active');
        }
        
        // Reset form after submission (for demo purposes)
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (formSuccess) {
            formSuccess.classList.remove('active');
          }
        }, 5000);
      }
    });
  }
  
  // Helper function to show error messages
  function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

/**
 * Newsletter form functionality
 */
function initializeNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send the email to a server
      // For demo purposes, we'll just show an alert
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value.trim()) {
        alert(`Thank you for subscribing to our newsletter with email: ${emailInput.value}`);
        newsletterForm.reset();
      }
    });
  }
}

/**
 * Animate stat counters
 */
function initializeStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Only animate when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalCount = parseInt(target.getAttribute('data-count'));
        animateCounter(target, finalCount);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
  
  // Counter animation function
  function animateCounter(element, finalCount) {
    let currentCount = 0;
    const interval = 2000 / finalCount; // Adjust speed based on final count
    
    const counter = setInterval(() => {
      currentCount += 1;
      element.textContent = currentCount;
      
      if (currentCount >= finalCount) {
        clearInterval(counter);
      }
    }, interval);
  }
}

/**
 * Setup scroll-related events and animations
 */
function setupScrollEvents() {
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
  
  // Fade-in animations for elements
  const fadeElements = document.querySelectorAll('.fade-in-element');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  // Scroll events
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Header background change on scroll
    if (header) {
      if (scrollPosition > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPosition > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    // Active nav link based on scroll position
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Back to top button click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        // Close mobile menu if it's open
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
          }
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });
}