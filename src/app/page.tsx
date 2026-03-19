"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const scrollFeatures = [
  {
    id: "lernplan-engine",
    badge: "LERNPLAN ENGINE",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Dein Skript rein. Dein optimaler Lernplan raus. In 30 Sekunden.",
    description:
      "Lade dein Skript hoch, gib deine Zielnote und dein Prüfungsdatum ein \u2014 MyJourney erstellt einen tagesgenauen Plan, der nur das enthält, was wirklich zählt. Kein Anki mehr. Kein Notion mehr. Alles in einem System.",
    image: "/image.png",
  },
  {
    id: "fokus-engine",
    badge: "FOKUS ENGINE",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Der Timer, der weiß, wann du am besten arbeitest.",
    description:
      "Flipclock oder Lofi-Video — du wählst deinen Flow-Zustand. Die KI weiß aus deinen Daten, wann deine Peak-Fenster sind und schlägt automatisch die optimale Session-Länge vor. Kein Forest mehr. Kein separater Pomodoro-Timer mehr.",
    image: "/image.png",
  },
  {
    id: "ki-agent",
    badge: "DEIN PERSÖNLICHER AGENT",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Die einzige KI, die dich wirklich kennt.",
    description:
      "Nicht ChatGPT. Nicht ein generischer Assistent. MyJourney KI kennt deinen Lernstand, deine Energie, deine Prüfungen und deine Gewohnheiten — und handelt daraus. Jeden Morgen ein Plan. Jeden Abend ein Feedback. Kein Raten mehr.",
    image: "/screen.png",
  },
  {
    id: "routine-architect",
    badge: "ROUTINE ARCHITECT",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Welche Gewohnheiten bringen dich wirklich weiter?",
    description:
      "Nicht tracken um des Trackens willen. MyJourney verbindet deine Habits mit deinen Fokus-Sessions und zeigt dir: 7h Schlaf bedeutet 40% bessere Lernleistung. Diese Erkenntnis verändert Verhalten — dauerhaft.",
    image: "/image copy 2.png",
  },
  {
    id: "mental-offloading",
    badge: "MENTAL OFFLOADING",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "60 Sekunden. Kopf frei. KI wird besser.",
    description:
      "Drei Felder, zwei Klicks. Dein Journal ist nicht nur für dich — es ist der Input, der deine KI präziser macht. Stimmung, Energie, Gedanken. Kein Daylio mehr. Kein separates Journal mehr.",
    image: "/journal.png",
  },
  {
    id: "performance-audit",
    badge: "PERFORMANCE AUDIT",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Sieh zum ersten Mal, wie du wirklich lernst.",
    description:
      "Wann bist du produktiv? Wann brichst du ab? Was sabotiert deine Sessions? MyJourney aggregiert alle Daten zu einem ehrlichen Performance-Bild — das kein einzelnes Tool je liefern könnte.",
    image: "/scroll-4.png",
  },
  {
    id: "central-command",
    badge: "CENTRAL COMMAND",
    badgeColor: "#a7d7c5",
    badgeTextColor: "#1a1a1a",
    title: "Ein Tab. Alles drin. Kein Chaos mehr.",
    description:
      "Lernplan, Timer, Journal, Habits, KI-Agent — alles in einem Interface. Nicht weil es praktisch ist. Sondern weil die Daten nur dann zusammenarbeiten können, wenn sie am selben Ort leben.",
    image: "/scroll-4.png",
  },
];

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Track which text section is active
  useEffect(() => {
    // Reset refs array length to match current features
    sectionRefs.current = sectionRefs.current.slice(0, scrollFeatures.length);

    const setupObservers = () => {
      const observers: IntersectionObserver[] = [];

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveFeature(index);
              }
            });
          },
          {
            threshold: 0.4,
            rootMargin: "-10% 0px -40% 0px",
          }
        );

        observer.observe(ref);
        observers.push(observer);
      });

      return observers;
    };

    // Use rAF to ensure DOM is ready after render
    const rafId = requestAnimationFrame(() => {
      const observers = setupObservers();
      cleanupRef.current = () => observers.forEach((o) => o.disconnect());
    });

    const cleanupRef = { current: () => { } };
    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current();
    };
  }, [scrollFeatures.length]);

  // Manage fixed/absolute positioning based on scroll — direct DOM manipulation for performance
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const imageWrap = imageWrapRef.current;
      const rightCol = rightColRef.current;
      if (!container || !imageWrap || !rightCol) return;

      const containerRect = container.getBoundingClientRect();
      const rightColRect = rightCol.getBoundingClientRect();
      const imageHeight = imageWrap.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Dynamic offset: center image vertically in viewport
      const offsetTop = Math.max(120, (viewportHeight * 0.5) - (imageHeight / 2));

      // Use first and last text sections as boundaries
      const firstSection = sectionRefs.current[0];
      const lastSection = sectionRefs.current[sectionRefs.current.length - 1];
      if (!firstSection || !lastSection) return;

      const firstRect = firstSection.getBoundingClientRect();
      const lastRect = lastSection.getBoundingClientRect();

      // We want the image fixed at `offsetTop` relative to the viewport.
      // Since it's absolutely positioned inside `rightCol`, its needed distance
      // from the top of `rightCol` is `offsetTop - rightColRect.top`.
      const targetY = offsetTop - rightColRect.top;

      // Calculate the start and end boundaries (relative to `rightCol` top)
      // We align the image center with the secton content center.
      const firstSectionCenterY = (firstRect.top - rightColRect.top) + (firstRect.height / 2) - (imageHeight / 2);
      const lastSectionCenterY = (lastRect.top - rightColRect.top) + (lastRect.height / 2) - (imageHeight / 2);

      // Clamp the `translateY` so it stays within the text sections
      const clampedY = Math.round(Math.max(firstSectionCenterY, Math.min(lastSectionCenterY, targetY)) || 0);

      // Use transform translateY instead of switching between fixed and absolute.
      // This is immune to zoom layout shifts because it stays in standard document flow.
      imageWrap.style.position = 'absolute';
      imageWrap.style.top = '0px';
      imageWrap.style.bottom = 'auto';
      imageWrap.style.left = '0px';
      imageWrap.style.width = '100%';
      imageWrap.style.willChange = 'transform';
      imageWrap.style.transform = `translateY(${clampedY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display" style={{ overflowX: 'clip' }}>
      <header className="sticky top-0 z-50  border-b border-primary/20 px-6 lg:px-20 py-4 flex items-center justify-between" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary flex items-center justify-center rounded-lg text-slate-900">
            <span className="material-symbols-outlined text-2xl">adjust</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">MyJourney</h2>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#how-it-works">Wie es funktioniert</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#features">Features</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#replaced-apps">Ersetzte Apps</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#early-access">Early Access</a>
        </nav>

        <div className="flex gap-3">
          <button className="flex h-10 px-5 items-center justify-center rounded-xl bg-primary text-slate-900 text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            Früher Zugang sichern
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full w-fit">
              <span className="text-xs font-bold uppercase tracking-wider">In Entwicklung · Jetzt Early Access sichern</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Dein Potenzial wartet nicht. Dein System sollte es auch nicht.
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              MyJourney vereint Lernplan, Fokus, Gewohnheiten und Mental Health an einem Ort — und verbindet sie durch eine KI, die mit jedem Tag mehr über dich lernt. Das Ergebnis ist ein System, das zeigt, was wirklich in dir steckt.
            </p>

            {!isSubmitted ? (
              <div>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                    <input required className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary focus:ring-0 transition-all outline-none" placeholder="Deine E-Mail Adresse" type="email" />
                  </div>
                  <button type="submit" className="h-14 px-8 rounded-xl bg-primary text-slate-900 font-black text-lg shadow-xl shadow-primary/30 hover:brightness-105 active:scale-95 transition-all">
                    Meinen Platz sichern →
                  </button>
                </form>
                <p className="text-xs text-slate-500 font-medium mt-3">Keine Kreditkarte. Kein Spam. Nur ein E-Mail wenn es losgeht.</p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                  Du bist dabei.
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Wir melden uns, wenn MyJourney startet. Du bist einer der Ersten.
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl bg-slate-100">
              <Image alt="Workspace Dashboard" className="w-full h-full object-cover opacity-90" src="/Workspace_Dashboard.png" fill priority />
            </div>
          </div>
        </section>

        {/* ─── App-Graveyard Section (TO-DO 3) ─── */}
        <section id="replaced-apps" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
          <div className="max-w-5xl mx-auto px-6 lg:px-20 py-24">
            <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-center mb-4">Das kennst du.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center max-w-3xl mx-auto mb-16">
              Der durchschnittliche Student jongliert täglich mit 6+ Apps. Keine davon weiß, was die anderen tun. Du bist der einzige Knotenpunkt — und das kostet dich mehr Energie als das Lernen selbst.
            </p>
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Weg damit</h4>
                <ul className="flex flex-col gap-4">
                  {["Anki", "Notion", "Forest / Pomodoro", "Daylio / Journal-Apps", "Habitify / Streaks", "Google Calendar", "ChatGPT"].map((app) => (
                    <li key={app} className="text-slate-500 line-through text-lg font-medium">{app}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-6">Ersetzt durch</h4>
                <ul className="flex flex-col gap-4">
                  {["MyJourney Lernkarten", "MyJourney Workspace", "MyJourney Focus Engine", "MyJourney Journal", "MyJourney Habit Tracker", "MyJourney Lernplan", "MyJourney KI-Agent"].map((app) => (
                    <li key={app} className="text-slate-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16 max-w-2xl mx-auto text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Was wäre, wenn all diese Daten zusammenarbeiten würden? Wenn deine KI weiß, dass du gestern schlecht geschlafen hast, heute eine schwierige Session hattest und morgen die wichtigste Prüfung des Semesters kommt?
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white">Das ist MyJourney.</p>
            </div>
          </div>
        </section>

        {/* ─── KI-Logik Section (TO-DO 4) ─── */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
          <h2 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-center mb-16">
            Warum eine KI, die alles weiß, alles verändert.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Andere Tools</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Kennen nur, was du ihnen sagst. Kein Kontext über dein Studium, deine Energie, deine Gewohnheiten. Generische Antworten für einen nicht-generischen Menschen.
              </p>
            </div>
            <div className="bg-primary/10 rounded-3xl p-8 border-2 border-primary/30 relative">
              <div className="absolute -top-3 left-6 bg-primary text-slate-900 text-xs font-bold px-3 py-1 rounded-full">MyJourney</div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mt-2 mb-4">MyJourney KI</h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Verbindet Lernfortschritt, Fokus-Sessions, Schlafqualität, Stimmung und Prüfungsdaten zu einem vollständigen Bild von dir. Je mehr du nutzt, desto präziser wird sie.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Das Ergebnis</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Eine KI, die sagt: <em>&quot;Du lernst donnerstags zwischen 14 und 17 Uhr am effektivsten. Und wenn du unter 7h schläfst, sinkt dein Fokus messbar. Morgen würde ich Block 3 auf 14:00 legen.&quot;</em>
              </p>
            </div>
          </div>
        </section>

        {/* ─── Scroll Animation Feature Section (aicofounder.com style) ─── */}
        <section id="features" className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-20 pb-8">
            <div className="max-w-2xl">
              <p className="text-2xl lg:text-3xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                Alles, was du brauchst. In einem System.{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  Jedes Feature ist verbunden — weil isolierte Tools isolierte Ergebnisse liefern.
                </span>
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <div ref={containerRef} className="relative lg:flex lg:gap-16">
              {/* Left: Scrollable text sections */}
              <div className="flex flex-col lg:w-1/2">
                {scrollFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className="min-h-[60vh] flex flex-col justify-center py-12 lg:py-16"
                    style={{
                      opacity: activeFeature === index ? 1 : 0.3,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <span
                      className="inline-flex w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                      style={{
                        backgroundColor: feature.badgeColor,
                        color: feature.badgeTextColor,
                      }}
                    >
                      {feature.badge}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: JS-managed sticky image container */}
              <div ref={rightColRef} className="hidden lg:block lg:w-1/2" style={{ position: 'relative' }}>
                <div
                  ref={imageWrapRef}
                  style={{ position: 'absolute', top: '0px', width: '100%' }}
                >
                  <div
                    className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-300/50 dark:shadow-none bg-white dark:bg-slate-800"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {scrollFeatures.map((feature, index) => (
                      <div
                        key={feature.id}
                        className="absolute inset-0"
                        style={{
                          opacity: activeFeature === index ? 1 : 0,
                          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                          zIndex: activeFeature === index ? 2 : 1,
                        }}
                      >
                        <Image
                          alt={feature.title}
                          src={feature.image}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                    {/* Subtle dot pattern overlay like aicofounder */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile: Show active image inline */}
              <div className="lg:hidden mb-12">
                <div
                  className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800"
                  style={{ aspectRatio: "4/3" }}
                >
                  {scrollFeatures.map((feature, index) => (
                    <div
                      key={feature.id}
                      className="absolute inset-0"
                      style={{
                        opacity: activeFeature === index ? 1 : 0,
                        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: activeFeature === index ? 2 : 1,
                      }}
                    >
                      <Image
                        alt={feature.title}
                        src={feature.image}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ─── Why Section (TO-DO 6) ─── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Gebaut für Studenten, die mehr wollen.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">layers</span>
              </div>
              <h4 className="text-lg font-bold mb-3">Ein System statt sieben Apps</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Anki, Notion, Forest, Daylio, Habitify, Kalender — MyJourney ersetzt sie alle. Weil Daten nur dann intelligent werden, wenn sie zusammenarbeiten.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
              </div>
              <h4 className="text-lg font-bold mb-3">Eine KI, die dich wirklich kennt</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Nicht generisch. Nicht zufällig. Je mehr du nutzt, desto präziser wird die KI — bis sie dir Dinge über dich sagt, die du selbst noch nicht wusstest.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
              </div>
              <h4 className="text-lg font-bold mb-3">Dein bestes Semester — systematisch</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Nicht durch mehr Willenskraft. Durch ein System, das weiß wann du am besten arbeitest, was dich bremst und was heute wirklich dran ist.</p>
            </div>
          </div>
        </section>

        {/* ─── Uni Social Proof Bar ─── */}
        <section className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
          <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Gebaut mit Feedback von Studenten an</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
              RWTH Aachen · LMU München · TU Berlin · KIT · Uni Hamburg · Uni Köln
            </p>
          </div>
        </section>

        {/* ─── Pricing Section (TO-DO 8) ─── */}
        <section id="early-access" className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4">
              Forme das System mit.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              MyJourney ist in der Entwicklung. Wer jetzt dabei ist, bekommt nicht nur frühen Zugang — er entscheidet mit, was gebaut wird.
            </p>
          </div>
          <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full mb-8">
              <span className="text-sm font-bold">✦ FOUNDING MEMBER</span>
            </div>
            <ul className="flex flex-col gap-4 mb-10">
              {["Erster Zugang zum fertigen Produkt", "Founding-Member Preis — eingefroren für immer", "Direkter Einfluss auf Features", "Zugang zur privaten Beta"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full h-14 rounded-xl bg-primary text-slate-900 font-black text-lg shadow-xl shadow-primary/30 hover:brightness-105 active:scale-95 transition-all">
              Meinen Platz sichern →
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Die ersten 500 Founding Members erhalten den Preis eingefroren — für immer.
            </p>
          </div>
        </section>


      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 bg-primary flex items-center justify-center rounded-lg text-slate-900">
                <span className="material-symbols-outlined text-lg">adjust</span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">MyJourney</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              MyJourney — Your Student OS
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Product</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Lernplan Engine</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Fokus Engine</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">KI-Agent</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Company</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><span className="cursor-pointer hover:text-primary transition-colors">About Us</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Careers</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Blog</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 uppercase text-xs tracking-wider text-slate-400">Legal</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Impressum</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Datenschutz</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Kontakt</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
          <p>© 2026 MyJourney. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined hover:text-primary cursor-pointer transition-colors text-lg">language</span>
            <span className="material-symbols-outlined hover:text-primary cursor-pointer transition-colors text-lg">alternate_email</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
