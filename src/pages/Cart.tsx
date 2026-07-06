const CartPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16">
      <h1 className="text-2xl font-semibold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col gap-8">
        {/* Cart Item Row */}
        <div className="flex gap-4 items-center">
          <div className="w-24 h-32 relative">
            <img src="/product.png" alt="Product" className="w-full h-full object-cover rounded-md"/>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <h3 className="font-semibold text-lg">Product Name</h3>
              <p className="text-sm text-gray-500">Color: Black | Size: M</p>
            </div>
            <div className="text-right">
              <div className="font-medium">$49</div>
              <button className="text-blue-500 text-sm mt-2">Remove</button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Totals Section */}
        <div className="flex flex-col items-end gap-4">
          <div className="flex justify-between w-full md:w-1/3">
            <span>Subtotal</span>
            <span className="font-semibold">$49</span>
          </div>
          <div className="flex justify-between w-full md:w-1/3">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>
          <hr className="w-full md:w-1/3 border-gray-200" />
          <div className="flex justify-between w-full md:w-1/3 text-lg font-bold">
            <span>Total</span>
            <span>$49</span>
          </div>
          <button className="w-full md:w-1/3 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;