"use client";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav";

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

const mono = { fontFamily: "'Space Mono', monospace" };
const jakarta = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const GOLD = "212,168,0";
const TEAL = "45,212,191";
const ORANGE = "249,115,22";

function glowCard(rgb, h) {
  return {
    background: h
      ? "linear-gradient(180deg, rgba(28,38,50,0.43), rgba(14,22,34,0.39))"
      : "linear-gradient(180deg, rgba(22,30,40,0.37), rgba(12,18,28,0.33))",
    border: `1px solid rgba(255,255,255,${h ? 0.22 : 0.17})`,
    boxShadow: h
      ? `0 14px 38px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.34), 0 0 24px rgba(${rgb},0.16)`
      : `0 10px 30px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 16px rgba(${rgb},0.1)`,
    backdropFilter: h ? "blur(14px) saturate(190%)" : "blur(12px) saturate(180%)",
    WebkitBackdropFilter: h ? "blur(14px) saturate(190%)" : "blur(12px) saturate(180%)",
    color: "#edf3ff",
    textShadow: "0 1px 1px rgba(0,0,0,0.35)",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
  };
}

function DealCard({ deal }) {
  const [h, setH] = useState(false);
  const rgb = deal.rgb || GOLD;
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderRadius: 14, padding: "22px 20px", cursor: "pointer", position: "relative", overflow: "hidden", ...glowCard(rgb, h) }}>
      {/* Interior glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${rgb},${h ? 0.1 : 0.06}) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ ...jakarta, fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{deal.name}</div>
            <div style={{ ...mono, fontSize: 10, color: "#445" }}>{deal.type}</div>
          </div>
          <div style={{ ...jakarta, fontSize: 24, fontWeight: 800, color: `rgba(${rgb},0.55)`, lineHeight: 1 }}>{deal.value}</div>
        </div>
        <div style={{ fontSize: 12, color: "#667", marginBottom: 14 }}>{deal.meta}</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2 }}>
            <div style={{ width: deal.pct + "%", height: "100%", background: `rgba(${rgb},0.85)`, borderRadius: 2, transition: "width 0.6s" }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ ...mono, fontSize: 10, color: deal.statusColor }}>{deal.status}</span>
          <span style={{ ...mono, fontSize: 10, color: `rgba(${rgb},0.8)` }}>{deal.pct}%</span>
        </div>
      </div>
    </div>
  );
}

function WorkshopCard({ ws }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderRadius: 14, padding: 24, cursor: "pointer", position: "relative", overflow: "hidden", ...glowCard(TEAL, h) }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(${TEAL},${h ? 0.1 : 0.06}) 0%, transparent 70%)`, transition: "opacity 0.4s" }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ ...jakarta, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{ws.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[ws.date, ws.location, ws.duration].map((t, i) => (
                <span key={i} style={{ ...mono, fontSize: 10, color: "#556" }}>{t}</span>
              ))}
            </div>
          </div>
          <span style={{ ...mono, fontSize: 10, color: "#2DD4BF", padding: "3px 8px", borderRadius: 4, background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)", whiteSpace: "nowrap" }}>CONFIRMED</span>
        </div>
        <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", paddingTop: 14, display: "flex", gap: 28, alignItems: "flex-end" }}>
          <div>
            <div style={{ ...jakarta, fontSize: 24, fontWeight: 800, color: "#2DD4BF" }}>{ws.seats}</div>
            <div style={{ ...mono, fontSize: 10, color: "#445", marginTop: 2 }}>of {ws.totalSeats} seats</div>
          </div>
          <div>
            <div style={{ ...jakarta, fontSize: 24, fontWeight: 800, color: "#D4A800" }}>{ws.revenue}</div>
            <div style={{ ...mono, fontSize: 10, color: "#445", marginTop: 2 }}>revenue</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2, marginTop: 10 }}>
              <div style={{ width: ws.fillPct + "%", height: "100%", background: "#2DD4BF", borderRadius: 2 }} />
            </div>
            <div style={{ ...mono, fontSize: 10, color: "#556", marginTop: 4, textAlign: "right" }}>{ws.fillPct}% full</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueSlide({ slide, active, isMobile }) {
  const { label, value, color, rgb, sub, subColor, note } = slide;
  const sz = isMobile ? 160 : 220;
  const r = isMobile ? 67 : 92;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ display: active ? "flex" : "none", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <div style={{ position: "relative", width: sz, height: sz, borderRadius: "50%", boxShadow: `0 0 40px rgba(${rgb},0.25), 0 0 100px rgba(${rgb},0.12), 0 0 180px rgba(${rgb},0.06)` }}>
        {/* Backlit glow layer */}
        <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: `radial-gradient(circle, rgba(${rgb},0.12) 0%, rgba(${rgb},0.04) 40%, transparent 70%)`, pointerEvents: "none", filter: "blur(8px)" }} />
        <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ position: "absolute", inset: 0 }}>
          <circle cx={sz/2} cy={sz/2} r={sz/2-4} fill="none" stroke={`rgba(${rgb},0.04)`} strokeWidth="0.5" />
          <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={`rgba(${rgb},0.07)`} strokeWidth="5" strokeLinecap="round" />
          <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${circ * slide.progress} ${circ}`} strokeDashoffset={circ * 0.25}
            transform={`rotate(-90 ${sz/2} ${sz/2})`} opacity="0.8" />
          <circle cx={sz/2} cy={sz/2} r={sz*0.25} fill={`rgba(${rgb},0.015)`} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...mono, fontSize: isMobile ? 8 : 10, color: "#445", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
          <div style={{ ...jakarta, fontSize: isMobile ? 30 : 44, fontWeight: 800, color, lineHeight: 0.9, letterSpacing: "-0.03em" }}>{value}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            {subColor && <span style={{ display: "inline-block", width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "5px solid " + subColor }} />}
            <span style={{ ...mono, fontSize: 10, color: subColor || "#556" }}>{sub}</span>
          </div>
        </div>
      </div>
      <div style={{ ...mono, fontSize: 10, color: "#334", marginTop: 12 }}>{note}</div>
    </div>
  );
}

const deals = [
  { name: "Coca-Cola Holiday", type: "Brand campaign", value: "$15k", meta: "12 deliverables / Due Mar 28", pct: 58, status: "IN PROGRESS", statusColor: "#2DD4BF", rgb: GOLD },
  { name: "Freepik AI Templates", type: "Template pack", value: "$6k", meta: "8 deliverables / Due Mar 31", pct: 61, status: "IN PROGRESS", statusColor: "#2DD4BF", rgb: GOLD },
  { name: "AI Workshop Series", type: "Course + registration", value: "$5k", meta: "3 modules / Est. May 01", pct: 15, status: "PROPOSAL", statusColor: "#F97316", rgb: ORANGE },
];

const workshops = [
  { name: "AI Content Creation for Business Owners", date: "Apr 12", location: "Online", duration: "3 hours", seats: 24, totalSeats: 30, revenue: "$2.4k", fillPct: 80 },
  { name: "Cinematic AI Filmmaking Masterclass", date: "May 03", location: "In-person, NYC", duration: "Full day", seats: 8, totalSeats: 15, revenue: "$2.0k", fillPct: 53 },
];

const slides = [
  { label: "THIS MONTH", value: "$8.2k", color: "#D4A800", rgb: GOLD, progress: 0.68, sub: "+12%", subColor: "#2DD4BF", note: "vs $7.3k last month" },
  { label: "Q1 2026", value: "$22.4k", color: "#2DD4BF", rgb: TEAL, progress: 0.75, sub: "+34%", subColor: "#2DD4BF", note: "vs $16.7k Q4 2025" },
  { label: "Q2 PROJECTED", value: "$41k", color: "#F97316", rgb: ORANGE, progress: 0.2, sub: "if pipeline closes", subColor: null, note: "3 deals + 2 workshops" },
];

const bottomStats = [
  { value: "$26k", label: "PIPELINE", color: "#D4A800" },
  { value: "$4.4k", label: "WORKSHOP REV", color: "#2DD4BF" },
  { value: "32", label: "REGISTRATIONS", color: "#E8E8F0" },
  { value: "4", label: "CLIENTS", color: "#E8E8F0" },
];

const slideColors = ["#D4A800", "#2DD4BF", "#F97316"];
const slideRgbs = [GOLD, TEAL, ORANGE];

export default function BusinessPage() {
  const [slide, setSlide] = useState(0);
  const isMobile = useIsMobile();

  const prev = () => setSlide((slide - 1 + slides.length) % slides.length);
  const next = () => setSlide((slide + 1) % slides.length);

  return (
    <div style={{ minHeight: "100vh", color: "#E8E8F0", paddingTop: 54 }}>
      <Nav />
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: isMobile ? "0 16px" : "0 44px", position: "relative" }}>

        {/* PAGE HEADER */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 12 : 0, padding: "28px 0", borderBottom: "1px dashed rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...mono, fontSize: 10, color: "#D4A800" }}>✦</span>
            <span style={{ ...jakarta, fontSize: 20, fontWeight: 800 }}>Business</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { val: "$26k", label: "pipeline", color: "#D4A800" },
              { val: "3", label: "active deals", color: "#2DD4BF" },
              { val: "2", label: "workshops", color: "#E8E8F0" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 5, padding: isMobile ? "0 12px 0 0" : "0 20px", borderLeft: !isMobile && i > 0 ? "1px dashed rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ ...jakarta, fontSize: isMobile ? 15 : 18, fontWeight: 800, color: s.color }}>{s.val}</span>
                <span style={{ ...mono, fontSize: 10, color: "#445" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* REVENUE CAROUSEL */}
        <div style={{ textAlign: "center", padding: "48px 0 40px" }}>
          <div style={{ ...mono, fontSize: 10, color: "#D4A800", letterSpacing: "0.12em", marginBottom: 12 }}>REVENUE</div>
          <h2 style={{ ...jakarta, fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>DEALS, WORKSHOPS &amp; REVENUE.</h2>
          <p style={{ fontSize: 13, color: "#556", maxWidth: 440, margin: "0 auto 40px" }}>Your business at a glance. Active contracts, upcoming workshops, and revenue tracking across all streams.</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            {/* Prev */}
            <button onClick={prev} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div style={{ width: isMobile ? "calc(100vw - 80px)" : 420, height: isMobile ? 200 : 280, position: "relative" }}>
              {slides.map((s, i) => <RevenueSlide key={i} slide={s} active={i === slide} isMobile={isMobile} />)}
            </div>

            {/* Next */}
            <button onClick={next} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setSlide(i)} style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${i === slide ? slideColors[i] : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s", background: i === slide ? `rgba(${slideRgbs[i]},0.08)` : "transparent", boxShadow: i === slide ? `0 0 12px rgba(${slideRgbs[i]},0.2)` : "none" }}>
                <span style={{ ...mono, fontSize: 10, color: i === slide ? slideColors[i] : "#445" }}>0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE DEALS */}
        <div id="deals" style={{ padding: "0 0 40px", scrollMarginTop: 80 }}>
          <div style={{ ...mono, fontSize: 10, color: "#D4A800", letterSpacing: "0.12em", marginBottom: 20 }}>ACTIVE DEALS</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16, marginBottom: 12 }}>
            {deals.map((d, i) => <DealCard key={i} deal={d} />)}
          </div>
          {/* Lead row */}
          <LeadRow
            label="LEAD" labelColor="#D4A800"
            name="Luxury Auto Brand" sub="Inbound enquiry"
            badge="Synthetix analysing" badgeColor="#8CA0C8"
            rgb={GOLD}
          />
        </div>

        {/* WORKSHOPS */}
        <div id="workshops" style={{ padding: "36px 0 40px", borderTop: "1px dashed rgba(255,255,255,0.06)", scrollMarginTop: 80 }}>
          <div style={{ ...mono, fontSize: 10, color: "#2DD4BF", letterSpacing: "0.12em", marginBottom: 20 }}>WORKSHOPS</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 12 }}>
            {workshops.map((w, i) => <WorkshopCard key={i} ws={w} />)}
          </div>
          {/* Planning row */}
          <LeadRow
            label="PLANNING" labelColor="#F97316"
            name="Advanced Prompt Engineering" sub="Jun 01 / Online"
            badge="Registration opens May 10" badgeColor="#445"
            rgb={TEAL}
          />
        </div>

        {/* BOTTOM STATS */}
        <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", padding: "24px 0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", textAlign: "center" }}>
            {bottomStats.map((s, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? "1px dashed rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ ...jakarta, fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ ...mono, fontSize: 10, color: "#445", letterSpacing: "0.06em", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function LeadRow({ label, labelColor, name, sub, badge, badgeColor, rgb }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ borderRadius: 10, padding: "14px 20px", border: `1px dashed rgba(${rgb},${h ? 0.18 : 0.08})`, background: h ? `rgba(${rgb},0.03)` : "transparent", cursor: "pointer", transition: "all 0.25s", boxShadow: h ? `0 0 20px rgba(${rgb},0.1)` : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ ...mono, fontSize: 10, color: labelColor, padding: "3px 8px", borderRadius: 4, border: `1px dashed rgba(${rgb},0.18)` }}>{label}</span>
          <div>
            <div style={{ ...jakarta, fontSize: 14, fontWeight: 700, color: "#778" }}>{name}</div>
            <div style={{ ...mono, fontSize: 10, color: "#334", marginTop: 2 }}>{sub}</div>
          </div>
        </div>
        <span style={{ ...mono, fontSize: 10, color: badgeColor }}>{badge}</span>
      </div>
    </div>
  );
}
