"use client";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function glowCard(rgb, h) {
  return {
    background: "rgba(6,12,16,0.97)",
    border: `1px solid rgba(${rgb},${h ? 0.4 : 0.22})`,
    boxShadow: h
      ? `0 0 30px rgba(${rgb},0.32), 0 0 80px rgba(${rgb},0.16), 0 16px 40px rgba(0,0,0,0.55), inset 0 0 40px rgba(${rgb},0.08)`
      : `0 0 18px rgba(${rgb},0.18), 0 0 55px rgba(${rgb},0.09), 0 12px 32px rgba(0,0,0,0.45), inset 0 0 30px rgba(${rgb},0.05)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const agents = [
  {
    id: "chronos",
    name: "CHRONOS",
    role: "Chief of Staff",
    rank: "01",
    color: "#2DD4BF",
    rgb: "45,212,191",
    status: "active",
    pct: 72,
    headline: "The architect of your workflow.",
    desc: "Orchestrates your entire creative operation. Morning briefs, pipeline scheduling, task routing, deadline tracking. Every agent reports to Chronos.",
    model: "Claude Opus",
    uptime: "99.2%",
    tasksToday: 14,
    tasksWeek: 89,
    capabilities: ["Morning briefs", "Schedule mgmt", "Task routing", "Pipeline coord", "Deadline tracking"],
    apis: ["Claude API", "Google Calendar", "Notion", "Slack"],
    queue: [
      { task: "Compile morning brief", project: "All", pct: 72 },
      { task: "Route 3 shots to Script-V", project: "Mansa", pct: null },
      { task: "Schedule Freepik sync", project: "Freepik", pct: null },
    ],
    img: "/agents/chronos.png",
    video: "/Chronos Character Vid.mp4",
  },
  {
    id: "scriptv",
    name: "SCRIPT-V",
    role: "Content Pipeline",
    rank: "02",
    color: "#F97316",
    rgb: "249,115,22",
    status: "active",
    pct: 45,
    headline: "From prompt to first frame.",
    desc: "Runs content generation. Shot lists, storyboard assembly, prompt engineering, multi-tool orchestration across Runway, MidJourney, Hailuo, and Freepik AI.",
    model: "Custom Pipeline",
    uptime: "97.8%",
    tasksToday: 8,
    tasksWeek: 52,
    capabilities: ["Shot generation", "Storyboard assembly", "Prompt engineering", "Multi-tool orch", "Batch processing"],
    apis: ["Runway Gen-3", "MidJourney", "Hailuo", "Freepik AI"],
    queue: [
      { task: "Shot 014 — market entrance", project: "Mansa", pct: 65 },
      { task: "Shot 015 — river crossing", project: "Mansa", pct: 30 },
      { task: "Brand deck — 12 slides", project: "Freepik", pct: 80 },
    ],
    img: "/agents/scriptv.png",
    video: "/SCRIPT-V Character Vid.mp4",
  },
  {
    id: "lumen",
    name: "LUMEN",
    role: "Color + Grade",
    rank: "03",
    color: "#D4A800",
    rgb: "212,168,0",
    status: "standby",
    pct: null,
    headline: "Every frame, polished.",
    desc: "Visual quality gatekeeper. Color grading, style consistency, frame polish. Nothing ships without Lumen's sign-off.",
    model: "Vision Pipeline",
    uptime: "95.4%",
    tasksToday: 3,
    tasksWeek: 28,
    capabilities: ["Color grading", "Style matching", "Quality review", "Frame polish", "Tone analysis"],
    apis: ["Vision API", "Color.js", "Style Engine", "Review Queue"],
    queue: [
      { task: "Throne room — style check", project: "Mansa", pct: null },
      { task: "Snow truck — flagged cold", project: "Coca-Cola", pct: null },
    ],
    img: "/agents/lumen.png",
    video: "/LUMEN Character Vid.mp4",
  },
  {
    id: "synthetix",
    name: "SYNTHETIX",
    role: "Research Intel",
    rank: "04",
    color: "#8CA0C8",
    rgb: "140,160,200",
    status: "offline",
    pct: null,
    headline: "Intelligence on demand.",
    desc: "Market research, competitor analysis, deal evaluation, strategic intelligence. Works deep, surfaces insights.",
    model: "Research Stack",
    uptime: "88.1%",
    tasksToday: 0,
    tasksWeek: 12,
    capabilities: ["Market research", "Competitor analysis", "Deal evaluation", "Trend tracking", "Strategic briefs"],
    apis: ["Search API", "Perplexity", "SEC Filings", "Crunchbase"],
    queue: [],
    img: "/agents/synthetix.png",
    video: "/SYNTHETIX Character Vid.mp4",
  },
];

export default function AgentsPage() {
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash) {
      const idx = agents.findIndex(a => a.id === hash);
      if (idx !== -1) setSel(idx);
    }
  }, []);

  const a = agents[sel];

  function pick(i) {
    if (i === sel) return;
    setTrans(true);
    setTimeout(() => {
      setSel(i);
      setTrans(false);
    }, 250);
  }

  const statusLabel =
    a.status === "active" ? "ONLINE" : a.status === "standby" ? "STANDBY" : "OFFLINE";

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#E8E8F0", fontFamily: "'Inter', sans-serif", position: "relative" }}>
      <style>{`
        @keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.03)}}
        @keyframes slowFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      `}</style>

      <Nav />

      {/* Noise */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.018, pointerEvents: "none", zIndex: 0, backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />

      {/* Atmosphere */}
      <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "45%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${a.rgb},0.04) 0%, transparent 55%)`, filter: "blur(80px)", pointerEvents: "none", transition: "background 0.5s" }} />

      {/* Hero Banner */}
      <div style={{ position: "relative", width: "100%", height: isMobile ? 200 : 300, overflow: "hidden", marginTop: 54 }}>
        <img src="/team-banner.png" alt="Agent team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", animation: "slowZoom 25s ease-in-out infinite alternate" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #000 0%, transparent 20%, transparent 80%, #000 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 16px" : "0 60px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ ...mo, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
                <span style={{ ...mo, fontSize: 10, color: "#2DD4BF", letterSpacing: "0.12em" }}>AGENT ROSTER</span>
              </div>
              <h1 style={{ ...jk, fontSize: isMobile ? 20 : 28, fontWeight: 800, letterSpacing: "-0.02em" }}>Your AI Team</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {[0, 0.3, 0.6].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2DD4BF", boxShadow: "0 0 6px rgba(45,212,191,0.4)", animation: `gPulse 2s ease-in-out ${d}s infinite` }} />
              ))}
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <span style={{ ...mo, fontSize: 11, color: "#556", marginLeft: 4 }}>3 of 4 online</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px 40px" : "0 60px 60px", position: "relative", zIndex: 2 }}>

        {/* Agent Select Tabs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          borderBottom: "1px dashed rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          {agents.map((ag, i) => {
            const on = i === sel;
            return (
              <div
                key={i}
                onClick={() => pick(i)}
                style={{
                  padding: "14px 0",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.25s",
                  borderBottom: on ? `2px solid ${ag.color}` : "2px solid transparent",
                  borderRight: isMobile ? (i % 2 === 0 ? "1px dashed rgba(255,255,255,0.04)" : "none") : (i < 3 ? "1px dashed rgba(255,255,255,0.04)" : "none"),
                  boxShadow: on ? `0 2px 20px rgba(${ag.rgb},0.18), inset 0 -4px 20px rgba(${ag.rgb},0.06)` : "none",
                }}>
                {on && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", background: `linear-gradient(0deg, rgba(${ag.rgb},0.06) 0%, transparent 100%)`, pointerEvents: "none" }} />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, paddingLeft: isMobile ? 10 : 16, position: "relative", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: ag.color, opacity: on ? 1 : 0.3, boxShadow: on ? `0 0 6px rgba(${ag.rgb},0.4)` : "none", flexShrink: 0 }} />
                  <span style={{ ...jk, fontSize: isMobile ? 11 : 12, fontWeight: 800, color: on ? "#E8E8F0" : "#445" }}>{ag.name}</span>
                  {!isMobile && <span style={{ ...mo, fontSize: 10, color: on ? `rgba(${ag.rgb},0.6)` : "#334" }}>{ag.role}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Detail */}
        <div style={{
          opacity: trans ? 0 : 1,
          transform: trans ? "translateY(6px)" : "translateY(0)",
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 48,
          alignItems: "start",
        }}>
          {/* LEFT — Info panel with glow */}
          <div style={{
            paddingTop: isMobile ? 24 : 40,
            paddingBottom: isMobile ? 24 : 40,
            borderRadius: 16,
            padding: isMobile ? "20px 16px" : "40px 32px",
            position: "relative",
            overflow: "hidden",
            ...glowCard(a.rgb, false),
          }}>
            {/* Interior radial gradient */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${a.rgb},0.08) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />

            <div style={{ position: "relative" }}>
              {/* Role + Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.color, boxShadow: `0 0 6px rgba(${a.rgb},0.4)` }} />
                <span style={{ ...mo, fontSize: 11, color: a.color, letterSpacing: "0.08em" }}>{a.role.toUpperCase()}</span>
                <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.06)" }} />
                <span style={{ ...mo, fontSize: 11, color: "#445" }}>{statusLabel}</span>
              </div>

              {/* Name */}
              <h2 style={{ ...jk, fontSize: isMobile ? 32 : 52, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 12 }}>{a.name}</h2>

              {/* Headline */}
              <p style={{ ...jk, fontSize: 16, fontWeight: 600, color: a.color, marginBottom: 20, opacity: 0.9 }}>{a.headline}</p>

              {/* Description */}
              <p style={{ fontSize: 14, color: "#667", lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>{a.desc}</p>

              {/* Stats row — 2x2 on mobile */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)", gap: isMobile ? 16 : 32, marginBottom: 32 }}>
                {[
                  { v: a.pct != null ? a.pct + "%" : "\u2014", l: "Progress" },
                  { v: a.tasksToday, l: "Today" },
                  { v: a.tasksWeek, l: "This week" },
                  { v: a.uptime, l: "Uptime" },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ ...jk, fontSize: 22, fontWeight: 800, color: i === 0 || i === 3 ? a.color : "#E8E8F0", lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
                    <div style={{ ...mo, fontSize: 10, color: "#445", letterSpacing: "0.04em" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", marginBottom: 24 }} />

              {/* Capabilities */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.08em", marginBottom: 8 }}>CAPABILITIES</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.capabilities.map((c, i) => (
                    <span key={i} style={{ ...mo, fontSize: 11, color: `rgba(${a.rgb},0.8)`, padding: "4px 10px", borderRadius: 4, background: `rgba(${a.rgb},0.04)`, border: `1px solid rgba(${a.rgb},0.08)` }}>{c}</span>
                  ))}
                </div>
              </div>

              {/* APIs */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.08em", marginBottom: 8 }}>CONNECTED</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.apis.map((api, i) => (
                    <span key={i} style={{ ...mo, fontSize: 11, color: "#667", padding: "4px 10px", borderRadius: 4, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>{api}</span>
                  ))}
                </div>
              </div>

              {/* Queue */}
              {a.queue.length > 0 && (
                <div>
                  <div style={{ ...mo, fontSize: 10, color: "#334", letterSpacing: "0.08em", marginBottom: 8 }}>QUEUE</div>
                  {a.queue.map((t, i) => (
                    <QueueRow key={i} task={t} agent={a} isLast={i >= a.queue.length - 1} />
                  ))}
                </div>
              )}
              {a.queue.length === 0 && (
                <div style={{ ...mo, fontSize: 11, color: "#334" }}>No active tasks</div>
              )}
            </div>
          </div>

          {/* RIGHT — Character */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", height: isMobile ? 300 : 780, overflow: "hidden", background: "#000", maxHeight: isMobile ? 300 : undefined, width: "100%" }}>
            <div style={{ position: "relative", height: "100%", overflow: "hidden", flexShrink: 0, background: "#000" }}>
              <video key={a.video} src={a.video} autoPlay loop muted playsInline style={{ display: "block", height: "100%", width: "auto", position: "relative", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "100%", background: "linear-gradient(90deg, #000 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "10%", height: "100%", background: "linear-gradient(270deg, #000 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(0deg, #000 0%, transparent 100%)", zIndex: 3, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${a.rgb},0.18) 0%, transparent 70%)`, filter: "blur(30px)", zIndex: 0, pointerEvents: "none", transition: "background 0.4s" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueRow({ task: t, agent: a, isLast }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
        borderRadius: 8,
        marginBottom: 4,
        borderBottom: !isLast ? "1px dashed rgba(255,255,255,0.03)" : "none",
        background: h ? `rgba(${a.rgb},0.05)` : "transparent",
        border: h ? `1px solid rgba(${a.rgb},0.15)` : "1px solid transparent",
        transition: "all 0.2s",
      }}>
      <span style={{ fontSize: 12, color: "#99A" }}>{t.task}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#334" }}>{t.project}</span>
        {t.pct != null && (
          <>
            <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: a.color, borderRadius: 1 }} />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: a.color, minWidth: 24, textAlign: "right" }}>{t.pct}%</span>
          </>
        )}
        {t.pct == null && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#223" }}>{"\u2022"}</span>}
      </div>
    </div>
  );
}
