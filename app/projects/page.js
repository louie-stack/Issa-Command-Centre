"use client";
import { useState } from "react";
import Link from "next/link";

const navPages = ["Dashboard", "Projects", "Agents", "Pipeline", "Deals", "Workshops"];
const navRoutes = { Dashboard: "/", Projects: "/projects", Agents: "#", Pipeline: "#", Deals: "#", Workshops: "#" };

const projects = [
  { name: "Mansa", sub: "Whispers of the Wind", context: "Personal IP", agent: "Script-V", agentColor: "#F97316", deadline: "Apr 15", shots: 24, scenes: 6, pct: 72, status: "In Production", color: "#2DD4BF", board: { queued: [ { title: "Night camp, firelight", scene: "Scene 05", tool: "Runway" }, { title: "Coronation, wide epic", scene: "Scene 06", tool: "Hailuo" }, { title: "Village elders, medium", scene: "Scene 05", tool: "MidJourney" }, { title: "Sunset prayer, silhouette", scene: "Scene 06", tool: "Runway" }, { title: "Battle preparation, tracking", scene: "Scene 06", tool: "Hailuo" }, { title: "Crown reveal, macro detail", scene: "Scene 06", tool: "MidJourney" }, ], generating: [ { title: "Market entrance, golden hr", scene: "Scene 04", tool: "Runway", pct: 65 }, { title: "River crossing, low angle", scene: "Scene 04", tool: "MidJourney", pct: 30 }, { title: "Oasis arrival, wide", scene: "Scene 03", tool: "Runway", pct: 12 }, { title: "Merchant negotiation, OTS", scene: "Scene 03", tool: "Hailuo", pct: null }, ], review: [ { title: "Throne room, overhead", scene: "Scene 01 / 003", tool: "Runway" }, { title: "Caravan, Sahara drone", scene: "Scene 03 / 004", tool: "Hailuo" }, { title: "Council chamber, wide", scene: "Scene 02", tool: "MidJourney" }, { title: "Palace gates, dolly push", scene: "Scene 01", tool: "Runway" }, ], approved: [ { title: "Desert palace, wide", scene: "Scene 01 / 001", tool: "Runway" }, { title: "Warrior council, close-up", scene: "Scene 02 / 002", tool: "MidJourney" }, { title: "Palace interior, tracking", scene: "Scene 01", tool: "Runway" }, ], }, activity: [ { agent: "Script-V", agentColor: "#F97316", text: "generated shot 014 — market entrance, golden hour", time: "2 min ago", detail: "Runway Gen-3", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Lumen", agentColor: "#D4A800", text: "approved shot 002 — warrior council, style check passed", time: "28 min ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "queued 3 new shots for Scene 05", time: "1 hr ago", detail: null, status: "QUEUED", statusColor: "#EF4444" }, { agent: "Script-V", agentColor: "#F97316", text: "re-generated shot 009 — revised prompt, wider angle", time: "3 hrs ago", detail: "Runway Gen-3", status: null, statusColor: null }, ], deliverables: [ { title: "Scene 1 Storyboard", detail: "4 shots", sent: "Mar 18", status: "sent", feedback: "Feedback received" }, { title: "Scene 2 Draft", detail: "3 shots", sent: "Mar 20", status: "sent", feedback: "Awaiting feedback" }, { title: "Scene 3 Batch", detail: "4 shots in review", sent: "Est. Mar 23", status: "pending", feedback: null }, { title: "Scenes 4-6", detail: "10 shots in pipeline", sent: null, status: "not_started", feedback: null }, ], },
  { name: "Coca-Cola", sub: "Holiday Concept", context: "Amissa Studios", agent: "Lumen", agentColor: "#D4A800", deadline: "Mar 28", shots: 12, scenes: 3, pct: 58, status: "Review", color: "#F97316", board: { queued: [{ title: "Family dinner, warm wide", scene: "Scene 03", tool: "Freepik AI" }], generating: [ { title: "Snow truck arrival, hero", scene: "Scene 02", tool: "MidJourney", pct: 45 }, { title: "Gift exchange, close-up", scene: "Scene 03", tool: "Freepik AI", pct: 20 }, ], review: [ { title: "Holiday table, overhead", scene: "Scene 01", tool: "Freepik AI" }, { title: "Fireplace glow, medium", scene: "Scene 01", tool: "MidJourney" }, { title: "Snow truck, side angle", scene: "Scene 02", tool: "MidJourney" }, { title: "Kids playing, tracking", scene: "Scene 02", tool: "Freepik AI" }, { title: "Coca-Cola pour, macro", scene: "Scene 01", tool: "Freepik AI" }, ], approved: [ { title: "Winter village, establishing", scene: "Scene 01 / 001", tool: "MidJourney" }, { title: "Bottle hero shot, studio", scene: "Scene 01 / 002", tool: "Freepik AI" }, { title: "Snowfall street, wide", scene: "Scene 02 / 003", tool: "MidJourney" }, ], }, activity: [ { agent: "Lumen", agentColor: "#D4A800", text: "flagged snow truck — color grade too cold", time: "15 min ago", detail: "Style check", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Script-V", agentColor: "#F97316", text: "generated gift exchange close-up", time: "1 hr ago", detail: "Freepik AI", status: "REVIEW", statusColor: "#EAB308" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "compiled client deck — 7 frames ready", time: "3 hrs ago", detail: null, status: null, statusColor: null }, ], deliverables: [ { title: "Initial Mood Board", detail: "3 frames", sent: "Mar 15", status: "sent", feedback: "Feedback received" }, { title: "Draft Deck v1", detail: "7 frames", sent: "Mar 22", status: "sent", feedback: "Awaiting feedback" }, { title: "Final Deck", detail: "12 frames", sent: "Est. Mar 27", status: "pending", feedback: null }, ], },
  { name: "AI Workshop", sub: "Series", context: "Amissa Studios", agent: "Chronos", agentColor: "#2DD4BF", deadline: "May 01", shots: null, scenes: null, pct: 15, status: "Concept", color: "#5EEAD4", board: { queued: [ { title: "Module 1 — Intro to AI filmmaking", scene: "Workshop 01", tool: "Docs" }, { title: "Module 2 — Prompt engineering", scene: "Workshop 01", tool: "Docs" }, { title: "Module 3 — Storyboard pipeline", scene: "Workshop 02", tool: "Docs" }, { title: "Landing page copy", scene: "Marketing", tool: "Docs" }, { title: "Registration flow design", scene: "Marketing", tool: "Figma" }, ], generating: [{ title: "Course outline structure", scene: "Planning", tool: "Chronos", pct: 40 }], review: [{ title: "Workshop positioning brief", scene: "Strategy", tool: "Docs" }], approved: [{ title: "Target audience research", scene: "Strategy", tool: "Synthetix" }], }, activity: [ { agent: "Chronos", agentColor: "#2DD4BF", text: "drafted course outline — 3 modules, 8 lessons", time: "2 hrs ago", detail: null, status: "GENERATING", statusColor: "#F97316" }, { agent: "Synthetix", agentColor: "#8CA0C8", text: "completed audience research — filmmakers + creators", time: "5 hrs ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, ], deliverables: [ { title: "Course Outline", detail: "3 modules", sent: "Est. Apr 01", status: "pending", feedback: null }, { title: "Registration Page", detail: "Landing + checkout", sent: null, status: "not_started", feedback: null }, ], },
  { name: "Freepik", sub: "AI Templates", context: "Freepik", agent: "Script-V", agentColor: "#F97316", deadline: "Mar 31", shots: 8, scenes: 2, pct: 61, status: "In Production", color: "#2DD4BF", board: { queued: [ { title: "Social media template set", scene: "Pack 02", tool: "Freepik AI" }, { title: "Story format variants", scene: "Pack 02", tool: "Freepik AI" }, ], generating: [ { title: "Brand deck template", scene: "Pack 01", tool: "Freepik AI", pct: 80 }, { title: "Pitch deck layout", scene: "Pack 01", tool: "Freepik AI", pct: 55 }, ], review: [{ title: "Portfolio template, dark", scene: "Pack 01", tool: "Freepik AI" }], approved: [ { title: "Presentation base, minimal", scene: "Pack 01 / 001", tool: "Freepik AI" }, { title: "Resume template, modern", scene: "Pack 01 / 002", tool: "Freepik AI" }, { title: "Invoice template, clean", scene: "Pack 01 / 003", tool: "Freepik AI" }, ], }, activity: [ { agent: "Script-V", agentColor: "#F97316", text: "generated brand deck — 12 slides", time: "20 min ago", detail: "Freepik AI", status: "GENERATING", statusColor: "#F97316" }, { agent: "Lumen", agentColor: "#D4A800", text: "approved invoice template — clean pass", time: "2 hrs ago", detail: null, status: "APPROVED", statusColor: "#2DD4BF" }, { agent: "Chronos", agentColor: "#2DD4BF", text: "scheduled Pack 02 generation", time: "4 hrs ago", detail: null, status: "QUEUED", statusColor: "#EF4444" }, ], deliverables: [ { title: "Pack 01 — Business", detail: "5 templates", sent: "Mar 19", status: "sent", feedback: "Feedback received" }, { title: "Pack 01 — Remaining", detail: "3 in progress", sent: "Est. Mar 25", status: "pending", feedback: null }, { title: "Pack 02 — Social", detail: "4 templates", sent: null, status: "not_started", feedback: null }, ], },
];

const columns = [
  { key: "queued", label: "QUEUED", color: "#EF4444" },
  { key: "generating", label: "GENERATING", color: "#F97316" },
  { key: "review", label: "REVIEW", color: "#EAB308" },
  { key: "approved", label: "APPROVED", color: "#2DD4BF" },
];

const mono = { fontFamily: "'Space Mono', monospace" };
const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("board");
  const [activeProject, setActiveProject] = useState(0);
  const proj = projects[activeProject];

  return (
    <div style={{ background: "#08080D", minHeight: "100vh", color: "#E8E8F0", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
      <div style={{ position: "absolute", top: -80, left: "30%", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,191,0.03) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", animation: "breathe 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: -60, right: "10%", width: 400, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.025) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", animation: "breathe 10s ease-in-out 2s infinite" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.018, pointerEvents: "none", zIndex: 0, backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 44px", background: "rgba(8,8,13,0.75)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px dashed rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 54, maxWidth: 1440, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(45,212,191,0.08)", border: "1.5px solid rgba(45,212,191,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 800, color: "#2DD4BF" }}>IS</div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700 }}>ISSA</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "#445" }}>COMMAND CENTRE</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 1 }}>
            {navPages.map((p, i) => (
              <Link key={i} href={navRoutes[p]} style={{ textDecoration: "none" }}>
                <div style={{ padding: "5px 12px", borderRadius: 2, cursor: "pointer", background: p === "Projects" ? "rgba(45,212,191,0.05)" : "transparent", border: p === "Projects" ? "1px solid rgba(45,212,191,0.1)" : "1px solid transparent" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: p === "Projects" ? "#2DD4BF" : "#556" }}>{p}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 3, background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 8, fontWeight: 800, color: "#2DD4BF" }}>IS</div>
        </div>
      </nav>

      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0, borderRight: "1px dashed rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
        <div style={{ padding: "24px 16px 16px" }}><div style={{ ...mono, fontSize: 8, color: "#2DD4BF", letterSpacing: "0.1em" }}>PROJECTS</div></div>
        <div style={{ flex: 1 }}>
          {projects.map((p, i) => (
            <div key={i} onClick={() => { setActiveProject(i); setActiveTab("board"); }} style={{ padding: "12px 16px", cursor: "pointer", transition: "all 0.25s", borderLeft: i === activeProject ? "2px solid " + p.color : "2px solid transparent", background: i === activeProject ? "rgba(255,255,255,0.02)" : "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ ...jakarta, fontSize: 12, fontWeight: 700, color: i === activeProject ? "#E8E8F0" : "#667" }}>{p.name}</span>
                {p.pct != null ? <span style={{ ...mono, fontSize: 7, color: p.color }}>{p.pct}%</span> : <span style={{ ...mono, fontSize: 7, padding: "2px 6px", borderRadius: 10, background: p.color + "0F", color: p.color }}>{p.status.toUpperCase()}</span>}
              </div>
              <div style={{ ...mono, fontSize: 7, color: "#334", marginTop: 4 }}>{p.shots ? p.shots + " shots" : p.sub}</div>
              {p.pct != null && i === activeProject && <div style={{ marginTop: 8, height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}><div style={{ width: p.pct + "%", height: "100%", background: p.color, borderRadius: 1 }} /></div>}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px dashed rgba(255,255,255,0.04)" }}>
          <div style={{ padding: "8px 0", textAlign: "center", borderRadius: 8, border: "1px dashed rgba(45,212,191,0.12)", cursor: "pointer" }}><span style={{ ...mono, fontSize: 9, color: "#2DD4BF" }}>+ New Project</span></div>
        </div>
      </div>

      {/* Main workspace */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ ...jakarta, fontSize: 18, fontWeight: 800 }}>{proj.name}</span>
            <span style={{ ...mono, fontSize: 8, color: "#445" }}>{proj.sub}</span>
            <span style={{ ...mono, fontSize: 7, color: proj.color, padding: "3px 8px", border: "1px solid " + proj.color + "1A", borderRadius: 20 }}>{proj.status.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: proj.agentColor }} /><span style={{ ...mono, fontSize: 8, color: "#556" }}>{proj.agent}</span></div>
            <span style={{ ...mono, fontSize: 8, color: "#334" }}>{proj.deadline}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: "0 28px", display: "flex", gap: 0, borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
          {["board", "activity", "deliverables"].map(t => (
            <div key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 16px", ...mono, fontSize: 10, letterSpacing: "0.06em", cursor: "pointer", color: activeTab === t ? "#2DD4BF" : "#334", borderBottom: activeTab === t ? "1px solid #2DD4BF" : "1px solid transparent", transition: "all 0.25s" }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>

        {/* Board */}
        {activeTab === "board" && (
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {columns.map((col, ci) => {
              const cards = proj.board[col.key];
              const max = col.key === "approved" ? 3 : col.key === "queued" ? 4 : 999;
              const visible = cards.slice(0, max);
              const more = cards.length - visible.length;
              return (
                <div key={col.key} style={{ borderRight: ci < 3 ? "1px dashed rgba(255,255,255,0.04)" : "none", paddingTop: 4, display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: col.color }} /><span style={{ ...mono, fontSize: 8, color: "#556", letterSpacing: "0.06em" }}>{col.label}</span></div>
                    <span style={{ ...jakarta, fontSize: 14, fontWeight: 800, color: col.color + "66" }}>{cards.length}</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
                    {visible.map((card, i) => {
                      const isGen = col.key === "generating";
                      return (
                        <div key={i} style={{ margin: "0 12px 8px", padding: "14px 16px", borderRadius: 10, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)", borderLeft: "2px solid " + col.color, cursor: "pointer", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                          <div style={{ fontSize: 12, color: col.key === "queued" ? "#99A" : "#BBC", fontWeight: 500 }}>{card.title}</div>
                          {isGen && card.pct != null && <div style={{ marginTop: 8, height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }}><div style={{ width: card.pct + "%", height: "100%", background: col.color, borderRadius: 1 }} /></div>}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: isGen && card.pct != null ? 6 : 8 }}>
                            <span style={{ ...mono, fontSize: 7, color: "#334" }}>{card.scene}</span>
                            <span style={{ ...mono, fontSize: 7, color: isGen ? col.color : col.key === "queued" ? "#334" : col.color + "99" }}>{isGen && card.pct != null ? card.pct + "%" : isGen ? "Starting" : card.tool}</span>
                          </div>
                        </div>
                      );
                    })}
                    {more > 0 && <div style={{ padding: "8px 16px" }}><span style={{ ...mono, fontSize: 7, color: col.key === "approved" ? "#2DD4BF" : "#334", cursor: "pointer" }}>+{more} more{col.key === "approved" ? " \u2192" : ""}</span></div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Activity */}
        {activeTab === "activity" && (
          <div style={{ padding: "24px 28px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <span style={{ ...mono, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
              <span style={{ ...mono, fontSize: 10, color: "#2DD4BF" }}>ACTIVITY</span>
              <span style={{ ...mono, fontSize: 8, color: "#334", marginLeft: 4 }}>{proj.name} / last 24 hours</span>
            </div>
            <div style={{ position: "relative", paddingLeft: 48 }}>
              <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 1, borderLeft: "1px dashed rgba(255,255,255,0.04)" }} />
              {proj.activity.map((item, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 12, display: "flex", alignItems: "center", opacity: i >= 3 ? 0.5 : 1 }}>
                  <div style={{ position: "absolute", left: -48, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg style={{ position: "absolute", inset: 0, animation: "spin 3s linear infinite" }} width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke={item.agentColor + "4D"} strokeWidth="1" strokeDasharray="12 82" strokeLinecap="round" /></svg>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.agentColor + "14", border: "1.5px solid " + item.agentColor }} />
                  </div>
                  <div style={{ flex: 1, padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                    <div style={{ fontSize: 13, color: "#BBC", marginBottom: 6 }}><span style={{ color: item.agentColor, fontWeight: 600 }}>{item.agent}</span> {item.text}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ ...mono, fontSize: 7, color: "#334" }}>{item.time}</span>
                      {item.detail && <span style={{ ...mono, fontSize: 7, color: "#334" }}>{item.detail}</span>}
                      {item.status && <span style={{ ...mono, fontSize: 7, padding: "2px 6px", borderRadius: 8, background: item.statusColor + "0F", color: item.statusColor }}>{"\u2192"} {item.status}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {activeTab === "deliverables" && (
          <div style={{ padding: "24px 28px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <span style={{ ...mono, fontSize: 8, color: "#2DD4BF" }}>{"\u2726"}</span>
              <span style={{ ...mono, fontSize: 10, color: "#2DD4BF" }}>DELIVERABLES</span>
              <span style={{ ...mono, fontSize: 8, color: "#334", marginLeft: 4 }}>{proj.name} / {proj.context}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {proj.deliverables.map((d, i) => {
                const isSent = d.status === "sent";
                const isPending = d.status === "pending";
                const iconColor = isSent ? "#2DD4BF" : isPending ? "#EAB308" : "#334";
                return (
                  <div key={i} style={{ padding: "18px 22px", borderRadius: 12, background: "rgba(255,255,255," + (isSent ? "0.025" : "0.015") + ")", border: "1px " + (isSent ? "solid" : "dashed") + " rgba(" + (isPending ? "234,179,8" : "255,255,255") + "," + (isSent ? "0.05" : isPending ? "0.1" : "0.04") + ")", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: iconColor + "0A", border: "1px solid " + iconColor + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isSent ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg> : isPending ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> : <span style={{ ...mono, fontSize: 9, color: "#334" }}>...</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: d.status === "not_started" ? "#778" : "#E8E8F0", marginBottom: 3 }}>{d.title}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ ...mono, fontSize: 7, color: "#445" }}>{d.detail}</span>
                          {d.sent && <span style={{ ...mono, fontSize: 7, color: "#334" }}>{d.status === "pending" ? d.sent : "Sent " + d.sent}</span>}
                        </div>
                      </div>
                    </div>
                    {d.feedback ? <span style={{ ...mono, fontSize: 8, color: d.feedback === "Feedback received" ? "#2DD4BF" : "#D4A800" }}>{d.feedback}</span> : isPending ? <div style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(45,212,191,0.12)", background: "rgba(45,212,191,0.04)", cursor: "pointer" }}><span style={{ ...mono, fontSize: 8, color: "#2DD4BF" }}>Send when ready</span></div> : d.status === "not_started" ? <span style={{ ...mono, fontSize: 8, color: "#334" }}>Not started</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
