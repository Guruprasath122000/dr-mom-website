// import { useEffect, useState } from "react";
// import "./BookLoader.css";

// /* Random stars */
// const STARS = Array.from({ length: 90 }, (_, i) => ({
//   id: i,
//   top:    `${Math.random() * 100}%`,
//   left:   `${Math.random() * 100}%`,
//   size:   `${Math.random() * 3 + 1}px`,
//   dur:    `${Math.random() * 2 + 1.5}s`,
//   delay:  `${Math.random() * 3}s`,
//   bright: `${Math.random() * 0.5 + 0.5}`,
// }));

// /* Education-themed floating sparks */
// const SPARKS = [
//   { emoji: "📚", top: "72%", left: "12%", dur: "3.2s", delay: "0s"   },
//   { emoji: "✏️",  top: "62%", left: "82%", dur: "2.8s", delay: "0.5s" },
//   { emoji: "⭐",  top: "76%", left: "52%", dur: "3.5s", delay: "1s"   },
//   { emoji: "🎓",  top: "66%", left: "28%", dur: "2.6s", delay: "1.4s" },
//   { emoji: "💡",  top: "74%", left: "68%", dur: "3s",   delay: "0.8s" },
//   { emoji: "🌟",  top: "69%", left: "90%", dur: "2.4s", delay: "1.8s" },
//   { emoji: "🔬",  top: "79%", left: "6%",  dur: "3.8s", delay: "0.3s" },
//   { emoji: "🎨",  top: "64%", left: "45%", dur: "2.9s", delay: "2.1s" },
// ];

// const BookLoader = ({ onComplete }) => {
//   const [hidden, setHidden] = useState(false);

//   useEffect(() => {
//     const fadeTimer = setTimeout(() => setHidden(true), 3400);
//     const doneTimer = setTimeout(() => { if (onComplete) onComplete(); }, 4200);
//     return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
//   }, [onComplete]);

//   return (
//     <div
//       className={`intro-loader ${hidden ? "intro-loader--hidden" : ""}`}
//       aria-label="Loading Dr Mom 2.0"
//       role="status"
//     >
//       {/* Starfield */}
//       <div className="intro-loader__stars" aria-hidden="true">
//         {STARS.map((s) => (
//           <span
//             key={s.id}
//             className="star"
//             style={{
//               top: s.top, left: s.left,
//               width: s.size, height: s.size,
//               "--dur": s.dur, "--delay": s.delay, "--bright": s.bright,
//             }}
//           />
//         ))}
//       </div>

//       {/* Orbit rings */}
//       <div className="orbit-ring orbit-ring--1" aria-hidden="true" />
//       <div className="orbit-ring orbit-ring--2" aria-hidden="true" />
//       <div className="orbit-ring orbit-ring--3" aria-hidden="true" />

//       {/* Orbiting planets */}
//       <div className="orbit-track" aria-hidden="true">
//         <div className="orbit-planet orbit-planet--1" />
//         <div className="orbit-planet orbit-planet--2" />
//         <div className="orbit-planet orbit-planet--3" />
//       </div>

//       {/* Floating sparks */}
//       {SPARKS.map((s, i) => (
//         <span key={i} className="spark" aria-hidden="true"
//           style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay }}>
//           {s.emoji}
//         </span>
//       ))}

//       {/* ── Pencil Rocket ── */}
//       <div className="pencil-rocket" aria-hidden="true">

//         {/* Trail / speed lines behind rocket */}
//         <div className="pencil-trail pencil-trail--1" />
//         <div className="pencil-trail pencil-trail--2" />
//         <div className="pencil-trail pencil-trail--3" />
//         <div className="pencil-trail pencil-trail--4" />

//         {/* The pencil rocket SVG */}
//         <svg
//           className="pencil-svg"
//           viewBox="0 0 80 260"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//         >
//           <defs>
//             {/* Pencil body yellow gradient */}
//             <linearGradient id="pgBody" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%"   stopColor="#fde68a" />
//               <stop offset="35%"  stopColor="#fbbf24" />
//               <stop offset="65%"  stopColor="#f59e0b" />
//               <stop offset="100%" stopColor="#d97706" />
//             </linearGradient>
//             {/* Eraser pink gradient */}
//             <linearGradient id="pgEraser" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%"   stopColor="#fda4af" />
//               <stop offset="100%" stopColor="#fb7185" />
//             </linearGradient>
//             {/* Tip / graphite */}
//             <linearGradient id="pgTip" x1="0.5" y1="0" x2="0.5" y2="1">
//               <stop offset="0%"   stopColor="#e2e8f0" />
//               <stop offset="60%"  stopColor="#94a3b8" />
//               <stop offset="100%" stopColor="#1e293b" />
//             </linearGradient>
//             {/* Wood cone */}
//             <linearGradient id="pgWood" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%"   stopColor="#fef3c7" />
//               <stop offset="50%"  stopColor="#fde68a" />
//               <stop offset="100%" stopColor="#fcd34d" />
//             </linearGradient>
//             {/* Body shine */}
//             <linearGradient id="pgShine" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%"   stopColor="rgba(255,255,255,0.45)" />
//               <stop offset="100%" stopColor="rgba(255,255,255,0)" />
//             </linearGradient>
//             {/* Purple band */}
//             <linearGradient id="pgBand" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%"   stopColor="#a78bfa" />
//               <stop offset="100%" stopColor="#7c3aed" />
//             </linearGradient>
//             {/* Flame */}
//             <linearGradient id="pgFlame" x1="0.5" y1="0" x2="0.5" y2="1">
//               <stop offset="0%"   stopColor="#ffffff" />
//               <stop offset="20%"  stopColor="#fef08a" />
//               <stop offset="55%"  stopColor="#f97316" />
//               <stop offset="100%" stopColor="rgba(239,68,68,0)" />
//             </linearGradient>
//             <filter id="pgGlow" x="-30%" y="-30%" width="160%" height="160%">
//               <feGaussianBlur stdDeviation="3" result="b" />
//               <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
//             </filter>
//             <filter id="pgSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
//               <feGaussianBlur stdDeviation="5" result="b" />
//               <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
//             </filter>
//           </defs>

//           {/* ── Eraser (top / nose of rocket) ── */}
//           {/* Eraser cap metal band */}
//           <rect x="26" y="8" width="28" height="8" rx="2" fill="url(#pgBand)" />
//           {/* Eraser pink block */}
//           <rect x="24" y="16" width="32" height="20" rx="4" fill="url(#pgEraser)" />
//           {/* Eraser highlight */}
//           <rect x="28" y="18" width="10" height="6" rx="2" fill="rgba(255,255,255,0.35)" />

//           {/* ── Main pencil body ── */}
//           <rect x="22" y="36" width="36" height="150" fill="url(#pgBody)" />
//           {/* Body left shadow */}
//           <rect x="22" y="36" width="7" height="150" fill="rgba(0,0,0,0.10)" />
//           {/* Body right shadow */}
//           <rect x="51" y="36" width="7" height="150" fill="rgba(0,0,0,0.08)" />
//           {/* Body shine strip */}
//           <rect x="30" y="36" width="8" height="150" fill="url(#pgShine)" rx="2" />

//           {/* Brand text on pencil */}
//           <text
//             x="40" y="90"
//             textAnchor="middle"
//             fill="rgba(120,53,15,0.85)"
//             fontSize="7"
//             fontFamily="'Sora', sans-serif"
//             fontWeight="700"
//             letterSpacing="0.5"
//           >DR MOM</text>
//           <text
//             x="40" y="102"
//             textAnchor="middle"
//             fill="rgba(120,53,15,0.7)"
//             fontSize="5.5"
//             fontFamily="'Sora', sans-serif"
//             fontWeight="600"
//             letterSpacing="0.3"
//           >2.0</text>

//           {/* Decorative stars on body */}
//           <text x="30" y="128" fontSize="8" fill="rgba(120,53,15,0.5)">✦</text>
//           <text x="45" y="148" fontSize="6" fill="rgba(120,53,15,0.4)">✦</text>

//           {/* Purple accent band in middle */}
//           <rect x="22" y="155" width="36" height="6" fill="url(#pgBand)" opacity="0.85" />

//           {/* ── Wood cone (sharpened tip area) ── */}
//           <path d="M22 186 L40 230 L58 186 Z" fill="url(#pgWood)" />
//           {/* Wood grain lines */}
//           <line x1="31" y1="186" x2="36" y2="218" stroke="rgba(180,130,40,0.3)" strokeWidth="1" />
//           <line x1="49" y1="186" x2="44" y2="218" stroke="rgba(180,130,40,0.3)" strokeWidth="1" />

//           {/* Graphite tip — pointed */}
//           <path d="M36 218 L40 240 L44 218 Z" fill="url(#pgTip)" filter="url(#pgGlow)" />
//           {/* Tip highlight */}
//           <line x1="39" y1="220" x2="40" y2="235" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

//           {/* ── Fins (rocket style, sprouting from body sides) ── */}
//           {/* Left fin */}
//           <path d="M22 170 Q2 192 8 210 L22 192 Z" fill="#7c3aed" opacity="0.9" />
//           <path d="M22 170 Q2 192 8 210 L22 192 Z" fill="url(#pgShine)" opacity="0.3" />
//           {/* Right fin */}
//           <path d="M58 170 Q78 192 72 210 L58 192 Z" fill="#7c3aed" opacity="0.9" />
//           <path d="M58 170 Q78 192 72 210 L58 192 Z" fill="url(#pgShine)" opacity="0.3" />

//           {/* ── Exhaust ring at very bottom (around graphite tip area) ── */}
//           <ellipse cx="40" cy="242" rx="10" ry="4" fill="#2a1040" opacity="0.8" />

//           {/* ── Flame from tip ── */}
//           <ellipse cx="40" cy="252" rx="8" ry="14"
//             fill="url(#pgFlame)"
//             filter="url(#pgSoftGlow)"
//             className="pencil-flame-main"
//           />
//           <ellipse cx="40" cy="255" rx="4" ry="10"
//             fill="rgba(255,255,255,0.9)"
//             filter="url(#pgSoftGlow)"
//             className="pencil-flame-core"
//           />
//         </svg>

//         {/* CSS flame glow rings below tip */}
//         <div className="flame-glow" />
//         <div className="flame-glow flame-glow--2" />

//         {/* Smoke / exhaust puffs */}
//         <div className="pencil-smoke" />
//         <div className="pencil-smoke pencil-smoke--2" />
//         <div className="pencil-smoke pencil-smoke--3" />
//       </div>

//       {/* Center: brand + bar + tagline */}
//       <div className="intro-loader__center">
//         <p className="intro-loader__brand">Dr Mom 2.0</p>
//         <div className="intro-loader__bar-wrap">
//           <div className="intro-loader__bar-fill" />
//         </div>
//         <p className="intro-loader__tagline">Where young minds discover &amp; grow ✨</p>
//       </div>
//     </div>
//   );
// };

// export default BookLoader;









import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.png";
import "./BookLoader.css";

const BookLoader = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start fade-out at 4s
    const exitTimer = setTimeout(() => setExiting(true), 4000);
    // Unmount at 4.8s
    const doneTimer = setTimeout(() => { if (onComplete) onComplete(); }, 4800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`book-loader ${exiting ? "book-loader--exit" : ""}`}
      aria-label="Loading Dr Mom 2.0"
      role="status"
    >
      {/* Deep space background */}
      <div className="bl-space" aria-hidden="true" />

      {/* Twinkling stars */}
      <div className="bl-stars" aria-hidden="true">
        {[...Array(15)].map((_, i) => <span className="bl-star" key={i} />)}
      </div>

      {/* Speed streaks during launch */}
      <div className="bl-streaks" aria-hidden="true">
        {[...Array(6)].map((_, i) => <span className="bl-streak" key={i} />)}
      </div>

      {/* Decorative planet */}
      <div className="bl-planet" aria-hidden="true" />

      {/* Decorative moon */}
      <div className="bl-moon" aria-hidden="true" />

      {/* ── Rocket + Launchpad ── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-60px" }}>
        {/* Rocket */}
        <div className="bl-rocket-wrap">
          {/* Rocket SVG */}
          <svg
            className="bl-rocket"
            viewBox="0 0 80 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Body */}
            <path
              d="M40 5 C28 5 18 22 16 42 L16 68 L40 78 L64 68 L64 42 C62 22 52 5 40 5Z"
              fill="url(#rocketBody)"
            />
            {/* Window */}
            <circle cx="40" cy="38" r="10" fill="url(#windowGrad)" />
            <circle cx="40" cy="38" r="7" fill="url(#windowInner)" opacity="0.9" />
            {/* Left fin */}
            <path d="M16 58 L4 72 L16 68 Z" fill="url(#finGrad)" />
            {/* Right fin */}
            <path d="M64 58 L76 72 L64 68 Z" fill="url(#finGrad)" />
            {/* Nose tip */}
            <path d="M40 5 C36 5 32 10 30 16 L50 16 C48 10 44 5 40 5Z" fill="#D4BEE4" />
            {/* Stripe */}
            <rect x="16" y="55" width="48" height="6" rx="2" fill="rgba(212,190,228,0.3)" />

            <defs>
              <linearGradient id="rocketBody" x1="16" y1="5" x2="64" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#D4BEE4" />
                <stop offset="40%"  stopColor="#9B7EBD" />
                <stop offset="100%" stopColor="#3B1E54" />
              </linearGradient>
              <radialGradient id="windowGrad" cx="40%" cy="35%">
                <stop offset="0%"   stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#0d0618" />
              </radialGradient>
              <radialGradient id="windowInner" cx="35%" cy="30%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.9)" />
                <stop offset="60%"  stopColor="rgba(155,126,189,0.4)" />
                <stop offset="100%" stopColor="rgba(13,6,24,0.8)" />
              </radialGradient>
              <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#9B7EBD" />
                <stop offset="100%" stopColor="#3B1E54" />
              </linearGradient>
            </defs>
          </svg>

          {/* Flame exhaust */}
          <div className="bl-flame" aria-hidden="true">
            <div className="bl-flame__outer" />
            <div className="bl-flame__core" />
            <div className="bl-flame__smoke" />
          </div>
        </div>

        {/* Launchpad */}
        <div className="bl-pad" aria-hidden="true">
          <div className="bl-pad__top" />
          <div className="bl-pad__legs">
            <div className="bl-pad__leg" />
            <div className="bl-pad__leg" />
          </div>
        </div>
      </div>

      {/* Logo + branding — appears after rocket launches */}
      <div className="bl-brand">
        <img src={Logo} alt="Dr Mom 2.0" className="bl-brand__logo" />
        <span className="bl-brand__name">Dr Mom 2.0</span>
        <span className="bl-brand__tagline">Where young minds discover &amp; grow</span>
      </div>

      {/* Progress bar */}
      <div className="bl-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100}>
        <div className="bl-progress__fill" />
      </div>
    </div>
  );
};

export default BookLoader;
