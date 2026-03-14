/**
 * components/PaymentModal.jsx — Dark minimal theme
 */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const PRICE_PER_EMAIL = 3.4;
const MIN_EMAILS = 35;

export default function PaymentModal({ onClose, onSuccess }) {
  const { user, login } = useAuth();
  const [emailCount, setEmailCount] = useState(MIN_EMAILS);
  const [loading, setLoading] = useState(false);

  const subtotal = (emailCount * PRICE_PER_EMAIL).toFixed(2);
  const gst = (parseFloat(subtotal) * 0.18).toFixed(2);
  const total = (parseFloat(subtotal) * 1.18).toFixed(2);
  const isValid = emailCount >= MIN_EMAILS;

  const handlePay = async () => {
    if (!isValid) { toast.error(`Minimum ${MIN_EMAILS} emails required.`); return; }
    setLoading(true);
    try {
      const { data } = await api.post("/payments/create-order", { email_count: emailCount });
      const options = {
        key: data.key_id, amount: data.amount, currency: data.currency,
        name: "GenCirty", description: `${emailCount} Certificate Credits`,
        order_id: data.order_id,
        handler: async (response) => {
          try {
            const verify = await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            login({ ...user, credits: verify.data.total_credits });
            toast.success(`${emailCount} credits added!`);
            onSuccess(verify.data.total_credits);
            onClose();
          } catch { toast.error("Verification failed. Contact support."); }
        },
        prefill: { email: user?.email || "", name: user?.name || "" },
        theme: { color: "#dc2626" },
        modal: { ondismiss: () => { setLoading(false); } }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to initiate payment.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-900 flex items-center justify-between">
          <div>
            <h2 className="font-black text-white text-lg">Buy Credits</h2>
            <p className="text-gray-600 text-xs mt-0.5">₹3.40 per certificate</p>
          </div>
          <button onClick={onClose} className="text-gray-700 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Count input */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Number of Emails</label>
            <input
              type="number" min={MIN_EMAILS} value={emailCount}
              onChange={(e) => setEmailCount(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-3 border border-gray-800 rounded-xl text-2xl font-black text-center bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {!isValid && <p className="text-red-500 text-xs mt-1">Minimum {MIN_EMAILS} emails required.</p>}
          </div>

          {/* Quick select */}
          <div className="flex gap-2 flex-wrap">
            {[35, 50, 100, 200, 500].map((n) => (
              <button key={n} onClick={() => setEmailCount(n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  emailCount === n ? "bg-red-600 text-white border-red-600" : "border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400"
                }`}>
                {n}
              </button>
            ))}
          </div>

          {/* Price breakdown */}
          <div className="bg-gray-900 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{emailCount} × ₹{PRICE_PER_EMAIL}</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="border-t border-gray-800 pt-2 flex justify-between font-black text-white">
              <span>Total</span>
              <span className="text-red-500">₹{total}</span>
            </div>
          </div>

          {/* Pay button */}
          <button onClick={handlePay} disabled={loading || !isValid}
            className="w-full py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50 transition-colors text-sm flex items-center justify-center gap-2">
            {loading ? <><Spinner /> Processing...</> : `🔒 Pay ₹${total} with Razorpay`}
          </button>

          <p className="text-center text-xs text-gray-700">Secured by Razorpay · No refunds</p>
        </div>
      </div>
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
