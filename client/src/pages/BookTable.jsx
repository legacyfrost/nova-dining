import { useEffect, useState } from "react";

// ========================================================
// NOVA DINING ICONS
// ========================================================
const DiamondCrest = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
    <path d="M12 2v20"/>
    <path d="M2 12h20"/>
    <path d="M12 2l4 10-4 10-4-10z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

function BookTable() {
  const [tables, setTables] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const loadTables = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tables", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      setTables(data);
    } catch (error) {
      console.error("Failed to load tables", error);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const bookTable = async (table) => {
    if (!user) {
      alert("Please login to secure your reservation.");
      return;
    }

    if (!date || !time) {
      alert("Please select a date and time for your reservation.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          user_id: user.id,
          table_id: table.id,
          date: date,
          time: time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Reservation secured successfully.");
        loadTables();
      } else {
        alert(data.error || "Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error", error);
      alert("An error occurred while securing your reservation.");
    }
  };

  return (
    <div className="client-booking-interface">
      <style>{`
        /* =========================================
           NOVA DINING: CLIENT PORTAL ENGINE
           ========================================= */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(12, 12, 14, 0.55); 
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

        /* 1. CINEMATIC BACKGROUND */
        .client-booking-interface {
          height: 100vh;
          width: 100vw;
          background-color: var(--bg-void);
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
          /* A breathtaking, intimate fine-dining table setting */
          background-image: url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          filter: brightness(0.65) contrast(1.15) saturate(1.2);
          z-index: 0;
          animation: ambientDrift 45s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 30% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* 2. RESERVATION PARAMETERS (Left Sidebar) */
        .reservation-panel {
          position: relative;
          z-index: 10;
          width: 460px;
          height: 100%;
          background: var(--glass-panel);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          padding: 60px 50px;
          box-shadow: 20px 0 50px rgba(0,0,0,0.5);
        }

        .brand-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .portal-title {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 2.4rem;
          color: var(--gold-pure);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 25px;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .portal-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 15px;
        }

        .input-group {
          margin-bottom: 40px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          color: var(--text-main);
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        /* Styling Native Date/Time Pickers for Luxury */
        .luxury-date-time {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          padding: 16px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
          outline: none;
          cursor: pointer;
        }

        .luxury-date-time:focus {
          border-color: var(--gold-pure);
          box-shadow: 0 0 15px var(--gold-glow);
          background: rgba(0,0,0,0.5);
        }

        /* Invert calendar/clock icons to white in dark mode */
        ::-webkit-calendar-picker-indicator {
          filter: invert(1) opacity(0.7);
          cursor: pointer;
          transition: 0.3s;
        }
        
        ::-webkit-calendar-picker-indicator:hover {
          filter: invert(1) opacity(1);
        }

        .instruction-text {
          margin-top: auto;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          padding: 20px;
          border-top: 1px solid var(--glass-border);
        }

        /* 3. TABLE SELECTION (Right Side) */
        .selection-viewport {
          position: relative;
          z-index: 5;
          flex: 1;
          height: 100%;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
        }

        .viewport-header {
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--glass-border);
        }

        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: var(--text-main);
          font-weight: 500;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* The Grid */
        .scroll-gallery {
          flex: 1;
          overflow-y: auto;
          padding-right: 20px;
          padding-bottom: 40px;
        }

        .scroll-gallery::-webkit-scrollbar { width: 3px; }
        .scroll-gallery::-webkit-scrollbar-thumb { background: var(--gold-pure); border-radius: 10px; }

        .table-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        /* Client Table Card */
        .client-card {
          background: rgba(20, 20, 22, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 35px;
          position: relative;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .client-card.available:hover {
          background: rgba(25, 25, 28, 0.6);
          border-color: rgba(232, 195, 125, 0.5);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          transform: translateY(-5px);
        }

        .client-card.reserved {
          opacity: 0.6;
          filter: grayscale(0.5);
          cursor: not-allowed;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .table-id {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: var(--text-main);
          line-height: 1;
        }

        .seats-indicator {
          font-size: 0.8rem;
          color: var(--gold-pure);
          letter-spacing: 0.1em;
          border: 1px solid var(--gold-pure);
          padding: 6px 14px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .status-line {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }

        .dot-available {
          background-color: var(--gold-pure);
          box-shadow: 0 0 12px var(--gold-pure);
        }

        .dot-reserved {
          background-color: #555;
        }

        /* Booking Button */
        .btn-reserve {
          width: 100%;
          background: var(--text-main);
          color: var(--bg-void);
          border: none;
          padding: 16px;
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.4s ease;
          margin-top: auto;
        }

        .btn-reserve:hover {
          background: var(--gold-pure);
          box-shadow: 0 0 20px var(--gold-glow);
          transform: scale(1.02);
        }

        .btn-locked {
          width: 100%;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.3);
          border: 1px solid var(--glass-border);
          padding: 16px;
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-radius: 6px;
          text-align: center;
        }

        @keyframes ambientDrift {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }
      `}</style>

      {/* 1. CINEMATIC BACKGROUND */}
      <div className="epic-bg"></div>
      <div className="epic-overlay"></div>

      {/* 2. RESERVATION PARAMETERS */}
      <aside className="reservation-panel">
        <div className="brand-header">
          <DiamondCrest />
          <h1 className="portal-title">Nova Dining</h1>
          <div className="portal-subtitle">Exclusive Reservations</div>
        </div>

        <div className="input-group">
          <label className="input-label">
            <CalendarIcon /> Select Date
          </label>
          <input
            className="luxury-date-time"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            <ClockIcon /> Select Time
          </label>
          <input
            className="luxury-date-time"
        type="time"
        min={
          date === new Date().toISOString().split("T")[0]
          ? new Date().toTimeString().slice(0,5)
          : undefined
        }
        value={time}
        onChange={(e)=>setTime(e.target.value)}
        />
        </div>

        <div className="instruction-text">
          To ensure an impeccable dining experience, please establish your date and time before selecting from our available floor plan.
        </div>
      </aside>

      {/* 3. TABLE SELECTION */}
      <main className="selection-viewport">
        <header className="viewport-header">
          <h2 className="section-title">Select Your Table</h2>
        </header>

        <div className="scroll-gallery">
          {tables.length === 0 ? (
            <div style={{ padding: "40px 0", color: "var(--text-muted)", fontStyle: "italic", fontFamily: "'Cinzel', serif", fontSize: "1.2rem" }}>
              Currently synchronizing the dining floor...
            </div>
          ) : (
            <div className="table-grid">
              {tables.map((table) => {
                const isAvailable = table.status === "available";

                return (
                  <div 
                    key={table.id} 
                    className={`client-card ${isAvailable ? 'available' : 'reserved'}`}
                  >
                    <div className="card-top">
                      <div className="table-id">{table.table_number}</div>
                      <div className="seats-indicator">{table.seats} Seats</div>
                    </div>

                    <div className="status-line">
                      <div className={`status-dot ${isAvailable ? 'dot-available' : 'dot-reserved'}`}></div>
                      <span style={{ color: isAvailable ? "var(--text-main)" : "var(--text-muted)" }}>
                        {isAvailable ? "Available to Reserve" : "Currently Unavailable"}
                      </span>
                    </div>

                    {isAvailable ? (
                      <button className="btn-reserve" onClick={() => bookTable(table)}>
                        Secure Reservation
                      </button>
                    ) : (
                      <div className="btn-locked">
                        Reserved
                      </div>
                    )}
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

export default BookTable;