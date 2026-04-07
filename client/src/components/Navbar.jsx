import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<div className='fixed z-10 w-full pt-8 p-4 bg-white shadow-md'>
			<div className='flex justify-between items-center'>
				<Link
					to='/'
					className='font-semibold'>
					<div className='flex items-baseline gap-1'>
						<span className='text-sky-400 text-2xl font-mono'>[C]</span>
						<p>CodeCanvas</p>
					</div>
				</Link>

				<div className='flex items-center gap-4'>
					{user ? (
						<>
							<span className='border-r pr-3'>Hi, {user.name}</span>
							<button
								onClick={logout}
								className='px-2 py-1 font-bold text-red-400 bg-red-100 rounded-lg cursor-pointer'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to='/login'
								className='font-semibold'>
								Login
							</Link>
							<Link
								to='/signup'
								className='px-2 py-1 font-bold text-white bg-sky-400 rounded-lg cursor-pointer'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
