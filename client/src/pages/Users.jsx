import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RegistryIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(232, 195, 125, 0.4))" }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CrownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px", verticalAlign: "text-bottom" }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

function Users() {
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  
  if (!user?.is_admin && !user?.is_super_admin) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("USERS:", data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="registry-interface">
      <style>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(15, 15, 18, 0.65); 
          --glass-border: rgba(255, 255, 255, 0.12);
          --text-main: #FFFFFF;
          --text-muted: #B0B0B8;
          --bg-void: #000000;
          --blue-accent: #60A5FA;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: var(--gold-pure); color: var(--bg-void); }

        /* 1. STUNNING BACKGROUND */
        .registry-interface {
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
          /* Deep, luxurious dining atmosphere */
          background-image: url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2500'); 
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

        .dashboard-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        
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
          font-size: 0.85rem;
          color: var(--gold-pure);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .access-badge {
          background: rgba(232, 195, 125, 0.15);
          color: var(--gold-pure);
          border: 1px solid var(--gold-pure);
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          box-shadow: 0 0 15px var(--gold-glow);
        }

        /* 3. TABLE CONTAINER (Glassmorphism) */
        .table-container {
          flex: 1;
          background: var(--glass-panel);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 40px;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .table-container::-webkit-scrollbar { width: 5px; }
        .table-container::-webkit-scrollbar-thumb { background: var(--gold-pure); border-radius: 10px; }

        /* 4. LUXURY TABLE STYLING */
        .luxury-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .luxury-table th {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 20px;
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          background: rgba(15, 15, 18, 0.95);
          z-index: 5;
        }

        .luxury-table td {
          padding: 25px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 1rem;
          color: var(--text-main);
          transition: background 0.3s ease;
        }

        .luxury-table tbody tr {
          transition: all 0.3s ease;
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }

        .luxury-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .luxury-table tbody tr:hover td {
          color: var(--gold-pure);
        }

        /* Monospace ID for a tech-luxury feel */
        .id-cell {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-muted) !important;
          font-size: 0.9rem;
        }

        /* Role Badges */
        .role-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 20px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .role-super { 
          background: rgba(232, 195, 125, 0.15); 
          color: var(--gold-pure); 
          border: 1px solid var(--gold-pure); 
        }
        
        .role-admin { 
          background: rgba(96, 165, 250, 0.15); 
          color: var(--blue-accent); 
          border: 1px solid var(--blue-accent); 
        }
        
        .role-user { 
          background: rgba(255, 255, 255, 0.05); 
          color: var(--text-main); 
          border: 1px solid var(--glass-border); 
        }

        /* Animations */
        @keyframes ambientPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
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
            <RegistryIcon />
            <div>
              <h1 className="dashboard-title">Patron Registry</h1>
              <div className="dashboard-subtitle">Client & Personnel Directory</div>
            </div>
          </div>

          {user?.is_super_admin && (
            <div className="access-badge">
              <CrownIcon /> Super Admin Access Active
            </div>
          )}
        </header>

        {/* 3. TABLE CONTAINER */}
        <div className="table-container">
          {users.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)", fontStyle: "italic", letterSpacing: "0.1em" }}>
              Synchronizing with central registry...
            </div>
          ) : (
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Registry ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Security Clearance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="id-cell">#{String(u.id).padStart(4, '0')}</td>
                    <td style={{ fontWeight: "500", letterSpacing: "0.05em" }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${
                        u.is_super_admin ? "role-super" : 
                        u.is_admin ? "role-admin" : "role-user"
                      }`}>
                        {u.is_super_admin ? "Super Admin" : u.is_admin ? "Admin" : "User"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;