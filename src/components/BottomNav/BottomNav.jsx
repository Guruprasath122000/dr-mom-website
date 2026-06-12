import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getStoredUser, clearStoredUser } from "../../utils/auth";
import "./BottomNav.css";

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

const BottomNav = () => {
    const [user, setUser] = useState(getStoredUser());
    const navigate = useNavigate();

    useEffect(() => {
        const onAuthChange = () => setUser(getStoredUser());
        window.addEventListener("doctormom-auth-change", onAuthChange);
        window.addEventListener("storage", onAuthChange);
        return () => {
            window.removeEventListener("doctormom-auth-change", onAuthChange);
            window.removeEventListener("storage", onAuthChange);
        };
    }, []);

    const handleLogout = () => {
        clearStoredUser();
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="bottom-nav" aria-label="Mobile bottom navigation">
            <div className="bottom-nav__inner container">
                {NAV_LINKS.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? "bottom-nav__link--active" : ""}`
                        }
                    >
                        <span className="bottom-nav__icon" aria-hidden="true">{icon}</span>
                        <span className="bottom-nav__label">{label}</span>
                    </NavLink>
                ))}
                {user ? (
                    <button
                        type="button"
                        className="bottom-nav__link bottom-nav__cta"
                        onClick={handleLogout}
                    >
                        <span className="bottom-nav__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16 11V8a4 4 0 0 0-8 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                            </svg>
                        </span>
                        <span className="bottom-nav__label">Logout</span>
                    </button>
                ) : (
                    <Link to="/login" className="bottom-nav__link bottom-nav__cta">
                        <span className="bottom-nav__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 16v1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <rect x="6" y="7" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                                <path d="M8 11h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span className="bottom-nav__label">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default BottomNav;
