import { forwardRef } from "react";
import logo from "@/assets/academy-logo-mark.png";
import signature from "@/assets/owner-signature-clean.png";
import { translations, type LangCode, LANGS } from "@/lib/translations";

export type CertificateKind = "completion" | "achievement";

export type CertificateData = {
  studentName: string;
  courseName: string;
  date: string;
  certId: string;
  lang: LangCode;
  theme: "dark" | "light";
  accent: string;
  kind?: CertificateKind;
  position?: string;
  eventName?: string;
};

export const Certificate = forwardRef<HTMLDivElement, CertificateData>(
  ({ studentName, courseName, date, certId, lang, theme, accent, kind = "completion", position = "1st", eventName = "" }, ref) => {
    const isAchievement = kind === "achievement";
    const t = translations[lang];
    const isRTL = LANGS.find((l) => l.code === lang)?.rtl;
    const isDark = theme === "dark";

    // Palette (light = LC-HUB inspired: navy + teal accents on white)
    const navy = "#0f2c4a";
    const teal = accent;
    const gold = "#c9a24a";
    const bg = isDark ? "#0b1120" : "#ffffff";
    const fg = isDark ? "#f1f5f9" : "#0f172a";
    const muted = isDark ? "#94a3b8" : "#4b5563";
    const softLine = isDark ? "rgba(255,255,255,0.14)" : "rgba(15,44,74,0.18)";

    // Circuit-board SVG pattern (subtle tech feel)
    const circuit = (color: string, opacity = 0.35) => (
      <svg width="360" height="360" viewBox="0 0 360 360" fill="none" style={{ opacity }}>
        <g stroke={color} strokeWidth="1.2" fill="none">
          <path d="M10 40 H120 L140 60 H220 L240 40 H340" />
          <path d="M10 90 H80 L100 110 H180" />
          <path d="M10 150 H60 L80 130 H160 L180 150 H260 L280 170 H350" />
          <path d="M10 210 H140 L160 230 H240" />
          <path d="M10 270 H100 L120 250 H220 L240 270 H340" />
          <path d="M10 320 H90 L110 340 H210" />
          <path d="M60 10 V70 L80 90 V150" />
          <path d="M180 10 V50 L200 70 V130" />
          <path d="M280 10 V80 L260 100 V180" />
          <path d="M320 40 V200 L300 220 V330" />
        </g>
        <g fill={color}>
          {[[120,40],[140,60],[220,60],[240,40],[80,90],[100,110],[60,150],[80,130],[180,150],[280,170],[140,210],[160,230],[120,270],[220,270],[240,270],[110,340],[80,90],[200,70],[260,100],[300,220]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.4" />
          ))}
        </g>
      </svg>
    );

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
          boxSizing: "border-box",
        }}
      >
        {/* Corner circuit decorations */}
        <div style={{ position: "absolute", top: -20, left: -20 }}>{circuit(teal, isDark ? 0.35 : 0.55)}</div>
        <div style={{ position: "absolute", bottom: -20, right: -20, transform: "rotate(180deg)" }}>
          {circuit(teal, isDark ? 0.35 : 0.55)}
        </div>

        {/* Navy diagonal bottom-left wedge */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1400 990" preserveAspectRatio="none">
          <polygon points="0,780 380,990 0,990" fill={navy} opacity="0.95" />
          <polygon points="0,720 340,990 260,990 0,820" fill={teal} opacity="0.85" />
          {/* top-right teal wedge */}
          <polygon points="1400,0 1400,260 1120,0" fill={teal} opacity="0.9" />
          <polygon points="1400,0 1400,180 1240,0" fill={navy} opacity="0.9" />
        </svg>

        {/* Inner double frame */}
        <div style={{ position: "absolute", inset: 60, border: `2px solid ${teal}`, borderRadius: 6 }} />
        <div style={{ position: "absolute", inset: 72, border: `1px solid ${softLine}`, borderRadius: 4 }} />

        {/* Faint watermark logo behind content */}
        <img
          src={logo}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            height: 520,
            objectFit: "contain",
            opacity: isDark ? 0.05 : 0.06,
            filter: "grayscale(1)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", height: "100%", padding: "110px 130px 100px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          {/* Header row: logo + title stack */}
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 180px", alignItems: "center", gap: 24 }}>
            <img
              src={logo}
              alt="Dream Team Academy logo"
              style={{ width: 180, height: 150, objectFit: "contain", justifySelf: "start" }}
            />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 8, color: navy }}>DREAM TEAM ACADEMY</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 92,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: 4,
                  color: fg,
                  marginTop: 6,
                }}
              >
                {t.certificate.toUpperCase()}
              </div>
              <div style={{ fontSize: 22, letterSpacing: 14, color: muted, marginTop: 8, fontWeight: 400 }}>
                {t.ofCompletion.toUpperCase()}
              </div>
              <div style={{ fontSize: 14, letterSpacing: 4, color: gold, marginTop: 14, fontWeight: 700 }}>
                THIS CERTIFICATE IS PROUDLY PRESENTED TO
              </div>
            </div>
            {/* Gold medal seal */}
            <div style={{ justifySelf: "end", width: 150, height: 170, position: "relative" }}>
              <svg width="150" height="170" viewBox="0 0 150 170">
                <defs>
                  <radialGradient id="goldGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#fff2b8" />
                    <stop offset="45%" stopColor="#e6c15a" />
                    <stop offset="100%" stopColor="#8a6a1e" />
                  </radialGradient>
                </defs>
                {/* ribbons */}
                <polygon points="45,90 20,170 55,150 60,165 75,110" fill="#1e4d8a" />
                <polygon points="105,90 130,170 95,150 90,165 75,110" fill="#0f2c4a" />
                {/* medal with scalloped edge */}
                <g transform="translate(75 75)">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i * Math.PI * 2) / 16;
                    const x = Math.cos(a) * 60;
                    const y = Math.sin(a) * 60;
                    return <circle key={i} cx={x} cy={y} r="10" fill="url(#goldGrad)" />;
                  })}
                  <circle r="55" fill="url(#goldGrad)" />
                  <circle r="42" fill="none" stroke="#7a5a10" strokeWidth="1.5" />
                  <circle r="30" fill="#c9a24a" />
                  <text textAnchor="middle" y="6" fontSize="14" fontWeight="800" fill="#3a2a08" letterSpacing="1">DTA</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Student name */}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', cursive",
                fontSize: 96,
                lineHeight: 1,
                color: teal,
                fontWeight: 400,
              }}
            >
              {studentName || "Your Name"}
            </div>
            <div style={{ width: 520, height: 1, background: softLine, margin: "10px auto 0" }} />
          </div>

          {/* Description */}
          <div style={{ textAlign: "center", marginTop: 22, padding: "0 60px" }}>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: fg, fontWeight: 400, margin: 0 }}>
              This certificate is proudly presented to{" "}
              <strong style={{ color: navy }}>{studentName || "the recipient"}</strong> in recognition of their
              outstanding dedication and successful completion of the course{" "}
              <em style={{ color: teal, fontWeight: 700 }}>&ldquo;{courseName || "Course Title"}&rdquo;</em>{" "}
              at Dream Team Academy.
            </p>
            <p style={{ fontSize: 16, color: muted, marginTop: 10 }}>
              Awarded on <strong style={{ color: fg }}>{date}</strong> · Certificate ID:{" "}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: fg }}>{certId}</span>
            </p>
          </div>

          {/* Footer signature — centered */}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "center", padding: "0 40px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ height: 70, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <img
                  src={signature}
                  alt="signature"
                  style={{ maxWidth: 240, maxHeight: 70, objectFit: "contain" }}
                />
              </div>
              <div style={{ height: 1, background: fg, margin: "4px auto 6px", width: 260 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: navy, lineHeight: 1.1 }}>Meerab Imran</div>
              <div style={{ fontSize: 14, letterSpacing: 4, color: muted, marginTop: 4, fontWeight: 700 }}>FOUNDER &amp; CEO</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Certificate.displayName = "Certificate";
