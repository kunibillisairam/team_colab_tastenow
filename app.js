/* ==========================================================================
   FeastFlow Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. Theme Toggle (Light / Dark Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeToggleLabel = document.getElementById('theme-toggle-label');

  // Load saved preference or default to dark mode
  const savedTheme = localStorage.getItem('feastflow_theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
      if (themeToggleLabel) themeToggleLabel.textContent = 'Dark';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleIcon) themeToggleIcon.textContent = '☀️';
      if (themeToggleLabel) themeToggleLabel.textContent = 'Light';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
    localStorage.setItem('feastflow_theme', theme);
  }

  // Initialize theme on load
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ==========================================
  // 1. Mobile Navigation & Hamburger Menu
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. Sticky Header & Scrollspy (Active Links)
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header background toggle
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Scrollspy active state
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  });

  // ==========================================
  // 3. Dynamic Products/Dishes Rendering & Filtering
  // ==========================================
  const dishesGrid = document.getElementById('dishes-grid');
  const categoryTabs = document.querySelectorAll('.category-tab');

  // Helper to render stars
  function getStarRatingHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += '★';
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsHTML += '½'; // Simplistic representation or special character
      } else {
        starsHTML += '☆';
      }
    }
    return starsHTML;
  }

  // Function to render dishes
  function renderDishes(categoryFilter = 'all') {
    if (!dishesGrid) return;
    
    dishesGrid.innerHTML = '';
    
    // Filter array
    const filteredProducts = categoryFilter === 'all' 
      ? products 
      : products.filter(p => p.category === categoryFilter);

    if (filteredProducts.length === 0) {
      dishesGrid.innerHTML = '<p class="section-subtitle" style="grid-column: span 3; text-align: center;">No dishes found in this category.</p>';
      return;
    }

    // Generate cards dynamically
    filteredProducts.forEach((dish, index) => {
      const card = document.createElement('div');
      card.className = 'dish-card';
      
      card.innerHTML = `
        <div class="dish-image-wrapper">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
          <div class="dish-rating">
            <span style="color: #ffb703;">★</span> ${dish.rating.toFixed(1)}
          </div>
        </div>
        <div class="dish-info">
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-footer">
            <span class="dish-price">${dish.price}</span>
            <button class="dish-order-btn" data-id="${dish.id}">
              Order Now
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
          </div>
        </div>
      `;

      dishesGrid.appendChild(card);

      // Staggered entrance animation
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
    });
  }

  // Initialize display
  renderDishes();

  // Category Tab Click Event
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      
      // Add active to current
      tab.classList.add('active');
      
      // Re-filter products
      const category = tab.getAttribute('data-category');
      renderDishes(category);
    });
  });

  // ==========================================
  // 4. Testimonials Slider
  // ==========================================
  const track = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('prev-review');
  const nextBtn = document.getElementById('next-review');
  const dotsContainer = document.getElementById('slider-dots');
  const slides = document.querySelectorAll('.review-slide');

  if (track && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Create dot indicators dynamically
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Button event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Auto slide timer
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 6000); // Transitions every 6s
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // Start auto slide
    startAutoSlide();
  }

  // ==========================================
  // 5. Contact Reservation Form Handling
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple HTML5 validation check
      if (contactForm.checkValidity()) {
        // Show success alert
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      } else {
        // Trigger default validation styling prompts
        contactForm.reportValidity();
      }
    });
  }

  // ==========================================
  // 6. Newsletter Subscription Form Handling
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing! We've sent a welcome email to ${emailInput.value}.`);
        newsletterForm.reset();
      }
    });
  }
});
