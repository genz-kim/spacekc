import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Testimonials from '../../components/testimonials/Testimonials';
import Pricing from '../../components/pricing/Pricing';

function HomePage() {
	const data = useLoaderData();
	const [query, setQuery] = useState({
		type: '',
		city: '',
		property: '',
		minPrice: '',
		maxPrice: '',
		bedroom: '',
	});
	const [suggestions, setSuggestions] = useState([]);
	const [showMoreFilters, setShowMoreFilters] = useState(false);

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
			const formattedSuggestions = data.map((place) => ({
				name: place.display_name,
			}));
			setSuggestions(formattedSuggestions);
		} catch (error) {
			console.error('Error fetching location suggestions:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setQuery((prev) => ({ ...prev, [name]: value }));
		if (name === 'city' && value.length >= 2) {
			fetchSuggestions(value);
		} else {
			setSuggestions([]);
		}
	};

	const handleSelect = (location) => {
		setQuery((prev) => ({ ...prev, city: location }));
		setSuggestions([]);
	};

	const handleFilter = () => {
		// You may want to trigger a loader or update the URL here
		setShowMoreFilters(false); // Hide mobile filters after search
	};

	return (
		<div className="homePage py-4">
			<Filter
				query={query}
				suggestions={suggestions}
				showMoreFilters={showMoreFilters}
				setShowMoreFilters={setShowMoreFilters}
				handleChange={handleChange}
				handleSelect={handleSelect}
				handleFilter={handleFilter}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
				<Suspense fallback={<p>Loading...</p>}>
					<Await
						resolve={data.postResponse}
						errorElement={<p>Error loading posts!</p>}
					>
						{(postResponse) => {
							console.log('postResponse:', postResponse); // Debugging
							const posts = Array.isArray(postResponse)
								? postResponse
								: postResponse?.data;

							if (!Array.isArray(posts)) {
								return <p>No posts available.</p>;
							}

							return posts.map((post) => (
								<Card
									key={post.id}
									item={post}
								/>
							));
						}}
					</Await>
				</Suspense>
			</div>
			<Testimonials />
			<Pricing />
		</div>
	);
}

export default HomePage;
