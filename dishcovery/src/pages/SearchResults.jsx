import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LazyImage from '../components/LazyImage';

function SearchResults({ query, onRecipeSelect }) {
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { query: searchQuery, cuisine } = query || {};

  const fetchResults = async (additionalOffset = 0) => {
    if (!searchQuery && !cuisine) return;

    setLoading(true);

    try {
      const params = {
        query: searchQuery,
        cuisine,
        number: 10,
        offset: additionalOffset,
        apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
      };

      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        { params }
      );

      const newResults = response.data.results;

      setResults((prevResults) => [...prevResults, ...newResults]);
      setHasMore(newResults.length > 0);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setOffset(0);
    setHasMore(true);
    fetchResults(0);
  }, [searchQuery, cuisine]);

  const handleLoadMore = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchResults(newOffset);
  };

  return (
    <div>
      {/* Rezeptliste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => onRecipeSelect(recipe.id)}
          >
            <LazyImage
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32"
            />
            <h2 className="text-lg font-bold mt-2">{recipe.title}</h2>
          </div>
        ))}
      </div>

      {/* Spinner während des Ladens */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* "Load More"-Button */}
      {results.length > 0 && hasMore && !loading && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
