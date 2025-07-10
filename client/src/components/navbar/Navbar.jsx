import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

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
		<nav className="flex justify-between items-center h-20 border-b border-gray-200">
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
			<div className="flex gap-5">
				<Link
					to="/list"
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
				<Link
					to="/contact"
					className="hover:text-accent"
				>
					Pricing
				</Link>
				<Link
					to="/"
					className="hover:text-accent"
				>
					Agent Hub
				</Link>
			</div>
			<div className="">
				{currentUser ? (
					<div className="user">
						<img
							src={currentUser.avatar || '/noavatar.jpg'}
							alt="User Avatar"
						/>
						<span>{currentUser.username}</span>
						<Link
							to="/profile"
							className="profile"
						>
							{number > 0 && <div className="notification">{number}</div>}
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
				{/* <div className="menuIcon">
					<img
						src="/menu.png"
						alt="Menu"
						onClick={() => setOpen(!open)}
					/>
				</div> */}
				{/* <div className={open ? 'menu active' : 'menu'}>
					<Link to="/list">Houses</Link>
					<Link to="/">About</Link>
					<Link to="/">Contact</Link>
					<Link to="/">Agents</Link>
					{!currentUser && <Link to="/login">Sign in</Link>}
					{!currentUser && <Link to="/register">Sign up</Link>}
				</div> */}
			</div>
		</nav>
	);
}

export default Navbar;
