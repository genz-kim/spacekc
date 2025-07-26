import React from 'react';
import { FaBus, FaSchool, FaShoppingCart, FaDumbbell } from 'react-icons/fa';

const NeighborhoodList = ({ postDetail }) => {
	const neighborhood = [
		{ name: 'Bus Stop', icon: <FaBus />, distance: postDetail?.bus },
		{ name: 'School', icon: <FaSchool />, distance: postDetail?.school },
		{
			name: 'Restaurant',
			icon: <FaShoppingCart />,
			distance: postDetail?.restaurant,
		},
		{ name: 'Gym', icon: <FaDumbbell />, distance: postDetail?.gym },
	];

	return (
		<div className="bg-white rounded-lg shadow-lg p-3 flex flex-col gap-4">
			<span className="font-bold">Neighborhood</span>
			<div className="flex flex-wrap justify-between gap-3">
				{neighborhood.map(
					(place, index) =>
						place.distance && (
							<div
								key={index}
								className="flex flex-col items-center text-center text-sm text-gray-700"
							>
								<span className="text-base text-gray-500">{place.icon}</span>
								<span>{place.name}</span>
								<span className="text-xs text-gray-500">
									{place.distance > 999
										? `${(place.distance / 1000).toFixed(1)}km`
										: `${place.distance}m`}{' '}
									away
								</span>
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default NeighborhoodList;
