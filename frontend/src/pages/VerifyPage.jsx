/**
 * pages/VerifyPage.jsx
 * Public certificate verification page — updated fonts and dark theme.
 */
import { useState } from "react";
import { verifyCertificate } from "../services/api";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await verifyCertificate(code.trim().toUpperCase());
      setResult(data);
    } catch (err) {
      setError("Certificate not found. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="px-8 py-5 flex items-center gap-3 border-b border-gray-900">
       <a href="/" className="font-black text-3xl text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>GenCirty</a>
        <span className="text-gray-700 mx-1">|</span>
        <span className="text-sm text-gray-600">Certificate Verification</span>
      </nav>

      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-lg mx-auto pt-20 px-6 pb-20">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-5">🔍</div>
          <h1 className="text-4xl font-black text-white mb-3">Verify Certificate</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enter the certificate code to verify its authenticity.
          </p>
        </div>

        {/* Input card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            Certificate Code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="e.g. GENCIRTY-2026-A3F7K"
            className="w-full px-4 py-3 border border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-800 text-white placeholder-gray-600"
          />
          <button
            onClick={handleVerify}
            disabled={loading || !code.trim()}
            className="w-full py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50 transition-colors text-sm"
          >
            {loading ? "Verifying..." : "Verify Certificate →"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-950/50 border border-red-900 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">❌</div>
            <p className="text-red-400 font-semibold text-sm">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="mt-6 bg-gray-900 border-2 border-green-600/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-800">
              <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center text-xl">✅</div>
              <div>
                <p className="font-black text-green-400 text-base">Certificate Verified</p>
                <p className="text-xs text-gray-600">This certificate is authentic</p>
              </div>
            </div>

            <div className="space-y-3">
              <Row label="Recipient Name" value={result.name} highlight />
              <Row label="Certificate Code" value={result.cert_number} mono />
              <Row label="Issued By" value={result.org_name} />
              <Row label="Issued On" value={new Date(result.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
              <Row label="Status" value={
                <span className="inline-flex items-center gap-1.5 bg-green-900/50 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-800">
                  ✅ GENUINE
                </span>
              } />
            </div>
          </div>
        )}

        {/* Footer link */}
        <p className="text-center text-xs text-gray-800 mt-12">
          Powered by <a href="/" className="text-gray-700 hover:text-gray-500 transition-colors">GenCirty</a>
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, mono }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
      <span className="text-xs text-gray-600 font-medium">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-white text-base" : "text-gray-300"} ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </span>
    </div>
  );
}
