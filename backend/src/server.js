
// Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Files
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

// Configuration
require('dotenv').config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/', authRoutes);
app.use('/api/', taskRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log('Server running on port '+PORT));
