import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${value}, Kenya`
      );

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Invalid API response:", data);
        return;
      }

      // Extracting place names
      const formattedSuggestions = data.map((place) => ({
        name: place.display_name, // Full location name
      }));

      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery((prev) => ({ ...prev, city: value }));
    fetchSuggestions(value);
  };

  const handleSelect = (cityName) => {
    setQuery((prev) => ({ ...prev, city: cityName }));
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setQuery((prev) => ({ ...prev, type }))}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((location, index) => (
              <li key={index} onClick={() => handleSelect(location.name)}>
                {location.name}
              </li>
            ))}
          </ul>
        )}
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={(e) => setQuery((prev) => ({ ...prev, minPrice: e.target.value }))}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={(e) => setQuery((prev) => ({ ...prev, maxPrice: e.target.value }))}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
