import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { MdMenu, MdClose } from 'react-icons/md';

function Navbar() {
	const [open, setOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const fetch = useNotificationStore((state) => state.fetch);
	const number = useNotificationStore((state) => state.number);

	// Fetch notifications only if user is logged in
	useEffect(() => {
		if (currentUser) fetch();
	}, [currentUser]);

	return (
		<nav className="flex justify-between items-center h-20 border-b border-gray-200 px-4 md:px-8 relative bg-white z-20">
			<Link
				to="/"
				className="logo flex items-center gap-2"
			>
				<img
					src="/logo.png"
					alt="Logo"
					width={30}
					height={30}
				/>
				<span>SpaceKC</span>
			</Link>
			{/* Desktop Nav */}
			<div className="hidden md:flex gap-5">
				<Link
					to="/"
					className="hover:text-accent"
				>
					Explore
				</Link>
				<Link
					to="/about"
					className="hover:text-accent"
				>
					List Your Space
				</Link>
				<a
					href="#pricing"
					className="hover:text-accent"
				>
					Pricing
				</a>
				<Link
					to="/"
					className="hover:text-accent"
				>
					Agent Hub
				</Link>
			</div>
			{/* Desktop Auth */}
			<div className="hidden md:flex items-center">
				{currentUser ? (
					<div className="user flex items-center gap-2">
						<img
							src={currentUser.avatar || '/noavatar.jpg'}
							alt="User Avatar"
							className="w-8 h-8 rounded-full object-cover"
						/>
						<span>{currentUser.username}</span>
						<Link
							to="/profile"
							className="profile relative"
						>
							{number > 0 && (
								<div className="notification absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
									{number}
								</div>
							)}
							<span>Profile</span>
						</Link>
					</div>
				) : (
					<div className="flex gap-4">
						<Link
							to="/login"
							className="bg-accent text-white px-4 py-1 rounded-md"
						>
							Sign in
						</Link>
						<Link
							to="/register"
							className="border-accent border-2 text-accent px-4 py-1 rounded-md"
						>
							Sign up
						</Link>
					</div>
				)}
			</div>
			{/* Mobile Menu Icon */}
			<button
				className="md:hidden flex items-center justify-center text-3xl text-secondary focus:outline-none z-30"
				onClick={() => setOpen(!open)}
				aria-label="Toggle menu"
			>
				{open ? <MdClose /> : <MdMenu />}
			</button>
			{/* Mobile Dropdown */}
			{open && (
				<div className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col gap-6 py-8 md:hidden animate-fade-in z-20">
					<Link
						to="/"
						className="hover:text-accent text-lg w-full text-left px-8"
						onClick={() => setOpen(false)}
					>
						Explore
					</Link>
					<Link
						to="/about"
						className="hover:text-accent text-lg w-full text-left px-8"
						onClick={() => setOpen(false)}
					>
						List Your Space
					</Link>
					<a
						href="#pricing"
						className="hover:text-accent text-lg w-full text-left px-8"
						onClick={() => setOpen(false)}
					>
						Pricing
					</a>
					<Link
						to="/"
						className="hover:text-accent text-lg w-full text-left px-8"
						onClick={() => setOpen(false)}
					>
						Agent Hub
					</Link>
					{currentUser ? (
						<div className="user flex flex-col items-start gap-2 w-full px-8">
							<img
								src={currentUser.avatar || '/noavatar.jpg'}
								alt="User Avatar"
								className="w-10 h-10 rounded-full object-cover"
							/>
							<span>{currentUser.username}</span>
							<Link
								to="/profile"
								className="profile relative"
								onClick={() => setOpen(false)}
							>
								{number > 0 && (
									<div className="notification absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
										{number}
									</div>
								)}
								<span>Profile</span>
							</Link>
						</div>
					) : (
						<div className="flex flex-col gap-4 w-full px-8">
							<Link
								to="/login"
								className="bg-accent text-white px-4 py-2 rounded-md w-full text-center"
								onClick={() => setOpen(false)}
							>
								Sign in
							</Link>
							<Link
								to="/register"
								className="border-accent border-2 text-accent px-4 py-2 rounded-md w-full text-center"
								onClick={() => setOpen(false)}
							>
								Sign up
							</Link>
						</div>
					)}
				</div>
			)}
		</nav>
	);
}

export default Navbar;
