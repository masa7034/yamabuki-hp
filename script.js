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
