const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const logger = require('../logger/logger');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error('MongoDB connection error:', err));

app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    
    logger.info(`Server running at http://localhost:${PORT}`)

);
