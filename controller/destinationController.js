import Destination from "../models/destinationModel.js";
import { addMessageViaWebhook } from "./messageController.js";
// Create a new Destination
export const createDestination = async (req, res) => {
  const { name, description } = req.body;
  try {
    const destination = new Destination({ name, description });
    await destination.save();

    // Send a message via webhook
    await addMessageViaWebhook({
      pretext: "A new destination has been created.",
      title: "Destination Created",
      text: `Destination Name: ${name}, Description: ${description}`,
      author_name: "Destination Service",
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all Destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ error: "Destination not found" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Destination by ID
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination)
      return res.status(404).json({ error: "Destination not found" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Destination by ID
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ error: "Destination not found" });
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
