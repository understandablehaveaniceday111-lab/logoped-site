document.addEventListener("DOMContentLoaded", () => {
  const yearNode = document.getElementById("year");
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 70}ms`;
      revealObserver.observe(item);
    });
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
