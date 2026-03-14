/**
 * components/SenderSettings.jsx — Dark minimal theme
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
  const { register, handleSubmit } = useForm({ defaultValues: { senderEmail: user?.sender_email || "" } });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/update-sender", { token: user.token, sender_email: data.senderEmail, sender_app_password: "not-required" });
      login({ ...user, sender_email: data.senderEmail, has_sender_configured: true });
      toast.success("Reply-To email updated!");
      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
          user?.has_sender_configured
            ? "text-green-500 border-green-900 bg-green-950/30 hover:border-green-700"
            : "text-amber-500 border-amber-900 bg-amber-950/30 hover:border-amber-700"
        }`}>
        {user?.has_sender_configured ? <><span>✅</span> {user.sender_email}</> : <><span>⚠️</span> Set Reply-To</>}
      </button>

      {open && (
        <div className="absolute right-6 mt-2 w-80 bg-[#0f0f0f] border border-gray-800 rounded-2xl p-5 shadow-2xl space-y-4 z-50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Reply-To Email</h3>
            <button onClick={() => setOpen(false)} className="text-gray-700 hover:text-white text-sm transition-colors">✕</button>
          </div>
          <p className="text-xs text-gray-600">Your Gmail is used as Reply-To so recipients can reply directly to you.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input type="email" {...register("senderEmail", { required: "Required" })}
              placeholder="yourname@gmail.com"
              className="w-full px-3 py-2.5 border border-gray-800 rounded-xl text-sm bg-gray-900 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50 text-sm transition-colors">
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
