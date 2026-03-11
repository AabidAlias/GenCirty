/**
 * pages/VerifyPage.jsx
 * Public page where anyone can verify a certificate by entering its code.
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
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <span className="text-xl">🎓</span>
        <span className="font-bold text-red-600">
GenCirty</span>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-sm text-gray-500">Certificate Verification</span>
      </nav>

      <div className="max-w-lg mx-auto pt-20 px-6">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Certificate</h1>
          <p className="text-gray-400 text-sm">Enter the certificate code printed on the certificate to verify its authenticity.</p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Certificate Code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="e.g. TEDxSNPSU-2026-A3F7K"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-300 bg-gray-50"
          />
          <button
            onClick={handleVerify}
            disabled={loading || !code.trim()}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Verifying..." : "Verify Certificate →"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">❌</div>
            <p className="text-red-600 font-semibold text-sm">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="mt-6 bg-white border-2 border-green-400 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">✅</div>
              <div>
                <p className="font-black text-green-700 text-base">Certificate Verified</p>
                <p className="text-xs text-gray-400">This certificate is authentic</p>
              </div>
            </div>

            <div className="space-y-3">
              <Row label="Recipient Name" value={result.name} highlight />
              <Row label="Certificate Code" value={result.cert_number} mono />
              <Row label="Issued By" value={result.org_name} />
              <Row label="Issued On" value={new Date(result.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
              <Row label="Status" value={
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  ✅ GENUINE CERTIFICATE
                </span>
              } />
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-12 pb-8">
          Powered by{" "}
          <a href="https://www.linkedin.com/in/aabid431/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline text-xl">
            Aabid Ali
          </a>
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, mono }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-gray-900 text-base" : "text-gray-700"} ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
