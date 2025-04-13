import mongoose, { Schema, Document } from "mongoose";

interface IColoringProgress extends Document {
  userId: string;
  imageId: string;
  canvasState: string;
  createdAt: Date;
  updatedAt: Date;
}

const ColoringProgressSchema = new Schema<IColoringProgress>({
  userId: { type: String, required: true },
  imageId: { type: String, required: true },
  canvasState: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add compound index for faster queries
ColoringProgressSchema.index({ userId: 1, imageId: 1 }, { unique: true });

export const ColoringProgress = mongoose.model<IColoringProgress>("ColoringProgress", ColoringProgressSchema); 