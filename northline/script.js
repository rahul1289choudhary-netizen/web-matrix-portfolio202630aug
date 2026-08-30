const nav=document.getElementById("nav"),menuBtn=document.getElementById("menuBtn"),mobileMenu=document.getElementById("mobileMenu");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",window.scrollY>30),{passive:true});
menuBtn.addEventListener("click",()=>{const open=mobileMenu.classList.toggle("open");menuBtn.classList.toggle("open",open);menuBtn.setAttribute("aria-expanded",open)});
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{mobileMenu.classList.remove("open");menuBtn.classList.remove("open");menuBtn.setAttribute("aria-expanded","false")}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=Math.min((i%5)*70,280)+"ms";observer.observe(el)});

const statsObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const el=e.target,start=performance.now(),target=+el.dataset.count;function tick(t){const p=Math.min((t-start)/1100,1);el.textContent=Math.floor((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(tick);else el.textContent=target}requestAnimationFrame(tick);statsObserver.unobserve(el)}}),{threshold:.6});
document.querySelectorAll("[data-count]").forEach(el=>statsObserver.observe(el));

if(matchMedia("(min-width:1000px) and (prefers-reduced-motion: no-preference)").matches){
 const cursor=document.querySelector(".cursor"),dot=document.querySelector(".cursor-dot");let mx=0,my=0,cx=0,cy=0;
 window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
 function move(){cx+=(mx-cx)*.13;cy+=(my-cy)*.13;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(move)}move();
 document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>cursor.style.transform="translate(-50%,-50%) scale(1.5)");el.addEventListener("mouseleave",()=>cursor.style.transform="translate(-50%,-50%) scale(1)")});
}
document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("mousemove",e=>{if(innerWidth<900)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener("mouseleave",()=>el.style.transform="")});

if(matchMedia("(prefers-reduced-motion: no-preference)").matches){
 window.addEventListener("scroll",()=>{document.querySelectorAll(".signature>img,.final-cta>img").forEach(img=>{const r=img.parentElement.getBoundingClientRect(),p=(innerHeight-r.top)/(innerHeight+r.height);img.style.transform=`scale(1.08) translateY(${(p-.5)*-28}px)`})},{passive:true});
}