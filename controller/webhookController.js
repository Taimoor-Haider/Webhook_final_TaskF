import WebhookURL from "../models/webhookModel.js"; // Make sure this path is correct

// Create a new Webhook
export const createWebhook = async (req, res) => {
  const { webhook_url } = req.body;
  console.log(webhook_url);

  try {
    // Check if a webhook with the same URL already exists
    const existingWebhook = await WebhookURL.findOne({ webhook_url });
    if (existingWebhook) {
      return res
        .status(400)
        .json({ error: "Webhook with this URL already exists." });
    }

    // Create a new webhook
    const webhook = new WebhookURL({ webhook_url });
    await webhook.save();
    res.status(201).json(webhook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Webhooks
export const getWebhooks = async (req, res) => {
  try {
    const webhooks = await WebhookURL.find();
    res.status(200).json(webhooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Webhook by ID
// export const getWebhookById = async (req, res) => {
//   try {
//     const webhook = await WebhookURL.findById(req.params.id);
//     if (!webhook) return res.status(404).json({ error: "Webhook not found" });
//     res.status(200).json(webhook);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a Webhook by ID
// export const updateWebhook = async (req, res) => {
//   try {
//     const webhook = await WebhookURL.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!webhook) return res.status(404).json({ error: "Webhook not found" });
//     res.status(200).json(webhook);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a Webhook by ID
// export const deleteWebhook = async (req, res) => {
//   try {
//     const webhook = await WebhookURL.findByIdAndDelete(req.params.id);
//     if (!webhook) return res.status(404).json({ error: "Webhook not found" });
//     res.status(200).json({ message: "Webhook deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
