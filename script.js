// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  navLinks.classList.toggle("open", !open);
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    navLinks.classList.remove("open");
  })
);

// Reveal sections on scroll
const revealTargets = document.querySelectorAll(".card, .timeline li, .quote, .stats li");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Contact form
const form = document.querySelector(".contact-form");
const status = form.querySelector(".form-status");
const FALLBACK_EMAIL = "hello@example.com";

function setStatus(message, type) {
  status.textContent = message;
  status.className = "form-status" + (type ? " " + type : "");
}

function validate() {
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.value.trim() !== "" && (field.type !== "email" || /^\S+@\S+\.\S+$/.test(field.value));
    field.setAttribute("aria-invalid", String(!ok));
    if (!ok) valid = false;
  });
  return valid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validate()) {
    setStatus("Please fill in your name, a valid email and some project details.", "err");
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const data = new FormData(form);

  // No form service configured yet: open the visitor's email client instead.
  if (form.action.includes("YOUR_FORM_ID")) {
    const subject = encodeURIComponent(`Project enquiry: ${data.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nOrganisation: ${data.get("organisation") || "-"}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app to send the message…", "ok");
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  setStatus("Sending…");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(response.statusText);
    form.reset();
    setStatus("Thank you — your message has been sent. I’ll be in touch soon.", "ok");
  } catch {
    setStatus(`Sorry, something went wrong. Please email ${FALLBACK_EMAIL} directly.`, "err");
  } finally {
    button.disabled = false;
  }
});
