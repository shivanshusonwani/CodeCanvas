import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className='h-screen'>
			<div className='fixed z-10 w-full pt-8 p-4 bg-white shadow-md'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<p className='font-semibold'>CodeCanvas</p>
					<div className='flex items-center gap-4'>
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
					</div>
				</div>
			</div>

			<section className='pb-16 pt-36 px-4 max-w-7xl mx-auto'>
				<div className=''>
					<h1 className='text-6xl font-bold tracking-wide text-sky-400'>
						CodeCanvas
					</h1>
					<p className='text-neutral-400 text-lg font-semibold'>
						Your personal gallery for web experiments and UI components.
					</p>
				</div>
			</section>

			<div className='max-w-7xl mx-auto px-4'>
				<main className='grid grid-cols-3 gap-8'>
					<div className='border h-40 text-center'>Canvas</div>
					<div className='border h-40 text-center'>Canvas</div>
					<div className='border h-40 text-center'>Canvas</div>
					<div className='border h-40 text-center'>Canvas</div>
					<div className='border h-40 text-center'>Canvas</div>
				</main>
			</div>
		</div>
	);
};

export default Home;
