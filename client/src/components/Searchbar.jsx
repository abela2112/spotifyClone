import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  return (
    <form autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600" onSubmit={handleSubmit}>
      <label htmlFor="search-field" className="sr-only">search all songs</label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className='w-5 h-5 ml-4' />
        <input type="search"
          name='search-field'
          id='search-field'
          placeholder='search'
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
          className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4' />
      </div>
    </form>
  )
};

export default Searchbar;
