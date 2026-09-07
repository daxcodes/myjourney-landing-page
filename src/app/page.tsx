"use client";

import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════════════════════ */

const modules = [
  {
    id: "lernpartner",
    num: "01",
    title: "Lernpartner Matching",
    tagline: "Finde dein Team.",
    desc: "Unser smarter Algorithmus analysiert deinen individuellen Lernstil, deine zeitlichen Verfügbarkeiten sowie konkrete Prüfungsziele. Auf dieser Datenbasis verbinden wir dich passgenau mit Kommilitonen aus deinem Studiengang, um effiziente und harmonische Lerngruppen zu formen. So wird aus einsamem Pauken echter Team-Erfolg.",
    highlights: ["Persönliches Matching", "Lerngruppen bis 6 Personen", "Kompatibilität"],
    color: "#6F9E7C",
    colorLight: "#D9E9DC",
  },
  {
    id: "lernplatz",
    num: "02",
    title: "Lernplatz Reservierung",
    tagline: "Reservieren, lernen, fertig.",
    desc: "Vorbei sind die Zeiten endloser Platzsuche. Unsere Echtzeit-Kapazitätsübersicht zeigt dir sofort, wo in der Bibliothek, in Gruppenräumen oder ruhigen Arbeitsbereichen noch Tische frei sind. Du kannst deinen präferierten Slot verbindlich reservieren und dich per einfachem Check-in vor Ort verifizieren. So startest du stressfrei in deinen Lerntag.",
    highlights: ["Aktuelle Verfügbarkeit", "Einfache Buchung", "Check-in System"],
    color: "#6F9E7C",
    colorLight: "#D9E9DC",
  },
  {
    id: "mental",
    num: "03",
    title: "Mentales Monitoring",
    tagline: "Wie geht es dir wirklich?",
    desc: "Die hohe Prüfungsdichte erfordert auch mentale Stärke. Durch wöchentliche Micro-Check-ins trackst du deine Stimmungsverläufe und dein Stresslevel. Die gewonnenen Einblicke helfen dir, Belastungsspitzen frühzeitig zu erkennen. Bei Bedarf vermittelt die Plattform nahtlos, anonym und unkompliziert den Kontakt zur psychologischen Beratung.",
    highlights: ["Anonymes Feedback", "Verlaufsübersicht", "Direkter Kontakt zur Beratung"],
    color: "#6F9E7C",
    colorLight: "#D9E9DC",
  },
  {
    id: "learning",
    num: "04",
    title: "Unterstützung beim Lernen",
    tagline: "Deine Skripte, deine Fragen.",
    desc: "Verwandle passive Skripte in aktive Lernwerkzeuge. Lade einfach deine Vorlesungsfolien hoch, unsere KI generiert daraus in Sekunden präzise Zusammenfassungen, strukturierte Karteikarten und interaktive Multiple-Choice-Quizze. So testest du dein Wissen direkt am eigenen Stoff und optimierst deine Prüfungsvorbereitung messbar.",
    highlights: ["Dokumenten Upload", "Interaktive Quizze", "Quellenbasierte Antworten"],
    color: "#6F9E7C",
    colorLight: "#D9E9DC",
  },
];

const roles = [
  {
    id: "nutzer",
    title: "Nutzer",
    subtitle: "Ich will Sola testen",
    perks: [
      "Frühzeitiger Zugang zur Plattform",
      "Persönliche Einführung",
      "Kostenlose Basis-Nutzung",
    ],
  },
  {
    id: "tester",
    title: "Tester",
    subtitle: "Ich gebe aktives Feedback",
    perks: [
      "Regelmäßige Feedback Runden",
      "Direkter Kontakt zum Team",
      "Einfluss auf neue Funktionen",
    ],
  },
  {
    id: "team",
    title: "Teammitglied",
    subtitle: "Ich will mitbauen",
    perks: [
      "Aktive Mitgestaltung der Plattform",
      "Schwerpunkt Marketing oder Entwicklung",
      "Echte Praxiserfahrung im Projekt",
    ],
  },
];

const trustPartners = [
  "FH Aachen",
  "Gründungszentrum FH Aachen",
  "Prof. Dr. Büdenbender",
  "Prof. Dr. Bernecker",
  "Prof. Dr. Maihaus",
  "Prof. Dr. Bassen-Metz",
  "Prof. Dr. Eggert",
  "K1 Förderung",
];

const problemCards = [
  {
    stat: "70%",
    statLabel: "lernen isoliert für sich, würden aber gerne in Gruppen lernen",
    title: "Ineffizientes Solo-Pauken",
    text: "Trotz tausender Kommilitonen kämpfen viele Studierende allein mit demselben Stoff. Passende Lernpartner zu finden scheitert oft an unterschiedlichen Stundenplänen, Hemmschwellen oder mangelnder Vernetzung. Das Resultat: Fehlender Austausch und sinkende Motivation.",
  },
  {
    stat: "45 Min.",
    statLabel: "verpuffen oft bei der Platzsuche",
    title: "Frustrierende Sitzplatzsuche",
    text: "Gerade in der Klausurenphase platzen Bibliotheken und Lernbereiche aus allen Nähten. Studierende laufen nicht selten ziellos über den Campus, um einen freien Tisch oder Gruppenraum zu ergattern, wertvolle Lernzeit und Energie, die völlig unnötig verloren geht.",
  },
  {
    stat: "1 von 3",
    statLabel: "klagt über hohen mentalen Druck",
    title: "Unsichtbare Überlastung",
    text: "Der permanente Leistungsdruck durch eng getaktete Prüfungsphasen führt häufig zu chronischem Stress. Weil dieser Druck im Studienalltag meist im Stillen ertragen wird, kommt rechtzeitige Entlastung oder psychologische Beratung für viele zu spät.",
  },
  {
    stat: "80%",
    statLabel: "der Lernzeit ist oft nur passives Lesen",
    title: "Erdrückende Skript-Berge",
    text: "Vorlesungsfolien stapeln sich am Semesterende zu unübersichtlichen Textbergen. Studierende verbringen massiv Zeit damit, das Material mühsam händisch zusammenzufassen, anstatt ihr Wissen aktiv zu testen. Es fehlt an Wegen, den Stoff schnell und interaktiv nutzbar zu machen.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Hooks
   ══════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

/* ══════════════════════════════════════════════════════════════
   Mini UI Components
   ══════════════════════════════════════════════════════════════ */

function MiniLernpartner({ accent }: { accent: string }) {
  const rows = [
    { initials: "SB", field: "BWL, 5. Sem.", score: "94%" },
    { initials: "MK", field: "BWL, 5. Sem.", score: "89%" },
    { initials: "LR", field: "BWL, 4. Sem.", score: "81%" },
  ];
  return (
    <div className="mini-ui flex flex-col gap-0">
      <div className="flex items-center justify-between pb-2 mb-1" style={{ borderBottom: "1px solid var(--k1-border)" }}>
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--k1-secondary)" }}>Matching</span>
        <span style={{ fontSize: "0.6rem", color: "var(--k1-muted)" }}>Score</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--k1-border)" : "none" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: "1.6rem", height: "1.6rem", background: i === 0 ? accent : "transparent", border: `1px solid ${i === 0 ? accent : "var(--k1-border-dark)"}`, borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: i === 0 ? "#FFFFFF" : "var(--k1-text)", flexShrink: 0 }}>
              {row.initials}
            </div>
            <span style={{ fontSize: "0.65rem", color: "var(--k1-secondary)" }}>{row.field}</span>
          </div>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: i === 0 ? accent : "var(--k1-text)" }}>{row.score}</span>
        </div>
      ))}
    </div>
  );
}

function MiniLernplatz({ accent }: { accent: string }) {
  const cells = Array.from({ length: 20 });
  const occupied = [2, 5, 8, 11, 14];
  const selected = 7;
  return (
    <div className="mini-ui flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--k1-secondary)" }}>Bibliothek · Ebene 2</span>
        <span style={{ fontSize: "0.6rem", color: accent, fontWeight: 600 }}>12 frei</span>
      </div>
      <div className="grid grid-cols-10 gap-0.5">
        {cells.map((_, i) => (
          <div key={i} style={{ aspectRatio: "1", background: i === selected ? accent : occupied.includes(i) ? "var(--k1-border-dark)" : "var(--k1-bg)", border: `1px solid ${i === selected ? accent : "var(--k1-border)"}`, borderRadius: "0.15rem" }} />
        ))}
      </div>
      <div className="flex gap-3" style={{ fontSize: "0.55rem", color: "var(--k1-muted)" }}>
        <span className="flex items-center gap-1"><span style={{ width: "0.5rem", height: "0.5rem", background: accent, display: "inline-block", borderRadius: "0.15rem" }} />Dein Platz</span>
        <span className="flex items-center gap-1"><span style={{ width: "0.5rem", height: "0.5rem", background: "var(--k1-border-dark)", display: "inline-block", borderRadius: "0.15rem" }} />Belegt</span>
      </div>
    </div>
  );
}

function MiniMental({ accent }: { accent: string }) {
  const bars = [35, 50, 45, 65, 75, 60, 82];
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  return (
    <div className="mini-ui flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--k1-secondary)" }}>Woche 12 · Stimmung</span>
        <span style={{ fontSize: "0.6rem", color: accent, fontWeight: 600 }}>+Trend</span>
      </div>
      <div className="flex items-end gap-1" style={{ height: "2.75rem", borderBottom: "1px solid var(--k1-border)" }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 h-full flex flex-col items-center justify-end">
            <div style={{ width: "100%", height: `${h}%`, background: h > 60 ? accent : "var(--k1-border-dark)", borderRadius: "0.125rem 0.125rem 0 0" }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {days.map((d) => (
          <div key={d} className="flex-1 text-center" style={{ fontSize: "0.5rem", color: "var(--k1-muted)" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function MiniLearning({ accent }: { accent: string }) {
  const items = [
    { label: "Kapitel 3: Supply-Chain-Mgmt.", sub: "Zusammenfassung · 480 Wörter" },
    { label: "12 Karteikarten generiert", sub: "Bereit zum Lernen" },
    { label: "5 Quiz-Fragen bereit", sub: "Difficulty: Mittel" },
  ];
  return (
    <div className="mini-ui flex flex-col gap-0">
      <div className="flex items-center justify-between pb-2 mb-1" style={{ borderBottom: "1px solid var(--k1-border)" }}>
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--k1-secondary)" }}>KI-Zusammenfassung</span>
        <span style={{ fontSize: "0.6rem", color: accent, fontWeight: 600 }}>Generiert</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col py-1.5" style={{ borderBottom: i < items.length - 1 ? "1px solid var(--k1-border)" : "none", paddingLeft: "0.5rem", borderLeft: `2px solid ${i === 0 ? accent : "var(--k1-border)"}` }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--k1-text)" }}>{item.label}</span>
          <span style={{ fontSize: "0.56rem", color: "var(--k1-muted)", marginTop: "0.1rem" }}>{item.sub}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function K1LandingPage() {
  const [selectedRole, setSelectedRole] = useState<string>("nutzer");
  const [formState, setFormState] = useState({ name: "", email: "", hochschule: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const problemRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const applyRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const eyebrow = {
    fontSize: "0.72rem",
    fontWeight: 600 as const,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--k1-secondary)",
    fontFamily: "var(--font-body)",
  };

  const sectionHeading = {
    fontFamily: "var(--font-display)",
    fontWeight: 700 as const,
    lineHeight: 1.1,
    color: "var(--k1-text)",
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--k1-bg)" }}>

      {/* ══════════════════════════════════════════════════════════
          NAV
          ══════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{ background: "rgba(236,234,229,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--k1-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 font-bold text-sm" style={{ background: "var(--k1-accent)", color: "#FFFFFF", fontFamily: "var(--font-display)", borderRadius: "0.5rem" }}>
              S
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Project Sola</span>
            <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1" style={{ color: "var(--k1-secondary)", border: "1px solid var(--k1-border)", borderRadius: "9999px", fontFamily: "var(--font-body)", background: "var(--k1-bg-alt)" }}>
              by MyJourney
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Problem", href: "#problem" },
              { label: "Features", href: "#features" },
              { label: "Bewerben", href: "#apply" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--k1-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--k1-secondary)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menü öffnen" style={{ color: "var(--k1-secondary)" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ borderTop: "1px solid var(--k1-border)", paddingTop: "1rem", background: "var(--k1-bg)" }}>
            {[{ label: "Problem", href: "#problem" }, { label: "Features", href: "#features" }, { label: "Bewerben", href: "#apply" }].map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium py-1" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
            ))}
          </div>
        )}
      </header>

      <main>

        {/* ══════════════════════════════════════════════════════════
            1. HERO
            ══════════════════════════════════════════════════════════ */}
        <section className="px-6 lg:px-12 py-10 lg:py-14 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Copy */}
            <div className="flex flex-col gap-7 py-8 lg:py-12">
              <div className="flex items-center gap-3 fade-in" style={eyebrow}>
                <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-border-dark)", display: "inline-block" }} />
                In Kooperation mit der FH Aachen 2026
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight fade-in fade-in-delay-1"
                style={{ ...sectionHeading }}
              >
                Studieren ist{" "}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>kompliziert genug.</em>
                <br />
                Dein System
                <br />
                sollte es nicht sein.
              </h1>

              <p className="text-base lg:text-lg leading-relaxed max-w-md fade-in fade-in-delay-2" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                Du lernst allein, obwohl hunderte Kommilitonen dasselbe Problem haben.
                Du suchst einen Lernplatz und findest keinen.{" "}
                <strong style={{ color: "var(--k1-text)", fontWeight: 600 }}>Project Sola ändert das.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 fade-in fade-in-delay-3">
                <a href="#apply" className="btn-primary px-8 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  Jetzt bewerben &rarr;
                </a>
              </div>


            </div>

            {/* Right — App Preview 3-Column Dashboard */}
            <div className="w-full fade-in fade-in-delay-2 self-start relative">
              {/* Fade out gradients for seamless transition on smaller screens if it gets too tight, though scaling is better */}
              <div
                style={{
                  width: "100%",
                  background: "var(--k1-bg)",
                  borderRadius: "1.25rem",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
                  border: "1px solid var(--k1-border)",
                  fontFamily: "var(--font-body)",
                  overflow: "hidden",
                }}
              >
                {/* macOS top bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1rem", background: "var(--k1-bg-alt)", borderBottom: "1px solid var(--k1-border)" }}>
                  <div style={{ width: "0.72rem", height: "0.72rem", borderRadius: "50%", background: "#EC6A5E" }} />
                  <div style={{ width: "0.72rem", height: "0.72rem", borderRadius: "50%", background: "#F4BE4F" }} />
                  <div style={{ width: "0.72rem", height: "0.72rem", borderRadius: "50%", background: "#61C554" }} />
                  <span style={{ fontSize: "0.65rem", color: "#999", marginLeft: "0.75rem", fontWeight: 500 }}>app.myjourney.de</span>
                </div>

                {/* 3-col dashboard */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", background: "#FFFFFF", minHeight: "340px", fontSize: "0.68rem" }}>

                  {/* ── Sidebar ── */}
                  <div style={{ background: "#F4F2EC", borderRight: "1px solid #E6E2DB", padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Logo */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", paddingBottom: "0.75rem", borderBottom: "1px solid #E0DCD5" }}>
                      <div style={{ width: "2.2rem", height: "2.2rem", background: "#ECEAE5", border: "1px solid #DDD9D3", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#6F9E7C", fontWeight: 700 }}>MJ</div>
                      <span style={{ fontSize: "0.55rem", color: "#999", fontWeight: 600, letterSpacing: "0.05em" }}>MyJourney</span>
                    </div>

                    {/* Nav label */}
                    <div>
                      <p style={{ fontSize: "0.58rem", fontWeight: 700, color: "#AAA", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Meine Projekte</p>
                      {/* Active item */}
                      <div style={{ background: "#D9E9DC", borderRadius: "0.5rem", padding: "0.5rem 0.6rem", marginBottom: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontSize: "0.6rem" }}>🎓</span>
                          <span style={{ fontWeight: 700, color: "#3D7A56", fontSize: "0.68rem" }}>Psychologie</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", paddingLeft: "1rem" }}>
                          <span style={{ color: "#5A8A6A", fontSize: "0.58rem" }}>↑ 75% Mastery</span>
                          <span style={{ color: "#5A8A6A", fontSize: "0.58rem" }}>⏱ 12h diese Woche</span>
                          <span style={{ color: "#5A8A6A", fontSize: "0.58rem" }}>🔥 14 Tage Streak</span>
                        </div>
                      </div>
                      {/* Other items */}
                      {["📊 Makroökonomie", "🔬 Biologie 101"].map(label => (
                        <div key={label} style={{ padding: "0.4rem 0.6rem", color: "#666", borderRadius: "0.4rem", fontSize: "0.65rem", cursor: "pointer" }}>{label}</div>
                      ))}
                      {/* Add project */}
                      <div style={{ marginTop: "0.5rem", border: "1.5px dashed #C8C3BC", borderRadius: "0.5rem", padding: "0.5rem 0.6rem", color: "#AAA", fontSize: "0.6rem", textAlign: "center", cursor: "pointer" }}>
                        + Projekt hinzufügen
                      </div>
                    </div>
                  </div>

                  {/* ── Main Content ── */}
                  <div style={{ padding: "1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem", borderRight: "1px solid #E6E2DB" }}>
                    {/* Page heading + search row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, fontFamily: "var(--font-display), Georgia, serif", margin: 0 }}>Psychologie</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#F4F2EC", border: "1px solid #E0DCD5", borderRadius: "0.5rem", padding: "0.25rem 0.5rem" }}>
                        <span style={{ fontSize: "0.6rem", color: "#AAA" }}>🔍</span>
                        <span style={{ fontSize: "0.6rem", color: "#BBB" }}>Suche...</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div style={{ background: "#F4F2EC", border: "1px solid #E0DCD5", borderRadius: "0.5rem", padding: "0.5rem 0.65rem", display: "flex", gap: "0.4rem" }}>
                      <span style={{ color: "#6F9E7C", fontSize: "0.9rem", lineHeight: 1, flexShrink: 0 }}>"</span>
                      <div>
                        <p style={{ fontSize: "0.58rem", lineHeight: 1.5, color: "#555", margin: 0 }}>
                          Lernen ist wie Rudern gegen den Strom. Hört man auf, treibt man zurück.
                        </p>
                        <span style={{ fontSize: "0.55rem", color: "#999", fontStyle: "italic" }}>- Laotse</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #E6E2DB" }}>
                      {["Flashcards", "Quiz", "Mock Exams", "Quellen"].map((tab, i) => (
                        <span key={tab} style={{ padding: "0.3rem 0.6rem", fontSize: "0.6rem", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#2B2B2B" : "#999", borderBottom: i === 0 ? "2px solid #2B2B2B" : "2px solid transparent", cursor: "pointer", marginBottom: "-1px" }}>{tab}</span>
                      ))}
                    </div>

                    {/* Flashcard items grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[
                        { title: "Grundlagen der klinischen Psychologie", time: "Vor 2 Stunden", progress: 45, total: 100 },
                        { title: "Entwicklungspsychologie I", time: "Gestern", progress: 12, total: 100 },
                      ].map(card => (
                        <div key={card.title} style={{ border: "1px solid #E6E2DB", borderRadius: "0.6rem", padding: "0.65rem 0.7rem", display: "flex", flexDirection: "column", gap: "0.35rem", background: "#FFF" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <span style={{ fontSize: "0.65rem", fontWeight: 700, lineHeight: 1.3, color: "#2B2B2B" }}>{card.title}</span>
                            <span style={{ fontSize: "0.75rem", color: "#CCC", flexShrink: 0, marginLeft: "0.3rem" }}>⋮</span>
                          </div>
                          <span style={{ fontSize: "0.55rem", color: "#AAA" }}>Zuletzt bearbeitet: {card.time}</span>
                          <div style={{ height: "3px", background: "#ECEAE5", borderRadius: "2px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${(card.progress / card.total) * 100}%`, background: "#6F9E7C", borderRadius: "2px" }} />
                          </div>
                          <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "#555" }}>{card.progress}/{card.total} Karten gelernt</span>
                        </div>
                      ))}
                    </div>

                    {/* New set button */}
                    <div style={{ border: "1.5px dashed #C8C3BC", borderRadius: "0.6rem", padding: "0.6rem", textAlign: "center", cursor: "pointer", color: "#AAA", fontSize: "0.62rem" }}>
                      <div style={{ fontSize: "1rem", lineHeight: 1 }}>⊕</div>
                      <div style={{ marginTop: "0.2rem" }}>Neues Set erstellen</div>
                    </div>
                  </div>

                  {/* ── Tutor Chat ── */}
                  <div style={{ display: "flex", flexDirection: "column", padding: "1rem 0.75rem", gap: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", paddingBottom: "0.5rem", borderBottom: "1px solid #E6E2DB" }}>
                      <div style={{ width: "1.1rem", height: "1.1rem", background: "#ECEAE5", border: "1px solid #DDD9D3", borderRadius: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem" }}>💬</div>
                      <span style={{ fontWeight: 700, fontSize: "0.7rem", color: "#2B2B2B" }}>Tutor MJ</span>
                    </div>

                    {/* Suggestion bubble */}
                    <div style={{ background: "#F4F2EC", borderRadius: "0.5rem", padding: "0.5rem 0.65rem", fontSize: "0.6rem", color: "#555", lineHeight: 1.5 }}>
                      Schwierigkeiten bei &apos;Zellteilung&apos;? Sollen wir das Thema kurz wiederholen?
                      <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.4rem" }}>
                        <button style={{ flex: 1, padding: "0.25rem", background: "#D9E9DC", border: "none", borderRadius: "0.35rem", fontSize: "0.58rem", color: "#3D7A56", fontWeight: 700, cursor: "pointer" }}>Starten</button>
                        <button style={{ flex: 1, padding: "0.25rem", background: "#ECEAE5", border: "1px solid #E0DCD5", borderRadius: "0.35rem", fontSize: "0.58rem", color: "#666", cursor: "pointer" }}>Später</button>
                      </div>
                    </div>

                    {/* Chat message */}
                    <div style={{ background: "#FAFAFA", border: "1px solid #E6E2DB", borderRadius: "0.5rem", padding: "0.5rem 0.65rem", fontSize: "0.6rem", color: "#444", lineHeight: 1.5, flexGrow: 1 }}>
                      Hallo! Wie kann ich dir heute helfen?
                    </div>

                    {/* Input */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", border: "1px solid #E0DCD5", borderRadius: "0.5rem", padding: "0.35rem 0.5rem", background: "#FFF" }}>
                      <span style={{ flex: 1, fontSize: "0.58rem", color: "#BBB" }}>Frage...</span>
                      <div style={{ width: "1.3rem", height: "1.3rem", background: "#6F9E7C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "white", fontSize: "0.55rem" }}>▶</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ── Trust Marquee ─────────────────────────────────────── */}
        <section className="py-10 px-6" style={{ borderTop: "1px solid var(--k1-border)", borderBottom: "1px solid var(--k1-border)", background: "var(--k1-bg-alt)" }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-center mb-6" style={eyebrow}>Vernetzt &amp; validiert mit</p>
            <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <div className="marquee-track gap-2.5 py-1">
                {[...trustPartners, ...trustPartners].map((inst, i) => (
                  <span
                    key={`${inst}-${i}`}
                    className="whitespace-nowrap flex items-center gap-2"
                    style={{
                      fontSize: "0.78rem", fontWeight: 500,
                      padding: "0.38rem 1rem",
                      border: "1px solid var(--k1-border)",
                      color: "var(--k1-secondary)", fontFamily: "var(--font-body)",
                      background: "var(--k1-bg)",
                      borderRadius: "9999px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ fontSize: "0.58rem", color: "var(--k1-accent)", fontWeight: 700 }}>&#10003;</span>
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            2. PROBLEM — Normed heights (Screenshot 2)
            ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="py-24 px-6 lg:px-12" ref={problemRef}>
          <div
            className="max-w-6xl mx-auto"
            style={{
              background: "var(--k1-bg-warm)",
              borderRadius: "1.25rem",
              padding: "3rem 3.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-20">
              {/* Left header */}
              <div className="flex flex-col justify-start pt-1">
                <p className="reveal mb-5" style={eyebrow}>Das Problem</p>
                <h2 className="reveal reveal-delay-1 mb-6" style={{ ...sectionHeading, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                  Klingt{" "}
                  <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>bekannt?</em>
                </h2>
                <p className="reveal reveal-delay-2 text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                  Der Studienalltag bringt oft organisatorische Herausforderungen mit sich, die neben den Vorlesungen bewältigt werden müssen.
                </p>
              </div>

              {/* Right — stacked rows with aligned heights */}
              <div className="flex flex-col gap-0">
                {problemCards.map((problem, i) => (
                  <div
                    key={problem.title}
                    className={`reveal reveal-delay-${i + 1} flex gap-7 py-7 items-stretch`}
                    style={{ borderBottom: i < problemCards.length - 1 ? "1px solid var(--k1-border-dark)" : "none" }}
                  >
                    {/* Unified stat block height */}
                    {/* Expanded stat column width (w-44) and whitespace-nowrap to prevent line breaks */}
                    <div className="flex flex-col justify-start w-44 shrink-0 whitespace-nowrap">
                      <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, color: "var(--k1-accent)" }}>
                        {problem.stat}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "var(--k1-secondary)", fontFamily: "var(--font-body)", marginTop: "0.4rem", lineHeight: 1.3, whiteSpace: "normal" }}>
                        {problem.statLabel}
                      </span>
                    </div>

                    {/* Content block — aligned to start, header on same line height */}
                    <div className="flex-1 flex flex-col justify-start pt-1">
                      <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)", lineHeight: 1.2 }}>{problem.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>{problem.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            3. FEATURES — Normed heading heights to keep grids aligned
            ══════════════════════════════════════════════════════════ */}
        <section id="features" className="py-24 px-6 lg:px-12" ref={featuresRef}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="reveal mb-5" style={eyebrow}>Die 4 Module</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl" style={{ ...sectionHeading }}>Was Sola kann.</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((mod, i) => {
                const MiniUIs: Record<string, React.FC<{ accent: string }>> = {
                  lernpartner: MiniLernpartner,
                  lernplatz: MiniLernplatz,
                  mental: MiniMental,
                  learning: MiniLearning,
                };
                const MiniUI = MiniUIs[mod.id];

                return (
                  <div
                    key={mod.id}
                    className={`reveal reveal-delay-${i + 1} flex flex-col gap-5 p-8`}
                    style={{
                      background: "var(--k1-bg-alt)",
                      borderRadius: "1rem",
                      borderTop: `3px solid ${mod.color}`,
                      boxShadow: "var(--shadow-card)",
                      transition: "box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
                  >
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: mod.color, fontFamily: "var(--font-body)" }}>
                      {mod.num}
                    </span>

                    {/* Aligned Heading Block to norm module descriptions heights */}
                    <div className="min-h-[3.8rem] flex flex-col justify-start">
                      <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--k1-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.3rem" }}>{mod.tagline}</p>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.2, color: "var(--k1-text)", fontFamily: "var(--font-display)" }}>{mod.title}</h3>
                    </div>

                    <p className="text-sm leading-relaxed min-h-[3.2rem]" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>{mod.desc}</p>

                    {MiniUI && <MiniUI accent={mod.color} />}

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {mod.highlights.map((h) => (
                        <span
                          key={h}
                          style={{ fontSize: "0.72rem", fontWeight: 500, padding: "0.25rem 0.75rem", color: mod.color, fontFamily: "var(--font-body)", background: mod.colorLight, borderRadius: "9999px" }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            4. APPLY — Screenshot 1 visual upgrade
            ══════════════════════════════════════════════════════════ */}
        <section id="apply" className="py-20 px-6 lg:px-12" ref={applyRef}>
          <div
            className="max-w-4xl mx-auto py-16 px-8 sm:px-12"
            style={{
              background: "var(--k1-bg-warm)",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
              border: "1px solid var(--k1-border)"
            }}
          >
            {/* Reduced spacing, description text removed */}
            <div className="mb-10">
              <p className="reveal mb-4" style={eyebrow}>Jetzt bewerben</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl" style={{ ...sectionHeading }}>Werde Teil von MyJourney.</h2>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="reveal reveal-delay-2 flex flex-col gap-8">

                {/* Role selector */}
                <div>
                  <label className="block text-sm font-medium mb-4" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>
                    Ich möchte mich bewerben als …
                  </label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        id={`role-${role.id}`}
                        onClick={() => setSelectedRole(role.id)}
                        className={`role-card ${selectedRole === role.id ? "selected" : ""}`}
                        style={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }}
                      >
                        {/* Title & subtitle aligned */}
                        <div className="min-h-[3rem] flex flex-col justify-start">
                          <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--k1-text)", fontFamily: "var(--font-body)", marginBottom: "0.15rem" }}>
                            {role.title}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
                            {role.subtitle}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px my-4" style={{ background: "var(--k1-border)", opacity: 0.8 }} />

                        <ul className="flex flex-col gap-1.5 flex-1">
                          {role.perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2" style={{ fontSize: "0.78rem", color: "var(--k1-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.35 }}>
                              <span style={{ color: "var(--k1-accent)", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem", fontSize: "0.65rem" }}>&#10003;</span>
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Name</label>
                    <input id="name" type="text" required placeholder="Max Mustermann" value={formState.name} onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))} className="k1-input" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>E-Mail</label>
                    <input id="email" type="email" required placeholder="max@uni.de" value={formState.email} onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))} className="k1-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="hochschule" className="block text-sm font-medium mb-2" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Hochschule</label>
                    <input id="hochschule" type="text" required placeholder="z.B. TU Berlin, LMU München …" value={formState.hochschule} onChange={(e) => setFormState((prev) => ({ ...prev, hochschule: e.target.value }))} className="k1-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="motivation" className="block text-sm font-medium mb-2" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>
                      Motivation
                    </label>
                    <textarea id="motivation" required placeholder="Warum willst du dabei sein? Was nervt dich am Campus-Studium?" rows={3} value={formState.motivation} onChange={(e) => setFormState((prev) => ({ ...prev, motivation: e.target.value }))} className="k1-textarea" />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-start gap-3">
                  <button type="submit" id="submit-application" className="btn-primary px-10 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                    Bewerbung absenden &rarr;
                  </button>
                </div>
              </form>
            ) : (
              <div
                className="p-12 text-center"
                style={{
                  border: "1px solid var(--k1-accent)",
                  background: "var(--k1-accent-light)",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 24px rgba(111,158,124,0.18)",
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-6"
                  style={{ background: "var(--k1-bg-alt)", borderRadius: "0.875rem", boxShadow: "var(--shadow-card)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--k1-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--k1-text)", fontFamily: "var(--font-display)" }}>Bewerbung eingegangen!</h3>
                <p className="text-base" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                  Danke, <strong style={{ color: "var(--k1-text)", fontWeight: 600 }}>{formState.name}</strong>!
                  Wir melden uns innerhalb von 48 Stunden bei{" "}
                  <strong style={{ color: "var(--k1-accent)", fontWeight: 600 }}>{formState.email}</strong>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>


      {/* ══════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════ */}
      <footer className="py-14 px-6 lg:px-12" style={{ borderTop: "1px solid var(--k1-border)", background: "var(--k1-bg-alt)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 font-bold text-sm" style={{ background: "var(--k1-accent)", color: "#FFFFFF", fontFamily: "var(--font-display)", borderRadius: "0.5rem" }}>S</div>
              <span className="font-semibold text-base tracking-tight" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Project Sola</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
              Project Sola ist eine Hochschul-Pilotversion und Teil des MyJourney-Ökosystems. Gefördert durch das K1-Programm der FH Aachen.
            </p>
            <p className="text-xs" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>Built on Campus.</p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>Module</h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
              {["Lernpartner Matching", "Lernplatz Reservierung", "Mentales Monitoring", "Unterstützung beim Lernen"].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>Legal</h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
              {["Impressum", "Datenschutz", "AGB", "Kontakt"].map((l) => (
                <li key={l} className="cursor-pointer" onMouseEnter={(e) => (e.currentTarget.style.color = "var(--k1-accent)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--k1-muted)")}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--k1-border)" }}>
          <p className="text-xs" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>&copy; 2025 MyJourney / Project Sola. Alle Rechte vorbehalten.</p>
          <p className="text-xs text-center sm:text-right" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
            Pilotprojekt · Exklusive Rechte &amp; Markenidentität verbleiben bei MyJourney.
          </p>
        </div>
      </footer>
    </div>
  );
}
