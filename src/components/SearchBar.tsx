import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        if (name) {
            navigate(`/list?name=${name}`);
        }
    };

    return (
        <form className='flex items-center justify-between gap-4 bg-gray-300 p-2 rounded-md w-full' onSubmit={handleSearch}>
            <input
                type='text'
                name='name'
                placeholder="Search"
                className="flex-1 bg-transparent outline-none w-full"
            />
            <button type='submit' className='cursor-pointer'>
                <img src='/search.png' alt='Search' width={16} height={16} />
            </button>
        </form>
    )
}

export default SearchBar;