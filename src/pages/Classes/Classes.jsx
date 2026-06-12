import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import ClassCard from "../../components/ClassCard/ClassCard";
import { CLASSES, SUBJECTS } from "../../data";
import "./Classes.css";

const Classes = () => {
  const [hoveredClass, setHoveredClass] = useState(null);
  const location = useLocation();
  const selectedPlan = location.state?.plan;

  return (
    <div className="classes-page page-wrapper">
      <ParticleBackground density={50} />

      {/* Page Header */}
      <section className="classes-hero section">
        <div className="classes-hero__orb" aria-hidden="true" />
        <div className="container">
          <div className="tag anim-fadeInUp">📚 All Classes</div>
          <h1 className="section-title anim-fadeInUp delay-1">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h1>
          <div className="divider anim-fadeInUp delay-2" />
          <p className="section-subtitle anim-fadeInUp delay-2">
            Structured, expert-curated video lessons for every class — from
            the very first steps to Grade 5 mastery.
          </p>
        </div>
      </section>

      {/* Class Grid */}
      <section className="section classes-grid-section">
        <div className="container">
          {selectedPlan && (
            <div className="classes-plan-banner glass-panel anim-fadeInUp">
              <p>
                You selected <strong>{selectedPlan.name}</strong>. Choose a class below to continue your purchase.
              </p>
            </div>
          )}
          <div className="classes-grid">
            {CLASSES.map((cls, i) => (
              <div
                key={cls.id}
                onMouseEnter={() => setHoveredClass(cls.id)}
                onMouseLeave={() => setHoveredClass(null)}
              >
                <ClassCard classData={cls} index={i} plan={selectedPlan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Overview */}
      <section className="section classes-subjects">
        <div className="classes-subjects__bg" aria-hidden="true" />
        <div className="container">
          <div className="tag">📖 Curriculum Overview</div>
          <h2 className="section-title">
            What You'll <span className="gradient-text">Learn</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginBottom: "var(--gap-xl)" }}>
            Every class has a carefully structured set of subjects with
            chapter-wise video lessons and practice material.
          </p>

          <div className="classes-subjects__grid">
            {CLASSES.map((cls) => (
              <div key={cls.id} className="subject-card glass-panel anim-fadeInUp">
                <div className="subject-card__header">
                  <span className="subject-card__emoji">{cls.emoji}</span>
                  <div>
                    <h3 className="subject-card__class">{cls.label}</h3>
                    <p className="subject-card__full">{cls.fullLabel}</p>
                  </div>
                </div>
                <ul className="subject-card__subjects">
                  {(SUBJECTS[cls.id] || []).map((subj) => (
                    <li key={subj} className="subject-card__subject">
                      <span className="subject-card__dot" style={{ background: cls.color }} />
                      {subj}
                    </li>
                  ))}
                </ul>
                <div className="subject-card__footer">
                  <span className="subject-card__count">
                    {(SUBJECTS[cls.id] || []).length} Subjects
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section classes-how">
        <div className="container">
          <div className="tag">🗺️ How It Works</div>
          <h2 className="section-title">
            Learning in <span className="gradient-text-purple">3 Simple Steps</span>
          </h2>
          <div className="divider" />
          <div className="classes-how__grid">
            {[
              { step: "01", icon: "🎯", title: "Pick Your Class", desc: "Select the right grade level for your child from LKG to Grade 5." },
              { step: "02", icon: "📘", title: "Choose a Subject", desc: "Browse subjects and chapters. Preview free lessons to get started right away." },
              { step: "03", icon: "🚀", title: "Watch & Learn", desc: "Engage with HD video lessons, take notes, and complete interactive exercises." },
            ].map(({ step, icon, title, desc }, i) => (
              <div key={i} className={`how-card glass-panel anim-fadeInUp delay-${i + 1}`}>
                <div className="how-card__step">{step}</div>
                <div className="how-card__icon">{icon}</div>
                <h3 className="how-card__title">{title}</h3>
                <p className="how-card__desc">{desc}</p>
                {i < 2 && <div className="how-card__arrow" aria-hidden="true">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
