/**
 * pages/TermsPage.jsx
 * Terms of Service for GenCirty
 */
import RouterLink from "../components/RouterLink";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 2026">

      <Section title="1. About GenCirty">
        <p>
          GenCirty is a certificate automation platform that allows registered organizations
          and individuals ("Users") to generate and distribute personalized certificates to
          recipients via email. By creating an account and using this platform, you agree to
          these Terms of Service in full.
        </p>
      </Section>

      <Section title="2. Eligibility">
        <p>You must be at least <strong>18 years old</strong> to create an account. By registering, you confirm that:</p>
        <ul>
          <li>You are of legal age in your jurisdiction.</li>
          <li>You have the authority to represent the organization you register under.</li>
          <li>All information you provide is accurate and truthful.</li>
        </ul>
      </Section>

      <Section title="3. Acceptable Use">
        <p>You agree to use GenCirty <strong>only for lawful purposes</strong>. You must NOT:</p>
        <ul>
          <li>Send unsolicited or spam emails to recipients who have not consented.</li>
          <li>Use the platform to distribute false, misleading, or fraudulent certificates.</li>
          <li>Impersonate another person, organization, or institution.</li>
          <li>Upload offensive, illegal, or infringing certificate templates.</li>
          <li>Attempt to hack, reverse engineer, or disrupt the platform.</li>
          <li>Use another user's credentials or access their account without permission.</li>
        </ul>
        <p className="mt-3">
          Violation of these rules may result in immediate account suspension without notice.
        </p>
      </Section>

      <Section title="4. Your Gmail Credentials">
        <p>
          GenCirty requires you to provide your own Gmail address and App Password to send
          certificates on your behalf. You understand and agree that:
        </p>
        <ul>
          <li>Your Gmail App Password is stored securely in our database.</li>
          <li>It is used <strong>only</strong> to send certificate emails you initiate.</li>
          <li>You are responsible for keeping your App Password up to date.</li>
          <li>You can revoke access at any time by changing your App Password in Google.</li>
          <li>GenCirty will never use your Gmail for any purpose beyond sending your certificates.</li>
        </ul>
      </Section>

      <Section title="5. Certificate Codes & Verification">
        <p>
          Each certificate issued through GenCirty receives a unique verification code
          (e.g., <span className="font-mono bg-gray-100 px-1 rounded">TEDxSNPSU-2026-A3F7K</span>).
          These codes are stored in our database and can be publicly verified at any time.
          You agree that:
        </p>
        <ul>
          <li>Certificate data (recipient name, organization, issue date) may be publicly accessible via the verification page.</li>
          <li>You will only issue certificates for genuine achievements or participation.</li>
          <li>Issuing fake or fraudulent certificates is strictly prohibited and may be reported to authorities.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          You retain ownership of all certificate templates you upload. By uploading a template,
          you confirm that you have the right to use it and that it does not infringe on any
          third-party intellectual property rights.
        </p>
        <p className="mt-2">
          GenCirty's platform, design, and code are owned by the developer. You may not
          copy, reproduce, or redistribute any part of the platform.
        </p>
      </Section>

      <Section title="7. Disclaimer of Warranties">
        <p>
          GenCirty is provided <strong>"as is"</strong> without warranties of any kind.
          We do not guarantee that the service will be error-free, uninterrupted, or always
          available. We are not responsible for:
        </p>
        <ul>
          <li>Emails not delivered due to recipient spam filters or Gmail limits.</li>
          <li>Data loss due to technical failures.</li>
          <li>Any indirect or consequential damages from using this platform.</li>
        </ul>
      </Section>

      <Section title="8. Account Termination">
        <p>
          You may delete your account at any time by contacting us. We reserve the right to
          suspend or terminate accounts that violate these terms. Upon termination, your data
          will be deleted within 30 days, except where retention is required by law.
        </p>
      </Section>

      <Section title="9. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the platform after
          changes are posted constitutes your acceptance of the new terms. We will notify
          registered users of significant changes via email.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          For questions about these Terms, contact the developer:{" "}
          <a
            href="https://www.linkedin.com/in/aabid431/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline font-medium"
          >
            Aabid Ali
          </a>
        </p>
      </Section>

    </LegalPage>
  );
}

// ── Shared layout components ───────────────────────────────────────────────────

function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <RouterLink to="/" className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="font-bold text-red-600">GenCirty</span>
        </RouterLink>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-sm text-gray-500">{title}</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          <div className="mt-4 h-1 w-16 bg-red-500 rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {children}
        </div>

        {/* Back button */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm"
          >
            ← Back to Home
          </RouterLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-300 border-t border-gray-100 mt-10">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/aabid431/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:underline font-semibold"
        >
          Aabid Ali
        </a>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-500 rounded-full inline-block" />
        {title}
      </h2>
      <div className="pl-3 space-y-2 text-sm text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2">
        {children}
      </div>
    </div>
  );
}
