import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Certificate } from "@/components/Certificate";
import { LANGS, type LangCode } from "@/lib/translations";
import logo from "@/assets/academy-logo.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dream Team Academy — Certificate Designer" },
      { name: "description", content: "Generate premium, professional course certificates instantly for Dream Team Academy." },
    ],
  }),
  component: Index,
});

function genId() {
  const r = Math.random().toString(36).slice(2, 8).toUpperCase();
  const y = new Date().getFullYear();
  return `DTA-${y}-${r}`;
}

function today() {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function Index() {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState("");
  const [certId, setCertId] = useState("");
  useEffect(() => {
    setDate(today());
    setCertId(genId());
  }, []);
  const [photo, setPhoto] = useState<string | null>(null);
  const [lang, setLang] = useState<LangCode>("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [accent, setAccent] = useState("#3b82f6");
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(r.result as string);
    r.readAsDataURL(f);
  };

  const download = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const url = await toPng(certRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        width: 1400,
        height: 990,
        style: { transform: "none", margin: "0" },
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(studentName || "certificate").replace(/\s+/g, "_")}_${certId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const presets = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#eab308"];

  const panelBg = theme === "dark" ? "bg-slate-900/60" : "bg-white/80";
  const pageBg =
    theme === "dark"
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-black"
      : "bg-gradient-to-br from-slate-50 via-white to-slate-100";
  const textCol = theme === "dark" ? "text-slate-100" : "text-slate-900";
  const subText = theme === "dark" ? "text-slate-400" : "text-slate-600";
  const inputCls = `w-full px-4 py-2.5 rounded-lg border transition outline-none focus:ring-2 ${
    theme === "dark"
      ? "bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-blue-500/50 focus:border-blue-500"
      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-500"
  }`;

  return (
    <div className={`min-h-screen ${pageBg} ${textCol}`}>
      <header className="border-b border-white/5 backdrop-blur-xl sticky top-0 z-10" style={{ background: theme === "dark" ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.7)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Dream Team Academy" className="w-11 h-11 rounded-xl shadow-lg" />
            <div>
              <div className="font-bold text-lg leading-tight">Dream Team Academy</div>
              <div className={`text-xs tracking-widest ${subText}`}>CERTIFICATE DESIGNER</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`px-3 py-2 rounded-lg text-sm border transition ${theme === "dark" ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"}`}
            >
              {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[380px_1fr] gap-8">
        {/* Form */}
        <aside className={`${panelBg} backdrop-blur-xl rounded-2xl border ${theme === "dark" ? "border-white/10" : "border-slate-200"} p-6 h-fit lg:sticky lg:top-24 shadow-xl`}>
          <h2 className="font-bold text-xl mb-1">Create Certificate</h2>
          <p className={`text-sm ${subText} mb-5`}>Fill in details — branding & signature are applied automatically.</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Student Name *</label>
              <input className={inputCls} value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Ahmed Khan" />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Course Name *</label>
              <input className={inputCls} value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g. Full Stack Web Development" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Date</label>
                <input className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Cert ID</label>
                <div className="flex gap-1">
                  <input className={inputCls} value={certId} onChange={(e) => setCertId(e.target.value)} />
                  <button onClick={() => setCertId(genId())} className={`px-2 rounded-lg border text-xs ${theme === "dark" ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"}`} title="Regenerate">↻</button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Student Photo (optional)</label>
              <div className="flex items-center gap-3">
                {photo && <img src={photo} alt="" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: accent }} />}
                <label className={`flex-1 cursor-pointer px-4 py-2.5 rounded-lg border text-sm text-center transition ${theme === "dark" ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"}`}>
                  {photo ? "Change photo" : "Upload photo"}
                  <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                </label>
                {photo && <button onClick={() => setPhoto(null)} className="text-xs text-red-400 hover:underline">Remove</button>}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5">Language</label>
              <select className={inputCls} value={lang} onChange={(e) => setLang(e.target.value as LangCode)}>
                {LANGS.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-2">Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`w-8 h-8 rounded-full transition ${accent === c ? "ring-2 ring-offset-2 ring-offset-transparent scale-110" : ""}`}
                    style={{ background: c, boxShadow: `0 4px 12px ${c}80` }}
                  />
                ))}
                <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0" />
              </div>
            </div>

            <button
              onClick={download}
              disabled={downloading || !studentName || !courseName}
              className="w-full mt-3 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 8px 24px ${accent}60` }}
            >
              {downloading ? "Generating..." : "⬇ Download Certificate (PNG)"}
            </button>
          </div>
        </aside>

        {/* Preview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-xl">Live Preview</h2>
            <div className={`text-xs ${subText}`}>1400 × 990 · Print-ready</div>
          </div>
          <div className={`rounded-2xl border ${theme === "dark" ? "border-white/10" : "border-slate-200"} overflow-hidden shadow-2xl`}>
            <div className="overflow-auto">
              <div style={{ transform: "scale(0.62)", transformOrigin: "top left", width: 1400, height: 990 * 0.62 + 2 }}>
                <Certificate
                  ref={certRef}
                  studentName={studentName || "Student Name"}
                  courseName={courseName || "Course Name"}
                  date={date}
                  certId={certId}
                  photo={photo}
                  lang={lang}
                  theme={theme}
                  accent={accent}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
