const app = require("./app");
const dbConnect = require("./config/dbConfig");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await dbConnect.connect();
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}

startServer();
