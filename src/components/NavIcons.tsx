import { useRef, useEffect, useState } from 'react';
import CartModal from './CartModal';
import NotificationModal from './NotificationModal';
import { useCartStore } from '../store/useCartStore';

interface NavIconsProps {
  onProfileClick: (e: React.MouseEvent) => void;
  isProfileOpen: boolean;
  onCartClick: (e: React.MouseEvent) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  onNotificationClick: (e: React.MouseEvent) => void;
  setIsNotificationOpen: (open: boolean) => void;
  isScrolled?: boolean; // 👈 Fixes the TypeScript error
}

const NavIcons = ({ 
  onProfileClick, 
  onCartClick, 
  isCartOpen, 
  setIsCartOpen,
  isNotificationOpen,
  onNotificationClick,
  setIsNotificationOpen,
  isScrolled // 👈 Destructure it here
}: NavIconsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCartOpen(false); 
        setIsNotificationOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCartOpen, setIsNotificationOpen]);

  useEffect(() => {
    if (totalItemsInCart === 0) return;
    setShouldAnimate(true);
    const handler = setTimeout(() => setShouldAnimate(false), 300);
    return () => clearTimeout(handler);
  }, [totalItemsInCart]);

  // CSS class to invert black PNGs to white when at the top of the page
  const iconFilter = !isScrolled ? "invert brightness-200" : ""; 

  return (
    <div ref={containerRef} className='flex items-center gap-4 xl:gap-6 relative shrink-0'>
      <style>{`
        @keyframes cartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        .animate-bubble-pop {
          animation: cartPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <img 
        src='/profile.png' 
        alt='Profile' 
        width={22} 
        height={22} 
        className={`cursor-pointer shrink-0 transition-all duration-300 ${iconFilter}`} 
        id="profile-icon" 
        onClick={onProfileClick} 
      />
      
      <div 
        className="cursor-pointer shrink-0 relative" 
        onClick={onNotificationClick}
      >
        <img 
          src='/notification.png' 
          alt='Notifications' 
          width={22} 
          height={22} 
          className={`shrink-0 transition-all duration-300 ${iconFilter}`} 
        />
      </div>
      
      <div className='relative cursor-pointer shrink-0 py-1' onClick={onCartClick}>
        <img 
          src='/cart.png' 
          alt='Cart' 
          width={22} 
          height={22} 
          className={`shrink-0 transition-all duration-300 ${iconFilter}`}
        />
        
        {totalItemsInCart > 0 && (
          <div className={`absolute -top-3.5 -right-3.5 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-[11px] font-bold flex items-center justify-center select-none shadow-sm transition-all
            ${shouldAnimate ? 'animate-bubble-pop' : ''}`}
          >
            {totalItemsInCart}
          </div>
        )}
      </div>
      
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </div>
  );
};

export default NavIcons;