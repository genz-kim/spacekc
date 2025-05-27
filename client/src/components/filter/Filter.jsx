import { useState, useEffect } from 'react';
import './filter.scss';
import { useSearchParams } from 'react-router-dom';

function Filter() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState({
		type: searchParams.get('type') || '',
		city: searchParams.get('city') || '',
		property: searchParams.get('property') || '',
		minPrice: searchParams.get('minPrice') || '',
		maxPrice: searchParams.get('maxPrice') || '',
		bedroom: searchParams.get('bedroom') || '',
	});

	const [suggestions, setSuggestions] = useState([]);

	// 🔥 Fetch location suggestions for Kenya (Counties & Sub-Counties)
	const fetchSuggestions = async (value) => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${value}, Kenya`
			);

			const data = await response.json();

			if (!Array.isArray(data)) {
				console.error('Invalid API response:', data);
				return;
			}

			// Extract proper names for display
			const formattedSuggestions = data.map((place) => ({
				name: place.display_name, // Shows full location name
			}));

			setSuggestions(formattedSuggestions);
		} catch (error) {
			console.error('Error fetching location suggestions:', error);
		}
	};

	// 🔥 Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setQuery((prev) => ({ ...prev, [name]: value }));

		// Fetch suggestions when user types at least 2 characters
		if (name === 'city' && value.length >= 2) {
			fetchSuggestions(value);
		} else {
			setSuggestions([]); // Clear suggestions when input is empty
		}
	};

	// 🔥 Handle selecting a suggestion
	const handleSelect = (location) => {
		setQuery((prev) => ({ ...prev, city: location }));
		setSuggestions([]); // Hide suggestions after selecting
	};

	const handleFilter = () => {
		setSearchParams(query);
	};

	return (
		<div className="filter">
			<h1>
				Search results for <b>{searchParams.get('city')}</b>
			</h1>
			<div className="top">
				<div className="item">
					<label htmlFor="city">Location</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Enter location"
						value={query.city}
						onChange={handleChange}
						autoComplete="off"
					/>
					{/* 🔥 Suggestions Dropdown */}
					{suggestions.length > 0 && (
						<ul className="suggestions">
							{suggestions.map((location, index) => (
								<li
									key={index}
									onClick={() => handleSelect(location.name)}
								>
									{location.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="bottom">
				<div className="item">
					<label htmlFor="type">Type</label>
					<select
						name="type"
						id="type"
						onChange={handleChange}
						defaultValue={query.type}
					>
						<option value="">any</option>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="property">Property</label>
					<select
						name="property"
						id="property"
						onChange={handleChange}
						defaultValue={query.property}
					>
						<option value="">any</option>
						<option value="apartment">Apartment</option>
						<option value="house">House</option>
						<option value="condo">Condo</option>
						<option value="land">Land</option>
					</select>
				</div>
				<div className="item">
					<label htmlFor="minPrice">Min Price</label>
					<input
						type="number"
						id="minPrice"
						name="minPrice"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.minPrice}
					/>
				</div>
				<div className="item">
					<label htmlFor="maxPrice">Max Price</label>
					<input
						type="text"
						id="maxPrice"
						name="maxPrice"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.maxPrice}
					/>
				</div>
				<div className="item">
					<label htmlFor="bedroom">Bedroom</label>
					<input
						type="text"
						id="bedroom"
						name="bedroom"
						placeholder="any"
						onChange={handleChange}
						defaultValue={query.bedroom}
					/>
				</div>
				<button onClick={handleFilter}>
					<img
						src="/search.png"
						alt=""
					/>
				</button>
			</div>
		</div>
	);
}

export default Filter;
