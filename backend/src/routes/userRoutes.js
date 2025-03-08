import User from "../models/User.js";

export default async function userRoutes(fastify, options) {
  // Alle Benutzer abrufen
  fastify.get("/users", async (req, reply) => {
    return await User.find();
  });

  
  // Neuen Benutzer hinzufügen
  fastify.post("/users", async (req, reply) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      return reply.code(201).send(newUser);
    } catch (error) {
      return reply.code(500).send({ error: error.message });
    }
  });


  // Benutzer löschen
  fastify.delete("/users/:id", async (req, reply) => {
    await User.findByIdAndDelete(req.params.id);
    return reply.send({ message: "Benutzer gelöscht" });
  });
}
