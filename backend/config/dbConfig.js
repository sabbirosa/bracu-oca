const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = 'mongodb+srv://siamabuhanif1:JQJ29lQnVBWTaees@mainapp.5qplv.mongodb.net/?retryWrites=true&w=majority&appName=BRACU_OCA';

const dbConnect = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = dbConnect;
