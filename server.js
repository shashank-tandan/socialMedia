const express = require('express');
const app = express();
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json());

// Serve static frontend files
app.use(express.static('public'));

// Logging middleware (optional but useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route for health check
app.get('/', (req, res) => {
  res.send('Social Media Analytics API is running 🚀');
});

// Route imports
const usersRoute = require('./routes/user');
const postsRoute = require('./routes/post');
const likesRoute = require('./routes/likes');
const commentsRoute = require('./routes/comments');
const reportsRoute = require('./routes/report');
const analyticsRoute = require('./routes/analytics');
const mediaAnalyticsRoute = require('./routes/mediaanalytics');

// Use routes
app.use('/user', usersRoute);
app.use('/post', postsRoute);
app.use('/likes', likesRoute);
app.use('/comments', commentsRoute);
app.use('/report', reportsRoute);
app.use('/analytics', analyticsRoute);
app.use('/mediaanalytics', mediaAnalyticsRoute);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
