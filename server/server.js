require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const diseaseRouter = require('./routes/disease');
const scheduleRouter = require('./routes/schedule');
const weatherRouter = require('./routes/weather');
const farmRouter = require('./routes/farm');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded leaf images statically
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/predict-disease', diseaseRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/farm', farmRouter);
app.use('/api/chat', chatRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "online",
    service: "Agri-Go Smart Agriculture Backend",
    timestamp: new Date().toISOString()
  });
});

// Serve static frontend production build if available
const clientDistDir = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistDir)) {
  app.use(express.static(clientDistDir));
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(clientDistDir, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`🌱 Agri-Go Server running on http://localhost:${PORT}`);
});
