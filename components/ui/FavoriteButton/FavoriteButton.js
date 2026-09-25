import { Star } from "lucide-react";

export default function FavoriteButton({ snippetId }) {
  const [isFavorite, setIsFavorite] = useLocalStorageState("Favorite", {
    defaultValue: [],
  });

  function handleToggleFavorite(id) {
    if (isFavorite.includes(id)) {
      const filteredFavorites = isFavorite.filter(
        (favoriteId) => favoriteId !== id
      );
      setIsFavorite(filteredFavorites);
    } else {
      setIsFavorite([...isFavorite, id]);
    }
  }

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        handleToggleFavorite(snippetId);
      }}
      type="button"
      className="rounded-full bg-violet-200 hover:bg-violet-400 active:bg-violet-500 text-white "
    >
      <Star size={16} />
    </button>
  );
}
