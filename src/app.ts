import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import employeesRoutes from "./routes/employees";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.105:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("right endpoint");
});
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/attendance", authRoutes);
app.use("/api/reports", authRoutes);
app.use(errorHandler);
export default app;
