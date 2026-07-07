import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    throw new Error('You are already subscribed!');
                }
                throw error;
            }

            setStatus('success');
            setMessage('Thanks for subscribing!');
            setEmail('');
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Failed to subscribe. Try again.');
        }
    };

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
                    <span className='font-semibold'>contact@billscollection.co</span>
                    <span className='font-semibold'>+1 (347) 327-6851</span>
                    <div className='flex gap-6'>
                        <a href="https://instagram.com/billscollection.co" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <img src='/instagram.png' alt='Instagram' width={16} height={16} />
                        </a>
                        <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <img src='/x.png' alt='X' width={16} height={16} />
                        </a>
                        <a href="https://tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <img src='/tiktok.png' alt='TikTok' width={16} height={16} />
                        </a>
                        <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                            <img src='/facebook.png' alt='Facebook' width={16} height={16} />
                        </a>
                    </div>
                </div>
                
                {/* Center */}
                <div className='hidden lg:flex justify-start gap-24 w-1/2'> 
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>COMPANY</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">About Us</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Careers</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Affiliates</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>SHOP</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">New Arrivals</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Accessories</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">All Products</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>HELP</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Customer Service</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">My Account</Link>
                            <Link to='/' className="hover:text-indigo-600 transition-colors">Find a Store</Link>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <h1 className='font-medium text-lg'>SUBSCRIBE</h1>
                    <p>
                        Be the first to get updates and offers from Bills Collection, and teasers about our latest designs.
                    </p>
                    
                    {/* Newsletter Form */}
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSubscribe} className='flex w-full'>
                            <input 
                                type='email' 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                placeholder='Email address' 
                                className='p-4 w-3/4 outline-none border border-transparent focus:border-gray-300 disabled:opacity-50 transition-colors' 
                            />
                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className='w-1/4 bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-70 transition-colors cursor-pointer'
                            >
                                {status === 'loading' ? '...' : 'JOIN'}
                            </button>
                        </form>
                        {status === 'success' && <p className="text-sm text-green-600 font-medium">{message}</p>}
                        {status === 'error' && <p className="text-sm text-red-600 font-medium">{message}</p>}
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
                <div className=''>© {new Date().getFullYear()} Bills Collection</div>
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
    );
};

export default Footer;