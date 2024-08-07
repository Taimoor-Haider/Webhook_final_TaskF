import express from "express";
const router = express.Router();
import {
  createPipeline,
  getPipelines,
  getPipelineById,
} from "../controller/pipelineController.js";
import validateRequest from "../middleware/validationMiddleWare.js";
import { pipelineSchema } from "../validation/piplineSchema.js";

router.post("/pipelines", validateRequest(pipelineSchema), createPipeline);
router.get("/pipelines", getPipelines);
router.get("/pipelines/:id", getPipelineById);

export default router;
