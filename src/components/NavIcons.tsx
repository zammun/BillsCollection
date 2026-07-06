"use client";

import Image from "next/legacy/image";
import Link from 'next/link';
import { useState } from 'react';
import CartModal from './CartModal';
import LoginModal from "./LoginModal";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const isLoggedIn = false;

    const handleProfile = () => {
        if (isProfileOpen || isLoginOpen) {
            setIsProfileOpen(false);
            setIsLoginOpen(false);
        } else {
            setIsCartOpen(false);
            if (!isLoggedIn) {
                setIsLoginOpen(true);
            } else {
                setIsProfileOpen(true);
            }
        }
    };

    const handleCart = () => {
        if (isCartOpen) {
            setIsCartOpen(false);
        } else {
            setIsLoginOpen(false);
            setIsProfileOpen(false);
            setIsCartOpen(true);
        }
    };

    return (
        <div className='flex items-center gap-4 xl:gap-6 relative'>
            <Image 
                id="profile-icon"
                src='/profile.png' 
                alt='Profile' 
                width={22} 
                height={22} 
                className="cursor-pointer"
                onClick={handleProfile}
            />
            
            {isLoginOpen && !isLoggedIn && (
                <LoginModal onClose={() => setIsLoginOpen(false)} />
            )}

            {isProfileOpen && isLoggedIn && (
                <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
                    <Link href='/profile'>Profile</Link>
                    <div className='mt-2 cursor-pointer'>Logout</div>
                </div>
            )}

            <Image 
                src='/notification.png' 
                alt='Notifications' 
                width={22} 
                height={22} 
                className="cursor-pointer"
            />
            
            <div id="cart-icon" className='relative cursor-pointer' onClick={handleCart}>
                <Image src='/cart.png' alt='Cart' width={22} height={22} />
                <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>2</div>
            </div>
            
            {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
        </div>
    );
};

export default NavIcons;