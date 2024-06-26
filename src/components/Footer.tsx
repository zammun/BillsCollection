import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24'>
            {/* Top */}
            <div className='flex justify-between gap-24'>
                {/* Left */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <Link href='/'> 
                        <div className='text-2xl tracking-wide'>Bills Collection</div>
                    </Link>
                    <p>365 Carteret Avenue, Carteret, New Jersey, USA</p>
                    <span className='font-semibold '>contact@billscollection.co</span>
                    <span className='font-semibold'>+1 (347) 327-6851</span>
                    <div className='flex gap-6'>
                        <Image src='/facebook.png' alt='' width={16} height={16} />
                        <Image src='/instagram.png' alt='' width={16} height={16} />
                        <Image src='/x.png' alt='' width={16} height={16} />
                    </div>
                </div>
                {/* Center */}
                <div className='hidden lg:flex justify-between w-1/2'></div>
                {/* Right */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                <h1>SUBSCRIBE</h1>
                </div>
            </div>
            {/* Bottom */}
            <div className=''></div>
        </div>
    )
}

export default Footer