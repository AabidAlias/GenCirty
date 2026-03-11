/**
 * components/ProgressBar.jsx
 * Displays live send progress for the current batch.
 */
export default function ProgressBar({ progress }) {
  if (!progress) return null;

  const { total, sent, failed, pending, done } = progress;
  const pct = total > 0 ? Math.round(((sent + failed) / total) * 100) : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-wider">
          Batch Progress
        </h2>
        {done && (
          <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full font-semibold">
            Complete
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #dc2626, #111827)",
          }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <Stat label="Total" value={total} color="text-zinc-950" />
        <Stat label="Sent" value={sent} color="text-black" />
        <Stat label="Failed" value={failed} color="text-brand-700" />
        <Stat label="Pending" value={pending} color="text-zinc-700" />
      </div>

      <p className="text-center text-xs text-zinc-600">
        {sent + failed} / {total} processed ({pct}%)
      </p>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
    </div>
  );
}
