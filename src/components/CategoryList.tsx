import Link from "next/link"
import Image from "next/image"


const CategoryList = () => {
    return (
        <div className='px-4 overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-4 md:gap-8'>
                <Link href='/list?cat=test' className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                    <div className='relative bg-slate-100 w-full h-96'>
                        <Image src='/10.jpg' alt='' fill sizes='20vw' className='object-cover'/>
                    </div>
                        <h1 className='mt-8 font-light text-cl tracking-wide'>Category Name</h1>
                </Link>
                <Link href='/list?cat=test' className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                    <div className='relative bg-slate-100 w-full h-96'>
                        <Image src='/9.jpg' alt='' fill sizes='20vw' className='object-cover'/>
                    </div>
                        <h1 className='mt-8 font-light text-cl tracking-wide'>Category Name</h1>
                </Link>
                <Link href='/list?cat=test' className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                    <div className='relative bg-slate-100 w-full h-96'>
                        <Image src='/5.jpg' alt='' fill sizes='20vw' className='object-cover'/>
                    </div>
                        <h1 className='mt-8 font-light text-cl tracking-wide'>Category Name</h1>
                </Link>
                <Link href='/list?cat=test' className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                    <div className='relative bg-slate-100 w-full h-96'>
                        <Image src='/11.jpg' alt='' fill sizes='20vw' className='object-cover'/>
                    </div>
                        <h1 className='mt-8 font-light text-cl tracking-wide'>Category Name</h1>
                </Link>
            </div>
        </div>
    )
}

export default CategoryList