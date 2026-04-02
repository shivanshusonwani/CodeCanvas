import Navbar from "../components/Navbar";

const Home = () => {
	return (
		<div className='h-screen'>
			<Navbar />

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
