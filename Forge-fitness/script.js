const statsData=[["10+","Training Programs"],["25+","Expert Coaches"],["500+","Members"],["24/7","Mindset"]];
const programs=[
 ["01","STRENGTH","Build raw strength and power.","https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"],
 ["02","MUSCLE BUILDING","Structured training designed for progressive growth.","https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"],
 ["03","CONDITIONING","Improve stamina, endurance and athletic performance.","https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"],
 ["04","PERSONAL TRAINING","One-on-one coaching built around your goals.","https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80"]
];
const trainers=[
 ["ALEX CARTER","Strength Coach","https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1000&q=80"],
 ["RYAN SHAW","Performance Coach","https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"],
 ["MAYA REED","Conditioning Coach","https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1000&q=80"]
];
const plans=[
 ["FORGE STARTER","₹1,499",["Gym access","Basic equipment","Locker access"],"GET STARTED"],
 ["FORGE PRO","₹2,499",["Unlimited gym access","Group classes","Training assessment","Locker access"],"JOIN FORGE",true],
 ["FORGE ELITE","₹4,499",["Personal training","Custom workout plan","Nutrition guidance","Priority support"],"GO ELITE"]
];
const gallery=[
 ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=80","GYM INTERIOR"],
 ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80","STRENGTH"],
 ["https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80","RUNNING"],
 ["https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80","BOXING"],
 ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80","GROUP WORKOUT"],
 ["https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80","ATHLETE"],
 ["https://images.unsplash.com/photo-1574680096141-1a57a5d3e7f3?auto=format&fit=crop&w=900&q=80","RECOVERY"],
 ["https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80","THE WORK"]
];
const testimonials=[
 ["“Forge completely changed the way I approach training. I stopped chasing motivation and started building discipline.”","— ARJUN, DEMO MEMBER"],
 ["“The sessions feel focused, challenging and purposeful. Every week gives me something to work toward.”","— PRIYA, DEMO MEMBER"],
 ["“I came for the workouts. I stayed for the mindset and the community.”","— KABIR, DEMO MEMBER"]
];

document.querySelector("#stats").innerHTML=statsData.map(x=>`<div class="stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
document.querySelector("#programGrid").innerHTML=programs.map(x=>`<article class="program"><img loading="lazy" src="${x[3]}" alt="${x[1]} training"><div class="program-content"><span class="program-num">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><span class="program-arrow">↗</span></div></article>`).join("");
document.querySelector("#trainerGrid").innerHTML=trainers.map(x=>`<article class="trainer"><img loading="lazy" src="${x[2]}" alt="${x[0]}, fictional demo trainer"><div class="trainer-info"><h3>${x[0]}</h3><p>${x[1]}</p><span class="trainer-social">IG ↗</span></div></article>`).join("");
document.querySelector("#plans").innerHTML=plans.map(x=>`<article class="plan ${x[4]?"popular":""}">${x[4]?'<span class="popular-tag">MOST POPULAR</span>':""}<h3>${x[0]}</h3><div class="price">${x[1]}<small>/MONTH</small></div><ul>${x[2].map(i=>`<li>+ ${i}</li>`).join("")}</ul><a class="btn ${x[4]?"primary":"ghost"}" href="mailto:hello@forgefitness.example?subject=${encodeURIComponent(x[0])}">${x[3]} <span>→</span></a></article>`).join("");
document.querySelector("#gallery").innerHTML=gallery.map(x=>`<div class="gallery-item" data-label="${x[1]}"><img loading="lazy" src="${x[0]}" alt="${x[1]}"></div>`).join("");
document.querySelector("#testimonials").innerHTML=testimonials.map(x=>`<article class="testimonial"><q>${x[0].slice(1,-1)}</q><footer>${x[1]}</footer></article>`).join("");

const header=document.querySelector("#header"), hamburger=document.querySelector("#hamburger"), nav=document.querySelector("#navLinks");
window.addEventListener("scroll",()=>{header.classList.toggle("scrolled",scrollY>30);document.querySelector(".progress").style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%"},{passive:true});
hamburger.addEventListener("click",()=>{const open=nav.classList.toggle("open");hamburger.setAttribute("aria-expanded",open);hamburger.setAttribute("aria-label",open?"Close menu":"Open menu")});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const quotes=["“Discipline beats motivation.”","“Get comfortable being uncomfortable.”","“Your only limit is the one you accept.”","“Don't stop when you're tired. Stop when the work is done.”"];
let qi=0;
document.querySelector("#quoteNext").addEventListener("click",()=>{qi=(qi+1)%quotes.length;const q=document.querySelector("#quote");q.style.opacity=0;setTimeout(()=>{q.textContent=quotes[qi];q.style.opacity=1},180)});
