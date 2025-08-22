import React, { useState, useRef, useEffect } from "react";

export function AutocompleteSelect({
  participants,
  value,
  onChange,
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);

  // Filter participants only if user typed at least 2 characters
  const filteredParticipants =
    query.length >= 2
      ? participants.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Keyboard navigation & selection
  const onKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" && filteredParticipants.length > 0) {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlightedIndex((i) => (i + 1) % filteredParticipants.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(
        (i) =>
          (i - 1 + filteredParticipants.length) % filteredParticipants.length
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const selected = filteredParticipants[highlightedIndex];
      onChange(selected._id);
      setQuery(selected.name);
      setIsOpen(false);
      setHighlightedIndex(-1);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  // Set query based on external value change (e.g., reset)
  useEffect(() => {
    const selectedParticipant = participants.find((p) => p._id === value);
    setQuery(selectedParticipant ? selectedParticipant.name : "");
  }, [value, participants]);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={placeholder || "Type your name (min 2 chars)"}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          onChange(null); // clear selection on typing
        }}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        aria-activedescendant={
          highlightedIndex >= 0
            ? `autocomplete-item-${highlightedIndex}`
            : undefined
        }
        spellCheck={false}
        autoComplete="off"
      />

      {isOpen && (
        <ul
          id="autocomplete-list"
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
        >
          {filteredParticipants.length === 0 ? (
            <li className="p-3 text-center text-sm text-gray-500 select-none">
              No participants available
            </li>
          ) : (
            filteredParticipants.map((p, idx) => (
              <li
                key={p._id}
                id={`autocomplete-item-${idx}`}
                role="option"
                aria-selected={highlightedIndex === idx}
                onMouseDown={() => {
                  onChange(p._id);
                  setQuery(p.name);
                  setIsOpen(false);
                  setHighlightedIndex(-1);
                }}
                className={`cursor-pointer px-4 py-2 select-none ${
                  highlightedIndex === idx
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 hover:bg-blue-100"
                }`}
              >
                {p.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
