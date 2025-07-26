import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

const PropertyHeader = ({ post }) => (
	<div className="flex justify-between border-b border-[#E5E7EB] pb-3">
		<div className="flex flex-col gap-2 w-full">
			<h1 className="font-bold">{post?.title}</h1>
			<span className="capitalize text-[#6B7280] text-sm flex gap-2 items-center">
				<FaLocationDot />
				{post?.address}
			</span>
			<div className="pt-4 flex justify-between">
				{[
					{ label: 'Bedroom', value: post?.bedroom, icon: '/bed.png' },
					{ label: 'Bathroom', value: post?.bathroom, icon: '/bath.png' },
					{ label: 'Sqft', value: post?.postDetail?.size, icon: '/size.png' },
					{ label: 'Bedroom', value: post?.bedroom, icon: '/bed.png' },
				].map((item, index) => (
					<div
						key={index}
						className="flex items-center gap-2 text-xs text-[#6B7280]"
					>
						<img
							src={item.icon}
							alt=""
							className="w-5 h-5"
						/>
						<div className="flex flex-col">
							<span>{item.label}</span>
							<span className="text-secondary">{item.value}</span>
						</div>
					</div>
				))}
			</div>
		</div>
		<div className="text-accent font-bold">Ksh. {post?.price}</div>
	</div>
);

export default PropertyHeader;
