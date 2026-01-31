import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
