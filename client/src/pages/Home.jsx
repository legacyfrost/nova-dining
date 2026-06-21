import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

// ========================================================
// EXCLUSIVE SVGS (Minimalist Luxury)
// ========================================================
const WineIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1">
    <path d="M8 22H16M12 15V22M12 15C16.4183 15 20 11.4183 20 7V2H4V7C4 11.4183 7.58172 15 12 15Z" />
    <path d="M4 7H20" />
  </svg>
);

const EstateIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1">
    <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V11H15V21" />
  </svg>
);

const GoldStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1">
    <path d="M12 2L15 9L22 10L17 15L18.5 22L12 18L5.5 22L7 15L2 10L9 9L12 2Z" />
  </svg>
);

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 }); 

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="rich-page">
      <style>
        {`
         
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@200;300;400;500&display=swap');

          :root {
            --obsidian: #030303;       /* Pure void */
            --charcoal: #0a0a0a;       /* Slightly lighter for contrast panels */
            --gold: #D4AF37;           /* True Champagne Gold */
            --gold-dim: rgba(212, 175, 55, 0.3);
            --pearl: #FDFBF7;          /* Soft, expensive white */
            --text-muted: #A8A29E;
          }

          * {
            box-sizing: border-box;
            scroll-behavior: smooth;
          }

          ::selection {
            background: var(--gold);
            color: var(--obsidian);
          }

          .rich-page {
            background-color: var(--obsidian);
            color: var(--pearl);
            font-family: 'Montserrat', sans-serif;
            width: 100%;
            overflow-x: hidden;
            position: relative;
          }

          /* Cinematic Film Grain Overlay */
          .rich-page::before {
            content: "";
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 9999;
          }

      
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .delay-1 { transition-delay: 0.1s; }
          .delay-2 { transition-delay: 0.2s; }
          .delay-3 { transition-delay: 0.3s; }
          .delay-4 { transition-delay: 0.4s; }

          .serif-title {
            font-family: 'Cinzel', serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .micro-label {
            font-size: 0.7rem;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: var(--gold);
            display: block;
            margin-bottom: 15px;
          }

          .hero-sect {
            height: 100vh;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          .hero-bg {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000');
            background-size: cover;
            background-position: center;
            filter: brightness(0.5) contrast(1.2);
            animation: slowZoom 30s infinite alternate ease-in-out;
            z-index: 0;
          }

          .hero-overlay-box {
            position: relative;
            z-index: 2;
            background: rgba(5, 5, 5, 0.4);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            padding: 80px 60px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            max-width: 900px;
            text-align: center;
            box-shadow: 0 30px 60px rgba(0,0,0,0.8);
            animation: heroFadeUp 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .hero-title-main {
            font-size: clamp(4rem, 8vw, 6rem);
            color: var(--gold);
            margin-bottom: 10px;
            text-shadow: 0 10px 30px rgba(0,0,0,0.9);
            line-height: 1;
          }

          .hero-subtitle-main {
            font-size: clamp(1.2rem, 3vw, 2rem);
            font-weight: 300;
            letter-spacing: 0.2em;
            margin-bottom: 30px;
          }

          .hero-text-main {
            font-size: 1.1rem;
            line-height: 1.9;
            color: var(--text-muted);
            max-width: 600px;
            margin: 0 auto;
            font-weight: 300;
          }

          /* Buttons */
          .btn-container {
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn-gold, .btn-glass {
            display: inline-block;
            padding: 18px 45px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            text-decoration: none;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .btn-gold {
            background: var(--gold);
            color: var(--obsidian);
            border: 1px solid var(--gold);
          }

          .btn-gold:hover {
            background: transparent;
            color: var(--gold);
            box-shadow: 0 0 30px var(--gold-dim);
          }

          .btn-glass {
            background: rgba(255, 255, 255, 0.03);
            color: var(--pearl);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
          }

          .btn-glass:hover {
            background: var(--pearl);
            color: var(--obsidian);
          }

          .content-sect {
            padding: 150px 5vw;
          }

          .bg-charcoal {
            background-color: var(--charcoal);
            border-top: 1px solid rgba(255,255,255,0.03);
            border-bottom: 1px solid rgba(255,255,255,0.03);
          }

          .sect-header {
            text-align: center;
            margin-bottom: 100px;
          }

          .sect-title {
            font-size: clamp(3rem, 5vw, 4.5rem);
            color: var(--gold);
            margin: 0;
          }

          
          .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
            max-width: 1400px;
            margin: 0 auto;
          }

          .feature-card {
            padding: 60px 40px;
            background: linear-gradient(145deg, rgba(20,20,20,0.6) 0%, rgba(5,5,5,0.8) 100%);
            border: 1px solid rgba(212,175,55,0.1);
            text-align: center;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s ease;
          }

          .feature-card:hover {
            transform: translateY(-15px);
            border-color: var(--gold);
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          }

          .feature-title {
            font-size: 1.6rem;
            margin: 25px 0 15px;
            color: var(--pearl);
          }

          .feature-text {
            color: var(--text-muted);
            line-height: 1.9;
            font-size: 0.95rem;
            font-weight: 300;
          }

          .special-card {
            background: var(--obsidian);
            border: 1px solid rgba(255,255,255,0.05);
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .special-card:hover {
            border-color: rgba(212,175,55,0.4);
            box-shadow: 0 30px 60px rgba(0,0,0,0.7);
            transform: translateY(-10px);
          }

          .img-wrapper {
            width: 100%;
            height: 350px;
            overflow: hidden;
            position: relative;
          }

          .special-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(30%) contrast(1.1);
            transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1), filter 2s ease;
          }

          .special-card:hover .special-img {
            transform: scale(1.1);
            filter: grayscale(0%) contrast(1.1);
          }

          .special-info {
            padding: 40px 30px;
            text-align: center;
          }

          .special-title {
            font-size: 2rem;
            margin-bottom: 15px;
            color: var(--pearl);
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 1600px;
            margin: 0 auto;
          }

          .gallery-img-container {
            overflow: hidden;
            position: relative;
            border-radius: 2px;
          }

          .gallery-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.7) grayscale(20%);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .gallery-img-container:hover .gallery-img {
            filter: brightness(1.1) grayscale(0%);
            transform: scale(1.05);
          }

          /* Aspect ratios for dynamic feel */
          .aspect-tall { aspect-ratio: 3/4; }
          .aspect-wide { aspect-ratio: 16/9; }
          .aspect-square { aspect-ratio: 1/1; }

          .review-card {
            padding: 50px 40px;
            background: transparent;
            border-top: 1px solid rgba(212,175,55,0.3);
            text-align: center;
            transition: border-color 0.5s ease;
          }

          .review-card:hover {
            border-color: var(--gold);
          }

          .stars {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 30px;
          }

          .review-text {
            font-size: 1.2rem;
            font-style: italic;
            color: var(--text-muted);
            line-height: 1.9;
            font-weight: 300;
          }

          .cta-sect {
            padding: 200px 5vw;
            text-align: center;
            background: radial-gradient(circle at center, #111 0%, #030303 100%);
            position: relative;
            overflow: hidden;
          }

         
          @keyframes slowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
          @keyframes heroFadeUp {
            0% { opacity: 0; transform: translateY(60px); filter: blur(10px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }

          /* Breakpoints */
          @media (max-width: 1024px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .aspect-wide, .aspect-tall, .aspect-square { aspect-ratio: 4/3; }
          }
          @media (max-width: 768px) {
            .hero-overlay-box { padding: 40px 20px; border-width: 0; }
            .content-sect { padding: 100px 5vw; }
            .gallery-grid { grid-template-columns: 1fr; }
            .grid-3 { grid-template-columns: 1fr; }
          }
        `}
      </style>

      <section className="hero-sect">
        <div className="hero-bg"></div>
        <div className="hero-overlay-box">
          <h1 className="serif-title hero-title-main">NOVA DINING</h1>
          <h2 className="serif-title hero-subtitle-main">Luxury Restaurant Experience</h2>
          <p className="hero-text-main">
            Where world-class cuisine meets unforgettable moments. Reserve your perfect table and enjoy a premium dining experience engineered for the absolute elite.
          </p>
          <div className="btn-container">
            <Link to="/book" className="btn-gold">Reserve A Table</Link>
          
          </div>
        </div>
      </section>

      {/* ----------------- FEATURES ----------------- */}
      <section className="content-sect">
        <div className="sect-header reveal">
          <span className="micro-label">The Standard</span>
          <h1 className="serif-title sect-title">Why Choose Us</h1>
        </div>

        <div className="grid-3">
          <div className="feature-card reveal delay-1">
            <WineIcon />
            <h2 className="serif-title feature-title">Premium Dining</h2>
            <p className="feature-text">Curated menus crafted by world-class, Michelin-trained chefs. Ingredients sourced globally, delivered daily.</p>
          </div>
          <div className="feature-card reveal delay-2">
            <EstateIcon />
            <h2 className="serif-title feature-title">Luxury Atmosphere</h2>
            <p className="feature-text">Elegant spaces designed by renowned architects for unforgettable, heavily guarded, confidential evenings.</p>
          </div>
          <div className="feature-card reveal delay-3">
            <div className="stars" style={{ marginBottom: "0" }}>
              <GoldStar />
            </div>
            <h2 className="serif-title feature-title">5 Star Service</h2>
            <p className="feature-text">Exceptional, anticipatory hospitality. Our staff reads your desires before you even articulate them.</p>
          </div>
        </div>
      </section>

      {/* ----------------- SPECIALS ----------------- */}
      <section className="content-sect bg-charcoal">
        <div className="sect-header reveal">
          <span className="micro-label">The Collection</span>
          <h1 className="serif-title sect-title">Featured Experience</h1>
        </div>

        <div className="grid-3">
          <div className="special-card reveal delay-1">
            <div className="img-wrapper">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000" className="special-img" alt="Steak" />
            </div>
            <div className="special-info">
              <h2 className="serif-title special-title">Premium Steak</h2>
              <p className="feature-text">Hand-selected A5 Wagyu cuts, dry-aged in Himalayan salt and grilled to absolute perfection over binchotan charcoal.</p>
            </div>
          </div>

          <div className="special-card reveal delay-2">
            <div className="img-wrapper">
              <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000" className="special-img" alt="Pasta" />
            </div>
            <div className="special-info">
              <h2 className="serif-title special-title">Luxury Pasta</h2>
              <p className="feature-text">Authentic Italian recipes infused with modern elegance, generously topped with rare Alba white truffles.</p>
            </div>
          </div>

          <div className="special-card reveal delay-3">
            <div className="img-wrapper">
              <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1000" className="special-img" alt="Desserts" />
            </div>
            <div className="special-info">
              <h2 className="serif-title special-title">Signature Desserts</h2>
              <p className="feature-text">Masterpieces crafted by award-winning pastry chefs, featuring edible 24k gold leaf and pure Madagascar vanilla.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- EXPANDED GALLERY ----------------- */}
      <section className="content-sect">
        <div className="sect-header reveal">
          <span className="micro-label">The Architecture</span>
          <h1 className="serif-title sect-title">Restaurant Gallery</h1>
          <p className="feature-text" style={{ maxWidth: "600px", margin: "20px auto 0" }}>
            A visual symphony of our private sanctuaries, culinary artistry, and subterranean cellars.
          </p>
        </div>

        <div className="gallery-grid">
          {/* Row 1 */}
          <div className="gallery-img-container aspect-square reveal delay-1">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200" className="gallery-img" alt="Atmosphere" />
          </div>
          <div className="gallery-img-container aspect-tall reveal delay-2">
            <img src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1200" className="gallery-img" alt="Chef Plating" />
          </div>
          <div className="gallery-img-container aspect-square reveal delay-3">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200" className="gallery-img" alt="Architecture" />
          </div>
          
          {/* Row 2 */}
          <div className="gallery-img-container aspect-tall reveal delay-1">
            <img src="https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=1200" className="gallery-img" alt="Wine Pouring" />
          </div>
          <div className="gallery-img-container aspect-square reveal delay-2">
            <img src="https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=1200" className="gallery-img" alt="Fine Caviar" />
          </div>
          <div className="gallery-img-container aspect-tall reveal delay-3">
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200" className="gallery-img" alt="Wine Vault" />
          </div>
        </div>
      </section>

      {/* ----------------- REVIEWS ----------------- */}
      <section className="content-sect bg-charcoal">
        <div className="sect-header reveal">
          <span className="micro-label">The Verdict</span>
          <h1 className="serif-title sect-title">Guest Reviews</h1>
        </div>

        <div className="grid-3">
          <div className="review-card reveal delay-1">
            <div className="stars"><GoldStar/><GoldStar/><GoldStar/><GoldStar/><GoldStar/></div>
            <p className="review-text">"The finest dining experience in the city. Absolute perfection from start to finish. Unparalleled."</p>
          </div>
          <div className="review-card reveal delay-2">
            <div className="stars"><GoldStar/><GoldStar/><GoldStar/><GoldStar/><GoldStar/></div>
            <p className="review-text">"Amazing atmosphere and unforgettable food. An orchestration of pure culinary art that transcends normal dining."</p>
          </div>
          <div className="review-card reveal delay-3">
            <div className="stars"><GoldStar/><GoldStar/><GoldStar/><GoldStar/><GoldStar/></div>
            <p className="review-text">"The service was simply world-class. They anticipate your needs before you even realize you have them."</p>
          </div>
        </div>
      </section>

      {/* ----------------- CTA ----------------- */}
      <section className="cta-sect reveal">
        <h1 className="serif-title" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "var(--gold)", marginBottom: "20px" }}>
          Cross The Threshold
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "50px", fontWeight: "300", letterSpacing: "0.1em" }}>
          Experience luxury dining like never before.
        </p>
        <Link to="/book" className="btn-gold" style={{ padding: "20px 70px", fontSize: "1rem" }}>
          Initiate Reservation
        </Link>
      </section>

    </div>
  );
}