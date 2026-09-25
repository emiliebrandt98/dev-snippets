import useFavorite from "@/hooks/useFavorite/useFavorite";
import { Star } from "lucide-react";

export default function FavoriteButton({ snippetId }) {
  const { favoriteIds, onToggleFavorite } = useFavorite();
  const isFavorite = favoriteIds.includes(snippetId);

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggleFavorite(snippetId);
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
