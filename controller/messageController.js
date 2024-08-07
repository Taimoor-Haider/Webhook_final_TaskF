import axios from "axios";
import Webhook from "../models/messageModel.js";

const WEBHOOK_URL =
  "https://app.whistleit.io/api/webhooks/66a9d386d375c861d232f207";

export const addMessageViaWebhook = async (message) => {
  const { pretext, title, text, author_name } = message;

  try {
    // Send a POST request to the webhook URL
    const response = await axios.post(WEBHOOK_URL, {
      pretext,
      title,
      text,
      author_name,
    });
    console.log("Response is");
    console.log(response);

    // Check if the response status is 200
    if (response.status !== 200) {
      console.error("Webhook response error:", response.data);
    }

    // Create a new Webhook document
    const webhook = new Webhook({
      pretext,
      title,
      text,
      author_name,
      createdAt: new Date(),
    });

    // Save the webhook data to the database
    await webhook.save();
  } catch (error) {
    console.error("Error processing webhook:", error);
  }
};

export const searchMessagesByAuthorName = async (req, res) => {
  const { author_name } = req.body;

  console.log(author_name);

  try {
    const query = {};
    if (author_name) {
      query.author_name = author_name;
    }

    const webhooks = await Webhook.find(query);
    res.status(200).send(webhooks);
  } catch (error) {
    res.status(500).send({ error: "Error fetching webhooks", details: error });
  }
};

// Controller function to get all webhooks
export const getAllWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.find();
    res.status(200).send(webhooks);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching all webhooks", details: error });
  }
};

export const searchMessagesByMessage = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery);

  try {
    const query = {};
    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }

    const webhooks = await Webhook.find(query);
    res.status(200).send(webhooks);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching webhooks", details: error.message });
  }
};

export const testWebhook = async (req, res) => {
  const { webhookUrl } = req.body;

  if (!webhookUrl) {
    return res.status(400).send({ error: "Webhook URL is required." });
  }

  try {
    // Send a test request to the provided webhook URL
    const response = await axios.post(webhookUrl, {
      // You can include a test payload if needed
      test: "",
    });

    if (response.status === 200) {
      res.status(200).send({ message: "Webhook test passed successfully." });
    } else {
      res.status(response.status).send({
        message: "Webhook test failed.",
        details: response.statusText,
      });
    }
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send({
      message: "Webhook test failed.",
      details: error.message,
    });
  }
};
