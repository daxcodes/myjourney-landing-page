"use client";

import { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   Cookie Consent Types
   ══════════════════════════════════════════════════════════════ */

export interface CookiePreferences {
  necessary: boolean;    // Always true — cannot be disabled
  functional: boolean;   // Language preference, UI settings
  analytics: boolean;    // Future: Vercel Analytics, etc.
  marketing: boolean;    // Future: Social media embeds, etc.
}

const COOKIE_CONSENT_KEY = "mj-cookie-consent";
const COOKIE_CONSENT_VERSION = "1"; // Bump to re-show banner after policy changes

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

/* ══════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════ */

function getSavedPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return parsed.preferences as CookiePreferences;
  } catch {
    return null;
  }
}

function savePreferences(prefs: CookiePreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({ version: COOKIE_CONSENT_VERSION, preferences: prefs, timestamp: new Date().toISOString() })
  );
}

/* ══════════════════════════════════════════════════════════════
   Cookie Category Descriptions (DE)
   ══════════════════════════════════════════════════════════════ */

const categories = [
  {
    key: "necessary" as const,
    title: "Technisch notwendig",
    description:
      "Diese Cookies sind für den Betrieb der Website unerlässlich. Dazu gehören Session-Cookies, CSRF-Schutz und die Speicherung Ihrer Cookie-Einstellungen.",
    locked: true,
    examples: ["Cookie-Einstellungen (localStorage)", "Next.js Session-Cookie"],
  },
  {
    key: "functional" as const,
    title: "Funktional",
    description:
      "Funktionale Cookies ermöglichen erweiterte Funktionalitäten wie die Spracheinstellung und UI-Präferenzen. Ohne sie funktioniert die Seite, bietet aber ein eingeschränktes Erlebnis.",
    locked: false,
    examples: ["Sprachauswahl (DE/EN)", "UI-Präferenzen"],
  },
  {
    key: "analytics" as const,
    title: "Statistik & Analyse",
    description:
      "Analyse-Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren. Die Daten werden anonymisiert erhoben und dienen zur Verbesserung unseres Angebots.",
    locked: false,
    examples: ["Vercel Web Analytics (geplant)", "Performance-Monitoring"],
  },
  {
    key: "marketing" as const,
    title: "Marketing & Social Media",
    description:
      "Marketing-Cookies werden genutzt, um Werbung relevanter zu gestalten und Inhalte aus sozialen Netzwerken einzubinden. Aktuell verwenden wir keine Marketing-Cookies.",
    locked: false,
    examples: ["Derzeit nicht in Verwendung"],
  },
];

/* ══════════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════════ */

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if consent was already given
  useEffect(() => {
    const saved = getSavedPreferences();
    if (saved) {
      setPreferences(saved);
    } else {
      // Small delay before showing for better UX
      const timer = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setIsAnimating(true));
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    setPreferences(allAccepted);
    setIsAnimating(false);
    setTimeout(() => setVisible(false), 350);
  }, []);

  const handleRejectOptional = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
    setPreferences(onlyNecessary);
    setIsAnimating(false);
    setTimeout(() => setVisible(false), 350);
  }, []);

  const handleSaveCustom = useCallback(() => {
    savePreferences(preferences);
    setIsAnimating(false);
    setTimeout(() => setVisible(false), 350);
  }, [preferences]);

  const toggleCategory = useCallback((key: keyof CookiePreferences) => {
    if (key === "necessary") return; // can't toggle
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(43, 43, 43, 0.3)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 9998,
          opacity: isAnimating ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
        onClick={handleRejectOptional}
        aria-hidden="true"
      />

      {/* Cookie banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie-Einstellungen"
        id="cookie-consent-banner"
        style={{
          position: "fixed",
          bottom: showDetails ? "50%" : "1.5rem",
          left: "50%",
          transform: showDetails
            ? `translate(-50%, 50%) scale(${isAnimating ? 1 : 0.95})`
            : `translate(-50%, ${isAnimating ? "0" : "100%"}) scale(${isAnimating ? 1 : 0.95})`,
          zIndex: 9999,
          width: showDetails ? "min(640px, calc(100vw - 2rem))" : "min(520px, calc(100vw - 2rem))",
          maxHeight: showDetails ? "min(85vh, 700px)" : "auto",
          background: "var(--k1-bg-alt)",
          borderRadius: "var(--r-xl)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
          opacity: isAnimating ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1.75rem 0",
            flexShrink: 0,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "0.625rem",
                background: "var(--k1-accent-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0,
              }}
            >
              🍪
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--k1-text)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Wir respektieren deine Privatsphäre
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--k1-secondary)",
              lineHeight: 1.6,
              margin: "0 0 1.25rem",
            }}
          >
            Wir verwenden Cookies, um dir das bestmögliche Erlebnis auf unserer
            Website zu bieten. Einige sind technisch notwendig, andere helfen
            uns, die Website zu verbessern.{" "}
            <a
              href="/impressum"
              style={{
                color: "var(--k1-accent)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Mehr erfahren
            </a>
          </p>
        </div>

        {/* Detail categories (expandable) */}
        {showDetails && (
          <div
            style={{
              padding: "0 1.75rem",
              overflow: "auto",
              flex: 1,
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                paddingBottom: "0.5rem",
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  style={{
                    background: "var(--k1-bg)",
                    borderRadius: "var(--r-md)",
                    padding: "1rem 1.15rem",
                    border: "1px solid var(--k1-border)",
                  }}
                >
                  {/* Category header */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--k1-text)",
                      }}
                    >
                      {cat.title}
                      {cat.locked && (
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 500,
                            color: "var(--k1-muted)",
                            marginLeft: "0.5rem",
                          }}
                        >
                          (immer aktiv)
                        </span>
                      )}
                    </span>

                    {/* Toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences[cat.key]}
                      aria-label={`${cat.title} ${preferences[cat.key] ? "deaktivieren" : "aktivieren"}`}
                      disabled={cat.locked}
                      onClick={() => toggleCategory(cat.key)}
                      style={{
                        position: "relative",
                        width: "2.75rem",
                        height: "1.5rem",
                        borderRadius: "9999px",
                        background: preferences[cat.key]
                          ? "var(--k1-accent)"
                          : "var(--k1-border-dark)",
                        border: "none",
                        cursor: cat.locked ? "not-allowed" : "pointer",
                        transition: "background 0.2s ease",
                        opacity: cat.locked ? 0.6 : 1,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: preferences[cat.key] ? "calc(100% - 1.25rem - 2px)" : "2px",
                          width: "1.25rem",
                          height: "1.25rem",
                          borderRadius: "50%",
                          background: "#FFFFFF",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                          transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </button>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--k1-secondary)",
                      lineHeight: 1.55,
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Examples */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.examples.map((ex) => (
                      <span
                        key={ex}
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          padding: "0.2rem 0.6rem",
                          color: "var(--k1-secondary)",
                          fontFamily: "var(--font-body)",
                          background: "var(--k1-bg-alt)",
                          border: "1px solid var(--k1-border)",
                          borderRadius: "9999px",
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div
          style={{
            padding: "1.25rem 1.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            flexShrink: 0,
            borderTop: showDetails ? "1px solid var(--k1-border)" : "none",
          }}
        >
          {/* Primary row */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="btn-primary"
              style={{
                flex: 1,
                height: "2.75rem",
                fontSize: "0.82rem",
                borderRadius: "var(--r-md)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Alle akzeptieren
            </button>

            {showDetails ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="btn-secondary"
                style={{
                  flex: 1,
                  height: "2.75rem",
                  fontSize: "0.82rem",
                  borderRadius: "var(--r-md)",
                  cursor: "pointer",
                }}
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRejectOptional}
                className="btn-secondary"
                style={{
                  flex: 1,
                  height: "2.75rem",
                  fontSize: "0.82rem",
                  borderRadius: "var(--r-md)",
                  cursor: "pointer",
                }}
              >
                Nur notwendige
              </button>
            )}
          </div>

          {/* Toggle detail view */}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--k1-accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              padding: "0.25rem 0",
              alignSelf: "center",
            }}
          >
            {showDetails ? "← Weniger anzeigen" : "Cookie-Einstellungen anpassen →"}
          </button>
        </div>
      </div>
    </>
  );
}
