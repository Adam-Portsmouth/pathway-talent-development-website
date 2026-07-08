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
  } else {
    const update = () => {
      nav.dataset.scrolled = window.scrollY > 16 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  const toggle = nav.querySelector(".site-nav__toggle");
  const links = nav.querySelector(".site-nav__links");
  if (!toggle || !links) return;

  const setOpen = (open) => {
    nav.dataset.menuOpen = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(nav.dataset.menuOpen !== "true");
  });

  links.addEventListener("click", (e) => {
    if (e.target.closest(".site-nav__link")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.dataset.menuOpen === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  const mq = window.matchMedia("(min-width: 48rem)");
  const onChange = () => {
    if (mq.matches) setOpen(false);
  };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange);
})();
