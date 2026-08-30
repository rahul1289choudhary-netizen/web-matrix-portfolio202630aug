const products=[
{id:1,name:"Aashirvaad Atta",brand:"Aashirvaad",qty:"5 kg",price:299,old:340,rating:4.8,category:"Rice, Atta & Dal",icon:"🌾"},
{id:2,name:"Tata Salt",brand:"Tata",qty:"1 kg",price:28,old:30,rating:4.7,category:"Rice, Atta & Dal",icon:"🧂"},
{id:3,name:"Amul Milk",brand:"Amul",qty:"1 L",price:68,old:72,rating:4.9,category:"Dairy & Breakfast",icon:"🥛"},
{id:4,name:"Fortune Sunflower Oil",brand:"Fortune",qty:"1 L",price:125,old:145,rating:4.6,category:"Rice, Atta & Dal",icon:"🫗"},
{id:5,name:"Tata Tea",brand:"Tata",qty:"500 g",price:245,old:270,rating:4.8,category:"Beverages",icon:"🍵"},
{id:6,name:"Parle-G",brand:"Parle",qty:"800 g",price:90,old:100,rating:4.7,category:"Biscuits & Snacks",icon:"🍪"},
{id:7,name:"Fortune Chakki Atta",brand:"Fortune",qty:"5 kg",price:315,old:350,rating:4.6,category:"Rice, Atta & Dal",icon:"🌾"},
{id:8,name:"Pillsbury Atta",brand:"Pillsbury",qty:"5 kg",price:320,old:350,rating:4.5,category:"Rice, Atta & Dal",icon:"🌾"},
{id:9,name:"Amul Butter",brand:"Amul",qty:"500 g",price:285,old:310,rating:4.9,category:"Dairy & Breakfast",icon:"🧈"},
{id:10,name:"Britannia Good Day",brand:"Britannia",qty:"800 g",price:95,old:110,rating:4.6,category:"Biscuits & Snacks",icon:"🍪"},
{id:11,name:"Thums Up",brand:"Coca-Cola",qty:"750 ml",price:45,old:50,rating:4.5,category:"Beverages",icon:"🥤"},
{id:12,name:"Lifebuoy Handwash",brand:"Lifebuoy",qty:"250 ml",price:85,old:99,rating:4.4,category:"Personal Care",icon:"🧴"}
];
const categoryImages={
"Fruits & Vegetables":"https://images.pexels.com/photos/10521405/pexels-photo-10521405.jpeg?auto=compress&cs=tinysrgb&w=800",
"Rice, Atta & Dal":"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
"Dairy & Breakfast":"https://images.pexels.com/photos/9705818/pexels-photo-9705818.jpeg?auto=compress&cs=tinysrgb&w=800",
"Biscuits & Snacks":"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
"Beverages":"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
"Masala & Spices":"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
"Personal Care":"https://images.pexels.com/photos/9705818/pexels-photo-9705818.jpeg?auto=compress&cs=tinysrgb&w=800",
"Home Essentials":"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800"
};
const categoryData=[
["Fruits & Vegetables","Fresh picks for every meal","80+ products"],
["Rice, Atta & Dal","Kitchen staples","70+ products"],
["Dairy & Breakfast","Fresh everyday starts","45+ products"],
["Biscuits & Snacks","Tea-time favorites","90+ products"],
["Beverages","Drinks for everyone","55+ products"],
["Masala & Spices","Flavor your meals","60+ products"],
["Personal Care","Everyday self-care","75+ products"],
["Home Essentials","Keep home running","80+ products"]
];
let cart=JSON.parse(localStorage.getItem("sharmaPremiumCart")||"[]");
const $=s=>document.querySelector(s), money=n=>"₹"+n.toLocaleString("en-IN");
function renderCategories(){
  $("#categoryGrid").innerHTML=categoryData.map((c,i)=>`<article class="category-card" onclick="filterCategory('${c[0]}')"><div class="cat-img" style="background-image:url('${categoryImages[c[0]]}')"></div><div class="cat-shade"></div><div class="cat-content"><div class="eyebrow" style="color:#e9b46f"><span style="background:#e9b46f"></span>${String(i+1).padStart(2,"0")}</div><h3>${c[0]}</h3><p>${c[1]} • ${c[2]}</p></div></article>`).join("");
  const cats=[...new Set(products.map(p=>p.category))];
  $("#categoryFilter").innerHTML='<option value="all">All categories</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join("");
}
function renderProducts(){
 let list=[...products],q=$("#searchInput").value.toLowerCase(),cat=$("#categoryFilter").value,sort=$("#sortFilter").value;
 if(q)list=list.filter(p=>(p.name+" "+p.brand+" "+p.category).toLowerCase().includes(q));
 if(cat!=="all")list=list.filter(p=>p.category===cat);
 if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card" onclick="openProduct(${p.id})"><div class="product-img">${p.old>p.price?`<b class="discount">SAVE ${Math.round((1-p.price/p.old)*100)}%</b>`:""}<span>${p.icon}</span></div><div class="rating">★ ${p.rating}</div><h3>${p.name}</h3><div class="brand-name">${p.brand}</div><div class="quantity">${p.qty}</div><div class="price-row"><div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div><button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})">ADD +</button></div></article>`).join("");
 $("#emptyState").hidden=!!list.length;
}
function filterCategory(c){$("#categoryFilter").value=c;$("#shop").scrollIntoView({behavior:"smooth"});renderProducts()}
function addToCart(id){const x=cart.find(i=>i.id===id);x?x.count++:cart.push({id,count:1});saveCart();showCart();toast("Added to cart")}
function changeQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.count+=d;if(x.count<=0)cart=cart.filter(i=>i.id!==id);saveCart()}
function saveCart(){localStorage.setItem("sharmaPremiumCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.count,0);$("#cartCount").textContent=count;$("#mobileCartCount").textContent=count;
 $("#cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><div class="cart-thumb">${p.icon}</div><div><h4>${p.name}</h4><small>${money(p.price)} • ${p.qty}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.count}</b><button onclick="changeQty(${p.id},1)">+</button></div></div><b>${money(p.price*x.count)}</b></div>`}).join(""):'<p style="text-align:center;color:#777;margin-top:60px;font-size:12px">Your cart is empty.<br>Add some everyday favorites.</p>';
 const subtotal=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.count,0),delivery=subtotal===0?0:subtotal>=999?0:40,total=subtotal+delivery;
 $("#subtotal").textContent=money(subtotal);$("#delivery").textContent=delivery?money(delivery):"FREE";$("#total").textContent=money(total);
 $("#progressBar").style.width=Math.min(subtotal/999*100,100)+"%";$("#freeText").textContent=subtotal>=999?"🎉 Free delivery unlocked!":`Add ${money(999-subtotal)} more for FREE delivery`;
}
function showCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")}
function openProduct(id){const p=products.find(x=>x.id===id);$("#modalContent").innerHTML=`<div class="modal-product"><div class="product-img">${p.icon}</div><div><div class="eyebrow"><span></span>${p.category}</div><h2 style="font-size:35px;margin:12px 0">${p.name}</h2><p style="color:#777;font-size:12px">${p.brand} • ${p.qty}</p><p style="color:#777;font-size:12px;line-height:1.8">A demo product description for Sharma Stores. Replace this text with your real product information when the store goes live.</p><div class="rating">★ ${p.rating} / 5</div><h3 style="font-size:27px">${money(p.price)} <span class="old">${money(p.old)}</span></h3><button class="btn btn-green" onclick="addToCart(${p.id});productModal.close()">ADD TO CART</button></div></div>`;productModal.showModal()}
function openCheckout(){
 if(!cart.length){toast("Your cart is empty");return} closeCart();
 $("#checkoutContent").innerHTML=`<div class="eyebrow"><span></span> DEMO CHECKOUT</div><h2 style="font-size:38px;margin:12px 0 22px">Complete your order.</h2><form class="checkout-form" id="checkoutForm"><label>Name<input required placeholder="Your name"></label><label>Phone Number<input required type="tel" placeholder="10-digit mobile number"></label><label>Address<textarea required rows="3" placeholder="Delivery address"></textarea></label><label>PIN Code<input required maxlength="6" inputmode="numeric" placeholder="PIN code"></label><label>Payment<select><option>Cash on Delivery</option><option>UPI (Demo)</option></select></label><button class="btn btn-green">CONFIRM ORDER</button><small>This is a portfolio demo. No real payment will be processed.</small></form>`;
 checkoutModal.showModal();$("#checkoutForm").onsubmit=e=>{e.preventDefault();$("#checkoutContent").innerHTML=`<div class="success"><div class="tick">✓</div><div class="eyebrow" style="justify-content:center"><span></span> ORDER RECEIVED! <span></span></div><h2 style="font-size:35px">Thank you for shopping with Sharma Stores.</h2><p style="font-size:12px;color:#777">Your demo order has been received successfully.</p><p style="color:#123d2b;font-weight:900">ORDER #SS1024</p><button class="btn btn-green" onclick="checkoutModal.close()">CONTINUE SHOPPING</button></div>`;cart=[];saveCart()}}
function toast(t){const e=document.createElement("div");e.textContent=t;e.style.cssText="position:fixed;left:50%;bottom:85px;transform:translateX(-50%);z-index:300;background:#123d2b;color:#fff;padding:12px 18px;border-radius:9px;font-size:11px;font-weight:800;box-shadow:0 15px 40px #0003";document.body.appendChild(e);setTimeout(()=>e.remove(),1600)}
$("#searchInput").oninput=renderProducts;$("#categoryFilter").onchange=renderProducts;$("#sortFilter").onchange=renderProducts;
$("#cartOpen").onclick=showCart;$("#mobileCart").onclick=showCart;$("#cartClose").onclick=closeCart;$("#overlay").onclick=closeCart;$("#checkoutBtn").onclick=openCheckout;
$("#hamburger").onclick=()=>$("#mobileMenu").classList.toggle("open");$("#mobileMenuBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");
$("#searchOpen").onclick=()=>{$("#shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("#searchInput").focus(),500)};$("#mobileSearch").onclick=()=>{$("#shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("#searchInput").focus(),500)};
document.querySelectorAll("#mobileMenu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));
$("#pinForm").onsubmit=e=>{e.preventDefault();const pin=$("#pin").value.replace(/\D/g,"");$("#pinResult").textContent=pin.length===6?"✓ Great! Sharma Stores delivers to your area.":"Please enter a valid 6-digit PIN code."};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
window.addEventListener("scroll",()=>$("#nav").classList.toggle("scrolled",scrollY>30));
renderCategories();renderProducts();renderCart();
