// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const icon = themeToggle.querySelector("i");

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

// ===== MENU MOBILE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Change l'icône
  const icon = menuToggle.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    // Remet l'icône burger
    menuToggle.querySelector("i").className = "fas fa-bars";
  });
});

// ===== NAVIGATION ACTIVE LINK =====
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== EFFET TYPING =====
const typingElement = document.querySelector(".typing");
const texts = ["Flutter & Fullstack", "Mobile & Web", "Créateur d'expériences"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 100);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
      return;
    }
    setTimeout(typeEffect, 50);
  }
}

typeEffect();

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
const skillBars = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target;
        const width = progress.style.width;
        progress.style.width = "0%";
        setTimeout(() => {
          progress.style.width = width;
        }, 300);
      }
    });
  },
  { threshold: 0.3 },
);

skillBars.forEach((bar) => observer.observe(bar));

// ===== HEADER OMBRE AU SCROLL =====
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// ===== FORM SUBMIT (Réel & Amélioré) =====
const contactForm = document.querySelector(".contact-form");
const successMessage = document.getElementById("successMessage");
const formWrapper = document.getElementById("formWrapper");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector(".btn");
  const originalText = btn.innerHTML;

  // 1. Désactiver le bouton
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
  btn.disabled = true;

  // 2. Envoyer les données
  const formData = new FormData(contactForm);
  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Succès : Cacher le formulaire et afficher le message de remerciement
      contactForm.style.display = "none";
      successMessage.style.display = "block";

      // Animation fluide
      formWrapper.style.borderColor = "#22C55E";
      formWrapper.style.boxShadow = "0 8px 32px rgba(34, 197, 94, 0.15)";
    } else {
      // Erreur serveur
      btn.innerHTML = '<i class="fas fa-times"></i> Erreur, réessayez';
      btn.style.background = "#ef4444";
      btn.style.boxShadow = "0 4px 20px rgba(239, 68, 68, 0.3)";
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.style.boxShadow = "";
        btn.disabled = false;
      }, 3000);
    }
  } catch (error) {
    // Erreur réseau
    btn.innerHTML = '<i class="fas fa-times"></i> Erreur réseau';
    btn.style.background = "#ef4444";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.boxShadow = "";
      btn.disabled = false;
    }, 3000);
  }
});
// ===== ANIMATION SCROLL REVEAL (AOS manuel) =====
const revealElements = document.querySelectorAll(".skill-card, .project-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  revealObserver.observe(el);
});
console.log("🚀 Portfolio Didier ZALEMA - Design Pro avec Dark Mode");
