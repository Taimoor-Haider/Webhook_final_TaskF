import mongoose from "mongoose";
const { Schema } = mongoose;

const webhookSchema = new Schema({
  pretext: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    index: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
// Create a text index on the 'text' field
webhookSchema.index({ text: "text" });

const Webhook = mongoose.model("Webhook", webhookSchema);
export default Webhook;
