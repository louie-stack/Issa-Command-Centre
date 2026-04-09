"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";

const projects = [
  { name: "Mansa", sub: "Whispers of the Wind", context: "Personal IP", agent: "Script-V", agentColor: "#F97316", deadline: "Apr 15", shots: 24, scenes: 6, pct: 72, status: "In Production", color: "#2DD4BF", board: { queued: [ { title: "Night camp, firelight", scene: "Scene 05", tool: "Runway" }, { title: "Coronation, wide epic", scene: "Scene 06", tool: "Hailuo" }, { title: "Village elders, medium", scene: "Scene 05", tool: "MidJourney" }, { title: "Sunset prayer, silhouette", scene: "Scene 06", tool: "Runway" }, { title: "Battle preparation, tracking", scene: "Scene 06", tool: "Hailuo" }, { title: "Crown reveal, macro detail", scene: "Scene 06", tool: "MidJourney" }, ], generating: [ { title: "Market entrance, golden hr", scene: "Scene 04", tool: "Runway", pct: 65 }, { title: "River crossing, low angle", scene: "Scene 04", tool: "MidJourney", pct: 30 }, { title: "Oasis arrival, wide", scene: "Scene 03", tool: "Runway", pct: 12 }, { title: "Merchant negotiation, OTS", scene: "Scene 03", tool: "Hailuo", pct: null }, ], review: [ { title: "Throne room, overhead", scene: "Scene 01 / 003", tool: "Runway" }, { title: "Caravan, Sahara drone", scene: "Scene 03 / 004", tool: "Hailuo" }, { title: "Council chamber, wide", scene: "Scene 02", tool: "MidJourney" }, { title: "Palace gates, dolly push", scene: "Scene 01", tool: "Runway" }, ], approved: [ { title: "Desert palace, wide", scene: "Scene 01 / 001", tool: "Runway" }, { title: "Warrior council, close-up", scene: "Scene 02 / 002", tool: "MidJourney" }, { title: "Palace interior, tracking", scene: "Scene 01", tool: "Runway" }, ], }, activity: [ { agent: "Script-V", agentColor: "#F97316", text: "generated shot 014 — market entrance, golden hour", time: "2 min ago", detail: "Runway Gen-3", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Lumen", agentColor: "#D4A800", text: "approved shot 002 — warrior council, style check passed", time: "28 min ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "queued 3 new shots for Scene 05", time: "1 hr ago", detail: null, status: "QUEUED", statusColor: "#EF4444" }, { agent: "Script-V", agentColor: "#F97316", text: "re-generated shot 009 — revised prompt, wider angle", time: "3 hrs ago", detail: "Runway Gen-3", status: null, statusColor: null }, ], deliverables: [ { title: "Scene 1 Storyboard", detail: "4 shots", sent: "Mar 18", status: "sent", feedback: "Feedback received" }, { title: "Scene 2 Draft", detail: "3 shots", sent: "Mar 20", status: "sent", feedback: "Awaiting feedback" }, { title: "Scene 3 Batch", detail: "4 shots in review", sent: "Est. Mar 23", status: "pending", feedback: null }, { title: "Scenes 4-6", detail: "10 shots in pipeline", sent: null, status: "not_started", feedback: null }, ], },
  { name: "Coca-Cola", sub: "Holiday Concept", context: "Amissa Studios", agent: "Lumen", agentColor: "#D4A800", deadline: "Mar 28", shots: 12, scenes: 3, pct: 58, status: "Review", color: "#F97316", board: { queued: [{ title: "Family dinner, warm wide", scene: "Scene 03", tool: "Freepik AI" }], generating: [ { title: "Snow truck arrival, hero", scene: "Scene 02", tool: "MidJourney", pct: 45 }, { title: "Gift exchange, close-up", scene: "Scene 03", tool: "Freepik AI", pct: 20 }, ], review: [ { title: "Holiday table, overhead", scene: "Scene 01", tool: "Freepik AI" }, { title: "Fireplace glow, medium", scene: "Scene 01", tool: "MidJourney" }, { title: "Snow truck, side angle", scene: "Scene 02", tool: "MidJourney" }, { title: "Kids playing, tracking", scene: "Scene 02", tool: "Freepik AI" }, { title: "Coca-Cola pour, macro", scene: "Scene 01", tool: "Freepik AI" }, ], approved: [ { title: "Winter village, establishing", scene: "Scene 01 / 001", tool: "MidJourney" }, { title: "Bottle hero shot, studio", scene: "Scene 01 / 002", tool: "Freepik AI" }, { title: "Snowfall street, wide", scene: "Scene 02 / 003", tool: "MidJourney" }, ], }, activity: [ { agent: "Lumen", agentColor: "#D4A800", text: "flagged snow truck — color grade too cold", time: "15 min ago", detail: "Style check", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Script-V", agentColor: "#F97316", text: "generated gift exchange close-up", time: "1 hr ago", detail: "Freepik AI", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "compiled client deck — 7 frames ready", time: "3 hrs ago", detail: null, status: null, statusColor: null }, ], deliverables: [ { title: "Initial Mood Board", detail: "3 frames", sent: "Mar 15", status: "sent", feedback: "Feedback received" }, { title: "Draft Deck v1", detail: "7 frames", sent: "Mar 22", status: "sent", feedback: "Awaiting feedback" }, { title: "Final Deck", detail: "12 frames", sent: "Est. Mar 27", status: "pending", feedback: null }, ], },
  { name: "AI Workshop", sub: "Series", context: "Amissa Studios", agent: "Chronos", agentColor: "#2DD4BF", deadline: "May 01", shots: null, scenes: null, pct: 15, status: "Concept", color: "#5EEAD4", board: { queued: [ { title: "Module 1 — Intro to AI filmmaking", scene: "Workshop 01", tool: "Docs" }, { title: "Module 2 — Prompt engineering", scene: "Workshop 01", tool: "Docs" }, { title: "Module 3 — Storyboard pipeline", scene: "Workshop 02", tool: "Docs" }, { title: "Landing page copy", scene: "Marketing", tool: "Docs" }, { title: "Registration flow design", scene: "Marketing", tool: "Figma" }, ], generating: [{ title: "Course outline structure", scene: "Planning", tool: "Chronos", pct: 40 }], review: [{ title: "Workshop positioning brief", scene: "Strategy", tool: "Docs" }], approved: [{ title: "Target audience research", scene: "Strategy", tool: "Synthetix" }], }, activity: [ { agent: "Chronos", agentColor: "#2DD4BF", text: "drafted course outline — 3 modules, 8 lessons", time: "2 hrs ago", detail: null, status: "GENERATING", statusColor: "#F97316" }, { agent: "Synthetix", agentColor: "#8CA0C8", text: "completed audience research — filmmakers + creators", time: "5 hrs ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, ], deliverables: [ { title: "Course Outline", detail: "3 modules", sent: "Est. Apr 01", status: "pending", feedback: null }, { title: "Registration Page", detail: "Landing + checkout", sent: null, status: "not_started", feedback: null }, ], },
  { name: "Freepik", sub: "AI Templates", context: "Freepik", agent: "Script-V", agentColor: "#F97316", deadline: "Mar 31", shots: 8, scenes: 2, pct: 61, status: "In Production", color: "#2DD4BF", board: { queued: [ { title: "Social media template set", scene: "Pack 02", tool: "Freepik AI" }, { title: "Story format variants", scene: "Pack 02", tool: "Freepik AI" }, ], generating: [ { title: "Brand deck template", scene: "Pack 01", tool: "Freepik AI", pct: 80 }, { title: "Pitch deck layout", scene: "Pack 01", tool: "Freepik AI", pct: 55 }, ], review: [{ title: "Portfolio template, dark", scene: "Pack 01", tool: "Freepik AI" }], approved: [ { title: "Presentation base, minimal", scene: "Pack 01 / 001", tool: "Freepik AI" }, { title: "Resume template, modern", scene: "Pack 01 / 002", tool: "Freepik AI" }, { title: "Invoice template, clean", scene: "Pack 01 / 003", tool: "Freepik AI" }, ], }, activity: [ { agent: "Script-V", agentColor: "#F97316", text: "generated brand deck — 12 slides", time: "20 min ago", detail: "Freepik AI", status: "GENERATING", statusColor: "#F97316" }, { agent: "Lumen", agentColor: "#D4A800", text: "approved invoice template — clean pass", time: "2 hrs ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "scheduled Pack 02 generation", time: "4 hrs ago", detail: null, status: "QUEUED", statusColor: "#EF4444" }, ], deliverables: [ { title: "Pack 01 — Business", detail: "5 templates", sent: "Mar 19", status: "sent", feedback: "Feedback received" }, { title: "Pack 01 — Remaining", detail: "3 in progress", sent: "Est. Mar 25", status: "pending", feedback: null }, { title: "Pack 02 — Social", detail: "4 templates", sent: null, status: "not_started", feedback: null }, ], },
];

const columns = [
  { key: "queued", label: "QUEUED", color: "#EF4444", rgb: "239,68,68" },
  { key: "generating", label: "GENERATING", color: "#F97316", rgb: "249,115,22" },
  { key: "review", label: "REVIEW", color: "#EAB308", rgb: "234,179,8" },
  { key: "approved", label: "APPROVED", color: "#2DD4BF", rgb: "45,212,191" },
];

const mono = { fontFamily: "'Space Mono', monospace" };
const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const TEAL = "45,212,191";
const GOLD = "212,168,0";

function glowCard(rgb, h) {
  return {
    background: h
      ? "linear-gradient(180deg, rgba(6,32,38,0.78), rgba(10,22,34,0.75) 48%, rgba(6,18,26,0.8))"
      : "linear-gradient(180deg, rgba(5,30,35,0.75), rgba(10,20,30,0.72) 48%, rgba(6,16,24,0.78))",
    border: `1px solid rgba(${rgb},${h ? 0.42 : 0.35})`,
    boxShadow: h
      ? `0 0 40px rgba(${rgb},0.24), 0 0 78px rgba(${rgb},0.12), 0 10px 26px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.16)`
      : `0 0 25px rgba(${rgb},0.12), 0 0 50px rgba(${rgb},0.06), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)`,
    backdropFilter: h ? "blur(9px) saturate(125%)" : "blur(8px) saturate(120%)",
    WebkitBackdropFilter: h ? "blur(9px) saturate(125%)" : "blur(8px) saturate(120%)",
    color: "#F2F7FF",
    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
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

function KanbanCard({ card, col }) {
  const [h, setH] = useState(false);
  const isGen = col.key === "generating";
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        margin: "0 12px 8px",
        padding: "14px 16px",
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        borderLeft: `2px solid ${col.color}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...glowCard(col.rgb, h),
      }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${col.rgb},${h ? 0.1 : 0.06}) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />
      <div style={{ position: "relative" }}>
        <div style={{ ...jakarta, fontSize: 12, color: col.key === "queued" ? "#99A" : "#BBC", fontWeight: 500 }}>{card.title}</div>
        {isGen && card.pct != null && (
          <div style={{ marginTop: 8, height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}>
            <div style={{ width: card.pct + "%", height: "100%", background: col.color, borderRadius: 1 }} />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: isGen && card.pct != null ? 6 : 8 }}>
          <span style={{ ...mono, fontSize: 10, color: "#334" }}>{card.scene}</span>
          <span style={{ ...mono, fontSize: 10, color: isGen ? col.color : col.key === "queued" ? col.color + "B3" : col.color + "99" }}>
            {isGen && card.pct != null ? card.pct + "%" : isGen ? "Starting" : card.tool}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectsPageInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("board");
  const [activeProject, setActiveProject] = useState(() => {
    const p = parseInt(searchParams?.get("p") ?? "0", 10);
    return isNaN(p) || p < 0 || p >= projects.length ? 0 : p;
  });
  const [mobileBoardCol, setMobileBoardCol] = useState("generating");
  const isMobile = useIsMobile();

  // Custom projects from data.json
  const [customProjects, setCustomProjects] = useState([]);
  const [showNewForm, setShowNewForm] = useState(searchParams?.get("new") === "1");
  const [npName, setNpName] = useState("");
  const [npType, setNpType] = useState("Personal IP");
  const [npStatus, setNpStatus] = useState("Planning");
  const [npDeadline, setNpDeadline] = useState("");
  const [npSaving, setNpSaving] = useState(false);

  useEffect(() => {
    fetch("/data.json").then(r => r.json()).then(d => setCustomProjects(d.customProjects ?? [])).catch(() => {});
  }, []);

  async function saveNewProject() {
    if (!npName.trim()) return;
    setNpSaving(true);
    const newProj = { name: npName.trim(), type: npType, status: npStatus, deadline: npDeadline, color: "#2DD4BF", pct: 0, shots: 0, scenes: 0, sub: npType };
    const updatedCustom = [...customProjects, newProj];
    setCustomProjects(updatedCustom);
    const dataRes = await fetch("/data.json").then(r => r.json()).catch(() => ({}));
    await fetch("/api/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...dataRes, customProjects: updatedCustom }) }).catch(() => {});
    setNpSaving(false);
    setShowNewForm(false);
    setNpName(""); setNpType("Personal IP"); setNpStatus("Planning"); setNpDeadline("");
  }

  const proj = projects[activeProject];

  return (
    <div style={{ minHeight: "100vh", color: "#E8E8F0", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "30%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.03) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", animation: "breathe 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: -60, right: "10%", width: 400, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.025) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", animation: "breathe 10s ease-in-out 2s infinite" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.018, pointerEvents: "none", zIndex: 0, backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />

        <Nav />

        {/* Sidebar — hidden on mobile */}
        {!isMobile && (
          <div style={{ width: 200, flexShrink: 0, borderRight: "1px dashed rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
            <div style={{ padding: "24px 16px 16px" }}><div style={{ ...mono, fontSize: 11, color: "#2DD4BF", letterSpacing: "0.1em" }}>PROJECTS</div></div>
            <div style={{ flex: 1 }}>
              {projects.map((p, i) => {
                const sel = i === activeProject;
                const rgb = p.color === "#2DD4BF" ? TEAL : p.color === "#F97316" ? "249,115,22" : p.color === "#5EEAD4" ? "94,234,212" : TEAL;
                return (
                  <div
                    key={i}
                    onClick={() => { setActiveProject(i); setActiveTab("board"); }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      borderLeft: sel ? "2px solid " + p.color : "2px solid transparent",
                      position: "relative",
                      ...(sel ? {
                        background: `rgba(${rgb},0.06)`,
                        boxShadow: `inset 0 0 20px rgba(${rgb},0.05)`,
                      } : { background: "transparent" }),
                    }}>
                    {sel && (
                      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${rgb},0.06) 0%, transparent 70%)` }} />
                    )}
                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ ...jakarta, fontSize: 12, fontWeight: 700, color: sel ? "#E8E8F0" : "#AAB8C8" }}>{p.name}</span>
                      {p.pct != null ? <span style={{ ...mono, fontSize: 10, color: p.color }}>{p.pct}%</span> : <span style={{ ...mono, fontSize: 10, padding: "2px 6px", borderRadius: 10, background: p.color + "0F", color: p.color }}>{p.status.toUpperCase()}</span>}
                    </div>
                    <div style={{ position: "relative", ...mono, fontSize: 10, color: "#334", marginTop: 4 }}>{p.shots ? p.shots + " shots" : p.sub}</div>
                    {p.pct != null && sel && <div style={{ position: "relative", marginTop: 8, height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}><div style={{ width: p.pct + "%", height: "100%", background: p.color, borderRadius: 1 }} /></div>}
                  </div>
                );
              })}
            </div>
            {customProjects.map((cp, ci) => (
              <div key={"cp" + ci} style={{ padding: "10px 16px", borderLeft: "2px solid rgba(45,212,191,0.25)", background: "rgba(45,212,191,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ ...jakarta, fontSize: 12, fontWeight: 700, color: "#889" }}>{cp.name}</span>
                  <span style={{ ...mono, fontSize: 9, padding: "2px 5px", borderRadius: 8, background: "rgba(45,212,191,0.06)", color: "#2DD4BF" }}>{cp.status.toUpperCase()}</span>
                </div>
                <div style={{ ...mono, fontSize: 10, color: "#334", marginTop: 3 }}>{cp.type}</div>
              </div>
            ))}
            <div style={{ padding: "16px 20px", borderTop: "1px dashed rgba(255,255,255,0.04)" }}>
              <div onClick={() => setShowNewForm(true)} style={{ padding: "8px 0", textAlign: "center", borderRadius: 8, border: "1px dashed rgba(45,212,191,0.12)", cursor: "pointer", transition: "all 0.2s" }}><span style={{ ...mono, fontSize: 11, color: "#2DD4BF" }}>+ New Project</span></div>
            </div>
          </div>
        )}

        {/* Main workspace */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>

          {/* Mobile project selector pills */}
          {isMobile && (
            <div style={{ padding: "12px 16px 0", overflowX: "auto", display: "flex", gap: 8, flexShrink: 0 }}>
              {projects.map((p, i) => (
                <div
                  key={i}
                  onClick={() => { setActiveProject(i); setActiveTab("board"); }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    background: i === activeProject ? `rgba(${p.color === "#2DD4BF" ? TEAL : p.color === "#F97316" ? "249,115,22" : "45,212,191"},0.12)` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${i === activeProject ? p.color + "44" : "rgba(255,255,255,0.08)"}`,
                    ...mono,
                    fontSize: 11,
                    color: i === activeProject ? p.color : "#8FA1B8",
                    transition: "all 0.2s",
                  }}>
                  {p.name}
                </div>
              ))}
            </div>
          )}

          {/* Header */}
          <div style={{ padding: isMobile ? "12px 16px" : "20px 28px", display: "flex", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0, justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ ...jakarta, fontSize: isMobile ? 15 : 18, fontWeight: 800 }}>{proj.name}</span>
              <span style={{ ...mono, fontSize: 11, color: "#6E819A" }}>{proj.sub}</span>
              <span style={{ ...mono, fontSize: 10, color: proj.color, padding: "3px 8px", border: "1px solid " + proj.color + "1A", borderRadius: 20 }}>{proj.status.toUpperCase()}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: proj.agentColor }} /><span style={{ ...mono, fontSize: 11, color: "#8FA1B8" }}>{proj.agent}</span></div>
              <span style={{ ...mono, fontSize: 11, color: "#334" }}>{proj.deadline}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ padding: isMobile ? "0 16px" : "0 28px", display: "flex", gap: 0, borderBottom: "1px dashed rgba(255,255,255,0.06)", overflowX: "auto" }}>
            {["board", "activity", "deliverables"].map(t => (
              <div key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 16px", ...mono, fontSize: 10, letterSpacing: "0.06em", cursor: "pointer", color: activeTab === t ? "#2DD4BF" : "#334", borderBottom: activeTab === t ? "1px solid #2DD4BF" : "1px solid transparent", transition: "all 0.25s", whiteSpace: "nowrap" }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            ))}
          </div>

          {/* Board */}
          {activeTab === "board" && (
            <>
              {/* Mobile column selector */}
              {isMobile && (
                <div style={{ padding: "10px 16px", display: "flex", gap: 8, overflowX: "auto", borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
                  {columns.map(col => (
                    <div
                      key={col.key}
                      onClick={() => setMobileBoardCol(col.key)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 16,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        background: mobileBoardCol === col.key ? `rgba(${col.rgb},0.12)` : "rgba(255,255,255,0.03)",
                        border: `1px solid rgba(${col.rgb},${mobileBoardCol === col.key ? 0.4 : 0.12})`,
                        ...mono,
                        fontSize: 10,
                        color: mobileBoardCol === col.key ? col.color : "#6E819A",
                        transition: "all 0.2s",
                      }}>
                      {col.label} ({proj.board[col.key].length})
                    </div>
                  ))}
                </div>
              )}

              <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr" }}>
                {columns.filter(col => !isMobile || col.key === mobileBoardCol).map((col, ci) => {
                  const cards = proj.board[col.key];
                  const max = col.key === "approved" ? 3 : col.key === "queued" ? 4 : 999;
                  const visible = cards.slice(0, max);
                  const more = cards.length - visible.length;
                  return (
                    <div key={col.key} style={{ borderRight: !isMobile && ci < 3 ? "1px dashed rgba(255,255,255,0.04)" : "none", paddingTop: 4, display: "flex", flexDirection: "column" }}>
                      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: col.color }} />
                          <span style={{ ...mono, fontSize: 11, color: "#8FA1B8", letterSpacing: "0.06em" }}>{col.label}</span>
                        </div>
                        <span style={{ ...jakarta, fontSize: 14, fontWeight: 800, color: col.color + "66" }}>{cards.length}</span>
                      </div>
                      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
                        {visible.map((card, i) => (
                          <KanbanCard key={i} card={card} col={col} />
                        ))}
                        {more > 0 && <div style={{ padding: "8px 16px" }}><span style={{ ...mono, fontSize: 10, color: col.key === "approved" ? "#2DD4BF" : "#334", cursor: "pointer" }}>+{more} more{col.key === "approved" ? " →" : ""}</span></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <div style={{ padding: isMobile ? "16px 16px" : "24px 28px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ ...mono, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
                <span style={{ ...mono, fontSize: 10, color: "#2DD4BF" }}>ACTIVITY</span>
                <span style={{ ...mono, fontSize: 11, color: "#334", marginLeft: 4 }}>{proj.name} / last 24 hours</span>
              </div>
              <div style={{ position: "relative", paddingLeft: isMobile ? 36 : 48 }}>
                <div style={{ position: "absolute", left: isMobile ? 10 : 18, top: 0, bottom: 0, width: 1, borderLeft: "1px dashed rgba(255,255,255,0.04)" }} />
                {proj.activity.map((item, i) => {
                  const agentRgb = item.agentColor === "#F97316" ? "249,115,22" : item.agentColor === "#D4A800" ? "212,168,0" : item.agentColor === "#2DD4BF" ? "45,212,191" : "140,160,200";
                  return (
                    <ActivityCard key={i} item={item} agentRgb={agentRgb} dim={i >= 3} isMobile={isMobile} />
                  );
                })}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {activeTab === "deliverables" && (
            <div style={{ padding: isMobile ? "16px 16px" : "24px 28px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <span style={{ ...mono, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
                <span style={{ ...mono, fontSize: 10, color: "#2DD4BF" }}>DELIVERABLES</span>
                <span style={{ ...mono, fontSize: 11, color: "#334", marginLeft: 4 }}>{proj.name} / {proj.context}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {proj.deliverables.map((d, i) => (
                  <DeliverableCard key={i} d={d} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── NEW PROJECT FORM OVERLAY ── */}
      {showNewForm && (
        <div onClick={() => setShowNewForm(false)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, borderRadius: 18, background: "rgba(6,12,18,0.98)", border: "1px solid rgba(45,212,191,0.22)", boxShadow: "0 0 60px rgba(45,212,191,0.12), 0 30px 80px rgba(0,0,0,0.7)", padding: "28px 28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <div style={{ ...mono, fontSize: 9, color: "#2DD4BF", letterSpacing: "0.1em", marginBottom: 4 }}>NEW PROJECT</div>
                <div style={{ ...jakarta, fontSize: 18, fontWeight: 800, color: "#E8E8F0" }}>Create Project</div>
              </div>
              <button onClick={() => setShowNewForm(false)} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#8FA1B8", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Project Name", el: <input autoFocus value={npName} onChange={e => setNpName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveNewProject()} placeholder="e.g. Short Film Concept" style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: 8, padding: "9px 12px", color: "#C8E8E4", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} /> },
                { label: "Type", el: <select value={npType} onChange={e => setNpType(e.target.value)} style={{ width: "100%", background: "rgba(6,12,18,0.98)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: 8, padding: "9px 12px", color: "#C8E8E4", fontSize: 13, fontFamily: "'Space Mono', monospace", outline: "none", cursor: "pointer" }}>{["Personal IP","Client Work","Consulting","Research","Marketing"].map(o => <option key={o} value={o}>{o}</option>)}</select> },
                { label: "Status", el: <select value={npStatus} onChange={e => setNpStatus(e.target.value)} style={{ width: "100%", background: "rgba(6,12,18,0.98)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: 8, padding: "9px 12px", color: "#C8E8E4", fontSize: 13, fontFamily: "'Space Mono', monospace", outline: "none", cursor: "pointer" }}>{["Planning","Concept","In Production","Review","Complete"].map(o => <option key={o} value={o}>{o}</option>)}</select> },
                { label: "Target Deadline", el: <input type="date" value={npDeadline} onChange={e => setNpDeadline(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: 8, padding: "9px 12px", color: "#C8E8E4", fontSize: 13, fontFamily: "inherit", outline: "none", colorScheme: "dark", boxSizing: "border-box" }} /> },
              ].map(({ label, el }) => (
                <div key={label}>
                  <div style={{ ...mono, fontSize: 9, color: "#8FA1B8", letterSpacing: "0.08em", marginBottom: 6 }}>{label.toUpperCase()}</div>
                  {el}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={() => setShowNewForm(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#8FA1B8", fontSize: 12, fontFamily: "'Space Mono', monospace", cursor: "pointer" }}>CANCEL</button>
              <button onClick={saveNewProject} disabled={!npName.trim() || npSaving} style={{ flex: 2, padding: "10px 0", borderRadius: 8, border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.1)", color: "#2DD4BF", fontSize: 12, fontFamily: "'Space Mono', monospace", cursor: npName.trim() ? "pointer" : "not-allowed", opacity: npName.trim() ? 1 : 0.4, transition: "all 0.2s" }}>{npSaving ? "SAVING..." : "CREATE PROJECT →"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return <Suspense fallback={null}><ProjectsPageInner /></Suspense>;
}

function ActivityCard({ item, agentRgb, dim, isMobile }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: 12, display: "flex", alignItems: "center", opacity: dim ? 0.5 : 1 }}>
      <div style={{ position: "absolute", left: isMobile ? -36 : -48, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg style={{ position: "absolute", inset: 0, animation: "spin 3s linear infinite" }} width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke={item.agentColor + "4D"} strokeWidth="1" strokeDasharray="12 82" strokeLinecap="round" /></svg>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.agentColor + "14", border: "1.5px solid " + item.agentColor }} />
      </div>
      <div
        onMouseEnter={() => h || undefined}
        onMouseLeave={() => undefined}
        style={{ flex: 1, padding: "16px 20px", borderRadius: 12, position: "relative", overflow: "hidden", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", ...glowCard(agentRgb, h) }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${agentRgb},${h ? 0.08 : 0.04}) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 13, color: "#BBC", marginBottom: 6 }}><span style={{ color: item.agentColor, fontWeight: 600 }}>{item.agent}</span> {item.text}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ ...mono, fontSize: 10, color: "#334" }}>{item.time}</span>
            {item.detail && <span style={{ ...mono, fontSize: 10, color: "#334" }}>{item.detail}</span>}
            {item.status && <span style={{ ...mono, fontSize: 10, padding: "2px 6px", borderRadius: 8, background: item.statusColor + "0F", color: item.statusColor }}>{"\u2192"} {item.status}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliverableCard({ d }) {
  const [h, setH] = useState(false);
  const isSent = d.status === "sent";
  const isPending = d.status === "pending";
  const iconColor = isSent ? "#2DD4BF" : isPending ? "#EAB308" : "#334";
  const rgb = isSent ? TEAL : isPending ? GOLD : "80,80,100";
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ padding: "18px 22px", borderRadius: 12, position: "relative", overflow: "hidden", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, ...glowCard(rgb, h) }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${rgb},${h ? 0.08 : 0.04}) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: iconColor + "0A", border: "1px solid " + iconColor + "1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {isSent ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg> : isPending ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> : <span style={{ ...mono, fontSize: 9, color: "#334" }}>...</span>}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: d.status === "not_started" ? "#778" : "#E8E8F0", marginBottom: 3 }}>{d.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ ...mono, fontSize: 10, color: "#6E819A" }}>{d.detail}</span>
            {d.sent && <span style={{ ...mono, fontSize: 10, color: "#334" }}>{d.status === "pending" ? d.sent : "Sent " + d.sent}</span>}
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {d.feedback ? <span style={{ ...mono, fontSize: 11, color: d.feedback === "Feedback received" ? "#2DD4BF" : "#D4A800" }}>{d.feedback}</span> : isPending ? <div style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(45,212,191,0.12)", background: "rgba(45,212,191,0.04)", cursor: "pointer" }}><span style={{ ...mono, fontSize: 11, color: "#2DD4BF" }}>Send when ready</span></div> : d.status === "not_started" ? <span style={{ ...mono, fontSize: 11, color: "#334" }}>Not started</span> : null}
      </div>
    </div>
  );
}

