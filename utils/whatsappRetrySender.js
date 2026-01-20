import { sendMockMessage } from "./mockWhatsappSender.js";

export async function sendWithRetry(payload, retries = 3) {
  try {
    await sendMockMessage(payload);
    return true;
  } catch (err) {
    console.log(`Send failed. Retries left: ${retries}`);

    if (retries > 1) {
      return sendWithRetry(payload, retries - 1);
    }

    throw new Error("Message failed after retries");
  }
}
