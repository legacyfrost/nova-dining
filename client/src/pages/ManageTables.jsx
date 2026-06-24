import { useEffect, useState } from "react";

// ========================================================
// ELEGANT LUXURY ICONS
// ========================================================
const TableIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(232, 195, 125, 0.4))" }}>
    <rect x="3" y="8" width="18" height="8" rx="2" />
    <path d="M7 16v4" />
    <path d="M17 16v4" />
    <path d="M3 12h18" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

function ManageTables() {
  const [tables, setTables] = useState([]);
  const [number, setNumber] = useState("");
  const [seats, setSeats] = useState("");

  const token = localStorage.getItem("token");

  const loadTables = async () => {
    const res = await fetch("https://nova-dining-production.up.railway.app/api/admin/tables", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    setTables(data);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const addTable = async () => {
    await fetch("https://nova-dining-production.up.railway.app/api/admin/tables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        table_number: number,
        seats: seats
      })
    });

    setNumber("");
    setSeats("");
    loadTables();
  };

  const editSeats = async (id) => {
    const value = prompt("Enter new number of seats:");
    if (!value) return;

    await fetch(`https://nova-dining-production.up.railway.app/api/admin/tables/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        seats: value
      })
    });

    loadTables();
  };

  const unbook = async (id) => {
    await fetch(`https://nova-dining-production.up.railway.app/api/admin/tables/${id}/unbook`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    loadTables();
  };

  const removeTable = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this table?")) return;

    await fetch(`https://nova-dining-production.up.railway.app/api/admin/tables/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    loadTables();
  };

  return (
    <div className="manage-tables-interface">
      <style>{`
        /* =========================================
           NOVA DINING: FLOOR OPERATIONS DASHBOARD
           ========================================= */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(15, 15, 18, 0.65); 
          --glass-border: rgba(255, 255, 255, 0.15);
          --text-main: #FFFFFF;
          --text-muted: #B0B0B8;
          --bg-void: #000000;
          --danger: #FF6B6B;
          --danger-glow: rgba(255, 107, 107, 0.15);
          --success: #4ADE80;
          --success-glow: rgba(74, 222, 128, 0.15);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: var(--gold-pure); color: var(--bg-void); }

        /* 1. STUNNING BACKGROUND */
        .manage-tables-interface {
          min-height: 100vh;
          width: 100vw;
          background-color: var(--bg-void);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .epic-bg {
          position: fixed;
          top: -2%; left: -2%;
          width: 104%; height: 104%;
          /* Beautiful upscale dining room */
          background-image: url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.4) contrast(1.1) saturate(1.2);
          z-index: 0;
          animation: ambientPan 60s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* 2. MAIN LAYOUT */
        .dashboard-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px;
        }

        /* Header */
        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 30px;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 40px;
        }

        .brand-cluster {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .dashboard-title {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: var(--text-main);
          letter-spacing: 0.1em;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .dashboard-subtitle {
          font-size: 0.9rem;
          color: var(--gold-pure);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 5px;
        }

        /* Top Stats Grid */
        .stat-cluster {
          display: flex;
          gap: 20px;
        }

        .stat-card {
          background: rgba(20, 20, 25, 0.5);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          padding: 20px 30px;
          border-radius: 12px;
          text-align: center;
          min-width: 150px;
        }

        .stat-value {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: var(--text-main);
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        /* 3. ADD TABLE CONTROL BAR */
        .add-control-bar {
          background: var(--glass-panel);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          padding: 25px 35px;
          border-radius: 16px;
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 40px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .input-group {
          flex: 1;
        }

        .luxury-input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          padding: 15px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .luxury-input:focus {
          outline: none;
          border-color: var(--gold-pure);
          box-shadow: 0 0 15px var(--gold-glow);
        }

        .luxury-input::placeholder {
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
        }

        .btn-add {
          background: var(--gold-pure);
          color: #111;
          border: none;
          padding: 16px 40px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-add:hover {
          background: #FFF;
          box-shadow: 0 0 20px var(--gold-glow);
          transform: translateY(-2px);
        }

        /* 4. TABLE GRID SYSTEM */
        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
        }

        .table-card {
          background: var(--glass-panel);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          animation: fadeUp 0.5s ease forwards;
        }

        .table-card:hover {
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        /* Card Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .table-number {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 5px;
        }

        .table-seats {
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Status Badges */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .status-available {
          background: var(--success-glow);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-booked {
          background: var(--danger-glow);
          color: var(--danger);
          border: 1px solid var(--danger);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-available .status-dot { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .status-booked .status-dot { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        /* Guest Information (When Booked) */
        .guest-info {
          background: rgba(0,0,0,0.3);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .guest-info h3 {
          font-size: 0.8rem;
          color: var(--gold-pure);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 15px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .info-row:last-child { margin-bottom: 0; }
        .info-row svg { color: var(--text-muted); }

        /* Action Buttons */
        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto; /* Pushes to bottom */
        }

        .btn-action {
          flex: 1;
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
          border: 1px solid var(--glass-border);
          padding: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .btn-action:hover {
          background: rgba(255,255,255,0.15);
        }

        .btn-edit:hover { background: rgba(232, 195, 125, 0.15); border-color: var(--gold-pure); color: var(--gold-pure); }
        .btn-delete:hover { background: var(--danger-glow); border-color: var(--danger); color: var(--danger); }

        /* Animations */
        @keyframes ambientPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 1. BACKGROUND ENGINE */}
      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>

      {/* 2. DASHBOARD CONTAINER */}
      <div className="dashboard-container">
        
        {/* Header */}
        <header className="top-header">
          <div className="brand-cluster">
            <TableIcon />
            <div>
              <h1 className="dashboard-title">Floor Operations</h1>
              <div className="dashboard-subtitle">Manage Dining Assets</div>
            </div>
          </div>

          <div className="stat-cluster">
            <div className="stat-card">
              <div className="stat-value">{tables.length}</div>
              <div className="stat-label">Total Tables</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: "var(--success)" }}>
                {tables.filter(t => t.status !== "reserved").length}
              </div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: "var(--danger)" }}>
                {tables.filter(t => t.status === "reserved").length}
              </div>
              <div className="stat-label">Reserved</div>
            </div>
          </div>
        </header>

        {/* 3. ADD TABLE BAR */}
        <div className="add-control-bar">
          <div className="input-group">
            <input
              className="luxury-input"
              placeholder="Table Identifier (e.g. 10, V1, Balcony-A)"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              className="luxury-input"
              type="number"
              placeholder="Seat Capacity"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={addTable}>
            Deploy Table
          </button>
        </div>

        {/* 4. TABLE GRID */}
        <div className="tables-grid">
          {tables.map(t => (
            <div key={t.id} className="table-card" style={{ animationDelay: `${tables.indexOf(t) * 0.05}s` }}>
              
              <div className="card-header">
                <div>
                  <h2 className="table-number">Table {t.table_number}</h2>
                  <div className="table-seats">{t.seats} Seats Capacity</div>
                </div>
                
                <div className={`status-badge ${t.status === "reserved" ? "status-booked" : "status-available"}`}>
                  <span className="status-dot"></span>
                  {t.status === "reserved" ? "Reserved" : "Available"}
                </div>
              </div>

              {t.status === "reserved" && t.user_name && (
                <div className="guest-info">
                  <h3>Active Reservation</h3>
                  <div className="info-row">
                    <UserIcon />
                    <span>{t.user_name}</span>
                  </div>
                  <div className="info-row">
                    <CalendarIcon />
                    <span>{t.reservation_date}</span>
                  </div>
                  <div className="info-row">
                    <ClockIcon />
                    <span>{t.reservation_time}</span>
                  </div>
                </div>
              )}

              <div className="card-actions" style={{ marginTop: t.status !== "reserved" ? "20px" : "0" }}>
                <button className="btn-action btn-edit" onClick={() => editSeats(t.id)}>
                  Edit Seats
                </button>
                
                {t.status === "reserved" && (
                  <button className="btn-action" onClick={() => unbook(t.id)}>
                    Cancel Booking
                  </button>
                )}
                
                <button className="btn-action btn-delete" onClick={() => removeTable(t.id)}>
                  Delete Table
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageTables;
