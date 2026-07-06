"use client";

import Image from "next/legacy/image";
import Link from 'next/link';
import { useState } from 'react';

const Menu = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <Image 
                src="/menu.png" 
                alt="Menu" 
                width={28} 
                height={28} 
                className="cursor-pointer" 
                onClick={() => setOpen((prev) => !prev)} 
            />
            {open && (
                <div className='absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-[999]'>
                    {/* Added onClick={() => setOpen(false)} to all links */}
                    <Link href='/' onClick={() => setOpen(false)}>Home</Link>
                    <Link href='/about' onClick={() => setOpen(false)}>About</Link>
                    <Link href='/contact' onClick={() => setOpen(false)}>Contact</Link>
                    <Link href='/' onClick={() => setOpen(false)}>Logout</Link>
                    <Link href='/cart' onClick={() => setOpen(false)}>Cart(1)</Link>
                </div>
            )}
        </div>
    );
};

export default Menu;