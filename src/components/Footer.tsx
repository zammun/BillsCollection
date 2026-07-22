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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='relative py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-[#D9D7D0] text-sm mt-24'>
            
            {/* Top Section */}
            <div className='flex flex-col md:flex-row justify-between gap-24'>
                {/* Left */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <Link to='/'> 
                        <div className='text-2xl font-black tracking-tight text-slate-900 font-heading'>Bills Collection</div>
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
                
                {/* Center (Desktop Only - Cleaned up to 2 balanced sections) */}
                <div className='hidden lg:flex justify-start gap-24 w-1/2'> 
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>COMPANY</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/about' className="hover:text-indigo-600 transition-colors">About Us</Link>
                            <Link to='/careers' className="hover:text-indigo-600 transition-colors">Careers</Link>
                            <Link to='/affiliates' className="hover:text-indigo-600 transition-colors">Affiliates</Link>
                            <Link to='/contact' className="hover:text-indigo-600 transition-colors">Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-medium text-lg'>HELP</h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/contact' className="hover:text-indigo-600 transition-colors">Customer Service</Link>
                            <Link to='/profile' className="hover:text-indigo-600 transition-colors">My Account</Link>
                            <Link to="/track-order" className="hover:text-indigo-600 transition-colors">Track Order</Link>
                            <Link to='/stores' className="hover:text-indigo-600 transition-colors">Find a Store</Link>
                            <Link to='/tech-support' className="hover:text-indigo-600 transition-colors">Technical Support</Link>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <h1 className='font-medium text-lg'>SUBSCRIBE</h1>
                    <p>Be the first to get updates and offers from Bills Collection, and teasers about our latest designs.</p>
                    
                    {/* Newsletter Form */}
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSubscribe} className='flex w-full rounded-xl overflow-hidden border border-slate-300/40'>
                            <input 
                                type='email' 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                placeholder='Email address' 
                                className='p-4 w-3/4 bg-white text-slate-800 outline-none disabled:opacity-50 transition-colors text-xs' 
                            />
                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className='w-1/4 bg-black text-white font-semibold text-xs hover:bg-gray-800 disabled:opacity-70 transition-colors cursor-pointer'
                            >
                                {status === 'loading' ? '...' : 'JOIN'}
                            </button>
                        </form>
                        {status === 'success' && <p className="text-sm text-green-600 font-medium">{message}</p>}
                        {status === 'error' && <p className="text-sm text-red-600 font-medium">{message}</p>}
                    </div>

                    <span className='font-semibold'>Secure Payments</span>
                    <div className='flex justify-between max-w-[200px] gap-2'>
                        <img src='/visa.png' alt='Visa' width={40} height={20} className="object-contain" />
                        <img src='/mastercard.png' alt='Mastercard' width={40} height={20} className="object-contain" />
                        <img src='/paypal.png' alt='Paypal' width={40} height={20} className="object-contain" />
                        <img src='/discover.png' alt='Discover' width={40} height={20} className="object-contain" />
                        <img src='/skrill.png' alt='Skrill' width={40} height={20} className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Mobile Technical Support Callout Button */}
            <div className="flex lg:hidden justify-center w-full mt-12">
                <Link
                    to="/tech-support"
                    className="w-full max-w-xs py-3.5 px-6 bg-slate-900 text-white text-xs font-bold tracking-wide uppercase rounded-xl shadow-xs hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2 border border-slate-800"
                >
                    Technical Support
                </Link>
            </div>
            
            {/* Sub-Footer: Legal & Compliance */}
            <div className='mt-12 pt-8 border-t border-slate-300/60 flex flex-col gap-6 text-xs text-slate-500/80'>
                
                {/* Legal Links (Row 1) */}
                <div className='flex flex-wrap justify-center gap-x-3 gap-y-3'>
                    <Link to='/privacypolicy' className='hover:text-gray-900 transition-colors'>Privacy Notice</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/cookie-preferences' className='hover:text-gray-900 transition-colors'>Cookie Preferences</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/interest-based-ads' className='hover:text-gray-900 transition-colors'>Interest Based Ads</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/california-privacy-rights' className='hover:text-gray-900 transition-colors'>CA Privacy Rights</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/donotsell' className='hover:text-gray-900 transition-colors'>Do Not Sell or Share My Personal Information</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/tos' className='hover:text-gray-900 transition-colors'>Terms of Service</Link>
                </div>
                
                {/* Legal Links (Row 2) */}
                <div className='flex flex-wrap justify-center gap-x-3 gap-y-3 mt-1'>
                    <Link to='/supply-chain-transparency' className='hover:text-gray-900 transition-colors'>CA Transparency in Supply Chains</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/pricingpolicy' className='hover:text-gray-900 transition-colors'>Pricing Policy</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/accessibility' className='hover:text-gray-900 transition-colors'>Accessibility</Link>
                    <span className='hidden md:block'>|</span>
                    <Link to='/legalnotice' className='hover:text-gray-900 transition-colors'>Legal Notice</Link>
                </div>

                {/* Copyright & Localization */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 mt-4'>
                    <div className='text-center md:text-left'>
                        © {new Date().getFullYear()} Bills Collection. All rights reserved. Request our <a href="mailto:contact@billscollection.co" className='underline hover:text-gray-900'>corporate name & address by email.</a>
                    </div>
                    
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 items-center'>
                        <div className='flex items-center gap-2'>
                            <span>Language:</span>
                            <span className='font-medium text-gray-900'>US | EN</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Currency:</span>
                            <span className='font-medium text-gray-900'>USD</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button 
                onClick={scrollToTop}
                className='fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-white text-black p-3 rounded-full shadow-lg ring-1 ring-gray-200/60 hover:bg-gray-50 transition-all hover:-translate-y-1 z-50 flex items-center justify-center cursor-pointer'
                aria-label="Scroll to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </button>
        </div>
    );
};

export default Footer;