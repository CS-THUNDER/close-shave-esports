/*======================================================
 CLOSE SHAVE ESPORTS
 MAIN.JS V2.0
======================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /*======================================================
 LOADER
======================================================*/

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";

      document.body.classList.add("loaded");
    }, 1800);
  });

  /*======================================================
 AOS
======================================================*/

  AOS.init({
    duration: 900,

    once: true,

    offset: 120,

    easing: "ease-out-cubic",
  });

  /*======================================================
 GSAP HERO
======================================================*/

  let tl = gsap.timeline();

  tl.from(".hero-tag", {
    opacity: 0,

    y: -40,

    duration: 0.7,
  })

    .from(
      ".hero-left h1 span",
      {
        opacity: 0,

        y: 120,

        stagger: 0.12,

        duration: 0.8,

        ease: "power4.out",
      },
      "-=.2",
    )

    .from(
      "#typing-text",
      {
        opacity: 0,

        y: 25,

        duration: 0.6,
      },
      "-=.3",
    )

    .from(
      ".hero-buttons",
      {
        opacity: 0,

        y: 20,

        duration: 0.6,
      },
      "-=.3",
    )

    .from(
      ".hero-social a",
      {
        opacity: 0,

        scale: 0,

        stagger: 0.08,

        duration: 0.4,
      },
      "-=.4",
    )

    .from(
      ".hero-logo",
      {
        opacity: 0,

        scale: 0.5,

        rotate: -180,

        duration: 1,

        ease: "back.out(1.8)",
      },
      "-=.8",
    )

    .from(
      ".hero-bottom .stat",
      {
        opacity: 0,

        y: 40,

        stagger: 0.12,
      },
      "-=.6",
    );

  /*======================================================
 CURSOR GLOW
======================================================*/

  const glow = document.getElementById("cursor-glow");

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";
  });

  /*======================================================
 SCROLL PROGRESS
======================================================*/

  const progress = document.getElementById("progress-bar");

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const width = (scrollTop / scrollHeight) * 100;

    progress.style.width = width + "%";
  });

  /*======================================================
 TYPEWRITER
======================================================*/

  const typing = document.getElementById("typing-text");

  const texts = [
    "One Clean Cut. No Second Chances.",

    "Competitive Gaming • Content Creation • Community",

    "Grinding Every Day For Championships.",

    "Built To Dominate Every Lobby.",
  ];

  let textIndex = 0;

  let charIndex = 0;

  let deleting = false;

  function typeEffect() {
    const current = texts[textIndex];

    if (!deleting) {
      typing.textContent = current.substring(0, charIndex++);

      if (charIndex > current.length) {
        deleting = true;

        setTimeout(typeEffect, 1800);

        return;
      }
    } else {
      typing.textContent = current.substring(0, charIndex--);

      if (charIndex < 0) {
        deleting = false;

        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, deleting ? 35 : 70);
  }

  typeEffect();

  /*======================================================
 MOBILE MENU
======================================================*/

  const menu = document.getElementById("menu-btn");

  const nav = document.getElementById("navbar");

  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  document.querySelectorAll("#navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  /*======================================================
 COUNTERS
======================================================*/

  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = +counter.dataset.target;

      let value = 0;

      const step = Math.ceil(target / 120);

      const update = () => {
        value += step;

        if (value >= target) {
          value = target;
        }

        counter.innerHTML = value;

        if (value < target) {
          requestAnimationFrame(update);
        }
      };

      update();

      observer.unobserve(counter);
    });
  });

  counters.forEach((counter) => observer.observe(counter));
  /*======================================================
 PLAYER MODAL
======================================================*/

  const modal = document.querySelector(".player-modal");

  const modalImg = document.getElementById("modal-image");

  const modalName = document.getElementById("modal-name");

  const modalRole = document.getElementById("modal-role");

  const modalCountry = document.getElementById("modal-country");

  const modalAge = document.getElementById("modal-age");

  const modalBio = document.getElementById("modal-bio");

  const closeModal = document.querySelector(".close-modal");

  document.querySelectorAll(".player-card").forEach((card) => {
    card.addEventListener("click", () => {
      const player = JSON.parse(card.dataset.player);

      modalImg.src = player.image;

      modalName.textContent = player.name;

      modalRole.textContent = player.role;

      modalCountry.textContent = player.country;

      modalAge.textContent = player.age;

      modalBio.textContent = player.bio;

      modal.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");

    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");

      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");

      document.body.style.overflow = "auto";
    }
  });

  /*======================================================
 HERO PARALLAX
======================================================*/

  const hero = document.querySelector("#hero");

  const logo = document.querySelector(".hero-logo");

  const glow1 = document.querySelector(".glow-1");

  const glow2 = document.querySelector(".glow-2");

  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;

    const y = e.clientY / window.innerHeight;

    gsap.to(logo, {
      x: (x - 0.5) * 35,

      y: (y - 0.5) * 25,

      duration: 0.8,
    });

    gsap.to(glow1, {
      x: (x - 0.5) * 120,

      y: (y - 0.5) * 80,

      duration: 1,
    });

    gsap.to(glow2, {
      x: (0.5 - x) * 80,

      y: (0.5 - y) * 60,

      duration: 1,
    });
  });

  /*======================================================
 PLAYER CARD TILT
======================================================*/

  document.querySelectorAll(".player-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -12;

      const rotateY = (x / rect.width - 0.5) * 12;

      card.style.transform = `perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /*======================================================
 LIGHTBOX
======================================================*/

  const galleryImages = document.querySelectorAll("#gallery img");

  const lightbox = document.getElementById("lightbox");

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.classList.add("active");

      lightbox.innerHTML = `<img src="${image.src}">`;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  /*======================================================
 ACTIVE NAV
======================================================*/

  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll("#navbar a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 180;

      const height = section.offsetHeight;

      if (scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /*======================================================
 HEADER HIDE
======================================================*/

  let lastScroll = 0;

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;

    if (current > lastScroll && current > 120) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScroll = current;
  });

  /*======================================================
 CONTACT FORM
======================================================*/

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = form.querySelector("button");

      btn.innerHTML = "Sending...";

      setTimeout(() => {
        btn.innerHTML = "Message Sent ✓";

        setTimeout(() => {
          btn.innerHTML = "Send Message";

          form.reset();
        }, 2000);
      }, 1500);
    });
  }

  /*======================================================
 RIPPLE BUTTON
======================================================*/

  document.querySelectorAll(".primary-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const ripple = document.createElement("span");

      const size = Math.max(button.clientWidth, button.clientHeight);

      ripple.style.width = size + "px";

      ripple.style.height = size + "px";

      ripple.style.left = e.offsetX - size / 2 + "px";

      ripple.style.top = e.offsetY - size / 2 + "px";

      ripple.className = "ripple";

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /*======================================================
 HERO RINGS
======================================================*/

  gsap.to(".ring1", {
    rotation: 360,

    repeat: -1,

    duration: 18,

    ease: "none",
  });

  gsap.to(".ring2", {
    rotation: -360,

    repeat: -1,

    duration: 25,

    ease: "none",
  });

  gsap.to(".ring3", {
    rotation: 360,

    repeat: -1,

    duration: 35,

    ease: "none",
  });

  /*======================================================
 SPONSOR HOVER
======================================================*/

  document.querySelectorAll(".sponsor-slider img").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.12,

        duration: 0.3,
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,

        duration: 0.3,
      });
    });
  });

  /*======================================================
 FOOTER YEAR
======================================================*/

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /*======================================================
 END
======================================================*/
});