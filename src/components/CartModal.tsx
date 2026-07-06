"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const CartModal = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;

            // If the click is on the cart icon itself, ignore it here 
            // so that NavIcons can handle the toggle natively.
            if (target.closest('#cart-icon')) {
                return;
            }

            // If the click is outside the modal, close it.
            if (modalRef.current && !modalRef.current.contains(target)) {
                onClose();
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const cartItems = true;

    return (
        <div ref={modalRef} className='w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20'>
            {!cartItems ? (
                <div className='text-center'>No items in cart</div>
            ) : (
                <>
                <h2 className='text-xl'>Shopping Cart</h2>
                <div className='flex flex-col gap-8'>
                    <div className='flex gap-4'>
                        <Image src='/product.png' alt='Product' width={72} height={96} className='object-cover rounded-md'/>
                        <div className='flex flex-col justify-between w-full'>
                            <div>
                                <h3 className='font-semibold'>Product Name</h3>
                                <div className='p-1 bg-gray-50 rounded-sm'>$49</div>
                            </div>
                            <div className='text-sm text-gray-500'>Available</div>
                            <div className='flex justify-between text-sm'>
                                <span className='text-gray-500'>Qty. 2</span>
                                <span className='text-blue-500 cursor-pointer'>Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between font-semibold'>
                        <span>Subtotal</span>
                        <span>$49</span>
                    </div>
                    <p className='text-gray-500 text-sm mt-2 mb-4'>Shipping and taxes calculated at checkout</p>
                    
                    <div className='flex justify-between text-sm'>
                        <Link href="/cart" onClick={onClose}>
                            <button className='rounded-md py-3 px-4 ring-1 ring-gray-300'>
                                View Cart
                            </button>
                        </Link>
                        
                        <Link href="/checkout" onClick={onClose}>
                            <button className='rounded-md py-3 px-4 bg-black text-white'>
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default CartModal;