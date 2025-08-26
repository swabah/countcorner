import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export function AutocompleteSelect({
  participants,
  value,
  onChange,
  placeholder = "Type your name (min 2 chars)",
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);

  // Filter participants only when query length >= 2
  const filteredParticipants =
    query.length >= 2
      ? participants.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set query text based on external value changes
  useEffect(() => {
    const selected = participants.find((p) => p._id === value);
    setQuery(selected ? selected.name : "");
  }, [value, participants]);

  const handleInputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      setIsOpen(e.target.value.length >= 2);
      onChange(""); // Clear current selection when typing (keep type as string)
    },
    [onChange]
  );

  const selectParticipant = useCallback(
    (participant, event) => {
      event.preventDefault();
      setQuery(participant.name);
      onChange(participant._id);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (!isOpen && e.key === "ArrowDown" && filteredParticipants.length) {
        setIsOpen(true);
        setHighlightedIndex(0);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          setHighlightedIndex((i) => (i + 1) % filteredParticipants.length);
          break;
        case "ArrowUp":
          setHighlightedIndex(
            (i) =>
              (i - 1 + filteredParticipants.length) %
              filteredParticipants.length
          );
          break;
        case "Enter":
          if (highlightedIndex >= 0) {
            selectParticipant(filteredParticipants[highlightedIndex], e);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    },
    [filteredParticipants, highlightedIndex, isOpen, selectParticipant]
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
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
              You need to join
              <br className="md:hidden" />
              <Link to="/join">
                <strong className="text-primary"> Join Campaign</strong>
              </Link>
            </li>
          ) : (
            filteredParticipants.map((p, idx) => (
              <li
                key={p._id}
                id={`autocomplete-item-${idx}`}
                role="option"
                aria-selected={highlightedIndex === idx}
                onMouseDown={(e) => selectParticipant(p, e)}
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
