import React, { useState } from 'react';
import SearchBar from './pages/SearchBar';
import SearchResults from './pages/SearchResults';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  const [view, setView] = useState('search');
  const [query, setQuery] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Aktualisiert die Suchanfrage
    setView('search'); // Wechselt zur Suchseite
  };

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
    setView('details'); // Wechselt zur Detailansicht
  };

  const handleBack = () => {
    setView('search'); // Wechselt zurück zur Suche
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header mit einer einzigen Suchleiste */}
      <header className="bg-white shadow p-4">
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Dynamischer Bereich */}
      <main className="p-4">
        {view === 'search' && (
          <SearchResults query={query} onRecipeSelect={handleRecipeSelect} />
        )}
        {view === 'details' && (
          <RecipeDetails recipeId={selectedRecipeId} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;
