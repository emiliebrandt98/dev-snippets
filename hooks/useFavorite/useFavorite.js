import useLocalStorageState from "use-local-storage-state";

export default function useFavorite() {
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
  return {
    onToggleFavorite: handleToggleFavorite,
    isFavorite,
  };
}
