const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = 'mongodb+srv://sabbirosa:vTCNhWWnlxBfTEr4@mainapp.q19ny.mongodb.net/?retryWrites=true&w=majority&appName=BRACU_OCA';


const dbConnect = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = dbConnect;
