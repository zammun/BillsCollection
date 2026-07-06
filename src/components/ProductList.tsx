import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
            {[1, 2, 3, 4].map((item) => (
                <Link key={item} to='/test' className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
                    <div className='relative w-full h-80'>
                        <img 
                            src='/3.jpg' 
                            alt='Product front' 
                            className='absolute w-full h-full object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500'
                        />
                        <img 
                            src='/4.jpg' 
                            alt='Product back' 
                            className='absolute w-full h-full object-cover rounded-md'
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-medium'>Product Name</span>
                        <span className='font-medium'>$100</span>
                    </div>
                    <div className='text-sm text-gray-500'>Product Description</div>
                    <button className='rounded-2xl ring-1 ring-black text-black w-max py-2 px-4 text-xs hover:bg-black hover:text-white'>
                        Add to Cart
                    </button>
                </Link>
            ))}
        </div>
    )
}

export default ProductList;