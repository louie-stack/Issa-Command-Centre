"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function AgentsPageInner() {
  const searchParams = useSearchParams();
  const [sel, setSel] = useState(0);
  const [trans, setTrans] = useState(false);
  const isMobile = useIsMobile();

  // Chat panel
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([{ role: "assistant", agent: "CHRONOS", agentKey: 0, text: "Morning. All four agents standing by. What do you need?", time: "now" }]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);
  useEffect(() => { if (chatOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [chatOpen]);
  useEffect(() => { if (searchParams?.get("chat") === "1") setChatOpen(true); }, [searchParams]);

  const AGENT_SYSTEM = {
    0: { name: "Chronos", color: "45,212,191", hex: "#2DD4BF", label: "C", sys: "You are Chronos, Chief of Staff for Issa Sissoko. You handle scheduling, briefs, task routing, and pipeline coordination. Be concise, structured, professional. Never use em dashes. Max 3 sentences." },
    1: { name: "Script-V", color: "249,115,22", hex: "#F97316", label: "S", sys: "You are Script-V, Content Pipeline agent for Issa Sissoko. You handle shot lists, storyboards, scene prompts, and creative directions. Be creative, precise, cinematic in language. Never use em dashes. Max 3 sentences." },
    2: { name: "Lumen", color: "212,168,0", hex: "#D4A800", label: "L", sys: "You are Lumen, Color and Grade agent for Issa Sissoko. You handle visual style, palette direction, grade notes, and aesthetic decisions. Be visual, evocative, technical. Never use em dashes. Max 3 sentences." },
    3: { name: "Synthetix", color: "100,116,139", hex: "#8CA0C8", label: "X", sys: "You are Synthetix, Research and Intel agent for Issa Sissoko. You handle trends, competitor analysis, deal research, and market intelligence. Be analytical, sharp, data-aware. Never use em dashes. Max 3 sentences." },
  };

  async function sendChat() {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    const userMsg = { role: "user", text };
    setChatMsgs(prev => [...prev, userMsg]);
    setChatLoading(true);
    const ag = AGENT_SYSTEM[sel];
    try {
      const history = [...chatMsgs, userMsg].map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": "", "anthropic-version": "2023-06-01", "anthropic-dangerous-client-side-origin-allowlist": "*" },
        body: JSON.stringify({ model: "claude-haiku-4-20250514", max_tokens: 400, system: ag.sys, messages: history }),
      });
      const data = await res.json();
      const reply = data?.content?.map(b => b.text || "").join("") || "No response.";
      setChatMsgs(prev => [...prev, { role: "assistant", agent: ag.name.toUpperCase(), agentKey: sel, text: reply, time: "now" }]);
    } catch {
      setChatMsgs(prev => [...prev, { role: "assistant", agent: ag.name.toUpperCase(), agentKey: sel, text: "Connection issue. Try again in a moment.", time: "now" }]);
    }
    setChatLoading(false);
  }

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
        <img src="/team-banner.png" alt="Agent team" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: isMobile ? "150%" : "100%", objectFit: "cover", objectPosition: isMobile ? "top center" : "center 10%", animation: "slowZoom 25s ease-in-out infinite alternate" }} />
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
          marginTop: 24,
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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", height: isMobile ? 420 : 780, overflow: "hidden", background: "#000", width: "100%", order: isMobile ? -1 : 0 }}>
            <div style={{ position: "relative", height: isMobile ? "130%" : "100%", overflow: "hidden", flexShrink: 0, background: "#000" }}>
              <video key={a.video} src={a.video} autoPlay loop muted playsInline style={{ display: "block", height: "100%", width: "auto", position: "relative", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "100%", background: "linear-gradient(90deg, #000 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "10%", height: "100%", background: "linear-gradient(270deg, #000 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(0deg, #000 0%, transparent 100%)", zIndex: 3, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, rgba(${a.rgb},0.18) 0%, transparent 70%)`, filter: "blur(30px)", zIndex: 0, pointerEvents: "none", transition: "background 0.4s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── CHAT TOGGLE BUTTON ───────── */}
      <button
        onClick={() => setChatOpen(v => !v)}
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200, width: 52, height: 52, borderRadius: "50%", background: chatOpen ? `rgba(${AGENT_SYSTEM[sel].color},0.18)` : "rgba(6,12,18,0.95)", border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.35)`, boxShadow: `0 0 20px rgba(${AGENT_SYSTEM[sel].color},0.25), 0 8px 24px rgba(0,0,0,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
        title={chatOpen ? "Close chat" : "Talk to agent"}
      >
        {chatOpen
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={AGENT_SYSTEM[sel].hex} strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={AGENT_SYSTEM[sel].hex} strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
      </button>

      {/* ── CHAT PANEL ───────────────── */}
      <div style={{ position: "fixed", bottom: 90, right: 28, zIndex: 199, width: isMobile ? "calc(100vw - 32px)" : 380, maxHeight: "65vh", borderRadius: 18, background: "rgba(6,12,18,0.97)", border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.22)`, boxShadow: `0 0 40px rgba(${AGENT_SYSTEM[sel].color},0.12), 0 24px 60px rgba(0,0,0,0.7)`, display: "flex", flexDirection: "column", overflow: "hidden", transform: chatOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)", opacity: chatOpen ? 1 : 0, pointerEvents: chatOpen ? "all" : "none", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        {/* Header */}
        <div style={{ padding: "14px 16px", borderBottom: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.1)`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${AGENT_SYSTEM[sel].color},0.08)`, border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.18)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 800, color: AGENT_SYSTEM[sel].hex }}>{AGENT_SYSTEM[sel].label}</div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#E8E8F0" }}>{AGENT_SYSTEM[sel].name}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: `rgba(${AGENT_SYSTEM[sel].color},0.7)` }}>ONLINE · READY</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => setChatMsgs([{ role: "assistant", agent: AGENT_SYSTEM[sel].name.toUpperCase(), agentKey: sel, text: "Chat cleared. What do you need?", time: "now" }])} title="Clear" style={{ background: "none", border: "none", color: "#334", cursor: "pointer", fontSize: 13, lineHeight: 1 }}>↺</button>
          </div>
        </div>
        {/* Agent selector tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid rgba(255,255,255,0.04)`, flexShrink: 0 }}>
          {Object.values(AGENT_SYSTEM).map((ag, i) => (
            <button key={i} onClick={() => { setSel(i); pick(i); }} style={{ flex: 1, padding: "8px 4px", background: sel === i ? `rgba(${ag.color},0.07)` : "transparent", border: "none", borderBottom: sel === i ? `1px solid ${ag.hex}` : "1px solid transparent", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 9, color: sel === i ? ag.hex : "#334", transition: "all 0.2s", marginBottom: -1 }}>{ag.label}</button>
          ))}
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
          {chatMsgs.map((m, i) => m.role === "user" ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ padding: "8px 12px", borderRadius: "12px 12px 3px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)", maxWidth: "80%", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#BBB", lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: `rgba(${AGENT_SYSTEM[m.agentKey ?? 0].color},0.07)`, border: `1px solid rgba(${AGENT_SYSTEM[m.agentKey ?? 0].color},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 7, fontWeight: 800, color: AGENT_SYSTEM[m.agentKey ?? 0].hex, flexShrink: 0 }}>{AGENT_SYSTEM[m.agentKey ?? 0].label}</div>
              <div style={{ padding: "8px 12px", borderRadius: "12px 12px 12px 3px", background: `rgba(${AGENT_SYSTEM[m.agentKey ?? 0].color},0.04)`, border: `1px solid rgba(${AGENT_SYSTEM[m.agentKey ?? 0].color},0.07)`, maxWidth: "80%", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#889", lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: `rgba(${AGENT_SYSTEM[sel].color},0.07)`, border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 7, fontWeight: 800, color: AGENT_SYSTEM[sel].hex, flexShrink: 0 }}>{AGENT_SYSTEM[sel].label}</div>
              <div style={{ padding: "8px 12px", borderRadius: "12px 12px 12px 3px", background: `rgba(${AGENT_SYSTEM[sel].color},0.04)`, border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.07)`, display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(j => <span key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: AGENT_SYSTEM[sel].hex, animation: `pulse 1.2s ${j * 0.2}s infinite`, opacity: 0.6 }} />)}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input */}
        <div style={{ padding: "10px 12px", borderTop: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.08)`, display: "flex", gap: 8, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
            placeholder={`Message ${AGENT_SYSTEM[sel].name}…`}
            style={{ flex: 1, background: `rgba(${AGENT_SYSTEM[sel].color},0.04)`, border: `1px solid rgba(${AGENT_SYSTEM[sel].color},0.12)`, borderRadius: 8, padding: "8px 10px", color: "#C8E8E4", fontSize: 12, fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={sendChat} disabled={!chatInput.trim() || chatLoading} style={{ width: 34, height: 34, borderRadius: 8, background: chatInput.trim() ? `rgba(${AGENT_SYSTEM[sel].color},0.14)` : "transparent", border: `1px solid rgba(${AGENT_SYSTEM[sel].color},${chatInput.trim() ? 0.3 : 0.08})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: chatInput.trim() ? "pointer" : "not-allowed", transition: "all 0.2s", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim() ? AGENT_SYSTEM[sel].hex : "#334"} strokeWidth="2" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return <Suspense fallback={null}><AgentsPageInner /></Suspense>;
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
