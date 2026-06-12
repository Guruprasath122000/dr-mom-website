import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground";
import VideoCard from "../../components/VideoCard/VideoCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { CLASSES, SUBJECTS, VIDEOS_DATA, SUBSCRIPTION_PLANS } from "../../data";
import "./VideoContent.css";

const VideoContent = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pricingRef = useRef(null);
  const selectedPlan = location.state?.plan;

  const classInfo = CLASSES.find((c) => c.id === classId);
  const subjects = SUBJECTS[classId] || [];
  const allVideos = VIDEOS_DATA[classId] || {};

  const [activeSubject, setActiveSubject] = useState(subjects[0] || "");
  const [activeChapter, setActiveChapter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [planNotice, setPlanNotice] = useState("");

  const handleUnlock = (video) => {
    if (video && typeof video === "object" && video.id) {
      navigate("/payment", {
        state: {
          plan: SUBSCRIPTION_PLANS[0],
          classInfo,
          video,
        },
      });
    }
  };

  const handleShowPricing = () => {
    setShowPricing(true);
    setTimeout(() => {
      if (pricingRef.current) {
        pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handlePlanPurchase = (plan) => {
    if (plan.id === "chapter" && activeChapter === "all") {
      setPlanNotice("Please select a chapter before continuing to checkout.");
      return;
    }

    setPlanNotice("");
    navigate("/payment", {
      state: {
        plan,
        classInfo,
        chapter: activeChapter !== "all" ? activeChapter : undefined,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeSubject]);

  useEffect(() => {
    if (selectedPlan && selectedPlan.id !== "single") {
      setShowPricing(true);
      setTimeout(() => {
        if (pricingRef.current) {
          pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    }
  }, [selectedPlan]);

  useEffect(() => { setActiveChapter("all"); }, [activeSubject]);

  const subjectVideos = useMemo(() => allVideos[activeSubject] || [], [allVideos, activeSubject]);

  const chapters = useMemo(() => {
    const seen = new Set();
    return subjectVideos.filter((v) => {
      if (seen.has(v.chapter)) return false;
      seen.add(v.chapter); return true;
    }).map((v) => ({ label: v.chapter, index: v.chapterIndex }));
  }, [subjectVideos]);

  const filteredVideos = useMemo(() => subjectVideos.filter((v) => {
    const mc = activeChapter === "all" || v.chapter === activeChapter;
    const ms = !searchTerm || v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.chapter.toLowerCase().includes(searchTerm.toLowerCase());
    return mc && ms;
  }), [subjectVideos, activeChapter, searchTerm]);

  const freeCount = filteredVideos.filter((v) => !v.isLocked).length;
  const lockedCount = filteredVideos.filter((v) => v.isLocked).length;

  if (!classInfo) {
    return (
      <div className="page-wrapper vc-not-found">
        <div className="container">
          <h2>Class not found</h2>
          <Link to="/classes" className="btn btn-primary">← Back to Classes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="vc-page page-wrapper">
      <ParticleBackground density={40} />

      {/* Breadcrumb */}
      <div className="vc-breadcrumb">
        <div className="container vc-breadcrumb__inner">
          <Link to="/" className="vc-breadcrumb__link">Home</Link>
          <span className="vc-breadcrumb__sep">›</span>
          <Link to="/classes" className="vc-breadcrumb__link">Classes</Link>
          <span className="vc-breadcrumb__sep">›</span>
          <span className="vc-breadcrumb__current">{classInfo.fullLabel}</span>
        </div>
      </div>

      {/* Class Header */}
      <header className="vc-header" style={{ "--class-color": classInfo.color }}>
        <div className="vc-header__orb" aria-hidden="true" />
        <div className="container vc-header__inner">
          <div className="vc-header__left">
            <span className="vc-header__emoji">{classInfo.emoji}</span>
            <div>
              <div className="tag" style={{ color: classInfo.color, borderColor: classInfo.color + "44", background: classInfo.color + "15" }}>
                {classInfo.label}
              </div>
              <h1 className="vc-header__title">{classInfo.fullLabel}</h1>
              <p className="vc-header__sub">{classInfo.tagline} · {classInfo.students} students enrolled</p>
            </div>
          </div>
          <div className="vc-header__actions">
            <button
              className="btn btn-outline vc-header__pricing-btn"
              onClick={handleShowPricing}
              type="button"
            >
              View Plans 💎
            </button>
            <button
              className="btn btn-primary vc-header__class-btn"
              onClick={() => handlePlanPurchase(SUBSCRIPTION_PLANS.find((plan) => plan.id === "class"))}
              type="button"
            >
              Buy Class
            </button>
          </div>
        </div>
      </header>

      {selectedPlan && (
        <div className="vc-plan-banner glass-panel anim-fadeInUp">
          <div className="container">
            <p>
              Continue with <strong>{selectedPlan.name}</strong>. {selectedPlan.id === "chapter" ? "Select a chapter below before checkout." : "Choose the right plan and complete your purchase."}
            </p>
          </div>
        </div>
      )}

      {/* ── PRICING SECTION (id for scroll target) ── */}
      <div ref={pricingRef} id="pricing-section">
        {showPricing && (
          <div className="vc-pricing anim-fadeInUp">
            <div className="container">
              <div className="vc-pricing__head">
                <h2 className="vc-pricing__title">
                  Unlock <span className="gradient-text">{classInfo.fullLabel}</span>
                </h2>
                <p className="vc-pricing__sub">Choose the plan that works best for your child</p>
              </div>
              <div className="vc-pricing__grid">
                {planNotice && (
                  <div className="vc-plan-notice">
                    {planNotice}
                  </div>
                )}
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`vc-plan-card ${plan.popular ? "vc-plan-card--popular" : ""}`}
                    style={{ "--plan-color": plan.color }}
                  >
                    {plan.popular && <div className="vc-plan-card__badge">Most Popular</div>}
                    <div className="vc-plan-card__top">
                      <h3 className="vc-plan-card__name">{plan.name}</h3>
                      <div className="vc-plan-card__price">
                        <span className="vc-plan-card__amount">{plan.price}</span>
                        <span className="vc-plan-card__period">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="vc-plan-card__features">
                      {plan.features.map((f) => (
                        <li key={f}>
                          <span className="vc-plan-check">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="vc-plan-card__btn"
                      onClick={() => handlePlanPurchase(plan)}
                      type="button"
                    >
                      {plan.cta} →
                    </button>
                  </div>
                ))}
              </div>
              <button className="vc-pricing__close" onClick={() => setShowPricing(false)} type="button">
                ✕ Close Plans
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subject Tabs */}
      <div className="vc-subjects">
        <div className="container vc-subjects__inner">
          {subjects.map((subj) => (
            <button
              key={subj}
              className={`vc-subject-tab ${activeSubject === subj ? "vc-subject-tab--active" : ""}`}
              onClick={() => setActiveSubject(subj)}
              style={{ "--tab-color": classInfo.color }}
              type="button"
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="vc-filters">
        <div className="container vc-filters__inner">
          <div className="vc-chapter-tabs-row">
            <div className="vc-chapter-tabs">
              <button
                className={`vc-chapter-btn ${activeChapter === "all" ? "vc-chapter-btn--active" : ""}`}
                onClick={() => setActiveChapter("all")}
                type="button"
              >
                All Chapters
              </button>
              {chapters.map((ch) => (
                <button
                  key={ch.label}
                  className={`vc-chapter-btn ${activeChapter === ch.label ? "vc-chapter-btn--active" : ""}`}
                  onClick={() => setActiveChapter(ch.label)}
                  type="button"
                >
                  Ch {ch.index}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary vc-chapter-buy-btn"
              onClick={() => handlePlanPurchase(SUBSCRIPTION_PLANS.find((plan) => plan.id === "chapter"))}
              type="button"
            >
              Buy Chapter
            </button>
          </div>
          <div className="vc-search">
            <span className="vc-search__icon">🔍</span>
            <input
              type="search"
              placeholder="Search lessons..."
              className="vc-search__input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="vc-main section">
        <div className="container">
          <div className="vc-stats-row">
            <h2 className="vc-stats-row__title">
              {activeSubject}
              {activeChapter !== "all" && <span className="vc-stats-row__chapter"> · {activeChapter}</span>}
            </h2>
            <div className="vc-stats-row__badges">
              <span className="vc-badge vc-badge--free">✓ {freeCount} Free</span>
              {lockedCount > 0 && (
                <span className="vc-badge vc-badge--locked">🔒 {lockedCount} Premium</span>
              )}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading lessons..." />
          ) : filteredVideos.length === 0 ? (
            <div className="vc-empty">
              <span className="vc-empty__icon">🔍</span>
              <p>No lessons found. Try a different search.</p>
            </div>
          ) : (
            <div className="vc-grid">
              {filteredVideos.map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  onUnlock={handleUnlock}
                />
              ))}
            </div>
          )}

          {/* Unlock Banner */}
          {lockedCount > 0 && !loading && (
            <div className="vc-unlock-banner glass-panel">
              <div className="vc-unlock-banner__text">
                <span className="vc-unlock-banner__icon">🔐</span>
                <div>
                  <h4>Unlock {lockedCount} more premium lessons</h4>
                  <p>Get full chapter access for ₹99 or the full class for ₹499/year.</p>
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleShowPricing}>
                View Pricing Plans →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Other Classes */}
      <section className="section vc-other-classes">
        <div className="container">
          <h3 className="vc-other-classes__title">Explore Other Classes</h3>
          <div className="vc-other-classes__row">
            {CLASSES.filter((c) => c.id !== classId).slice(0, 4).map((cls) => (
              <button
                key={cls.id}
                className="vc-other-class-btn glass-panel"
                onClick={() => navigate(`/classes/${cls.id}`)}
                style={{ "--card-color": cls.color }}
              >
                <span>{cls.emoji}</span>
                <span>{cls.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
};

export default VideoContent;
