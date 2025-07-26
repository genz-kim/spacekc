import { useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react'; // Import Clerk SignUp hook
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Register() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { signUp, isLoaded } = useSignUp(); // Clerk sign-up

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);
		const formData = new FormData(e.target);

		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

		try {
			await apiRequest.post('/auth/register', {
				username,
				email,
				password,
			});
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	// Google Sign-Up with Clerk
	const handleGoogleSignUp = async () => {
		if (!isLoaded) return;
		try {
			await signUp.authenticateWithRedirect({
				strategy: 'oauth_google',
				redirectUrl: '/list', // Redirect after sign-up
			});
		} catch (err) {
			console.error('Google Sign-up Error:', err);
			setError('Failed to sign up with Google.');
		}
	};

	return (
		<div className="w-full h-full flex flex-col justify-center items-center py-5 md:py-20">
			<div className="flex flex-col gap-4 w-full md:w-[486px] bg-white rounded-lg shadow-lg p-4 md:p-8">
				<h1 className="text-lg font-semibold pb-2">Create an Account</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4"
				>
					<input
						className="w-full py-2 bg-white border border-[#E5E7EB] rounded-md px-3 focus:outline-none focus:border-accent"
						name="username"
						type="text"
						placeholder="Username"
						required
					/>
					<input
						className="w-full py-2 bg-white border border-[#E5E7EB] rounded-md px-3 focus:outline-none focus:border-accent"
						name="email"
						type="text"
						placeholder="Email"
						required
					/>
					<input
						className="w-full py-2 bg-white border border-[#E5E7EB] rounded-md px-3 focus:outline-none focus:border-accent"
						name="password"
						type="password"
						placeholder="Password"
						required
					/>

					<div className="w-full">
						<button
							disabled={isLoading}
							className="w-full bg-accent rounded-sm p-1.5 text-white font-bold cursor-pointer disabled:cursor-none disabled:bg-gray-400"
						>
							Register
						</button>
						{error && <span className="text-red-500">{error}</span>}
						<p className="text-sm pt-2">
							Already have an account?{' '}
							<Link
								to="/login"
								className="text-blue-500"
							>
								Log in
							</Link>
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<hr className="flex-grow border-t border-gray-300" />
							<span className="text-xs text-gray-500 whitespace-nowrap">
								Or register with
							</span>
							<hr className="flex-grow border-t border-gray-300" />
						</div>

						<div className="flex gap-3">
							<button
								className="flex gap-2 p-1.5 bg-white border border-[#E5E7EB] rounded-md w-full text-center justify-center items-center"
								onClick={handleGoogleSignUp}
							>
								<FcGoogle size={25} />
								Google
							</button>
							<button
								className="flex gap-2 p-1.5 bg-white border border-[#E5E7EB] rounded-md w-full text-center justify-center items-center"
								onClick={handleGoogleSignUp}
							>
								<FaFacebook
									size={25}
									className="text-blue-500"
								/>
								Facebook
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
