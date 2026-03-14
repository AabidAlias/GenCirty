/**
 * components/SupportButton.jsx
 * Floating support button — appears on all pages.
 * Click to email support or expand for options.
 */
import { useState } from "react";

const SUPPORT_EMAIL = "gencirty01@gmail.com";

export default function SupportButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {/* Expanded options */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 animate-fade-in">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            How can we help?
          </p>

          {/* Email support */}
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=GenCirty Support Request`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group"
          >
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <span className="text-lg">✉️</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Email Support</p>
              <p className="text-xs text-gray-400">{SUPPORT_EMAIL}</p>
            </div>
          </a>

          {/* LinkedIn */}
          {/* <a
            href="https://www.linkedin.com/in/aabid431/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group mt-1"
          >
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-lg">💼</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">LinkedIn</p>
              <p className="text-xs text-gray-400">Message Aabid Ali</p>
            </div>
          </a> */}

          <div className="border-t border-gray-100 mt-3 pt-3">
            <p className="text-xs text-gray-400 text-center">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg font-semibold text-sm transition-all duration-200 ${
          expanded
            ? "bg-gray-800 text-white"
            : "bg-red-600 text-white hover:bg-red-700 hover:shadow-xl hover:scale-105"
        }`}
      >
        <span className="text-base">{expanded ? "✕" : "💬"}</span>
        <span>{expanded ? "Close" : "Support"}</span>
      </button>

    </div>
  );
}
