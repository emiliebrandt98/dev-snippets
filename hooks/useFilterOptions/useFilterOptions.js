import useSWR from "swr";
import { getYears, getTags } from "@/lib/filter/filterSnippets";
import { EMPTY_FILTER } from "@/lib/filter/filterSnippets";
import { useState } from "react";

export default function useFilterOptions(
  snippets,
  activeFilterItems,
  onActiveFilterItems,
  tagsFromSnippets = false
) {
  const {
    data: tags,
    isLoading: isLoadingTags,
    error: errorTags,
  } = useSWR(tagsFromSnippets ? null : "/api/tag");

  const {
    data: languages,
    isLoading: isLoadingLanguages,
    error: errorLanguages,
  } = useSWR("/api/language");

  const [draftFilterItems, setDraftFilterItems] = useState(EMPTY_FILTER);
  const [openFilter, setOpenFilter] = useState(false);

  const activeFilterCount =
    activeFilterItems.languages.length +
    activeFilterItems.tags.length +
    activeFilterItems.years.length;

  const languageItems = (languages ?? []).map((language) => {
    return { id: language._id, label: language.name };
  });

  const availableTags = tagsFromSnippets
    ? getTags(snippets ?? [])
    : (tags ?? []);

  const tagItems = availableTags.map((tag) => {
    return { id: tag._id, label: tag.label };
  });

  const yearItems = getYears(snippets ?? []).map((year) => {
    return { id: year, label: year };
  });

  function handleOpenFilter() {
    setDraftFilterItems(activeFilterItems);
    setOpenFilter(true);
  }

  function handleClearFilter() {
    onActiveFilterItems(EMPTY_FILTER);
    setDraftFilterItems(EMPTY_FILTER);
  }

  return {
    languageItems,
    tagItems,
    yearItems,
    isLoadingLanguages,
    isLoadingTags,
    errorLanguages,
    errorTags,
    activeFilterCount,
    onHandleOpenFilter: handleOpenFilter,
    openFilter,
    onOpenFilter: setOpenFilter,
    draftFilterItems,
    ondraftFilterItems: setDraftFilterItems,
    onClearFilter: handleClearFilter,
  };
}
