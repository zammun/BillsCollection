export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      
      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          <strong>Last Updated: July 8, 2026</strong>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          At Bills Collection, LLC ("we," "us," or "our"), your privacy is a top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our store. Please read this policy carefully.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">
          We collect information that you provide to us directly, such as your name, billing address, shipping address, email address, phone number, and payment information during the checkout process. We also automatically collect certain technical information when you visit our site, including IP address, browser type, device information, and browsing activity through cookies and similar tracking technologies.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2 leading-relaxed">
          <li>Process, fulfill, and manage your orders.</li>
          <li>Communicate with you regarding order status, updates, and customer support.</li>
          <li>Prevent fraud and ensure the security of our transactions.</li>
          <li>Improve our website performance and shopping experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We do not sell your personal information. We may share your information with trusted third parties strictly to perform necessary business functions, such as:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2 leading-relaxed">
          <li>Payment processors (e.g., Stripe).</li>
          <li>Shipping and logistics providers.</li>
          <li>Fraud prevention and security services.</li>
          <li>Legal authorities, if required by law.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies & Tracking</h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies to enhance your experience, analyze site traffic, and personalize content. You can adjust your browser settings to refuse cookies, though this may limit your ability to use certain features on our site.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">6. Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, please be aware that no data transmission over the internet is 100% secure.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
        <p className="text-gray-700 leading-relaxed">
          Depending on your location, you may have rights regarding your data, including the right to access, correct, or request the deletion of your personal information. To exercise these rights, please contact us using the information below.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this Privacy Policy or how we handle your data, please reach out to our support team at{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>.
        </p>
      </div>
    </div>
  );
}