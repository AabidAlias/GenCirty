/**
 * pages/TermsPage.jsx
 * Terms of Service for GenCirty — Updated March 2026
 */
import RouterLink from "../components/RouterLink";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 2026">

      <Section title="1. About GenCirty">
        <p>
          GenCirty is a paid certificate automation platform that allows registered organizations
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

      <Section title="4. Payments & Credits">
        <p>
          GenCirty operates on a <strong>prepaid credits system</strong>. You purchase email
          credits before sending certificates. By making a payment, you agree that:
        </p>
        <ul>
          <li>Credits are priced at <strong>₹3.40 per certificate email</strong> (minimum purchase: 35 credits).</li>
          <li>All payments are processed securely via <strong>Razorpay</strong>.</li>
          <li>Credits are added to your account instantly after payment verification.</li>
          <li>Credits do not expire and carry over between sessions.</li>
          <li>Each certificate email sent deducts one credit from your account.</li>
          <li>Prices are subject to change with prior notice to registered users.</li>
        </ul>
      </Section>

      <Section title="5. No Refund Policy">
        <p>
          <strong>All sales are final.</strong> We do not offer refunds on purchased credits under any circumstances, including:
        </p>
        <ul>
          <li>Unused credits remaining in your account.</li>
          <li>Credits lost due to failed email deliveries (credits are deducted upon sending, not upon delivery).</li>
          <li>Account deletion or suspension due to violation of these terms.</li>
          <li>Change of mind after purchase.</li>
        </ul>
        <p className="mt-2">
          If you experience a technical error where credits were deducted but emails were not sent,
          contact us at <a href="mailto:gencirty01@gmail.com" className="text-red-600 underline">gencirty01@gmail.com</a> within 48 hours for manual review.
        </p>
      </Section>

      <Section title="6. Email Sending">
        <p>
          GenCirty uses <strong>Brevo</strong> (formerly Sendinblue) to send certificate emails on your behalf.
          Your registered Gmail address is used as the Reply-To address so recipients can respond to you directly.
          You agree that:
        </p>
        <ul>
          <li>You are responsible for ensuring recipients have consented to receive emails from you.</li>
          <li>Emails are sent from GenCirty's verified sender — recipients will see your Gmail as the reply-to address.</li>
          <li>We are not responsible for emails landing in spam due to recipient mail filters.</li>
          <li>Daily sending limits apply as per Brevo's infrastructure.</li>
        </ul>
      </Section>

      <Section title="7. Certificate Codes & Verification">
        <p>
          Each certificate issued through GenCirty receives a unique verification code
          (e.g., <span className="font-mono bg-gray-100 px-1 rounded">GENCIRTY-2026-A3F7K</span>).
          These codes are stored in our database and can be publicly verified at any time. You agree that:
        </p>
        <ul>
          <li>Certificate data (recipient name, organization, issue date) may be publicly accessible via the verification page.</li>
          <li>You will only issue certificates for genuine achievements or participation.</li>
          <li>Issuing fake or fraudulent certificates is strictly prohibited.</li>
        </ul>
      </Section>

      <Section title="8. Intellectual Property">
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

      <Section title="9. Disclaimer of Warranties">
        <p>
          GenCirty is provided <strong>"as is"</strong> without warranties of any kind.
          We do not guarantee that the service will be error-free, uninterrupted, or always
          available. We are not responsible for:
        </p>
        <ul>
          <li>Emails not delivered due to recipient spam filters or email provider limits.</li>
          <li>Data loss due to technical failures.</li>
          <li>Any indirect or consequential damages from using this platform.</li>
          <li>Payment failures or delays caused by Razorpay or your bank.</li>
        </ul>
      </Section>

      <Section title="10. Account Termination">
        <p>
          You may delete your account at any time by contacting us. We reserve the right to
          suspend or terminate accounts that violate these terms. Upon termination, your data
          will be deleted within 30 days, except where retention is required by law.
          <strong> Unused credits are non-refundable upon account termination.</strong>
        </p>
      </Section>

      <Section title="11. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the platform after
          changes are posted constitutes your acceptance of the new terms. We will notify
          registered users of significant changes via email.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>For questions about these Terms, contact us:</p>
        <ul>
          <li>Email: <a href="mailto:gencirty01@gmail.com" className="text-red-600 underline">gencirty01@gmail.com</a></li>
        </ul>
      </Section>

    </LegalPage>
  );
}

function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <RouterLink to="/" className="flex items-center gap-2">
        <span className="font-black text-red-600" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>GenCirty</span>
        </RouterLink>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-sm text-gray-500">{title}</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          <div className="mt-4 h-1 w-16 bg-red-500 rounded-full" />
        </div>
        <div className="space-y-8 text-gray-700 leading-relaxed">{children}</div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <RouterLink to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm">
            ← Back to Home
          </RouterLink>
        </div>
      </div>
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
