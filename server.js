const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const conDtabase = require('./utils/dbConnection');

//connect to MongoDB
conDtabase.conDB();

//console.log(process.env);
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}....!`);
});

//handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection ..Shutting down');
  server.close(() => {
    process.exit(1);
  });
});

//handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception ..Shutting down');
  server.close(() => {
    process.exit(1);
  });
});

//console.log(x);
