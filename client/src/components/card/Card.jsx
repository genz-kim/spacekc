import { Link } from 'react-router-dom';
import {
	MdLocationPin,
	MdBed,
	MdDirectionsCar,
	MdAddCircleOutline,
	MdOutlineChat,
} from 'react-icons/md';
import { FaBath, FaExpandAlt } from 'react-icons/fa';
import { TbDimensions } from 'react-icons/tb';

function Card({ item }) {
	console.log(item);
	return (
		<div className="flex-1 basis-[calc(33.33%-20px)] flex flex-col rounded-lg shadow-md bg-white transition-transform duration-300 hover:scale-[1.02] lg:basis-[calc(50%-20px)] md:basis-full">
			{/* Image Section */}
			<Link
				to={`/${item.id}`}
				className="w-full h-[200px]"
			>
				<img
					src={item.images[0]}
					alt={item.title}
					className="w-full h-full object-cover rounded-t-lg"
				/>
			</Link>

			{/* Content Section */}
			<div className="flex flex-col justify-between gap-2 px-4 py-2">
				{/* Title */}
				<h2 className="text-lg font-semibold text-secondary transition-all duration-400 hover:text-black hover:scale-[1.01]">
					<Link to={`/${item.id}`}>{item.title}</Link>
				</h2>

				{/* Address */}
				<p className="text-sm flex items-center gap-1 text-secondary pb-2">
					<MdLocationPin size={20} />
					<span>{item.address}</span>
				</p>

				{/* Bottom Section */}
				<div className="flex justify-between items-center gap-2.5 mt-2.5 w-full">
					<div className="flex w-full justify-between items-center text-xs">
						<div className="flex flex-col items-center gap-1">
							<MdBed size={20} />
							<span className="whitespace-nowrap text-secondary">
								{item.bedroom} bed
							</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<FaBath size={20} />
							<span className="whitespace-nowrap text-secondary text-xs">
								{item.bathroom} bath
							</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<MdDirectionsCar size={20} />
							<span className="whitespace-nowrap text-secondary">
								{item.bathroom} Parking
							</span>
						</div>
						<div className="flex flex-col items-center gap-1">
							<TbDimensions size={22} />
							<span className="whitespace-nowrap text-secondary">
								{item.bathroom} Sqft
							</span>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-200 my-2.5"></div>

				{/* Price and Icons Row */}
				<div className="flex justify-between items-center">
					<p className="text-lg font-semibold text-accent">ksh {item.price}</p>
					<div className="flex gap-4 items-center justify-between">
						<button className="cursor-pointer">
							<FaExpandAlt
								size={20}
								className="hover:text-accent"
							/>
						</button>
						<button className="cursor-pointer">
							<MdOutlineChat
								size={20}
								className="hover:text-accent"
							/>
						</button>
						<button className="cursor-pointer">
							<MdAddCircleOutline
								size={20}
								className="hover:text-accent"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
