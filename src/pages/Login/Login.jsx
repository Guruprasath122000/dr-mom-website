import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import { setStoredUser } from "../../utils/auth";
import "./Login.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", class: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // TODO: connect to backend auth
    setTimeout(() => {
      setLoading(false);
      const name = mode === "register" && form.name ? form.name.trim() : (form.name || form.email.split("@")[0]).trim();
      setStoredUser({
        name: name || "Student",
        email: form.email.trim(),
        class: form.class || "",
      });
      alert(mode === "login" ? "Login successful! 🎉" : "Account created! Welcome to Dr Mom 2.0 🌟");
      navigate("/");
    }, 1200);
  };

  return (
    <div className="login-page page-wrapper">
      <ParticleBackground density={50} />

      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <div className="login-left__content">
            <Link to="/" className="login-logo">
              <span className="login-logo__icon">DM</span>
              Dr Mom <span className="login-logo__accent">2.0</span>
            </Link>
            <h2 className="login-left__title">
              Start Your<br />
              <span className="gradient-text">Learning Journey</span>
            </h2>
            <p className="login-left__sub">
              Access thousands of premium video lessons, track your progress,
              and grow with India's best EdTech platform.
            </p>

            <div className="login-left__features">
              {[
                { icon: "🎬", text: "2,000+ HD Video Lessons" },
                { icon: "📋", text: "Practice Worksheets & Notes" },
                { icon: "📊", text: "Real-time Progress Tracking" },
                { icon: "🧑‍🏫", text: "Expert-certified Teachers" },
              ].map(({ icon, text }) => (
                <div key={text} className="login-left__feature">
                  <span className="login-left__feature-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="login-left__reviews">
              <div className="login-left__avatars">
                {["A", "B", "C", "D"].map((l, i) => (
                  <span key={l} className="login-left__avatar" style={{ background: ["#6b3fa0", "#0d9488", "#c2410c", "#1e40af"][i] }}>{l}</span>
                ))}
              </div>
              <p>Joined by <strong>50,000+</strong> happy learners</p>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="login-right">
          <div className="login-form-card glass-panel">
            {/* Tab Toggle */}
            <div className="login-tabs">
              <button
                className={`login-tab ${mode === "login" ? "login-tab--active" : ""}`}
                onClick={() => { setMode("login"); setError(""); }}
              >
                Sign In
              </button>
              <button
                className={`login-tab ${mode === "register" ? "login-tab--active" : ""}`}
                onClick={() => { setMode("register"); setError(""); }}
              >
                Create Account
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <p className="login-form__welcome">
                {mode === "login"
                  ? "Welcome back! ✨"
                  : "Join Dr Mom 2.0 today 🚀"}
              </p>

              {/* Name — register only */}
              {mode === "register" && (
                <div className="login-field">
                  <label htmlFor="name">Student Name</label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon">👤</span>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Enter student's full name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Class — register only */}
              {mode === "register" && (
                <div className="login-field">
                  <label htmlFor="class">Select Class</label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon">📚</span>
                    <select
                      id="class" name="class" required
                      value={form.class} onChange={handleChange}
                    >
                      <option value="">-- Select Class --</option>
                      {["LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="login-field">
                <label htmlFor="email">Email Address</label>
                <div className="login-field__wrap">
                  <span className="login-field__icon">✉️</span>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="parent@email.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label htmlFor="password">Password</label>
                <div className="login-field__wrap">
                  <span className="login-field__icon">🔒</span>
                  <input
                    id="password" name="password"
                    type={showPass ? "text" : "password"} required
                    placeholder="Enter your password"
                    value={form.password} onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="login-field__toggle"
                    onClick={() => setShowPass((p) => !p)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Confirm Password — register only */}
              {mode === "register" && (
                <div className="login-field">
                  <label htmlFor="confirm">Confirm Password</label>
                  <div className="login-field__wrap">
                    <span className="login-field__icon">🔑</span>
                    <input
                      id="confirm" name="confirm"
                      type={showPass ? "text" : "password"} required
                      placeholder="Re-enter password"
                      value={form.confirm} onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Forgot */}
              {mode === "login" && (
                <div className="login-forgot">
                  <a href="#!">Forgot password?</a>
                </div>
              )}

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
                {loading ? (
                  <span className="login-submit__loading">
                    <span className="login-spinner" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  mode === "login" ? "Sign In →" : "Create Account →"
                )}
              </button>

              <p className="login-form__footer">
                {mode === "login" ? (
                  <>Don't have an account?{" "}<button type="button" className="login-switch" onClick={() => setMode("register")}>Sign Up Free</button></>
                ) : (
                  <>Already a member?{" "}<button type="button" className="login-switch" onClick={() => setMode("login")}>Sign In</button></>
                )}
              </p>

              <p className="login-terms">
                By continuing, you agree to Dr Mom 2.0's{" "}
                <a href="#!">Terms</a> and <a href="#!">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
