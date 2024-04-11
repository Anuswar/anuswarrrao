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

/*=============== CUSTOM CURSOR ===============*/
// Function to check if it's a touch device
isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a"),
  ...document.querySelectorAll("p"),
  ...document.querySelectorAll("h1"),
  ...document.querySelectorAll("h3"),
];

// Hide cursor if it's a touch device
if (isTouchDevice()) {
  cursors.forEach((cursor) => {
    cursor.style.display = "none";
  });
}

// Follow cursor on mousemove
document.addEventListener("mousemove", (event) => {
  if (!isTouchDevice()) {
    const posX = event.clientX;
    const posY = event.clientY;

    cursors[0].style.left = `${posX}px`;
    cursors[0].style.top = `${posY}px`;

    setTimeout(() => {
      cursors[1].style.left = `${posX}px`;
      cursors[1].style.top = `${posY}px`;
    }, 80);

    resetCursorTimeout();
  }
});

// Function to toggle the "hovered" class
function toggleHoverClass() {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.toggle("hovered");
  }
}

// Add event listeners using a generic function
function addEventOnElements(elements, eventType, callback) {
  elements.forEach(function (element) {
    element.addEventListener(eventType, callback);
  });
}

// Add hover class on mouseover
addEventOnElements(hoveredElements, "mouseover", toggleHoverClass);

// Remove hover class on mouseout
addEventOnElements(hoveredElements, "mouseout", toggleHoverClass);

// Hide cursor on mouseout of the window
document.addEventListener("mouseout", () => {
  cursors.forEach((cursor) => {
    cursor.style.display = "none";
  });
});

// Show cursor on mouseover the window
document.addEventListener("mouseover", () => {
  cursors.forEach((cursor) => {
    cursor.style.display = "block";
  });
});

// Cursor effects on mouse stopped
let timeout;

function resetCursorTimeout() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    cursors.forEach((cursor) => {
      cursor.style.display = "none";
    });
  }, 1000);
}

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
