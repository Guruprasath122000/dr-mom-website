import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import ClassCard from "../../components/ClassCard/ClassCard";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import { CLASSES, SUBSCRIPTION_PLANS, STATS, TESTIMONIALS } from "../../data";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home page-wrapper">
      <ParticleBackground density={70} />

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero__bg-orbs" aria-hidden="true">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        <div className="container hero__inner">
          <div className="hero__content">
            <div className="tag anim-fadeInUp">
              <span>✦</span> India's #1 Kids Learning Platform
            </div>

            <h1 className="hero__heading anim-fadeInUp delay-1">
              Where Young{" "}
              <span className="hero__heading-accent">Minds</span>
              <br />
              <em className="hero__heading-em">Discover & Grow</em>
            </h1>

            <p className="hero__sub anim-fadeInUp delay-2">
              Premium video lessons for LKG to Grade 5 — crafted by expert
              educators, designed to make every child love learning.
            </p>

            <div className="hero__actions anim-fadeInUp delay-3">
              <Link to="/classes" className="btn btn-primary hero__btn-primary">
                Start Learning Free
              </Link>
              <Link to="/about" className="btn btn-outline">
                How It Works ↗
              </Link>
            </div>

            <div className="hero__trust anim-fadeInUp delay-4">
              <div className="hero__avatars">
                {["P", "R", "A", "M", "S"].map((l, i) => (
                  <span
                    key={i}
                    className="hero__avatar"
                    style={{ background: ["#6b3fa0", "#0d9488", "#c2410c", "#1e40af", "#b45309"][i] }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <p className="hero__trust-text">
                <strong>50,000+ happy students</strong> across India
              </p>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero__visual anim-scaleIn delay-2">
            <div className="hero__card-stack">
              <div className="hero__float-card hero__float-card--main glass-panel">
                <div className="hero__video-preview">
                  <div className="hero__video-icon">▶</div>
                  <div className="hero__video-meta">
                    <span className="hero__video-label">Grade 3 · Science</span>
                    <span className="hero__video-title">The Water Cycle</span>
                  </div>
                </div>
                <div className="hero__progress-bar">
                  <div className="hero__progress-fill" />
                </div>
              </div>

              <div className="hero__float-card hero__float-card--stats glass-panel">
                <span className="hero__stat-emoji">🌟</span>
                <div>
                  <p className="hero__stat-val">4.9/5</p>
                  <p className="hero__stat-label">Student Rating</p>
                </div>
              </div>

              <div className="hero__float-card hero__float-card--badge glass-panel">
                <span>🏆</span>
                <span className="hero__badge-text">Lesson Complete!</span>
              </div>

              <div className="hero__orbit-ring" aria-hidden="true">
                <div className="hero__orbit-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero__stats-bar">
          <div className="container hero__stats-inner">
            {STATS.map((s, i) => (
              <div key={i} className="hero__stat-item">
                <span className="hero__stat-number">{s.value}</span>
                <span className="hero__stat-desc">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLASSES ══════════ */}
      <section className="section home-classes">
        <div className="container">
          <div className="home-classes__header">
            <div>
              <div className="tag">📚 All Classes</div>
              <h2 className="section-title">
                Choose Your <span className="gradient-text">Class</span>
              </h2>
              <div className="divider" />
              <p className="section-subtitle">
                Structured learning journeys from LKG through Grade 5, with
                age-appropriate content for every stage.
              </p>
            </div>
            <Link to="/classes" className="btn btn-outline home-classes__view-all">
              View All Classes →
            </Link>
          </div>

          <div className="home-classes__grid">
            {CLASSES.map((cls, i) => (
              <ClassCard key={cls.id} classData={cls} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="section home-features">
        <div className="home-features__bg" aria-hidden="true" />
        <div className="container">
          <div className="home-features__header">
            <div className="tag">⚡ Why Dr Mom 2.0</div>
            <h2 className="section-title">
              Learning That Feels Like <span className="gradient-text-purple">Magic</span>
            </h2>
            <div className="divider" />
          </div>

          <div className="home-features__grid">
            {[
              { icon: "🎬", title: "HD Video Lessons", desc: "Crystal-clear videos with expert narration, animations, and real-world examples that make concepts stick." },
              { icon: "🗺️", title: "Structured Curriculum", desc: "Chapter-by-chapter progression aligned to the national syllabus, reviewed by certified educators." },
              { icon: "🔄", title: "Learn at Your Pace", desc: "Rewatch lessons as many times as needed. No pressure, no deadlines — just pure learning joy." },
              { icon: "📋", title: "Practice Worksheets", desc: "Downloadable activity sheets with every chapter to reinforce learning away from screens." },
              { icon: "📊", title: "Progress Tracking", desc: "Parents can see exactly which chapters are done, quiz scores, and time spent learning." },
              { icon: "🧑‍🏫", title: "Expert Educators", desc: "Every lesson is created by certified teachers with 10+ years of classroom experience." },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className={`feat-card glass-panel anim-fadeInUp delay-${i % 4 + 1}`}>
                <div className="feat-card__icon">{icon}</div>
                <h3 className="feat-card__title">{title}</h3>
                <p className="feat-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SUBSCRIPTION ══════════ */}
      <section className="section home-pricing" id="pricing">
        <div className="container">
          <div className="home-pricing__header">
            <div className="tag">💎 Pricing</div>
            <h2 className="section-title">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <div className="divider" />
            <p className="section-subtitle">
              Choose the plan that works best for your child. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="home-pricing__grid">
            {SUBSCRIPTION_PLANS.map((plan, i) => (
              <SubscriptionCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section home-testimonials">
        <div className="home-testimonials__bg" aria-hidden="true" />
        <div className="container">
          <div className="home-testimonials__header">
            <div className="tag">💬 What Parents Say</div>
            <h2 className="section-title">
              Trusted by <span className="gradient-text">Thousands</span>
            </h2>
            <div className="divider" />
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card glass-panel anim-fadeInUp ${i === activeTestimonial ? "testimonial-card--active" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="testimonial-card__stars">
                  {"★".repeat(t.rating)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonials-dot ${i === activeTestimonial ? "testimonials-dot--active" : ""}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="section home-cta">
        <div className="container">
          <div className="home-cta__card glass-panel">
            <div className="home-cta__glow" aria-hidden="true" />
            <div className="home-cta__content">
              <div className="tag">🚀 Get Started Today</div>
              <h2 className="home-cta__title">
                Give Your Child the Gift of{" "}
                <span className="gradient-text">Brilliant Learning</span>
              </h2>
              <p className="home-cta__sub">
                Join 50,000+ families who have made Dr Mom 2.0 their child's
                favourite learning companion.
              </p>
              <div className="home-cta__actions">
                <Link to="/classes" className="btn btn-primary">
                  Explore Classes Free →
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Talk to Us
                </Link>
              </div>
            </div>
            <div className="home-cta__emoji-wall" aria-hidden="true">
              {["🌱", "🌟", "🚀", "🦋", "🔬", "🎯", "🏆", "📚", "✦", "🎨"].map((e, i) => (
                <span key={i} className="home-cta__emoji" style={{ animationDelay: `${i * 0.3}s` }}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
