import mongoose, { Schema, Document } from "mongoose";

interface IColoringProgress extends Document {
  userId: string;
  imageId: string;
  canvasState: string;
  timestamp: Date;
}

const ColoringProgressSchema = new Schema<IColoringProgress>({
  userId: { type: String, required: true },
  imageId: { type: String, required: true },
  canvasState: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ColoringProgress = mongoose.model<IColoringProgress>("ColoringProgress", ColoringProgressSchema); 