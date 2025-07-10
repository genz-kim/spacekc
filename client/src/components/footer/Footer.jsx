import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

function Footer() {
	return (
		<footer className="bg-secondary text-white py-10 px-5 flex flex-col gap-10">
			<div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10">
				<div className="flex-1 min-w-[220px] flex flex-col gap-4">
					<h2 className="text-2xl text-white mb-2.5">Space KC</h2>
					<p className="text-sm text-gray-300">
						Innovating your digital space — web, mobile & beyond.
					</p>
				</div>

				<div className="flex-1 min-w-[220px] flex flex-col gap-4">
					<h3 className="text-lg text-white mb-2.5">Quick Links</h3>
					<ul className="list-none p-0">
						<li className="mb-1.5">
							<a
								href="/"
								className="text-sm text-gray-300 hover:text-[#00d8ff] transition-colors duration-300 no-underline"
							>
								Home
							</a>
						</li>
						<li className="mb-1.5">
							<a
								href="/about"
								className="text-sm text-gray-300 hover:text-[#00d8ff] transition-colors duration-300 no-underline"
							>
								About
							</a>
						</li>
						<li className="mb-1.5">
							<a
								href="/services"
								className="text-sm text-gray-300 hover:text-[#00d8ff] transition-colors duration-300 no-underline"
							>
								Services
							</a>
						</li>
						<li className="mb-1.5">
							<a
								href="/contact"
								className="text-sm text-gray-300 hover:text-[#00d8ff] transition-colors duration-300 no-underline"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>

				<div className="flex-1 min-w-[220px] flex flex-col gap-4">
					<h3 className="text-lg text-white mb-2.5">Contact</h3>
					<p className="text-sm text-gray-300">Email: hello@spacekc.dev</p>
					<p className="text-sm text-gray-300">Phone: +254 712 345 678</p>
					<div className="flex gap-2.5">
						<a
							href="#"
							className="text-lg transition-colors duration-300"
						>
							<FaFacebookF />
						</a>
						<a
							href="#"
							className="text-lg transition-colors duration-300"
						>
							<FaTwitter />
						</a>
						<a
							href="#"
							className="text-lg transition-colors duration-300"
						>
							<FaLinkedinIn />
						</a>
						<a
							href="https://github.com/Evan-cell"
							target="_blank"
							rel="noopener noreferrer"
							className="text-lg transition-colors duration-300"
						>
							<FaGithub />
						</a>
					</div>
				</div>

				<div className="flex-1 min-w-[220px] flex flex-col gap-4">
					<h3 className="text-lg text-white mb-2.5">Subscribe</h3>
					<p className="text-sm text-gray-300">
						Get updates on our latest projects and offers.
					</p>
					<form className="flex gap-2.5 md:flex-row flex-col">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 p-2.5 border border-gray-700 rounded"
						/>
						{/* <button
							type="submit"
							className="p-2.5 px-4 border-none bg-accent text-black rounded cursor-pointer font-bold hover:bg-accent transition-colors duration-300 md:w-auto w-full"
						>
							Subscribe
						</button> */}
					</form>
				</div>
			</div>
			<div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-10">
				<p>© {new Date().getFullYear()} Space KC. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
