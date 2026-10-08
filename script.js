"use strict";

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-panel a");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#0b1120" : "#f8fafc";
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Theme remains active for the current page even if storage is unavailable.
  }
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});
setTheme(root.dataset.theme === "dark" ? "dark" : "light");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navPanel.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu",
  );
  navPanel.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) closeMenu();
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const subject = `Portfolio inquiry from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    String(formData.get("message")),
  ].join("\n");
  const mailto = new URL("mailto:nisreen.samir.analyst@gmail.com");
  mailto.searchParams.set("subject", subject);
  mailto.searchParams.set("body", body);
  window.location.href = mailto.toString();
  formStatus.textContent =
    "Your email app should open with your message ready. If it doesn’t, email nisreen.samir.analyst@gmail.com directly.";
  formStatus.classList.add("is-visible");
  window.setTimeout(() => formStatus.classList.remove("is-visible"), 7000);
});
