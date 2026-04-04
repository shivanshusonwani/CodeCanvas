import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import Navbar from "../components/Navbar";

const Canvas = () => {
	const [canvas, setCanvas] = useState({
		title: "",
		html: "",
		css: "",
		js: "",
	});
	const [srcDoc, setSrcDoc] = useState("");

	const { user } = useAuth();

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCanvas = async () => {
			const res = await API.get(`/canvas/view/${id}`);
			// console.log(id);
			setCanvas(res.data);
		};
		if (id) {
			fetchCanvas();
		}
	}, [id]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
                <html>
                <head><style>${canvas.css}</style></head>
                <body>${canvas.html}</body>
                <script>${canvas.js}</script>
                </html>
                `);
		}, 250);
		return () => clearTimeout(timeout);
	}, [canvas.html, canvas.css, canvas.js]);

	const handleSave = async () => {
		await API.put(`/canvas/${id}`, canvas);
		alert("Canvas saved successfully.");
	};

	const handleDelete = async (canvasId) => {
		if (!window.confirm("Are you sure you want to delete this canvas?")) return;

		await API.delete(`/canvas/${canvasId}`);
		navigate("/");
	};

	return (
		<div className='flex flex-col h-screen overflow-hidden'>
			<Navbar />
			<header className='pt-20 bg-sky-50 border-b'>
				<div className='p-2 px-4 flex justify-between items-center'>
					<div className='border rounded-md border-sky-400'>
						{user && user._id === canvas.createdBy && (
							<>
								<button
									onClick={handleSave}
									className='bg-sky-400 font-bold text-white px-4 py-1 rounded-md'>
									Save
								</button>
							</>
						)}
						<input
							className='w-40 font-semibold px-2 py-1 outline-none'
							type='text'
							onChange={(e) => setCanvas({ ...canvas, title: e.target.value })}
							value={canvas.title}
						/>
					</div>
					<div className=''>
						{user && user._id === canvas.createdBy && (
							<>
								<button
									onClick={() => handleDelete(id)}
									className='bg-red-400 font-bold text-white px-4 py-1 rounded-md'>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			</header>

			<div className='flex h-screen w-full overflow-hidden'>
				<div className='flex flex-col w-1/3 bg-neutral-900 border-r border-neutral-700'>
					<textarea
						placeholder='HTML'
						className='border-b border-neutral-600 grow text-white p-2 outline-none font-mono text-sm'
						onChange={(e) => setCanvas({ ...canvas, html: e.target.value })}
						value={canvas.html || ""}
					/>
					<textarea
						placeholder='CSS'
						className='border-b border-neutral-600 grow text-white p-2 outline-none font-mono text-sm'
						onChange={(e) => setCanvas({ ...canvas, css: e.target.value })}
						value={canvas.css || ""}
					/>
					<textarea
						placeholder='JS'
						className='grow text-white p-2 outline-none font-mono text-sm'
						onChange={(e) => setCanvas({ ...canvas, js: e.target.value })}
						value={canvas.js || ""}
					/>
				</div>

				<div className='flex-1 bg-white'>
					<iframe
						className='w-full h-full border-none'
						srcDoc={srcDoc}
						title='output'
						sandbox='allow-scripts'
					/>
				</div>
			</div>
		</div>
	);
};

export default Canvas;
