/**
 * pages/LandingPage.jsx
 * Public hero page shown to unauthenticated users.
 */
import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  const openLogin = () => { setAuthMode("login"); setShowAuth(true); };
  const openRegister = () => { setAuthMode("register"); setShowAuth(true); };

  const steps = [
    { icon: "🔐", title: "Create Account", desc: "Sign up with your organization name to get started." },
    { icon: "🖼️", title: "Upload Template", desc: "Upload your certificate background PNG and drag the name box to the exact position." },
    { icon: "📋", title: "Upload CSV", desc: "Upload a CSV file with Name and Email columns for all recipients." },
    { icon: "✉️", title: "Send Certificates", desc: "Hit start — certificates are generated and emailed automatically in parallel." },
    { icon: "✅", title: "Verify Anytime", desc: "Every certificate has a unique code. Anyone can verify it is real at any time." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-red-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           
          <span className="font-bold text-4xl text-red-600 tracking-tight">GenCirty</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openLogin}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={openRegister}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-red-100">
          ⚡ Automate Certificate Distribution at Scale
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
          Send <span className="text-red-600">Personalized</span><br />Certificates in Minutes
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your template, add recipients via CSV, and let GenCirty generate
          and email beautiful personalized certificates — with built-in verification.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={openRegister}
            className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 text-base"
          >
            Get Started Free →
          </button>
          <button
            onClick={openLogin}
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all border border-gray-200 text-base"
          >
            I have an account
          </button>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-3">How It Works</h2>
          <p className="text-center text-gray-400 mb-12">Five simple steps from upload to inbox</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:border-red-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Step {i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🎯", title: "Visual Name Positioning", desc: "Drag and drop a box on your template to place the name exactly where you want it." },
            { icon: "⚡", title: "Parallel Sending", desc: "Send 10 emails simultaneously. 300 certificates in under 30 seconds." },
            { icon: "🔍", title: "Certificate Verification", desc: "Every certificate gets a unique code. Verify authenticity instantly." },
            { icon: "🏢", title: "Custom Org Branding", desc: "Certificate codes include your organization name like TEDxSNPSU-2026-A3F7K." },
            { icon: "📦", title: "Bulk Download ZIP", desc: "Download all generated certificates as a ZIP file anytime." },
            { icon: "🔄", title: "Retry Failed", desc: "Automatically retry failed emails with one click." },
          ].map((f, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-red-600 px-6 text-center">
        <h2 className="text-3xl font-black text-white mb-4">Ready to send certificates?</h2>
        <p className="text-red-100 mb-8">Join organizations already using GenCirty.</p>
        <button
          onClick={openRegister}
          className="px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-red-50 transition-all text-base shadow-lg"
        >
          Create Free Account →
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 text-center border-t border-gray-100">
        <p className="text-sm text-gray-400">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/aabid431/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-semibold hover:underline text-xl"
          >
            Aabid Ali
          </a>
        </p>
      </footer>

      {/* ── Auth Modal ── */}
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
