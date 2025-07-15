import React from 'react';
import PricingCard from './PricingCard';
import PricingSaving from './PricingSaving';
import { MdOutlineTaskAlt } from 'react-icons/md';

const pricingData = [
	{
		title: 'Starter',
		price: 'Ksh 250',
		period: '/Day',
		ideal: 'Ideal for one-time, quick property lookup',
		features: [
			'1-Day Access',
			'Limited number of properties',
			'View property name & location',
			'Contact agent',
		],
	},
	{
		title: 'Basic',
		price: 'Ksh 900',
		period: '/Week',
		ideal: 'Ideal for short-term urgent property search',
		features: [
			'7-Days Access',
			'Limited number of properties',
			'View full property details',
			'Advanced search filters',
		],
	},
	{
		title: 'Pro',
		price: 'Ksh 1300',
		period: '/Month',
		ideal: 'Perfect for ongoing property hunting',
		features: [
			'30-Days Access',
			'Unlimited number of properties',
			'Email alerts for New listing',
			'Standard support',
		],
		mostPopular: true, // Highlight this card
	},
	{
		title: 'Elite',
		price: 'Ksh 4550',
		period: '/Year',
		ideal: 'Ideal for regular property agents and owners',
		features: [
			'1-Year Access',
			'All features from pro',
			'Property listing & management',
			'Priority support',
		],
	},
];

const Pricing = () => {
	return (
		<div
			className="w-full py-10 flex flex-col gap-4 justify-center text-center bg-[#fafaff]"
			id="pricing"
		>
			<div className="flex flex-col">
				<h1 className="text-xl md:text-2xl text-secondary">Pricing</h1>
				<p className="text-secondary text-sm">
					Explore for free and unlock for additional features
				</p>
			</div>
			<PricingSaving />
			<div className="flex flex-col md:flex-row gap-4 py-6 items-stretch">
				{pricingData.map((plan, idx) => (
					<div
						key={idx}
						className={`relative w-full max-w-xs mx-auto md:w-full ${
							plan.mostPopular
								? 'border-2 border-accent shadow-lg rounded-lg'
								: ''
						}`}
					>
						{plan.mostPopular && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 text-xs font-semibold rounded-md shadow-md">
								Most Popular
							</div>
						)}

						<PricingCard className="w-full flex flex-col py-6 h-full">
							<div className="flex flex-col h-full gap-3 px-4 text-left">
								<h2 className="text-lg font-bold text-accent">{plan.title}</h2>
								<div className="flex items-end gap-2">
									<span className="text-lg md:text-xl font-bold text-secondary">
										{plan.price}
									</span>
									<span className="text-base text-secondary/60 font-medium">
										{plan.period}
									</span>
								</div>
								<p className="text-sm text-secondary/60">{plan.ideal}</p>
								<ul className="text-sm text-secondary flex flex-col gap-3 pb-4">
									{plan.features.map((feature, i) => (
										<li
											key={i}
											className="flex items-center gap-2"
										>
											<MdOutlineTaskAlt className="text-accent text-lg" />
											{feature}
										</li>
									))}
								</ul>
								<button className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors w-full font-semibold">
									Get Started
								</button>
							</div>
						</PricingCard>
					</div>
				))}
			</div>
		</div>
	);
};

export default Pricing;
