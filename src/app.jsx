import React, { useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Product data
const products = [
  { id: 1, name: "Oolong Tea", desc: "Oolong tea is a smooth blend of green and black tea flavors.", price: "₹349 / 100g", priceNum: 349, image: "/images/olong_tea.jpg" },
  { id: 2, name: "White Tea", desc: "White tea is a delicate brew with a light, floral flavor and subtle sweetness.", price: "₹399 / 50g", priceNum: 399, image: "/images/white_tea.jpg" },
  { id: 3, name: "Masala Chai Roast", desc: "Robust black tea blended with warming spices — perfect with milk and honey.", price: "₹199 / 100g", priceNum: 199, image: "/images/Masala_Chai_Roast_tea.jpg" },
  { id: 4, name: "Green Tea Classic", desc: "Refreshing green tea rich in antioxidants, perfect for daily wellness.", price: "₹299 / 100g", priceNum: 299, image: "/images/green_tea.jpg" },
  { id: 5, name: "Chamomile Herbal Tea", desc: "Caffeine-free, calming chamomile infusion to relax your mind and body.", price: "₹249 / 50g", priceNum: 249, image: "/images/chamomile_tea.jpg" },
  { id: 6, name: "Earl Grey Premium", desc: "Classic black tea infused with bergamot for a fragrant, citrusy twist.", price: "₹349 / 100g", priceNum: 349, image: "/images/earl_grey.jpg" },
];

// Scroll animation hook
function useScrollAnimation(selector) {
  React.useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.setProperty("--delay", `${index * 0.15}s`);
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}

export default function App() {
  const sliderRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Scroll animations for sections
  useScrollAnimation(".product");
  useScrollAnimation(".about");
  useScrollAnimation(".contact");

  // Add product to cart
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

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Product slider scroll
  const scroll = (direction) => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -width : width,
        behavior: "smooth",
      });
    }
  };

  // Inject styles once
  React.useEffect(() => {
    if (document.getElementById("everleaf-styles")) return;
    const style = document.createElement("style");
    style.id = "everleaf-styles";
    style.innerHTML = `
      :root { --accent:#0B6A3F; --muted:#6b776b; --bg:#fbfdfb }
      *{ box-sizing:border-box; margin:0; padding:0; }
      body,html,#root {
        height: 100%;
        font-family: Arial, sans-serif;
        background: linear-gradient(
            270deg,
            rgba(230, 248, 237, 0.85),
            rgba(187, 187, 184, 0.85),
            rgba(157, 212, 133, 0.85),
            rgba(141, 246, 214, 0.8)
          ),
          url('/images/pattern.jpg') center/cover no-repeat;
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
      nav { position:absolute; top:20px; left:0; right:0; display:flex; align-items:center; justify-content:center; padding:0 40px; z-index:10; flex-wrap:wrap; }
      nav img { height:120px; margin-top: -20px; }
      .nav-links { position:absolute; right:40px; display:flex; gap:20px; align-items:center; }
      .nav-links a { color:white; font-weight:600; text-decoration:none; transition:0.3s; }
      .nav-links a:hover { color:#cdeed1; }
      .cart-btn { position:relative; background:white; color:var(--accent); border:none; border-radius:50%; width:45px; height:45px; font-size:22px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.2); transition:0.3s; }
      .cart-btn:hover { background:var(--accent); color:white; }
      .cart-count { position:absolute; top:0; right:0; background:red; color:white; font-size:12px; font-weight:bold; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; }
      .hero { position:relative; min-height:60vh; display:flex; align-items:center; justify-content:center; text-align:center; color:white; z-index:1; }
      .hero::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:url("/images/hero.jpg") center/cover no-repeat; filter:brightness(0.5); z-index:-1; }
      .hero h1{ font-size:42px; margin-bottom:16px; opacity:0; transform:translateY(-20px); animation:fadeSlideDown 1.2s ease forwards; }
      .hero p{ font-size:18px; max-width:600px; margin:0 auto; opacity:0; transform:translateY(20px); animation:fadeSlideUp 1.2s ease 0.3s forwards; }
      section h2 { text-align:center; margin-bottom:20px; color:var(--accent); }
      .slider-wrapper { position:relative; margin-top:20px; }
      .scroll-container { display:flex; overflow-x:auto; gap:20px; padding:20px 0; scroll-behavior:smooth; }
      .product { flex:0 0 calc(33.333% - 20px); background:#fff; border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.1); padding:18px; transition:opacity 0.8s ease, transform 0.8s ease; opacity:0; transform:scale(0.9) translateY(30px); transition-delay:var(--delay,0s); }
      .product.visible { opacity:1; transform:scale(1) translateY(0); }
      .product .thumb { width:100%; height:180px; border-radius:10px; margin-bottom:12px; background-size:cover; background-position:center; }
      .price{ font-weight:bold; color:var(--accent); margin:8px 0; }
      button{ background:var(--accent); color:white; padding:10px 16px; border:none; border-radius:8px; cursor:pointer; font-weight:600; transition:transform 0.2s ease; }
      button:hover{ background:#094d2f; transform:scale(1.07); }
      .arrow { position:absolute; top:40%; background:white; border:none; border-radius:50%; width:45px; height:45px; box-shadow:0 4px 10px rgba(0,0,0,0.2); cursor:pointer; font-size:20px; color:var(--accent); z-index:5; }
      .arrow.left { left:-20px; }
      .arrow.right { right:-20px; }
      .about { margin: 60px 0; padding: 60px 20px; background: linear-gradient(135deg, #f1fdf4, #e8f8ec); border-radius: 14px; }
      .about-content { display:flex; align-items:center; gap:40px; flex-wrap:wrap; }
      .about-image, .about-text { opacity: 0; transform: translateY(30px); transition: opacity 0.9s ease, transform 0.9s ease; }
      .about.visible .about-image { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
      .about.visible .about-text { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }
      .about-image img { width:90%; max-width:480px; border-radius:14px; box-shadow:0 6px 18px rgba(0,0,0,0.15); }
      .about-text { flex:2; font-size:18px; line-height:1.6; color:#333; }
      .about-text p { margin-bottom:15px; }
      .contact { margin: 60px 0; padding: 60px 20px; background: linear-gradient(135deg, #f8fdfc, #e6f4f1); border-radius: 14px; text-align: center; opacity:0; transform:translateY(40px); transition:opacity 0.9s ease, transform 0.9s ease; }
      .contact.visible { opacity:1; transform:translateY(0); }
      .contact form, .contact-info { opacity:0; transform:translateY(30px); transition:opacity 0.9s ease, transform 0.9s ease; }
      .contact.visible form { opacity:1; transform:translateY(0); transition-delay:0.2s; }
      .contact.visible .contact-info { opacity:1; transform:translateY(0); transition-delay:0.5s; }
      .contact form { max-width:500px; margin:20px auto; display:flex; flex-direction:column; gap:12px; }
      .contact input, .contact textarea { width:100%; padding:14px; border-radius:8px; border:1px solid #ccc; font-size:16px; }
      .contact button { margin-top:10px; }
      .contact-info { margin-top:25px; font-size:16px; color:#333; line-height:1.6; }
      @media (max-width:768px) {
        .about-content { flex-direction:column; text-align:center; }
        .about-text { font-size:16px; }
      }
      .footer { background: #072d0aff; color: #f5f5f5; margin-top: 60px; }
      .newsletter { background: #05390eff; text-align: center; padding: 30px 20px; border-radius: 0 0 20px 20px; }
      .newsletter h3 { font-size: 22px; margin-bottom: 10px; }
      .newsletter p { margin-bottom: 15px; }
      .newsletter-form { display: flex; justify-content: center; align-items: center; max-width: 500px; margin: 0 auto; border-radius: 50px; overflow: hidden; background: #fff; }
      .newsletter-form input { flex: 1; padding: 14px 18px; border: none; font-size: 16px; outline: none; }
      .newsletter-form button { padding: 14px 24px; border: none; background: #0dff76ff; color: #fff; font-weight: bold; cursor: pointer; transition: all 0.3s ease; font-size: 16px; }
      .newsletter-form button:hover { background: #0b571aff; }
      .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; padding: 40px 20px; }
      .footer-col h4 { margin-bottom: 12px; font-size: 18px; color: #f8d7ba; }
      .footer-col a { display: block; color: #ccc; text-decoration: none; margin: 6px 0; transition: 0.3s; }
      .footer-col a:hover { color: #fff; }
      .socials { display: flex; gap: 12px; margin-top: 12px; }
      .socials a { color: #fff; font-size: 18px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #51d32aff; transition: all 0.3s ease; }
      .socials a:hover { background: #1df809ff; transform: scale(1.1); }
      .footer-bottom { text-align: center; padding: 15px; background: #051c0fff; font-size: 14px; color: #bbb; }
      .cart-sidebar { position:fixed; top:0; right:-400px; width:350px; height:100%; background:#fff; box-shadow:-4px 0 12px rgba(0,0,0,0.2); display:flex; flex-direction:column; transition:right 0.4s ease; z-index:30; }
      .cart-sidebar.open { right:0; }
      .cart-items { flex:1; overflow-y:auto; padding-right:5px; }
      .cart-item { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:8px; }
      .cart-item img { width:50px; height:50px; border-radius:8px; object-fit:cover; margin-right:10px; }
      .cart-item-info { flex:1; font-size:14px; }
      .remove-btn { background:red; color:white; border:none; border-radius:6px; padding:4px 8px; cursor:pointer; }
      .qty-controls { display:flex; align-items:center; gap:8px; margin-top:5px; }
      .qty-controls button { background:var(--accent); color:white; border:none; border-radius:6px; width:28px; height:28px; cursor:pointer; font-size:18px; font-weight:bold; transition:background 0.3s; }
      .qty-controls button:hover { background:#094d2f; }
      .qty-controls span { min-width:24px; text-align:center; font-weight:bold; }
      .cart-footer { border-top:1px solid #eee; padding:12px; background:#fafafa; position:sticky; bottom:0; }
      .cart-total { font-size:16px; margin-bottom:10px; color:#333; }
      .checkout-btn { background:var(--accent); color:white; padding:12px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; transition:0.3s; width:100%; }
      .checkout-btn:hover { background:#094d2f; }
      .backdrop { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.45); z-index:25; opacity:0; animation:fadeIn 0.3s forwards; }
      .checkout-page { max-width:700px; margin:80px auto; padding:20px; background:white; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.1); text-align:center; }
      .checkout-page h1 { color:var(--accent); margin-bottom:20px; }
      @keyframes fadeSlideDown { from{opacity:0; transform:translateY(-20px);} to{opacity:1; transform:translateY(0);} }
      @keyframes fadeSlideUp { from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }
      @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
    `;
    document.head.appendChild(style);
  }, []);

  // Cart total calculation
  const total = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);
  const formattedTotal = new Intl.NumberFormat("en-IN").format(total);

  return (
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
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
              </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
              <div>
                <h1>Welcome to Everleaf Tea</h1>
                <p>Handpicked leaves, blended with love. Discover teas that bring comfort, energy, and joy.</p>
              </div>
            </section>

            {/* Products Section */}
            <div className="container">
              <section id="products">
                <h2>Our Products</h2>
                <div className="slider-wrapper">
                  <button className="arrow left" onClick={() => scroll("left")}>❮</button>
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
                  <button className="arrow right" onClick={() => scroll("right")}>❯</button>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="about" ref={aboutRef}>
                <h2>About Us</h2>
                <div className="about-content">
                  <div className="about-image">
                    <img src="/images/about.jpg" alt="About Everleaf Tea" />
                  </div>
                  <div className="about-text">
                    <p>Started by passionate tea lovers in Assam, Everleaf was born out of the belief that every cup of tea should tell a story...</p>
                    <p>Whether you crave the bold depth of black tea, the gentle calm of green tea, or the nuanced character of rare blends, Everleaf has something crafted just for you.</p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" ref={contactRef} className="contact">
                <h2>Contact Us</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                  <input type="text" placeholder="Your name" required />
                  <input type="email" placeholder="Your email" required />
                  <textarea placeholder="Your message" rows="4"></textarea>
                  <button type="submit">Send</button>
                </form>
               
              </section>
            </div>

            {/* Footer */}
            <footer className="footer">
              {/* Newsletter */}
              <div className="newsletter">
                <h3>Let’s get in touch</h3>
                <p>Sign up for our newsletter and receive <strong>10% off</strong> your order</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button>Know More</button>
                </div>
              </div>
              {/* Footer Content */}
              <div className="footer-content">
                <div className="footer-col">
                  <img src="/images/logo.png" alt="Everleaf Tea Logo" style={{ height: "60px", marginBottom: "15px" }} />
                  <p>Everleaf Tea · Crafted with Care 🌱</p>
                </div>
                <div className="footer-col">
                  <h4>Contact Information</h4>
                  <p>📞 +91 9101144633</p>
                  <p>✉️ everleaf@gmail.com</p>
                  <p>📍 Assam, India</p>
                </div>
                <div className="footer-col">
                  <h4>Important Links</h4>
                  <a href="#products">Our Products</a>
                  <a href="#about">About Us</a>
                  <a href="#contact">Contact</a>
                  <a href="/terms">Terms of Service</a>
                </div>
                <div className="footer-col">
                  <h4>Information</h4>
                  <a href="/shipping">Shipping & Delivery</a>
                  <a href="/returns">Return & Exchange</a>
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/faq">FAQs</a>
                </div>
              </div>
              {/* Bottom Bar */}
              <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Everleaf Tea. All rights reserved.</p>
              </div>
            </footer>

            {/* Cart Backdrop */}
            {showCart && <div className="backdrop" onClick={() => setShowCart(false)}></div>}

            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
              <h3>Your Cart</h3>
              <div className="cart-items">
                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <p>{item.price}</p>
                        <div className="qty-controls">
                          <button onClick={() => decreaseQty(item.id)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => increaseQty(item.id)}>+</button>
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="cart-footer">
                  <p className="cart-total"><strong>Total:</strong> ₹{formattedTotal}</p>
                  <button className="checkout-btn" onClick={() => navigate("/checkout")}>Checkout</button>
                </div>
              )}
            </div>
          </>
        }
      />

      {/* Checkout Page */}
      <Route
        path="/checkout"
        element={
          <div className="checkout-page">
            <h1>Checkout</h1>
            <p>Review your order and enter payment details here.</p>
            <button onClick={() => navigate("/")}>← Back to Shop</button>
          </div>
        }
      />
    </Routes>
  );
}
