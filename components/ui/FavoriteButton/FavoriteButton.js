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
      className="button-icon button-icon-secondary rounded-lg"
    >
      <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
