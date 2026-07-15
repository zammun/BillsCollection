import { Link } from 'react-router-dom';

export default function StoresPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Store Locations</h1>
      
      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          Currently, Bills Collection operates exclusively online. We do not have any physical retail storefronts or pop-up locations at this time.
        </p>
        <p>
          Operating as a digital-first brand allows us to focus our resources on delivering high-quality, premium products directly to your doorstep while maintaining a streamlined and accessible online shopping experience for our global community.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Where to Shop</h2>
        <p className="text-gray-700 leading-relaxed">
          Our complete catalog of apparel and collections is available 24/7 right here on our official website. We offer fast, reliable standard shipping to ensure you get your gear no matter where you are.{' '}
          <Link to="/" className="text-indigo-600 hover:underline font-medium">
            Browse our latest arrivals here.
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-700 leading-relaxed">
          Even without a physical storefront, our team is always here to assist you with sizing, orders, or any other questions. Please feel free to reach out to our customer support team at{' '}
          <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">
            contact@billscollection.co
          </a>{' '}
          or call us at <strong>+1 (347) 327-6851</strong> for immediate assistance.
        </p>
      </div>
    </div>
  );
}