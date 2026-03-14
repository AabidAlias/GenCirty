/**
 * components/StatusTable.jsx — Dark minimal theme
 */
const STATUS_STYLES = {
  sent:    "bg-white text-black",
  failed:  "bg-red-600 text-white",
  pending: "bg-gray-800 text-gray-400 border border-gray-700",
};

export default function StatusTable({ records }) {
  if (!records || records.length === 0) return null;

  return (
    <div className="bg-[#0a0a0a] border border-gray-900 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-900">
        <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Recipient Status</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-900">
              <th className="text-left px-5 py-3 text-gray-600 font-semibold text-xs uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-gray-600 font-semibold text-xs uppercase tracking-wider">Email</th>
              <th className="text-left px-5 py-3 text-gray-600 font-semibold text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-gray-600 font-semibold text-xs uppercase tracking-wider">Note</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r.certificate_id || i} className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                <td className="px-5 py-3 text-white font-semibold">{r.name}</td>
                <td className="px-5 py-3 text-gray-500">{r.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${STATUS_STYLES[r.status] || "text-gray-500"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-red-500">{r.error_message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
