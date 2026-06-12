import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionCard.css";

const SubscriptionCard = ({ plan, index = 0 }) => {
  const navigate = useNavigate();
  const { name, price, period, color, features, cta, popular, id } = plan;

  const handlePurchase = (e) => {
    if (e) e.stopPropagation();
    if (id === "full") {
      navigate("/payment", { state: { plan } });
    } else {
      navigate("/classes", { state: { plan } });
    }
  };

  return (
    <div
      className={`sub-card anim-fadeInUp ${popular ? "sub-card--popular" : ""}`}
      style={{ animationDelay: `${index * 0.1}s`, "--plan-color": color }}
      role="button"
      tabIndex={0}
      onClick={handlePurchase}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handlePurchase();
      }}
    >
      {popular && <div className="sub-card__popular-badge">Most Popular</div>}

      <div className="sub-card__top">
        <h3 className="sub-card__name">{name}</h3>
        <div className="sub-card__pricing">
          <span className="sub-card__price">{price}</span>
          <span className="sub-card__period">{period}</span>
        </div>
      </div>

      <ul className="sub-card__features">
        {features.map((f) => (
          <li key={f} className="sub-card__feature">
            <span className="sub-card__check">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button className="sub-card__btn" onClick={handlePurchase}>
        {cta} →
      </button>
    </div>
  );
};

export default SubscriptionCard;
