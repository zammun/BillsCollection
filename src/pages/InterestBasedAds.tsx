import { Link } from 'react-router-dom';

export default function InterestBasedAdsPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Interest-Based Advertising</h1>

      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          <strong>Last Updated: July 15, 2026</strong>
        </p>
        <p>
          At Bills Collection, we want to ensure that the advertisements you see are relevant and useful to you. To do this, we participate in interest-based advertising (IBA), also known as targeted or personalized advertising. This page explains how it works and how you can manage your preferences.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. How Interest-Based Advertising Works</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We and our third-party advertising partners (such as Google and Meta) use tracking technologies like cookies, web beacons, and pixels to collect information about your browsing activities over time and across different websites. This data helps us:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2 leading-relaxed">
          <li>Understand your interests and preferences based on your interactions with our site.</li>
          <li>Deliver ads for Bills Collection products that you might actually want to see.</li>
          <li>Measure the effectiveness of our advertising campaigns.</li>
          <li>Prevent you from seeing the exact same ad too many times.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. The Information We Share</h2>
        <p className="text-gray-700 leading-relaxed">
          We do not share your name, email address, or phone number with these advertising partners for IBA purposes without your explicit consent. Instead, the information shared is typically linked to pseudonymous identifiers, such as a cookie ID or mobile advertising ID, which recognizes your device but does not directly identify you personally.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. Your Choices and Opt-Outs</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You have control over how your data is used for targeted advertising. You can opt out of interest-based ads through several industry-standard tools:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2 leading-relaxed">
          <li>
            <strong>Digital Advertising Alliance (DAA):</strong> Visit{' '}
            <a href="https://optout.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
              optout.aboutads.info
            </a>
          </li>
          <li>
            <strong>Network Advertising Initiative (NAI):</strong> Visit{' '}
            <a href="https://optout.networkadvertising.org" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
              optout.networkadvertising.org
            </a>
          </li>
          <li>
            <strong>Mobile Device Settings:</strong> You can use your iOS or Android device settings to limit ad tracking or reset your advertising identifier.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Additionally, you can manage your specific tracking preferences on our{' '}
          <Link to="/DoNotSell" className="text-indigo-600 hover:underline">
            Do Not Sell or Share My Personal Information
          </Link>{' '}
          page.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. Important Notes About Opting Out</h2>
        <p className="text-gray-700 leading-relaxed">
          Please keep in mind that opting out does not mean you will stop seeing advertisements altogether. It simply means that the ads you do see will no longer be tailored to your browsing behavior and may be less relevant to your interests. Because these opt-out mechanisms often rely on cookies, if you clear your browser cookies, you may need to opt out again.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions regarding our advertising practices, please reach out to us at{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>.
        </p>
      </div>
    </div>
  );
}