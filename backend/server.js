const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const candidateRoutes = require('./routes/candidateRoutes');
// const errorHandler = require('./middleware/errorHandler');
const errorHandler=require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/candidates', candidateRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;