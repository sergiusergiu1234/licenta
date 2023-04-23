import { createContext, useState } from "react";

type FavoritesContextType = {
    favorites: number[];
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
  };
  
  export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    addToFavorites: () => {},
    removeFromFavorites: () => {},
  });
  
  export const FavoritesProvider: React.FC = ({ children}:any) => {
    const [favorites, setFavorites] = useState<number[]>([]);
  
    const addToFavorites = (id: number) => {
      if (!favorites.includes(id)) {
        setFavorites([...favorites, id]);
        localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
      }
    };
  
    const removeFromFavorites = (id: number) => {
      setFavorites(favorites.filter((favId) => favId !== id));
      localStorage.setItem('favorites', JSON.stringify(favorites.filter((favId) => favId !== id)));
    };
  
    return (
      <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
        {children}
      </FavoritesContext.Provider>
    );
  };