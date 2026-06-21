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

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Access Granted.");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Server connection failed. Please try again.");
    }
  };

  return (
    <div className="auth-viewport">
      <style>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(12, 12, 14, 0.65); /* Deep frosted glass */
          --glass-border: rgba(255, 255, 255, 0.12);
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
          height: 100vh;
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
        
          background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.4) contrast(1.2) saturate(1.1);
          z-index: 0;
          animation: ambientPan 50s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .auth-panel {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          background: var(--glass-panel);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 60px 50px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7);
          animation: panelFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .brand-header {
          text-align: center;
          margin-bottom: 50px;
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

        .input-group {
          margin-bottom: 35px;
          position: relative;
        }

        .luxury-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
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

        .btn-enter {
          width: 100%;
          background: var(--gold-pure);
          color: #111;
          border: none;
          padding: 18px;
          margin-top: 10px;
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.4s ease;
        }

        .btn-enter:hover {
          background: #FFFFFF;
          box-shadow: 0 0 25px var(--gold-glow);
          transform: translateY(-2px);
        }

        .auth-footer {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .luxury-link {
          background: none;
          border: none;
          color: var(--text-muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .luxury-link:hover {
          color: var(--gold-pure);
        }

        .luxury-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 50%;
          background-color: var(--gold-pure);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .luxury-link:hover::after {
          width: 100%;
          box-shadow: 0 0 8px var(--gold-glow);
        }

        .register-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .register-text span {
          color: var(--gold-pure);
          cursor: pointer;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-left: 8px;
          transition: all 0.3s ease;
        }

        .register-text span:hover {
          color: #FFF;
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
      `}</style>

      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>

      <div className="auth-panel">
        <div className="brand-header">
          <DiamondCrest />
          <h1 className="portal-title">Nova Dining</h1>
          <div className="portal-subtitle">Member Access</div>
        </div>

        <form onSubmit={login}>
          <div className="input-group">
            <input
              className="luxury-input"
              type="email"
              placeholder="Email Address"
              value={email}
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="luxury-input"
              type="password"
              placeholder="Password"
              value={password}
              autocomplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-enter">
            Enter
          </button>
        </form>

        <div className="auth-footer">
          <button 
            className="luxury-link" 
            onClick={() => navigate("/forgot-password")}
            type="button"
          >
            Forgot Password?
          </button>

          <p className="register-text">
            Do not have an account? 
            <span onClick={() => navigate("/register")}>
              Request Access
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;