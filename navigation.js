/**
 * Navigation JavaScript file
 * Contains navigation-specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  initializeMobileNav();
});

/**
 * Mobile navigation functionality
 */
function initializeMobileNav() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuToggle && mobileNav) {
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Prevent scrolling when mobile menu is open
      document.body.classList.toggle('no-scroll', mobileNav.classList.contains('active'));
    });
    
    // Close mobile menu when a link is clicked
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const isClickInside = mobileNav.contains(e.target) || mobileMenuToggle.contains(e.target);
      
      if (!isClickInside && mobileNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  
  // Handle window resize - reset mobile menu state when switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}