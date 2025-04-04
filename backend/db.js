const mongoose = require("mongoose");

const db_password = encodeURIComponent("xxxxxxxxx"); // add password from Mongodb

const connectionString = `mongodb+srv://xxxxxxxx:${db_password}@cluster0.lvoagpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Replace with ur connectionString

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, connectionParams);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDatabase;
