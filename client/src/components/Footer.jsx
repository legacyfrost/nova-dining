export default function Footer() {
  return (
    <>
      <style>
        {`
          .vip-footer {
            /* 10,000 Star Upgrade: Clear, gorgeous background image with a very light overlay */
            background-image: 
              linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
              url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            background-attachment: fixed; /* Keeps the image still while you scroll */
            
            color: #d1d5db;
            padding: 100px 20px 40px;
            margin-top: 60px;
            font-family: "Didot", "Playfair Display", "Georgia", serif;
            border-top: 3px solid rgba(212, 175, 55, 0.8);
            box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.9);
            position: relative;
            overflow: hidden;
          }

          /* The glowing luxury gold text */
          .glow-gold {
            color: #fff8e7;
            text-shadow: 
              0 0 5px #d4af37, 
              0 0 15px #d4af37, 
              0 0 30px #d4af37, 
              0 0 50px rgba(212, 175, 55, 0.8);
          }

          /* Subtle pulse animation for the main title */
          @keyframes pulse-glow {
            0%, 100% { text-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 40px #d4af37; }
            50% { text-shadow: 0 0 15px #ffdf00, 0 0 30px #ffdf00, 0 0 60px #ffdf00; }
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 3s infinite alternate;
          }

          .vip-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            gap: 40px;
            position: relative;
            z-index: 10;
          }

          /* 10,000 Star Upgrade: Frosted Glass Panels */
          .vip-column {
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1 1 300px;
            background: rgba(10, 10, 10, 0.65); /* Dark semi-transparent background */
            backdrop-filter: blur(10px); /* Frosted glass blur effect */
            -webkit-backdrop-filter: blur(10px);
            padding: 35px;
            border-radius: 16px;
            border: 1px solid rgba(212, 175, 55, 0.25); /* Subtle gold edge */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, border-color 0.3s ease;
          }

          .vip-column:hover {
            transform: translateY(-5px);
            border-color: rgba(212, 175, 55, 0.6);
          }

          .vip-heading {
            font-size: 1.2rem;
            color: #d4af37;
            text-transform: uppercase;
            letter-spacing: 4px;
            border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            padding-bottom: 12px;
            margin: 0;
            text-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
            font-family: "Helvetica Neue", sans-serif;
            font-weight: 600;
          }

          .vip-item {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.1rem;
            transition: all 0.4s ease;
            cursor: pointer;
            font-family: "Helvetica Neue", sans-serif;
            font-weight: 400;
            letter-spacing: 1px;
          }

          /* Hover effect makes the text light up like neon gold */
          .vip-item:hover {
            color: #ffffff;
            text-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37;
            transform: translateX(8px);
          }

          .vip-icon {
            font-size: 1.4rem;
            filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.8));
          }

          .vip-divider {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent);
            margin: 70px auto 30px;
            max-width: 1200px;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
          }

          .vip-copyright {
            text-align: center;
            font-size: 0.9rem;
            color: #a3a3a3;
            font-family: "Helvetica Neue", sans-serif;
            letter-spacing: 3px;
            text-transform: uppercase;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          }
        `}
      </style>

      <footer className="vip-footer">
        <div className="vip-container">
          
          {/* Brand Section */}
          <div className="vip-column">
            <h2 className="glow-gold animate-pulse-glow" style={{ fontSize: "2.8rem", margin: "0 0 15px 0", letterSpacing: "2px", lineHeight: "1.1" }}>
              NOVA<br/>DINING
            </h2>
            <p style={{ fontStyle: "italic", color: "#cccccc", fontSize: "1.15rem", margin: 0, lineHeight: "1.6" }}>
              An unrivaled culinary sanctuary.<br/>
              Taste the future of luxury.
            </p>
          </div>

          
          <div className="vip-column">
            <h3 className="vip-heading">Contacts</h3>
            <div className="vip-item">
              <span className="vip-icon">📞</span> +254 712 123 123
            </div>
            <div className="vip-item">
              <span className="vip-icon">✉️</span> info@novadining.com
            </div>
          </div>

      
          <div className="vip-column">
            <h3 className="vip-heading">Location</h3>
            <div className="vip-item">
              <span className="vip-icon">📍</span> Nairobi, Kenya
            </div>
            <div className="vip-item" style={{ color: "#d4af37", fontWeight: "500" }}>
              <span className="vip-icon">⏱</span> 12:00 AM - 1:00 AM
               <span className="vip-icon">DAYS</span> MONDAY - SUNDAY
            </div>
          </div>

        </div>

        <hr className="vip-divider" />

        <p className="vip-copyright">
          &copy; {new Date().getFullYear()} Nova Dining. Exclusive Rights Reserved.
        </p>
      </footer>
    </>
  );
}
