import express from "express";
import {
  createSource,
  getSources,
  getSourceById,
} from "../controller/sourceController.js";
import validateRequest from "../middleware/validationMiddleWare.js";
import { sourceSchema } from "../validation/sourceSchema.js";
const router = express.Router();

router.post("/sources", validateRequest(sourceSchema), createSource);
router.get("/sources", getSources);
router.get("/sources/:id", getSourceById);

export default router;
