const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_CONNECT = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!!!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = DB_CONNECT;
