import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className='h-screen flex items-center justify-center'>
			<form className='p-8 rounded shadow-lg w-96 flex flex-col gap-4'>
				<h2 className='text-2xl font-bold'>Create Account</h2>
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
					className='w-full text-white bg-sky-400 p-2 rounded font-bold cursor-pointer'>
					Sign up
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
