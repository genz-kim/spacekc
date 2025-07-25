import React from 'react';
import { FaLocationDot, FaPersonSwimming } from 'react-icons/fa6';
import { FaWifi, FaDumbbell, FaChild, FaWater } from 'react-icons/fa';
import { MdBalcony, MdCountertops } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { FaBus, FaSchool, FaShoppingCart } from 'react-icons/fa';
import Map from '../map/Map';

const neighborhood = [
	{ name: 'Bus Stop', icon: <FaBus />, distance: '500m' },
	{ name: 'School', icon: <FaSchool />, distance: '700m' },
	{ name: 'Supermarket', icon: <FaShoppingCart />, distance: '300m' },
	{ name: 'Gym', icon: <FaDumbbell />, distance: '450m' },
];

const facilities = [
	{ name: 'WiFi', icon: <FaWifi /> },
	{ name: 'Playground', icon: <FaChild /> },
	{ name: 'Gym', icon: <FaDumbbell /> },
	{ name: 'Balcony', icon: <MdBalcony /> },
	{ name: 'Open Kitchen Plan', icon: <MdCountertops /> },
	{ name: 'Borehole Water', icon: <FaWater /> },
	{ name: 'Swimming pool', icon: <FaPersonSwimming /> },
];

const PropertyDetails = ({ post }) => {
	return (
		<div className="w-full flex flex-col md:flex-row gap-5">
			<div className="flex flex-col w-2/3">
				<div className="flex justify-between border-b border-[#E5E7EB] pb-3">
					<div className="flex flex-col gap-2 w-full">
						<h1 className="font-bold">{post?.title}</h1>
						<span className="capitalize text-[#6B7280] text-sm flex gap-2 items-center">
							<FaLocationDot />
							{post?.address}
						</span>
						<div className="pt-4 flex justify-between">
							<div className="flex items-center gap-2 text-xs text-[#6B7280]">
								<img
									src="/bed.png"
									alt=""
									className="w-5 h-5"
								/>
								<div className="flex flex-col">
									<span>Bedroom</span>
									<span className="text-secondary">{post?.bedroom}</span>
								</div>
							</div>
							<div className="flex items-center gap-2 text-xs text-[#6B7280]">
								<img
									src="/bath.png"
									alt=""
									className="w-5 h-5"
								/>
								<div className="flex flex-col">
									<span>Bathroom</span>
									<span className="text-secondary">{post?.bathroom}</span>
								</div>
							</div>
							<div className="flex items-center gap-2 text-xs text-[#6B7280]">
								<img
									src="/size.png"
									alt=""
									className="w-5 h-5"
								/>
								<div className="flex flex-col">
									<span>Sqft</span>
									<span className="text-secondary">
										{post?.postDetail?.size}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-2 text-xs text-[#6B7280]">
								<img
									src="/bed.png"
									alt=""
									className="w-5 h-5"
								/>
								<div className="flex flex-col">
									<span>Bedroom</span>
									<span className="text-secondary">{post?.bedroom}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="text-accent font-bold">Ksh. {post?.price}</div>
				</div>

				<div className="flex flex-col gap-2 py-3">
					<h2 className="font-bold">Description</h2>
					<div
						className="text-sm text-balance"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(post?.postDetail?.desc),
						}}
					></div>
				</div>

				<div className="flex flex-col gap-2 py-3">
					<h2 className="font-bold">Facilities</h2>
					<div className="flex flex-wrap gap-y-4">
						{facilities.map((facility, index) => (
							<div
								key={index}
								className="flex items-center gap-2 basis-1/3 text-sm"
							>
								<span className="text-base text-gray-600">{facility.icon}</span>
								<span>{facility.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4 w-1/3">
				<div className="bg-white rounded-lg shadow-lg p-3 flex flex-col gap-4">
					<span className="font-bold">Neighborhood</span>
					<div className="flex flex-wrap justify-between gap-3">
						{neighborhood.map((place, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center text-sm text-gray-700"
							>
								<span className="text-base text-gray-500">{place.icon}</span>
								<span className="">{place.name}</span>
								<span className="text-xs text-gray-500">
									{place.distance} away
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="h-full">
					<Map items={[post]} />
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;
