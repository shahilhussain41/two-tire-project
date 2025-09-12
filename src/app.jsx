import React from "react";

// Product data array
const products = [
  {
    id: 1,
    name: "Oolong Tea",
    desc: "Oolong tea is a smooth blend of green and black tea flavors .",
    price: "₹349 / 100g",
    image: "/images/olong_tea.jpg",
  },
  {
    id: 2,
    name: "White tea",
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
];

export default function App() {
  // Inject CSS styles on mount (only once)
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
        background: linear-gradient(270deg, #e0f7e9, #f8fff8, #eaf7ff, #f9f0ff);
        background-size: 800% 800%;
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
      nav img { height:100px; }
      .nav-links {
        position:absolute;
        right:40px;
        display:flex;
        gap:20px;
      }
      .nav-links a {
        color:white;
        font-weight:600;
        text-decoration:none;
        transition:0.3s;
      }
      .nav-links a:hover { color:#cdeed1; }

      /* Mobile Navbar */
      @media (max-width:768px) {
        nav { flex-direction:column; justify-content:center; align-items:center; padding:20px; }
        nav img { height:80px; margin-bottom:10px; }
        .nav-links {
          position:static;
          flex-direction:column;
          gap:12px;
          margin-top:10px;
          align-items:center;
        }
        .nav-links a { font-size:18px; }
      }

      /* Hero */
      .hero{ position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; color:white; z-index:1; }
      .hero::before{ 
        content:''; position:absolute; top:0; left:0; width:100%; height:100%;
        background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url("/images/hero.jpg") center/cover no-repeat; 
        z-index:-1;
      }
      .hero h1{ font-size:52px; margin-bottom:20px; text-shadow:0 2px 6px rgba(0,0,0,0.6); }
      .hero p{ font-size:20px; max-width:600px; margin:0 auto; text-shadow:0 1px 4px rgba(0,0,0,0.6); }

      /* Section Headers */
      section h2 {
        text-align:center;
        margin-bottom:20px;
        color:var(--accent);
      }

      /* Products */
      .grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px; margin:40px 0 }
      .card{ background:#fff; border-radius:14px; box-shadow:0 4px 14px rgba(0,0,0,0.1); padding:18px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .card:hover { transform: translateY(-6px); box-shadow:0 10px 20px rgba(0,0,0,0.15); }
      .product .thumb{ 
        width:100%; height:180px; border-radius:10px; margin-bottom:12px; 
        background-size:cover; background-position:center;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }
      .product .thumb:hover { transform: scale(1.05); box-shadow:0 8px 20px rgba(0,0,0,0.2); }
      .price{ font-weight:bold; color:var(--accent); margin:8px 0; }
      button{ background:var(--accent); color:white; padding:10px 16px; border:none; border-radius:8px; cursor:pointer; font-weight:600 }
      button:hover{ background:#094d2f }

      /* About */
      .about { margin:40px 0; }
      .about-content {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:40px;
      }
      .about-image {
        flex:1;
        display:flex;
        justify-content:center;
      }
      .about-image img {
        width:85%;
        max-width:420px;
        border-radius:14px;
        box-shadow:0 6px 18px rgba(0,0,0,0.15);
        padding:0;
        background:none;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }
      .about-image img:hover {
        transform: scale(1.05);
        box-shadow:0 10px 25px rgba(0,0,0,0.25);
      }
      .about-text { flex:2; font-size:18px; line-height:1.6; color:#333; }

      /* Responsive About */
      @media (max-width:768px) {
        .about-content {
          flex-direction:column;
          text-align:center;
        }
        .about-image img {
          width:80%;
          margin-bottom:15px;
        }
      }

      /* Contact */
      form{ display:flex; flex-direction:column; gap:10px; margin-top:20px }
      input, textarea{ padding:12px; border-radius:8px; border:1px solid #ccc }
      footer{ margin-top:40px; padding:20px; text-align:center; color:var(--muted) }
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome to Everleaf Tea</h1>
          <p>
            Handpicked leaves, blended with love. Experience teas that bring
            comfort, energy, and joy to your every day.
          </p>
          <button
            style={{
              marginTop: "28px",
              background: "var(--accent)",
              color: "white",
              padding: "12px 28px",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "18px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            onClick={() => {
              const el = document.getElementById("products");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Browse Our Products
          </button>
        </div>
      </section>

      <div className="container">
        {/* Products Section */}
        <section id="products">
          <h2>Our Products </h2>
          <div className="grid">
            {products.map((p) => (
              <div key={p.id} className="card product">
                <div
                  className="thumb"
                  style={{
                    background: `url(${p.image}) center/cover no-repeat`,
                  }}
                ></div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <p className="price">{p.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-image">
              <img src="/images/about.jpg" alt="About Everleaf Tea" />
            </div>
            <div className="about-text">
              <p>
                🌱 Started by passionate tea lovers in the lush valleys of Assam, Everleaf was born out of a simple belief
                 — that every cup of tea should tell a story. We carefully curate small-batch teas sourced from trusted gardens, 
                    where tradition and nature come together in harmony. Each leaf is chosen not only for its flavour and freshness,
                    but also for its provenance, ensuring you taste the essence of the land with every sip.
                    Whether you crave the bold depth of black tea, the gentle calm of green tea, or the nuanced character of rare blends, 
                    
                    Everleaf has something crafted just for you.
                Our mission is to celebrate tea as more than a beverage — it’s a ritual of comfort, connection, and care. 
                From the first pour to the last sip, we invite you to discover a cup that speaks to your soul.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2>Contact Us</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! This is a demo. Replace with your backend/email.");
            }}
          >
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows="4"></textarea>
            <button type="submit">Send</button>
          </form>
        </section>

        {/* Footer */}
        <footer>
          <p>© {new Date().getFullYear()} Everleaf Tea · Crafted with Care 🌱</p>
        </footer>
      </div>
    </>
  );
}
