"use client";

import Image from "next/image";
import { useState } from "react";

// ── Data ────────────────────────────────────────────────────────────
const modules = [
  {
    id: "lernpartner",
    emoji: "🤝",
    color: "#7c6aff",
    glow: "rgba(124,106,255,0.18)",
    title: "Lernpartner-Matching",
    tagline: "Finde dein Team.",
    desc: "Unser Algorithmus analysiert Studiengang, Lernstil, Prüfungsziele und Verfügbarkeit — und verbindet dich mit den Kommilitonen, mit denen du wirklich weiterkommst. Kein Raten mehr.",
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
    desc: "Tägliche Mini-Checks, Stimmungsverläufe und strukturierte Fragebögen helfen dir und dem Beratungsteam, Belastungsspitzen früh zu erkennen — bevor sie eskalieren.",
    highlights: ["Anonymes Check-in", "Verlaufsanalyse", "Verbindung zur Beratungsstelle"],
  },
  {
    id: "learning",
    emoji: "📖",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.18)",
    title: "Adaptive Lernunterstützung",
    tagline: "Dein Skript. Deine KI.",
    desc: "Lade Skripte, PDFs oder Mitschriften hoch — und erhalte sofort Zusammenfassungen, Quizfragen und quellenbasierte Erklärungen. Inspiriert von NotebookLM, gebaut für den Campus.",
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

// ── Component ────────────────────────────────────────────────────────
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="noise relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--k1-bg)", color: "var(--k1-text)" }}
    >
      {/* ── Global Aurora background ─────────────────────────────── */}
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
            background: "radial-gradient(circle, rgba(124,106,255,0.22) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(62,207,207,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            bottom: "20%",
            left: "30%",
            background: "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(5,7,26,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm"
              style={{ background: "var(--k1-gradient)", color: "white" }}
            >
              K1
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: "var(--k1-text)" }}>
              Project K1.0
            </span>
            <span
              className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(124,106,255,0.15)", color: "var(--k1-violet)", border: "1px solid rgba(124,106,255,0.25)" }}
            >
              by MyJourney
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Problem", href: "#problem" },
              { label: "Features", href: "#features" },
              { label: "Bewerben", href: "#apply" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors"
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
            {/* Mobile hamburger */}
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {["#problem", "#features", "#apply"].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold py-2"
                style={{ color: "var(--k1-muted)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {["Problem", "Features", "Bewerben"][i]}
              </a>
            ))}
            <a href="#apply" className="btn-glow inline-flex items-center justify-center py-3 text-sm">
              Jetzt bewerben →
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* ── 1. HERO ───────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 lg:px-12 pt-20 pb-24 overflow-hidden">
          {/* Hero image background */}
          <div
            className="absolute inset-0 z-0"
            style={{ opacity: 0.35 }}
          >
            <Image
              src="/k1-hero.jpg"
              alt="Aurora Campus Background"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-4xl mx-auto fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(124,106,255,0.12)",
                border: "1px solid rgba(124,106,255,0.3)",
                color: "var(--k1-violet)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--k1-violet)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "var(--k1-violet)" }} />
              </span>
              🎓 Campus Beta · Deutschland 2025
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
              style={{ color: "var(--k1-text)" }}
            >
              Studieren ist{" "}
              <span className="gradient-text">schwer genug.</span>
              <br />
              Dein System sollte es nicht sein.
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ color: "var(--k1-muted)" }}>
              Du lernst allein, obwohl hunderte Kommilitonen dasselbe Problem haben.
              Du suchst einen Lernplatz — und findest keinen. Der Druck wächst.
              Aber niemand fragt, wie es dir wirklich geht.{" "}
              <strong style={{ color: "var(--k1-text)" }}>Project K1.0 ändert das.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply" className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
                Jetzt bewerben →
              </a>
              <a href="#features" className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-base"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                Features entdecken ↓
              </a>
            </div>

            {/* Trust pills */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm" style={{ color: "var(--k1-muted)" }}>
              <span>🔒 Kein Spam</span>
              <span>⚡ Kostenlose Beta</span>
              <span>🇩🇪 Für Studenten in Deutschland</span>
            </div>
          </div>
        </section>

        {/* ── 2. PROBLEM ──────────────────────────────────────────── */}
        <section id="problem" className="py-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-violet)" }}>
                Das Problem
              </p>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                style={{ color: "var(--k1-text)" }}>
                Klingt bekannt?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "😰",
                  color: "#7c6aff",
                  title: "Allein studieren",
                  text: "Du lernst isoliert, obwohl 500 Kommilitonen dasselbe Modul belegen und dieselben Fragen haben.",
                },
                {
                  emoji: "📍",
                  color: "#3ecfcf",
                  title: "Kein Lernplatz frei",
                  text: "20 Minuten durch die Bibliothek wandern — und am Ende im Treppenhaus landen. Jeden Tag aufs Neue.",
                },
                {
                  emoji: "🧠",
                  color: "#4ade80",
                  title: "Druck ohne Support",
                  text: "Die Belastung wächst still. Das Umfeld fragt selten nach. Und wenn doch, weißt du nicht, wo du anfangen sollst.",
                },
              ].map((problem) => (
                <div key={problem.title} className="glass-card p-8 flex flex-col gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${problem.color}18`, border: `1px solid ${problem.color}30` }}
                  >
                    {problem.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--k1-text)" }}>
                      {problem.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--k1-muted)" }}>
                      {problem.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SOLUTION INTRO ───────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-8 text-base font-bold"
              style={{
                background: "rgba(124,106,255,0.08)",
                border: "1px solid rgba(124,106,255,0.2)",
              }}
            >
              <span className="gradient-text">Project K1.0</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: "var(--k1-text)" }}>
              Vier Module.{" "}
              <span className="gradient-text">Ein System.</span>
              <br />
              Gebaut für den Campus.
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: "var(--k1-muted)" }}>
              Project K1.0 ist eine fokussierte Campus-Version von MyJourney — entwickelt im Rahmen
              einer Hochschulförderung, validiert durch Fokusgruppen und direkt mit der
              Psychosozialen Beratungsstelle, Bibliothek und DVZ vernetzt.
            </p>
          </div>
        </section>

        {/* ── 4. FEATURES / MODULE ───────────────────────────────── */}
        <section id="features" className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-teal)" }}>
                Die 4 Module
              </p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight"
                style={{ color: "var(--k1-text)" }}>
                Was K1.0 kann.
              </h2>
            </div>

            {/* Preview image */}
            <div className="glass-card p-2 mb-12 max-w-4xl mx-auto overflow-hidden">
              <Image
                src="/k1-modules.jpg"
                alt="K1.0 Module Preview"
                width={1200}
                height={900}
                className="w-full h-auto rounded-xl"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>

            {/* Module cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((mod) => (
                <div key={mod.id} className="glass-card p-8 flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}30` }}
                    >
                      {mod.emoji}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: mod.color }}>
                        {mod.tagline}
                      </p>
                      <h3 className="text-xl font-black" style={{ color: "var(--k1-text)" }}>
                        {mod.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="leading-relaxed" style={{ color: "var(--k1-muted)" }}>
                    {mod.desc}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {mod.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          background: `${mod.color}12`,
                          border: `1px solid ${mod.color}25`,
                          color: mod.color,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. INSTITUTIONAL TRUST BAR ──────────────────────────── */}
        <section className="py-16 px-6 lg:px-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: "var(--k1-muted)" }}>
              Vernetzt & validiert mit
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                "Psychosoziale Beratungsstelle",
                "Hochschulbibliothek",
                "DVZ",
                "Gründerzentrum",
                "Prof. Heller · MAD",
                "Prof. Dyckhoff · CX",
              ].map((inst) => (
                <span key={inst}>{inst}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. APPLY SECTION ────────────────────────────────────── */}
        <section id="apply" className="py-24 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--k1-violet)" }}>
                Jetzt bewerben
              </p>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
                style={{ color: "var(--k1-text)" }}>
                Werde Teil von K1.0.
              </h2>
              <p className="text-lg" style={{ color: "var(--k1-muted)" }}>
                Wähle deine Rolle — und wir melden uns innerhalb von 48h.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">

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
                        className={`role-card glass-card p-5 text-left flex flex-col gap-3 cursor-pointer ${selectedRole === role.id ? "selected" : ""}`}
                      >
                        <span className="text-2xl">{role.icon}</span>
                        <div>
                          <p className="font-black text-base" style={{ color: "var(--k1-text)" }}>{role.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--k1-muted)" }}>{role.subtitle}</p>
                        </div>
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {role.perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2 text-xs" style={{ color: "var(--k1-muted)" }}>
                              <span className="mt-0.5 shrink-0" style={{ color: "var(--k1-teal)" }}>✓</span>
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
                  {[
                    { id: "name", label: "Name", placeholder: "Max Mustermann", type: "text", key: "name" },
                    { id: "email", label: "E-Mail", placeholder: "max@uni.de", type: "email", key: "email" },
                    { id: "hochschule", label: "Hochschule", placeholder: "z.B. TU Berlin, LMU München …", type: "text", key: "hochschule" },
                  ].map((field) => (
                    <div key={field.id} className={field.id === "hochschule" ? "sm:col-span-2" : ""}>
                      <label htmlFor={field.id} className="block text-sm font-semibold mb-2"
                        style={{ color: "var(--k1-text)" }}>
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={formState[field.key as keyof typeof formState]}
                        onChange={(e) => setFormState((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "var(--k1-text)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--k1-violet)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}

                  {/* Motivation textarea */}
                  <div className="sm:col-span-2">
                    <label htmlFor="motivation" className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--k1-text)" }}>
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
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "var(--k1-text)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--k1-violet)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
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
                className="glass-card p-12 text-center"
                style={{ borderColor: "rgba(124,106,255,0.3)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"
                  style={{ background: "rgba(124,106,255,0.15)", border: "1px solid rgba(124,106,255,0.3)" }}
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

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        className="relative z-10 py-12 px-6 lg:px-12"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm"
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
          </div>

          {/* Product */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--k1-muted)" }}>
              Module
            </h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Lernpartner-Matching", "Lernplatz-Booking", "Mentales Monitoring", "Adaptive KI"].map((m) => (
                <li key={m} className="transition-colors hover:text-white cursor-default">{m}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--k1-muted)" }}>
              Legal
            </h5>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Impressum", "Datenschutz", "Kontakt"].map((l) => (
                <li key={l} className="transition-colors hover:text-white cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2025 MyJourney / Project K1.0. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Pilotprojekt · Exklusive Rechte & Markenidentität verbleiben bei MyJourney.
          </p>
        </div>
      </footer>
    </div>
  );
}
