const navbar=document.getElementById("navbar"),menu=document.querySelector(".menu-toggle"),nav=document.getElementById("nav-menu");
window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",window.scrollY>30),{passive:true});
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const id=a.getAttribute("href");if(id.length>1){const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"})}}}));
