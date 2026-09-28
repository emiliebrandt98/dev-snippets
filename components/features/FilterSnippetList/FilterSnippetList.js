import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import { EMPTY_FILTER } from "@/lib/filter/filterSnippets";
import useFilterOptions from "@/hooks/useFilterOptions/useFilterOptions";

export default function FilterSnippetList({
  onActiveFilterItems,
  activeFilterItems,
  snippets,
}) {
  const filterDialogRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [draftFilterItems, setDraftFilterItems] = useState(EMPTY_FILTER);

  const activeFilterCount =
    activeFilterItems.languages.length +
    activeFilterItems.tags.length +
    activeFilterItems.years.length;

  const {
    languageItems,
    tagItems,
    yearItems,
    isLoadingLanguages,
    isLoadingTags,
    errorLanguages,
    errorTags,
  } = useFilterOptions(snippets);

  useEffect(() => {
    if (!filterDialogRef.current) return;
    if (openFilter) {
      filterDialogRef.current.showModal();
    } else {
      filterDialogRef.current.close();
    }
  }, [openFilter]);

  function handleOpenFilter() {
    setDraftFilterItems(activeFilterItems);
    setOpenFilter(true);
  }

  function handleCancelFilter() {
    setDraftFilterItems(activeFilterItems);
    setOpenFilter(false);
  }

  function handleClearFilter() {
    onActiveFilterItems(EMPTY_FILTER);
    setDraftFilterItems(EMPTY_FILTER);
  }

  function handleApplyFilter() {
    onActiveFilterItems(draftFilterItems);
    setOpenFilter(false);
  }

  function handleToggleItem(category, id) {
    const selectedIds = draftFilterItems[category];
    let newSelectedIds;

    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      newSelectedIds = [...selectedIds, id];
    }

    setDraftFilterItems({ ...draftFilterItems, [category]: newSelectedIds });
  }

  function handleClearCategory(category) {
    setDraftFilterItems({ ...draftFilterItems, [category]: [] });
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <button
          type="button"
          onClick={handleOpenFilter}
          className="flex flex-row gap-2 p-2 cursor-pointer justify-center items-center h-8 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Filter
          {activeFilterCount > 0 && <span>· {activeFilterCount}</span>}
        </button>

        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={handleClearFilter}
            className="underline cursor-pointer p-2"
          >
            clear
          </button>
        ) : null}
      </div>

      <dialog
        ref={filterDialogRef}
        onClose={() => setOpenFilter(false)}
        className="m-0 mt-auto w-full max-w-full rounded-t-3xl p-6 backdrop:bg-black/40"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Filter</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={handleCancelFilter}
          >
            <X />
          </button>
        </div>

        <FilterSection
          title="Language"
          items={languageItems}
          selectedIds={draftFilterItems.languages}
          isLoading={isLoadingLanguages}
          error={errorLanguages}
          onToggle={(id) => handleToggleItem("languages", id)}
          onClear={() => handleClearCategory("languages")}
        />
        <FilterSection
          title="Tags"
          items={tagItems}
          selectedIds={draftFilterItems.tags}
          isLoading={isLoadingTags}
          error={errorTags}
          onToggle={(id) => handleToggleItem("tags", id)}
          onClear={() => handleClearCategory("tags")}
        />
        <FilterSection
          title="Year"
          items={yearItems}
          selectedIds={draftFilterItems.years}
          isLoading={false}
          error={null}
          onToggle={(id) => handleToggleItem("years", id)}
          onClear={() => handleClearCategory("years")}
        />

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleApplyFilter}
            className="rounded-md bg-gray-600 py-3 font-bold text-white"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleCancelFilter}
            className="rounded-md border-2 border-gray-600 py-3 font-bold text-gray-600"
          >
            Cancle
          </button>
        </div>
      </dialog>
    </>
  );
}
