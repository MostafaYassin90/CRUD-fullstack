import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import productRouter from "./route/productRoute.js";
import adminRouter from "./route/adminRoute.js";
import "dotenv/config";

// App Cofig
const app = express();
const port = process.env.PORT || "8000";

// Connect
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// EndPoints
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);

app.use("/welcome", async (req, res) => {
  res.send(`API Working.`);
});

// App Listen
app.listen(port, () => {
  console.log("Server Working");
});