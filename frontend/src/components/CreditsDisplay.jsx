/**
 * components/CreditsDisplay.jsx — Dark minimal theme
 */
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import PaymentModal from "./PaymentModal";

export default function CreditsDisplay() {
  const { user, login } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [credits, setCredits] = useState(user?.credits ?? null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/payments/credits");
        setCredits(data.credits);
        login({ ...user, credits: data.credits });
      } catch {}
    };
    fetch();
  }, []);

  return (
    <>
      <button onClick={() => setShowPayment(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
          (credits ?? 0) > 0
            ? "text-green-500 border-green-900 bg-green-950/30 hover:border-green-700"
            : "text-red-500 border-red-900 bg-red-950/30 hover:border-red-700"
        }`}>
        <span>🪙</span>
        {credits === null ? "..." : `${credits} Credits`}
        <span className="text-gray-700">+</span>
      </button>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} onSuccess={(c) => setCredits(c)} />}
    </>
  );
}
