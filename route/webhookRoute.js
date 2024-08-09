// routes/webhookRoutes.js
import express from "express";
import { createWebhook, getWebhooks } from "../controller/webhookController.js";

const router = express.Router();

router.post("/webhooks", createWebhook);
router.get("/webhooks", getWebhooks);
// router.get("/webhooks/:id", getWebhookById);
// router.put("/webhooks/:id", updateWebhook);
// router.delete("/webhooks/:id", deleteWebhook);

export default router;
