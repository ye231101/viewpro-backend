require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ResHelper = require('./utils/ResHelper');
const { initIO } = require('./utils/socket');
const { PORT } = require('./config');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ResHelper);
app.use(require('./routes'));
app.use('/public', express.static('public'));

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

const server = http.createServer(app);

initIO(server);

// Handle server startup errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
