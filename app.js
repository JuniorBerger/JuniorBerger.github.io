/* Site branding — Gaëtan */
function initMenu(){
  const burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if(!burger) return;
  burger.addEventListener("click", () => {
    nav.classList.toggle("ouvert"); burger.classList.toggle("ouvert");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("ouvert"); burger.classList.remove("ouvert");
  }));
}
function initHeader(){
  const h = document.getElementById("header");
  const onScroll = () => h.classList.toggle("header--scrolled", scrollY > 40);
  addEventListener("scroll", onScroll); onScroll();
}
let observer;
function initReveals(){
  observer = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}
function initFormulaires(){
  const f = document.getElementById("form-contact");
  if(!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const btn = f.querySelector('button[type="submit"]');
    const ok = f.querySelector(".form-ok"), ko = f.querySelector(".form-erreur");
    btn.disabled = true; const label = btn.textContent; btn.textContent = "Envoi…";
    const data = {
      nom: document.getElementById("c-nom").value.trim(),
      email: document.getElementById("c-email").value.trim(),
      besoin: document.getElementById("c-besoin").value,
      message: document.getElementById("c-msg").value.trim(),
      _subject: "Nouveau message — juniorberger.github.io",
      _honey: "", _captcha: "false"
    };
    fetch(f.action, {method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body: JSON.stringify(data)})
      .then(r => { if(!r.ok) throw new Error("http "+r.status); return r.json(); })
      .then(() => { ok.style.display = "block"; ko.style.display = "none"; f.reset();
        f.scrollIntoView({behavior:"smooth", block:"center"}); })
      .catch(() => { ko.style.display = "block"; ok.style.display = "none"; })
      .finally(() => { btn.disabled = false; btn.textContent = label; });
  });
}
function initDivers(){
  const y = document.getElementById("annee"); if(y) y.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", () => {
  initMenu(); initHeader(); initReveals(); initFormulaires(); initDivers();
});
