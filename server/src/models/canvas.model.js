import { Schema, model } from "mongoose";

const canvasSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			default: "Untitled Canvas",
		},
		html: {
			type: String,
			default: "",
		},
		css: {
			type: String,
			default: "",
		},
		js: {
			type: String,
			default: "",
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		lastModified: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

const Canvas = model("Canvas", canvasSchema);
export default Canvas;
