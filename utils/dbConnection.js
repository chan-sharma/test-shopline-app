const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
exports.conDB = async function () {
  try {
    await mongoose
      //.connect(process.env.DATABASE_LOCAL, {
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: 'Shopline-products',
      });
    //dbConnected ((con) => {
    console.log('Successfully! Connected to MongoDB');
    //console.log(dbConnected);
    //});
  } catch (err) {
    console.log(err);
  }
};
//module.exports = conDB();//
