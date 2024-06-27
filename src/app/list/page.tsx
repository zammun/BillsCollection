import Link from "next/link"
import Image from "next/image"
import Filter from "@/components/Filter"
import ProductList from "@/components/ProductList"

const ListPage = () => {
    return (
        <div className='px-4 md:px-8 lg:px-15 xl:px-32 2xl:px-64 relative'>
            {/* Campaign */}
            <div className='hidden sm:flex bg-pink-50 px-4 justify-between h-64'>
                <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
                    <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>Pay 100% on every product no sales buddy</h1>
                    <button className='rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm'>Buy Now</button>
                </div>
                <div className='relative w-1/3'>
                    <Image src='/11.jpg' alt='' fill className='object-contain' />
                </div>
            </div>
            {/* Filter */}
            <Filter />
            {/* Product List */}
            <h1 className='mt-12 text-xl font-semibold '>Shirts For You</h1>
            <ProductList />
        </div>
    )
}

export default ListPage