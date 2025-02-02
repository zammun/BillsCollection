import Navbar from "@/components/Navbar";
import Image from "next/legacy/image";
import React from "react";
import Slider from "@/components/Slider";
import ProductList from "@/components/ProductList";
import CategoryList from "@/components/CategoryList";
import Filter from "@/components/Filter";

const HomePage = () =>{
  return (     
    <div className=''><Slider />
    <div className=''><Filter /></div>
    <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'><h1 className='text-2xl'>Featured Products</h1><ProductList /></div>
    <div className='mt-24'><h1 className='text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12'>Categories</h1><CategoryList /></div>
    <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'><h1 className='text-2xl'>Featured Products</h1><ProductList /></div>
    </div>
         /* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
           Replace with your product components 
          <div className="bg-white p-10 rounded-lg shadow-md">
            <Image src="/product.png" alt="Product Image" width={500} height={500} />
            <h2 className="mt-4 text-2xl font-bold">Product Name</h2>
            <p className="mt-2 text-gray-600">Product Description</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
           Repeat for each product 
        </section> */ 
  )
}

export default HomePage