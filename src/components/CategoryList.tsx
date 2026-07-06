import { Link } from 'react-router-dom';

const CategoryList = () => {
    return (
        <div className='px-4 overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-4 md:gap-8'>
                {[
                    { src: '/10.jpg', name: 'Category Name' },
                    { src: '/9.jpg', name: 'Category Name' },
                    { src: '/5.jpg', name: 'Category Name' },
                    { src: '/11.jpg', name: 'Category Name' },
                ].map((cat, index) => (
                    <Link 
                        key={index} 
                        to='/list?cat=test' 
                        className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'
                    >
                        <div className='relative bg-slate-100 w-full h-96'>
                            <img 
                                src={cat.src} 
                                alt={cat.name} 
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <h1 className='mt-8 font-light text-cl tracking-wide'>{cat.name}</h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList;