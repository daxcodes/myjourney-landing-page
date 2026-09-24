"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-xs font-medium"
      style={{
        color: "var(--k1-accent)",
        fontFamily: "var(--font-body)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--k1-accent-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--k1-accent)")
      }
    >
      Cookie-Einstellungen
    </button>
  );
}
