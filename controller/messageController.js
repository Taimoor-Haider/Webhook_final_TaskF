import axios from "axios";
import Webhook from "../models/messageModel.js";
import WebhookURL from "../models/webhookModel.js";
export const addMessageViaWebhook = async (message) => {
  const { pretext, title, text, author_name } = message;

  try {
    // Fetch all webhook URLs from the database
    const webhooks = await WebhookURL.find();

    // Iterate over each webhook URL and send the POST request
    for (const webhook of webhooks) {
      try {
        const response = await axios.post(webhook.webhook_url, {
          pretext,
          title,
          text,
          author_name,
        });

        console.log(`Response from ${webhook.webhook_url}:`, response);

        // Check if the response status is 200
        if (response.status !== 200) {
          console.error(
            `Webhook response error from ${webhook.webhook_url}:`,
            response.data
          );
        }
      } catch (error) {
        console.error(
          `Error sending message to ${webhook.webhook_url}:`,
          error
        );
      }
    }

    // Create a new Webhook document (optional, if you want to save the message)
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
    console.error("Error processing webhooks:", error);
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
