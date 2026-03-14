/**
 * pages/LandingPage.jsx
 * Minimal, bold — mobile hamburger menu added.
 */
import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  const openLogin = () => { setAuthMode("login"); setShowAuth(true); setMenuOpen(false); };
  const openRegister = () => { setAuthMode("register"); setShowAuth(true); setMenuOpen(false); };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <span className="font-black text-3xl tracking-tight text-white">GenCirty</span>

        {/* Desktop buttons */}
        <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <button onClick={openLogin} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Sign in
          </button>
          <button onClick={openRegister} className="px-5 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all">
            Get started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
            {menuOpen && (
        <>
          {/* Dark backdrop */}
          <div className="fixed inset-0 z-30 bg-black/90 sm:hidden" onClick={() => setMenuOpen(false)} />

          {/* Menu content */}
          <div className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-gray-800 px-6 py-6 flex flex-col gap-3 sm:hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <button onClick={openLogin} className="w-full py-3 text-sm font-medium text-gray-300 border border-gray-700 rounded-xl hover:border-gray-500 transition-colors">
              Sign in
            </button>
            <button onClick={openRegister} className="w-full py-3 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all">
              Get started →
            </button>
          </div>
        </>
      )}


      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.3em] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Certificate Automation
          </p>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tight">
            Certificates,<br />
            <span className="text-red-600">Automated.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto mb-12 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            From template to inbox in minutes.
          </p>
          <div className="flex items-center justify-center gap-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <button onClick={openRegister} className="px-8 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-500 transition-all shadow-2xl shadow-red-900/40 hover:-translate-y-0.5 transform text-sm">
              Start now →
            </button>
            <button onClick={openLogin} className="px-8 py-4 text-gray-400 font-medium rounded-2xl hover:text-white transition-all text-sm border border-gray-800 hover:border-gray-600">
              Sign in
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-px h-12 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                One upload.<br />
                <span className="text-gray-500">Thousands</span><br />
                of certificates.
              </h2>
              <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
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

      {/* ── Features ── */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.3em] mb-16 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Built for scale
          </p>
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
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Ready to send?
          </h2>
          <p className="text-gray-600 mb-10 text-base" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Create an account and start automating.
          </p>
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

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onSwitchMode={(m) => setAuthMode(m)}
        />
      )}
    </div>
  );
}
