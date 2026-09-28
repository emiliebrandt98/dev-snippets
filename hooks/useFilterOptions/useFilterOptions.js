import useSWR from "swr";
import { getYears } from "@/lib/filter/filterItems";

export default function useFilterOptions(snippets) {
  const {
    data: tags,
    isLoading: isLoadingTags,
    error: errorTags,
  } = useSWR("/api/tag");

  const {
    data: languages,
    isLoading: isLoadingLanguages,
    error: errorLanguages,
  } = useSWR("/api/language");

  const languageItems = (languages ?? []).map((language) => {
    return { id: language._id, label: language.name };
  });

  const tagItems = (tags ?? []).map((tag) => {
    return { id: tag._id, label: tag.label };
  });

  const yearItems = getYears(snippets ?? []).map((year) => {
    return { id: year, label: year };
  });

  return {
    languageItems,
    tagItems,
    yearItems,
    isLoadingLanguages,
    isLoadingTags,
    errorLanguages,
    errorTags,
  };
}
