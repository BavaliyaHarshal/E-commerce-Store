import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = memo(() => {
  const [showDeletedProductsLink, setShowDeletedProductsLink] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        setShowDeletedProductsLink((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <style>
        {`
          .navbar-iv-anim {
            animation: navbarSlideDown 0.7s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes navbarSlideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .user-info {
            display: flex;
            align-items: center;
          }
          .user-name {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.5rem;
            background-color: #f0f4ff;
            color: #4f8cff;
            font-weight: 600;
            margin-right: 10px;
          }
          .navbar-nav .nav-link {
            font-weight: 500;
            color: #4f8cff;
          }
          .navbar-nav .nav-link:hover {
            color: #3a6ed1;
          }
          .navbar-nav .nav-link.btn {
            background-color: transparent;
            border: none;
            padding: 0.5rem 1rem;
            transition: background-color 0.2s ease;
          }
          .navbar-nav .nav-link.btn:hover {
            background-color: rgba(79, 140, 255, 0.1);
          }
          .navbar-toggler {
            border: none;
          }
          .navbar-custom {
            border-radius: 0 0 1rem 1rem;
            box-shadow: 0 2px 8px rgba(60,60,90,0.06);
            position: sticky;
            top: 0;
            z-index: 1050;
          }
          .logout-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
          }
          .logout-modal-content {
            background: #fff;
            border-radius: 0.5rem;
            padding: 2rem;
            box-shadow: 0 2px 16px rgba(0,0,0,0.15);
            width: 400px;
            height: 200px;
            text-align: center;
          }
          .logout-modal-actions {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 navbar-iv-anim navbar-custom">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand d-lg-none"
            style={{ fontWeight: 600, color: "#4f8cff" }}
          ></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    All Products
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Cart
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" style={{ textDecoration: "none" }}>
                  <button className="nav-link btn" type="button">
                    Previous Orders
                  </button>
                </Link>
              </li>
              {showDeletedProductsLink && (
                <li className="nav-item">
                  <Link
                    to="/deleted-products"
                    style={{ textDecoration: "none" }}
                  >
                    <button className="nav-link btn" type="button">
                      Deleted Products
                    </button>
                  </Link>
                </li>
              )}
            </ul>
            <div className="ms-auto d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <div className="user-info">
                    <span className="user-name">
                      Hello, {localStorage.getItem("username") || "User"}
                    </span>
                  </div>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/" className="btn btn-outline-primary ms-2">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-content">
            <h5>Confirm Logout</h5>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button className="btn btn-danger" onClick={confirmLogout}>
                Yes, Logout
              </button>
              <button className="btn btn-secondary" onClick={cancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Navbar;
