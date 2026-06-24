import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DiamondCrest = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
    <path d="M12 2v20"/>
    <path d="M2 12h20"/>
    <path d="M12 2l4 10-4 10-4-10z"/>
  </svg>
);

function Register() {
  const navigate = useNavigate();

  // Exact logic maintained
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [sent, setSent] = useState(false);

  const getCode = async () => {
    const res = await fetch("https://nova-dining-production.up.railway.app/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSent(true);
      alert("Verification code dispatched to your secure channel.");
    } else {
      alert(data.error);
    }
  };

  const register = async () => {
    if (password !== confirm) {
      alert("AUTHORIZATION FAILED: Passwords do not match.");
      return;
    }

    const res = await fetch("https://nova-dining-production.up.railway.app/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Initiation Complete. Access Granted. Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-viewport">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(8, 8, 10, 0.75); /* Extremely deep frosted glass */
          --glass-border: rgba(255, 255, 255, 0.08);
          --text-main: #FFFFFF;
          --text-muted: #A1A1AA;
          --bg-void: #000000;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::selection {
          background: var(--gold-pure);
          color: var(--bg-void);
        }

        .auth-viewport {
          min-height: 100vh;
          width: 100vw;
          background-color: var(--bg-void);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          position: relative;
        }

        .epic-bg {
          position: absolute;
          top: -2%; left: -2%;
          width: 104%; height: 104%;
          /* Hyper-exclusive private club aesthetic */
          background-image: url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.35) contrast(1.2) saturate(1.1);
          z-index: 0;
          animation: ambientPan 45s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .auth-panel {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 500px;
          background: var(--glass-panel);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 60px 50px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.9);
          animation: panelFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          margin: 40px 0;
        }

        .brand-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .portal-title {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 2.2rem;
          color: var(--text-main);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 20px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .portal-subtitle {
          font-size: 0.8rem;
          color: var(--gold-pure);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* Forms & Inputs */
        .input-group {
          margin-bottom: 25px;
          position: relative;
        }

        .luxury-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          font-size: 1.05rem;
          padding: 12px 5px;
          transition: all 0.3s ease;
        }

        .luxury-input:focus {
          outline: none;
          border-bottom: 1px solid var(--gold-pure);
          box-shadow: 0 4px 10px -4px var(--gold-glow);
        }

        .luxury-input::placeholder { 
          color: rgba(255,255,255,0.3); 
          font-weight: 300; 
          letter-spacing: 0.05em;
        }

        .reveal-field {
          animation: slideDownFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .btn-action {
          width: 100%;
          border: none;
          padding: 18px;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.4s ease;
        }

        .btn-primary {
          background: var(--gold-pure);
          color: #111;
          margin-top: 15px;
        }

        .btn-primary:hover {
          background: #FFFFFF;
          box-shadow: 0 0 25px var(--gold-glow);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          color: var(--gold-pure);
          border: 1px solid var(--glass-border);
          margin-bottom: 25px;
        }

        .btn-secondary:hover {
          background: rgba(232, 195, 125, 0.1);
          border-color: var(--gold-pure);
        }
        .auth-footer {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-top: 1px solid var(--glass-border);
          padding-top: 30px;
        }

        .redirect-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .redirect-text span {
          color: var(--text-main);
          cursor: pointer;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-left: 8px;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .redirect-text span:hover {
          color: var(--gold-pure);
          border-bottom: 1px solid var(--gold-pure);
          text-shadow: 0 0 10px var(--gold-glow);
        }

        @keyframes ambientPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }

        @keyframes panelFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDownFade {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>
      <div className="auth-panel">
        <div className="brand-header">
          <DiamondCrest />
          <h1 className="portal-title">Nova Dining</h1>
          <div className="portal-subtitle">Initiation Protocol</div>
        </div>
        <div>
          
          <div className="input-group">
            <input
              className="luxury-input"
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              className="luxury-input"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn-action btn-secondary" onClick={getCode}>
            {sent ? "Resend Authorization Code" : "Request Authorization Code"}
          </button>
          {sent && (
            <div className="input-group reveal-field">
              <input
                className="luxury-input"
                style={{ color: "var(--gold-pure)", borderColor: "var(--gold-pure)" }}
                placeholder="Secure Verification Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          )}

          {/* Security Fields */}
          <div className="input-group">
            <input
              className="luxury-input"
              type="password"
              placeholder="Establish Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              className="luxury-input"
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button className="btn-action btn-primary" onClick={register}>
            Complete Initiation
          </button>
        </div>

        {/* Footer Redirect */}
        <div className="auth-footer">
          <p className="redirect-text">
            Already possess clearance? 
            <span onClick={() => navigate("/login")}>
              Authenticate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
