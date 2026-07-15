import { Link } from 'react-router-dom';

export default function DoNotSellPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Do Not Sell or Share My Personal Information</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Choices</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          You have the right to opt out of the sale or sharing of your Personal Information, including 
          Interest-Based/Targeted Advertising and Retargeting. While Bills Collection does not sell your 
          personal information for monetary consideration, we do share information for purposes that may 
          be deemed a "sale" or "sharing" under certain privacy legislation.
        </p>
        <Link 
          to="/PrivacyPolicy" 
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors inline-block"
        >
          View Privacy Policy
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Your California Privacy Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Under the California Privacy Rights Act (CPRA), California residents have specific rights regarding 
          their Personal Information.
        </p>

        <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
          {[
            { title: "Right to Deletion", desc: "You may request the deletion of Personal Information we have collected about you. Upon verification, we will also notify our third-party partners to delete your information." },
            { title: "Right to Correct", desc: "You have the right to correct inaccurate Personal Information we have collected. You can do this in your account profile or by contacting us." },
            { title: "Right to Know / Access", desc: "You have the right to know what Personal Information we have collected about you in the past 12 months, including the categories of sources, the purpose of collection, and third parties with whom we share it." },
            { title: "Right to Limit Use of Sensitive Information", desc: "You have the right to opt out of the disclosure of Sensitive Personal Information to a third party if we use that information for purposes beyond the designated operational necessity." },
            { title: "Right to No Retaliation", desc: "Bills Collection will never discriminate nor retaliate against you if you choose to exercise any of these privacy rights." }
          ].map((item, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">How to Exercise Your Rights</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You may submit a request through any of the following methods:
        </p>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2 leading-relaxed">
          <li><strong>Privacy Policy & Requests:</strong> <Link to="/PrivacyPolicy" className="text-indigo-600 hover:underline">View Privacy Policy</Link></li>
          <li><strong>By Phone:</strong> +1 (347) 327-6851 (TTY: 711)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Authorized Agents</h2>
        <p className="text-gray-700 leading-relaxed">
          If you would like to enter a request on behalf of a California resident, please submit the request via our 
          Privacy Policy page. Upon submission, you will be required to upload documentation showing proof of written 
          permission from the customer. We reserve the right to verify the identity of the customer.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">California Shine the Light</h2>
        <p className="text-gray-700 leading-relaxed">
          California residents have the right to ask us once each year if we have shared personal information with 
          third parties for their direct marketing purposes. To request your "California Shine the Light Notice," 
          please write to: 365 Carteret Avenue, Carteret, New Jersey, USA. Please allow 30 days for a response.
        </p>
      </div>
    </div>
  );
}