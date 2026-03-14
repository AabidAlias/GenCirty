/**
 * pages/LandingPage.jsx
 * Added: "How to Use" visual section between hero and features.
 */
import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const openLogin = () => { setAuthMode("login"); setShowAuth(true); setMenuOpen(false); };
  const openRegister = () => { setAuthMode("register"); setShowAuth(true); setMenuOpen(false); };

  const steps = [
    {
      icon: "🔐",
      tag: "Step 01",
      title: "Create Your Account",
      desc: "Sign up with your name, organization, and Gmail. Your org name appears on every certificate code like GenCirty-2026-A3F7K.",
      visual: (
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Organization Name</p>
            <p className="text-white font-semibold">GenCirty</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Certificate Code Preview</p>
            <p className="text-red-500 font-mono font-bold">GenCirty-2026-A3F7K</p>
          </div>
        </div>
      ),
    },
    {
      icon: "🖼️",
      tag: "Step 02",
      title: "Upload Your Template",
      desc: "Upload your certificate design as a PNG. Then drag a box to position exactly where names should appear pixel perfect every time.",
      visual: (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 ml-2">certificate_template.png</span>
          </div>
          <div className="p-4 relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-28 flex items-center justify-center border border-gray-700 relative">
              <p className="text-gray-600 text-xs">Certificate Design</p>
              <div className="absolute border-2 border-red-500 border-dashed rounded px-3 py-1 bg-red-950/20" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <p className="text-red-400 text-xs font-semibold whitespace-nowrap">Name Position</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <div className="flex-1 bg-gray-800 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-600">X</p>
                <p className="text-white text-xs font-bold">4.24 cm</p>
              </div>
              <div className="flex-1 bg-gray-800 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-600">Y</p>
                <p className="text-white text-xs font-bold">5.60 cm</p>
              </div>
              <div className="flex-1 bg-gray-800 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-600">Width</p>
                <p className="text-white text-xs font-bold">11.02 cm</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: "📋",
      tag: "Step 03",
      title: "Upload Recipients CSV",
      desc: "Prepare a simple CSV file with two columns Name and Email. Upload it and GenCirty handles the rest automatically.",
      visual: (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">recipients.csv</span>
          </div>
          <div className="p-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left pb-2 text-gray-600 font-semibold">Name</th>
                  <th className="text-left pb-2 text-gray-600 font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {[
                  ["Suman", "suman@gmail.com"],
                  ["Priya Sharma", "priya@gmail.com"],
                  ["Rahul Singh", "rahul@gmail.com"],
                  ["...", "..."],
                ].map(([name, email], i) => (
                  <tr key={i} className="border-b border-gray-900">
                    <td className="py-2 text-gray-300">{name}</td>
                    <td className="py-2 text-gray-500">{email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      icon: "🪙",
      tag: "Step 04",
      title: "Buy Credits & Send",
      desc: "Purchase credits to send certificates. Each certificate costs one credit. Credits never expire use them whenever you need.",
      visual: (
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Your Credits</p>
              <p className="text-2xl font-black text-white">100 <span className="text-sm text-gray-600 font-normal">credits</span></p>
            </div>
            <div className="w-10 h-10 bg-red-950/50 rounded-xl flex items-center justify-center text-xl">🪙</div>
          </div>
          <div className="bg-green-950/30 border border-green-900/50 rounded-xl p-3 flex items-center gap-3">
            <span className="text-green-500 text-lg">✅</span>
            <div>
              <p className="text-xs font-semibold text-green-400">3 certificates sent</p>
              <p className="text-xs text-green-700">97 credits remaining</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: "✅",
      tag: "Step 05",
      title: "Verify Anytime",
      desc: "Every certificate gets a unique code. Anyone employers, institutions can verify its authenticity instantly through the public verification page.",
      visual: (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Certificate Code</p>
            <div className="flex gap-2">
              <input className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs font-mono text-gray-300" value="GenCirty-2026-A3F7K" readOnly />
              <div className="px-3 py-2 bg-red-600 rounded-lg text-xs text-white font-semibold">Verify</div>
            </div>
          </div>
          <div className="p-4 bg-green-950/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-xs font-bold text-green-400">Certificate Verified</p>
                <p className="text-xs text-gray-600 mt-0.5">Suman · GenCirty · March 2026</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <span className="font-black text-3xl tracking-tight text-white">GenCirty</span>
        <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <button onClick={openLogin} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign in</button>
          <button onClick={openRegister} className="px-5 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all">Get started</button>
        </div>
        <button className="sm:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/90 sm:hidden" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-gray-800 px-6 py-6 flex flex-col gap-3 sm:hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <button onClick={openLogin} className="w-full py-3 text-sm font-medium text-gray-300 border border-gray-700 rounded-xl">Sign in</button>
            <button onClick={openRegister} className="w-full py-3 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-500">Get started →</button>
          </div>
        </>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.3em] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>Certificate Automation</p>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tight">
            Certificates,<br /><span className="text-red-600">Automated.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            From template to inbox in minutes.
          </p>
          <div className="flex items-center justify-center gap-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <button onClick={openRegister} className="px-8 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-500 transition-all shadow-2xl shadow-red-900/40 hover:-translate-y-0.5 transform text-sm">Start now →</button>
            <button onClick={openLogin} className="px-8 py-4 text-gray-400 font-medium rounded-2xl hover:text-white transition-all text-sm border border-gray-800 hover:border-gray-600">Sign in</button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-px h-12 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── Bold quote section ── */}
      <section className="py-32 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                One upload.<br />
                <span className="text-gray-600">Thousands</span><br />
                of certificates.
              </h2>
              <p className="text-gray-500 leading-relaxed mt-6" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                Upload your template, drop a CSV, position the name and send. Each certificate is personalized, verified, and delivered.
              </p>
            </div>
            <div className="space-y-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {[
                ["01", "Upload Template", "Your design, your brand"],
                ["02", "Add Recipients", "CSV with name and email"],
                ["03", "Send", "Delivered in seconds"],
                ["04", "Verify", "Unique code per certificate"],
              ].map(([num, title, sub]) => (
                <div key={num} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
                  <span className="text-2xl font-black text-gray-700 group-hover:text-red-600 transition-colors w-8">{num}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ── */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>How it works</p>
            <h2 className="text-4xl md:text-5xl font-black">From signup to sent<br /><span className="text-gray-600">in five steps.</span></h2>
          </div>

          {/* Step tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeStep === i ? "bg-red-600 text-white" : "bg-gray-900 text-gray-500 hover:text-gray-300 border border-gray-800"
                }`}>
                <span>{s.icon}</span>
                <span className="hidden sm:block">{s.tag}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Active step content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/30 border border-gray-800 rounded-3xl p-8">
            {/* Left — text */}
            <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-3">{steps[activeStep].tag}</p>
              <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{steps[activeStep].title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{steps[activeStep].desc}</p>

              {/* Step navigation */}
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 text-sm border border-gray-800 text-gray-500 rounded-xl hover:border-gray-600 hover:text-gray-300 disabled:opacity-30 transition-all">
                  ← Prev
                </button>
                <button onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-xl hover:bg-red-500 disabled:opacity-30 transition-all">
                  Next →
                </button>
                <span className="text-xs text-gray-700 ml-2">{activeStep + 1} / {steps.length}</span>
              </div>
            </div>

            {/* Right — visual */}
            <div>{steps[activeStep].visual}</div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.3em] mb-16 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Built for scale</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-800 rounded-3xl overflow-hidden">
            {[
              ["⚡", "Fast", "Parallel sending"],
              ["🔍", "Verified", "Unique cert codes"],
              ["📦", "Downloadable", "ZIP all certificates"],
              ["🔄", "Reliable", "Retry failed sends"],
            ].map(([icon, title, sub]) => (
              <div key={title} className="bg-[#0a0a0a] p-6 md:p-8 hover:bg-gray-900/50 transition-colors text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">{icon}</div>
                <p className="font-semibold text-white text-xs md:text-sm mb-1">{title}</p>
                <p className="text-gray-600 text-xs hidden md:block">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden border-t border-gray-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Ready to send?</h2>
          <p className="text-gray-600 mb-10 text-base" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>Create an account and start automating.</p>
          <button onClick={openRegister} className="px-10 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-500 transition-all text-sm shadow-2xl shadow-red-900/30 hover:-translate-y-0.5 transform" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Create account →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-black text-gray-600">GenCirty</span>
        <div className="flex items-center gap-6 text-xs text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a>
          <a href="mailto:gencirty01@gmail.com" className="hover:text-gray-400 transition-colors">Support</a>
        </div>
        <p className="text-xs text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>© 2026 GenCirty</p>
      </footer>

      {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSwitchMode={(m) => setAuthMode(m)} />}
    </div>
  );
}
