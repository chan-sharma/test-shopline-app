const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const conDtabase = require('./utils/dbConnection');

//connect to MongoDB
conDtabase.conDB();

//console.log(process.env);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}....!`);
});
