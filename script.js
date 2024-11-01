      const navbar = document.querySelector('.navbar');
      const burgerMenu = document.querySelector('.burger-menu');
      const navLinks = document.querySelector('.nav-links');
      const cartCount = document.querySelector('.cart-count');
      const cartIcon = document.querySelector('.cart-icon');
      let count = 0;
      let lastScroll = 0;

      // Scroll handling with throttle
      let ticking = false;
      window.addEventListener('scroll', () => {
          if (!ticking) {
              window.requestAnimationFrame(() => {
                  const currentScroll = window.pageYOffset;
                  if (currentScroll > 50) {
                      navbar.classList.add('scrolled');
                  } else {
                      navbar.classList.remove('scrolled');
                  }
                  lastScroll = currentScroll;
                  ticking = false;
              });
              ticking = true;
          }
      });

      // Burger menu toggle
      burgerMenu.addEventListener('click', () => {
          burgerMenu.classList.toggle('active');
          navLinks.classList.toggle('active');
          document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });

      // Cart counter
      cartIcon.addEventListener('click', () => {
          count++;
          cartCount.textContent = count;
          cartCount.style.transform = 'scale(1.2)';
          setTimeout(() => {
              cartCount.style.transform = 'scale(1)';
          }, 200);
      });

      // Search functionality
      const searchBar = document.querySelector('.search-bar');

      searchBar.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && searchBar.value.trim() !== '') {
              alert(`Searching for: ${searchBar.value}`);
              searchBar.value = '';
          }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
          if (!burgerMenu.contains(e.target) && 
              !navLinks.contains(e.target) && 
              navLinks.classList.contains('active')) {
              burgerMenu.classList.remove('active');
              navLinks.classList.remove('active');
              document.body.style.overflow = '';
          }
      });

      // Animate statistics when in view
      const stats = document.querySelectorAll(".stat-number");

      const animateStats = () => {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          const current = parseInt(stat.innerText);
          const increment = target / 50;

          if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(animateStats, 40);
          } else {
            stat.innerText = target + "+";
          }
        });
      };

      // Intersection Observer for stats animation
      const observerOptions = {
        root: null,
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document
        .querySelector(".stats-container")
        .querySelectorAll(".stat-card")
        .forEach((card) => {
          observer.observe(card);
        });
        let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideControls = document.querySelector('.slide-controls');
let autoplayInterval;

// Create slide dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slide-dot');
    dot.addEventListener('click', () => goToSlide(index));
    slideControls.appendChild(dot);
});

const dots = document.querySelectorAll('.slide-dot');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.zIndex = '0';
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    slides[index].style.zIndex = '1';
    dots[index].classList.add('active');
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoplay();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
}

// Event Listeners
document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
});

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.hero-section').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.hero-section').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoplay();
    }
}

// Pause autoplay on hover
document.querySelector('.hero-section').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.querySelector('.hero-section').addEventListener('mouseleave', () => {
    resetAutoplay();
});

// Initialize
showSlide(0);
resetAutoplay();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoplay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
    }
});

//Ripple effect
document.querySelector('.cta-button').addEventListener('click', function(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});
