import React, { useEffect, useRef, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";
import Box from "@mui/material/Box";
import { useAppContext } from "../context/state";

const fetchOmdbSuggestions = async (searchTerm) => {
  try {
    const response = await fetch(`api/omdb/search/${searchTerm}/`);
    const omdbData = await response.json();
    return omdbData.map((result) => ({
      id: result.imdbID,
      poster: result.Poster,
      name: result.Title,
      year: result.Year,
    }));
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    return [];
  }
};

const filterOptions = (options, { inputValue }) =>
  options.filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

function useKeyboardFocus(ref) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (ref.current && e.target !== ref.current && /^[a-z0-9]$/i.test(e.key)) {
        ref.current.focus();
        ref.current.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ref]);
}

const PLACEHOLDER_IMAGE = "https://www.popcorn.app/assets/app/images/placeholder-movieimage.png";


export default function SearchBar({ onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const { setSelectedFilm } = useAppContext();
  const searchRef = useRef(null);

  useKeyboardFocus(searchRef);

  const onChange = async (e) => {
    const data = await fetchOmdbSuggestions(e.target.value);
    setSuggestions(data);
  };

  const debouncedOnChange = useCallback(debounce(onChange, 500), []);

  const handleImageError = (e) => {
    e.target.src = placeholder;
  };

  const handleSelect = (event, value, reason) => {
    if (reason === "selectOption") {
      setSelectedFilm(value);
      onSelect(value);
      searchRef.current.blur();
    }
  };

  return (
    <div className="search-bar">
      <Autocomplete
        freeSolo
        sx={{ width: 500 }}
        filterOptions={filterOptions}
        onChange={handleSelect}
        getOptionLabel={(option) => `${option.name} (${option.year})`}
        isOptionEqualToValue={(option, value) =>
          `${option.name} - ${option.year}` === `${value.name} - ${value.year}`
        }
        options={suggestions}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              className="suggestion"
              src={option.poster !== "N/A" ? option.poster : PLACEHOLDER_IMAGE}
              onError={handleImageError}
              alt={`${option.name} poster`}
            />
            {option.name} ({option.year})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={debouncedOnChange}
            label="Start typing to search..."
            inputRef={searchRef}
            className="search-field"
            InputProps={{
              ...params.InputProps,
              endAdornment: <div>{params.InputProps.endAdornment}</div>,
            }}
          />
        )}
      />
    </div>
  );
}