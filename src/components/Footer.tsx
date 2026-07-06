import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24'>
            {/* Top */}
            <div className='flex flex-col md:flex-row justify-between gap-24'>
                {/* Left */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <Link to='/'> 
                        <div className='text-2xl tracking-wide'>Bills Collection</div>
                    </Link>
                    <p>365 Carteret Avenue, Carteret, New Jersey, USA</p>
                    <span className='font-semibold '>contact@billscollection.co</span>
                    <span className='font-semibold'>+1 (347) 327-6851</span>
                    <div className='flex gap-6'>
                        <a href="https://instagram.com/billscollection.co">
                            <img src='/instagram.png' alt='Instagram' width={16} height={16} />
                        </a>
                        <a href="https://x.com/yourhandle">
                            <img src='/x.png' alt='X' width={16} height={16} />
                        </a>
                        <a href="https://tiktok.com/@yourhandle">
                            <img src='/tiktok.png' alt='TikTok' width={16} height={16} />
                        </a>
                        <a href="https://facebook.com/yourhandle">
                            <img src='/facebook.png' alt='Facebook' width={16} height={16} />
                        </a>
                    </div>
                </div>
                
                {/* Center */}
                <div className='hidden lg:flex justify-start gap-24 w-1/2'> 
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>COMPANY</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to=''>About Us</Link>
                            <Link to=''>Careers</Link>
                            <Link to=''>Affiliates</Link>
                            <Link to=''>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>SHOP</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to=''>New Arrivals</Link>
                            <Link to=''>Accessories</Link>
                            <Link to=''>All Products</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>HELP</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to=''>Customer Service</Link>
                            <Link to=''>My Account</Link>
                            <Link to=''>Find a Store</Link>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <h1 className='font-medium text-lg'>SUBSCRIBE</h1>
                    <p>
                        Be the first to get updates and offers from Bills Collection, and teasers about our latest designs.
                    </p>
                    <div className='flex'>
                        <input type='text' placeholder='Email address' className='p-4 w-3/4' />
                        <button className='w-1/4 bg-black text-white'>JOIN</button>
                    </div>
                    <span className='font-semibold'>Secure Payments</span>
                    <div className='flex justify-between'>
                        <img src='/visa.png' alt='Visa' width={40} height={20} />
                        <img src='/mastercard.png' alt='Mastercard' width={40} height={20} />
                        <img src='/paypal.png' alt='Paypal' width={40} height={20} />
                        <img src='/discover.png' alt='Discover' width={40} height={20} />
                        <img src='/skrill.png' alt='Skrill' width={40} height={20} />
                    </div>
                </div>
            </div>
            
            {/* Bottom */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-16'>
                <div className=''>© 2024 Bills Collection</div>
                <div className='flex flex-col gap-8 md:flex-row'>
                    <div className=''>
                        <span className='text-gray-500 mr-4'>Language</span>
                        <span className='font-medium'>United States | English</span>
                    </div>
                    <div className=''>
                        <span className='text-gray-500 mr-4'>Currency</span>
                        <span className='font-medium'>USD</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;