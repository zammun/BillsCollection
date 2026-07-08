const PrivacyPolicyPage = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 max-w-5xl mx-auto text-slate-800 leading-relaxed text-sm">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
            
            <p className="mb-6">
                <strong>Last Updated: July 8, 2026</strong>
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">1. Introduction</h2>
            <p className="mb-6">
                At Bills Collection, LLC ("we," "us," or "our"), your privacy is a top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Insert Website URL] and make purchases from our store. Please read this policy carefully.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">2. Information We Collect</h2>
            <p className="mb-6">
                We collect information that you provide to us directly, such as your name, billing address, shipping address, email address, phone number, and payment information during the checkout process. We also automatically collect certain technical information when you visit our site, including IP address, browser type, device information, and browsing activity through cookies and similar tracking technologies.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">3. How We Use Your Information</h2>
            <p className="mb-6">
                We use the information we collect to:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Process, fulfill, and manage your orders.</li>
                    <li>Communicate with you regarding order status, updates, and customer support.</li>
                    <li>Prevent fraud and ensure the security of our transactions.</li>
                    <li>Improve our website performance and shopping experience.</li>
                    <li>Comply with legal obligations.</li>
                </ul>
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">4. Sharing Your Information</h2>
            <p className="mb-6">
                We do not sell your personal information. We may share your information with trusted third parties strictly to perform necessary business functions, such as:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Payment processors (e.g., Stripe).</li>
                    <li>Shipping and logistics providers.</li>
                    <li>Fraud prevention and security services.</li>
                    <li>Legal authorities, if required by law.</li>
                </ul>
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">5. Cookies & Tracking</h2>
            <p className="mb-6">
                We use cookies to enhance your experience, analyze site traffic, and personalize content. You can adjust your browser settings to refuse cookies, though this may limit your ability to use certain features on our site.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">6. Security</h2>
            <p className="mb-6">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, please be aware that no data transmission over the internet is 100% secure.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">7. Your Rights</h2>
            <p className="mb-6">
                Depending on your location, you may have rights regarding your data, including the right to access, correct, or request the deletion of your personal information. To exercise these rights, please contact us using the information below.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">Contact Us</h2>
            <p className="mb-6">
                If you have questions about this Privacy Policy or how we handle your data, please reach out to our support team:
                <br />
                <strong>Email:</strong> <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">contact@billscollection.co</a>
            </p>
        </div>
    );
};

export default PrivacyPolicyPage;