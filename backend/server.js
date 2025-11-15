const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth.routes.js");

const adminProductsRouter = require("./routes/admin/products.routes.js");
const adminOrderRouter = require("./routes/admin/payment.routes.js");

const shopProductsRouter = require("./routes/shop/products.routes.js");
const shopCartRouter = require("./routes/shop/cart.routes.js");
const shopAddressRouter = require("./routes/shop/address.routes.js");
const shopPaymentRouter = require("./routes/shop/payments.routes.js");
const shopSearchRouter = require("./routes/shop/search.routes.js");
const shopReviewRouter = require("./routes/shop/review.routes.js");

const commonFeatureRouter = require("./routes/common/feature.routes.js");

mongoose
  .connect(
    "mongodb+srv://largomauroandres:JatSport123@cluster0.nfjve.mongodb.net/"
  )
  .then(() => console.log("MongoDB Conenected"))
  .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

/*const allowedOrigins = [
  "http://localhost:5173",
  "https://d99f04fe9dc6.ngrok-free.app",
];*/

app.use(
  cors({
    origin : 'http://localhost:5173',
/*
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
*/
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

/*ngrok
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});*/

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);


app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/payment", shopPaymentRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Servidor Conectado en el Puerto ${PORT}`));
