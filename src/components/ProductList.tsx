import { Link, useSearchParams } from 'react-router-dom';

const rawProducts = [
  { id: "white-tee", name: "Classic White Tee", price: 100, type: "T-Shirt", color: "white", description: "", images: ["/white1.png", "/white2.png"] },
  { id: "black-tee", name: "Classic Black Tee", price: 100, type: "T-Shirt", color: "black", description: "", images: ["/black1.png", "/black2.png"] },
  { id: "signature-hoodie", name: "Signature Hoodie", price: 250, type: "Hoodie", color: "black", description: "", images: ["/hoodie1.png", "/hoodie2.png"] },
];

const ProductList = () => {
    const [searchParams] = useSearchParams();

    // Grab current filters from the URL
    const typeParam = searchParams.get("type");
    const minParam = searchParams.get("min");
    const maxParam = searchParams.get("max");
    const colorParam = searchParams.get("color");
    const sortParam = searchParams.get("sort");

    // Apply the filters to our product data
    let filteredProducts = [...rawProducts];

    if (typeParam) filteredProducts = filteredProducts.filter(p => p.type === typeParam);
    if (colorParam) filteredProducts = filteredProducts.filter(p => p.color === colorParam);
    if (minParam) filteredProducts = filteredProducts.filter(p => p.price >= Number(minParam));
    if (maxParam) filteredProducts = filteredProducts.filter(p => p.price <= Number(maxParam));

    if (sortParam === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
    if (sortParam === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);

    // If all products get filtered out, show a nice message
    if (filteredProducts.length === 0) {
        return <div className="w-full text-center text-gray-500 py-12">No products match your filters.</div>;
    }

    return (
        <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
            {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] group'>
                    <div className='relative w-full h-80 bg-gray-50 rounded-md p-4 flex items-center justify-center overflow-hidden'>
                        <img 
                            src={product.images[0]} 
                            alt={`${product.name} front`} 
                            className='absolute inset-0 p-4 w-full h-full object-contain z-10 hover:opacity-0 transition-opacity duration-500'
                        />
                        <img 
                            src={product.images[1]} 
                            alt={`${product.name} back`} 
                            className='absolute inset-0 p-4 w-full h-full object-contain'
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-medium'>{product.name}</span>
                        <span className='font-medium'>${product.price}</span>
                    </div>
                    <div className='text-sm text-gray-500'>{product.description}</div>
                    <button 
                        className='rounded-2xl ring-1 ring-black text-black w-max py-2 px-4 text-xs hover:bg-black hover:text-white transition-colors'
                        onClick={(e) => {
                            e.preventDefault(); 
                            console.log(`Added ${product.name} to cart`);
                        }}
                    >
                        Add to Cart
                    </button>
                </Link>
            ))}
        </div>
    )
}

export default ProductList;