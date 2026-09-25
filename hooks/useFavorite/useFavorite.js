import useLocalStorageState from "use-local-storage-state";

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useLocalStorageState("Favorite", {
    defaultValue: [],
  });

  function handleToggleFavorite(id) {
    if (favoriteIds.includes(id)) {
      const updatedFavoriteIds = favoriteIds.filter(
        (favoriteId) => favoriteId !== id
      );
      setFavoriteIds(updatedFavoriteIds);
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }
  return {
    onToggleFavorite: handleToggleFavorite,
    favoriteIds,
  };
}
