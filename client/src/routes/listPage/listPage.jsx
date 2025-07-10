import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
	const data = useLoaderData();
	console.log('data', data);

	return (
		<div className="listPage">
			<div className="listContainer">
				<div className="wrapper">
					<Filter />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
				</div>
			</div>
			{/* <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div> */}
		</div>
	);
}

export default ListPage;