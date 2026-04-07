import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import Navbar from "../components/Navbar";
import CanvasPreview from "../components/CanvasPreview";

const Home = () => {
	const [canvases, setCanvases] = useState([]);
	const [view, setView] = useState("trending");

	const [isFetching, setIsFetching] = useState(false);

	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (!user && view === "my-canvases") {
			setView("trending");
			return;
		}
		const fetchCanvas = async () => {
			setIsFetching(true);
			try {
				const endpoint =
					view === "trending" ? "/canvas" : `/canvas/${user._id}`;
				const res = await API.get(endpoint);
				setCanvases(res.data);
			} catch (error) {
				console.error(error.response?.data?.message || "Error loading data");
			} finally {
				setIsFetching(false);
			}
		};

		if (view === "trending" || (user && view === "my-canvases")) {
			fetchCanvas();
		}
	}, [view, user]);

	const handleCreate = async () => {
		try {
			const res = await API.post("/canvas", {
				createdBy: user._id,
			});

			navigate(`/canvas/${res.data.canvas._id}`);
		} catch (error) {
			console.error("Something went wrong");
		}
	};

	return (
		<div className='h-screen'>
			<Navbar />

			<section className='pb-8 pt-24 px-4 max-w-7xl mx-auto'>
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
							className='mt-3 px-4 py-1 text-xl font-bold bg-sky-400 text-white rounded-lg cursor-pointer'>
							Create Canvas
						</button>
					) : (
						<button className='mt-3 px-4 py-1 text-xl font-bold bg-sky-400 text-white rounded-lg'>
							<Link to='/signup'>Get Started</Link>
						</button>
					)}
				</div>
			</section>

			<section className='max-w-7xl mx-auto p-4'>
				<div className='flex gap-8 border-b border-sky-400 mb-8'>
					<button
						onClick={() => setView("trending")}
						className={`relative px-2 pb-2 text-lg font-semibold transition-all ${view === "trending" ? "text-sky-400" : "text-neutral-400 hover:text-neutral-400/80 cursor-pointer"}`}>
						Trending
						{view === "trending" && (
							<span className='absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-sky-400'></span>
						)}
					</button>

					{user && (
						<button
							onClick={() => setView("my-canvases")}
							className={`relative pb-2 text-lg font-semibold transition-all ${
								view === "my-canvases"
									? "text-sky-400"
									: "text-neutral-400 hover:text-neutral-400/80 cursor-pointer"
							}`}>
							My Creations
							{view === "my-canvases" && (
								<span className='absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-sky-400'></span>
							)}
						</button>
					)}
				</div>
				<div className='max-w-7xl mx-auto py-4 rounded-2xl'>
					{isFetching ? (
						<div className='flex flex-col gap-12 justify-center items-center py-20'>
							<div className='animate-spin h-8 w-8 border-4 border-sky-400 border-t-transparent rounded-full'></div>
							<p>Syncing canvases...</p>
						</div>
					) : (
						<main className='grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-12'>
							{canvases.map((canvas) => (
								<CanvasPreview
									key={canvas._id}
									canvas={canvas}
								/>
							))}
						</main>
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
