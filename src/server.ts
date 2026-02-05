import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import db from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await db.raw("SELECT 1");
    console.log(" Database connected successfully");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(" Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
