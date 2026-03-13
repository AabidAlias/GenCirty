/**
 * pages/Dashboard.jsx
 * Fixed: all user.? accesses are null-safe to prevent blank screen after login.
 */
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "../components/ProgressBar";
import StatusTable from "../components/StatusTable";
import NamePositioner from "../components/NamePositioner";
import SenderSettings from "../components/SenderSettings";
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
  const { user, logout } = useAuth();

  // Guard: if user is somehow null, show nothing (App.jsx handles redirect)
  if (!user) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [records, setRecords] = useState([]);
  const [emailMeta, setEmailMeta] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [position, setPosition] = useState({
    nameXCm: 4.24,
    nameYCm: 5.6,
    textBoxWidthCm: 11.02,
  });

  const pollRef = useRef(null);
  const csvRef = useRef(null);
  const templateRef = useRef(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailSubject: "Congratulations {{name}}! Your Certificate is Ready 🎓",
      emailBody:
        "Dear {{name}},\n\nCongratulations! Please find your certificate attached.\n\nBest regards,\n" +
        (user?.org_name || "The Team"),
    },
  });

  // Poll for progress
  useEffect(() => {
    if (!batchId) return;

    const poll = async () => {
      try {
        const [prog, statusData] = await Promise.all([
          getBatchProgress(batchId),
          getBatchStatus(batchId),
        ]);
        setProgress(prog);
        setRecords(statusData.records || []);

        if (prog.done) {
          clearInterval(pollRef.current);
          setIsLoading(false);
          toast.success(`Done! ✅ ${prog.sent} sent, ${prog.failed} failed.`);
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    };

    pollRef.current = setInterval(poll, POLL_MS);
    poll();
    return () => clearInterval(pollRef.current);
  }, [batchId]);

  const handleFormSubmit = async (data) => {
    const csvFile = csvRef.current?.files?.[0];
    const tmplFile = templateRef.current?.files?.[0] || templateFile;

    if (!csvFile) {
      toast.error("Please upload a CSV file.");
      return;
    }

    if (!user?.has_sender_configured) {
      toast.error("Please configure your Gmail sender settings first.");
      return;
    }

    setIsLoading(true);
    setProgress(null);
    setRecords([]);
    setBatchId(null);
    clearInterval(pollRef.current);

    try {
      if (tmplFile) {
        await uploadTemplate(tmplFile);
        toast.success("Template uploaded!");
      }

      const result = await startBatch({
        csvFile,
        emailSubject: data.emailSubject,
        emailBody: data.emailBody,
        nameXCm: position.nameXCm,
        nameYCm: position.nameYCm,
        textBoxWidthCm: position.textBoxWidthCm,
        orgName: user?.org_name || "CERT",
      });

      setBatchId(result.batch_id);
      setEmailMeta({ emailSubject: data.emailSubject, emailBody: data.emailBody });
      toast.success(`Batch started! ${result.total} recipients. Sending from ${result.sender}`);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong.";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!batchId || !emailMeta) return;
    try {
      await retryFailed(batchId, emailMeta.emailSubject, emailMeta.emailBody);
      setIsLoading(true);
      toast("Retrying failed emails…", { icon: "🔄" });
    } catch {
      toast.error("Retry failed.");
    }
  };

  const handleTemplateChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setTemplateFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          
          <span className="font-bold text-red-600 text-lg">GenCirty</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          {/* User info */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name || "User"}</p>
            <p className="text-xs text-gray-400">{user?.org_name || ""}</p>
          </div>

          {/* Sender settings */}
          <SenderSettings />

          {/* Verify link */}
          <RouterLink
            to="/verify"
            className="px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            🔍 Verify
          </RouterLink>

          {/* Logout */}
          <button
            onClick={logout}
            className="px-3 py-1.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Upload your template, position the name, add recipients and send.
          </p>
        </div>

        {/* Sender warning banner */}
        {!user?.has_sender_configured && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-700">Gmail sender not configured</p>
              <p className="text-xs text-amber-600">Click the sender button in the top bar to set up your Gmail before sending.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left column */}
            <div className="space-y-5">
              <Section title="📁 Upload Files">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Certificate Template (PNG)
                  </label>
                  <input
                    ref={templateRef}
                    type="file"
                    accept=".png"
                    onChange={handleTemplateChange}
                    className={fileInp}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Recipients CSV <span className="text-red-400">*</span>
                    <span className="text-gray-400 font-normal ml-1">(columns: Name, Email)</span>
                  </label>
                  <input ref={csvRef} type="file" accept=".csv" className={fileInp} />
                </div>
              </Section>

              <Section title="✉️ Email Configuration">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Subject <span className="text-gray-400 font-normal">(use {"{{name}}"})</span>
                  </label>
                  <input {...register("emailSubject")} className={textInp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Body <span className="text-gray-400 font-normal">(use {"{{name}}"})</span>
                  </label>
                  <textarea {...register("emailBody")} rows={5} className={textInp + " resize-y"} />
                </div>
              </Section>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <Section title="📍 Name Position on Certificate">
                {templateFile ? (
                  <NamePositioner
                    templateFile={templateFile}
                    onPositionChange={setPosition}
                  />
                ) : (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-10 text-center">
                    <p className="text-3xl mb-2">🖼️</p>
                    <p className="text-gray-400 text-sm">Upload a template PNG above to drag and position the name</p>
                  </div>
                )}

                {/* Position readout */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { label: "X Position", value: `${position.nameXCm} cm` },
                    { label: "Y Position", value: `${position.nameYCm} cm` },
                    { label: "Box Width", value: `${position.textBoxWidthCm} cm` },
                  ].map((item) => (
                    <div key={item.label} className="bg-red-50 border border-red-100 rounded-lg p-2">
                      <p className="text-red-400 font-medium">{item.label}</p>
                      <p className="font-bold text-gray-800">{item.value}</p>
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
            className="w-full py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all text-base flex items-center justify-center gap-2 shadow-lg shadow-red-100"
          >
            {isLoading ? (
              <><Spinner /> Processing...</>
            ) : (
              "🚀 Generate & Send Certificates"
            )}
          </button>
        </form>

        {/* Progress */}
        {progress && <ProgressBar progress={progress} />}

        {/* Action buttons */}
        {batchId && progress && (
          <div className="flex gap-3 flex-wrap items-center">
            {progress.failed > 0 && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 text-sm font-semibold bg-amber-50 text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
              >
                🔄 Retry {progress.failed} Failed
              </button>
            )}
            {progress.done && (
              <a
                href={getZipDownloadUrl(batchId)}
                download
                className="px-4 py-2 text-sm font-semibold bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                📦 Download All as ZIP
              </a>
            )}
            <span className="text-xs text-gray-300 font-mono">ID: {batchId}</span>
          </div>
        )}

        {/* Status table */}
        {records.length > 0 && <StatusTable records={records} />}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-300 border-t border-gray-100 mt-10">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/aabid431/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:underline font-semibold text-xl"
        >
          Aabid Ali
        </a>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
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

const textInp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors";
const fileInp = "w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer";
