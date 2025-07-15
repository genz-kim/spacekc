import { FiFilter } from 'react-icons/fi';

function MobileFilter({ query, suggestions, showMoreFilters, setShowMoreFilters, handleChange, handleSelect, handleFilter }) {
	return (
		<div className="md:hidden bg-white rounded-lg shadow-md p-2 md:p-5 w-full flex-col flex gap-4 relative">
			<div className="flex items-end gap-2 w-full">
				<div className="flex flex-col flex-1 gap-1">
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
						className="w-full px-2 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder:text-sm"
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
				<button
					onClick={() => setShowMoreFilters((prev) => !prev)}
					className="flex items-center gap-1.5 justify-center p-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
					aria-label="Show more filters"
				>
					<FiFilter size={20} className=" text-accent" />
					<span className="ml-1 text-sm text-accent">Filters</span>
				</button>
			</div>
			{showMoreFilters && (
				<div className="mt-4 flex flex-col gap-3 animate-fade-in">
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-1">
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
								value={query.type}
								className="w-full px-2 py-2 pr-8 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
							>
								<option value="">All</option>
								<option value="buy">Buy</option>
								<option value="rent">Rent</option>
							</select>
						</div>
						<div className="flex flex-col gap-1">
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
								className="w-full px-2 py-2 pr-8 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
							>
								<option value="">All</option>
								<option value="apartment">Apartment</option>
								<option value="house">House</option>
								<option value="condo">Condo</option>
								<option value="land">Land</option>
							</select>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="minPrice"
								className="block text-sm font-medium text-gray-700"
							>
								Min Price
							</label>
							<input
								type="text"
								id="minPrice"
								name="minPrice"
								placeholder="Min Price"
								onChange={handleChange}
								defaultValue={query.minPrice}
								className="w-full px-2 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder:text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1">
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
								placeholder="Max Price"
								onChange={handleChange}
								defaultValue={query.maxPrice}
								className="w-full px-2 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder:text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="bedroom"
								className="block text-sm font-medium text-gray-700"
							>
								Bedroom
							</label>
							<select
								id="bedroom"
								name="bedroom"
								onChange={handleChange}
								defaultValue={query.bedroom}
								className="w-full px-2 py-2 pr-8 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
							>
								<option value="">Any</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5+</option>
							</select>
						</div>
						<div className="flex flex-col gap-1">
							<label
								htmlFor="amenities"
								className="block text-sm font-medium text-gray-700"
							>
								Amenities
							</label>
							<select
								id="amenities"
								name="amenities"
								className="w-full px-2 py-2 pr-8 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
								disabled
							>
								<option value="">Coming Soon</option>
							</select>
						</div>
					</div>
					<button
						onClick={handleFilter}
						className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 cursor-pointer w-full mt-2"
					>
						<img
							src="/search.png"
							alt="Search"
							className="w-4 h-4"
						/>
						<span>Search</span>
					</button>
				</div>
			)}
		</div>
	);
}

export default MobileFilter; 