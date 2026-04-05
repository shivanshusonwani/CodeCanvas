import { useNavigate } from "react-router-dom";

const CanvasPreview = ({ canvas }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/canvas/${canvas._id}`)}
			className='max-w-92 rounded border border-sky-400  text-neutral-800 shadow-xl'>
			<div className='w-full aspect-3/2 bg-white rounded'>
				<Canvas
					html={canvas.html}
					css={canvas.css}
					js={canvas.js}
				/>
			</div>
			<div className='p-4 border-t border-sky-400'>
				<p className='font-bold'>{canvas.title}</p>
				<div className='flex justify-between items-center'>
					<p className='text-sm'>{canvas.createdBy.name}</p>
					<p className='text-xs'>
						{new Date(canvas.lastModified).toLocaleDateString()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CanvasPreview;

const Canvas = ({ html, css, js }) => {
	const srcDoc = `
		<html>
			<head><style>${css}</style></head>
			<body>${html}</body>
			<script>${js}</script>
		</html>
	`;
	return (
		<div className='relative w-full h-full overflow-hidden'>
			<iframe
				srcDoc={srcDoc}
				title='preview'
				sandbox='allow-scripts'
				className='absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-[0.5] pointer-events-none'
			/>
			<div className='absolute inset-0 z-10 bg-transparent'></div>
		</div>
	);
};
