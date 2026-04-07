import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const res = await signup(name, email, password);
			if (res.success) {
				alert("Welcome to CodeCanvas, Please login to continue...");
				navigate("/login");
			} else {
				setError(res.message);
			}
		} catch (error) {
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit}
				className='p-8 rounded shadow-lg w-96 flex flex-col gap-4'>
				<h2 className='text-2xl font-bold'>Create Account</h2>
				{error && (
					<div className='p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg'>
						{error}
					</div>
				)}
				<div className='space-y-2'>
					<input
						type='text'
						placeholder='Full Name'
						className='w-full p-2 border rounded'
						onChange={(e) => setName(e.target.value)}
						value={name}
						required
					/>
					<input
						type='email'
						placeholder='Email'
						className='w-full p-2 border rounded'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
					/>
					<input
						type='password'
						placeholder='Password (min 6 chars)'
						className='w-full p-2 border rounded'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className={`w-full text-white bg-sky-400 p-2 rounded font-bold cursor-pointer ${
						isLoading
							? "opacity-70 cursor-not-allowed"
							: "hover:bg-sky-500 cursor-pointer"
					}`}>
					{isLoading ? (
						<>
							<div className='flex justify-center items-center gap-4 cursor-not-allowed'>
								<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
								Signing up...
							</div>
						</>
					) : (
						"Signup"
					)}
				</button>
				<p className='text-sm'>
					Already have an account?{" "}
					<Link
						to='/login'
						className='font-semibold text-sky-400'>
						Log in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signup;
