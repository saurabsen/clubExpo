const express = require("express");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();
const { errorHandler } = require("./src/middleware/errorMiddleware");

connectDB();

// App
const app = express();
const http = require("http").createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", async (req, res) => {
  res.send({ message: "This is a message from backend :)" });
});

app.use("/api/clubs", require("./src/routes/clubRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/events", require("./src/routes/eventRoutes"))

// Add app.use for events
// app.use("/api/events", require("./src/routes/userRoutes"));

// Add route for events
// Add controller for events

app.use(errorHandler);

// PORT & Listener
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
