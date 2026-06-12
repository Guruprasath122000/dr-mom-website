import React from "react";
import { useNavigate } from "react-router-dom";
import "./ClassCard.css";

const ClassCard = ({ classData, index = 0, plan }) => {
  const navigate = useNavigate();
  const { id, label, fullLabel, color, emoji, tagline, students } = classData;
  const ctaText = plan ? "Continue" : "Explore →";

  return (
    <button
      className="class-card anim-fadeInUp"
      style={{ animationDelay: `${index * 0.07}s`, "--card-color": color }}
      onClick={() => navigate(`/classes/${id}`, { state: plan ? { plan } : undefined })}
      aria-label={plan ? `Continue ${plan.name} for ${fullLabel}` : `Explore ${fullLabel}`}
    >
      <div className="class-card__glow" aria-hidden="true" />

      <div className="class-card__header">
        <span className="class-card__emoji" aria-hidden="true">{emoji}</span>
        <span className="class-card__students">{students} students</span>
      </div>

      <div className="class-card__body">
        <h3 className="class-card__label">{label}</h3>
        <p className="class-card__full">{fullLabel}</p>
        <p className="class-card__tagline">{tagline}</p>
      </div>

      <div className="class-card__footer">
        <span className="class-card__cta">
          {ctaText}
        </span>
        <span className="class-card__badge">5 Subjects</span>
      </div>

      <div className="class-card__shine" aria-hidden="true" />
    </button>
  );
};

export default ClassCard;
