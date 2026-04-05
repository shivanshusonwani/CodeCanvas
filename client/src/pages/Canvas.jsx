import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import Navbar from "../components/Navbar";
import MonacoEditor from "../components/MonacoEditor";

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
			<header className='pt-20 bg-sky-50 border-b border-sky-200'>
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
									className='bg-red-500 font-bold text-white px-4 py-1 rounded-md'>
									Delete
								</button>
							</>
						)}
					</div>
				</div>
			</header>

			<div className='flex h-screen w-full overflow-hidden'>
				<div className='flex flex-col w-1/4 min-w-80 bg-neutral-900 border-r border-neutral-700'>
					<MonacoEditor
						className='text-white p-2 outline-none font-mono text-sm'
						label='HTML'
						language='html'
						onChange={(val) => setCanvas({ ...canvas, html: val })}
						value={canvas.html || ""}
					/>
					<MonacoEditor
						className='text-white p-2 outline-none font-mono text-sm'
						label='CSS'
						language='css'
						onChange={(val) => setCanvas({ ...canvas, css: val })}
						value={canvas.css || ""}
					/>
					<MonacoEditor
						className='text-white p-2 outline-none font-mono text-sm'
						label='JS'
						language='js'
						onChange={(val) => setCanvas({ ...canvas, js: val })}
						value={canvas.js || ""}
					/>
				</div>

				<div className='flex-1 w-3/4 bg-white'>
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
