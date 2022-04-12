require('dotenv').config();
const Database = require('../db');
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;
const http = require('http').Server(app);
const routes = require('./routes');
const initializeSocket = require('./socket');
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

app.use(cors());
app.use('/api/v1/', routes(io));
initializeSocket(io);

http.listen(port, async () => {
  await Database.connect();
  console.log(`HTTP Server listening on ${port}`);
  console.log(`Connected to MongoDB: ${process.env.DATABASE_NAME}`);
});