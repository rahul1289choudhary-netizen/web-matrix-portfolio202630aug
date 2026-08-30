const menuData = [
  {title:"COFFEE", items:[["Espresso","₹120"],["Americano","₹140"],["Cappuccino","₹170"],["Café Latte","₹180"],["Mocha","₹200"]]},
  {title:"SPECIALS", items:[["Cold Brew","₹190"],["Vanilla Latte","₹210"],["Caramel Macchiato","₹220"],["Matcha Latte","₹200"]]},
  {title:"BAKES", items:[["Butter Croissant","₹150"],["Chocolate Croissant","₹180"],["Banana Bread","₹160"],["Cinnamon Roll","₹190"]]}
];

const menuGrid = document.querySelector("#menu-grid");
menuGrid.innerHTML = menuData.map(category => `
  <div class="menu-category">
    <h3>${category.title}</h3>
    ${category.items.map(([name, price]) => `
      <div class="menu-item"><strong>${name}</strong><span>${price}</span></div>
    `).join("")}
  </div>
`).join("");

const header = document.querySelector("#header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav-links");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, {passive:true});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(entry.target.classList.contains("image-reveal") ? "revealed" : "visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal,.image-reveal").forEach(el => observer.observe(el));
