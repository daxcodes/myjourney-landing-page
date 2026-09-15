"use client";

import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   Data / Translations
   ══════════════════════════════════════════════════════════════ */

const contentData = {
  de: {
    trustPartners: [
      "FH Aachen",
      "Gründungszentrum FH Aachen",
      "Prof. Dr. Büdenbender",
      "Prof. Dr. Bernecker",
      "Prof. Dr. Maihaus",
      "Prof. Dr. Bassen-Metz",
      "Prof. Dr. Eggert",
      "K1 Förderung",
    ],
    problemSolutions: [
      {
        num: "01",
        problem: {
          stat: "70%",
          statLabel: "lernen isoliert, würden aber gerne in Gruppen lernen",
          title: "Ineffizientes Solo-Pauken",
          text: "Trotz tausender Kommilitonen lernen viele Studierende allein mit demselben Stoff. Passende Lernpartner zu finden scheitert oft an unterschiedlichen Stundenplänen, Hemmschwellen oder fehlender Vernetzung – wertvolle Zeit und Motivation gehen verloren.",
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
          text: "Vorlesungsfolien stapeln sich am Semesterende zu unübersichtlichen Textbergen. Studierende verbringen massiv Zeit mit mühsamem Zusammenfassen, anstatt ihr Wissen aktiv und interaktiv zu testen.",
          details: [
            "Hunderte Folien pro Kurs, keine strukturierte Aufbereitung",
            "Manuelles Zusammenfassen kostet enorm viel Zeit",
            "Passives Lesen führt zu schlechter Wissensverankerung",
          ],
        },
        solution: {
          title: "Adaptive Lernunterstützung",
          tagline: "Deine Skripte, deine Fragen.",
          text: "Verwandle passive Skripte in aktive Lernwerkzeuge. Lade Vorlesungsfolien hoch und erhalte in Sekunden präzise Zusammenfassungen, Karteikarten und interaktive Quizze. So testest du dein Wissen direkt am eigenen Stoff und sparst wertvolle Zeit.",
          features: ["Dokumenten Upload", "Interaktive Quizze", "Quellenbasierte Antworten"],
        },
      },
    ],
    founders: [
      {
        initials: "DR",
        name: "Darshan Rajeswaran",
        role: "Product Lead & Operations",
        areas: ["Strategie", "Finanzen", "Compliance"],
        quote: "„Kein Studierender sollte das Gefühl haben, auf dem Campus auf sich alleine gestellt zu sein.“",
        bio: "Durch sein BWL-Studium an der FH Aachen verbindet Darshan wirtschaftliches Know-how und ein ausgeprägtes rechtliches Gespür mit einem klaren Blick für den Studienalltag. Als Projektverantwortlicher steuert er die strategische Ausrichtung, das Partnermanagement sowie das finanzielle Fundament von Project MJ. Mit Blick für regulatorische Anforderungen und klare Strukturen sorgt er dafür, dass aus einer innovativen Vision ein verlässliches, sicher aufgestelltes Werkzeug für Studierende wird.",
      },
      {
        initials: "DM",
        name: "Dimitri Marcziter",
        role: "Product Development & Growth",
        areas: ["Technische Entwicklung", "Community"],
        quote: "„Wir bauen nicht nur Software – wir bauen die Brücken, die im Uni-Alltag oft fehlen.“",
        bio: "Als BWL-Student verbindet Dimitri technologische Neugier mit einem ausgeprägten Gespür für nutzerzentrierte digitale Lösungen. Bei Project MJ treibt er schwerpunktmäßig die praktische Produktentwicklung und das Prototyping voran. Da er den Campus-Alltag bestens kennt, engagiert er sich zudem im Marketing, um die Plattform direkt bei Studierenden zu etablieren und Feedback unmittelbar in neue Features zu übersetzen.",
      },
    ],
    nav: {
      problem: "Problem",
      solution: "Lösung",
      team: "Team",
    },
    hero: {
      eyebrow: "In Kooperation mit der FH Aachen 2026",
      titlePart1: "Studieren ist ",
      titleItalic: "kompliziert genug.",
      titlePart2: "Dein System sollte es nicht sein.",
      description: "Du lernst allein, obwohl hunderte Kommilitonen dasselbe Problem haben. Du suchst einen Lernplatz und findest keinen. Du bist gestresst, aber weißt nicht, wohin damit. ",
      descriptionBold: "Project MJ ist die Antwort.",
      btnProblem: "Das Problem verstehen ↓",
      btnSolution: "Unsere Lösung →",
    },
    trustMarquee: "Vernetzt & validiert mit",
    problemSection: {
      eyebrow: "Das Problem",
      titlePart1: "Der Studienalltag hat ",
      titleItalic: "Systemlücken.",
      description: "Es sind nicht die Vorlesungen, die Studierende an ihre Grenzen bringen, sondern alles drumherum: fehlende Vernetzung, verlorene Lernzeit, unsichtbarer Druck und ineffiziente Vorbereitung. Vier Kernprobleme, die nahezu jeder Studierende kennt.",
      concretely: "Konkret bedeutet das:",
      problemLabel: "Problem"
    },
    solutionSection: {
      eyebrow: "Die Lösung",
      titlePart1: "So löst ",
      titleItalic: "Project MJ",
      titlePart2: " das.",
      description: "Für jedes der vier Kernprobleme haben wir ein dediziertes Modul entwickelt. Zusammen bilden sie ein Ökosystem, das den gesamten Lernalltag an der Hochschule spürbar verbessert.",
      problemLabel: "Problem",
      solutionLabel: "Lösung"
    },
    teamSection: {
      eyebrow: "Das Team",
      titlePart1: "Die ",
      titleItalic: "Köpfe",
      titlePart2: " hinter MyJourney.",
      description: "Project MJ wird von zwei Studierenden der FH Aachen aufgebaut, die selbst täglich erleben, welche Herausforderungen der Campus-Alltag mit sich bringt."
    },
    footer: {
      copy: "© 2026 MyJourney / Project MJ. Alle Rechte vorbehalten.",
      coop: "In Kooperation mit der FH Aachen · Gefördert durch das K1-Programm"
    }
  },
  en: {
    trustPartners: [
      "FH Aachen",
      "Founders Center FH Aachen",
      "Prof. Dr. Büdenbender",
      "Prof. Dr. Bernecker",
      "Prof. Dr. Maihaus",
      "Prof. Dr. Bassen-Metz",
      "Prof. Dr. Eggert",
      "K1 Funding",
    ],
    problemSolutions: [
      {
        num: "01",
        problem: {
          stat: "70%",
          statLabel: "study isolated, but would prefer studying in groups",
          title: "Inefficient Solo Cramming",
          text: "Despite thousands of peers, many students study alone with the exact same material. Finding suitable study partners often fails due to clashing schedules, hesitation, or a lack of networking—resulting in lost time and motivation.",
          details: [
            "No central platform to find study partners in the same course",
            "Schedules and availabilities clash without a way to align them",
            "Hesitation to approach unfamiliar students directly",
          ],
        },
        solution: {
          title: "Study Partner Matching",
          tagline: "Find your team.",
          text: "Our smart algorithm analyzes your individual learning style, time availability, and specific exam goals. Based on this data, we connect you precisely with peers from your major to form efficient and harmonious study groups. Turning lonely cramming into true team success.",
          features: ["Personal Matching", "Study Groups up to 6 People", "Compatibility Score"],
        },
      },
      {
        num: "02",
        problem: {
          stat: "45 Min.",
          statLabel: "often wasted searching for a seat",
          title: "Frustrating Seat Hunts",
          text: "Especially during exam periods, libraries and study areas are bursting at the seams. Students frequently wander the campus aimlessly to snag a free table or group room, wasting valuable study time and energy unnecessarily.",
          details: [
            "No real-time overview of available seats in the library",
            "Group rooms are often occupied without prior notice",
            "Peak hours lead to frustration and lost time",
          ],
        },
        solution: {
          title: "Study Seat Reservation",
          tagline: "Reserve, study, done.",
          text: "Our real-time capacity overview shows you instantly where tables are still available in the library, group rooms, or quiet study areas. You can securely reserve your preferred time slot and verify on-site with a simple check-in. Start your study day completely stress-free.",
          features: ["Live Availability", "Simple Booking", "Check-in System"],
        },
      },
      {
        num: "03",
        problem: {
          stat: "1 in 3",
          statLabel: "complains about high mental pressure",
          title: "Invisible Overload",
          text: "The constant pressure to perform due to tightly scheduled exam periods frequently leads to chronic stress. Because this pressure is usually endured silently in daily campus life, timely relief or psychological counseling comes too late for many.",
          details: [
            "Mental pressure is often noticed only when it's too late",
            "Existing counseling offers are widely unknown or hard to access",
            "Students shy away from actively seeking help",
          ],
        },
        solution: {
          title: "Mental Monitoring",
          tagline: "How are you really doing?",
          text: "Through weekly micro check-ins, you track your mood trends and stress levels. These insights help you recognize stress peaks early on. If needed, the platform seamlessly, anonymously, and effortlessly connects you with psychological counseling.",
          features: ["Anonymous Feedback", "Trend Overview", "Direct Counseling Contact"],
        },
      },
      {
        num: "04",
        problem: {
          stat: "80%",
          statLabel: "of study time is often just passive reading",
          title: "Crushing Script Mountains",
          text: "By the end of the semester, lecture slides pile up into unmanageable mountains of text. Students spend massive amounts of time laboriously summarizing instead of actively and interactively testing their knowledge.",
          details: [
            "Hundreds of slides per course, no structured preparation",
            "Manual summarizing takes up an enormous amount of time",
            "Passive reading leads to poor knowledge retention",
          ],
        },
        solution: {
          title: "Adaptive Learning Support",
          tagline: "Your scripts, your questions.",
          text: "Transform passive scripts into active learning tools. Upload lecture slides and receive precise summaries, flashcards, and interactive quizzes in seconds. Test your knowledge directly on your own material and save valuable time.",
          features: ["Document Upload", "Interactive Quizzes", "Source-Based Answers"],
        },
      },
    ],
    founders: [
      {
        initials: "DR",
        name: "Darshan Rajeswaran",
        role: "Product Lead & Operations",
        areas: ["Strategy", "Finance", "Compliance"],
        quote: "„No student should feel left alone on campus.“",
        bio: "Through his business studies at FH Aachen, Darshan combines economic know-how and a strong legal sense with a clear view of everyday campus life. As the project lead, he steers the strategic direction, partner management, and the financial foundation of Project MJ. With an eye for regulatory requirements and clear structures, he ensures that an innovative vision becomes a reliable, secure tool for students.",
      },
      {
        initials: "DM",
        name: "Dimitri Marcziter",
        role: "Product Development & Growth",
        areas: ["Technical Development", "Community"],
        quote: "„We don't just build software – we build the bridges often missing in everyday campus life.“",
        bio: "As a business student, Dimitri combines technological curiosity with a strong sense for user-centric digital solutions. At Project MJ, he primarily drives hands-on product development and prototyping. Knowing campus life inside out, he is also heavily involved in marketing to establish the platform directly among students and instantly translate their feedback into new features.",
      },
    ],
    nav: {
      problem: "Problem",
      solution: "Solution",
      team: "Team",
    },
    hero: {
      eyebrow: "In cooperation with FH Aachen 2026",
      titlePart1: "Studying is ",
      titleItalic: "complicated enough.",
      titlePart2: "Your system shouldn't be.",
      description: "You study alone, even though hundreds of peers face the exact same problem. You look for a study spot and find none. You're stressed, but don't know where to turn. ",
      descriptionBold: "Project MJ is the answer.",
      btnProblem: "Understand the problem ↓",
      btnSolution: "Our solution →",
    },
    trustMarquee: "Networked & validated with",
    problemSection: {
      eyebrow: "The Problem",
      titlePart1: "Everyday student life has ",
      titleItalic: "system gaps.",
      description: "It's not the lectures pushing students to their limits, but everything around them: lack of networking, lost study time, invisible pressure, and inefficient preparation. Four core problems almost every student knows.",
      concretely: "Concretely, this means:",
      problemLabel: "Problem"
    },
    solutionSection: {
      eyebrow: "The Solution",
      titlePart1: "This is how ",
      titleItalic: "Project MJ",
      titlePart2: " solves it.",
      description: "For each of the four core problems, we've developed a dedicated module. Together, they form an ecosystem that noticeably improves the entire learning experience on campus.",
      problemLabel: "Problem",
      solutionLabel: "Solution"
    },
    teamSection: {
      eyebrow: "The Team",
      titlePart1: "The ",
      titleItalic: "minds",
      titlePart2: " behind MyJourney.",
      description: "Project MJ is being built by two FH Aachen students who experience the challenges of everyday campus life firsthand every single day."
    },
    footer: {
      copy: "© 2026 MyJourney / Project MJ. All rights reserved.",
      coop: "In cooperation with FH Aachen · Supported by the K1 Program"
    }
  }
};

type LangType = "de" | "en";

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
   Page Component
   ══════════════════════════════════════════════════════════════ */

export default function Page() {
  const [lang, setLang] = useState<LangType>("de");
  const c = contentData[lang];

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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 font-bold text-sm" style={{ background: "var(--k1-accent)", color: "#FFFFFF", fontFamily: "var(--font-display)", borderRadius: "0.5rem" }}>
              MJ
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>Project MJ</span>
            <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1" style={{ color: "var(--k1-secondary)", border: "1px solid var(--k1-border)", borderRadius: "9999px", fontFamily: "var(--font-body)", background: "var(--k1-bg-alt)" }}>
              by MyJourney
            </span>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              onClick={() => setLang("de")} 
              className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${lang === "de" ? "bg-[var(--k1-accent)] text-white" : "text-[var(--k1-secondary)] hover:bg-[var(--k1-bg-warm)]"}`}
            >
              DE
            </button>
            <span className="text-[var(--k1-border-dark)] text-xs">|</span>
            <button 
              onClick={() => setLang("en")} 
              className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${lang === "en" ? "bg-[var(--k1-accent)] text-white" : "text-[var(--k1-secondary)] hover:bg-[var(--k1-bg-warm)]"}`}
            >
              EN
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: c.nav.problem, href: "#problem" },
              { label: c.nav.solution, href: "#solution" },
              { label: c.nav.team, href: "#team" },
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
        <section className="px-6 lg:px-12 py-10 lg:py-16">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-5">
            <div className="flex items-center gap-3 fade-in" style={eyebrow}>
              <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-border-dark)", display: "inline-block" }} />
              {c.hero.eyebrow}
              <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-border-dark)", display: "inline-block" }} />
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-tight fade-in fade-in-delay-1"
              style={{ ...sectionHeading }}
            >
              {c.hero.titlePart1}
              <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>{c.hero.titleItalic}</em>
              <br />
              {c.hero.titlePart2}
            </h1>

            <p className="text-base lg:text-lg leading-relaxed max-w-2xl fade-in fade-in-delay-2" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
              {c.hero.description}
              <strong style={{ color: "var(--k1-text)", fontWeight: 600 }}>{c.hero.descriptionBold}</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 fade-in fade-in-delay-3">
              <a href="#problem" className="btn-primary px-8 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {c.hero.btnProblem}
              </a>
              <a href="#solution" className="btn-secondary px-8 py-3.5 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {c.hero.btnSolution}
              </a>
              <a
                href="https://www.instagram.com/myjourney.hq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-4 py-3.5 flex items-center justify-center transition-colors hover:text-[#E1306C]"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </section>


        {/* ── Trust Marquee (auskommentiert) ──────────────────── */}
        {/*
        <section className="py-6 px-6" style={{ borderTop: "1px solid var(--k1-border)", borderBottom: "1px solid var(--k1-border)", background: "var(--k1-bg-alt)" }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-center mb-4" style={eyebrow}>{c.trustMarquee}</p>
            <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <div className="marquee-track gap-2.5 py-1">
                {[...c.trustPartners, ...c.trustPartners].map((inst, i) => (
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
        */}


        {/* ══════════════════════════════════════════════════════════
            2. DAS PROBLEM — Deep Dive
            ══════════════════════════════════════════════════════════ */}
        <section id="problem" className="py-14 px-6 lg:px-12" ref={problemRef}>
          <div className="max-w-[1440px] mx-auto">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="reveal mb-3" style={eyebrow}>{c.problemSection.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-4" style={{ ...sectionHeading }}>
                {c.problemSection.titlePart1}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>{c.problemSection.titleItalic}</em>
              </h2>
              <p className="reveal reveal-delay-2 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                {c.problemSection.description}
              </p>
            </div>

            {/* Problem cards — 4 side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
              {c.problemSolutions.map((item, i) => (
                <div
                  key={item.num}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "var(--k1-bg-warm)",
                    borderRadius: "1.25rem",
                    padding: "1.25rem 1.25rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                    height: "100%",
                  }}
                >
                  {/* Stat */}
                  <div className="flex flex-col gap-1">
                    <span style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2.3rem", fontWeight: 700, lineHeight: 1, color: "var(--k1-accent)" }}>
                      {item.problem.stat}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--k1-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.3 }}>
                      {item.problem.statLabel}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div>
                    <h3 className="text-base font-bold mb-1.5" style={{ color: "var(--k1-text)", fontFamily: "var(--font-body)" }}>
                      {item.problem.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                      {item.problem.text}
                    </p>
                  </div>

                  {/* Concrete pain points */}
                  <div className="mt-auto" style={{ borderTop: "1px solid var(--k1-border)", paddingTop: "0.75rem" }}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>{c.problemSection.concretely}</p>
                    <ul className="flex flex-col gap-1.5">
                      {item.problem.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-xs" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.35 }}>
                          <span style={{ color: "#C05A4A", fontSize: "0.6rem", marginTop: "0.15rem", flexShrink: 0, fontWeight: 700 }}>✕</span>
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
        <section id="solution" className="py-14 px-6 lg:px-12" ref={solutionRef}>
          <div className="max-w-6xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="reveal mb-3" style={eyebrow}>{c.solutionSection.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-4" style={{ ...sectionHeading }}>
                {c.solutionSection.titlePart1}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>{c.solutionSection.titleItalic}</em>{" "}
                {c.solutionSection.titlePart2}
              </h2>
              <p className="reveal reveal-delay-2 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                {c.solutionSection.description}
              </p>
            </div>

            {/* Solution cards — 2 in einer Reihe (2x2 Grid) with identical proportions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {c.problemSolutions.map((item, i) => (
                <div
                  key={item.num}
                  className={`reveal reveal-delay-${(i % 4) + 1} flex flex-col h-full`}
                  style={{
                    background: "var(--k1-bg-alt)",
                    borderRadius: "1.25rem",
                    boxShadow: "var(--shadow-card)",
                    overflow: "hidden",
                    borderLeft: "4px solid var(--k1-accent)",
                  }}
                >
                  {/* Problem Recap (Beige Portion — Identical Height) */}
                  <div
                    className="p-5 flex flex-col gap-2 min-h-[9rem] justify-start"
                    style={{ background: "var(--k1-bg-warm)", borderBottom: "1px solid var(--k1-border)" }}
                  >
                    <div className="flex items-center justify-between gap-2 shrink-0">
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C05A4A", fontFamily: "var(--font-body)" }}>
                        {c.solutionSection.problemLabel} {item.num} · {item.problem.title}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#C05A4A" }}>
                        {item.problem.stat}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                      {item.problem.text}
                    </p>
                  </div>

                  {/* The Solution (White Portion — Identical Height & Structure) */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                          {c.solutionSection.solutionLabel} {item.num}
                        </span>
                        <span style={{ width: "1.5rem", height: "1px", background: "var(--k1-accent)", display: "inline-block" }} />
                        <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--k1-accent)", fontFamily: "var(--font-body)" }}>
                          {item.solution.tagline}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold" style={{ color: "var(--k1-text)", fontFamily: "var(--font-display)" }}>
                        {item.solution.title}
                      </h3>

                      <p className="text-xs leading-relaxed min-h-[4.2rem]" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                        {item.solution.text}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop: "1px solid var(--k1-border)" }}>
                      {item.solution.features.map((f) => (
                        <span
                          key={f}
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            padding: "0.25rem 0.75rem",
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
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            4. FOUNDERS
            ══════════════════════════════════════════════════════════ */}
        <section id="team" className="py-14 px-6 lg:px-12" ref={foundersRef}>
          <div className="max-w-5xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="reveal mb-3" style={eyebrow}>{c.teamSection.eyebrow}</p>
              <h2 className="reveal reveal-delay-1 text-3xl lg:text-5xl mb-4" style={{ ...sectionHeading }}>
                {c.teamSection.titlePart1}
                <em style={{ fontStyle: "italic", color: "var(--k1-accent)" }}>{c.teamSection.titleItalic}</em>{" "}
                {c.teamSection.titlePart2}
              </h2>
              <p className="reveal reveal-delay-2 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--k1-secondary)", fontFamily: "var(--font-body)" }}>
                {c.teamSection.description}
              </p>
            </div>

            {/* Founder cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {c.founders.map((founder, i) => (
                <div
                  key={founder.initials}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "var(--k1-bg-alt)",
                    borderRadius: "1.25rem",
                    padding: "1.75rem",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
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
          <p className="text-xs" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>{c.footer.copy}</p>
          <p className="text-xs text-center sm:text-right" style={{ color: "var(--k1-muted)", fontFamily: "var(--font-body)" }}>
            {c.footer.coop}
          </p>
        </div>
      </footer>
    </div>
  );
}
