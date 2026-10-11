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
  document.querySelectorAll("form[data-demo]").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      f.querySelector(".form-ok").style.display = "block";
      f.querySelectorAll("input[type=text],input[type=email],textarea").forEach(i => i.value = "");
      f.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });
}
function initDivers(){
  const y = document.getElementById("annee"); if(y) y.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", () => {
  initMenu(); initHeader(); initReveals(); initFormulaires(); initDivers();
});
