import Navbar from "@/components/Navbar";
import Image from "next/legacy/image";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="bg-slate-50">
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold">Welcome to Bill's Collection</h1>
          <p className="mt-4 text-lg">Discover our latest collection of clothing. Quality, style, and unique designs.</p>
          <div className="relative h-screen w-full"> {/* Adjust the height as needed */}
            <Image src="" alt="Main Image" layout="fill" objectFit="cover" />
          </div>
          <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
          {/* Replace with your product components */}
          <div className="bg-white p-10 rounded-lg shadow-md">
            <Image src="/product.png" alt="Product Image" width={500} height={500} />
            <h2 className="mt-4 text-2xl font-bold">Product Name</h2>
            <p className="mt-2 text-gray-600">Product Description</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
          {/* Repeat for each product */}
        </section>
      </div>
    </div>
  );
}