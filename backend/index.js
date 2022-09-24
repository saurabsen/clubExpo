const express = require('express');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');
dotenv.config();

// App
const app = express();
const http = require('http').createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
  res.send({ message: 'This is a message from backend :)' });
});

// PORT & Listener
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
