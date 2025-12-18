const express = require('express');
const cors = require('cors');

const ingestRoutes = require('./routes/ingest.routes');
const chatRoutes = require('./routes/chat.routes');
const historyRoutes = require('./routes/history.routes');

const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ingest', ingestRoutes);
app.use('/chat', chatRoutes);
app.use('/history', historyRoutes);

app.use(errorHandler);

module.exports = app;
