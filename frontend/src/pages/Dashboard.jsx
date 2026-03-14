/**
 * pages/Dashboard.jsx
 * Updated: dark theme, DM Sans + Playfair fonts, Razorpay credits.
 */
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "../components/ProgressBar";
import StatusTable from "../components/StatusTable";
import NamePositioner from "../components/NamePositioner";
import SenderSettings from "../components/SenderSettings";
import CreditsDisplay from "../components/CreditsDisplay";
import PaymentModal from "../components/PaymentModal";
import RouterLink from "../components/RouterLink";
import {
  uploadTemplate,
  startBatch,
  getBatchProgress,
  getBatchStatus,
  retryFailed,
  getZipDownloadUrl,
} from "../services/api";

const POLL_MS = 2000;

export default function Dashboard() {
  const { user, logout, login } = useAuth();
  if (!user) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [records, setRecords] = useState([]);
  const [emailMeta, setEmailMeta] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [pendingSubmitData, setPendingSubmitData] = useState(null);
  const [position, setPosition] = useState({ nameXCm: 4.24, nameYCm: 5.6, textBoxWidthCm: 11.02 });

  const pollRef = useRef(null);
  const csvRef = useRef(null);
  const templateRef = useRef(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailSubject: "Congratulations {{name}}! Your Certificate is Ready 🎓",
      emailBody: "Dear {{name}},\n\nCongratulations! Please find your certificate attached.\n\nBest regards,\n" + (user?.org_name || "The Team"),
    },
  });

  useEffect(() => {
    if (!batchId) return;
    const poll = async () => {
      try {
        const [prog, statusData] = await Promise.all([getBatchProgress(batchId), getBatchStatus(batchId)]);
        setProgress(prog);
        setRecords(statusData.records || []);
        if (prog.done) { clearInterval(pollRef.current); setIsLoading(false); toast.success(`Done! ✅ ${prog.sent} sent, ${prog.failed} failed.`); }
      } catch (e) { console.error("Poll error:", e); }
    };
    pollRef.current = setInterval(poll, POLL_MS);
    poll();
    return () => clearInterval(pollRef.current);
  }, [batchId]);

  const handleFormSubmit = async (data) => {
    const csvFile = csvRef.current?.files?.[0];
    const tmplFile = templateRef.current?.files?.[0] || templateFile;
    if (!csvFile) { toast.error("Please upload a CSV file."); return; }
    if (!user?.has_sender_configured) { toast.error("Please configure your sender settings first."); return; }
    if ((user?.credits ?? 0) <= 0) {
      toast.error("No credits. Please purchase credits to send emails.");
      setPendingSubmitData({ data, csvFile, tmplFile });
      setShowPayment(true);
      return;
    }
    await doSend(data, csvFile, tmplFile);
  };

  const doSend = async (data, csvFile, tmplFile) => {
    setIsLoading(true); setProgress(null); setRecords([]); setBatchId(null); clearInterval(pollRef.current);
    try {
      if (tmplFile) { await uploadTemplate(tmplFile); toast.success("Template uploaded!"); }
      const result = await startBatch({ csvFile, emailSubject: data.emailSubject, emailBody: data.emailBody, nameXCm: position.nameXCm, nameYCm: position.nameYCm, textBoxWidthCm: position.textBoxWidthCm, orgName: user?.org_name || "CERT" });
      setBatchId(result.batch_id);
      setEmailMeta({ emailSubject: data.emailSubject, emailBody: data.emailBody });
      toast.success(`Batch started! ${result.total} recipients.`);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong.";
      if (err?.response?.status === 402) { toast.error(msg); setPendingSubmitData({ data, csvFile, tmplFile }); setShowPayment(true); }
      else toast.error(msg);
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (newCredits) => {
    login({ ...user, credits: newCredits });
    if (pendingSubmitData) { const { data, csvFile, tmplFile } = pendingSubmitData; setPendingSubmitData(null); doSend(data, csvFile, tmplFile); }
  };

  const handleRetry = async () => {
    if (!batchId || !emailMeta) return;
    try { await retryFailed(batchId, emailMeta.emailSubject, emailMeta.emailBody); setIsLoading(true); toast("Retrying failed emails…", { icon: "🔄" }); }
    catch { toast.error("Retry failed."); }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Navbar */}
      <header className="bg-[#0a0a0a] border-b border-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-black text-xl text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>GenCirty</span>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{user?.name || "User"}</p>
            <p className="text-xs text-gray-600">{user?.org_name || ""}</p>
          </div>
          <CreditsDisplay />
          <SenderSettings />
          <RouterLink to="/verify" className="px-3 py-1.5 text-xs font-semibold text-gray-400 border border-gray-800 rounded-lg hover:border-gray-600 hover:text-white transition-colors">
            🔍 Verify
          </RouterLink>
          <button onClick={logout} className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors">
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Upload your template, position the name, add recipients and send.</p>
        </div>

        {/* Sender warning */}
        {!user?.has_sender_configured && (
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-400">Gmail sender not configured</p>
              <p className="text-xs text-amber-600">Click the sender button in the top bar to set up your Gmail before sending.</p>
            </div>
          </div>
        )}

        {/* No credits warning */}
        {(user?.credits ?? 0) === 0 && (
          <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🪙</span>
              <div>
                <p className="text-sm font-bold text-red-400">No credits remaining</p>
                <p className="text-xs text-red-600">Purchase credits to send certificate emails. ₹3.4 per email, minimum 35.</p>
              </div>
            </div>
            <button onClick={() => setShowPayment(true)} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors whitespace-nowrap">
              Buy Credits
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left column */}
            <div className="space-y-5">
              <Section title="📁 Upload Files">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Certificate Template (PNG)</label>
                  <input ref={templateRef} type="file" accept=".png" onChange={(e) => { const f = e.target.files?.[0]; if (f) setTemplateFile(f); }} className={fileInp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Recipients CSV <span className="text-red-500">*</span>
                    <span className="text-gray-600 font-normal normal-case ml-1">(Name, Email)</span>
                  </label>
                  <input ref={csvRef} type="file" accept=".csv" className={fileInp} />
                </div>
              </Section>

              <Section title="✉️ Email Configuration">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Subject <span className="text-gray-600 font-normal normal-case">(use {"{{name}}"})</span>
                  </label>
                  <input {...register("emailSubject")} className={textInp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Body <span className="text-gray-600 font-normal normal-case">(use {"{{name}}"})</span>
                  </label>
                  <textarea {...register("emailBody")} rows={5} className={textInp + " resize-y"} />
                </div>
              </Section>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <Section title="📍 Name Position">
                {templateFile ? (
                  <NamePositioner templateFile={templateFile} onPositionChange={setPosition} />
                ) : (
                  <div className="bg-gray-900 border-2 border-dashed border-gray-800 rounded-xl p-10 text-center">
                    <p className="text-3xl mb-2">🖼️</p>
                    <p className="text-gray-600 text-sm">Upload a template PNG above to drag and position the name</p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { label: "X Position", value: `${position.nameXCm} cm` },
                    { label: "Y Position", value: `${position.nameYCm} cm` },
                    { label: "Box Width", value: `${position.textBoxWidthCm} cm` },
                  ].map((item) => (
                    <div key={item.label} className="bg-red-950/30 border border-red-900/30 rounded-lg p-2">
                      <p className="text-red-500 font-medium">{item.label}</p>
                      <p className="font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-500 disabled:opacity-50 transition-all text-base flex items-center justify-center gap-2 shadow-2xl shadow-red-900/30"
          >
            {isLoading ? <><Spinner /> Processing...</> : "🚀 Generate & Send Certificates"}
          </button>
        </form>

        {progress && <ProgressBar progress={progress} />}

        {batchId && progress && (
          <div className="flex gap-3 flex-wrap items-center">
            {progress.failed > 0 && (
              <button onClick={handleRetry} className="px-4 py-2 text-sm font-semibold bg-amber-950/30 text-amber-400 border border-amber-800/50 rounded-lg hover:bg-amber-950/50 transition-colors">
                🔄 Retry {progress.failed} Failed
              </button>
            )}
            {progress.done && (
              <a href={getZipDownloadUrl(batchId)} download className="px-4 py-2 text-sm font-semibold bg-red-950/30 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-950/50 transition-colors">
                📦 Download All as ZIP
              </a>
            )}
            <span className="text-xs text-gray-700 font-mono">ID: {batchId}</span>
          </div>
        )}

        {records.length > 0 && <StatusTable records={records} />}
      </div>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} onSuccess={handlePaymentSuccess} />}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-gray-900 p-5 space-y-4">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

const textInp = "w-full px-4 py-2.5 border border-gray-800 rounded-xl text-sm bg-gray-900 text-white placeholder-gray-600 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors";
const fileInp = "w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-500 cursor-pointer";
