"use client";
import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const COLORS = [
      { r: 45,  g: 212, b: 191 },
      { r: 45,  g: 212, b: 191 },
      { r: 45,  g: 212, b: 191 },
      { r: 45,  g: 212, b: 191 },
      { r: 212, g: 168, b: 0   },
      { r: 212, g: 168, b: 0   },
      { r: 249, g: 115, b: 22  },
      { r: 140, g: 160, b: 200 },
      { r: 94,  g: 234, b: 212 },
    ];
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 70;
    const particles = Array.from({ length: N }, () => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      const large = Math.random() < 0.15;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: large ? 1.4 + Math.random() * 1.6 : 0.5 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * (large ? 0.55 : 0.9),
        vy: (Math.random() - 0.5) * (large ? 0.55 : 0.9),
        baseAlpha: large ? 0.08 + Math.random() * 0.07 : 0.03 + Math.random() * 0.05,
        alpha: 0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.006,
        color: c,
        large,
      };
    });
    const LINK_DIST = 100;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.phase += p.speed;
        p.alpha = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.phase));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = canvas.width  + 8;
        if (p.x > canvas.width  + 8) p.x = -8;
        if (p.y < -8) p.y = canvas.height + 8;
        if (p.y > canvas.height + 8) p.y = -8;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < LINK_DIST) {
            const lineAlpha = (1 - dist / LINK_DIST) * 0.06 * Math.min(a.alpha, b.alpha) * 8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color.r},${a.color.g},${a.color.b},${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        const { r, g, b } = p.color;
        const glowR = p.r * (p.large ? 7 : 5);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.alpha * 0.7})`);
        grd.addColorStop(0.4, `rgba(${r},${g},${b},${p.alpha * 0.2})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(p.alpha * 3, 0.7)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        opacity: 0, animation: "particleFadeIn 2.5s ease 0.5s forwards",
      }}
    />
  );
}
