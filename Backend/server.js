import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadsRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// is this configured well for paypal
app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

const __dirname = path.resolve();
// please explain me
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/upload", uploadsRoutes);

// console.log(path.join(__dirname, "/uploads"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on the port: ${port}`));
