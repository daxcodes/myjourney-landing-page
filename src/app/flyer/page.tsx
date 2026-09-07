"use client";

import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════════════════════ */

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

const problemSolutions = [
  {
    num: "01",
    problem: {
      stat: "70%",
      statLabel: "lernen isoliert, würden aber gerne in Gruppen lernen",
      title: "Ineffizientes Solo-Pauken",
      text: "Trotz tausender Kommilitonen kämpfen viele Studierende allein mit demselben Stoff. Passende Lernpartner zu finden scheitert oft an unterschiedlichen Stundenplänen, Hemmschwellen oder mangelnder Vernetzung. Das Resultat: Fehlender Austausch, sinkende Motivation und unnötig hoher Zeitaufwand beim Durcharbeiten komplexer Themengebiete.",
      details: [
        "Keine zentrale Plattform zum Finden von Lernpartnern im selben Kurs",
        "Stundenpläne und Verfügbarkeiten kollidieren ohne Abgleich",
        "Hemmschwelle, fremde Kommilitonen direkt anzusprechen",
      ],
    },
    solution: {
      title: "Lernpartner Matching",
      tagline: "Finde dein Team.",
      text: "Unser smarter Algorithmus analysiert deinen individuellen Lernstil, deine zeitlichen Verfügbarkeiten sowie konkrete Prüfungsziele. Auf dieser Datenbasis verbinden wir dich passgenau mit Kommilitonen aus deinem Studiengang, um effiziente und harmonische Lerngruppen zu formen. So wird aus einsamem Pauken echter Team-Erfolg.",
      features: ["Persönliches Matching", "Lerngruppen bis 6 Personen", "Kompatibilitäts-Score"],
    },
  },
  {
    num: "02",
    problem: {
      stat: "45 Min.",
      statLabel: "verpuffen oft bei der Platzsuche",
      title: "Frustrierende Sitzplatzsuche",
      text: "Gerade in der Klausurenphase platzen Bibliotheken und Lernbereiche aus allen Nähten. Studierende laufen nicht selten ziellos über den Campus, um einen freien Tisch oder Gruppenraum zu ergattern, wertvolle Lernzeit und Energie, die völlig unnötig verloren geht.",
      details: [
        "Kein Echtzeit-Überblick über freie Plätze in der Bibliothek",
        "Gruppenräume sind oft belegt, ohne dass man es vorher weiß",
        "Stoßzeiten führen zu Frust und Zeitverlust",
      ],
    },
    solution: {
      title: "Lernplatz Reservierung",
      tagline: "Reservieren, lernen, fertig.",
      text: "Unsere Echtzeit-Kapazitätsübersicht zeigt dir sofort, wo in der Bibliothek, in Gruppenräumen oder ruhigen Arbeitsbereichen noch Tische frei sind. Du kannst deinen präferierten Slot verbindlich reservieren und dich per einfachem Check-in vor Ort verifizieren. So startest du stressfrei in deinen Lerntag.",
      features: ["Aktuelle Verfügbarkeit", "Einfache Buchung", "Check-in System"],
    },
  },
  {
    num: "03",
    problem: {
      stat: "1 von 3",
      statLabel: "klagt über hohen mentalen Druck",
      title: "Unsichtbare Überlastung",
      text: "Der permanente Leistungsdruck durch eng getaktete Prüfungsphasen führt häufig zu chronischem Stress. Weil dieser Druck im Studienalltag meist im Stillen ertragen wird, kommt rechtzeitige Entlastung oder psychologische Beratung für viele zu spät.",
      details: [
        "Mentaler Druck wird oft erst bemerkt, wenn es zu spät ist",
        "Bestehende Beratungsangebote sind vielen nicht bekannt oder schwer zugänglich",
        "Studierende scheuen den Schritt, aktiv Hilfe zu suchen",
      ],
    },
    solution: {
      title: "Mentales Monitoring",
      tagline: "Wie geht es dir wirklich?",
      text: "Durch wöchentliche Micro-Check-ins trackst du deine Stimmungsverläufe und dein Stresslevel. Die gewonnenen Einblicke helfen dir, Belastungsspitzen frühzeitig zu erkennen. Bei Bedarf vermittelt die Plattform nahtlos, anonym und unkompliziert den Kontakt zur psychologischen Beratung.",
      features: ["Anonymes Feedback", "Verlaufsübersicht", "Direkter Kontakt zur Beratung"],
    },
  },
  {
    num: "04",
    problem: {
      stat: "80%",
      statLabel: "der Lernzeit ist oft nur passives Lesen",
      title: "Erdrückende Skript-Berge",
      text: "Vorlesungsfolien stapeln sich am Semesterende zu unübersichtlichen Textbergen. Studierende verbringen massiv Zeit damit, das Material mühsam händisch zusammenzufassen, anstatt ihr Wissen aktiv zu testen. Es fehlt an Wegen, den Stoff schnell und interaktiv nutzbar zu machen.",
      details: [
        "Hunderte Folien pro Kurs, keine strukturierte Aufbereitung",
        "Manuelles Zusammenfassen kostet enorm viel Zeit",
        "Passives Lesen führt zu schlechter Wissensverankerung",
      ],
    },
    solution: {
      title: "Unterstützung beim Lernen",
      tagline: "Deine Skripte, deine Fragen.",
      text: "Verwandle passive Skripte in aktive Lernwerkzeuge. Lade einfach deine Vorlesungsfolien hoch, unsere KI generiert daraus in Sekunden präzise Zusammenfassungen, strukturierte Karteikarten und interaktive Multiple-Choice-Quizze. So testest du dein Wissen direkt am eigenen Stoff und optimierst deine Prüfungsvorbereitung messbar.",
      features: ["Dokumenten Upload", "Interaktive Quizze", "Quellenbasierte Antworten"],
    },
  },
];

const founders = [
  {
    initials: "DR",
    name: "Darshan Rajeswaran",
    role: "Projektverantwortlicher · Studierender",
    areas: ["Strategie"],
    quote: "„Kein Studierender sollte das Gefühl haben, auf dem Campus auf sich alleine gestellt zu sein.“",
    bio: "Als aktiver Studierender an der FH Aachen weiß Darshan aus eigener Erfahrung, wie schnell man im dichten Uni-Alltag den Anschluss verlieren kann. Aus dieser persönlichen Betroffenheit heraus brennt er dafür, seinen Mitstudierenden Rückhalt zu geben. Mit Herzblut und Weitblick kümmert er sich um Finanzen, rechtliche Sicherheit und die Vision hinter Project MJ – damit der Campus wieder ein Ort des Miteinanders wird.",
  },
  {
    initials: "DM",
    name: "Dimitri Marcziter",
    role: "Technical Lead · Studierender",
    areas: ["Technische Entwicklung"],
    quote: "„Wir bauen nicht nur Software – wir bauen die Brücken, die im Uni-Alltag oft fehlen.“",
    bio: "Als ehemaliger Wirtschaftsinformatik-Studierender und jetziger BWL-Student verbindet Dimitri technologisches Know-how mit wirtschaftlichem Verständnis. Er kennt schlaflose Nächte vor Prüfungen und den Frust über unübersichtliche Lerntools am eigenen Leib. Als CTO steckt er all seine Energie in die Entwicklung von Project MJ, um Studierenden den Alltag fühlbar zu erleichtern.",
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

/* ══════════════════════════════════════════════════════════════
   Flyer Page
   ══════════════════════════════════════════════════════════════ */

export default function FlyerPage() {
  const problemRef = useScrollReveal();
  const solutionRef = useScrollReveal();
  const foundersRef = useScrollReveal();

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
              MJ
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Project MJ</span>
            <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1" style={{ color: "var(--k1-secondary)", border: "1px solid var(--k1-border)", borderRadius: "9999px", fontFamily: "var(--font-body)", background: "var(--k1-bg-alt)" }}>
              by MyJourney
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Problem", href: "#problem" },
              { label: "Lösung", href: "#solution" },
              { label: "Team", href: "#team" },
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
        </div>
      </header>

      <main>

        {/* ══════════════════════════════════════════════════════════
            1. HERO
            ══════════════════════════════════════════════════════════ */}
        <section className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
            <div className="flex items-center gap-3 fade-in" style={eyebrow}>
              <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-border-dark)", display: "inline-block" }} />
              In Kooperation mit der FH Aachen 2026
              <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-border-dark)", display: "inline-block" }} />
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-tight fade-in fade-in-delay-1"
              style={{ ...sectionHeading }}
            >
              Studieren ist{" "}
              <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>kompliziert genug.</em>
              <br />
              Dein System sollte es nicht sein.
            </h1>

            <p className="text-base lg:text-lg leading-relaxed max-w-2xl fade-in fade-in-delay-2" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
              Du lernst allein, obwohl hunderte Kommilitonen dasselbe Problem haben.
              Du suchst einen Lernplatz und findest keinen.
              Du bist gestresst, aber weißt nicht, wohin damit.{" "}
              <strong style={{ color: "var(--k1-text)", fontWeight: 600 }}>Project MJ ist die Antwort.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 fade-in fade-in-delay-3">
              <a href="#problem" className="btn-primary px-8 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                Das Problem verstehen &darr;
              </a>
              <a href="#solution" className="btn-secondary px-8 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                Unsere Lösung &rarr;
              </a>
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
            2. DAS PROBLEM — Deep Dive
            ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="py-24 px-6 lg:px-12" ref={problemRef}>
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16">
              <p className="reveal mb-5" style={eyebrow}>Das Problem</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-6" style={{ ...sectionHeading }}>
                Der Studienalltag hat{" "}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>Systemlücken.</em>
              </h2>
              <p className="reveal reveal-delay-2 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                Es sind nicht die Vorlesungen, die Studierende an ihre Grenzen bringen, sondern alles drumherum: fehlende Vernetzung, verlorene Lernzeit, unsichtbarer Druck und ineffiziente Vorbereitung. Vier Kernprobleme, die nahezu jeder Studierende kennt.
              </p>
            </div>

            {/* Problem cards — deep */}
            <div className="grid md:grid-cols-2 gap-6">
              {problemSolutions.map((item, i) => (
                <div
                  key={item.num}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "var(--k1-bg-warm)",
                    borderRadius: "1.25rem",
                    padding: "2rem 2.25rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Stat */}
                  <div className="flex items-baseline gap-3">
                    <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2.8rem", fontWeight: 700, lineHeight: 1, color: "var(--k1-accent)" }}>
                      {item.problem.stat}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--k1-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.3, maxWidth: "14rem" }}>
                      {item.problem.statLabel}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>
                      {item.problem.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                      {item.problem.text}
                    </p>
                  </div>

                  {/* Concrete pain points */}
                  <div style={{ borderTop: "1px solid var(--k1-border)", paddingTop: "1rem" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>Konkret bedeutet das:</p>
                    <ul className="flex flex-col gap-2">
                      {item.problem.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.45 }}>
                          <span style={{ color: "#C05A4A", fontSize: "0.65rem", marginTop: "0.2rem", flexShrink: 0, fontWeight: 700 }}>✕</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            3. DIE LÖSUNG — MJs 4 Module
            ══════════════════════════════════════════════════════════ */}
        <section id="solution" className="py-24 px-6 lg:px-12" ref={solutionRef}>
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16">
              <p className="reveal mb-5" style={eyebrow}>Die Lösung</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-6" style={{ ...sectionHeading }}>
                So löst{" "}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>Project MJ</em>{" "}
                das.
              </h2>
              <p className="reveal reveal-delay-2 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                Für jedes der vier Kernprobleme haben wir ein dediziertes Modul entwickelt. Zusammen bilden sie ein Ökosystem, das den gesamten Lernalltag an der Hochschule spürbar verbessert.
              </p>
            </div>

            {/* Solution cards — each paired with its problem */}
            <div className="flex flex-col gap-10">
              {problemSolutions.map((item, i) => (
                <div
                  key={item.num}
                  className={`reveal reveal-delay-${(i % 4) + 1}`}
                  style={{
                    background: "var(--k1-bg-alt)",
                    borderRadius: "1.25rem",
                    boxShadow: "var(--shadow-card)",
                    overflow: "hidden",
                    borderLeft: "4px solid var(--k1-accent)",
                  }}
                >
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
                    {/* Left — The Problem (recap) */}
                    <div className="p-8 lg:p-10 flex flex-col gap-4" style={{ background: "var(--k1-bg-warm)", borderRight: "1px solid var(--k1-border)" }}>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C05A4A", fontFamily: "var(--font-body)" }}>
                          Problem {item.num}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--k1-text)", fontFamily: "var(--font-display)" }}>
                        {item.problem.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                        {item.problem.text}
                      </p>
                      <div className="flex items-baseline gap-2 mt-auto pt-4" style={{ borderTop: "1px solid var(--k1-border)" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "#C05A4A" }}>{item.problem.stat}</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>{item.problem.statLabel}</span>
                      </div>
                    </div>

                    {/* Right — The Solution */}
                    <div className="p-8 lg:p-10 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                          Lösung {item.num}
                        </span>
                        <span style={{ width: "2rem", height: "1px", background: "var(--k1-accent)", display: "inline-block" }} />
                        <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                          {item.solution.tagline}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--k1-text)", fontFamily: "var(--font-display)" }}>
                        {item.solution.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                        {item.solution.text}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: "1px solid var(--k1-border)" }}>
                        {item.solution.features.map((f) => (
                          <span
                            key={f}
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 500,
                              padding: "0.3rem 0.85rem",
                              color: "var(--k1-accent)",
                              fontFamily: "var(--font-body)",
                              background: "#D9E9DC",
                              borderRadius: "9999px",
                            }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            4. FOUNDERS
            ══════════════════════════════════════════════════════════ */}
        <section id="team" className="py-24 px-6 lg:px-12" ref={foundersRef}>
          <div className="max-w-5xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-14">
              <p className="reveal mb-5" style={eyebrow}>Das Team</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-6" style={{ ...sectionHeading }}>
                Die{" "}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>Köpfe</em>{" "}
                hinter Project MJ.
              </h2>
              <p className="reveal reveal-delay-2 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                Project MJ wird von zwei Studierenden der FH Aachen aufgebaut, die selbst täglich erleben, welche Herausforderungen der Campus-Alltag mit sich bringt.
              </p>
            </div>

            {/* Founder cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, i) => (
                <div
                  key={founder.initials}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "var(--k1-bg-alt)",
                    borderRadius: "1.25rem",
                    padding: "2.5rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    transition: "box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
                >
                  {/* Avatar & name */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        background: "var(--k1-accent)",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        borderRadius: "0.75rem",
                      }}
                    >
                      {founder.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: "var(--k1-text)", fontFamily: "var(--font-display)", lineHeight: 1.2 }}>
                        {founder.name}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: "var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xs italic leading-relaxed px-3 py-2" style={{ color: "var(--k1-accent)", background: "var(--k1-bg)", borderRadius: "0.5rem", borderLeft: "3px solid var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                    {founder.quote}
                  </blockquote>

                  {/* Bio */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                    {founder.bio}
                  </p>

                  {/* Area tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-3" style={{ borderTop: "1px solid var(--k1-border)" }}>
                    {founder.areas.map((area) => (
                      <span
                        key={area}
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          padding: "0.3rem 0.85rem",
                          color: "var(--k1-secondary)",
                          fontFamily: "var(--font-body)",
                          background: "var(--k1-bg)",
                          border: "1px solid var(--k1-border)",
                          borderRadius: "9999px",
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>


      {/* ══════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════ */}
      <footer className="py-8 px-6 lg:px-12" style={{ borderTop: "1px solid var(--k1-border)", background: "var(--k1-bg-alt)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>&copy; 2026 MyJourney / Project MJ. Alle Rechte vorbehalten.</p>
          <p className="text-xs text-center sm:text-right" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
            In Kooperation mit der FH Aachen · Gefördert durch das K1-Programm
          </p>
        </div>
      </footer>
    </div>
  );
}
