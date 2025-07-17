import React from 'react'
import { FaStar } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const AgentSection = ({post}) => {
  return (
			<div className="border border-[#E5E7EB] rounded-lg flex flex-col gap-4 items-center justify-center py-3 md:py-8 px-2 md:px-6">
				<div className="flex flex-col items-center justify-center">
					<img
						src={post?.user?.avatar}
						alt=""
						className="rounded-full w-20 h-20"
					/>
					<span className="pt-3">{post?.user?.username}</span>
					<span className="text-[#6B7280] text-xs">Agent</span>
				</div>
				<div className="flex flex-col gap-1 items-center">
					<div className="flex gap-1">
						{[...Array(5)].map((_, i) => (
							<FaStar
								key={i}
								color="#ec572a"
								size={15}
							/>
						))}
					</div>
					<span className="text-[#6B7280] text-xs">4.9/5 Rating</span>
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-2">
					<div className="flex justify-center gap-5 text-xs font bold bg-[#E5E7EB] py-1.5 w-full px-3 rounded-sm">
						<span>+254 7** *****</span>
						<span className="text-accent">Show Number</span>
					</div>
					<span className="text-[#6B7280] text-xs pb-5">2 Properties</span>
				</div>
				<button className="flex items-center gap-2 border border-accent rounded-sm py-1.5 px-3 text-sm text-accent w-full justify-center font-semibold">
					<MdDateRange />
					<span>Book Viewing</span>
				</button>
			</div>
	);
}

export default AgentSection