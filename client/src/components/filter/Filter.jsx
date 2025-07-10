import { useState, useEffect } from 'react';
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
		<div className="p-4 w-full">
			<div className="flex flex-col gap-2">
				<div className="relative flex flex-col gap-1">
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700"
					>
						Location
					</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Enter location"
						value={query.city}
						onChange={handleChange}
						autoComplete="off"
						className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
					/>
					{suggestions.length > 0 && (
						<ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
							{suggestions.map((location, index) => (
								<li
									key={index}
									onClick={() => handleSelect(location.name)}
									className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
								>
									{location.name}
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="flex gap-2">
					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="type"
							className="block text-sm font-medium text-gray-700"
						>
							Type
						</label>
						<select
							name="type"
							id="type"
							onChange={handleChange}
							defaultValue={query.type}
							className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
						>
							<option value="">All</option>
							<option value="buy">Buy</option>
							<option value="rent">Rent</option>
						</select>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="property"
							className="block text-sm font-medium text-gray-700"
						>
							Property
						</label>
						<select
							name="property"
							id="property"
							onChange={handleChange}
							defaultValue={query.property}
							className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
						>
							<option value="">All</option>
							<option value="apartment">Apartment</option>
							<option value="house">House</option>
							<option value="condo">Condo</option>
							<option value="land">Land</option>
						</select>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="minPrice"
							className="block text-sm font-medium text-gray-700"
						>
							Min Price
						</label>
						<input
							type="number"
							id="minPrice"
							name="minPrice"
							placeholder="All"
							onChange={handleChange}
							defaultValue={query.minPrice}
							className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="maxPrice"
							className="block text-sm font-medium text-gray-700"
						>
							Max Price
						</label>
						<input
							type="text"
							id="maxPrice"
							name="maxPrice"
							placeholder="All"
							onChange={handleChange}
							defaultValue={query.maxPrice}
							className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
						/>
					</div>

					<div className="flex flex-col w-full gap-1">
						<label
							htmlFor="bedroom"
							className="block text-sm font-medium text-gray-700"
						>
							Bedroom
						</label>
						<input
							type="text"
							id="bedroom"
							name="bedroom"
							placeholder="All"
							onChange={handleChange}
							defaultValue={query.bedroom}
							className="w-full h-9 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
						/>
					</div>

					<div className="flex items-end">
						<button
							onClick={handleFilter}
							className="bg-accent text-white px-6 py-1.5 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
						>
							<img
								src="/search.png"
								alt="Search"
								className="w-4 h-4"
							/>
							<span>Search</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filter;
