import Canvas from "../models/canvas.model.js";

export const createCanvas = async (req, res) => {
	try {
		const newCanvas = new Canvas({
			createdBy: req.user.id,
		});

		const canvas = await newCanvas.save();

		return res.status(201).json({
			message: "Canvas created successfully",
			canvas,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error creating canvas",
			error: error.message,
		});
	}
};

export const getAllCanvases = async (req, res) => {
	try {
		const allCanvas = await Canvas.find({ isPublic: true })
			.populate("createdBy", "name")
			.sort({ lastModified: -1 });

		return res.status(200).json(allCanvas);
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching public canvases",
			error: error.message,
		});
	}
};

export const getMyCanvases = async (req, res) => {
	try {
		const myCanvases = await Canvas.find({ createdBy: req.params.userId })
			.select()
			.sort({ lastModified: -1 });

		return res.status(200).json(myCanvases);
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching your canvases",
			error: error.message,
		});
	}
};

export const getCanvasById = async (req, res) => {
	try {
		const canvas = await Canvas.findById(req.params.canvasId);

		if (!canvas) {
			return res.status(404).json({
				message: "Canvas not found",
			});
		}

		return res.status(200).json(canvas);
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching canvas",
			error: error.message,
		});
	}
};

export const editCanvas = async (req, res) => {
	const { title, html, css, js, isPublic } = req.body;

	try {
		const updatedCanvas = await Canvas.findOneAndUpdate(
			{ _id: req.params.canvasId, createdBy: req.user.id },
			{
				title,
				html,
				css,
				js,
				isPublic,
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
	} catch (error) {
		return res.status(500).json({
			message: "Error updating canvas",
			error: error.message,
		});
	}
};

export const deleteCanvas = async (req, res) => {
	try {
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
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error deleting canvas", error: error.message });
	}
};
