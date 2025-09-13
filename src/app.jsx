import React, { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Oolong Tea",
    desc: "Oolong tea is a smooth blend of green and black tea flavors.",
    price: "₹349 / 100g",
    image: "/images/olong_tea.jpg",
  },
  {
    id: 2,
    name: "White Tea",
    desc: "White tea is a delicate brew with a light, floral flavor and subtle sweetness.",
    price: "₹399 / 50g",
    image: "/images/white_tea.jpg",
  },
  {
    id: 3,
    name: "Masala Chai Roast",
    desc: "Robust black tea blended with warming spices — perfect with milk and honey.",
    price: "₹199 / 100g",
    image: "/images/Masala_Chai_Roast_tea.jpg",
  },
  {
    id: 4,
    name: "Green Tea Classic",
    desc: "Refreshing green tea rich in antioxidants, perfect for daily wellness.",
    price: "₹299 / 100g",
    image: "/images/green_tea.jpg",
  },
  {
    id: 5,
    name: "Chamomile Herbal Tea",
    desc: "Caffeine-free, calming chamomile infusion to relax your mind and body.",
    price: "₹249 / 50g",
    image: "/images/chamomile_tea.jpg",
  },
  {
    id: 6,
    name: "Earl Grey Premium",
    desc: "Classic black tea infused with bergamot for a fragrant, citrusy twist.",
    price: "₹349 / 100g",
    image: "/images/earl_grey.jpg",
  },
];

export default function App() {
  const sliderRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth",
      });
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  React.useEffect(() => {
    if (document.getElementById("everleaf-styles")) return;
    const style = document.createElement("style");
    style.id = "everleaf-styles";
    style.innerHTML = `
      :root { --accent:#0B6A3F; --muted:#6b776b; --bg:#fbfdfb }
      *{ box-sizing:border-box; margin:0; padding:0; }

      body,html,#root{ 
        height:100%; 
        font-family: Arial, sans-serif; 
        background: linear-gradient(270deg, rgba(224,247,233,0.4), rgba(132,172,132,0.4), rgba(164,224,139,0.4), rgba(123,254,217,0.4)), url('/images/pattern.jpg') center/cover no-repeat;
        background-attachment: fixed;
        animation: gradientBG 18s ease infinite;
        scroll-behavior: smooth; 
      }

      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .container{ max-width:1100px; margin:0 auto; padding:28px }

      /* Navbar */
      nav {
        position:absolute;
        top:20px;
        left:0;
        right:0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0 40px;
        z-index:10;
        flex-wrap:wrap;
      }
      nav img { height:150px; } /* Bigger Logo */
      .nav-links {
        position:absolute;
        right:40px;
        display:flex;
        gap:20px;
        align-items:center;
      }
      .nav-links a { color:white; font-weight:600; text-decoration:none; transition:0.3s; }
      .nav-links a:hover { color:#cdeed1; }

      .cart-btn {
        position:relative;
        background:white;
        color:var(--accent);
        border:none;
        border-radius:50%;
        width:45px;
        height:45px;
        font-size:22px;
        cursor:pointer;
        box-shadow:0 4px 10px rgba(0,0,0,0.2);
        transition:0.3s;
      }
      .cart-btn:hover { background:var(--accent); color:white; }
      .cart-count {
        position:absolute;
        top:0;
        right:0;
        background:red;
        color:white;
        font-size:12px;
        font-weight:bold;
        border-radius:50%;
        width:20px;
        height:20px;
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .cart-dropdown {
        position:absolute;
        top:70px;
        right:40px;
        background:white;
        width:300px;
        max-height:400px;
        overflow-y:auto;
        border-radius:10px;
        box-shadow:0 8px 20px rgba(0,0,0,0.2);
        padding:15px;
        z-index:20;
        animation:fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity:0; transform:translateY(-10px); }
        to { opacity:1; transform:translateY(0); }
      }
      .cart-item {
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:12px;
        border-bottom:1px solid #eee;
        padding-bottom:8px;
      }
      .cart-item img {
        width:50px;
        height:50px;
        border-radius:8px;
        object-fit:cover;
        margin-right:10px;
      }
      .cart-item-info { flex:1; font-size:14px; }
      .remove-btn {
        background:red;
        color:white;
        border:none;
        border-radius:6px;
        padding:4px 8px;
        cursor:pointer;
      }

      /* Hero */
      .hero{ 
        position:relative; 
        min-height:60vh;  
        display:flex; 
        align-items:center; 
        justify-content:center; 
        text-align:center; 
        color:white; 
        z-index:1; 
      }
      .hero::before{ 
        content:''; 
        position:absolute; 
        top:0; left:0; 
        width:100%; height:100%;
        background: linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.15)), 
                    url("/images/hero.jpg") left bottom/cover no-repeat; 
        z-index:-1;
      }
      .hero h1{ font-size:42px; margin-bottom:16px; text-shadow:0 2px 6px rgba(0,0,0,0.6); }
      .hero p{ font-size:18px; max-width:600px; margin:0 auto; text-shadow:0 1px 4px rgba(0,0,0,0.6); }

      @media (max-width: 768px) {
        .hero::before {
          background-position: center top; 
        }
      }

      section h2 { text-align:center; margin-bottom:20px; color:var(--accent); }

      /* Product Slider */
      .slider-wrapper { position: relative; margin-top:20px; }
      .scroll-container {
        display:flex;
        overflow-x:auto;
        scroll-behavior: smooth;
        gap:20px;
        padding:20px 0;
      }
      .scroll-container::-webkit-scrollbar { height:12px; }
      .scroll-container::-webkit-scrollbar-track { background:#e6f3ec; border-radius:10px; }
      .scroll-container::-webkit-scrollbar-thumb { background:var(--accent); border-radius:10px; border:2px solid #e6f3ec; }
      .card{ flex:0 0 calc(33.333% - 20px); background:#fff; border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.1); padding:18px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .card:hover { transform: translateY(-6px); box-shadow:0 10px 20px rgba(0,0,0,0.15); }
      .product .thumb{ width:100%; height:180px; border-radius:10px; margin-bottom:12px; background-size:cover; background-position:center; }
      .price{ font-weight:bold; color:var(--accent); margin:8px 0; }
      button{ background:var(--accent); color:white; padding:10px 16px; border:none; border-radius:8px; cursor:pointer; font-weight:600 }
      button:hover{ background:#094d2f }

      .arrow { position:absolute; top:40%; transform:translateY(-50%); background:white; border:none; border-radius:50%; width:45px; height:45px; box-shadow:0 4px 10px rgba(0,0,0,0.2); cursor:pointer; font-size:20px; font-weight:bold; color:var(--accent); transition:0.3s; z-index:5; }
      .arrow:hover { background:var(--accent); color:white; }
      .arrow.left { left:-20px; }
      .arrow.right { right:-20px; }

      .about { margin:40px 0; }
      .about-content { display:flex; align-items:center; justify-content:center; gap:40px; flex-wrap:wrap; }
      .about-image { flex:1; display:flex; justify-content:center; }
      .about-image img { 
        width:95%; 
        max-width:520px; 
        border-radius:14px; 
        box-shadow:0 6px 18px rgba(0,0,0,0.15); 
        transition: transform 0.4s ease, box-shadow 0.4s ease; 
      }
      .about-image img:hover { transform: scale(1.05); box-shadow:0 10px 25px rgba(0,0,0,0.25); }
      .about-text { flex:2; font-size:18px; line-height:1.6; color:#333; }

      @media (max-width: 768px) {
        .about-image img {
          width:100%;
          max-width:100%;
        }
      }

      form{ display:flex; flex-direction:column; gap:10px; margin-top:20px }
      input, textarea{ padding:12px; border-radius:8px; border:1px solid #ccc }

      footer{ margin-top:40px; padding:20px; text-align:center; color:var(--muted); background:#f8f8f8; }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav>
        <img src="/images/logo.png" alt="Everleaf Tea Logo" />
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
          {showCart && (
            <div className="cart-dropdown">
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <p>{item.price}</p>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div>
          <h1>Welcome to Everleaf Tea</h1>
          <p>
            Handpicked leaves, blended with love. Experience teas that bring
            comfort, energy, and joy to your every day.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Products */}
        <section id="products">
          <h2>Our Products</h2>
          <div className="slider-wrapper">
            <button className="arrow left" onClick={() => scroll("left")}>
              ❮
            </button>
            <div className="scroll-container" ref={sliderRef}>
              {products.map((p) => (
                <div key={p.id} className="card product">
                  <div className="thumb" style={{ background: `url(${p.image}) center/cover no-repeat` }} />
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <p className="price">{p.price}</p>
                  <button onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              ))}
            </div>
            <button className="arrow right" onClick={() => scroll("right")}>
              ❯
            </button>
          </div>
        </section>

        {/* About */}
        <section id="about" className="about">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-image">
              <img src="/images/about.jpg" alt="About Everleaf Tea" />
            </div>
            <div className="about-text">
              <p>
                🌱 Started by passionate tea lovers in the lush valleys of Assam,
                Everleaf was born out of a simple belief — that every cup of tea
                should tell a story. We carefully curate small-batch teas sourced
                from trusted gardens, where tradition and nature come together in
                harmony.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2>Contact Us</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for contacting us! This is a demo form.");
            }}
          >
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows="4"></textarea>
            <button type="submit">Send</button>
          </form>

          <div style={{ marginTop: "20px", fontSize: "16px", color: "#333" }}>
            <p><strong>Email:</strong> support@everleaftea.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Everleaf Tea Co., Assam, India</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Everleaf Tea · Crafted with Care 🌱</p>
      </footer>
    </>
  );
}
