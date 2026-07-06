import { useState } from 'react';
import CartModal from './CartModal';

interface NavIconsProps {
  onProfileClick: () => void;
}

const NavIcons = ({ onProfileClick }: NavIconsProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      {/* Trigger the Navbar's UserMenu via the prop */}
      <img 
        src='/profile.png' 
        alt='Profile' 
        width={22} 
        height={22} 
        className="cursor-pointer"
        onClick={onProfileClick}
      />
      
      <img 
        src='/notification.png' 
        alt='Notifications' 
        width={22} 
        height={22} 
        className="cursor-pointer"
      />
      
      <div className='relative cursor-pointer' onClick={handleCart}>
        <img src='/cart.png' alt='Cart' width={22} height={22} />
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>2</div>
      </div>
      
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavIcons;