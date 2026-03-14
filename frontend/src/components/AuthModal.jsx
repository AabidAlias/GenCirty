/**
 * components/AuthModal.jsx
 * Updated: dark theme matching overall design.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/api";
import RouterLink from "./RouterLink";

export default function AuthModal({ mode, onClose, onSwitchMode }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result;
      if (mode === "register") {
        result = await registerUser({
          name: data.name, email: data.email, password: data.password,
          orgName: data.orgName, senderEmail: data.senderEmail,
          senderAppPassword: data.senderAppPassword || "not-required",
          agreeTerms: !!data.agreeTerms, agreeData: !!data.agreeData, agreePassword: !!data.agreePassword,
        });
        toast.success("Account created! Welcome 🎉");
      } else {
        result = await loginUser({ email: data.email, password: data.password });
        toast.success(`Welcome back, ${result.name}! 👋`);
      }
      if (!result || !result.user_id || !result.token) throw new Error("Server returned invalid data. Please try again.");
      login(result);
      onClose();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = (Array.isArray(detail) && detail.length ? detail.map((d) => d?.msg).filter(Boolean).join(", ") : detail) || err?.message || "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m) => { reset(); onSwitchMode(m); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" style={{ maxHeight: "92vh", overflowY: "auto" }}>

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-900 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-gray-600 text-sm mt-0.5">
              {mode === "login" ? "Sign in to your dashboard" : "Get started in minutes"}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-700 hover:text-white text-xl transition-colors">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-900">
          {["login", "register"].map((m) => (
            <button key={m} type="button" onClick={() => switchMode(m)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === m ? "text-red-500 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-400"}`}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-4">

          {mode === "register" && (
            <>
              <Field label="Full Name" error={errors.name?.message}>
                <input {...register("name", { required: "Name is required" })} placeholder="John Smith" className={inp(errors.name)} />
              </Field>

              <Field label="Organization Name" error={errors.orgName?.message}>
                <input {...register("orgName", { required: "Organization name is required" })} placeholder="GENCIRTY" className={inp(errors.orgName)} />
                <p className="text-xs text-gray-600 mt-1">
                  Used in cert codes: <span className="font-mono text-gray-500">GENCIRTY-2026-A3F7K</span>
                </p>
              </Field>

              <div className="border-t border-gray-900 pt-3">
                <p className="text-white text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Reply-To Email</p>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 mb-3 text-xs text-gray-500 leading-relaxed">
                  Your Gmail is used as <strong className="text-gray-400">Reply-To</strong> — so recipients can reply directly to you.
                </div>
              </div>

              <Field label="Your Gmail Address" error={errors.senderEmail?.message}>
                <input type="email" {...register("senderEmail", { required: "Gmail address is required" })} placeholder="yourname@gmail.com" className={inp(errors.senderEmail)} />
              </Field>

              <div className="border-t border-gray-900 pt-4 space-y-3">
                <p className="text-white text-xs font-semibold text-gray-600 uppercase tracking-wider">Consent</p>
                <Consent id="agreeTerms" fieldReg={register("agreeTerms", { required: "Required" })} error={errors.agreeTerms?.message}>
                  I agree to the <RouterLink to="/terms" className="text-red-500 underline">Terms of Service</RouterLink> and <RouterLink to="/privacy" className="text-red-500 underline">Privacy Policy</RouterLink>
                </Consent>
                <Consent id="agreeData" fieldReg={register("agreeData", { required: "Required" })} error={errors.agreeData?.message}>
                  I consent to my details being stored securely for sending certificates.
                </Consent>
                <Consent id="agreePassword" fieldReg={register("agreePassword", { required: "Required" })} error={errors.agreePassword?.message}>
                  I understand my Gmail address is stored securely and used only as reply-to.
                </Consent>
              </div>
            </>
          )}

          <Field label="Email Address" error={errors.email?.message}>
            <input type="email" {...register("email", { required: "Email is required" })} placeholder="you@example.com" className={inp(errors.email)} />
          </Field>

          <Field label="Password" error={errors.password?.message}>
            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })} placeholder="••••••••" className={inp(errors.password)} />
          </Field>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm">
            {loading ? <><Spinner /> {mode === "login" ? "Signing in..." : "Creating account..."}</> : mode === "login" ? "Sign In →" : "Create Account →"}
          </button>

          <p className="text-center text-xs text-gray-600 pb-1">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => switchMode(mode === "login" ? "register" : "login")} className="text-red-500 font-semibold hover:underline">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-white block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Consent({ id, fieldReg, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer group">
        <input id={id} type="checkbox" {...fieldReg} className="mt-0.5 w-4 h-4 accent-red-600 cursor-pointer flex-shrink-0" />
        <span className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors">{children}</span>
      </label>
      {error && <p className="text-red-500 text-xs mt-0.5 ml-6">{error}</p>}
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

const inp = (err) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-900 text-white placeholder-gray-600 ${
    err ? "border-red-800 bg-red-950/20" : "border-gray-800 focus:bg-gray-800"
  }`;
