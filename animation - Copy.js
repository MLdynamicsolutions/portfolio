/**
 * Animations JavaScript file
 * Contains animation-specific code
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initializeTypewriter();
  initializeScrollAnimations();
});

/**
 * Typewriter effect for the hero section
 */
function initializeTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  const phrases = [
    'Innovative Solutions',
    'Cutting-edge Designs',
    'Powerful Websites',
    'Mobile Applications',
    'Digital Experiences'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal speed when typing
    }
    
    // If finished typing the phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of the phrase
      isDeleting = true;
      typingSpeed = 1500; // Pause before deleting
    }
    
    // If finished deleting the phrase
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing the next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Start the typewriter effect
  setTimeout(typeEffect, 1000);
}

/**
 * Scroll-based animations
 */
function initializeScrollAnimations() {
  // Parallax effect for the hero section
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });
  }
  
  // Reveal animations for sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        
        // Add a small delay for child elements
        const animatedElements = entry.target.querySelectorAll('.fade-in-element');
        animatedElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 100); // Staggered animation
        });
        
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.classList.add('section-animate');
    sectionObserver.observe(section);
  });
  
  // Image hover animations
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const overlay = item.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(0)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const overlay = item.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.transform = 'translateY(100%)';
      }
    });
  });
}