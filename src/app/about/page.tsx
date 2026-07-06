export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">About Bills Collection</h1>
      
      <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
        <p>
          Welcome to Bills Collection. We are a dedicated team focused on bringing 
          quality, style, and unique designs to your wardrobe. Our mission is to 
          provide clothing that balances modern aesthetics with everyday comfort.
        </p>

        <p>
          Founded with a passion for creative expression, Bills Collection was born 
          out of a desire to create pieces that tell a story. Whether you are looking 
          for your next favorite outfit or timeless essentials, we strive to ensure 
          that every item in our catalog meets the highest standards.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2">
          <li>Quality craftsmanship in every garment.</li>
          <li>Unique designs you won't find anywhere else.</li>
          <li>Customer-focused service and support.</li>
        </ul>
      </div>
    </div>
  );
}