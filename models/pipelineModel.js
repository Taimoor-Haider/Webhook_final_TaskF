// models/Pipeline.js
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Pipeline schema
const pipelineSchema = new Schema({
  sourceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Source", // Reference to the Source model
  },
  destinationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Destination", // Reference to the Destination model
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before saving
pipelineSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Pipeline model
const Pipeline = mongoose.model("Pipeline", pipelineSchema);

export default Pipeline;
