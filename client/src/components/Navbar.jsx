import { Link, useNavigate } from "react-router-dom";

// Helper component for razor-sharp luxury icons
const Icon = ({ path, color = "currentColor", size = 16 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter"
    style={{ transition: "all 0.4s ease" }}
    className="nav-icon"
  >
    <path d={path} />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  let user = null;

  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      user = JSON.parse(savedUser);
    }
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          /* Core Black Card Aesthetic */
          .billionaire-nav {
            position: sticky;
            top: 0;
            z-index: 999;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: rgba(5, 5, 5, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
            font-family: "Inter", "Helvetica Neue", sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          /* The "Fading" Gold Divider under the nav */
          .billionaire-nav::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
          }

          /* Brand Section */
          .brand-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            cursor: pointer;
          }

          .brand-title {
            font-family: "Playfair Display", "Didot", serif;
            font-size: 28px;
            margin: 0;
            letter-spacing: 6px;
            background: linear-gradient(to right, #ffffff, #d4af37, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            font-weight: 400;
          }

          .brand-subtitle {
            font-size: 9px;
            color: #888;
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-top: 4px;
          }

          /* Navigation Links */
          .nav-links {
            display: flex;
            gap: 40px;
            align-items: center;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #a3a3a3;
            text-decoration: none;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 300;
            position: relative;
            padding: 8px 0;
            transition: color 0.4s ease;
          }

          /* The sweep effect */
          .nav-item::after {
            content: '';
            position: absolute;
            width: 0;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #d4af37;
            transition: width 0.4s ease;
          }

          .nav-item:hover {
            color: #ffffff;
          }

          .nav-item:hover .nav-icon {
            stroke: #d4af37; /* Icon turns gold on hover */
            transform: scale(1.1);
          }

          .nav-item:hover::after {
            width: 100%;
          }

          /* VIP Admin Links */
          .nav-item-director {
            color: #d4af37;
            font-weight: 400;
          }

          /* Right Section - User Profile */
          .right-panel {
            display: flex;
            align-items: center;
            gap: 25px;
          }

          /* Exclusive Membership Card Look */
          .member-badge {
            display: flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%);
            border: 1px solid rgba(212, 175, 55, 0.2);
            padding: 6px 16px 6px 6px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          }

          .member-avatar {
            width: 30px;
            height: 30px;
            background: #d4af37;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            font-weight: bold;
            font-family: serif;
          }

          .member-details {
            display: flex;
            flex-direction: column;
          }

          .member-tier {
            font-size: 8px;
            color: #d4af37;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .member-name {
            font-size: 12px;
            color: #fff;
            letter-spacing: 1px;
            font-weight: 300;
          }

          /* Ultra High-End Buttons */
          .luxury-btn {
            font-family: "Inter", sans-serif;
            font-size: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            padding: 12px 24px;
            border-radius: 2px; /* Razor sharp */
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.4s ease;
          }

          .btn-solid {
            background: #d4af37;
            border: 1px solid #d4af37;
            color: #050505;
            font-weight: 500;
          }

          .btn-solid:hover {
            background: #fdf5e6;
            border-color: #fdf5e6;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          }

          .btn-outline {
            background: transparent;
            border: 1px solid #444;
            color: #aaa;
          }

          .btn-outline:hover {
            border-color: #d4af37;
            color: #fff;
          }

          .btn-logout {
            background: transparent;
            border: none;
            color: #666;
            padding: 8px;
          }

          .btn-logout:hover {
            color: #ff4d4d;
          }
        `}
      </style>

      <nav className="billionaire-nav">
        
        {/* Brand */}
        <div className="brand-box" onClick={() => navigate("/")}>
          <h1 className="brand-title">NOVA</h1>
          <span className="brand-subtitle">Private Society</span>
        </div>

        {/* Links with SVG Icons */}
        <div className="nav-links">
          <Link to="/" className="nav-item">
            <Icon path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />
            Home
          </Link>

          {user && (
            <Link to="/book" className="nav-item">
              <Icon path="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z M16 2v4 M8 2v4 M3 10h18" />
              Reserve
            </Link>
          )}

          {user && (
            <Link to="/history" className="nav-item">
              <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />
              Reservations
            </Link>
          )}

          {user?.is_admin && (
            <Link to="/admin" className="nav-item">
              <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              Operations
            </Link>
          )}

          {user?.is_super_admin && (
            <Link to="/super-admin" className="nav-item nav-item-director">
              <Icon path="M6 3h12l4 5-10 13L2 8z M12 21V8 M2 8h20 M6 3l6 5 6-5" />
              Director
            </Link>
          )}
        </div>

        {/* Auth / User Badge */}
        <div className="right-panel">
          {user ? (
            <>
              {/* Luxury Membership Card */}
              <div className="member-badge">
                <div className="member-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="member-details">
                  <span className="member-tier">Nova Member</span>
                  <span className="member-name">{user.name}</span>
                </div>
              </div>

              {/* Minimal Logout Icon */}
              <button className="luxury-btn btn-logout" onClick={logout} title="Sign Out">
                <Icon path="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="luxury-btn btn-outline">
                  <Icon path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  Access
                </button>
              </Link>

              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="luxury-btn btn-solid">
                  <Icon path="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  Inquire
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
