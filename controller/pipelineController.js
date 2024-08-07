import mongoose from "mongoose";
import Pipeline from "../models/pipelineModel.js";
import Source from "../models/sourceModel.js";
import Destination from "../models/destinationModel.js";
import { addMessageViaWebhook } from "./messageController.js";
// Create a new pipeline
export const createPipeline = async (req, res) => {
  const { sourceId, destinationId, name } = req.body;
  try {
    // Fetch source and destination documents
    if (
      !mongoose.isValidObjectId(sourceId) ||
      !mongoose.isValidObjectId(destinationId)
    ) {
      throw new Error("Invalid source or destination");
    }
    const source = await Source.findById(sourceId);
    const destination = await Destination.findById(destinationId);

    if (!source || !destination) {
      return res
        .status(400)
        .json({ error: "Invalid source or destination ID" });
    }

    // Create the pipeline
    const pipeline = new Pipeline({ sourceId, destinationId, name });
    await pipeline.save();

    // Send a message via webhook with source and destination names
    await addMessageViaWebhook({
      pretext: "A new pipeline has been created.",
      title: "Pipeline Created",
      text: `Source: ${source.name}, Destination: ${destination.name}`,
      author_name: "Pipeline Service",
    });

    res.status(201).json(pipeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all pipelines
export const getPipelines = async (req, res) => {
  try {
    const pipelines = await Pipeline.find().populate("sourceId destinationId");
    res.status(200).json(pipelines);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching pipelines", details: error.message });
  }
};

// Get a pipeline by ID
export const getPipelineById = async (req, res) => {
  const { id } = req.params;

  try {
    const pipeline = await Pipeline.findById(id).populate(
      "sourceId destinationId"
    );
    if (!pipeline) {
      return res.status(404).json({ error: "Pipeline not found" });
    }
    res.status(200).json(pipeline);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching pipeline", details: error.message });
  }
};
