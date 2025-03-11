import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmData, setFilmData] = useState(null);

  const contextValue = { selectedFilm, setSelectedFilm, filmData, setFilmData };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
