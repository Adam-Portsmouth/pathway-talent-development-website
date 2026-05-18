(function () {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  const sentinel = document.querySelector("[data-nav-sentinel]");

  if (sentinel && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          nav.dataset.scrolled = entry.isIntersecting ? "false" : "true";
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return;
  }

  const update = () => {
    nav.dataset.scrolled = window.scrollY > 16 ? "true" : "false";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
})();
