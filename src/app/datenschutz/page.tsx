import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — MyJourney / Project MJ",
  description:
    "Datenschutzerklärung gemäß DSGVO für MyJourney / Project MJ. Informationen zur Datenverarbeitung, Cookies und Ihren Rechten.",
};

export default function DatenschutzPage() {
  const sectionTitle = {
    fontFamily: "var(--font-display)",
    fontWeight: 700 as const,
    color: "var(--k1-text)",
  };

  const bodyText = {
    color: "var(--k1-text)",
    fontFamily: "var(--font-body)",
  };

  const linkStyle = {
    color: "var(--k1-accent)",
    textDecoration: "underline" as const,
    textUnderlineOffset: "3px",
  };

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
            Datenschutz
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
          Datenschutzerklärung
        </h1>

        {/* ── Card container ─────────────────────────────────── */}
        <div
          className="k1-card"
          style={{ padding: "2rem 2rem 2.5rem", marginBottom: "2rem" }}
        >
          {/* ──────────────────────────────────────────────────── */}
          {/* 1. Datenschutz auf einen Blick                      */}
          {/* ──────────────────────────────────────────────────── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              1. Datenschutz auf einen Blick
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-3">
                <strong>Allgemeine Hinweise</strong>
              </p>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>
              <p className="mb-3">
                <strong>Datenerfassung auf dieser Website</strong>
              </p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
                „Hinweis zur verantwortlichen Stelle" in dieser
                Datenschutzerklärung sowie unserem{" "}
                <Link href="/impressum" style={linkStyle}>
                  Impressum
                </Link>{" "}
                entnehmen.
              </p>
            </div>
          </section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* ──────────────────────────────────────────────────── */}
          {/* 2. Verantwortliche Stelle                           */}
          {/* ──────────────────────────────────────────────────── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              2. Verantwortliche Stelle &amp; Kontaktdaten
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-3">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
              </p>
              <div
                className="mb-4 p-4"
                style={{
                  background: "var(--k1-bg)",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--k1-border)",
                }}
              >
                <p className="font-semibold mb-1">
                  MyJourney (Studentische Initiative)
                </p>
                <p className="mb-1">
                  Vertreten durch die Gesellschafter: Darshan Rajeswaran und
                  Dimitri Marcziter
                </p>
                <address className="not-italic" style={{ lineHeight: 1.8 }}>
                  c/o Gründungszentrum
                  <br />
                  Jülicher Str. 209q/s
                  <br />
                  52070 Aachen
                </address>
                <p className="mt-2">
                  E-Mail:{" "}
                  <a href="mailto:myjourney.office@gmail.com" style={linkStyle}>
                    myjourney.office@gmail.com
                  </a>
                </p>
              </div>
              <p>
                <strong>
                  Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde:
                </strong>{" "}
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
                Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu (z.{" "}B.
                der Landesbeauftragten für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen, LDI NRW).
              </p>
            </div>
          </section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* ──────────────────────────────────────────────────── */}
          {/* 3. Vercel-Hosting & Server-Logfiles                 */}
          {/* ──────────────────────────────────────────────────── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              3. Bereitstellung der Website (Vercel-Hosting &amp;
              Server-Logfiles)
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-3">
                <strong>Hosting durch Vercel</strong>
              </p>
              <p className="mb-4">
                Unsere Landingpage wird bei dem externen Dienstleister{" "}
                <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina,
                CA 91723, USA) gehostet. Wenn Sie unsere Website besuchen,
                erfasst Vercel technische Daten inklusive Ihrer IP-Adresse. Die
                Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an
                einer sicheren, schnellen und effizienten Bereitstellung unseres
                Online-Angebots gemäß{" "}
                <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>. Für die
                Datenübermittlung in die USA kommen die
                Standardvertragsklauseln der EU-Kommission zur Anwendung.
              </p>

              <p className="mb-3">
                <strong>Server-Logfiles</strong>
              </p>
              <p className="mb-2">
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in sogenannten Server-Logfiles, die Ihr Browser
                automatisch an uns übermittelt:
              </p>
              <ul
                className="mb-4"
                style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}
              >
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners / IP-Adresse</li>
                <li>Uhrzeit der Serveranfrage</li>
              </ul>
              <p className="mb-4">
                Diese Daten werden zur Gewährleistung der Stabilität,
                Funktionalität und IT-Sicherheit verarbeitet (
                <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>) und nach spätestens
                7 bis 14 Tagen automatisiert gelöscht oder anonymisiert.
              </p>

              <p className="mb-3">
                <strong>Lokale Schriftarten</strong>
              </p>
              <p>
                Zur einheitlichen Darstellung von Schriftarten nutzen wir lokal
                auf unseren Servern eingebundene Fonts (
                <code
                  style={{
                    background: "var(--k1-bg)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "var(--r-sm)",
                    fontSize: "0.8em",
                    border: "1px solid var(--k1-border)",
                  }}
                >
                  next/font/google
                </code>
                ). Es findet keine dynamische Verbindung zu externen Servern von
                Google statt, sodass keine IP-Adressen an Drittstaaten
                übermittelt werden.
              </p>
            </div>
          </section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* ──────────────────────────────────────────────────── */}
          {/* 4. Warteliste & E-Mail-Erfassung                    */}
          {/* ──────────────────────────────────────────────────── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              4. Warteliste &amp; E-Mail-Erfassung (Supabase &amp;
              Double-Opt-In)
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-4">
                Wenn Sie sich auf unserer Landingpage für die Warteliste
                eintragen, verarbeiten wir Ihre E-Mail-Adresse sowie den
                Anmeldezeitpunkt. Die Speicherung und Verwaltung der Daten
                erfolgt über den Datenbankdienst{" "}
                <strong>Supabase Inc.</strong> (800 El Camino Real, Suite 180,
                Mountain View, CA 94040, USA).
              </p>
              <ul
                className="mb-2"
                style={{
                  listStyleType: "none",
                  paddingLeft: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <li>
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt
                  ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung
                  gemäß <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>.
                </li>
                <li>
                  <strong>Double-Opt-In-Verfahren:</strong> Um Missbrauch zu
                  verhindern, nutzen wir das Double-Opt-In-Verfahren. Nach der
                  Anmeldung erhalten Sie eine E-Mail mit einem Aktivierungslink.
                  Erst nach Anklicken dieses Links ist Ihre Registrierung
                  abgeschlossen.
                </li>
                <li>
                  <strong>Widerruf:</strong> Sie können Ihre Einwilligung und den
                  Empfang von Benachrichtigungen jederzeit mit Wirkung für die
                  Zukunft per E-Mail an{" "}
                  <a
                    href="mailto:myjourney.office@gmail.com"
                    style={linkStyle}
                  >
                    myjourney.office@gmail.com
                  </a>{" "}
                  oder über den Abmeldelink in unseren E-Mails widerrufen.
                </li>
              </ul>
            </div>
          </section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* ──────────────────────────────────────────────────── */}
          {/* 5. Cookies & Endgerätezugriffe                      */}
          {/* ──────────────────────────────────────────────────── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              5. Cookies &amp; Endgerätezugriffe (§ 25 TDDDG)
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-4">
                Unsere Website verwendet ausschließlich technisch notwendige
                Funktionen (z.{" "}B. zur Session-Verwaltung und zur Speicherung
                Ihrer Systemeinstellungen via{" "}
                <code
                  style={{
                    background: "var(--k1-bg)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "var(--r-sm)",
                    fontSize: "0.8em",
                    border: "1px solid var(--k1-border)",
                  }}
                >
                  mj-cookie-consent
                </code>{" "}
                im LocalStorage). Der Zugriff auf Speicherfunktionen Ihres
                Endgeräts ist für die Bereitstellung des Dienstes unbedingt
                erforderlich und erfolgt nach{" "}
                <strong>§ 25 Abs. 2 Nr. 2 TDDDG</strong>. Ein
                Cookie-Consent-Banner ist hierfür nicht erforderlich.
              </p>
              <p>
                Analyse- oder Tracking-Cookies Dritter werden auf dieser
                Landingpage nicht eingesetzt. Sollten künftig
                einwilligungspflichtige Analyse-Tools eingebunden werden, holen
                wir hierfür vorab Ihre ausdrückliche Einwilligung gemäß{" "}
                <strong>
                  § 25 Abs. 1 TDDDG i.{" "}V.{" "}m. Art. 6 Abs. 1 lit. a DSGVO
                </strong>{" "}
                ein.
              </p>
            </div>
          </section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--k1-border)",
              margin: "0 0 2.5rem",
            }}
          />

          {/* ──────────────────────────────────────────────────── */}
          {/* 6. Ihre Rechte                                      */}
          {/* ──────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={sectionTitle}>
              6. Ihre Rechte als betroffene Person
            </h2>
            <div className="text-sm leading-relaxed" style={bodyText}>
              <p className="mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                jederzeit folgende Rechte bezüglich Ihrer personenbezogenen
                Daten:
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  {
                    title: "Auskunft (Art. 15 DSGVO)",
                    desc: "Recht auf Information über die bei uns gespeicherten Daten.",
                  },
                  {
                    title: "Berichtigung (Art. 16 DSGVO)",
                    desc: "Recht auf Korrektur unrichtiger Daten.",
                  },
                  {
                    title: "Löschung (Art. 17 DSGVO)",
                    desc: "Recht auf Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
                  },
                  {
                    title: "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                    desc: "Recht auf Aussetzung der Datenverarbeitung.",
                  },
                  {
                    title: "Datenübertragbarkeit (Art. 20 DSGVO)",
                    desc: "Recht auf Herausgabe der Daten in einem gängigen Format.",
                  },
                  {
                    title: "Widerspruch (Art. 21 DSGVO)",
                    desc: "Recht auf Widerspruch gegen Datenverarbeitungen, die auf Art. 6 Abs. 1 lit. f DSGVO gestützt werden.",
                  },
                ].map((right) => (
                  <div
                    key={right.title}
                    className="flex gap-3 p-3"
                    style={{
                      background: "var(--k1-bg)",
                      borderRadius: "var(--r-md)",
                      border: "1px solid var(--k1-border)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--k1-accent)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <p className="font-semibold mb-0.5">{right.title}</p>
                      <p style={{ color: "var(--k1-secondary)" }}>
                        {right.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
            <span
              className="text-xs"
              style={{ color: "var(--k1-border-dark)" }}
            >
              ·
            </span>
            <Link
              href="/datenschutz"
              className="text-xs font-medium"
              style={{
                color: "var(--k1-accent)",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
              }}
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
