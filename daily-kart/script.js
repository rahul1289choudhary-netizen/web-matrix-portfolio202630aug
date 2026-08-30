const products=[
{id:1,name:"Aashirvaad Atta",brand:"Aashirvaad",qty:"5 kg",price:269,old:299,discount:"10% OFF",rating:4.7,tag:"Best Deals",image:"https://f.nooncdn.com/p/pnsku/N13421896A/45/_/1766380623/a52454dd-c374-4586-a41e-c07a1a7d74a4.jpg"},
{id:2,name:"Tata Salt",brand:"Tata",qty:"1 kg",price:24,old:28,discount:"14% OFF",rating:4.7,tag:"Popular",image:"https://www.tatanutrikorner.com/cdn/shop/files/Tata_Salt_-_North_Central_Recyclable_AH-IN-JB-RP-BH-PU-SG_1_Kg_FOP-removebg-preview.png?v=1745827173&width=416"},
{id:3,name:"Amul Taaza Milk",brand:"Amul",qty:"1 L",price:64,old:68,discount:"6% OFF",rating:4.8,tag:"Popular",image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=82"},
{id:4,name:"Parle-G Biscuits",brand:"Parle",qty:"800 g",price:78,old:90,discount:"13% OFF",rating:4.6,tag:"Best Deals",image:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=82"},
{id:5,name:"Tata Sampann Toor Dal",brand:"Tata Sampann",qty:"1 kg",price:145,old:159,discount:"9% OFF",rating:4.7,tag:"Popular",image:"https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=82"},
{id:6,name:"Fortune Sunflower Oil",brand:"Fortune",qty:"1 L",price:125,old:139,discount:"10% OFF",rating:4.6,tag:"Popular",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=82"},
{id:7,name:"Amul Butter",brand:"Amul",qty:"500 g",price:285,old:305,discount:"7% OFF",rating:4.8,tag:"New",image:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=82"},
{id:8,name:"Kellogg's Corn Flakes",brand:"Kellogg's",qty:"300 g",price:145,old:165,discount:"12% OFF",rating:4.5,tag:"New",image:"https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=700&q=82"},
{id:9,name:"Fresh Apples",brand:"Daily Fresh",qty:"1 kg",price:159,old:179,discount:"11% OFF",rating:4.8,tag:"Popular",image:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=82"},
{id:10,name:"Fresh Bananas",brand:"Daily Fresh",qty:"1 dozen",price:69,old:79,discount:"13% OFF",rating:4.7,tag:"Popular",image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=82"},
{id:11,name:"Tomatoes",brand:"Daily Fresh",qty:"1 kg",price:49,old:59,discount:"17% OFF",rating:4.6,tag:"Best Deals",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=82"},
{id:12,name:"Potatoes",brand:"Daily Fresh",qty:"1 kg",price:39,old:45,discount:"13% OFF",rating:4.6,tag:"New",image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=82"},
{id:13,name:"Onions",brand:"Daily Fresh",qty:"1 kg",price:45,old:52,discount:"13% OFF",rating:4.5,tag:"Popular",image:"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=82"},
{id:14,name:"Carrots",brand:"Daily Fresh",qty:"500 g",price:35,old:42,discount:"17% OFF",rating:4.7,tag:"New",image:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=82"},
{id:15,name:"Spinach",brand:"Daily Fresh",qty:"1 bunch",price:29,old:35,discount:"17% OFF",rating:4.8,tag:"Best Deals",image:"https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=82"},
{id:16,name:"Mangoes",brand:"Daily Fresh",qty:"1 kg",price:119,old:139,discount:"14% OFF",rating:4.9,tag:"New",image:"https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=82"}];

let cart=JSON.parse(localStorage.getItem("dailyKartCart")||"{}"), activeFilter="All", liked=new Set();
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function stepper(id){return `<div class="stepper"><button onclick="changeQty(${id},-1)" aria-label="Decrease quantity">−</button><span>${cart[id]}</span><button onclick="changeQty(${id},1)" aria-label="Increase quantity">+</button></div>`}
function safeImage(img){
 img.onerror=()=>{img.onerror=null;img.src="https://placehold.co/800x600/eaf2e7/16372a?text=Daily+Kart"};
}
function card(p){
 const n=cart[p.id]||0, heart=liked.has(p.id)?"♥":"♡";
 return `<article class="product"><div class="product-img" onclick="openProduct(${p.id})" tabindex="0"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="safeImage(this)"><span class="discount">${p.discount}</span><button class="heart ${liked.has(p.id)?"liked":""}" onclick="event.stopPropagation();toggleLike(${p.id})">${heart}</button></div><h3>${p.name}</h3><div class="brand">${p.brand}</div><div class="qty">${p.qty}</div><div class="rating">⭐ ${p.rating}</div><div class="price-row"><div class="price"><b>₹${p.price}</b><span class="old">₹${p.old}</span></div>${n?stepper(p.id):`<button class="add" onclick="add(${p.id})">ADD</button>`}</div></article>`
}
function filteredProducts(){
 const q=($("#search")?.value||"").trim().toLowerCase();
 let a=products.filter(p=>(activeFilter==="All"||p.tag===activeFilter)&&(!q||`${p.name} ${p.brand} ${p.qty}`.toLowerCase().includes(q)));
 const s=$("#sort")?.value||"";
 if(s.includes("Low"))a.sort((x,y)=>x.price-y.price); if(s.includes("High"))a.sort((x,y)=>y.price-x.price); return a
}
function render(){
 const arr=filteredProducts(); $("#productGrid").innerHTML=arr.map(card).join(""); $("#noResults").classList.toggle("hidden",arr.length>0);
 $("#dealGrid").innerHTML=products.slice(0,4).map(card).join(""); $("#freshGrid").innerHTML=products.slice(8).map(card).join(""); updateCounts(); renderCart()
}
function add(id){cart[id]=(cart[id]||0)+1;save();showToast("Added to your kart ✦")}
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save()}
function save(){localStorage.setItem("dailyKartCart",JSON.stringify(cart));render()}
function toggleLike(id){liked.has(id)?liked.delete(id):liked.add(id);render()}
function updateCounts(){let n=Object.values(cart).reduce((a,b)=>a+b,0);$("#cartCount").textContent=n;$("#drawerCount").textContent=n;$("#bottomCount").textContent=n}
function renderCart(){
 const ids=Object.keys(cart).map(Number), box=$("#cartItems");
 if(!ids.length){box.innerHTML='<div class="empty">Your kart is waiting for good things. 🛒<br><br><a class="btn btn-primary" href="#products" onclick="closeCart()">START SHOPPING</a></div>';$("#cartSummary").innerHTML="";return}
 let subtotal=ids.reduce((s,id)=>s+products.find(p=>p.id===id).price*cart[id],0), delivery=subtotal>=499?0:40,total=subtotal+delivery,remaining=Math.max(0,499-subtotal),pct=Math.min(100,subtotal/499*100);
 box.innerHTML=ids.map(id=>{let p=products.find(x=>x.id===id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}" onerror="safeImage(this)"><div><h4>${p.name}</h4><small>${p.qty} · ₹${p.price}</small>${stepper(id)}<button class="remove" onclick="removeItem(${id})">Remove</button></div><b>₹${p.price*cart[id]}</b></div>`}).join("");
 $("#cartSummary").innerHTML=`<div style="font-size:11px;font-weight:800;margin-bottom:7px">${remaining?`You are ₹${remaining} away from FREE DELIVERY`:"🎉 You unlocked FREE DELIVERY"}</div><div class="progress"><span style="width:${pct}%"></span></div><div class="summary-row"><span>Subtotal</span><b>₹${subtotal}</b></div><div class="summary-row"><span>Delivery</span><b>${delivery?"₹40":"₹0"}</b></div><div class="summary-row total"><span>Total</span><b>₹${total}</b></div><button class="btn btn-primary checkout" onclick="checkout()">PROCEED TO CHECKOUT ↗</button>`
}
function removeItem(id){delete cart[id];save();showToast("Item removed")}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("open")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("open")}
function openProduct(id){const p=products.find(x=>x.id===id);$("#modalBody").innerHTML=`<div class="modal-grid"><img src="${p.image}" alt="${p.name}" onerror="safeImage(this)"><div><span class="kicker">${p.tag.toUpperCase()}</span><h2>${p.name}</h2><div class="brand">${p.brand} · ${p.qty}</div><p>Fresh, reliable everyday essentials selected for your home. Replace this demo description with real product copy when connecting your store.</p><div class="rating">⭐ ${p.rating} customer rating</div><h2>₹${p.price} <span class="old">₹${p.old}</span></h2><button class="btn btn-primary" onclick="add(${p.id});closeModal()">ADD TO KART ↗</button></div></div>`;$("#modal").classList.add("open")}
function closeModal(){$("#modal").classList.remove("open")}
function checkout(){showToast("Checkout is a demo interaction — your kart is ready!")}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1900)}
function toggleMenu(){$("#mobileMenu").classList.toggle("open")}
function focusSearch(){if(innerWidth<701){const q=prompt("Search Daily Kart","milk");if(q!==null){$("#search").value=q;render();$("#products").scrollIntoView({behavior:"smooth"})}}else $("#search").focus()}
$("#search").addEventListener("input",render);$("#sort").addEventListener("change",render);
$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{$$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;render()}));
$("#newsletter").addEventListener("submit",e=>{e.preventDefault();showToast("You're on the Daily Kart list ✦");e.target.reset()});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus()}if(e.key==="Escape"){closeCart();closeModal()}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
document.addEventListener("mousemove",e=>{if(innerWidth>1000){document.querySelector(".cursor-glow").style.transform=`translate(${e.clientX-120}px,${e.clientY-120}px)`}});
let secs=4*3600+32*60+18;setInterval(()=>{secs--;if(secs<0)secs=4*3600+32*60+18;let h=String(Math.floor(secs/3600)).padStart(2,"0"),m=String(Math.floor(secs%3600/60)).padStart(2,"0"),s=String(secs%60).padStart(2,"0");$("#timer").textContent=`${h} : ${m} : ${s}`},1000);
render();
