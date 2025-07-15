import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

//!TODO: Remove static data
const testimonials = [
	{
		name: 'Catherine',
		message:
			'Easiest way to find a house in Nairobi, I was able to find a house in just one day.',
		rating: 5,
	},
	{
		name: 'Catherine',
		message:
			'Easiest way to find a house in Nairobi, I was able to find a house in just one day.',
		rating: 4,
	},
	{
		name: 'Catherine',
		message:
			'Easiest way to find a house in Nairobi, I was able to find a house in just one day.',
		rating: 3,
	},

	{
		name: 'Catherine',
		message:
			'Easiest way to find a house in Nairobi, I was able to find a house in just one day.',
		rating: 2,
	},
	{
		name: 'Catherine',
		message:
			'Easiest way to find a house in Nairobi, I was able to find a house in just one day.',
		rating: 5,
	},
];

const Testimonials = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<section className='pt-10'>
			<div
				className="relative bg-cover bg-bottom py-10"
				style={{ backgroundImage: "url('/testmonialBg.jpg')" }}
			>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/60 z-0"></div>
				<div className="max-w-6xl mx-auto px-4 text-white relative z-10">
					<div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 md:gap-16">
						{/* Left: Title */}
						<div className="md:w-1/4 w-full flex items-center md:justify-start justify-center min-w-[220px] max-w-xs md:max-w-sm">
							<h2 className="text-3xl md:text-4xl font-bold md:text-left text-center">
								Client Testimonials
							</h2>
						</div>
						{/* Right: Carousel */}
						<div className="md:w-3/4 w-full relative">
							<Swiper
								modules={[Navigation]}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								onInit={(swiper) => {
									// @ts-ignore
									swiper.params.navigation.prevEl = prevRef.current;
									// @ts-ignore
									swiper.params.navigation.nextEl = nextRef.current;
									swiper.navigation.init();
									swiper.navigation.update();
								}}
								spaceBetween={32}
								slidesPerView={1.1}
								breakpoints={{
									768: { slidesPerView: 2.2, spaceBetween: 32 },
									1024: { slidesPerView: 3, spaceBetween: 32 },
								}}
							>
								{testimonials.map((testimonial, idx) => (
									<SwiperSlide key={idx}>
										<div className="flex flex-col gap-2 bg-[#122043] rounded-xl text-white shadow-lg px-3 py-3">
											<p className="leading-relaxed text-xs">
												{testimonial.message}
											</p>
											<p className="font-semibold text-xs">
												{testimonial.name}
											</p>
											<div className="text-orange-400 text-xs">
												{'★'.repeat(testimonial.rating)}
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<div className="flex justify-center mt-6 gap-4">
								<button
									ref={prevRef}
									className="text-orange-500 bg-transparent p-2"
								>
									<MdChevronLeft size={32} />
								</button>
								<button
									ref={nextRef}
									className="text-orange-500 bg-transparent p-2"
								>
									<MdChevronRight size={32} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
