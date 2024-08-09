import mongoose from "mongoose";
const webhookSchema = new mongoose.Schema({
  webhook_url: {
    type: String,
    required: true,
    trim: true,
  },
  inserted_time: {
    type: Date,
    default: Date.now,
  },
});

const WebhookURL = mongoose.model("WebhookURL", webhookSchema);

export default WebhookURL;
