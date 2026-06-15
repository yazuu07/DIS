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
  // js/script.js
(function() {
  'use strict';

  // ---------- TIMELINE DATA (Easy to modify) ----------
  const timelineData = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Founded as a small collective of 5 engineers and designers with a shared vision for digital transformation and innovation.'
    },
    {
      year: '2020',
      title: 'First Major Clients',
      description: 'Secured 10 enterprise clients and expanded the team to 25 members across 3 countries, delivering scalable solutions.'
    },
    {
      year: '2023',
      title: 'AI Practice Launch',
      description: 'Launched dedicated AI and machine learning practice, delivering predictive analytics solutions to Fortune 500 companies.'
    },
    {
      year: '2026',
      title: 'Global Expansion',
      description: 'Expanding into new markets with 40+ team members and a growing portfolio of innovative digital products worldwide.'
    }
  ];

  // ---------- BUILD TIMELINE ----------
  function buildTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    
    // Remove existing items (keep the line)
    const existingItems = container.querySelectorAll('.timeline-row');
    existingItems.forEach(item => item.remove());
    
    // Create timeline items
    timelineData.forEach((item, index) => {
      const isLeft = index % 2 === 0;
      
      // Create row
      const row = document.createElement('div');
      row.className = `timeline-row flex items-start mb-16 last:mb-0 relative`;
      
      // Dot
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      row.appendChild(dot);
      
      // Desktop layout
      if (isLeft) {
        // Left content
        const leftCol = document.createElement('div');
        leftCol.className = 'hidden md:block w-1/2 pr-16';
        leftCol.innerHTML = `
          <div class="timeline-item left bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span class="text-brand-accent font-bold text-lg">${item.year}</span>
            <h3 class="text-xl font-semibold text-brand-primary mt-1">${item.title}</h3>
            <p class="text-gray-600 mt-2 leading-relaxed">${item.description}</p>
          </div>
        `;
        row.appendChild(leftCol);
        
        // Right empty
        const rightCol = document.createElement('div');
        rightCol.className = 'hidden md:block w-1/2';
        row.appendChild(rightCol);
      } else {
        // Left empty
        const leftCol = document.createElement('div');
        leftCol.className = 'hidden md:block w-1/2';
        row.appendChild(leftCol);
        
        // Right content
        const rightCol = document.createElement('div');
        rightCol.className = 'hidden md:block w-1/2 pl-16';
        rightCol.innerHTML = `
          <div class="timeline-item right bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span class="text-brand-accent font-bold text-lg">${item.year}</span>
            <h3 class="text-xl font-semibold text-brand-primary mt-1">${item.title}</h3>
            <p class="text-gray-600 mt-2 leading-relaxed">${item.description}</p>
          </div>
        `;
        row.appendChild(rightCol);
      }
      
      // Mobile content (full width)
      const mobileCol = document.createElement('div');
      mobileCol.className = 'md:hidden w-full pl-12';
      mobileCol.innerHTML = `
        <div class="timeline-item left bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span class="text-brand-accent font-bold text-base">${item.year}</span>
          <h3 class="text-lg font-semibold text-brand-primary mt-1">${item.title}</h3>
          <p class="text-gray-600 mt-1 text-sm leading-relaxed">${item.description}</p>
        </div>
      `;
      row.appendChild(mobileCol);
      
      container.appendChild(row);
    });
    
    // Start animation after building
    setTimeout(animateTimeline, 200);
  }

  // ---------- ANIMATE TIMELINE ----------
  function animateTimeline() {
    const line = document.getElementById('timeline-line');
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-dot');
    
    // Animate line
    if (line) {
      line.classList.add('visible');
    }
    
    // Animate dots
    dots.forEach((dot, index) => {
      setTimeout(() => {
        dot.classList.add('animate');
      }, 600 + (index * 300));
    });
    
    // Animate content cards
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 800 + (index * 250));
    });
  }

  // ---------- FADE TRANSITION LOGIC ----------
  function initFadeTransitions() {
    const content = document.getElementById('page-content');
    if (!content) return;

    const links = document.querySelectorAll('a[data-link]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return;
        
        e.preventDefault();
        content.classList.add('fade-out');
        
        setTimeout(() => {
          window.location.href = href;
        }, 250);
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

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      });
    });
  }

  // ---------- ACTIVE NAVIGATION HIGHLIGHT ----------
  function setActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const desktopLinks = document.querySelectorAll('nav .nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-menu .mobile-nav-link');

    desktopLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('text-brand-primary', 'border-b-2', 'border-brand-accent', 'pb-1');
      link.classList.add('text-gray-700', 'hover:text-brand-accent');
      
      if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
        link.classList.add('text-brand-primary', 'border-b-2', 'border-brand-accent', 'pb-1');
        link.classList.remove('text-gray-700');
      }
    });

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
      
      alertBox.textContent = `Thanks, ${name}! Your message has been received. We'll respond within 24 hours.`;
      alertBox.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-800');
      alertBox.classList.add('bg-green-50', 'border-green-200', 'text-green-800');
      
      form.reset();
      
      setTimeout(() => {
        alertBox.classList.add('hidden');
      }, 5000);
    });
  }

  // ---------- INITIALISE ----------
  document.addEventListener('DOMContentLoaded', function() {
    initFadeTransitions();
    initMobileMenu();
    setActiveNavigation();
    initContactForm();
    
    // Build timeline if on company page
    if (document.getElementById('timeline-container')) {
      buildTimeline();
    }
    
    const content = document.getElementById('page-content');
    if (content) {
      content.classList.remove('fade-out');
    }
  });

  window.addEventListener('pageshow', function(event) {
    const content = document.getElementById('page-content');
    if (content && event.persisted) {
      content.classList.remove('fade-out');
    }
  });

})();

})();

