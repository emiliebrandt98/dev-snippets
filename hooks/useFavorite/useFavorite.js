import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useLocalStorageState("Favorite", {
    defaultValue: [],
  });

  function handleToggleFavorite(id) {
    try {
      if (favoriteIds.includes(id)) {
        const updatedFavoriteIds = favoriteIds.filter(
          (favoriteId) => favoriteId !== id
        );
        setFavoriteIds(updatedFavoriteIds);
      } else {
        setFavoriteIds([...favoriteIds, id]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }
  return {
    onToggleFavorite: handleToggleFavorite,
    favoriteIds,
  };
}
