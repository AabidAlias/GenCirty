/**
 * pages/PrivacyPage.jsx
 * Privacy Policy for GenCirty — Updated March 2026
 */
import RouterLink from "../components/RouterLink";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 2026">

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <strong>Summary:</strong> We collect only what's necessary to run GenCirty. We never sell
        your data, never share it with third parties for marketing, and you can request deletion at any time.
      </div>

      <Section title="1. Who We Are">
        <p>
          GenCirty is a certificate automation platform developed and operated by{" "}
          <a href="https://www.linkedin.com/in/aabid431/" target="_blank" rel="noreferrer" className="text-red-600 underline">Aabid Ali</a>.
          This Privacy Policy explains what personal data we collect, why we collect it, and how we protect it.
        </p>
      </Section>

      <Section title="2. What Data We Collect">
        <p>When you create an account or make a payment, we collect and store:</p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2.5 font-bold text-gray-700">Data</th>
                <th className="text-left px-4 py-2.5 font-bold text-gray-700">Why We Collect It</th>
                <th className="text-left px-4 py-2.5 font-bold text-gray-700">Stored?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Full Name", "To display on your dashboard and invoices", "Yes"],
                ["Email Address", "For account login and invoice delivery", "Yes"],
                ["Password (hashed)", "To authenticate your account", "Yes (SHA-256)"],
                ["Organization Name", "To generate certificate codes", "Yes"],
                ["Gmail Address", "Used as Reply-To on certificate emails", "Yes"],
                ["Payment Records", "Order ID, Payment ID for invoice generation", "Yes"],
                ["Credits Balance", "To track purchased and used email credits", "Yes"],
                ["Certificate Records", "Recipient names/emails you upload for sending", "Yes"],
                ["Consent Timestamps", "Proof of your agreement to our terms", "Yes"],
              ].map(([data, why, stored]) => (
                <tr key={data} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-800">{data}</td>
                  <td className="px-4 py-2.5 text-gray-500">{why}</td>
                  <td className="px-4 py-2.5">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{stored}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          We do <strong>not</strong> store full payment card details. All payment processing is handled
          by <strong>Razorpay</strong> — we only store the Order ID and Payment ID for invoice purposes.
        </p>
      </Section>

      <Section title="3. How We Use Your Data">
        <p>We use your data strictly for operating GenCirty:</p>
        <ul>
          <li><strong>Name, Email, Password</strong> — to identify you and allow login.</li>
          <li><strong>Organization Name</strong> — to generate certificate verification codes.</li>
          <li><strong>Gmail Address</strong> — used as Reply-To address on certificate emails sent via Brevo.</li>
          <li><strong>Payment Records</strong> — to generate and send PDF invoices to your email.</li>
          <li><strong>Credits Balance</strong> — to track how many emails you can send.</li>
          <li><strong>Recipient data (CSV)</strong> — to generate and send certificates. Stored to power the verification system.</li>
        </ul>
        <p className="mt-2 font-semibold text-gray-700">We never use your data for advertising, marketing, or analytics.</p>
      </Section>

      <Section title="4. Payments & Razorpay">
        <p>
          All payments on GenCirty are processed by <strong>Razorpay</strong>, a PCI-DSS compliant
          payment gateway. When you make a payment:
        </p>
        <ul>
          <li>Your card/UPI/bank details are handled entirely by Razorpay — we never see or store them.</li>
          <li>We receive only the Order ID, Payment ID, and amount to generate your invoice.</li>
          <li>A PDF invoice is automatically emailed to your registered email after each successful payment.</li>
          <li>All transactions are final — see our <RouterLink to="/terms" className="text-red-600 underline">Terms of Service</RouterLink> for refund policy.</li>
        </ul>
      </Section>

      <Section title="5. Email Sending via Brevo">
        <p>
          Certificate emails are sent using <strong>Brevo</strong> (formerly Sendinblue), a
          third-party email delivery service. Your Gmail address is set as the Reply-To header
          so recipients can reply directly to you. Brevo processes email content and recipient
          addresses as part of this service.
        </p>
      </Section>

      <Section title="6. Certificate Verification Data (Public)">
        <p>
          When a certificate is issued, the following becomes <strong>publicly accessible</strong>
          via the verification page:
        </p>
        <ul>
          <li>Recipient's full name</li>
          <li>Certificate code</li>
          <li>Issuing organization name</li>
          <li>Date of issue</li>
        </ul>
        <p className="mt-2">
          By using GenCirty to issue certificates, you confirm that recipients have
          consented to their name appearing in this public verification system.
        </p>
      </Section>

      <Section title="7. Data Sharing">
        <p>We <strong>do not</strong> sell, rent, or share your personal data with any third party, except:</p>
        <ul>
          <li><strong>MongoDB Atlas</strong> — our database provider (data stored encrypted on their servers).</li>
          <li><strong>Brevo</strong> — processes recipient email addresses to deliver certificate emails.</li>
          <li><strong>Razorpay</strong> — processes payment transactions securely.</li>
          <li><strong>Legal requirements</strong> — if required by law or court order.</li>
        </ul>
        <p className="mt-2">No advertising networks, analytics companies, or data brokers receive your information.</p>
      </Section>

      <Section title="8. Data Retention">
        <p>We retain your data as follows:</p>
        <ul>
          <li><strong>Account data</strong> — kept until you delete your account.</li>
          <li><strong>Payment records</strong> — kept for legal and accounting purposes.</li>
          <li><strong>Certificate records</strong> — kept to support the public verification system.</li>
          <li><strong>Deleted accounts</strong> — all personal data purged within 30 days of deletion request.</li>
        </ul>
      </Section>

      <Section title="9. Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of your stored data.</li>
          <li><strong>Correct</strong> — update any inaccurate information.</li>
          <li><strong>Delete</strong> — request full deletion of your account and data.</li>
          <li><strong>Portability</strong> — request your data in a machine-readable format.</li>
        </ul>
        <p className="mt-2">To exercise any of these rights, contact us at the details below.</p>
      </Section>

      <Section title="10. Security">
        <p>We protect your data using:</p>
        <ul>
          <li>HTTPS encryption for all data in transit.</li>
          <li>SHA-256 hashing for passwords (never stored in plain text).</li>
          <li>MongoDB Atlas encryption at rest.</li>
          <li>Razorpay PCI-DSS compliance for all payment data.</li>
        </ul>
      </Section>

      <Section title="11. Children's Privacy">
        <p>
          GenCirty is not intended for users under the age of 18. We do not knowingly
          collect data from minors. If you believe a minor has created an account,
          please contact us for immediate deletion.
        </p>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy as the platform evolves. Significant changes
          will be communicated to registered users via email. Continued use after changes
          are posted means you accept the updated policy.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>For any privacy-related questions or requests, contact us:</p>
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
