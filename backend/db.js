const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.5xul8tg.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch((e) => console.log('DB Connection error!', e));
