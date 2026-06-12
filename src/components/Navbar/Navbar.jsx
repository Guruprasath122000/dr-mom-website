import React, { useState, useEffect, useCallback } from "react";
import Logo from "../../Assets/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getStoredUser, clearStoredUser } from "../../utils/auth";
import "./Navbar.css";

const NAV_LINKS = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 11.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/classes",
    label: "Classes",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 13.5v4.5l8 4.5 8-4.5V13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 18h16M4 12h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(getStoredUser());
  const navigate = useNavigate();

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    const onAuthChange = () => setUser(getStoredUser());
    window.addEventListener("doctormom-auth-change", onAuthChange);
    window.addEventListener("storage", onAuthChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("doctormom-auth-change", onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, [onScroll]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--open" : ""}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <img src={Logo} alt="Dr Mom 2.0" className="navbar__logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="navbar__actions">
            {user ? (
              <div className="navbar__user-actions">
                <span className="navbar__user-name">Hi, {user.name.split(" ")[0]}</span>
                <button className="navbar__logout-btn btn btn-outline" onClick={handleLogout} type="button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar__login-btn">
                <span className="navbar__login-icon">⊙</span>
                Student Login
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}>
          <nav className="navbar__drawer-nav">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `navbar__drawer-link ${isActive ? "navbar__drawer-link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                className="btn btn-primary navbar__drawer-cta"
                onClick={() => { setMenuOpen(false); handleLogout(); }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary navbar__drawer-cta"
                onClick={() => setMenuOpen(false)}
              >
                Student Login
              </Link>
            )}
          </nav>
        </div>

        {menuOpen && (
          <div
            className="navbar__overlay"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    </>
  );
};

export default Navbar;
