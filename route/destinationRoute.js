import express from "express";
import {
  createDestination,
  getDestinationById,
} from "../controller/destinationController.js";
import Destination from "../models/destinationModel.js";
const router = express.Router();
import validateRequest from "../middleware/validationMiddleWare.js";
import { destinationSchema } from "../validation/destinationSchema.js";
router.post(
  "/destinations",
  validateRequest(destinationSchema),
  createDestination
);

router.get("/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/destinations/:id", getDestinationById);

export default router;
