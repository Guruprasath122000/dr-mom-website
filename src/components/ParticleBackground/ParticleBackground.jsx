import React, { useEffect, useRef } from "react";
import "./ParticleBackground.css";

const ParticleBackground = ({ density = 80 }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      if (stateRef.current) { stateRef.current.cx = W / 2; stateRef.current.cy = H / 2; }
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: density + 100 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.6 + 0.25,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      hue: [230, 240, 255],
      bright: Math.random() > 0.9,
    }));

    const planets = [
      { name: "Mercury", color: [192, 185, 155], size: 5, orbit: 80, speed: 0.014, tilt: 0.06, phase: Math.random() * Math.PI * 2 },
      { name: "Venus", color: [225, 210, 170], size: 8, orbit: 120, speed: 0.009, tilt: 0.04, phase: Math.random() * Math.PI * 2 },
      { name: "Earth", color: [110, 160, 235], size: 10, orbit: 170, speed: 0.007, tilt: 0.05, phase: Math.random() * Math.PI * 2 },
      { name: "Mars", color: [210, 120, 90], size: 7, orbit: 215, speed: 0.0055, tilt: 0.045, phase: Math.random() * Math.PI * 2 },
      { name: "Jupiter", color: [210, 175, 125], size: 16, orbit: 280, speed: 0.0034, tilt: 0.03, phase: Math.random() * Math.PI * 2, ring: false },
      { name: "Saturn", color: [225, 205, 155], size: 14, orbit: 340, speed: 0.0025, tilt: 0.03, phase: Math.random() * Math.PI * 2, ring: true },
      { name: "Uranus", color: [150, 205, 225], size: 11, orbit: 400, speed: 0.0019, tilt: 0.02, phase: Math.random() * Math.PI * 2, ring: true },
      { name: "Neptune", color: [80, 135, 220], size: 11, orbit: 450, speed: 0.0014, tilt: 0.02, phase: Math.random() * Math.PI * 2 },
    ];

    const comets = Array.from({ length: 8 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.3,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 2 + 1.5,
      alpha: Math.random() * 0.35 + 0.2,
      angle: Math.PI * 0.65 + (Math.random() * 0.2 - 0.1),
      dx: Math.cos(Math.PI * 0.65 + (Math.random() * 0.2 - 0.1)),
      dy: Math.sin(Math.PI * 0.65 + (Math.random() * 0.2 - 0.1)),
    }));

    let frame = 0;
    stateRef.current = { cx: W / 2, cy: H / 2 };

    const draw = () => {
      frame++;
      const { cx, cy } = stateRef.current;

      const bg = ctx.createRadialGradient(cx, cy, H * 0.06, cx, cy, Math.max(W, H));
      bg.addColorStop(0, "rgba(10, 12, 28, 0.22)");
      bg.addColorStop(0.5, "rgba(2, 8, 28, 0.92)");
      bg.addColorStop(1, "rgba(0, 0, 8, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        const tw = s.bright ? 1 : Math.sin(frame * 0.004 + s.x * 0.03) * 0.25 + 0.75;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue[0]},${s.hue[1]},${s.hue[2]},${s.alpha * tw})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = W + 10;
        if (s.x > W + 10) s.x = -10;
        if (s.y < -10) s.y = H + 10;
        if (s.y > H + 10) s.y = -10;
      });

      const glow = Math.sin(frame * 0.01) * 0.08 + 0.92;
      const sunRadius = Math.min(W, H) * 0.065;
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius * 4);
      sunGlow.addColorStop(0, `rgba(255, 210, 120, ${0.75 * glow})`);
      sunGlow.addColorStop(0.3, "rgba(255, 200, 90, 0.18)");
      sunGlow.addColorStop(1, "rgba(255, 180, 60, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sunRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, sunRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 220, 120, 0.2)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 190, 70, 1)";
      ctx.fill();

      planets.forEach((planet) => {
        const angle = frame * planet.speed + planet.phase;
        const x0 = Math.cos(angle) * planet.orbit;
        const y0 = Math.sin(angle) * planet.orbit * 0.18;
        const px = cx + x0;
        const py = cy + y0;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(planet.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, planet.orbit, planet.orbit * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        if (planet.ring) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle * 0.7 + planet.orbit * 0.002);
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * 2.3, planet.size * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 240, 200, 0.25)";
          ctx.lineWidth = 1.3;
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(px, py, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${planet.color[0]},${planet.color[1]},${planet.color[2]},1)`;
        ctx.fill();
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${planet.color[0]},${planet.color[1]},${planet.color[2]},0.4)`;
        ctx.beginPath();
        ctx.arc(px + planet.size * 0.25, py - planet.size * 0.25, planet.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      comets.forEach((comet) => {
        const tailX = comet.x - comet.dx * comet.len;
        const tailY = comet.y - comet.dy * comet.len;
        const trail = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
        trail.addColorStop(0, "rgba(255,255,255,0)");
        trail.addColorStop(0.7, `rgba(255,255,255,${comet.alpha * 0.12})`);
        trail.addColorStop(1, `rgba(255,255,255,${comet.alpha})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${comet.alpha})`;
        ctx.fill();

        comet.x += comet.dx * comet.speed;
        comet.y += comet.dy * comet.speed;
        if (comet.x > W + 30 || comet.y > H + 30 || comet.x < -30 || comet.y < -30) {
          comet.x = Math.random() * W;
          comet.y = -20;
          comet.angle = Math.PI * 0.65 + (Math.random() * 0.2 - 0.1);
          comet.dx = Math.cos(comet.angle);
          comet.dy = Math.sin(comet.angle);
          comet.speed = Math.random() * 2 + 1.5;
          comet.alpha = Math.random() * 0.35 + 0.2;
          comet.len = Math.random() * 120 + 60;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [density]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
};

export default ParticleBackground;
