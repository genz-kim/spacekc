import React from 'react';
import DOMPurify from 'dompurify';
import Map from '../map/Map';
import PropertyHeader from './PropertyHeader';
import FacilitiesList from './FacilitiesList';
import NeighborhoodList from './NeighbourhoodList';
import ActionButtons from './ActionButtons';

const PropertyDetails = ({ post, handleChat, handleSave, saved }) => {
	return (
		<div className="w-full flex flex-col md:flex-row gap-5">
			<div className="flex flex-col w-2/3">
				<PropertyHeader post={post} />

				<div className="flex flex-col gap-2 py-3">
					<h2 className="font-bold">Description</h2>
					<div
						className="text-sm text-balance"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(post?.postDetail?.desc),
						}}
					></div>
				</div>

				<FacilitiesList />
			</div>

			<div className="flex flex-col gap-4 w-1/3">
				<NeighborhoodList postDetail={post?.postDetail} />

				<div className="min-h-60">
					<Map items={[post]} />
				</div>
				<ActionButtons
					handleChat={handleChat}
					handleSave={handleSave}
					saved={saved}
				/>
			</div>
		</div>
	);
};

export default PropertyDetails;
