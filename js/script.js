// js/script.js
(function() {
  'use strict';

  // ---------- FADE TRANSITION LOGIC ----------
  function initFadeTransitions() {
    const content = document.getElementById('page-content');
    if (!content) return;

    // Internal links with data-link attribute
    const links = document.querySelectorAll('a[data-link]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Ignore if it's the same page or external
        if (!href || href === '#' || href.startsWith('http')) return;
        
        e.preventDefault();
        
        // Add fade-out class
        content.classList.add('fade-out');
        
        // After transition, navigate
        setTimeout(() => {
          window.location.href = href;
        }, 250); // matches CSS transition duration
      });
    });
  }

  // ---------- MOBILE MENU TOGGLE ----------
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', function() {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (openIcon) openIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    });

    // Close mobile menu when a mobile nav link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      });
    });
  }

  // ---------- ACTIVE NAVIGATION HIGHLIGHT (based on current URL) ----------
  function setActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    // Remove active classes from all nav links first
    const desktopLinks = document.querySelectorAll('nav .nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-menu .mobile-nav-link');

    // Desktop active
    desktopLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('text-brand-primary', 'border-b-2', 'border-brand-accent', 'pb-1');
      link.classList.add('text-gray-700', 'hover:text-brand-accent');
      
      if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
        link.classList.add('text-brand-primary', 'border-b-2', 'border-brand-accent', 'pb-1');
        link.classList.remove('text-gray-700');
      }
    });

    // Mobile active
    mobileLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('bg-brand-light', 'text-brand-primary', 'font-semibold');
      link.classList.add('text-gray-700', 'hover:bg-brand-light');
      
      if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
        link.classList.add('bg-brand-light', 'text-brand-primary', 'font-semibold');
        link.classList.remove('text-gray-700');
      }
    });
  }

  // ---------- CONTACT FORM FAKE SUBMISSION ----------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('form-alert');
    if (!form || !alertBox) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation feedback
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      
      if (!name || !email || !message) {
        alertBox.textContent = 'Please fill in all fields.';
        alertBox.classList.remove('hidden', 'bg-green-50', 'border-green-200', 'text-green-800');
        alertBox.classList.add('bg-red-50', 'border-red-200', 'text-red-800');
        alertBox.classList.remove('hidden');
        return;
      }
      
      // Fake submission success
      alertBox.textContent = `Thanks, ${name}! Your message has been received. We'll respond within 24 hours.`;
      alertBox.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-800');
      alertBox.classList.add('bg-green-50', 'border-green-200', 'text-green-800');
      
      form.reset();
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        alertBox.classList.add('hidden');
      }, 5000);
    });
  }

  // ---------- INITIALISE EVERYTHING ----------
  document.addEventListener('DOMContentLoaded', function() {
    initFadeTransitions();
    initMobileMenu();
    setActiveNavigation();
    initContactForm();
    
    // Ensure page fades in if it was cached with fade-out
    const content = document.getElementById('page-content');
    if (content) {
      content.classList.remove('fade-out');
    }
  });

  // Handle back/forward cache (some browsers restore state)
  window.addEventListener('pageshow', function(event) {
    const content = document.getElementById('page-content');
    if (content && event.persisted) {
      content.classList.remove('fade-out');
    }
  });

})();