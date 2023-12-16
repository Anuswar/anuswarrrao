/*=============== PRELOADER ===============*/
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
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

sr.reveal(`.contact-headline, .projects-headline`, {
  delay: 600,
});
sr.reveal(`.footer-title, .header-social, .skills-item, .projects-item`, {
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
];

// Check if it's a touch device
if (isTouchDevice()) {
  cursors.forEach((cursor) => {
    cursor.style.display = "none";
  });
}

// Follow cursor on mousemove
document.addEventListener("mousemove", (event) => {
  // Only update cursor position if it's not a touch device
  if (!isTouchDevice()) {
    const posX = event.clientX;
    const posY = event.clientY;

    // Cursor dot position
    cursors[0].style.left = `${posX}px`;
    cursors[0].style.top = `${posY}px`;

    // Cursor outline position
    setTimeout(() => {
      cursors[1].style.left = `${posX}px`;
      cursors[1].style.top = `${posY}px`;
    }, 80);

    // Reset cursor timeout on mousemove
    resetCursorTimeout();
  }
});

// Function to add or remove the "hovered" class
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

// Add hover class when mouseover on hoveredElements
addEventOnElements(hoveredElements, "mouseover", toggleHoverClass);

// Remove hover class when mouseout on hoveredElements
addEventOnElements(hoveredElements, "mouseout", toggleHoverClass);

// Hide cursor intentionally when mouseout of the window
document.addEventListener("mouseout", () => {
  cursors.forEach((cursor) => {
    cursor.style.display = "none";
  });
});

// Show cursor when mouseover the window
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

/*=============== HEADER ===============*/
const header = document.querySelector(".header");
let previousScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > previousScroll) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
    header.style.background = currentScroll === 0 ? "transparent" : "black";
  }
  previousScroll = currentScroll;
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  overlay = document.getElementById("overlay");

const showMenu = () => {
  navMenu.classList.add("show-menu");
  overlay.classList.add("show-overlay");
};

const closeMenu = () => {
  navMenu.classList.remove("show-menu");
  overlay.classList.remove("show-overlay");
};

if (navToggle) {
  navToggle.addEventListener("click", showMenu);
}

if (navClose) {
  navClose.addEventListener("click", closeMenu);
}

// Close menu when overlay is clicked
overlay.addEventListener("click", closeMenu);

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav-link");

const linkAction = (event) => {
  event.preventDefault(); // Prevent the default behavior of anchor tags

  // Get the target section ID from the href attribute
  const targetId = event.currentTarget.getAttribute("href").substring(1);

  // Close the menu and overlay
  closeMenu();

  // Remove the hash from the URL and replace it with an empty string
  history.replaceState(
    null,
    null,
    window.location.pathname + window.location.search
  );

  // Scroll to the target section smoothly
  document.getElementById(targetId).scrollIntoView({
    behavior: "smooth",
  });
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

// Close menu when scrolling
window.addEventListener("scroll", () => {
  if (navMenu.classList.contains("show-menu")) {
    closeMenu();
  }
});

// Close menu when pressing "Esc" key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("show-menu")) {
    closeMenu();
  }
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClasses = document.querySelectorAll(
        ".nav-menu a[href*=" + sectionId + "]"
      );

    sectionsClasses.forEach((link) => {
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        // Add active-link to the current section
        link.classList.add("active-link");
      } else {
        // Remove active-link from all links
        link.classList.remove("active-link");
      }
    });
  });
};

// Initial call to set active link on page load
scrollActive();

window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
// Define the scrollUp function
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");

  if (window.scrollY >= 350) {
    scrollUpButton.classList.add("show-scroll");
  } else {
    scrollUpButton.classList.remove("show-scroll");
  }
};

// Add an event listener to call the scrollUp function when the user scrolls
window.addEventListener("scroll", scrollUp);

// Add an event listener to scroll to the top when an element with class "top" is clicked
document.querySelectorAll(".top").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    // Scroll to the top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Add an event listener to prevent # for the anchor tag with class "scrollup"
document.querySelector(".scrollup").addEventListener("click", (event) => {
  event.preventDefault();

  // Scroll to the top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  //serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_jodmm14",
      "template_4h6p1xi",
      "#contact-form",
      "0WpGLt88RHCIQLHBN"
    )
    .then(
      () => {
        //show send message
        contactMessage.textContent = "Message sent successfully ✅";

        //remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        //clear input fields
        contactForm.reset();
      },
      () => {
        //show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);
