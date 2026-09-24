import { Trash } from "lucide-react";
import { useRef, useState, useEffect } from "react";
const initialOptions = [];

export default function MultiSelect() {
  const [allOptions, setAllOptions] = useState(initialOptions);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSelectOpen(false);
        setErrorMessage("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = allOptions.filter((option) =>
    selectedIds.includes(option.id)
  );

  const filteredOption = allOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (id) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setInputValue("");
    setErrorMessage("");
  };

  const handleRemove = (itemId, event) => {
    event.stopPropagation();
    setSelectedIds(selectedIds.filter((id) => id !== itemId));
  };

  const handleCreate = () => {
    if (!inputValue.trim()) return;

    const trimmedInput = inputValue.trim();

    const existingOption = allOptions.find(
      (option) =>
        option.label.toLocaleLowerCase() === trimmedInput.toLocaleLowerCase()
    );

    if (existingOption) {
      setErrorMessage(`This tag "${trimmedInput}" existe already!`);
      return;
    }

    const newOption = {
      id: Date.now().toString(),
      label: trimmedInput,
      color: "#e0e7ff",
    };

    setAllOptions([...allOptions, newOption]);
    setSelectedIds([...selectedIds, newOption.id]);
    setInputValue("");
    setErrorMessage("");
  };

  const handleDeleteOption = (itemId, event) => {
    event.stopPropagation();
    setAllOptions(allOptions.filter((option) => option.id !== itemId));
    setSelectedIds(selectedIds.filter((id) => id !== itemId));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (!inputValue.trim()) return;

      const trimmedInput = inputValue.trim();
      const existingOption = allOptions.find(
        (option) =>
          option.label.toLocaleLowerCase() === trimmedInput.toLocaleLowerCase()
      );

      if (existingOption) {
        if (!selectedIds.includes(existingOption.id)) {
          setSelectedIds([...selectedIds, existingOption.id]);
          setInputValue("");
          setErrorMessage("");
        } else {
          setErrorMessage(`This "${trimmedInput}" tag is already selected.`);
        }
      } else {
        handleCreate();
      }
    }
  };

  return (
    <div>
      <div ref={containerRef} className="relative">
        <div onClick={() => setIsSelectOpen(true)}>
          {selectedOptions.map((option) => (
            <span key={option.id}>
              {option.label}
              <button
                type="button"
                onClick={(event) => handleRemove(option.id, event)}
              >
                x
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder={
              selectedOptions.length === 0 ? "Select or create tags" : ""
            }
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              setIsSelectOpen(true);
              if (errorMessage) setErrorMessage("");
            }}
            onFocus={() => setIsSelectOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        {isSelectOpen && (
          <div>
            <ul>
              {filteredOption.map((option) => (
                <li key={option.id} onClick={() => handleSelect(option.id)}>
                  <span>{option.label}</span>
                  <button
                    onClick={(event) => handleDeleteOption(option.id, event)}
                    title="Delete tag"
                  >
                    <Trash />
                  </button>
                </li>
              ))}
            </ul>

            {inputValue.trim() &&
              !allOptions.some(
                (option) =>
                  option.label.toLowerCase() === inputValue.toLowerCase()
              ) && (
                <div>
                  <button onClick={handleCreate}>
                    <span className="label">Create</span>
                    <span>{inputValue}</span>
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
