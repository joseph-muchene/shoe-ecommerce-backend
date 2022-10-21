require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const reviewRoute = require("./routes/Reviews");
const categoryRoute = require("./routes/category");
const orders = require("./routes/order");
const morgan = require("morgan");
const PORT = 5000 || process.env.PORT;
const path = require("path");
const connectDB = require("./connectDb");

connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orders);

// Serve frontend

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
