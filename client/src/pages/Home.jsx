import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import Navbar from "../components/Navbar";
import CanvasPreview from "../components/CanvasPreview";

const Home = () => {
	const [canvases, setCanvases] = useState([]);

	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		const fetchCanvas = async () => {
			const res = await API.get("/canvas");
			setCanvases(res.data);
		};

		fetchCanvas();
	}, []);

	const handleCreate = async () => {
		const res = await API.post("/canvas", {
			createdBy: user._id,
		});

		navigate(`/canvas/${res.data.canvas._id}`);
	};

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
					{user ? (
						<button
							onClick={handleCreate}
							className='mt-3 px-4 py-1 text-xl font-bold bg-sky-400 text-white rounded-lg'>
							Create Canvas
						</button>
					) : (
						<button className='mt-3 px-4 py-1 text-xl font-bold bg-sky-400 text-white rounded-lg'>
							<Link to='/signup'>Get Started</Link>
						</button>
					)}
				</div>
			</section>

			<div className='max-w-7xl mx-auto px-4'>
				<main className='grid grid-cols-3 gap-8'>
					{canvases.map((canvas) => (
						<CanvasPreview
							key={canvas._id}
							id={canvas._id}
							title={canvas.title}
							createdBy={canvas.createdBy.name}
							lastModified={canvas.lastModified}
						/>
					))}
				</main>
			</div>
		</div>
	);
};

export default Home;
