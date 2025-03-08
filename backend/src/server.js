import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";
import dbConnector from "./plugins/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import furnitureRoutes from "./routes/furnitureRoutes.js";







dotenv.config();
const fastify = Fastify({ logger: true });

// MongoDB-Plugin registrieren
fastify.register(dbConnector);
fastify.register(userRoutes);
fastify.register(fastifyCors, {
  origin: "*",
});
fastify.register(furnitureRoutes);

// Test-Route
fastify.get("/", async (req, reply) => {
  return { message: "API läuft!" };
});

// Server starten
const start = async () => {
  try {
    const PORT = process.env.PORT || 3001;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server läuft auf http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
