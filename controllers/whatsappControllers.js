import db from "../config/firebase.js";
import { sendWithRetry } from "../utils/whatsappRetrySender.js";

export const handleIncomingMessage = async (req, res) => {
  try {
    const { phone, text } = req.body || {};

    if (!phone || !text) {
      return res.status(400).json({
        error: "phone and text are required"
      });
    }

    // 1️⃣ Save incoming message
    await db.ref("messages").push({
      phone,
      text,
      status: "received",
      created_at: new Date().toISOString()
    });

    // 2️⃣ Auto-reply with retry logic
    await sendWithRetry({
      phone,
      message: `Auto-reply: Thanks for your message`
    });

    res.json({
      success: true,
      message: "Auto reply sent (with retry if needed)"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
