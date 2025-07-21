import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';

const PropertyDetails = ({post}) => {
  return (
		<div className="w-full flex">
			<div className="flex justify-between w-1/2 border-b border-[#E5E7EB] pb-3">
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
								<span className="text-secondary">{post?.postDetail?.size}</span>
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
		</div>
	);
}

export default PropertyDetails