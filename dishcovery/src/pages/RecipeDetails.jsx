import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeDetails({ recipeId, onBack }) {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      setRecipeDetails(response.data);
    };
    fetchDetails();
  }, [recipeId]);

  if (!recipeDetails) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{recipeDetails.title}</h1>
      <img
        src={recipeDetails.image}
        alt={recipeDetails.title}
        className="w-full rounded mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions</h2>
      <p>{recipeDetails.instructions || 'No instructions available.'}</p>
    </div>
  );
}

export default RecipeDetails;
