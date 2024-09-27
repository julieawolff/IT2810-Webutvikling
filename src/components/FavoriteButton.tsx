import { useEffect, useState } from 'react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  initialFavoriteStatus: boolean;
  handleFavorite: () => void;
}

export default function FavoriteButton({ initialFavoriteStatus, handleFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavoriteStatus);

  useEffect(() => {
    setIsFavorite(initialFavoriteStatus);
  }, [initialFavoriteStatus]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    handleFavorite();
  };

  return (
    <button className="favoriteButton" onClick={handleFavoriteClick}>
      {isFavorite ? '\u2665' : '\u2661'}
    </button>
  );
}
