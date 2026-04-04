import Canvas from "../models/canvas.model.js";

export const createCanvas = async (req, res) => {
	const newCanvas = new Canvas({
		createdBy: req.user.id,
	});

	const canvas = await newCanvas.save();

	return res.status(201).json({
		message: "Canvas created successfully",
		canvas,
	});
};

export const getAllCanvases = async (req, res) => {
	const allCanvas = await Canvas.find()
		.select()
		.populate("createdBy", "name")
		.sort({ lastModified: -1 });

	return res.status(200).json(allCanvas);
};

export const getMyCanvases = async (req, res) => {
	const myCanvases = await Canvas.find({ createdBy: req.params.userId })
		.select()
		.sort({ lastModified: -1 });

	return res.status(200).json(myCanvases);
};

export const getCanvasById = async (req, res) => {
	const canvas = await Canvas.findById(req.params.canvasId);

	if (!canvas) {
		return res.status(404).json({
			message: "Canvas not found",
		});
	}

	return res.status(200).json(canvas);
};

export const editCanvas = async (req, res) => {
	const { title, html, css, js } = req.body;

	const updatedCanvas = await Canvas.findOneAndUpdate(
		{ _id: req.params.canvasId, createdBy: req.user.id },
		{
			title,
			html,
			css,
			js,
		},
		{
			new: true,
		},
	);

	if (!updatedCanvas) {
		return res.status(403).json({
			message: "Unauthorized to update this canvas",
		});
	}

	return res.status(200).json({
		message: "Canvas updated successfully",
	});
};

export const deleteCanvas = async (req, res) => {
	const canvas = await Canvas.findByIdAndDelete({
		_id: req.params.canvasId,
		createdBy: req.user.id,
	});

	if (!canvas) {
		return res.status(403).json({
			message: "Unauthorized to delete this canvas",
		});
	}

	return res.status(200).json({
		message: "Canvas deleted successfully",
	});
};
