import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, totalResults }) => {
  return (
    <div className="space-y-2">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
        <input 
          type="text"
          placeholder="Search by name or email..."
          className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl w-full md:w-96 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className="text-sm text-gray-500 ml-1">
        Found <span className="font-semibold text-blue-600">{totalResults}</span> users
      </p>
    </div>
  );
};

export default SearchBar;