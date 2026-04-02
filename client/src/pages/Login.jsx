import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await login(email, password);
		if (res.success) {
			navigate("/");
		} else {
			alert("Login failed");
		}
	};

	return (
		<div className='h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit}
				className='p-8 rounded shadow-lg w-96 flex flex-col gap-4'>
				<h2 className='text-2xl font-bold'>Login to CodePen</h2>
				<div className='space-y-2'>
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
						placeholder='Password'
						className='w-full p-2 border rounded'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full text-white bg-sky-400 p-2 rounded font-bold cursor-pointer'>
					Login
				</button>
				<p className='text-sm'>
					Don't have an account?{" "}
					<Link
						to='/signup'
						className='font-semibold text-sky-400'>
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
