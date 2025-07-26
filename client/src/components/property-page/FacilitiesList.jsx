import React from 'react';
import {
	FaWifi,
	FaDumbbell,
	FaChild,
	FaWater,
} from 'react-icons/fa';
import { FaPersonSwimming } from 'react-icons/fa6';
import { MdBalcony, MdCountertops } from 'react-icons/md';

const facilities = [
	{ name: 'WiFi', icon: <FaWifi /> },
	{ name: 'Playground', icon: <FaChild /> },
	{ name: 'Gym', icon: <FaDumbbell /> },
	{ name: 'Balcony', icon: <MdBalcony /> },
	{ name: 'Open Kitchen Plan', icon: <MdCountertops /> },
	{ name: 'Borehole Water', icon: <FaWater /> },
	{ name: 'Swimming pool', icon: <FaPersonSwimming /> },
];

const FacilitiesList = () => (
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
);

export default FacilitiesList;
