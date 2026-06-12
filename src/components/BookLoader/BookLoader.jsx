import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.png";
import "./BookLoader.css";

/* Random stars */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top:    `${Math.random() * 100}%`,
  left:   `${Math.random() * 100}%`,
  size:   `${Math.random() * 3 + 1}px`,
  dur:    `${Math.random() * 2 + 1.5}s`,
  delay:  `${Math.random() * 3}s`,
  bright: `${Math.random() * 0.5 + 0.4}`,
}));

/* Floating emoji sparks */
const SPARKS = [
  { emoji: "⭐", top: "70%", left: "15%", dur: "3.2s", delay: "0s"   },
  { emoji: "✨", top: "60%", left: "80%", dur: "2.8s", delay: "0.5s" },
  { emoji: "📚", top: "75%", left: "50%", dur: "3.5s", delay: "1s"   },
  { emoji: "🎓", top: "65%", left: "30%", dur: "2.6s", delay: "1.4s" },
  { emoji: "💡", top: "72%", left: "65%", dur: "3s",   delay: "0.8s" },
  { emoji: "🌟", top: "68%", left: "88%", dur: "2.4s", delay: "1.8s" },
  { emoji: "🔭", top: "78%", left: "8%",  dur: "3.8s", delay: "0.3s" },
];

const BookLoader = ({ onComplete }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHidden(true), 3200);
    const doneTimer = setTimeout(() => { if (onComplete) onComplete(); }, 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  return (
    <div
      className={`intro-loader ${hidden ? "intro-loader--hidden" : ""}`}
      aria-label="Loading Dr Mom 2.0"
      role="status"
    >
      {/* Starfield */}
      <div className="intro-loader__stars" aria-hidden="true">
        {STARS.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--dur": s.dur,
              "--delay": s.delay,
              "--bright": s.bright,
            }}
          />
        ))}
      </div>

      {/* Orbit rings */}
      <div className="orbit-ring orbit-ring--1" aria-hidden="true" />
      <div className="orbit-ring orbit-ring--2" aria-hidden="true" />
      <div className="orbit-ring orbit-ring--3" aria-hidden="true" />

      {/* Orbiting planets */}
      <div className="orbit-track" aria-hidden="true">
        <div className="orbit-planet orbit-planet--1" />
        <div className="orbit-planet orbit-planet--2" />
        <div className="orbit-planet orbit-planet--3" />
      </div>

      {/* Floating emoji sparks */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="spark"
          aria-hidden="true"
          style={{
            top: s.top,
            left: s.left,
            "--dur": s.dur,
            "--delay": s.delay,
          }}
        >
          {s.emoji}
        </span>
      ))}

      {/* Center: logo + bar + text */}
      <div className="intro-loader__center">
        <img src={Logo} alt="Dr Mom 2.0" className="intro-loader__logo" />

        <div className="intro-loader__bar-wrap">
          <div className="intro-loader__bar-fill" />
        </div>

        <p className="intro-loader__tagline">Opening your learning universe</p>
      </div>
    </div>
  );
};

export default BookLoader;
