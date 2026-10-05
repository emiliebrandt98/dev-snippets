import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";

export default function useFavorite() {
  const { status } = useSession();
  const { mutate } = useSWRConfig();

  const { data, mutate: mutateFavoriteIds } = useSWR(
    status === "authenticated" ? "/api/favorites" : null
  );

  const favoriteIds = Array.isArray(data)
    ? data
    : (data?.favoriteIds ?? data?.favorites ?? []);

  async function handleToggleFavorite(id) {
    const isFavorite = favoriteIds.includes(id);

    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId: id }),
      });

      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      await mutateFavoriteIds();
      await mutate("/api/snippets/favorites");
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
