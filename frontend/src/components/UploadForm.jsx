/**
 * components/UploadForm.jsx
 * Form for uploading template, CSV, and setting email content.
 */
import { useRef } from "react";
import { useForm } from "react-hook-form";

export default function UploadForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      emailSubject: "Congratulations {{name}}! Your Certificate is Ready 🎓",
      emailBody:
        "Dear {{name}},\n\nCongratulations! Please find your certificate attached.\n\nBest regards,\nThe Team",
    },
  });

  const templateInputRef = useRef(null);
  const csvInputRef = useRef(null);

  const handleFormSubmit = (data) => {
    const csvFile = csvInputRef.current?.files?.[0];
    const templateFile = templateInputRef.current?.files?.[0];
    if (!csvFile) return;
    onSubmit({ ...data, csvFile, templateFile });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5 shadow-sm"
    >
      <h2 className="text-base font-extrabold tracking-tight text-zinc-950">
        Configuration
      </h2>

      {/* Template upload */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Certificate Template (PNG) — optional to re-upload
        </label>
        <input
          ref={templateInputRef}
          type="file"
          accept=".png"
          className="w-full text-sm text-zinc-700 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:text-sm file:font-semibold
            file:bg-brand-600 file:text-white hover:file:bg-brand-700 cursor-pointer"
        />
      </div>

      {/* CSV upload */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Recipients CSV <span className="text-brand-700">*</span>{" "}
          <span className="text-zinc-500">(columns: Name, Email)</span>
        </label>
        <input
          ref={csvInputRef}
          type="file"
          accept=".csv"
          required
          className="w-full text-sm text-zinc-700 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:text-sm file:font-semibold
            file:bg-brand-600 file:text-white hover:file:bg-brand-700 cursor-pointer"
        />
      </div>

      {/* Email subject */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Email Subject{" "}
          <span className="text-zinc-500">(use {`{{name}}`} for personalization)</span>
        </label>
        <input
          {...register("emailSubject", { required: "Subject is required" })}
          className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm
            text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-colors"
          placeholder="Congratulations {{name}}!"
        />
        {errors.emailSubject && (
          <p className="text-brand-700 text-xs mt-1">{errors.emailSubject.message}</p>
        )}
      </div>

      {/* Email body */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Email Body{" "}
          <span className="text-zinc-500">(use {`{{name}}`} for personalization)</span>
        </label>
        <textarea
          {...register("emailBody", { required: "Body is required" })}
          rows={5}
          className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-2.5 text-sm
            text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-colors resize-y"
          placeholder="Dear {{name}}, ..."
        />
        {errors.emailBody && (
          <p className="text-brand-700 text-xs mt-1">{errors.emailBody.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-lg font-extrabold text-white text-sm
          bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Processing…
          </>
        ) : (
          "🚀 Start Sending Certificates"
        )}
      </button>
    </form>
  );
}
