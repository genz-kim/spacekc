import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { useSignIn } from '@clerk/clerk-react'; // Import Clerk SignIn hook
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Login() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { updateUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const { signIn, isLoaded } = useSignIn(); // Clerk sign-in

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		const formData = new FormData(e.target);

		const username = formData.get('username');
		const password = formData.get('password');

		try {
			const res = await apiRequest.post('/auth/login', {
				username,
				password,
			});
			updateUser(res.data);
			navigate('/list');
		} catch (err) {
			console.error('Login Error:', err);
			setError(err.response?.data?.message || 'An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	// Google Sign-In with Clerk
	const handleGoogleLogin = async () => {
		if (!isLoaded) return;
		try {
			await signIn.authenticateWithRedirect({
				strategy: 'oauth_google',
				redirectUrl: '/list', // Redirect after login
			});
		} catch (err) {
			console.error('Google Sign-in Error:', err);
			setError('Failed to sign in with Google.');
		}
	};

	return (
		<div className="w-full h-full flex flex-col justify-center items-center py-5 md:py-20">
			<div className="flex flex-col gap-4 w-full md:w-[486px] bg-white rounded-lg shadow-lg p-4 md:p-8">
				<h1 className="text-lg font-semibold pb-2">Welcome back</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4"
				>
					<input
						name="username"
						required
						minLength={3}
						maxLength={15}
						type="text"
						placeholder="Username"
						className="w-full py-2 bg-white border border-[#E5E7EB] rounded-md px-3 focus:outline-none focus:border-accent"
					/>
					<input
						name="password"
						required
						minLength={3}
						maxLength={15}
						type="password"
						placeholder="Password"
						className="w-full py-2 bg-white border border-[#E5E7EB] rounded-md px-3 focus:outline-none focus:border-accent"
					/>
					<div className="w-full">
						<button
							disabled={isLoading}
							className="w-full bg-accent rounded-sm p-1.5 text-white font-bold cursor-pointer disabled:cursor-none disabled:bg-gray-400"
						>
							Login
						</button>
						{error && <span className="text-red-500">{error}</span>}
						<p className="text-sm pt-2">
							Don't have an account?{' '}
							<Link
								to="/register"
								className="text-blue-500"
							>
								Register
							</Link>
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<hr className="flex-grow border-t border-gray-300" />
							<span className="text-xs text-gray-500 whitespace-nowrap">
								Or login with
							</span>
							<hr className="flex-grow border-t border-gray-300" />
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleGoogleLogin}
								className="flex gap-2 p-1.5 bg-white border border-[#E5E7EB] rounded-md w-full text-center justify-center items-center"
							>
								<FcGoogle size={25} />
								Google
							</button>
							<button
								className="flex gap-2 p-1.5 bg-white border border-[#E5E7EB] rounded-md w-full text-center justify-center items-center"
								onClick={handleGoogleLogin}
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

export default Login;
