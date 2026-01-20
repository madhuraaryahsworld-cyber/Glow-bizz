import db from "../config/firebase.js";
import { sendWithRetry } from "../utils/whatsappRetrySender.js";

export const handleMissedCall = async (req, res) => {
  try {
    const { phone } = req.body || {};

    if (!phone) {
      return res.status(400).json({
        error: "Phone number is required"
      });
    }

    // 1️⃣ Save missed call in Firebase
    await db.ref("missed_calls").push({
      phone,
      status: "received",
      created_at: new Date().toISOString()
    });

    // 2️⃣ Simulate WhatsApp auto-reply with retry
    await sendWithRetry({
      phone,
      message: "Thanks for your missed call. We will contact you shortly."
    });

    res.json({
      success: true,
      message: "Missed call logged and WhatsApp retry triggered"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
};
