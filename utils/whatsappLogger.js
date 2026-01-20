import db from "../config/firebase.js";

export const logWhatsAppEvent = async (payload) => {
  try {
    const logsRef = db.ref("message_logs");

    await logsRef.push({
      event_type: payload.type,
      message_id: payload.data?.id || null,
      payload: payload,
      received_at: new Date().toISOString()
    });

    console.log("📦 Event logged to Firebase");
  } catch (err) {
    console.error("Logger Error:", err);
  }
};
