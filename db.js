const { MongoClient } = require("mongodb");

let db;

const connectDB = async (databaseName) => {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    db = client.db(databaseName);
    console.log("Connected to database");
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  } finally {
    await client.close();
    console.log("DB Connection closed");
  }
};

module.exports = { connectDB, db };

// const connectDB = async (databaseName) => {
//   const client = new MongoClient(process.env.MONGO_URI);
//   try {
//     await client.connect();
//     const database = client.db(databaseName);

//     console.log("Connected to database");
//   } catch (error) {
//     console.log(`Error connecting to database: ${error}`);
//   } finally {
//     await client.close();
//   }
// };

// const connectDB = async (collectionName) => {
//   const client = new MongoClient(process.env.MONGO_URI);
//   try {
//     await client.connect();
//     const database = client.db("Offroad");
//     const collection = database.collection(collectionName);

//     const result = await collection.findOne({ name: "John" });
//     console.log(result);

//     console.log("Connected to database");
//   } catch (error) {
//     console.log(`Error connecting to database: ${error}`);
//   } finally {
//     await client.close();
//   }
// };
