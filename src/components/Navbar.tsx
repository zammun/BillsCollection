import Link from "next/link"
import Menu from "./Menu"
import Image from "next/legacy/image"
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const Navbar = () => {
    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative' style={{backgroundColor: '#f6f0e8'}}>
            {/* Mobile */}
            <div className='h-full flex items-center justify-between md:hidden'>
                <Link href='/'>
                    <div className='text-2xl tracking-wide'>Bills Collection</div>
                </Link>
                <Menu />
            </div>
        {/* Bigger Screens */}
        <div className='hidden md:flex items-center justify-between gap-8 h-full'>
            {/* Left */}
            <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                <Link href='/' className='flex items-center gap-3'>
                    <Image src='/logo.png' alt='' width={24} height={24} />
                <div className='text-2xl tracking-wide'>Bills Collection</div>
                </Link>
                <div className='hidden xl:flex gap-4'>
                    <Link href='/'>Home</Link>
                    <Link href='/about'>About</Link>
                    <Link href='/contact'>Contact</Link>
                    </div>
            </div>
            {/* Right */}
            <div className='w-2/3 xl:w-12 flex items-center justify-between gap-8'></div>
            <SearchBar />
            <NavIcons />
        </div>
        </div>
    );
};

export default Navbar;