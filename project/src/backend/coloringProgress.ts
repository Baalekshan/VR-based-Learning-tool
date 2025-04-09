import express, { Request, Response } from "express";
import authenticateUser, { AuthRequest } from "./middleware/authenticateUser";
import { ColoringProgress } from "./models/ColoringProgressSchema";

const router = express.Router();

// Save coloring progress
router.post("/save-progress", authenticateUser, async (req: Request, res: Response): Promise<any> => {
  try {
    const { imageId, canvasState } = req.body;
    const userId = (req as AuthRequest).user?.userId;

    if (!imageId || !canvasState) {
      return res.status(400).json({ message: "Image ID and canvas state are required." });
    }

    const progress = new ColoringProgress({
      userId,
      imageId,
      canvasState,
    });

    await progress.save();
    res.status(201).json({ message: "Progress saved successfully." });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Retrieve coloring progress
router.get("/get-progress", authenticateUser, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    const { imageId } = req.query;

    if (!imageId) {
      return res.status(400).json({ message: "Image ID is required." });
    }

    const progress = await ColoringProgress.findOne({ userId, imageId });

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this image." });
    }

    res.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router; 