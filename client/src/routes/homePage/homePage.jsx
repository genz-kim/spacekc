import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import Testimonials from '../../components/testimonials/Testimonials';
import Pricing from '../../components/pricing/Pricing';

function HomePage() {
	const data = useLoaderData();
	console.log('data', data);

	return (
		<div className="homePage pb-7">
			<Filter />
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
