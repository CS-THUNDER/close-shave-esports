(function () {
  rosterGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".player");
    if (!card) return;
    const data = JSON.parse(card.dataset.player);
    openModal(data);
  });
  rosterGrid.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const card = e.target.closest(".player");
      if (!card) return;
      openModal(JSON.parse(card.dataset.player));
    }
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // simple carousel
  const carousel = $("#carousel");
  const track = $("#carouselTrack");
  const slides = Array.from(track.children);
  const prev = carousel && carousel.querySelector(".prev");
  const next = carousel && carousel.querySelector(".next");
  let idx = 0;
  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width + 8; // gap
    track.style.transform = `translateX(${-(idx * slideWidth)}px)`;
  }
  if (prev && next) {
    prev.addEventListener("click", () => {
      idx = Math.max(0, idx - 1);
      updateCarousel();
    });
    next.addEventListener("click", () => {
      idx = Math.min(slides.length - 1, idx + 1);
      updateCarousel();
    });
    window.addEventListener("resize", updateCarousel);
    // init small timeout to allow layout
    setTimeout(updateCarousel, 50);
  }

  // contact form (local-only demo)
  const form = $("#contactForm");
  const formMsg = $("#formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // Basic client validation
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      formMsg.textContent = "Please complete all fields.";
      return;
    }
    formMsg.textContent = "Thanks! Message recorded locally (demo).";
    form.reset();
    setTimeout(() => (formMsg.textContent = ""), 4000);
    // To actually send, integrate with email API or server endpoint.
  });

  // small accessibility: close modal with Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.getAttribute("aria-hidden") === "false") closeModal();
      if (siteNav.classList.contains("open")) siteNav.classList.remove("open");
    }
  });
})();
