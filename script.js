const nav = document.querySelector("nav");
const toggle = document.querySelector(".nav-toggle");
const yearSpan = document.getElementById("year");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.addEventListener("click", (event) => {
  if (
    nav &&
    nav.classList.contains("open") &&
    !nav.contains(event.target) &&
    event.target !== toggle
  ) {
    nav.classList.remove("open");
  }
});

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const fadeElements = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));
} else {
  fadeElements.forEach((el) => el.classList.add("visible"));
}

const heroSection = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");
const prefersReducedMotion = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : { matches: false };

if (heroSection && heroVisual) {
  let rafId = 0;
  let tiltEnabled = false;

  const updateTilt = (x, y) => {
    cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(() => {
      heroVisual.style.setProperty("--tilt-x", `${x}deg`);
      heroVisual.style.setProperty("--tilt-y", `${y}deg`);
    });
  };

  const resetTilt = () => updateTilt(0, 0);

  const handlePointerMove = (event) => {
    const rect = heroSection.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    const tiltX = relativeX * 10;
    const tiltY = relativeY * -6;
    updateTilt(tiltX, tiltY);
  };

  const handlePointerLeave = () => {
    resetTilt();
  };

  const enableTilt = () => {
    if (tiltEnabled) {
      return;
    }
    heroSection.addEventListener("pointermove", handlePointerMove);
    heroSection.addEventListener("pointerleave", handlePointerLeave);
    tiltEnabled = true;
  };

  const disableTilt = () => {
    if (!tiltEnabled) {
      return;
    }
    heroSection.removeEventListener("pointermove", handlePointerMove);
    heroSection.removeEventListener("pointerleave", handlePointerLeave);
    tiltEnabled = false;
    resetTilt();
  };

  const evaluateMotionPreference = () => {
    if (prefersReducedMotion.matches) {
      disableTilt();
    } else {
      enableTilt();
    }
  };

  evaluateMotionPreference();

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", evaluateMotionPreference);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(evaluateMotionPreference);
  }
}
