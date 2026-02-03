'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle (robust: supports multiple open/close buttons)
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtns = document.querySelectorAll("[data-nav-close-btn]");
const navOpenBtns = document.querySelectorAll("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  if (!navbar || !overlay) return;
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

navOpenBtns.forEach(btn => btn && btn.addEventListener("click", toggleNav));
navCloseBtns.forEach(btn => btn && btn.addEventListener("click", toggleNav));
if (overlay) overlay.addEventListener("click", toggleNav);
navbarLinks.forEach(link => link && link.addEventListener("click", toggleNav));



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});



// contact page (guarded)
(function () {
  if (window.emailjs && typeof emailjs.init === 'function') {
    emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS public key
  }

  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!window.emailjs || typeof emailjs.sendForm !== 'function') {
      document.getElementById("form-status").innerHTML =
        "<span style='color:red;'>Email service not configured.</span>";
      return;
    }

    emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      this
    ).then(
      function () {
        const status = document.getElementById("form-status");
        if (status) status.innerHTML = "<span style='color:green;'>Message sent successfully!</span>";
        contactForm.reset();
      },
      function (error) {
        const status = document.getElementById("form-status");
        if (status) status.innerHTML = "<span style='color:red;'>Failed to send message.</span>";
        console.log(error);
      }
    );
  });
})();
