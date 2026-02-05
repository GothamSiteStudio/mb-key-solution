document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("mobile-open");
      toggle.setAttribute("aria-expanded", isOpen.toString());
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && nav.classList.contains("mobile-open")) {
        nav.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("mobile-open")) {
        nav.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  // Smooth scroll for anchor links with accessibility
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Set focus for screen readers
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  // Add loading state feedback for CTA buttons
  document.querySelectorAll('.button.primary[href^="tel:"]').forEach(btn => {
    btn.addEventListener("click", () => {
      // Provide haptic feedback on supported devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
  });

  // Intersection Observer for scroll animations (respects reduced motion)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (!prefersReducedMotion) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".card, .section h2").forEach(el => {
      el.classList.add("animate-target");
      observer.observe(el);
    });
  }

  // Lazy load images with native support check
  if ("loading" in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
});
