const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config();
const { errorHandler } = require('./src/middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

connectDB();

// App
const app = express();
const http = require('http').createServer(app);

// Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', async (req, res) => {
  res.send({ message: 'This is a message from backend :)' });
});

app.use('/api/clubs', require('./src/routes/clubRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/proposals', require('./src/routes/proposalRoutes'));
app.use('/api/events', require('./src/routes/eventRoutes'));
app.use("/api/search", require("./src/routes/searchRoutes"));
app.use('/api/clubmembers', require('./src/routes/clubMembersRoutes'));
app.use('/api/notifications', require('./src/routes/notificationRoutes'));

app.use(errorHandler);

// PORT & Listener
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
