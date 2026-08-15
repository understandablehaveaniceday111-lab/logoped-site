document.addEventListener("DOMContentLoaded", () => {
  const yearNode = document.getElementById("year");
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (!header || !navToggle || !navMenu) return;

  let lastScrollY = window.scrollY;

  const updateHeaderState = () => {
    if (window.innerWidth > 640) {
      header.classList.remove("header-hidden");
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      return;
    }

    const currentScrollY = window.scrollY;

    if (navMenu.classList.contains("is-open")) {
      header.classList.remove("header-hidden");
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
  };

  navToggle.addEventListener("click", () => {
    const isOpen = !navMenu.classList.contains("is-open");
    navMenu.classList.toggle("is-open", isOpen);
    header.classList.toggle("header-hidden", !isOpen && window.innerWidth <= 640);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      updateHeaderState();
    });
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", updateHeaderState);
  updateHeaderState();
});
