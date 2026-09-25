import { Star } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";

export default function FavoriteButton({ snippetId }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorageState("Favorite", {
    defaultValue: [],
  });

  const isFavorite = favoriteIds.includes(snippetId);

  function handleToggleFavorite(id) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favoriteId) => favoriteId !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleToggleFavorite(snippetId);
      }}
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 hover:bg-purple-200"
    >
      <Star
        size={16}
        className="text-purple-600"
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}
