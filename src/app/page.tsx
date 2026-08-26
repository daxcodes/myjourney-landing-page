"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════════════════════ */

const modules = [
  {
    id: "lernpartner",
    emoji: "🤝",
    color: "#7c6aff",
    glow: "rgba(124,106,255,0.18)",
    title: "Lernpartner-Matching",
    tagline: "Finde dein Team.",
    desc: "Unser Algorithmus analysiert Studiengang, Lernstil, Prüfungsziele und Verfügbarkeit — und verbindet dich mit den Kommilitonen, mit denen du wirklich weiterkommst.",
    highlights: ["Algorithmus-basiertes Matching", "Lerngruppen bis 6 Personen", "Kompatibilitäts-Score"],
  },
  {
    id: "lernplatz",
    emoji: "🗺️",
    color: "#3ecfcf",
    glow: "rgba(62,207,207,0.18)",
    title: "Lernplatz-Booking",
    tagline: "Reservier. Lern. Fertig.",
    desc: "Echtzeit-Kapazitätsübersicht für Bibliothek, Gruppenräume und Campus-Lernbereiche. Buche deinen Platz in Sekunden — bevor er weg ist.",
    highlights: ["Echtzeit-Verfügbarkeit", "Kalender-Integration", "Check-in System"],
  },
  {
    id: "mental",
    emoji: "💚",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.18)",
    title: "Mentales Monitoring",
    tagline: "Wie geht's dir wirklich?",
    desc: "Tägliche Mini-Checks, Stimmungsverläufe und strukturierte Fragebögen helfen dir und dem Beratungsteam, Belastungsspitzen früh zu erkennen.",
    highlights: ["Anonymes Check-in", "Verlaufsanalyse", "Verbindung zur Beratungsstelle"],
  },
  {
    id: "learning",
    emoji: "📖",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.18)",
    title: "Adaptive Lernunterstützung",
    tagline: "Dein Skript. Deine KI.",
    desc: "Lade Skripte, PDFs oder Mitschriften hoch — und erhalte sofort Zusammenfassungen, Quizfragen und quellenbasierte Erklärungen.",
    highlights: ["Dokument-Upload (PDF/DOCX)", "KI-generierte Quizze", "Quellenbasierte Antworten"],
  },
];

const roles = [
  {
    id: "nutzer",
    icon: "🎓",
    title: "Nutzer",
    subtitle: "Ich will K1.0 testen",
    perks: [
      "Frühzeitiger Zugang zur Campus Beta",
      "Exklusive Onboarding-Session",
      "Einfluss auf Produkt-Prioritäten",
    ],
  },
  {
    id: "tester",
    icon: "🧪",
    title: "Tester",
    subtitle: "Ich gebe aktives Feedback",
    perks: [
      "Wöchentliche Feedback-Sessions",
      "Direkter Draht zum Entwickler-Team",
      "Früher Zugang zu allen neuen Features",
    ],
  },
  {
    id: "team",
    icon: "⚡",
    title: "Teammitglied",
    subtitle: "Ich will mitbauen",
    perks: [
      "Aktive Mitgestaltung des Produkts",
      "Fokus: Marketing/Social oder Entwicklung",
      "Reale Startup-Erfahrung im K1-Kontext",
    ],
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Bewerbungen" },
  { value: 4, suffix: "", label: "Module" },
  { value: 6, suffix: "+", label: "Partner-Institutionen" },
  { value: 0, suffix: "€", label: "Für Studierende" },
];

const trustPartners = [
  "Psychosoziale Beratungsstelle",
  "Hochschulbibliothek",
  "DVZ",
  "Gründerzentrum",
  "Prof. Heller · MAD",
  "Prof. Dyckhoff · CX",
];

const problemCards = [
  {
    emoji: "😰",
    color: "#7c6aff",
    stat: "70%",
    statLabel: "lernen allein",
    title: "Allein studieren",
    text: "Du lernst isoliert, obwohl 500 Kommilitonen dasselbe Modul belegen und dieselben Fragen haben.",
  },
  {
    emoji: "📍",
    color: "#3ecfcf",
    stat: "45min",
    statLabel: "Platzsuche / Tag",
    title: "Kein Lernplatz frei",
    text: "20 Minuten durch die Bibliothek wandern — und am Ende im Treppenhaus landen. Jeden Tag aufs Neue.",
  },
  {
    emoji: "🧠",
    color: "#4ade80",
    stat: "1 von 3",
    statLabel: "fühlen sich überfordert",
    title: "Druck ohne Support",
    text: "Die Belastung wächst still. Das Umfeld fragt selten nach. Und wenn doch, weißt du nicht, wo du anfangen sollst.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Scroll-reveal Hook
   ══════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ══════════════════════════════════════════════════════════════
   Animated Counter Hook
   ══════════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

/* ══════════════════════════════════════════════════════════════
   Mini UI Components (for feature cards)
   ══════════════════════════════════════════════════════════════ */

function MiniLernpartner() {
  return (
    <div className="mini-ui flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span style={{ color: "var(--k1-violet)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Match gefunden
        </span>
        <span style={{ color: "var(--k1-green)", fontSize: "0.6rem", fontWeight: 700 }}>92% Kompatibel</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="mini-avatar" style={{ background: "linear-gradient(135deg, #7c6aff, #3ecfcf)" }}>SB</div>
        <div className="mini-avatar" style={{ background: "linear-gradient(135deg, #c084fc, #7c6aff)" }}>MK</div>
        <div className="mini-avatar" style={{ background: "linear-gradient(135deg, #3ecfcf, #4ade80)" }}>LR</div>
        <div style={{ fontSize: "0.65rem", color: "var(--k1-muted)" }}>+2 weitere</div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <span className="mini-badge" style={{ background: "rgba(124,106,255,0.15)", color: "#a594ff" }}>BWL</span>
        <span className="mini-badge" style={{ background: "rgba(62,207,207,0.15)", color: "#5ee0e0" }}>Mo–Mi</span>
        <span className="mini-badge" style={{ background: "rgba(74,222,128,0.15)", color: "#6aeda0" }}>Klausurvorbereitung</span>
      </div>
    </div>
  );
}

function MiniLernplatz() {
  return (
    <div className="mini-ui flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span style={{ color: "var(--k1-teal)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Bibliothek · Ebene 2
        </span>
        <span className="mini-badge" style={{ background: "rgba(74,222,128,0.2)", color: "#4ade80" }}>● 12 frei</span>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "3px",
              background:
                i === 5 || i === 6 || i === 9
                  ? "rgba(62,207,207,0.4)"
                  : [1, 3, 7, 10, 13].includes(i)
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(74,222,128,0.2)",
              border: i === 5 ? "1px solid var(--k1-teal)" : "1px solid rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between" style={{ fontSize: "0.6rem", color: "var(--k1-muted)" }}>
        <span>🟢 Frei · 🔵 Dein Platz · ⬜ Belegt</span>
        <span style={{ color: "var(--k1-teal)", fontWeight: 700, cursor: "pointer" }}>Buchen →</span>
      </div>
    </div>
  );
}

function MiniMental() {
  const bars = [35, 50, 45, 65, 75, 60, 80];
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  return (
    <div className="mini-ui flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span style={{ color: "var(--k1-green)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Woche 12 · Stimmung
        </span>
        <span className="mini-badge" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>↑ Besser</span>
      </div>
      <div className="flex items-end gap-1.5" style={{ height: "3rem" }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="mini-chart-bar w-full"
              style={{
                height: `${h}%`,
                background: h > 60
                  ? "linear-gradient(to top, rgba(74,222,128,0.3), rgba(74,222,128,0.7))"
                  : "linear-gradient(to top, rgba(255,255,255,0.05), rgba(255,255,255,0.15))",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {days.map((d) => (
          <div key={d} className="flex-1 text-center" style={{ fontSize: "0.5rem", color: "var(--k1-dim)" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function MiniLearning() {
  return (
    <div className="mini-ui flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span style={{ color: "var(--k1-pink)", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          KI-Zusammenfassung
        </span>
        <span className="mini-badge" style={{ background: "rgba(192,132,252,0.15)", color: "#d4a5ff" }}>✨ Generiert</span>
      </div>
      <div className="flex flex-col gap-1.5" style={{ fontSize: "0.6rem", color: "var(--k1-muted)" }}>
        <div style={{ background: "rgba(192,132,252,0.08)", borderRadius: "4px", padding: "0.35rem 0.5rem", borderLeft: "2px solid #c084fc" }}>
          Kapitel 3: Supply-Chain-Management…
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "4px", padding: "0.35rem 0.5rem" }}>
          → 12 Karteikarten generiert
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "4px", padding: "0.35rem 0.5rem" }}>
          → 5 Quiz-Fragen bereit
        </div>
      </div>
    </div>
  );
}

const miniUIMap: Record<string, React.FC> = {
  lernpartner: MiniLernpartner,
  lernplatz: MiniLernplatz,
  mental: MiniMental,
  learning: MiniLearning,
};

/* ══════════════════════════════════════════════════════════════
   Stat Counter Component
   ══════════════════════════════════════════════════════════════ */

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 1600);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="stat-number text-3xl sm:text-4xl lg:text-5xl font-black">
        {count}{suffix}
      </span>
      <span className="text-xs sm:text-sm font-semibold" style={{ color: "var(--k1-muted)" }}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page Component
   ══════════════════════════════════════════════════════════════ */

export default function K1LandingPage() {
  const [selectedRole, setSelectedRole] = useState<string>("nutzer");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    hochschule: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const problemRef = useScrollReveal();
  const solutionRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const trustRef = useScrollReveal();
  const applyRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="noise relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--k1-bg)", color: "var(--k1-text)" }}
    >
      {/* ── Global Aurora background ─────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div
          className="aurora-blob"
          style={{
            width: "70vw",
            height: "70vw",
            maxWidth: "900px",
            maxHeight: "900px",
            top: "-20%",
            left: "-15%",
            background: "radial-gradient(circle, rgba(124,106,255,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "750px",
            maxHeight: "750px",
            top: "10%",
            right: "-20%",
            background: "radial-gradient(circle, rgba(62,207,207,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            bottom: "15%",
            left: "25%",
            background: "radial-gradient(circle, rgba(192,132,252,0.14) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          NAV
          ══════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(5,7,26,0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm"
              style={{ background: "var(--k1-gradient)", color: "white" }}
            >
              K1
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: "var(--k1-text)" }}>
              Project K1.0
            </span>
            <span
              className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(124,106,255,0.12)",
                color: "var(--k1-violet)",
                border: "1px solid rgba(124,106,255,0.2)",
              }}
            >
              by MyJourney
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Problem", href: "#problem" },
              { label: "Features", href: "#features" },
              { label: "Bewerben", href: "#apply" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: "var(--k1-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--k1-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--k1-muted)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#apply" className="btn-glow hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              Jetzt bewerben →
            </a>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menü öffnen"
              style={{ color: "var(--k1-muted)" }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 pb-4 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { label: "Problem", href: "#problem" },
              { label: "Features", href: "#features" },
              { label: "Bewerben", href: "#apply" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold py-2"
                style={{ color: "var(--k1-muted)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#apply" className="btn-glow inline-flex items-center justify-center py-3 text-sm">
              Jetzt bewerben →
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* ══════════════════════════════════════════════════════════
            1. HERO — Asymmetric Split
            ══════════════════════════════════════════════════════════ */}
        <section className="relative flex items-center px-6 lg:px-12 py-10 overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0" style={{ opacity: 0.25 }}>
            <Image
              src="/k1-hero-v2.jpg"
              alt="Aurora Campus Background"
              fill
              className="object-cover"
              style={{ objectPosition: "center 90%" }}
              priority
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="flex flex-col gap-6 fade-up">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit fade-up-delay-1"
                style={{
                  background: "rgba(124,106,255,0.1)",
                  border: "1px solid rgba(124,106,255,0.25)",
                  color: "var(--k1-violet)",
                }}
              >
                <span className="pulse-dot" />
                <span>🎓 Campus Beta · Deutschland 2025</span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight fade-up-delay-1"
                style={{ color: "var(--k1-text)" }}
              >
                Studieren ist{" "}
                <span className="gradient-text">schwer genug.</span>
                <br />
                Dein System sollte es nicht sein.
              </h1>

              {/* Subheadline */}
              <p
                className="text-base lg:text-lg max-w-lg leading-relaxed fade-up-delay-2"
                style={{ color: "var(--k1-muted)" }}
              >
                Du lernst allein, obwohl hunderte Kommilitonen dasselbe Problem haben.
                Du suchst einen Lernplatz — und findest keinen. Der Druck wächst.{" "}
                <strong style={{ color: "var(--k1-text)" }}>Project K1.0 ändert das.</strong>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 fade-up-delay-3">
                <a
                  href="#apply"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 text-base"
                >
                  Jetzt bewerben →
                </a>
                <a
                  href="#features"
                  className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-base"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  Features entdecken ↓
                </a>
              </div>

              {/* Trust pills */}
              <div
                className="flex flex-wrap gap-5 text-sm mt-2 fade-up-delay-4"
                style={{ color: "var(--k1-muted)" }}
              >
                <span className="flex items-center gap-1.5">🔒 Kein Spam</span>
                <span className="flex items-center gap-1.5">⚡ Kostenlose Beta</span>
                <span className="flex items-center gap-1.5">🇩🇪 Für Deutschland</span>
              </div>
            </div>

            {/* Right — Floating Dashboard Mockup */}
            <div className="hidden lg:flex items-center justify-center fade-up-delay-2">
              <div className="dashboard-float transform lg:scale-90 origin-right" style={{ width: "100%", maxWidth: "520px" }}>
                <div
                  className="glass-card-lg p-5"
                  style={{
                    background: "rgba(10,14,40,0.85)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,106,255,0.08)",
                  }}
                >
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                        style={{ background: "var(--k1-gradient)", color: "white" }}
                      >
                        K1
                      </div>
                      <span className="text-sm font-bold" style={{ color: "var(--k1-text)" }}>
                        Dashboard
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                    </div>
                  </div>

                  {/* Mini widgets grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <MiniLernpartner />
                    <MiniLernplatz />
                    <MiniMental />
                    <MiniLearning />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            2. PROBLEM
            ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="py-24 px-6 lg:px-12" ref={problemRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="reveal text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-violet)" }}
              >
                Das Problem
              </p>
              <h2
                className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                style={{ color: "var(--k1-text)" }}
              >
                Klingt bekannt?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {problemCards.map((problem, i) => (
                <div
                  key={problem.title}
                  className={`reveal reveal-delay-${i + 1} glass-card card-glow p-8 flex flex-col gap-5`}
                  style={{ borderTop: `2px solid ${problem.color}40` }}
                >
                  {/* Stat callout */}
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black" style={{ color: problem.color }}>
                      {problem.stat}
                    </span>
                    <span className="text-xs font-semibold pb-1" style={{ color: "var(--k1-muted)" }}>
                      {problem.statLabel}
                    </span>
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{
                      background: `${problem.color}15`,
                      border: `1px solid ${problem.color}25`,
                    }}
                  >
                    {problem.emoji}
                  </div>

                  <div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "var(--k1-text)" }}
                    >
                      {problem.title}
                    </h3>
                    <p className="leading-relaxed text-sm" style={{ color: "var(--k1-muted)" }}>
                      {problem.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. SOLUTION INTRO
            ══════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6 lg:px-12" ref={solutionRef}>
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="reveal inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-8 text-base font-bold"
              style={{
                background: "rgba(124,106,255,0.08)",
                border: "1px solid rgba(124,106,255,0.18)",
              }}
            >
              <span className="gradient-text">Project K1.0</span>
            </div>
            <h2
              className="reveal reveal-delay-1 text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: "var(--k1-text)" }}
            >
              Vier Module.{" "}
              <span className="gradient-text">Ein System.</span>
              <br />
              Gebaut für den Campus.
            </h2>
            <p
              className="reveal reveal-delay-2 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: "var(--k1-muted)" }}
            >
              Project K1.0 ist eine fokussierte Campus-Version von MyJourney — entwickelt im Rahmen
              einer Hochschulförderung, validiert durch Fokusgruppen und direkt mit der
              Psychosozialen Beratungsstelle, Bibliothek und DVZ vernetzt.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. FEATURES — Bento Grid
            ══════════════════════════════════════════════════════════ */}
        <section id="features" className="py-24 px-6 lg:px-12" ref={featuresRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="reveal text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-teal)" }}
              >
                Die 4 Module
              </p>
              <h2
                className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black tracking-tight"
                style={{ color: "var(--k1-text)" }}
              >
                Was K1.0 kann.
              </h2>
            </div>

            {/* Bento grid */}
            <div className="bento-grid">
              {modules.map((mod, i) => {
                const MiniUI = miniUIMap[mod.id];
                return (
                  <div
                    key={mod.id}
                    className={`reveal reveal-delay-${i + 1} glass-card card-glow p-7 sm:p-8 flex flex-col gap-5`}
                    style={{ borderTop: `2px solid ${mod.color}40` }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{
                          background: `${mod.color}15`,
                          border: `1px solid ${mod.color}25`,
                        }}
                      >
                        {mod.emoji}
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-1"
                          style={{ color: mod.color }}
                        >
                          {mod.tagline}
                        </p>
                        <h3
                          className="text-lg sm:text-xl font-black"
                          style={{ color: "var(--k1-text)" }}
                        >
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="leading-relaxed text-sm" style={{ color: "var(--k1-muted)" }}>
                      {mod.desc}
                    </p>

                    {/* Mini UI Preview */}
                    {MiniUI && <MiniUI />}

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {mod.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{
                            background: `${mod.color}10`,
                            border: `1px solid ${mod.color}20`,
                            color: mod.color,
                          }}
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
            5. TRUST BAR
            ══════════════════════════════════════════════════════════ */}
        <section
          className="py-16 px-6 lg:px-12"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
          ref={trustRef}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="reveal text-xs font-bold uppercase tracking-widest mb-8"
              style={{ color: "var(--k1-muted)" }}
            >
              Vernetzt & validiert mit
            </p>
            <div className="reveal reveal-delay-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="marquee-track gap-4 py-2">
                {[...trustPartners, ...trustPartners].map((inst, i) => (
                  <span
                    key={`${inst}-${i}`}
                    className="text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "var(--k1-dim)",
                      backdropFilter: "blur(8px)"
                    }}
                  >
                    <span className="material-symbols-outlined text-xs">verified</span>
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6. APPLY SECTION
            ══════════════════════════════════════════════════════════ */}
        <section id="apply" className="py-24 px-6 lg:px-12" ref={applyRef}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="reveal text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-violet)" }}
              >
                Jetzt bewerben
              </p>
              <h2
                className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
                style={{ color: "var(--k1-text)" }}
              >
                Werde Teil von K1.0.
              </h2>
              <p className="reveal reveal-delay-2 text-base lg:text-lg" style={{ color: "var(--k1-muted)" }}>
                Wähle deine Rolle — und wir melden uns innerhalb von 48h.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="reveal reveal-delay-2 flex flex-col gap-8">
                {/* Progress indicator */}
                <div className="flex justify-center gap-3 mb-2">
                  <div className="w-8 h-1.5 rounded-full" style={{ background: "var(--k1-violet)" }}></div>
                  <div className="w-8 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}></div>
                  <div className="w-8 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}></div>
                </div>

                {/* Role selector */}
                <div>
                  <label className="block text-sm font-bold mb-4" style={{ color: "var(--k1-text)" }}>
                    Ich möchte mich bewerben als …
                  </label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`role-card glass-card p-5 text-left flex flex-col gap-3 cursor-pointer ${
                          selectedRole === role.id ? "selected" : ""
                        }`}
                      >
                        <span className="text-2xl">{role.icon}</span>
                        <div>
                          <p className="font-black text-base" style={{ color: "var(--k1-text)" }}>
                            {role.title}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--k1-muted)" }}>
                            {role.subtitle}
                          </p>
                        </div>
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {role.perks.map((perk) => (
                            <li
                              key={perk}
                              className="flex items-start gap-2 text-xs"
                              style={{ color: "var(--k1-muted)" }}
                            >
                              <span className="mt-0.5 shrink-0" style={{ color: "var(--k1-teal)" }}>
                                ✓
                              </span>
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: "var(--k1-text)" }}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Max Mustermann"
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      className="k1-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "var(--k1-text)" }}>
                      E-Mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="max@uni.de"
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      className="k1-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="hochschule" className="block text-sm font-semibold mb-2" style={{ color: "var(--k1-text)" }}>
                      Hochschule
                    </label>
                    <input
                      id="hochschule"
                      type="text"
                      required
                      placeholder="z.B. TU Berlin, LMU München …"
                      value={formState.hochschule}
                      onChange={(e) => setFormState((prev) => ({ ...prev, hochschule: e.target.value }))}
                      className="k1-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="motivation" className="block text-sm font-semibold mb-2" style={{ color: "var(--k1-text)" }}>
                      Motivation{" "}
                      <span className="font-normal text-xs ml-1" style={{ color: "var(--k1-muted)" }}>
                        (optional — kurz & direkt)
                      </span>
                    </label>
                    <textarea
                      id="motivation"
                      placeholder="Warum willst du dabei sein? Was nervt dich am Campus-Studium?"
                      rows={3}
                      value={formState.motivation}
                      onChange={(e) => setFormState((prev) => ({ ...prev, motivation: e.target.value }))}
                      className="k1-textarea"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-3">
                  <button type="submit" className="btn-glow w-full sm:w-auto px-12 py-4 text-base">
                    Bewerbung absenden →
                  </button>
                  <p className="text-xs" style={{ color: "var(--k1-muted)" }}>
                    Wir melden uns innerhalb von 48 Stunden. Kein Spam, versprochen.
                  </p>
                </div>
              </form>
            ) : (
              <div
                className="glass-card p-12 text-center relative overflow-hidden"
                style={{ borderColor: "rgba(124,106,255,0.3)" }}
              >
                {/* Confetti Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="confetti-particle"
                    style={{
                      left: `${5 + Math.random() * 90}%`,
                      top: `-20px`,
                      background: ['#7c6aff', '#3ecfcf', '#4ade80', '#c084fc'][Math.floor(Math.random() * 4)],
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  />
                ))}

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"
                  style={{
                    background: "rgba(74,222,128,0.12)",
                    border: "1px solid rgba(74,222,128,0.25)",
                  }}
                >
                  ✅
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ color: "var(--k1-text)" }}>
                  Bewerbung eingegangen!
                </h3>
                <p className="text-base" style={{ color: "var(--k1-muted)" }}>
                  Danke, <strong style={{ color: "var(--k1-text)" }}>{formState.name}</strong>!
                  Wir melden uns innerhalb von 48 Stunden bei{" "}
                  <strong style={{ color: "var(--k1-violet)" }}>{formState.email}</strong>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 py-12 px-6 lg:px-12 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {/* subtle gradient mesh */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at bottom, rgba(124,106,255,0.1) 0%, transparent 60%)"
        }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm"
                style={{ background: "var(--k1-gradient)", color: "white" }}
              >
                K1
              </div>
              <span className="font-black text-lg tracking-tight">Project K1.0</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--k1-muted)" }}>
              Project K1.0 ist eine Hochschul-Pilotversion und Teil des MyJourney-Ökosystems.
              Gefördert durch das K1-Programm.
            </p>
            <p className="text-xs mt-2" style={{ color: "var(--k1-dim)" }}>
              Built with ❤️ on Campus.
            </p>
          </div>

          {/* Product */}
          <div>
            <h5
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--k1-muted)" }}
            >
              Module
            </h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Lernpartner-Matching", "Lernplatz-Booking", "Mentales Monitoring", "Adaptive KI"].map((m) => (
                <li key={m} className="transition-colors hover:text-white cursor-default">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--k1-muted)" }}
            >
              Legal
            </h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Impressum", "Datenschutz", "Kontakt"].map((l) => (
                <li key={l} className="transition-colors hover:text-white cursor-pointer">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2025 MyJourney / Project K1.0. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <span className="material-symbols-outlined text-sm">work</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <span className="material-symbols-outlined text-sm">chat</span>
              </a>
            </div>
          </div>
          <p className="text-xs text-center sm:text-right" style={{ color: "rgba(255,255,255,0.2)" }}>
            Pilotprojekt · Exklusive Rechte & Markenidentität verbleiben bei MyJourney.
          </p>
        </div>
      </footer>
    </div>
  );
}
