import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — MyJourney / Project MJ",
  description:
    "Impressum und rechtliche Angaben gemäß § 5 DDG für MyJourney / Project MJ.",
};

export default function ImpressumPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--k1-bg)" }}
    >
      {/* ── Header / Back nav ──────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(236,234,229,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--k1-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            style={{ textDecoration: "none" }}
          >
            <div
              className="flex items-center justify-center w-9 h-9 font-bold text-sm"
              style={{
                background: "var(--k1-accent)",
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                borderRadius: "0.5rem",
              }}
            >
              MJ
            </div>
            <span
              className="font-semibold text-base tracking-tight"
              style={{
                color: "var(--k1-text)",
                fontFamily: "var(--font-body)",
              }}
            >
              Project MJ
            </span>
          </Link>
          <span
            className="text-xs font-medium px-2.5 py-1"
            style={{
              color: "var(--k1-secondary)",
              border: "1px solid var(--k1-border)",
              borderRadius: "9999px",
              fontFamily: "var(--font-body)",
              background: "var(--k1-bg-alt)",
            }}
          >
            Impressum
          </span>
        </div>
      </header>

      {/* ── Content ────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 group"
          style={{
            color: "var(--k1-accent)",
            fontFamily: "var(--font-body)",
            textDecoration: "none",
          }}
        >
          <span
            className="inline-block transition-transform group-hover:-translate-x-1"
            style={{ fontSize: "1.1em" }}
          >
            ←
          </span>
          Zurück zur Startseite
        </Link>

        {/* Page title */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-12"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--k1-text)",
            lineHeight: 1.15,
          }}
        >
          Impressum
        </h1>

        {/* ── Card container ─────────────────────────────────── */}
        <div
          className="k1-card"
          style={{ padding: "2rem 2rem 2.5rem", marginBottom: "2rem" }}
        >
          {/* § 5 DDG */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--k1-text)",
              }}
            >
              Angaben gemäß § 5 DDG
            </h2>

            <div
              className="text-sm leading-relaxed"
              style={{
                color: "var(--k1-text)",
                fontFamily: "var(--font-body)",
              }}
            >
              <p className="mb-3">
                <strong>Anbieter:</strong> MyJourney (Studentische Initiative)
              </p>
              <p className="mb-1">
                <strong>Vertreten durch die Gesellschafter:</strong>
              </p>
              <ul
                className="mb-4"
                style={{
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                }}
              >
                <li>Darshan Rajeswaran (Projektverantwortlicher)</li>
                <li>Dimitri Marcziter</li>
              </ul>

              <p className="mb-1">
                <strong>Postanschrift:</strong>
              </p>
              <address
                className="not-italic mb-4"
                style={{ lineHeight: 1.8 }}
              >
                MyJourney
                <br />
                Jülicher Str. 209q/s
                <br />
                52070 Aachen
              </address>

              <p className="mb-1">
                <strong>Kontakt:</strong>
              </p>
              <p className="mb-1">
                E-Mail:{" "}
                <a
                  href="mailto:myjourney.office@gmail.com"
                  style={{
                    color: "var(--k1-accent)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  myjourney.office@gmail.com
                </a>
              </p>
              <p>
                Telefon: Kontaktaufnahme bevorzugt per E-Mail oder über unser{" "}
                <Link
                  href="/#kontakt"
                  style={{
                    color: "var(--k1-accent)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Kontaktformular
                </Link>
              </p>
            </div>
          </section>

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* § 18 MStV */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--k1-text)",
              }}
            >
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>

            <div
              className="text-sm leading-relaxed"
              style={{
                color: "var(--k1-text)",
                fontFamily: "var(--font-body)",
              }}
            >
              <address className="not-italic" style={{ lineHeight: 1.8 }}>
                Darshan Rajeswaran
                <br />
                c/o MyJourney
                <br />
                Jülicher Str. 209q/s
                <br />
                52070 Aachen
              </address>
            </div>
          </section>

          {/* Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* EU-Streitschlichtung */}
          <section>
            <h2
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--k1-text)",
              }}
            >
              EU-Streitschlichtung &amp; Verbraucherstreitbeilegung
            </h2>

            <div
              className="text-sm leading-relaxed"
              style={{
                color: "var(--k1-text)",
                fontFamily: "var(--font-body)",
              }}
            >
              <p className="mb-3">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--k1-accent)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    wordBreak: "break-all",
                  }}
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind weder bereit noch verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>
        </div>

        {/* Last updated note */}
        <p
          className="text-xs mt-6"
          style={{
            color: "var(--k1-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Stand: September 2026
        </p>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="py-8 px-6 lg:px-12"
        style={{
          borderTop: "1px solid var(--k1-border)",
          background: "var(--k1-bg-alt)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{
              color: "var(--k1-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            © 2026 MyJourney / Project MJ. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/impressum"
              className="text-xs font-medium"
              style={{
                color: "var(--k1-accent)",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              }}
            >
              Impressum
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
