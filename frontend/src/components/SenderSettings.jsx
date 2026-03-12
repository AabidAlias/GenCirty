/**
 * components/SenderSettings.jsx
 * Updated: Gmail is used as Reply-To (sending via Brevo).
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function SenderSettings() {
  const { user, login } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { senderEmail: user?.sender_email || "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/update-sender", {
        token: user.token,
        sender_email: data.senderEmail,
        sender_app_password: "not-required",
      });
      login({ ...user, sender_email: data.senderEmail, has_sender_configured: true });
      toast.success("Reply-To email updated! ✅");
      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
          user?.has_sender_configured
            ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
            : "text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100"
        }`}
      >
        {user?.has_sender_configured ? (
          <><span>✅</span> {user.sender_email}</>
        ) : (
          <><span>⚠️</span> Set Reply-To Email</>
        )}
      </button>

      {open && (
        <div className="mt-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">📧 Reply-To Email Settings</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
            Your Gmail is set as <strong>Reply-To</strong> on all certificate emails. Recipients can reply directly to you.
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Your Gmail Address</label>
              <input
                type="email"
                {...register("senderEmail", { required: "Required" })}
                placeholder="yourname@gmail.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
