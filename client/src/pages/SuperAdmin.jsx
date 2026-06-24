import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// ========================================================
// ELEGANT LUXURY ICONS
// ========================================================
const CrownIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--gold-pure)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(232, 195, 125, 0.4))" }}>
    <path d="M2 22h20M12 2l3 7h6l-5 4.5 2 7.5-6-4.5-6 4.5 2-7.5-5-4.5h6z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const LogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

function SuperAdmin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  if (!user?.is_super_admin) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    loadUsers();
    loadLogs();
  }, []);

  const loadUsers = () => {
    fetch("https://nova-dining-production.up.railway.app/api/admin/super/users", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  const loadLogs = () => {
    fetch("https://nova-dining-production.up.railway.app/api/admin/activity", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.log(err));
  };

  const makeAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to make this user an Admin?")) return;
    
    await fetch(`https://nova-dining-production.up.railway.app/api/admin/super/make-admin/${id}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    });
    loadUsers();
  };

  const removeAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to remove Admin rights from this user?")) return;

    await fetch(`https://nova-dining-production.up.railway.app/api/admin/super/remove-admin/${id}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    });
    loadUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
https://nova-dining-production.up.railway.app
    await fetch(`/api/admin/super/delete-user/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });

    loadUsers();
    loadLogs();
  };

  return (
    <div className="super-admin-interface">
      <style>{`
        /* =========================================
           NOVA DINING: BEAUTIFUL LUXURY DASHBOARD
           ========================================= */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold-pure: #E8C37D; 
          --gold-glow: rgba(232, 195, 125, 0.3);
          --glass-panel: rgba(15, 15, 18, 0.65); /* Beautiful frosted glass */
          --glass-border: rgba(255, 255, 255, 0.15);
          --text-main: #FFFFFF;
          --text-muted: #B0B0B8;
          --bg-void: #000000;
          --danger: #FF6B6B;
          --danger-glow: rgba(255, 107, 107, 0.15);
          --blue-accent: #60A5FA;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::selection { background: var(--gold-pure); color: var(--bg-void); }

        /* 1. STUNNING VISIBLE BACKGROUND */
        .super-admin-interface {
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
          /* Beautiful luxury wine vault/dining background */
          background-image: url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2500'); 
          background-size: cover;
          background-position: center;
          /* Adjusted filters so the image is very visible but still moody */
          filter: brightness(0.55) contrast(1.1) saturate(1.2);
          z-index: 0;
          animation: ambientPan 45s infinite alternate ease-in-out;
        }

        .epic-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          /* Soft vignette so the edges are dark but the center shines */
          background: radial-gradient(circle at 50% 40%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* 2. MAIN LAYOUT */
        .dashboard-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px 50px;
          display: flex;
          flex-direction: column;
          height: 100%;
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
          font-weight: 700;
          font-size: 2.6rem;
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
          background: rgba(20, 20, 25, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          padding: 25px 35px;
          border-radius: 12px;
          text-align: center;
          min-width: 160px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .stat-value {
          font-family: 'Cinzel', serif;
          font-size: 2.8rem;
          color: var(--text-main);
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        /* Nav Actions */
        .nav-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
        }

        .nav-btn {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          color: var(--text-main);
          border: 1px solid var(--glass-border);
          padding: 16px 32px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: var(--text-main);
          color: #000;
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* 3. SPLIT VIEWPORT (Users vs Logs) */
        .split-viewport {
          display: flex;
          gap: 40px;
          flex: 1;
          min-height: 0; /* Important for scroll */
        }

        .panel-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--glass-panel);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .panel-header {
          padding: 25px 35px;
          border-bottom: 1px solid var(--glass-border);
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .panel-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: var(--gold-pure);
          letter-spacing: 0.1em;
        }

        .scroll-zone {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }

        .scroll-zone::-webkit-scrollbar { width: 5px; }
        .scroll-zone::-webkit-scrollbar-thumb { background: var(--gold-pure); border-radius: 10px;}

        /* User Cards */
        .user-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .user-card:hover {
          border-color: rgba(232, 195, 125, 0.4);
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
        }

        .user-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .user-name {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 5px;
          font-weight: 600;
        }

        .user-email {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        /* Privilege Badges */
        .badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .badge-super { background: rgba(232, 195, 125, 0.15); color: var(--gold-pure); border: 1px solid var(--gold-pure); }
        .badge-admin { background: rgba(96, 165, 250, 0.15); color: var(--blue-accent); border: 1px solid var(--blue-accent); }
        .badge-user { background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--glass-border); }

        /* Action Buttons */
        .action-row {
          display: flex;
          gap: 12px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .btn-privilege {
          flex: 1;
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
          border: 1px solid var(--glass-border);
          padding: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .btn-privilege.grant:hover { background: rgba(96, 165, 250, 0.15); border-color: var(--blue-accent); color: var(--blue-accent); }
        .btn-privilege.revoke:hover { background: rgba(255,255,255,0.15); border-color: var(--text-main); }
        
        .btn-delete {
          background: transparent;
          color: var(--danger);
          border: 1px solid rgba(255, 107, 107, 0.4);
        }

        .btn-delete:hover {
          background: var(--danger-glow);
          border-color: var(--danger);
          box-shadow: 0 0 15px var(--danger-glow);
        }

        /* Activity Logs */
        .log-entry {
          display: flex;
          gap: 25px;
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s ease;
        }

        .log-entry:hover { background: rgba(255,255,255,0.03); }

        .log-time {
          font-size: 0.8rem;
          color: var(--gold-pure);
          min-width: 140px;
        }

        .log-content { flex: 1; }

        .log-user {
          font-weight: 600;
          color: var(--text-main);
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .log-action {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @keyframes ambientPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(-1%, -1%); }
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
            <CrownIcon />
            <div>
              <h1 className="dashboard-title">NOVA DINING</h1>
              <div className="dashboard-subtitle">Super Admin Dashboard</div>
            </div>
          </div>

          <div className="stat-cluster">
            <div className="stat-card">
              <div className="stat-value">{users.length}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: "var(--blue-accent)" }}>
                {users.filter(u => u.is_admin).length}
              </div>
              <div className="stat-label">Admins</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: "var(--gold-pure)" }}>
                {users.filter(u => u.is_super_admin).length}
              </div>
              <div className="stat-label">Super Admins</div>
            </div>
          </div>
        </header>

        {/* Global Navigation */}
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate("/tables-admin")}>Manage Tables</button>
          <button className="nav-btn" onClick={() => navigate("/admin")}>Reservations</button>
          <button className="nav-btn" onClick={() => navigate("/users")}>All Users</button>
        </div>

        {/* 3. SPLIT VIEWPORT */}
        <div className="split-viewport">
          
          {/* LEFT: USER MANAGEMENT */}
          <section className="panel-section">
            <div className="panel-header">
              <UsersIcon />
              <h2 className="panel-title">User Permissions</h2>
            </div>
            
            <div className="scroll-zone">
              {users.map(u => (
                <div key={u.id} className="user-card">
                  <div className="user-top">
                    <div>
                      <h3 className="user-name">{u.name}</h3>
                      <div className="user-email">{u.email}</div>
                    </div>
                    
                    <div>
                      {u.is_super_admin ? (
                        <span className="badge badge-super">Super Admin</span>
                      ) : u.is_admin ? (
                        <span className="badge badge-admin">Admin</span>
                      ) : (
                        <span className="badge badge-user">User</span>
                      )}
                    </div>
                  </div>

                  <div className="action-row">
                    {!u.is_admin && !u.is_super_admin && (
                      <button className="btn-privilege grant" onClick={() => makeAdmin(u.id)}>
                        Make Admin
                      </button>
                    )}

                    {u.is_admin && !u.is_super_admin && (
                      <button className="btn-privilege revoke" onClick={() => removeAdmin(u.id)}>
                        Remove Admin
                      </button>
                    )}

                    {!u.is_super_admin && (
                      <button className="btn-privilege btn-delete" onClick={() => deleteUser(u.id)}>
                        Delete User
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: SYSTEM LOGS */}
          <section className="panel-section">
            <div className="panel-header">
              <LogIcon />
              <h2 className="panel-title">Activity Logs</h2>
            </div>
            
            <div className="scroll-zone" style={{ padding: "10px 0" }}>
              {logs.map(log => (
                <div key={log.id} className="log-entry">
                  <div className="log-time">
                    {new Date(log.created_at).toLocaleTimeString([], { hour12: true, hour: '2-digit', minute:'2-digit' })}
                    <br/>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "4px", display: "inline-block" }}>
                      {new Date(log.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="log-content">
                    <div className="log-user">{log.name || "Unknown User"}</div>
                    <div className="log-action">{log.action}</div>
                  </div>
                </div>
              ))}
              
              {logs.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  No recent activity found in the logs.
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;
