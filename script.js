// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  // Fade in the hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => hero.classList.add("visible"), 300);
  }

  // Scroll-reveal for timeline cards
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".timeline-card").forEach((card) => {
    observer.observe(card);
  });

  // Subscription form validation
  const form = document.getElementById("subscribeForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("was-validated");

      const emailInput = document.getElementById("emailInput");
      if (emailInput.checkValidity()) {
        // Simulate successful subscription
        emailInput.value = "";
      }
    });
  }

  // Auto-detect browser language and apply LTR/RTL
  const htmlEl = document.documentElement;
  const userLang = navigator.language || navigator.userLanguage;
  if (userLang.startsWith("ar") || userLang.startsWith("he") || userLang.startsWith("fa")) {
    htmlEl.setAttribute("dir", "rtl");
  } else {
    htmlEl.setAttribute("dir", "ltr");
  }

  // Manual language dropdown to override auto-detect
  const langButtons = document.querySelectorAll('[data-lang]');
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = btn.getAttribute("data-lang");
      if (chosen === "ar") {
        htmlEl.setAttribute("dir", "rtl");
        document.documentElement.lang = "ar";
      } else {
        htmlEl.setAttribute("dir", "ltr");
        document.documentElement.lang = "en";
      }
    });
  });
});
