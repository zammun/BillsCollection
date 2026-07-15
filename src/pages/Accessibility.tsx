export default function AccessibilityPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Digital Accessibility Statement</h1>
      
      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          At Bills Collection, we are committed to creating an inclusive shopping experience for everyone, regardless of their abilities. We believe in bold representation and creating a future that empowers voice, choice, and ownership for all our customers and communities.
        </p>
        <p>
          We actively work to comply with accessibility standards, including the W3C's <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>, a set of internationally recognized guidelines for digital accessibility.
        </p>
        <p>
          Our goal is to provide an easy shopping experience, whether you are using assistive technologies, such as screen readers, magnifiers, voice recognition software, or video captions.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Ongoing Effort</h2>
        <p className="text-gray-700 leading-relaxed">
          We recognize that digital accessibility is an ongoing process. Our team and partners audit, review, and evaluate our efforts as we move forward in our journey. We are consistently looking for improvements in the performance, accessibility, and efficiency of our digital experience.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className="text-gray-700 leading-relaxed">
          If you are having issues using or accessing any part of our site, please call our customer support team at <strong>+1 (347) 327-6851</strong> for immediate assistance.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <p className="text-gray-700 leading-relaxed">
          Please contact us at{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>{' '}
          if you have any feedback or suggestions as we aim to find ways to improve the accessibility of our site.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Accessibility Tools</h2>
        <p className="text-gray-700 leading-relaxed">
          In partnership with industry-leading accessibility experts, Bills Collection offers digital tools to help our customers access our site more easily and effectively.
        </p>
      </div>
    </div>
  );
}