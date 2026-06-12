import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import "./Payment.css";

const BANKS = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank", "PNB", "BOB"];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, classInfo, video, chapter } = location.state || {};
  const selectedVideo = video || null;

  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  // Fallback plan if arrived directly
  const activePlan = plan || (selectedVideo ? {
    name: selectedVideo.title,
    price: selectedVideo.price || "₹19",
    period: "Single Video",
    color: classInfo?.color || "#38bdf8",
    features: [
      `Chapter: ${selectedVideo.chapter}`,
      `Class: ${classInfo?.fullLabel || "Selected Class"}`,
      "HD video access",
      "Downloadable notes",
    ],
  } : {
    name: "Class Package", price: "₹499", period: "per class/year",
    color: "#34d399", features: ["All subjects", "HD Video", "Notes & Worksheets"],
  });
  const activeClass = classInfo || { fullLabel: "Selected Class", emoji: "📚", color: "#34d399" };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "expiry") value = value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);
    setCard((c) => ({ ...c, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate payment gateway (Razorpay / PayU / Stripe)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="payment-page page-wrapper">
        <ParticleBackground density={40} />
        <div className="container payment-success">
          <div className="payment-success__card glass-panel">
            <div className="payment-success__icon">🎉</div>
            <h2 className="payment-success__title">Payment Successful!</h2>
            <p className="payment-success__sub">
              Welcome to Dr Mom 2.0! Your <strong>{activePlan.name}</strong> is now active.
            </p>
            <div className="payment-success__detail">
              <span>{activeClass.emoji} {activeClass.fullLabel}</span>
              <span className="payment-success__amount" style={{ color: activePlan.color }}>
                {activePlan.price}
              </span>
            </div>
            <div className="payment-success__video-detail">
              {selectedVideo ? (
                <>
                  <p><strong>Lesson:</strong> {selectedVideo.title}</p>
                  <p><strong>Chapter:</strong> {selectedVideo.chapter}</p>
                  <p><strong>Class:</strong> {activeClass.fullLabel}</p>
                </>
              ) : (
                <p><strong>Class:</strong> {activeClass.fullLabel}</p>
              )}
            </div>
            <p className="payment-success__receipt">
              A confirmation has been sent to your email. Order ID: <code>ES-{Date.now().toString().slice(-8)}</code>
            </p>
            <div className="payment-success__actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(classInfo ? `/classes/${classInfo.id}` : "/classes")}
              >
                Start Learning →
              </button>
              <Link to="/" className="btn btn-outline">Go to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page page-wrapper">
      <ParticleBackground density={35} />

      {/* Breadcrumb */}
      <div className="payment-breadcrumb">
        <div className="container payment-breadcrumb__inner">
          <Link to="/" className="payment-breadcrumb__link">Home</Link>
          <span>›</span>
          {classInfo && <><Link to={`/classes/${classInfo.id}`} className="payment-breadcrumb__link">{classInfo.fullLabel}</Link><span>›</span></>}
          <span className="payment-breadcrumb__current">Payment</span>
        </div>
      </div>

      <div className="container payment-grid">

        {/* ── Left: Order Summary ── */}
        <aside className="payment-summary">
          <div className="payment-summary__card glass-panel">
            <h3 className="payment-summary__heading">Order Summary</h3>

            <div className="payment-summary__plan" style={{ "--plan-color": activePlan.color }}>
              <div className="payment-summary__plan-top">
                <span className="payment-summary__emoji">{activeClass.emoji}</span>
                <div>
                  <p className="payment-summary__plan-name">{activePlan.name}</p>
                  <p className="payment-summary__class">{activeClass.fullLabel}</p>
                </div>
              </div>
              <div className="payment-summary__price-row">
                <span className="payment-summary__price" style={{ color: activePlan.color }}>
                  {activePlan.price}
                </span>
                <span className="payment-summary__period">{activePlan.period}</span>
              </div>
              <div className="payment-summary__video-detail">
                {selectedVideo ? (
                  <>
                    <p><strong>Lesson:</strong> {selectedVideo.title}</p>
                    <p><strong>Chapter:</strong> {selectedVideo.chapter}</p>
                    <p><strong>Class:</strong> {activeClass.fullLabel}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Class:</strong> {activeClass.fullLabel}</p>
                    {chapter && <p><strong>Chapter:</strong> {chapter}</p>}
                  </>
                )}
              </div>
            </div>

            <ul className="payment-summary__features">
              {(activePlan.features || []).map((f) => (
                <li key={f}>
                  <span className="payment-summary__check" style={{ color: activePlan.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="payment-summary__total">
              <div className="payment-summary__row">
                <span>Subtotal</span>
                <span>{activePlan.price}</span>
              </div>
              <div className="payment-summary__row">
                <span>GST (18%)</span>
                <span className="payment-summary__gst">Included</span>
              </div>
              <div className="payment-summary__row payment-summary__row--total">
                <span>Total</span>
                <span style={{ color: activePlan.color }}>{activePlan.price}</span>
              </div>
            </div>

            <div className="payment-summary__secure">
              <span>🔒</span>
              <span>256-bit SSL Secured Checkout</span>
            </div>
          </div>

          {/* Accepted payments */}
          <div className="payment-accepted glass-panel">
            <p className="payment-accepted__label">We accept</p>
            <div className="payment-accepted__logos">
              {["Visa", "MC", "RuPay", "UPI", "NetBanking"].map((p) => (
                <span key={p} className="payment-accepted__logo">{p}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right: Payment Form ── */}
        <main className="payment-form-section">
          <div className="payment-form-card glass-panel">
            <h2 className="payment-form__title">Complete Your Payment</h2>

            {/* Method Selector */}
            <div className="payment-methods">
              {[
                { id: "card", label: "💳 Card" },
                { id: "upi", label: "📱 UPI" },
                { id: "netbank", label: "🏦 Net Banking" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  className={`payment-method-btn ${method === id ? "payment-method-btn--active" : ""}`}
                  onClick={() => setMethod(id)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <form className="payment-form" onSubmit={handleSubmit}>

              {/* ── Card ── */}
              {method === "card" && (
                <div className="payment-form__fields anim-fadeInUp">
                  {/* Card Preview */}
                  <div className="card-preview" style={{ "--card-accent": activePlan.color }}>
                    <div className="card-preview__chip">▣</div>
                    <div className="card-preview__number">
                      {(card.number || "•••• •••• •••• ••••").padEnd(19, "•")}
                    </div>
                    <div className="card-preview__bottom">
                      <div>
                        <p className="card-preview__label">Card Holder</p>
                        <p className="card-preview__val">{card.name || "YOUR NAME"}</p>
                      </div>
                      <div>
                        <p className="card-preview__label">Expires</p>
                        <p className="card-preview__val">{card.expiry || "MM/YY"}</p>
                      </div>
                      <div className="card-preview__network">VISA</div>
                    </div>
                  </div>

                  <div className="pf-field">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      id="card-number" name="number" type="text" required
                      placeholder="1234 5678 9012 3456"
                      value={card.number} onChange={handleCardChange}
                    />
                  </div>
                  <div className="pf-field">
                    <label htmlFor="card-name">Name on Card</label>
                    <input
                      id="card-name" name="name" type="text" required
                      placeholder="As printed on your card"
                      value={card.name} onChange={handleCardChange}
                    />
                  </div>
                  <div className="pf-row">
                    <div className="pf-field">
                      <label htmlFor="card-expiry">Expiry Date</label>
                      <input
                        id="card-expiry" name="expiry" type="text" required
                        placeholder="MM/YY"
                        value={card.expiry} onChange={handleCardChange}
                      />
                    </div>
                    <div className="pf-field">
                      <label htmlFor="card-cvv">CVV</label>
                      <input
                        id="card-cvv" name="cvv" type="password" required
                        placeholder="•••"
                        value={card.cvv} onChange={handleCardChange}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── UPI ── */}
              {method === "upi" && (
                <div className="payment-form__fields anim-fadeInUp">
                  <div className="upi-info glass-panel">
                    <div className="upi-qr">
                      <div className="upi-qr__mock">
                        <div className="upi-qr__grid">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`upi-qr__cell ${Math.random() > 0.5 ? "upi-qr__cell--filled" : ""}`} />
                          ))}
                        </div>
                        <p className="upi-qr__label">Scan to Pay</p>
                      </div>
                    </div>
                    <p className="upi-or">— or enter UPI ID —</p>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="upi-id">UPI ID</label>
                    <input
                      id="upi-id" type="text" required
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="upi-apps">
                    {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                      <button key={app} type="button" className="upi-app-btn">{app}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Net Banking ── */}
              {method === "netbank" && (
                <div className="payment-form__fields anim-fadeInUp">
                  <div className="nb-banks">
                    {BANKS.map((b) => (
                      <button
                        key={b} type="button"
                        className={`nb-bank-btn ${bank === b ? "nb-bank-btn--active" : ""}`}
                        onClick={() => setBank(b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {!bank && (
                    <p className="nb-hint">Select your bank to continue</p>
                  )}
                </div>
              )}

              {/* User Details */}
              <div className="pf-divider" />
              <h4 className="pf-section-label">Contact Details</h4>
              <div className="pf-row">
                <div className="pf-field">
                  <label htmlFor="pf-name">Full Name</label>
                  <input id="pf-name" type="text" required placeholder="Parent / Guardian name" />
                </div>
                <div className="pf-field">
                  <label htmlFor="pf-email">Email</label>
                  <input id="pf-email" type="email" required placeholder="Receipt will be sent here" />
                </div>
              </div>
              <div className="pf-field">
                <label htmlFor="pf-phone">Mobile Number</label>
                <input id="pf-phone" type="tel" required placeholder="+91 98765 43210" />
              </div>

              <button
                type="submit"
                className="payment-submit-btn"
                disabled={loading}
                style={{ "--plan-color": activePlan.color }}
              >
                {loading ? (
                  <span className="payment-submit-btn__loading">
                    <span className="payment-spinner" />
                    Processing Payment...
                  </span>
                ) : (
                  <>Pay {activePlan.price} Securely 🔒</>
                )}
              </button>

              <p className="payment-form__disclaimer">
                By completing this purchase you agree to Dr Mom 2.0's{" "}
                <a href="#!">Terms of Service</a> and <a href="#!">Refund Policy</a>.
                Payments are processed securely. 7-day money-back guarantee.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payment;
