/**
 * components/StatusTable.jsx
 * Shows per-recipient certificate send status.
 */
const STATUS_STYLES = {
  sent: "bg-black text-white",
  failed: "bg-brand-600 text-white",
  pending: "bg-white text-zinc-900 border border-zinc-300",
};

export default function StatusTable({ records }) {
  if (!records || records.length === 0) return null;

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-zinc-200">
        <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-wider">
          Recipient Status
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="text-left px-5 py-3 text-zinc-700 font-semibold">Name</th>
              <th className="text-left px-5 py-3 text-zinc-700 font-semibold">Email</th>
              <th className="text-left px-5 py-3 text-zinc-700 font-semibold">Status</th>
              <th className="text-left px-5 py-3 text-zinc-700 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr
                key={r.certificate_id || i}
                className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-5 py-3 text-zinc-950 font-semibold">{r.name}</td>
                <td className="px-5 py-3 text-zinc-700">{r.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-extrabold uppercase tracking-wide ${
                      STATUS_STYLES[r.status] || "text-zinc-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-brand-700">
                  {r.error_message || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
