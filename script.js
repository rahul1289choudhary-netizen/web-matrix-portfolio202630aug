const projects = [
  {number:"01",category:"Concept Website",name:"Brew & Bean",line:"Good coffee deserves a good first impression.",image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85",url:"brew-and-bean/index.html"},
  {number:"02",category:"Concept Website",name:"Forge Fitness",line:"People don't just join a gym. They join the person they want to become.",image:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85",url:"Forge-fitness/index.html"},
  {number:"03",category:"Concept Website",name:"Aura Studio",line:"Before they book you, they're already judging your brand.",image:"https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=85",url:"Aura-studio/index.html"},
  {number:"04",category:"Concept Website",name:"DailyKart",line:"Everything you need, closer to home.",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85",url:"daily-kart/index.html"},
  {number:"05",category:"Concept Website",name:"Sharma Stores",line:"Your neighbourhood. Your trusted store.",image:"https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=85",url:"sharma-store/index.html"},
  {number:"06",category:"Concept Website",name:"Northline",line:"People don't just buy clothes. They buy how they feel wearing them.",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",url:"northline/index.html"}
];


/* Moving showcase cards — driven directly by the existing projects array. */
const showcaseGrid=document.querySelector('#showcase-grid');

if(showcaseGrid){
  const showcaseGroups=[
    [projects[0],projects[2]], // Brew & Bean + Aura Studio
    [projects[1]],              // Forge Fitness
    [projects[3],projects[4]],  // DailyKart + Sharma Stores
    [projects[5]]               // Northline
  ];

  showcaseGrid.innerHTML=showcaseGroups.map((group,index)=>{
    const gold=index===3;
    return `<article class="showcase-card ${gold?'is-gold':''}" data-showcase="${index}" tabindex="0">
      <div class="showcase-media">
        ${group.map((p,i)=>`<div class="showcase-slide ${i===0?'is-active':''}" data-project="${p.number}" style="background-image:url('${p.image}')"></div>`).join('')}
      </div>
      <div class="showcase-shade"></div>
      <div class="showcase-content">
        <div class="showcase-top">
          <span class="showcase-tag">WEB MATRIX / ${String(index+1).padStart(2,'0')}</span>
          <span class="showcase-mark">WEB MATRIX</span>
        </div>
        <div class="showcase-bottom">
          <div class="showcase-project"><i></i><span class="showcase-project-name">${group[0].name}</span></div>
          <h3>${group[0].name}</h3>
          <p>${group[0].line}</p>
          <div class="showcase-dots" aria-hidden="true">
            ${group.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join('')}
          </div>
        </div>
      </div>
    </article>`;
  }).join('');

  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const timers=[];

  showcaseGrid.querySelectorAll('.showcase-card').forEach((card,cardIndex)=>{
    const group=showcaseGroups[cardIndex];
    const slides=[...card.querySelectorAll('.showcase-slide')];
    const dots=[...card.querySelectorAll('.showcase-dots i')];
    const title=card.querySelector('h3');
    const line=card.querySelector('.showcase-bottom p');
    const projectName=card.querySelector('.showcase-project-name');
    let active=0;

    const showNext=()=>{
      if(prefersReduced.matches || slides.length<2) return;
      const next=(active+1)%slides.length;
      slides[active].classList.remove('is-active');
      slides[active].classList.add('is-leaving');
      slides[next].classList.remove('is-leaving');
      slides[next].classList.add('is-active');
      dots[active]?.classList.remove('active');
      dots[next]?.classList.add('active');

      // Update copy as the new visual reaches the midpoint of the crossfade.
      window.setTimeout(()=>{
        title.textContent=group[next].name;
        line.textContent=group[next].line;
        projectName.textContent=group[next].name;
      },850);

      const old=active;
      active=next;
      window.setTimeout(()=>slides[old].classList.remove('is-leaving'),1700);
    };

    if(slides.length>1 && !prefersReduced.matches){
      timers[cardIndex]=window.setInterval(showNext,7000+cardIndex*450);
    }

    // Tiny desktop parallax: transform-only, no layout properties.
    if(window.matchMedia('(pointer:fine)').matches){
      const reset=()=>{
        card.style.setProperty('--rx','0deg');
        card.style.setProperty('--ry','0deg');
      };
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.setProperty('--rx',`${(-y*1.2).toFixed(2)}deg`);
        card.style.setProperty('--ry',`${(x*1.2).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave',reset);
    }
  });

  const reducedChange=()=>{
    if(prefersReduced.matches){
      timers.forEach(t=>t&&clearInterval(t));
    }
  };
  if(prefersReduced.addEventListener) prefersReduced.addEventListener('change',reducedChange);
}

const grid=document.querySelector('#portfolio-grid');
grid.innerHTML=projects.map(p=>`<article class="project-card reveal"><a class="project-preview" href="${p.url}" target="${p.url==='#'?'_self':'_blank'}" rel="noopener" aria-label="View ${p.name} website"><div class="project-image" style="background-image:url('${p.image}')"></div><div class="project-overlay"><div class="project-overlay-copy"><div class="project-index"><span>${p.number}</span><i></i><small>${p.category}</small></div><h3>${p.name}</h3><p>${p.line}</p></div><b>↗</b></div></a><div class="project-footer"><span>Web Matrix / ${p.category}</span><a class="project-link" href="${p.url}" target="${p.url==='#'?'_self':'_blank'}" rel="noopener">View Website <span>→</span></a></div></article>`).join('');

const header=document.querySelector('.site-header');
let lastScroll=0;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  header.classList.toggle('scrolled',y>20);
  if(y>lastScroll && y>180) header.style.transform='translateY(-100%)';
  else header.style.transform='translateY(0)';
  lastScroll=y;
},{passive:true});

const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const glow=document.querySelector('.cursor-glow');
if(window.matchMedia('(pointer:fine)').matches){
  let gx=innerWidth/2,gy=innerHeight/2,tx=gx,ty=gy;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;glow.style.opacity='.55'});
  function move(){gx+=(tx-gx)*.09;gy+=(ty-gy)*.09;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(move)} move();
}

// Gentle 3D response for desktop project previews.
if(window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.project-preview').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*2).toFixed(2)}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}

document.querySelectorAll('.placeholder-link').forEach(link=>link.addEventListener('click',e=>{if(link.getAttribute('href')==='#'){e.preventDefault();alert(link.dataset.placeholder||'Add your real URL here.')}}));

document.querySelector('.contact-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const button=form.querySelector('button[type=submit]');
  const note=form.querySelector('.form-note');
  const data=Object.fromEntries(new FormData(form).entries());
  const apiBase='https://web-matrix-backend.onrender.com';
  button.disabled=true;
  button.innerHTML='Sending <span>…</span>';
  note.textContent='Sending your project enquiry…';
  try{
    const res=await fetch(`${apiBase}/api/leads`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const result=await res.json();
    if(!res.ok) throw new Error(result.detail||'Unable to send enquiry.');
       form.reset();
    note.textContent='Thanks! Your enquiry has been received. We’ll get back to you soon.';
  }catch(err){
    console.error('FORM ERROR:', err);
    note.textContent='ERROR: ' + err.message;
  }finally{
    button.disabled=false;
    button.innerHTML="Let's Talk <span>↗</span>";
  }
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
