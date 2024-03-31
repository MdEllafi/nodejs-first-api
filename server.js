const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
// Routes
const categoryRout = require("./routes/categoryRout");
const subCategoryRout = require("./routes/subCategoryRout");
const brandRout = require("./routes/brandRout");
const productRout = require("./routes/productRout");

dbConnection();

const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`Node: ${process.env.NODE_ENV}`);
}
//mount routes
app.use("/api/v1/categories", categoryRout);
app.use("/api/v1/subcategories", subCategoryRout);
app.use("/api/v1/brands", brandRout);
app.use("/api/v1/products", productRout);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route: ${req.originalUrl}`, 400));
});

//global error handling midelware
app.use(globalError);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log("app running on Port {" + PORT + "}");
});

// Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}}`);
  server.close(() => {
    console.error(`Shutting down.....`);
    process.exit(1);
  });
});
