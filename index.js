import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import inventoryRoutes from "./routes/inventory.routes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";
import missedCallRoutes from "./routes/missedCall.routes.js"; // 👈 NEW

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/webhooks/whatsapp", whatsappRoutes);
app.use("/api/missed-call", missedCallRoutes); // 👈 NEW ROUTE
app.use("/api/whatsapp", whatsappRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
