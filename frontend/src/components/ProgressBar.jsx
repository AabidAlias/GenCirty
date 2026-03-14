/**
 * components/ProgressBar.jsx — Dark minimal theme
 */
export default function ProgressBar({ progress }) {
  if (!progress) return null;
  const { total, sent, failed, pending, done } = progress;
  const pct = total > 0 ? Math.round(((sent + failed) / total) * 100) : 0;

  return (
    <div className="bg-[#0a0a0a] border border-gray-900 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Batch Progress</h2>
        {done && <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold">Complete</span>}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #dc2626, #111827)" }} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <Stat label="Total"   value={total}   color="text-white" />
        <Stat label="Sent"    value={sent}    color="text-white" />
        <Stat label="Failed"  value={failed}  color="text-red-500" />
        <Stat label="Pending" value={pending} color="text-gray-500" />
      </div>

      <p className="text-center text-xs text-gray-700">
        {sent + failed} / {total} processed ({pct}%)
      </p>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-xs text-gray-600 mt-0.5">{label}</p>
    </div>
  );
}
