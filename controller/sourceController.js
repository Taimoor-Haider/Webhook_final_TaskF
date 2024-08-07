import Source from "../models/sourceModel.js";
import { addMessageViaWebhook } from "./messageController.js";

// Create a new Source
export const createSource = async (req, res) => {
  const { name, description } = req.body;
  try {
    const source = new Source({ name, description });
    await source.save();

    // Send a message via webhook
    await addMessageViaWebhook({
      pretext: "A new source has been created.",
      title: "Source Created",
      text: `Source Name: ${name}, Description: ${description}`,
      author_name: "Source Service",
    });

    res.status(201).json(source);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Sources
export const getSources = async (req, res) => {
  try {
    const sources = await Source.find();
    res.status(200).json(sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Source by ID
export const getSourceById = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    if (!source) return res.status(404).json({ error: "Source not found" });
    res.status(200).json(source);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Source by ID
export const updateSource = async (req, res) => {
  try {
    const source = await Source.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!source) return res.status(404).json({ error: "Source not found" });
    res.status(200).json(source);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Source by ID
export const deleteSource = async (req, res) => {
  try {
    const source = await Source.findByIdAndDelete(req.params.id);
    if (!source) return res.status(404).json({ error: "Source not found" });
    res.status(200).json({ message: "Source deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
