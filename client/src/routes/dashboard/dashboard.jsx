import React from 'react';

const Dashboard = () => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Left Navbar */}
			<div className="w-64 bg-white shadow-lg p-6 flex flex-col">
				<div className="text-2xl font-bold mb-8 text-blue-600">AgentPro</div>
				<nav className="flex flex-col gap-4 text-white bg-secondary">
					<a
						href="#"
						className="hover:text-blue-500"
					>
						🏠 Dashboard
					</a>
					<a
						href="#"
						className="hover:text-blue-500"
					>
						📋 Listings
					</a>
					<a
						href="#"
						className="hover:text-blue-500"
					>
						👥 Clients
					</a>
					<a
						href="#"
						className="hover:text-blue-500"
					>
						💬 Messages
					</a>
					<a
						href="#"
						className="hover:text-blue-500"
					>
						⚙️ Settings
					</a>
				</nav>
				<div className="mt-auto pt-6 border-t text-sm text-gray-500">
					© 2025 AgentPro
				</div>
			</div>

			{/* Right Section */}
			<div className="flex-1 p-10">Right section</div>
		</div>
	);
};

export default Dashboard;
