import { forwardRef } from "react";
import logo from "@/assets/academy-logo.jpeg";
import signature from "@/assets/owner-signature.jpeg";
import { translations, type LangCode, LANGS } from "@/lib/translations";

export type CertificateData = {
  studentName: string;
  courseName: string;
  date: string;
  certId: string;
  photo?: string | null;
  lang: LangCode;
  theme: "dark" | "light";
  accent: string;
};

export const Certificate = forwardRef<HTMLDivElement, CertificateData>(
  ({ studentName, courseName, date, certId, photo, lang, theme, accent }, ref) => {
    const t = translations[lang];
    const isRTL = LANGS.find((l) => l.code === lang)?.rtl;
    const isDark = theme === "dark";

    const bg = isDark
      ? `radial-gradient(circle at 20% 10%, ${accent}25, transparent 55%), radial-gradient(circle at 80% 90%, ${accent}20, transparent 55%), linear-gradient(135deg, #0a0f1e 0%, #0d1429 50%, #050912 100%)`
      : `radial-gradient(circle at 20% 10%, ${accent}18, transparent 55%), radial-gradient(circle at 80% 90%, ${accent}15, transparent 55%), linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eef2f7 100%)`;

    const fg = isDark ? "#f1f5f9" : "#0f172a";
    const muted = isDark ? "#94a3b8" : "#475569";
    const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)";
    const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)";

    return (
      <div
        ref={ref}
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          width: 1400,
          height: 990,
          background: bg,
          color: fg,
          fontFamily: "'Inter', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: 60,
          boxSizing: "border-box",
        }}
      >
        {/* Decorative corner ornaments */}
        <svg style={{ position: "absolute", top: 30, left: 30 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 60 Q10 10 60 10" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M20 60 Q20 20 60 20" stroke={accent} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="10" cy="60" r="3" fill={accent} />
          <circle cx="60" cy="10" r="3" fill={accent} />
        </svg>
        <svg style={{ position: "absolute", top: 30, right: 30 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M110 60 Q110 10 60 10" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M100 60 Q100 20 60 20" stroke={accent} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="110" cy="60" r="3" fill={accent} />
          <circle cx="60" cy="10" r="3" fill={accent} />
        </svg>
        <svg style={{ position: "absolute", bottom: 30, left: 30 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 60 Q10 110 60 110" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
          <circle cx="10" cy="60" r="3" fill={accent} />
          <circle cx="60" cy="110" r="3" fill={accent} />
        </svg>
        <svg style={{ position: "absolute", bottom: 30, right: 30 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M110 60 Q110 110 60 110" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
          <circle cx="110" cy="60" r="3" fill={accent} />
          <circle cx="60" cy="110" r="3" fill={accent} />
        </svg>

        {/* Inner border frame */}
        <div
          style={{
            position: "absolute",
            inset: 50,
            border: `1px solid ${border}`,
            borderRadius: 24,
            background: cardBg,
            backdropFilter: "blur(10px)",
          }}
        />

        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", padding: "30px 60px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <img src={logo} alt="Dream Team Academy" style={{ width: 96, height: 96, borderRadius: 16, objectFit: "cover", boxShadow: `0 8px 30px ${accent}40` }} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 1, color: fg }}>{t.academyName}</div>
                <div style={{ fontSize: 13, letterSpacing: 4, color: accent, textTransform: "uppercase", marginTop: 4 }}>{t.tagline}</div>
              </div>
            </div>
            <div style={{ textAlign: isRTL ? "left" : "right", fontSize: 12, color: muted, letterSpacing: 2, textTransform: "uppercase" }}>
              <div>{t.certificateId}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: fg, marginTop: 4, letterSpacing: 1 }}>{certId}</div>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: 8, lineHeight: 1, background: `linear-gradient(135deg, ${fg}, ${accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textTransform: "uppercase" }}>
              {t.certificate}
            </div>
            <div style={{ fontSize: 22, letterSpacing: 12, color: muted, marginTop: 8, textTransform: "uppercase", fontWeight: 300 }}>
              {t.ofCompletion}
            </div>
            <div style={{ width: 120, height: 3, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, margin: "20px auto 0" }} />
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
            <div style={{ fontSize: 18, color: muted, fontWeight: 300 }}>{t.presentedTo}</div>

            {photo && (
              <img src={photo} alt={studentName} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: `3px solid ${accent}`, boxShadow: `0 6px 24px ${accent}50` }} />
            )}

            <div style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: fg, padding: "0 40px" }}>
              {studentName || "—"}
            </div>
            <div style={{ width: 360, height: 1, background: border }} />
            <div style={{ fontSize: 18, color: muted, fontWeight: 300, maxWidth: 700 }}>{t.forCompleting}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: accent, padding: "0 40px" }}>{courseName || "—"}</div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20, gap: 40 }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 12, color: muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{t.awardedOn}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: fg }}>{date}</div>
              <div style={{ width: 180, height: 1, background: border, margin: "10px auto 0" }} />
            </div>

            {/* Seal */}
            <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${accent}40, ${accent}10)`, border: `2px solid ${accent}80` }} />
              <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: `1px dashed ${accent}` }} />
              <div style={{ textAlign: "center", color: fg, fontSize: 9, fontWeight: 700, letterSpacing: 1, padding: 8, textTransform: "uppercase", lineHeight: 1.3 }}>
                <div style={{ fontSize: 11, color: accent, marginBottom: 2 }}>★</div>
                Dream Team<br />Academy<br />
                <div style={{ fontSize: 7, color: muted, marginTop: 2 }}>Official Seal</div>
              </div>
            </div>

            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ height: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <img
                  src={signature}
                  alt="signature"
                  style={{
                    height: 80,
                    objectFit: "contain",
                    mixBlendMode: isDark ? "screen" : "multiply",
                  }}
                />

              </div>
              <div style={{ width: 180, height: 1, background: border, margin: "0 auto" }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: fg, marginTop: 8 }}>Meerab Imran</div>
              <div style={{ fontSize: 11, color: muted, letterSpacing: 1, textTransform: "uppercase" }}>{t.founder}</div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: muted, letterSpacing: 3, textTransform: "uppercase" }}>
            {t.verifiedBy}
          </div>
        </div>
      </div>
    );
  }
);
Certificate.displayName = "Certificate";
