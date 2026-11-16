document.documentElement.classList.add("js");

// sticky nav
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// mobile menu
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.firstElementChild.className = open ? "fas fa-times" : "fas fa-bars";
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

// waveform bars
const wave = document.getElementById("wave");
for (let i = 0; i < 72; i++) {
  const s = document.createElement("span");
  const env = Math.sin((i / 71) * Math.PI); // louder in the middle
  s.style.setProperty("--h", `${20 + env * 70 + Math.random() * 10}%`);
  s.style.setProperty("--d", `${(-Math.random() * 1.4).toFixed(2)}s`);
  wave.appendChild(s);
}

// typing ticker
const typing = document.querySelector(".typing");
const words = typing.dataset.words.split("|");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) {
  typing.textContent = words[0];
} else {
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    c += del ? -1 : 1;
    typing.textContent = word.slice(0, c);
    let wait = del ? 25 : 55;
    if (!del && c === word.length) { del = true; wait = 1600; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(tick, wait);
  })();
}

// reveal on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// contact form (EmailJS)
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const status = document.getElementById("form-status");
  const btn = document.getElementById("send-btn");
  status.className = "form-status";
  status.textContent = "Sending…";
  btn.disabled = true;
  emailjs
    .sendForm("service_tgv28ra", "template_hef5u8j", form)
    .then(() => {
      status.classList.add("ok");
      status.textContent = "Message sent. I'll get back to you soon.";
      form.reset();
    })
    .catch((err) => {
      console.error("[EmailJS]", err);
      status.classList.add("err");
      status.textContent = "Couldn't send. Please email ibprince48@gmail.com directly.";
    })
    .finally(() => (btn.disabled = false));
});
