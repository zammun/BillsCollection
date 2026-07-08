import { useRef, useEffect } from 'react';
import CartModal from './CartModal';
import { useCartStore } from '../store/useCartStore';

interface NavIconsProps {
  onProfileClick: (e: React.MouseEvent) => void;
  isProfileOpen: boolean;
  onCartClick: (e: React.MouseEvent) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const NavIcons = ({ 
  onProfileClick, 
  onCartClick, 
  isCartOpen, 
  setIsCartOpen 
}: NavIconsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCartOpen(false); 
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCartOpen]);

  return (
    // Added shrink-0 here
    <div ref={containerRef} className='flex items-center gap-4 xl:gap-6 relative shrink-0'>
      <img 
        src='/profile.png' 
        alt='Profile' 
        width={22} 
        height={22} 
        className="cursor-pointer shrink-0" 
        id="profile-icon" 
        onClick={onProfileClick} 
      />
      
      <img 
        src='/notification.png' 
        alt='Notifications' 
        width={22} 
        height={22} 
        className="cursor-pointer shrink-0" 
      />
      
      {/* Added shrink-0 here so the wrapper never compresses */}
      <div className='relative cursor-pointer shrink-0' onClick={onCartClick}>
        <img 
          src='/cart.png' 
          alt='Cart' 
          width={22} 
          height={22} 
          className="shrink-0"
        />
        
        {totalItemsInCart > 0 && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {totalItemsInCart}
          </div>
        )}
      </div>
      
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavIcons;