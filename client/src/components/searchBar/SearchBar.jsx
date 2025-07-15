import { useState } from 'react';
import { Link } from 'react-router-dom';

const types = ['buy', 'rent'];

function SearchBar() {
	const [query, setQuery] = useState({
		type: 'rent',
		city: '',
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
				console.error('Invalid API response:', data);
				return;
			}

			const formattedSuggestions = data.map((place) => ({
				name: place.display_name,
			}));

			setSuggestions(formattedSuggestions);
		} catch (error) {
			console.error('Error fetching location suggestions:', error);
		}
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery((prev) => ({ ...prev, city: value }));
		fetchSuggestions(value);
	};

	const handleSelect = (cityName) => {
		setQuery((prev) => ({ ...prev, city: cityName }));
		setSuggestions([]);
	};

	return (
		<div className="w-full py-4 flex flex-col gap-2">
			<h2 className="text-lg md:text-2xl text-secondary pl-1">
				Search Properties to{' '}
				{query.type.charAt(0).toUpperCase() + query.type.slice(1)}
			</h2>

			{/* Search Form */}
			<div className="relative">
				<form className="flex items-center gap-4 bg-white rounded-lg shadow-md p-5 w-full flex-col md:flex-row">
					<div className="w-full md:flex-1 relative">
						<input
							type="text"
							name="city"
							placeholder="Enter city"
							value={query.city}
							onChange={handleChange}
							autoComplete="off"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
						/>
						{suggestions.length > 0 && (
							<ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[200px] overflow-y-auto z-50">
								{suggestions.map((location, index) => (
									<li
										key={index}
										onClick={() => handleSelect(location.name)}
										className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
									>
										{location.name}
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="flex gap-4 w-full md:flex-1">
						<input
							type="number"
							name="minPrice"
							min={0}
							max={10000000}
							placeholder="Min Price"
							onChange={(e) =>
								setQuery((prev) => ({ ...prev, minPrice: e.target.value }))
							}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
						/>
						<input
							type="number"
							name="maxPrice"
							min={0}
							max={10000000}
							placeholder="Max Price"
							onChange={(e) =>
								setQuery((prev) => ({ ...prev, maxPrice: e.target.value }))
							}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
						/>
					</div>

					<Link
						to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
						className="w-full md:w-auto flex items-center justify-center"
					>
						<button className="w-full bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
							<img
								src="/search.png"
								alt="Search"
								className="w-5 h-5"
							/>
							<span>Search</span>
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
}

export default SearchBar;
