import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnector(fastify, options) {
  const MONGO_URI = process.env.MONGO_URI; 

  if (!MONGO_URI) {
    console.error("❌ MongoDB-Verbindungsfehler: MONGO_URI ist nicht definiert.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI); 
    console.log("MongoDB erfolgreich verbunden:", MONGO_URI);
  } catch (err) {
    console.error("❌ MongoDB-Verbindungsfehler:", err);
    process.exit(1);
  }
}

export default fastifyPlugin(dbConnector);

