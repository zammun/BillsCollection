import { useState, useRef, useEffect } from 'react';
import CartModal from './CartModal';

interface NavIconsProps {
  onProfileClick: () => void;
  isProfileOpen: boolean;
}

const NavIcons = ({ onProfileClick, isProfileOpen }: NavIconsProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Dedicated, conflict-free click-outside listener just for the Cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCartOpen(false); // Force close cart without relying on stale state
      }
    };
    
    // Using mousedown is more reliable than click for closing dropdowns
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Empty dependency array ensures this listener never goes stale

  const handleCart = () => {
    const nextCartState = !isCartOpen;
    setIsCartOpen(nextCartState);
    
    // If we are opening the cart, and profile is open, close the profile
    if (nextCartState && isProfileOpen) {
      onProfileClick();
    }
  };

  const handleProfile = () => {
    // If we are opening the profile, and cart is open, close the cart
    if (!isProfileOpen && isCartOpen) {
      setIsCartOpen(false);
    }
    onProfileClick();
  };

  return (
    <div ref={containerRef} className='flex items-center gap-4 xl:gap-6 relative'>
      <img src='/profile.png' alt='Profile' width={22} height={22} className="cursor-pointer" onClick={handleProfile} />
      
      <img src='/notification.png' alt='Notifications' width={22} height={22} className="cursor-pointer" />
      
      <div className='relative cursor-pointer' onClick={handleCart}>
        <img src='/cart.png' alt='Cart' width={22} height={22} />
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
          2
        </div>
      </div>
      
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavIcons;