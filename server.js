const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
const conDB = async function () {
  try {
    await mongoose
      //.connect(process.env.DATABASE_LOCAL, {
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    //dbConnected ((con) => {
    console.log('Successfully! Connected to MongoDB');
    //console.log(dbConnected);
    //});
  } catch (err) {
    console.log(err);
  }
};
conDB();
//console.log(process.env);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}....!`);
});
