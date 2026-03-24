"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const mo = { fontFamily: "'Space Mono', monospace" };
const jk = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const navPages = ["Dashboard", "Projects", "Agents", "Pipeline", "Deals", "Workshops"];
const navRoutes = { Dashboard: "/", Projects: "/projects", Agents: "/agents", Pipeline: "#", Deals: "#", Workshops: "#" };
const PROFILE_IMG = "/agents/issa-profile.png";

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
    video: "/agents/chronos-select.webm",
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
    video: "/agents/scriptv-select.webm",
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
    video: "/agents/lumen-select.webm",
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
    video: "/agents/synthetix-select.webm",
  },
];

export default function AgentsPage() {
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const [tStr, setTStr] = useState("");
  const a = agents[sel];

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTStr(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
    <div
      style={{
        background: "#08080D",
        minHeight: "100vh",
        color: "#E8E8F0",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.03)}}
        @keyframes slowFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 44px", background: "rgba(17,17,24,0.65)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px dashed rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 54, maxWidth: 1440, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src={PROFILE_IMG} alt="Issa" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(45,212,191,0.25)" }} />
            <div>
              <div style={{ ...jk, fontSize: 12, fontWeight: 700 }}>ISSA</div>
              <div style={{ ...mo, fontSize: 7, color: "#445" }}>COMMAND CENTRE</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 1 }}>
            {navPages.map((p, i) => (
              <Link key={i} href={navRoutes[p]} style={{ textDecoration: "none" }}>
                <div className={i !== 2 ? "nav-link" : ""} style={{ padding: "5px 12px", borderRadius: 2, cursor: "pointer", background: i === 2 ? "rgba(45,212,191,0.05)" : "transparent", border: i === 2 ? "1px solid rgba(45,212,191,0.1)" : "1px solid transparent" }}>
                  <span style={{ ...mo, fontSize: 10, color: i === 2 ? "#2DD4BF" : "#556" }}>{p}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...mo, fontSize: 9, color: "#334" }}>{tStr}</span>
            <div style={{ width: 28, height: 28, borderRadius: 3, background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.12)", display: "flex", alignItems: "center", justifyContent: "center", ...jk, fontSize: 8, fontWeight: 800, color: "#2DD4BF" }}>IS</div>
          </div>
        </div>
      </nav>

      {/* Noise */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.018,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Atmosphere */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "45%",
          height: "70%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${a.rgb},0.04) 0%, transparent 55%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          transition: "background 0.5s",
        }}
      />

      {/* ═══ HERO BANNER ═══ */}
      <div style={{ position: "relative", width: "100%", height: 300, overflow: "hidden", marginTop: 54 }}>
        <img
          src="/agents/team-banner.png"
          alt="Agent team"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 25%",
            animation: "slowZoom 25s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, #08080D 0%, rgba(8,8,13,0.4) 50%, rgba(8,8,13,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #08080D 0%, transparent 20%, transparent 80%, #08080D 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 60px 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ ...mo, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
                <span style={{ ...mo, fontSize: 10, color: "#2DD4BF", letterSpacing: "0.12em" }}>
                  AGENT ROSTER
                </span>
              </div>
              <h1 style={{ ...jk, fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>
                Your AI Team
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {[0, 0.3, 0.6].map((d, i) => (
                <span
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#2DD4BF",
                    boxShadow: "0 0 6px rgba(45,212,191,0.4)",
                    animation: `gPulse 2s ease-in-out ${d}s infinite`,
                  }}
                />
              ))}
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <span style={{ ...mo, fontSize: 8, color: "#556", marginLeft: 4 }}>3 of 4 online</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ═══ AGENT SELECT TABS ═══ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px dashed rgba(255,255,255,0.06)",
          }}
        >
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
                  borderRight: i < 3 ? "1px dashed rgba(255,255,255,0.04)" : "none",
                }}
              >
                {on && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "100%",
                      background: `linear-gradient(0deg, rgba(${ag.rgb},0.04) 0%, transparent 100%)`,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingLeft: 16,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: ag.color,
                      opacity: on ? 1 : 0.3,
                      boxShadow: on ? `0 0 6px rgba(${ag.rgb},0.4)` : "none",
                    }}
                  />
                  <span style={{ ...jk, fontSize: 12, fontWeight: 800, color: on ? "#E8E8F0" : "#445" }}>
                    {ag.name}
                  </span>
                  <span style={{ ...mo, fontSize: 7, color: on ? `rgba(${ag.rgb},0.6)` : "#334" }}>
                    {ag.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ AGENT DETAIL ═══ */}
        <div
          style={{
            opacity: trans ? 0 : 1,
            transform: trans ? "translateY(6px)" : "translateY(0)",
            transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              paddingTop: 40,
              paddingBottom: 48,
            }}
          >
            {/* LEFT — Info panel */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {/* Role + Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: a.color,
                    boxShadow: `0 0 6px rgba(${a.rgb},0.4)`,
                  }}
                />
                <span style={{ ...mo, fontSize: 8, color: a.color, letterSpacing: "0.08em" }}>
                  {a.role.toUpperCase()}
                </span>
                <span style={{ width: 1, height: 10, background: "rgba(255,255,255,0.06)" }} />
                <span style={{ ...mo, fontSize: 8, color: "#445" }}>{statusLabel}</span>
              </div>

              {/* Name */}
              <h2
                style={{
                  ...jk,
                  fontSize: 52,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  marginBottom: 12,
                }}
              >
                {a.name}
              </h2>

              {/* Headline */}
              <p
                style={{
                  ...jk,
                  fontSize: 16,
                  fontWeight: 600,
                  color: a.color,
                  marginBottom: 20,
                  opacity: 0.9,
                }}
              >
                {a.headline}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: "#667",
                  lineHeight: 1.75,
                  marginBottom: 32,
                  maxWidth: 420,
                }}
              >
                {a.desc}
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
                {[
                  { v: a.pct != null ? a.pct + "%" : "\u2014", l: "Progress" },
                  { v: a.tasksToday, l: "Today" },
                  { v: a.tasksWeek, l: "This week" },
                  { v: a.uptime, l: "Uptime" },
                ].map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        ...jk,
                        fontSize: 22,
                        fontWeight: 800,
                        color: i === 0 || i === 3 ? a.color : "#E8E8F0",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {s.v}
                    </div>
                    <div style={{ ...mo, fontSize: 7, color: "#445", letterSpacing: "0.04em" }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", marginBottom: 24 }} />

              {/* Capabilities */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{ ...mo, fontSize: 7, color: "#334", letterSpacing: "0.08em", marginBottom: 8 }}
                >
                  CAPABILITIES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.capabilities.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        ...mo,
                        fontSize: 9,
                        color: `rgba(${a.rgb},0.8)`,
                        padding: "4px 10px",
                        borderRadius: 4,
                        background: `rgba(${a.rgb},0.04)`,
                        border: `1px solid rgba(${a.rgb},0.08)`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* APIs */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{ ...mo, fontSize: 7, color: "#334", letterSpacing: "0.08em", marginBottom: 8 }}
                >
                  CONNECTED
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {a.apis.map((api, i) => (
                    <span
                      key={i}
                      style={{
                        ...mo,
                        fontSize: 9,
                        color: "#667",
                        padding: "4px 10px",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {api}
                    </span>
                  ))}
                </div>
              </div>

              {/* Queue */}
              {a.queue.length > 0 && (
                <div>
                  <div
                    style={{
                      ...mo,
                      fontSize: 7,
                      color: "#334",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    QUEUE
                  </div>
                  {a.queue.map((t, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom:
                          i < a.queue.length - 1 ? "1px dashed rgba(255,255,255,0.03)" : "none",
                      }}
                    >
                      <span style={{ fontSize: 12, color: "#99A" }}>{t.task}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ ...mo, fontSize: 7, color: "#334" }}>{t.project}</span>
                        {t.pct != null && (
                          <>
                            <div
                              style={{
                                width: 40,
                                height: 2,
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: 1,
                              }}
                            >
                              <div
                                style={{
                                  width: `${t.pct}%`,
                                  height: "100%",
                                  background: a.color,
                                  borderRadius: 1,
                                }}
                              />
                            </div>
                            <span
                              style={{
                                ...mo,
                                fontSize: 7,
                                color: a.color,
                                minWidth: 24,
                                textAlign: "right",
                              }}
                            >
                              {t.pct}%
                            </span>
                          </>
                        )}
                        {t.pct == null && (
                          <span style={{ ...mo, fontSize: 7, color: "#223" }}>{"\u2022"}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {a.queue.length === 0 && (
                <div style={{ ...mo, fontSize: 8, color: "#334" }}>No active tasks</div>
              )}
            </div>

            {/* RIGHT — Character */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                background: `linear-gradient(155deg, rgba(${a.rgb},0.06) 0%, rgba(${a.rgb},0.015) 30%, rgba(8,8,13,0.98) 100%)`,
                border: `1px solid rgba(${a.rgb},0.04)`,
                transition: "all 0.4s",
                minHeight: 540,
                overflow: "hidden",
              }}
            >
              {/* Ambient glow */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  width: "70%",
                  height: "70%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(${a.rgb},0.07) 0%, transparent 55%)`,
                  filter: "blur(40px)",
                  transform: "translateX(-50%)",
                  transition: "background 0.4s",
                }}
              />

              {/* Character image */}
              <img
                src={a.img}
                alt={a.name}
                style={{
                  position: "relative",
                  zIndex: 2,
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  animation: "slowFloat 6s ease-in-out infinite",
                  filter: `drop-shadow(0 0 30px rgba(${a.rgb},0.12))`,
                  transition: "filter 0.4s",
                }}
              />

              {/* Bottom fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "15%",
                  background: "linear-gradient(0deg, rgba(8,8,13,0.95) 0%, transparent 100%)",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />

              {/* Rank watermark */}
              <span
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 20,
                  ...jk,
                  fontSize: 64,
                  fontWeight: 800,
                  color: `rgba(${a.rgb},0.03)`,
                  lineHeight: 1,
                  zIndex: 4,
                }}
              >
                {a.rank}
              </span>

              {/* Model badge */}
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  ...mo,
                  fontSize: 7,
                  color: `rgba(${a.rgb},0.2)`,
                  zIndex: 4,
                }}
              >
                {a.model}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
