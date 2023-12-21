/*=============== PRELOADER ===============*/
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", () => {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

// Customize the reveal animation for different elements
sr.reveal(`.contact-headline, .projects-headline`, {
  delay: 600,
});
sr.reveal(`.nav, .footer-home, .footer-social, .skills-item, .projects-item`, {
  origin: "top",
  interval: 100,
});
sr.reveal(`.contact-description, .contact-form`, {
  origin: "left",
  interval: 100,
});
sr.reveal(`.hero-image`, { origin: "top" });
sr.reveal(`.hero-text`);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");

  if (this.scrollY >= 350) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }

  // Prevent the default behavior of the anchor tag
  scrollUp.addEventListener("click", (event) => {
    event.preventDefault();

    // Scroll to the top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

window.addEventListener("scroll", scrollUp);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message"),
  sendButton = document.querySelector("#contact-form button");

const sendEmail = async (e) => {
  e.preventDefault();

  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  try {
    await emailjs.sendForm(
      "service_jodmm14",
      "template_4h6p1xi",
      "#contact-form",
      "0WpGLt88RHCIQLHBN"
    );

    contactMessage.textContent = "Message sent successfully ✅";
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 5000);

    contactForm.reset();
  } catch (error) {
    contactMessage.textContent = "Message not sent (service error) ❌";
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Send Message";
  }
};

contactForm.addEventListener("submit", sendEmail);
