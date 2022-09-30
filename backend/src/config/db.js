const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
// const dotenv = require("dotenv");
// dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME;
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.5xul8tg.mongodb.net/?retryWrites=true&w=majority`;

// mongoose
//   .connect(url, { useNewUrlParser: true })
//   .then(() => console.log("DB Connected!"))
//   .catch((e) => console.log("DB Connection error!", e));
