import React, { useState } from 'react';
import axios from 'axios';

function SearchPage({ onRecipeSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="border p-2 rounded w-1/2"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => onRecipeSelect(recipe.id)}
          >
            <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="text-lg font-bold">{recipe.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
