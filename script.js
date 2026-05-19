const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const revealTargets = document.querySelectorAll(
  ".section-heading, .section-copy, .walk-intro, .walk-card, .place-feature, .place-grid article, .camp-card, .camp-timeline article, .quote-panel, .green-copy, .green-image, .gallery-grid figure, .visit-copy, .visit-card, .source-list a",
);

document.body.classList.add("js-ready");
revealTargets.forEach((target) => target.classList.add("reveal"));

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeNav() {
  document.body.classList.remove("nav-open");
  header.classList.remove("nav-active");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-active");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = `.site-nav a[href="#${entry.target.id}"]`;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.matches(active)));
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 },
);

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
);

revealTargets.forEach((target) => revealObserver.observe(target));

document.querySelectorAll("img").forEach((img) => {
  img.loading = img.loading || "lazy";
  img.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "image-fallback";
    fallback.textContent = "Talim Ghor";
    img.replaceWith(fallback);
  });
});
