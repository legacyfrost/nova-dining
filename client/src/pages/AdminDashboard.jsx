import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// ========================================================
// NOVA DINING CREST
// ========================================================
const DiamondCrest = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
    <path d="M12 2v20"/>
    <path d="M2 12h20"/>
    <path d="M12 2l4 10-4 10-4-10z"/>
  </svg>
);

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [tables, setTables] = useState([]);
  const [number, setNumber] = useState("");
  const [seats, setSeats] = useState("");

  if (!user?.is_admin) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = () => {
    fetch("http://localhost:5000/api/admin/tables", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTables(data))
      .catch(console.log);
  };

  const addTable = async () => {
    if (!number || !seats) return;
    await fetch("http://localhost:5000/api/admin/tables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        table_number: number,
        seats: seats,
      }),
    });

    setNumber("");
    setSeats("");
    loadTables();
  };

  const deleteTable = async (id) => {
    if (!window.confirm("Remove this table from the floor plan?")) return;

    await fetch(`http://localhost:5000/api/admin/tables/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    loadTables();
  };

  const unbook = async (id) => {
    await fetch(`http://localhost:5000/api/admin/tables/${id}/unbook`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    loadTables();
  };

  return (
    <div className="exclusive-interface">
      <style>{`
        /* =========================================
           NOVA DINING: VISIBLE LUXURY ENGINE
           ========================================= */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; /* Slightly warmer, brighter gold */
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(12, 12, 14, 0.45); /* Highly translucent */
          --glass-border: rgba(255, 255, 255, 0.12);
          --text-main: #FFFFFF;
          --text-muted: #A1A1AA;
          --danger: #FF6B6B;
          --active: #4ADE80;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::selection {
          background: var(--gold-pure);
          color: #000;
        }

        /* 1. CINEMATIC BACKGROUND (VISIBLE & STUNNING) */
        .exclusive-interface {
          height: 100vh;
          width: 100vw;
          background-color: #000;
          color: var(--text-main);
          display: flex;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          position: relative;
        }

        .epic-bg {
          position: absolute;
          top: -2%; left: -2%;
          width: 104%; height: 104%;
          /* Warm, stunning, visible luxury restaurant background */
          background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          /* Adjusted filters so the image POPS but text remains readable */
          filter: brightness(0.65) contrast(1.15) saturate(1.2);
          z-index: 0;
          animation: slowPan 45s infinite alternate ease-in-out;
        }

        /* Soft vignette instead of a heavy blanket overlay */
        .epic-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 60% 40%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* 2. MAITRE D' CONSOLE (Left Sidebar) */
        .control-sidebar {
          position: relative;
          z-index: 10;
          width: 440px;
          height: 100%;
          background: var(--glass-panel);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          padding: 60px 40px;
          box-shadow: 15px 0 40px rgba(0,0,0,0.4);
        }

        .brand-container {
          text-align: center;
          margin-bottom: 50px;
        }

        .club-title {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 2.2rem;
          color: var(--gold-pure);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 20px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .club-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* The Form */
        .admin-form {
          margin-top: auto;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 35px 30px;
          backdrop-filter: blur(10px);
        }

        .form-heading {
          font-family: 'Cinzel', serif;
          font-size: 1.2rem;
          color: var(--text-main);
          text-align: center;
          margin-bottom: 25px;
          letter-spacing: 0.1em;
        }

        .luxury-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          padding: 12px 0;
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .luxury-input:focus {
          outline: none;
          border-bottom: 1px solid var(--gold-pure);
          box-shadow: 0 4px 10px -4px var(--gold-glow);
        }

        .luxury-input::placeholder { color: rgba(255,255,255,0.4); font-weight: 300; }

        .btn-deploy {
          width: 100%;
          background: var(--gold-pure);
          color: #111;
          border: none;
          padding: 18px;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.4s ease;
        }

        .btn-deploy:hover {
          background: #FFF;
          box-shadow: 0 0 25px var(--gold-glow);
          transform: translateY(-2px);
        }

        /* 3. FLOOR PLAN VIEWPORT (Right Side) */
        .floor-viewport {
          position: relative;
          z-index: 5;
          flex: 1;
          height: 100%;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
        }

        .viewport-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--glass-border);
        }

        .floor-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: var(--text-main);
          font-weight: 500;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Stats */
        .service-stats {
          display: flex;
          gap: 40px;
        }

        .stat-block {
          text-align: right;
        }

        .stat-number {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: var(--gold-pure);
          line-height: 1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 8px;
          opacity: 0.8;
        }

        /* The Grid */
        .scroll-floor {
          flex: 1;
          overflow-y: auto;
          padding-right: 20px;
          padding-bottom: 40px;
        }

        .scroll-floor::-webkit-scrollbar { width: 3px; }
        .scroll-floor::-webkit-scrollbar-thumb { background: var(--gold-pure); border-radius: 10px; }

        .table-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 25px;
        }

        /* Table Card - Frosted Glass */
        .table-card {
          background: rgba(20, 20, 22, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 35px;
          position: relative;
          transition: all 0.4s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .table-card:hover {
          background: rgba(25, 25, 28, 0.6);
          border-color: rgba(232, 195, 125, 0.4);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          transform: translateY(-5px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .table-id {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: var(--text-main);
          line-height: 1;
        }

        .seats-pill {
          font-size: 0.75rem;
          color: var(--text-main);
          background: rgba(255,255,255,0.1);
          letter-spacing: 0.1em;
          border: 1px solid var(--glass-border);
          padding: 6px 14px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .status-indicator {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }

        /* Guest Information */
        .guest-dossier {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          border-radius: 8px;
          border-left: 2px solid var(--gold-pure);
          margin-bottom: 25px;
        }

        .guest-name {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          color: var(--gold-pure);
          margin-bottom: 6px;
        }

        .guest-contact {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .guest-time {
          font-size: 0.8rem;
          color: var(--text-main);
          letter-spacing: 0.05em;
        }

        .empty-state-card {
          padding: 20px;
          text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 8px;
          margin-bottom: 25px;
          color: var(--text-muted);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        /* Action Buttons */
        .action-row {
          display: flex;
          gap: 12px;
        }

        .btn-action {
          flex: 1;
          padding: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .btn-clear {
          background: rgba(255,255,255,0.08);
          color: var(--text-main);
          border: 1px solid var(--glass-border);
        }

        .btn-clear:hover:not(:disabled) {
          background: var(--text-main);
          color: #000;
        }

        .btn-clear:disabled {
          color: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.05);
          cursor: not-allowed;
        }

        .btn-remove {
          background: transparent;
          color: var(--danger);
          border: 1px solid transparent;
        }

        .btn-remove:hover {
          background: rgba(255, 107, 107, 0.15);
          border-color: rgba(255, 107, 107, 0.4);
        }

        @keyframes slowPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }
      `}</style>

      {/* 1. CINEMATIC BACKGROUND */}
      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>

      {/* 2. MAITRE D' CONSOLE */}
      <aside className="control-sidebar">
        <div className="brand-container">
          <DiamondCrest />
          <h1 className="club-title">Nova Dining</h1>
          <div className="club-subtitle">Executive Control</div>
        </div>

        <div className="admin-form">
          <h3 className="form-heading">Add to Floor Plan</h3>
          <input
            className="luxury-input"
            placeholder="Table Number (e.g. T-12)"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className="luxury-input"
            placeholder="Seating Capacity"
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
          <button className="btn-deploy" onClick={addTable}>
            Deploy Table
          </button>
        </div>
      </aside>

      {/* 3. FLOOR PLAN VIEWPORT */}
      <main className="floor-viewport">
        <header className="viewport-header">
          <div>
            <span style={{ fontFamily: "'Montserrat', sans-serif", color: "var(--gold-pure)", letterSpacing: "0.2em", fontSize: "0.75rem", textTransform: "uppercase" }}>
              Live Service
            </span>
            <h2 className="floor-title">Floor Management</h2>
          </div>
          
          <div className="service-stats">
            <div className="stat-block">
              <div className="stat-number">{tables.length}</div>
              <div className="stat-label">Total Tables</div>
            </div>
            <div className="stat-block">
              <div className="stat-number" style={{ color: "var(--text-main)" }}>
                {tables.filter(t => t.status === "reserved").length}
              </div>
              <div className="stat-label">Active Service</div>
            </div>
          </div>
        </header>

        <div className="scroll-floor">
          {tables.length === 0 ? (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <DiamondCrest />
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", color: "var(--text-muted)", marginTop: "20px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                The floor plan is currently empty.
              </p>
            </div>
          ) : (
            <div className="table-grid">
              {tables.map((t) => {
                const isReserved = t.status === "reserved";
                
                return (
                  <div className="table-card" key={t.id}>
                    
                    <div className="card-header">
                      <div className="table-id">{t.table_number}</div>
                      <div className="seats-pill">{t.seats} Seats</div>
                    </div>

                    {isReserved ? (
                      <div className="status-indicator" style={{ color: "var(--active)" }}>
                        <div className="dot" style={{ backgroundColor: "var(--active)", boxShadow: "0 0 10px var(--active)" }}></div>
                        Party Seated
                      </div>
                    ) : (
                      <div className="status-indicator" style={{ color: "var(--text-muted)" }}>
                        <div className="dot" style={{ backgroundColor: "var(--text-muted)" }}></div>
                        Available & Prepped
                      </div>
                    )}

                    {isReserved ? (
                      <div className="guest-dossier">
                        <div className="guest-name">{t.user_name}</div>
                        <div className="guest-contact">{t.email}</div>
                        <div className="guest-time">
                          {t.reservation_date} at {t.reservation_time}
                        </div>
                      </div>
                    ) : (
                      <div className="empty-state-card">
                        Awaiting next reservation.
                      </div>
                    )}

                    <div className="action-row">
                      <button 
                        className="btn-action btn-clear"
                        onClick={() => unbook(t.id)}
                        disabled={!isReserved}
                      >
                        Clear Table
                      </button>
                      <button 
                        className="btn-action btn-remove"
                        onClick={() => deleteTable(t.id)}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}