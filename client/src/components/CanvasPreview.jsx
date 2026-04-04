import { useNavigate } from "react-router-dom";

const CanvasPreview = ({ id, title, createdBy, lastModified }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/canvas/${id}`)}
			className='p-4 border rounded'>
			<p className='font-bold'>{title}</p>
			<div className='flex justify-between items-center'>
				<p>{createdBy}</p>
				<p className='text-sm'>{new Date(lastModified).toLocaleDateString()}</p>
			</div>
		</div>
	);
};

export default CanvasPreview;
