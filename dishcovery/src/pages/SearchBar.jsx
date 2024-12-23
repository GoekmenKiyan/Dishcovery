import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query, cuisine }); // Übergibt Suchtext und Küche
    }
  };

  const handleCuisineFilter = (selectedCuisine) => {
    setCuisine(selectedCuisine);
    onSearch({ query, cuisine: selectedCuisine }); // Führt die Suche direkt mit dem ausgewählten Filter aus
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Suchfeld */}
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="border p-2 rounded w-80"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Küchen-Buttons */}
      <div className="flex gap-4 mt-4">
        {['American', 'Chinese', 'Indian', 'Mexican'].map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => handleCuisineFilter(cuisine)}
            className="px-4 py-2 bg-gray-300 hover:bg-blue-500 hover:text-white text-gray-700 rounded"
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
