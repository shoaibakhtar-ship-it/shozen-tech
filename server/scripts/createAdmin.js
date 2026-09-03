require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    if (
      !process.env.MONGO_URI ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD
    ) {
      throw new Error(
        "MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD are required"
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected"
    );

    const email =
      process.env.ADMIN_EMAIL
        .trim()
        .toLowerCase();

    const existingAdmin =
      await Admin.findOne({
        email,
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists. No changes were made."
      );

      return;
    }

    await Admin.create({
      name:
        process.env.ADMIN_NAME ||
        "Shozen Admin",

      email,

      password:
        process.env.ADMIN_PASSWORD,

      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );
  } catch (error) {
    console.error(
      "Admin setup error:",
      error.message
    );

    process.exitCode = 1;
  } finally {
    if (
      mongoose.connection.readyState !==
      0
    ) {
      await mongoose.connection.close();
    }
  }
};

createAdmin();