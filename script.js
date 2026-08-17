document.addEventListener("DOMContentLoaded", () => {
  const yearNode = document.getElementById("year");
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const waterfall = document.querySelector(".photo-waterfall");
  const waterfallItems = document.querySelectorAll(".waterfall-item");

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

  if (waterfall && waterfallItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const startWaterfall = () => {
      const waterfallHeight = Math.max(waterfall.clientHeight, window.innerHeight);

      waterfallItems.forEach((item) => {
        item.getAnimations().forEach((animation) => animation.cancel());

        const itemStyle = getComputedStyle(item);
        const duration = parseFloat(itemStyle.getPropertyValue("--duration")) * 1000;
        const delay = parseFloat(itemStyle.getPropertyValue("--delay")) * 1000;
        const drift = itemStyle.getPropertyValue("--drift").trim();
        const tilt = itemStyle.getPropertyValue("--tilt").trim();

        item.animate(
          [
            { opacity: 0, transform: `translate3d(0, -160px, 0) rotate(${tilt})` },
            { offset: 0.08, opacity: 0.72, transform: `translate3d(0, 0, 0) rotate(${tilt})` },
            { offset: 0.5, opacity: 0.82, transform: `translate3d(${drift}, ${Math.round(waterfallHeight * 0.5)}px, 0) rotate(${tilt})` },
            { offset: 0.88, opacity: 0.62, transform: `translate3d(0, ${Math.round(waterfallHeight * 0.88)}px, 0) rotate(${tilt})` },
            { opacity: 0, transform: `translate3d(0, ${waterfallHeight + 160}px, 0) rotate(${tilt})` },
          ],
          {
            duration,
            delay,
            easing: "linear",
            fill: "both",
            iterations: Infinity,
          }
        );
      });
    };

    startWaterfall();
    window.addEventListener("resize", startWaterfall);
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
