const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Route imports
const usersRoute = require('./routes/user');
const postsRoute = require('./routes/post');
const likesRoute = require('./routes/likes');
const commentsRoute = require('./routes/comments');
const reportsRoute = require('./routes/report');

// Use routes
app.use('/user', usersRoute);
app.use('/post', postsRoute);
app.use('/likes', likesRoute);
app.use('/comments', commentsRoute);
app.use('/report', reportsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
