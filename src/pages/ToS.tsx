export default function TosPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Terms of Service</h1>

      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          <strong>Last Updated: July 8, 2026</strong>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing or using the Bills Collection website ("Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this Site. Bills Collection, LLC reserves the right to update or modify these terms at any time without prior notice. Your continued use of the Site signifies your acceptance of any changes.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
        <p className="text-gray-700 leading-relaxed">
          You must be at least 18 years old to make purchases or create an account on this Site. By using this Site, you represent and warrant that you meet this age requirement.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="text-gray-700 leading-relaxed">
          If you create an account, you are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. Orders & Pricing</h2>
        <p className="text-gray-700 leading-relaxed">
          All orders are subject to availability and acceptance. We reserve the right to correct pricing errors or omissions at any time, even after an order has been submitted. In the event of a pricing error, we will notify you and provide the option to cancel the order or proceed at the corrected price.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
        <p className="text-gray-700 leading-relaxed">
          By submitting any reviews, comments, or ideas to this Site, you grant Bills Collection, LLC an irrevocable, perpetual, royalty-free, and sub-licensable license to use, reproduce, modify, and distribute such content in any media for any purpose, including marketing and advertising.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
        <p className="text-gray-700 leading-relaxed">
          You agree not to use the Site for any unlawful purpose, including but not limited to: data mining, utilizing robots or spiders for extraction, engaging in libelous or abusive behavior, or transmitting viruses or malicious code. Any unauthorized use of the Site terminates the permission or license granted by us.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          To the fullest extent permitted by applicable law, Bills Collection, LLC shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, the Site or services.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms of Service are governed by the laws of the State of [Insert State], without regard to its conflict of law provisions. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts located in [Insert County/City, State].
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions regarding these Terms of Service, please contact us at:
          <br />
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>
          <br />
          <strong>Phone:</strong> +1 (347) 327-6851
        </p>
      </div>
    </div>
  );
}