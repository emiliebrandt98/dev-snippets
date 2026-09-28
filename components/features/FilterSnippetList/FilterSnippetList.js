import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export const EMPTY_FILTER = { languages: [], tags: [], years: [] };

function getChipClass(isActive) {
  const baseClass = "rounded-full px-3 py-1 text-sm";

  if (isActive) {
    return `${baseClass} bg-purple-100`;
  }
  return `${baseClass} bg-gray-100`;
}

function FilterSection({
  title,
  items,
  selectedIds,
  isLoading,
  error,
  onToggle,
  onClear,
}) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 text-lg font-bold">{title}</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p>Could not load data.</p>}

      {!isLoading && !error && (
        <>
          <ul className="flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={onClear}
                className="getChipClass(selectedIds.length === 0)"
              >
                All
              </button>
            </li>

            {items.map((item) => {
              const isActive = selectedIds.includes(item.id);

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onToggle(item.id)}
                    className={getChipClass(isActive)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={onClear}
            className="mt-3 text-sm underline"
          >
            clear
          </button>
        </>
      )}
    </section>
  );
}

export default function FilterSnippetList({
  onActiveFilterItems,
  activeFilterItems,
}) {
  const filterDialogRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [draftFilterItems, setDraftFilterItems] = useState([]);

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

  const tagItem = (tags ?? []).map((tag) => {
    return { id: tag._id, label: tag.name };
  });

  const yearItems = Years.map((year) => {
    return { id: year, label: year };
  });

  const activeFilterCount =
    activeFilterItems.languages.length +
    activeFilterItems.tags.length +
    activeFilterItems.years.length;

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
      <button type="button" onClick={handleOpenFilter}>
        Filter
        {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
      </button>

      {activeFilterCount > 0 ? (
        <button type="button" onClick={handleClearFilter}>
          clear
        </button>
      ) : null}

      <dialog
        ref={filterDialogRef}
        onClose={() => setOpenFilter(false)}
        className="m-0 mt-auto w-full rounded-t-3xl p-6 backdrop:bg-black/40"
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
          item={languageItems}
          selectedIds={draftFilterItems.languages}
          isLoading={isLoadingLanguages}
          error={errorLanguages}
          onToggle={(id) => handleToggleItem("languages", id)}
          onClear={() => handleClearCategory("languages")}
        />
        <FilterSection
          title="Language"
          item={tagItem}
          selectedIds={draftFilterItems.tags}
          isLoading={isLoadingTags}
          error={errorTags}
          onToggle={(id) => handleToggleItem("tags", id)}
          onClear={() => handleClearCategory("tags")}
        />
        <FilterSection
          title="Year"
          item={yearItems}
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
