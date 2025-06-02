// ===============
// script.js
// ===============

window.addEventListener("DOMContentLoaded", () => {
  console.log("🟢 script.js loaded and DOM fully parsed");

  // ──────────────
  // 1) Fade-in the hero section
  // ──────────────
  const hero = document.querySelector(".hero");
  if (hero) {
    console.log("Found .hero element, scheduling fade-in");
    setTimeout(() => {
      hero.classList.add("visible");
      console.log("Hero .visible class added");
    }, 300);
  } else {
    console.warn("⚠️ .hero element not found—skipping fade-in");
  }

  // ──────────────
  // 2) Scroll-reveal for timeline cards
  // ──────────────
  const timelineCards = document.querySelectorAll(".timeline-card");
  if (timelineCards.length === 0) {
    console.warn("⚠️ No .timeline-card elements found—skipping scroll-reveal");
  } else {
    if ("IntersectionObserver" in window) {
      console.log("IntersectionObserver is supported, initializing observer");
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              console.log("Revealed card:", entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      timelineCards.forEach((card) => {
        card.classList.add("hidden"); // start hidden via CSS
        observer.observe(card);
      });
    } else {
      console.warn("⚠️ IntersectionObserver not supported; revealing all cards");
      timelineCards.forEach((card) => card.classList.add("visible"));
    }
  }

  // ──────────────
  // 3) Subscription form validation
  // ──────────────
  const form = document.getElementById("subscribeForm");
  if (form) {
    console.log("Subscribe form found, hooking up validation");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("was-validated");

      const emailInput = document.getElementById("emailInput");
      if (!emailInput) {
        console.error("❌ #emailInput not found inside form");
        return;
      }

      if (emailInput.checkValidity()) {
        console.log("Valid email entered:", emailInput.value);
        emailInput.value = "";
      } else {
        console.log("Invalid email, showing invalid-feedback");
      }
    });
  } else {
    console.warn("⚠️ No #subscribeForm found—skipping subscription logic");
  }

  // ──────────────
  // 4) Auto-detect browser language for LTR/RTL
  // ──────────────
  const htmlEl = document.documentElement;
  const userLang = navigator.language || navigator.userLanguage;
  console.log("Browser language detected:", userLang);

  if (
    userLang.startsWith("ar") ||
    userLang.startsWith("he") ||
    userLang.startsWith("fa")
  ) {
    htmlEl.setAttribute("dir", "rtl");
    htmlEl.lang = userLang.slice(0, 2);
    console.log("Applied RTL based on browser language:", htmlEl.lang);
  } else {
    htmlEl.setAttribute("dir", "ltr");
    htmlEl.lang = userLang.slice(0, 2);
    console.log("Applied LTR based on browser language:", htmlEl.lang);
  }

  // ──────────────
  // 5) Manual language dropdown override
  // ──────────────
  const langButtons = document.querySelectorAll("[data-lang]");
  if (langButtons.length) {
    console.log("Setting up manual language toggle buttons");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.getAttribute("data-lang");
        if (chosen === "ar") {
          htmlEl.setAttribute("dir", "rtl");
          htmlEl.lang = "ar";
          console.log("User selected Arabic (RTL)");
        } else {
          htmlEl.setAttribute("dir", "ltr");
          htmlEl.lang = "en";
          console.log("User selected English (LTR)");
        }
      });
    });
  } else {
    console.warn("⚠️ No [data-lang] buttons found for manual language toggle");
  }
});
