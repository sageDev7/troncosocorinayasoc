(function () {
  "use strict";

  /* ===== Header: transparente sobre el hero, sólido al hacer scroll ===== */
  var header = document.getElementById("siteHeader");
  var backToTop = document.getElementById("backToTop");
  var waFloat = document.getElementById("waFloat");
  var siteFooter = document.querySelector("footer.site");
  var footerVisible = false;

  function updateFloats() {
    var show = window.scrollY > 500 && !footerVisible;
    if (backToTop) backToTop.classList.toggle("show", show);
    if (waFloat) waFloat.classList.toggle("show", show);
  }
  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) header.classList.toggle("sc", scrolled);
    document.body.classList.toggle("scrolled", scrolled);
    updateFloats();
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (siteFooter) {
    var footerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { footerVisible = entry.isIntersecting; });
      updateFloats();
    }, { threshold: 0 });
    footerObserver.observe(siteFooter);
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== Mobile nav ===== */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  var overlay = document.getElementById("moverlay");

  function closeMenu() {
    burger.classList.remove("open");
    mnav.classList.remove("open");
    overlay.classList.remove("open");
  }
  function toggleMenu() {
    burger.classList.toggle("open");
    mnav.classList.toggle("open");
    overlay.classList.toggle("open");
  }
  if (burger) {
    burger.addEventListener("click", toggleMenu);
    burger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); }
    });
    overlay.addEventListener("click", closeMenu);
    Array.prototype.forEach.call(mnav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ===== FAQ acordeón ===== */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var wrap = item.querySelector(".faq-a-wrap");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-a-wrap").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      wrap.style.maxHeight = !isOpen ? wrap.scrollHeight + "px" : null;
    });
  });

  /* ===== Reveal on scroll ===== */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

})();
