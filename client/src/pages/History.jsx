import { useEffect, useState } from "react";

// ========================================================
// NOVA DINING LUXURY ICONS
// ========================================================
const DossierCrest = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(232, 195, 125, 0.4))" }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CancelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function History() {
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadReservations = () => {
    if (!user) return;

    fetch(`https://nova-dining-production.up.railway.app/api/reservations/${user.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setReservations(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const cancelReservation = async (id) => {
    if (!window.confirm("Are you sure you wish to release this allocation?")) return;

    const response = await fetch(`https://nova-dining-production.up.railway.app/api/reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    if (response.ok) {
      alert("Reservation successfully released.");
      loadReservations();
    } else {
      alert("Cancellation failed. Please contact the concierge.");
    }
  };

  return (
    <div className="history-viewport">
      <style>{`
        /* =========================================
           NOVA DINING: CLIENT DOSSIER ENGINE
           ========================================= */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(15, 15, 18, 0.65); 
          --glass-border: rgba(255, 255, 255, 0.12);
          --text-main: #FFFFFF;
          --text-muted: #A1A1AA;
          --bg-void: #000000;
          --danger: #FF6B6B;
          --danger-glow: rgba(255, 107, 107, 0.15);
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

        /* 1. CINEMATIC BACKGROUND */
        .history-viewport {
          min-height: 100vh;
          width: 100vw;
          background-color: var(--bg-void);
          color: var(--text-main);
          display: flex;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .epic-bg {
          position: fixed;
          top: -2%; left: -2%;
          width: 104%; height: 104%;
          /* Intimate, upscale wine glass / dining aesthetic */
          background-image: url('https://images.unsplash.com/photo-1574966739987-65e38ef894da?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.4) contrast(1.15) saturate(1.1);
          z-index: 0;
          animation: ambientPan 50s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 50% 30%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* 2. MAIN CONTAINER */
        .dossier-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Header */
        .dossier-header {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--glass-border);
        }

        .dossier-title {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 3rem;
          color: var(--text-main);
          letter-spacing: 0.1em;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
          margin-top: 20px;
        }

        .dossier-subtitle {
          font-size: 0.9rem;
          color: var(--gold-pure);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* 3. RESERVATIONS GRID */
        .reservations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .reservation-card {
          background: var(--glass-panel);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 40px 35px;
          position: relative;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }

        .reservation-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: var(--gold-pure);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .reservation-card:hover {
          background: rgba(20, 20, 25, 0.75);
          border-color: rgba(232, 195, 125, 0.3);
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
          transform: translateY(-5px);
        }

        .reservation-card:hover::before {
          transform: scaleX(1);
        }

        .table-id {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: var(--gold-pure);
          line-height: 1;
          margin-bottom: 25px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 1rem;
          color: var(--text-main);
          letter-spacing: 0.05em;
        }

        .info-row svg {
          color: var(--text-muted);
        }

        /* Action Button */
        .btn-cancel {
          width: 100%;
          background: transparent;
          color: var(--danger);
          border: 1px solid rgba(255, 107, 107, 0.4);
          padding: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn-cancel:hover {
          background: var(--danger-glow);
          color: #FFF;
          border-color: var(--danger);
          box-shadow: 0 0 15px var(--danger-glow);
        }

        /* Empty State */
        .empty-dossier {
          text-align: center;
          padding: 60px 20px;
          background: var(--glass-panel);
          backdrop-filter: blur(20px);
          border: 1px dashed var(--glass-border);
          border-radius: 12px;
          color: var(--text-muted);
        }

        .empty-text {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: var(--text-main);
          margin-bottom: 15px;
        }

        /* Animations */
        @keyframes ambientPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .dossier-container { padding: 60px 20px; }
          .reservations-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. CINEMATIC BACKGROUND */}
      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>

      {/* 2. DOSSIER CONTAINER */}
      <div className="dossier-container">
        
        <div className="dossier-header">
          <DossierCrest />
          <h1 className="dossier-title">Personal Reservations</h1>
          <div className="dossier-subtitle">Your Culinary Timelines</div>
        </div>

        {reservations.length === 0 ? (
          <div className="empty-dossier">
            <h3 className="empty-text">No Reservations Secured</h3>
            <p style={{ letterSpacing: "0.05em", fontWeight: "300" }}>
              Your dossier is currently empty. Visit the reservation portal to secure a timeline.
            </p>
          </div>
        ) : (
          <div className="reservations-grid">
            {reservations.map((r, index) => (
              <div 
                key={r.id} 
                className="reservation-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "5px", display: "block" }}>
                    Allocation
                  </span>
                  <h3 className="table-id">Table {r.table_number}</h3>
                </div>

                <div className="info-row">
                  <CalendarIcon />
                  {new Date(r.reservation_date).toLocaleDateString(undefined, {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>

                <div className="info-row">
                  <ClockIcon />
                  {r.reservation_time}
                </div>

                <button 
                  className="btn-cancel"
                  onClick={() => cancelReservation(r.id)}
                >
                  <CancelIcon /> Release Reservation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
