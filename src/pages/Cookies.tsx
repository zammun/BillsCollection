export default function CookiePreferencesPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Cookie Preferences</h1>
      
      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          At Bills Collection, we use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and assist in our marketing efforts. This page explains what cookies are, how we use them, and how you can manage your preferences.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
        <p className="text-gray-700 leading-relaxed">
          Cookies are small text files placed on your device when you visit a website. They help the website remember your actions and preferences (such as login details, active cart items, and language) over a period of time, so you don't have to keep re-entering them whenever you come back to the site.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Types of Cookies We Use</h2>
        <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Essential Cookies</h3>
            <p>
              These cookies are strictly necessary for the website to function properly. They enable core features such as security protocols, user authentication, and maintaining your shopping cart. These cannot be disabled in our systems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Performance & Analytics</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our store. They help us know which pages are the most popular and see how visitors navigate the site.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Marketing & Advertising</h3>
            <p>
              These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant products on other platforms.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Managing Your Preferences</h2>
        <p className="text-gray-700 leading-relaxed">
          You have the right to decide whether to accept or reject non-essential cookies. You can adjust your browser settings to refuse cookies or to alert you when a cookie is being sent. Please note that if you choose to block essential cookies, parts of our checkout and store infrastructure may not function properly.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about our use of cookies or our data privacy practices, please reach out to us at{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>.
        </p>
      </div>
    </div>
  );
}