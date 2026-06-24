import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LockIcon = () => (
  <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(232, 195, 125, 0.4))" }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const sendCode = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      alert("A recovery sequence has been sent to your registered email.");
      setStep(2);
    } else {
      alert(data.error);
    }
  };

  const resetPassword = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password reset successful. You may now authenticate.");
      navigate("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="auth-viewport">
      <style>{`
    
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(12, 12, 14, 0.75);
          --glass-border: rgba(255, 255, 255, 0.12);
          --text-main: #FFFFFF;
          --text-muted: #A1A1AA;
          --bg-void: #000000;
        }

        .auth-viewport {
          height: 100vh;
          width: 100vw;
          background-color: var(--bg-void);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .epic-bg {
          position: absolute;
          top: -2%; left: -2%;
          width: 104%; height: 104%;
          background-image: url('https://images.unsplash.com/photo-1574966739987-65e38ef894da?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.3) contrast(1.2);
          z-index: 0;
        }

        .auth-panel {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 450px;
          background: var(--glass-panel);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 60px 50px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.8);
          text-align: center;
        }

        .portal-title {
          font-family: 'Cinzel', serif;
          font-size: 2rem;
          color: var(--text-main);
          margin-top: 20px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .input-group { margin-bottom: 25px; }

        .luxury-input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          padding: 15px;
          border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 15px;
        }

        .luxury-input:focus { border-color: var(--gold-pure); outline: none; }

        .btn-action {
          width: 100%;
          background: var(--gold-pure);
          color: #000;
          border: none;
          padding: 18px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.4s;
        }

        .btn-action:hover { background: #FFF; box-shadow: 0 0 20px var(--gold-glow); }
      `}</style>

      <div className="epic-bg"></div>
      <div className="auth-panel">
        <LockIcon />
        <h1 className="portal-title">Access Recovery</h1>
        
        <div className="input-group" style={{ marginTop: "40px" }}>
          <input
            className="luxury-input"
            placeholder="Account Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {step === 1 && (
          <button className="btn-action" onClick={sendCode}>
            Send Code
          </button>
        )}

        {step === 2 && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <input
              className="luxury-input"
              placeholder="Verification Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type="password"
              className="luxury-input"
              placeholder="New Secure Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-action" onClick={resetPassword}>
              Authorize Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
