/**
 * components/AuthModal.jsx
 * Updated: Gmail is now used as Reply-To only (sending via Brevo).
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
  const [showAppPwHelp, setShowAppPwHelp] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result;

      if (mode === "register") {
        result = await registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          orgName: data.orgName,
          senderEmail: data.senderEmail,
          senderAppPassword: data.senderAppPassword || "not-required",
          agreeTerms: !!data.agreeTerms,
          agreeData: !!data.agreeData,
          agreePassword: !!data.agreePassword,
        });
        toast.success("Account created! Welcome 🎉");
      } else {
        result = await loginUser({ email: data.email, password: data.password });
        toast.success(`Welcome back, ${result.name}! 👋`);
      }

      if (!result || !result.user_id || !result.token) {
        throw new Error("Server returned invalid data. Please try again.");
      }

      login(result);
      onClose();

    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg =
        (Array.isArray(detail) && detail.length
          ? detail.map((d) => d?.msg).filter(Boolean).join(", ")
          : detail) ||
        err?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m) => {
    reset();
    setShowAppPwHelp(false);
    onSwitchMode(m);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ maxHeight: "92vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="bg-red-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-black">
              {mode === "login" ? "Welcome Back 👋" : "Create Account 🎓"}
            </h2>
            <button type="button" onClick={onClose} className="text-red-200 hover:text-white text-2xl leading-none">
              ✕
            </button>
          </div>
          <p className="text-red-100 text-sm">
            {mode === "login" ? "Log in to your dashboard" : "Set up your account in minutes"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-white">
          {["login", "register"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === m
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-4">

          {/* ── Register-only fields ── */}
          {mode === "register" && (
            <>
              <Field label="Full Name" error={errors.name?.message}>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Smith"
                  className={inp(errors.name)}
                />
              </Field>

              <Field label="Organization / Society Name" error={errors.orgName?.message}>
                <input
                  {...register("orgName", { required: "Organization name is required" })}
                  placeholder="TEDxSNPSU"
                  className={inp(errors.orgName)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Used in cert codes:{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded text-gray-600">
                    TEDxSNPSU-2026-A3F7K
                  </span>
                </p>
              </Field>

              {/* Gmail sender */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  📧 Your Gmail Address
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3 text-xs text-amber-700 leading-relaxed">
                  <strong>Why?</strong> Your Gmail is used as the <strong>Reply-To</strong> address — so recipients can reply directly to you.
                </div>
              </div>

              <Field label="Your Gmail Address" error={errors.senderEmail?.message}>
                <input
                  type="email"
                  {...register("senderEmail", { required: "Gmail address is required" })}
                  placeholder="yourname@gmail.com"
                  className={inp(errors.senderEmail)}
                />
              </Field>

              {/* ── Consent Checkboxes ── */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  🔒 Privacy & Consent
                </p>

                <Consent
                  id="agreeTerms"
                  fieldReg={register("agreeTerms", { required: "Required to proceed" })}
                  error={errors.agreeTerms?.message}
                >
                  I agree to the{" "}
                  <RouterLink to="/terms" className="text-red-600 underline">Terms of Service</RouterLink>
                  {" "}and{" "}
                  <RouterLink to="/privacy" className="text-red-600 underline">Privacy Policy</RouterLink>
                </Consent>

                <Consent
                  id="agreeData"
                  fieldReg={register("agreeData", { required: "Required to proceed" })}
                  error={errors.agreeData?.message}
                >
                  I consent to my name, email, and organization details being stored securely for the purpose of sending certificates.
                </Consent>

                <Consent
                  id="agreePassword"
                  fieldReg={register("agreePassword", { required: "Required to proceed" })}
                  error={errors.agreePassword?.message}
                >
                  I understand my Gmail address is stored securely and used <strong>only</strong> as a reply-to address for certificate emails.
                </Consent>
              </div>
            </>
          )}

          {/* ── Common fields ── */}
          <Field label="Email Address" error={errors.email?.message}>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={inp(errors.email)}
            />
          </Field>

          <Field label="Password" error={errors.password?.message}>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="••••••••"
              className={inp(errors.password)}
            />
          </Field>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Spinner /> {mode === "login" ? "Logging in..." : "Creating account..."}</>
            ) : (
              mode === "login" ? "Log In →" : "Create Account →"
            )}
          </button>

          {/* Switch mode link */}
          <p className="text-center text-xs text-gray-400 pb-1">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
              className="text-red-600 font-semibold hover:underline"
            >
              {mode === "login" ? "Sign up free" : "Log in"}
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
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Consent({ id, fieldReg, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          {...fieldReg}
          className="mt-0.5 w-4 h-4 accent-red-600 cursor-pointer flex-shrink-0"
        />
        <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
          {children}
        </span>
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
  `w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 ${
    err ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
  }`;
