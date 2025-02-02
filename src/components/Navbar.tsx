'use client';
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/legacy/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-slate-600 z-50'> {/* Added z-index */}
            {/* Mobile */}
            <div className='h-full flex items-center justify-between md:hidden'>
                <Link href='/'>
                    <div className='text-2xl tracking-wide text-white'>Bills Collection</div>
                </Link>
                <Menu />
            </div>
            {/* Bigger Screens */}
            <div className='hidden md:flex items-center justify-between gap-8 h-full'>
                {/* Left */}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link href='/' className='flex items-center gap-3'>
                        <Image src='/logo.png' alt='' width={24} height={24} />
                        <div className='text-2xl tracking-wide text-white'>Bills Collection</div>
                    </Link>
                    <div className='hidden xl:flex gap-4 text-white'>
                        <Link href='/'>Home</Link>
                        <div className='relative' ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className='focus:outline-none text-white'
                            >
                                Categories
                            </button>
                            {dropdownOpen && (
                                <div className='absolute mt-2 w-48 bg-slate-500 shadow-lg rounded-md z-50'> {/* Added z-index */}
                                    <Link href='/categories/shirts' className='block px-4 py-2 text-white hover:bg-gray-400'>Shirts</Link>
                                    <Link href='/categories/pants' className='block px-4 py-2 text-white hover:bg-gray-400'>Pants</Link>
                                    <Link href='/categories/hoodies' className='block px-4 py-2 text-white hover:bg-gray-400'>Hoodies</Link>
                                    <Link href='/categories/accessories' className='block px-4 py-2 text-white hover:bg-gray-400'>Accessories</Link>
                                </div>
                            )}
                        </div>
                        <Link href='/contact'>Contact</Link>
                    </div>
                </div>
                {/* Right */}
                <div className='flex-grow flex items-center justify-between gap-8'>
                    <div className='flex-grow'>
                        <SearchBar />
                    </div>
                    <NavIcons />
                </div>
            </div>
        </div>
    );
};

export default Navbar;