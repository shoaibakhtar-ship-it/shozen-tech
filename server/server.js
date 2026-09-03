require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error(
      "MONGO_URI is missing in .env"
    );
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error(
      "JWT_SECRET is missing in .env"
    );
    process.exit(1);
  }

  await connectDB();

  app.listen(
    PORT,
    () => {
      console.log(
        `SHOZEN TECH server running on port ${PORT}`
      );
    }
  );
};

startServer();