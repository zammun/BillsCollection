import { Link } from 'react-router-dom';

export default function CaliforniaPrivacyRightsPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">California Privacy Rights</h1>

      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          <strong>Last Updated: July 15, 2026</strong>
        </p>
        <p>
          This California Privacy Rights Notice supplements the information contained in our Privacy Policy and applies solely to all visitors, users, and others who reside in the State of California. We adopt this notice to comply with the California Consumer Privacy Act of 2018 (CCPA) and the California Privacy Rights Act (CPRA).
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. Your Rights Under the CCPA/CPRA</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you are a California resident, you have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-3 leading-relaxed">
          <li>
            <strong>Right to Know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell about you.
          </li>
          <li>
            <strong>Right to Delete:</strong> You have the right to request the deletion of your personal information that we have collected and retained, subject to certain exceptions.
          </li>
          <li>
            <strong>Right to Correct:</strong> You have the right to request that we correct inaccurate personal information that we maintain about you.
          </li>
          <li>
            <strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale or sharing of your personal information.{' '}
            <Link to="/DoNotSell" className="text-indigo-600 hover:underline">
              Click here to manage your preferences.
            </Link>
          </li>
          <li>
            <strong>Right to Limit:</strong> You have the right to limit the use and disclosure of your sensitive personal information.
          </li>
          <li>
            <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. Categories of Personal Information Collected</h2>
        <p className="text-gray-700 leading-relaxed">
          In the preceding 12 months, we have collected the following categories of personal information: Identifiers (such as name, email, IP address), Commercial information (such as records of products purchased), Internet or other similar network activity (such as browsing history on our site), and Geolocation data (physical location derived from IP address).
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. How to Exercise Your Rights</h2>
        <p className="text-gray-700 leading-relaxed">
          To exercise your rights to know, delete, or correct, please submit a verifiable consumer request to us by:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4 flex flex-col gap-2 leading-relaxed">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
              contact@billscollection.co
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +1 (347) 327-6851
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Only you, or someone legally authorized to act on your behalf, may make a verifiable consumer request related to your personal information. We will need to verify your identity before processing your request.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. "Shine the Light" Law</h2>
        <p className="text-gray-700 leading-relaxed">
          California Civil Code Section 1798.83 permits users of our Site that are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please send an email to{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>.
        </p>
      </div>
    </div>
  );
}