let failOnce = true;

export async function sendMockMessage(payload) {
  if (failOnce) {
    failOnce = false;
    throw new Error("Simulated WhatsApp failure");
  }

  console.log("MOCK WHATSAPP SENT:");
  console.log(payload);
}
